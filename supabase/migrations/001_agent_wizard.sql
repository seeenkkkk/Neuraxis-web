-- ═══════════════════════════════════════════════════════════════
-- NEURAXIS IA — Migration 001: Agent Wizard
-- Ejecutar en Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── Asegurar columna neurax_points en profiles ───────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS neurax_points int NOT NULL DEFAULT 0;

-- ─── agent_projects ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.agent_projects (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Paso 1 — Problema
  problem_statement   text,
  pain_tags           text[],

  -- Paso 2 — Enfoque IA
  ai_approach         text,
  ai_suggestions      jsonb,

  -- Paso 3 — Nicho
  niche_sector        text,
  company_size        text,
  buyer_persona       text,
  pricing_tiers       jsonb,

  -- Paso 4 — Landing
  landing_platform    text CHECK (landing_platform IN ('framer', 'webflow', 'skip')),
  landing_redirect_at timestamptz,

  -- Paso 5 — Agente
  agent_type          text,

  -- Paso 6 — Exportar (bloqueado sin pago)
  generated_prompt    text,
  n8n_json            jsonb,

  -- Control de flujo
  current_step        int NOT NULL DEFAULT 1,
  status              text NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft', 'in_progress', 'completed')),

  created_at          timestamptz NOT NULL DEFAULT now(),
  completed_at        timestamptz
);

-- ─── agents ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.agents (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id  uuid REFERENCES public.agent_projects(id) ON DELETE SET NULL,
  name        text NOT NULL,
  agent_type  text,
  status      text NOT NULL DEFAULT 'active',
  config      jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── agent_purchases ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.agent_purchases (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_project_id  uuid NOT NULL REFERENCES public.agent_projects(id) ON DELETE CASCADE,
  stripe_payment_id text,
  purchase_type     text NOT NULL CHECK (purchase_type IN ('single', 'subscription')),
  amount_cents      int,
  status            text NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'paid', 'refunded')),
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- Solo un pago único por usuario + proyecto
CREATE UNIQUE INDEX IF NOT EXISTS agent_purchases_single_unique
  ON public.agent_purchases (user_id, agent_project_id)
  WHERE purchase_type = 'single';

-- ─── RLS ─────────────────────────────────────────────────────
ALTER TABLE public.agent_projects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_purchases ENABLE ROW LEVEL SECURITY;

-- agent_projects
DROP POLICY IF EXISTS "Users own their agent_projects" ON public.agent_projects;
CREATE POLICY "Users own their agent_projects"
  ON public.agent_projects FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- agents
DROP POLICY IF EXISTS "Users own their agents" ON public.agents;
CREATE POLICY "Users own their agents"
  ON public.agents FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- agent_purchases
DROP POLICY IF EXISTS "Users own their agent_purchases" ON public.agent_purchases;
CREATE POLICY "Users own their agent_purchases"
  ON public.agent_purchases FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ─── Función: incrementar Neurax-Points ──────────────────────
CREATE OR REPLACE FUNCTION public.increment_neurax_points(
  p_user_id uuid,
  p_amount  int
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.profiles
  SET neurax_points = COALESCE(neurax_points, 0) + p_amount
  WHERE id = p_user_id;
$$;
