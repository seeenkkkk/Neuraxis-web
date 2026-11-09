---
description: Añade un nuevo subagente a la oficina de Neuraxis
argument-hint: <puesto y qué tiene que hacer>
---

Mario quiere contratar un nuevo subagente para la oficina: $ARGUMENTS

1. Lee `OFICINA.md` y los agentes de `.claude/agents/`. Si el puesto se solapa con uno que ya existe, dilo y propón ampliar ese en lugar de crear otro.
2. Si falta información imprescindible (qué entrega, con qué frecuencia, qué no debe hacer), haz como mucho 2 preguntas. Si no, sigue.
3. Crea `.claude/agents/<nombre-en-kebab-case>.md` copiando la estructura de `.claude/oficina/plantilla-agente.md`. La `description` debe decir claramente *cuándo* usarlo, porque es lo que usa Claude para decidir a quién delegar.
4. Añade el puesto a la tabla "Plantilla actual" de `OFICINA.md`.
5. Resume en 3 líneas qué hace el nuevo agente y cómo pedirle trabajo.
