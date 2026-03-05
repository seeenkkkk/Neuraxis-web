-- NEURAXIS IA — Migration 001: Agent Wizard

-- Columnas que necesita el wizard en la tabla profiles (ya existe)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS neurax_points      int  NOT NULL DEFAULT 0;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan_tier          text NOT NULL DEFAULT 'free'
    CHECK (plan_tier IN ('free', 'starter', 'pro', 'enterprise'));

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_status text NOT NULL DEFAULT 'inactive'
    CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due'));

-- Tabla agent_projects
CREATE TABLE IF NOT EXISTS public.agent_projects (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_statement   text,
  pain_tags           text[],
  ai_approach         text,
  ai_suggestions      jsonb,
  niche_sector        text,
  company_size        text,
  buyer_persona       text,
  pricing_tiers       jsonb,
  landing_platform    text CHECK (landing_platform IN ('framer', 'webflow', 'skip')),
  landing_redirect_at timestamptz,
  agent_type          text,
  generated_prompt    text,
  n8n_json            jsonb,
  current_step        int  NOT NULL DEFAULT 1,
  status              text NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft', 'in_progress', 'completed')),
  created_at          timestamptz NOT NULL DEFAULT now(),
  completed_at        timestamptz
);

-- Tabla agents
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

-- Tabla agent_purchases
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

-- Indice unico: un solo pago unico por usuario + proyecto
CREATE UNIQUE INDEX IF NOT EXISTS agent_purchases_single_unique
  ON public.agent_purchases (user_id, agent_project_id)
  WHERE purchase_type = 'single';

-- RLS
ALTER TABLE public.agent_projects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own their agent_projects" ON public.agent_projects;
CREATE POLICY "Users own their agent_projects"
  ON public.agent_projects FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users own their agents" ON public.agents;
CREATE POLICY "Users own their agents"
  ON public.agents FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users own their agent_purchases" ON public.agent_purchases;
CREATE POLICY "Users own their agent_purchases"
  ON public.agent_purchases FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Funcion para incrementar Neurax-Points
CREATE OR REPLACE FUNCTION public.increment_neurax_points(
  p_user_id bigint,
  p_amount  int
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.profiles
  SET neurax_points = COALESCE(neurax_points, 0) + p_amount
  WHERE id::text = p_user_id::text;
$$;
