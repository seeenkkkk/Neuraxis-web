# Reels de Instagram — Neuraxis

Tres reels verticales (1080×1920, 30 fps, H.264) hechos con HTML/CSS y renderizados frame a frame.
Están **sin audio** a propósito: el audio se añade en la app de Instagram (audio en tendencia o un tema propio de SENK).

| Vídeo | Duración | Tema | Palabra clave del CTA |
|---|---|---|---|
| `out/reel1-agente-whatsapp.mp4` | 18 s | Agente de IA que reserva citas por WhatsApp a las 23:47 | AGENTE |
| `out/reel2-agente-6-pasos.mp4` | 20 s | Cómo creamos un agente de IA en 6 pasos (el wizard de la app) | PASOS |
| `out/reel3-citas-perdidas.mp4` | 20 s | Lo que cuestan las citas perdidas y los recordatorios automáticos | CITAS |

## Volver a renderizar

```bash
cd marketing/reels
node render.js reel1-agente-whatsapp.html 18 out/reel1-agente-whatsapp.mp4
```

Necesita Playwright (Chromium) y ffmpeg. Para cambiar un texto, edita el HTML y vuelve a renderizar.
Los tiempos de cada elemento van en las variables CSS `--d` (aparece), `--in` / `--out` (escena).

## Textos para publicar

### Reel 1 — AGENTE
**Portada:** "23:47 y tu negocio cerrado"

> Son las 23:47. Tu peluquería está cerrada… y un cliente quiere cita para mañana.
> Sin agente: mañana ya ha reservado en otra.
> Con agente: tiene la cita confirmada en 30 segundos y le llega un recordatorio.
>
> Esto es lo que montamos en Neuraxis: agentes de IA que atienden tu WhatsApp 24/7.
> 👇 Comenta AGENTE y te cuento cómo funcionaría en tu negocio.

#inteligenciaartificial #automatizacion #whatsappbusiness #negocioslocales #peluqueria #emprendedores #ia #neuraxis

### Reel 2 — PASOS
**Portada:** "Tu agente de IA en 6 pasos"

> No hace falta saber programar para tener un agente de IA.
> 1. Problema · 2. Soluciones · 3. Nicho · 4. Plan · 5. Landing · 6. Agente
> Guárdalo para cuando lo necesites 📌
> 👇 Comenta PASOS y te paso el detalle de cada uno.

#agentesia #inteligenciaartificial #automatizacion #negociodigital #emprendimiento #ia #neuraxis

### Reel 3 — CITAS
**Portada:** "¿Cuánto te cuestan las citas perdidas?"

> 4 citas perdidas a la semana × 30 € = 480 € al mes que se van (es un ejemplo: haz la cuenta con tus números).
> La solución es simple: un WhatsApp automático 24 h antes para que el cliente confirme o cambie la cita.
> 👇 Comenta CITAS y te lo dejo funcionando.

#clinicas #clinicaestetica #peluqueria #automatizacion #whatsapp #inteligenciaartificial #neuraxis

> Nota: para que "Comenta X" funcione, alguien tiene que responder esos comentarios por DM
> (a mano o con una automatización de DMs). Si no, mejor cambiar el CTA a "Link en la bio".
