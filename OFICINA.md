# Oficina de agentes de Neuraxis

Claude es el **director**: habla con Mario, decide qué hace él mismo y qué delega, y revisa lo que entregan los subagentes antes de dárselo a Mario. Cada subagente es un archivo en `.claude/agents/` con su propio contexto limpio, sus reglas y su formato de entrega.

## Plantilla actual

| Agente | Puesto | Cuándo se usa | Entrega en |
|---|---|---|---|
| `editor-video` | Editor de Reels / Shorts | Idea o grabación → vídeo vertical listo, hooks, guion, subtítulos, ffmpeg | `oficina/editor-video/` |
| `marketing-ig` | Estratega de Instagram | Mejorar la cuenta: auditoría, métricas, calendario, captions, DMs → clientes | `oficina/marketing-ig/` |

## Cómo se usa

- **Que Claude decida**: pide la tarea normal ("hazme un reel con esta grabación") y Claude delega si encaja con la `description` del agente.
- **Forzarlo**: "usa el editor-video para…" o `@editor-video …`.
- **Ver/gestionar agentes**: comando `/agents` en Claude Code.
- **Contratar uno nuevo**: `/contratar <puesto y qué tiene que hacer>` (usa la plantilla de `.claude/oficina/plantilla-agente.md`).

Flujo típico de contenido: `marketing-ig` planifica la semana → `editor-video` produce cada reel → Claude revisa y te lo entrega → tú publicas.

## Dónde funciona (importante)

- Estos agentes son **de proyecto**: funcionan cuando abres Claude Code en este repositorio (en tu PC o en Claude Code web).
- Para tenerlos en **cualquier carpeta** de tu PC, cópialos a tu carpeta de usuario (Git Bash en Windows):
  ```bash
  mkdir -p ~/.claude/agents ~/.claude/commands
  cp .claude/agents/*.md ~/.claude/agents/
  cp .claude/commands/contratar.md ~/.claude/commands/
  ```
- En la app de chat de Claude (claude.ai) no existen estos subagentes; allí el equivalente son las Skills y los Proyectos.

## Próximos puestos candidatos (solo si hacen falta)

Alineados con el foco actual: `investigador-adsense` (nichos, keywords, artículos), `analista-inversion` (informes con riesgo, sin recomendar compras), `guionista-shorts` (si el editor se queda corto con YouTube). No se contratan hasta que haya trabajo real para ellos.
