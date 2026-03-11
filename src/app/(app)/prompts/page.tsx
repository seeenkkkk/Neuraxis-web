"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonCard from "@/components/ui/NeonCard";

type Model = "Claude" | "ChatGPT" | "Gemini";

const PROMPTS: Record<Model, { category: string; title: string; prompt: string; color: string }[]> = {
  Claude: [
    {
      category: "Agentes de Ventas",
      title: "System prompt: Agente IA de ventas para clínicas",
      color: "#9B30FF",
      prompt: `Eres ARIA, asistente virtual de [NOMBRE_CLÍNICA]. Tu misión es calificar prospectos interesados en tratamientos estéticos y agendar consultas de valoración gratuita.

<personalidad>
Eres empática, profesional y genuinamente te importa ayudar a los pacientes a sentirse mejor consigo mismos. Hablas de manera cálida pero sin excesos. Nunca presionas.
</personalidad>

<proceso_de_calificación>
1. Saluda por nombre si lo sabes
2. Pregunta por el tratamiento de interés
3. Pregunta por expectativas y timeline
4. Informa brevemente sobre el procedimiento
5. Ofrece la consulta gratuita
6. Si acepta → agenda en Calendly
</proceso_de_calificación>

<reglas>
- Nunca inventes precios (di "en consulta te informamos con exactitud")
- Nunca garantices resultados específicos
- Si el usuario pregunta algo médico complejo → escala a un especialista
- Mantén conversaciones de máximo 8 turnos antes de intentar agendar
- Si el usuario no quiere cita → ofrece enviar info por WhatsApp
</reglas>

<información_clínica>
[INSERTAR: dirección, horarios, especialidades, información de precios orientativos]
</información_clínica>`,
    },
    {
      category: "Análisis de Negocio",
      title: "Análisis competitivo de nicho IA",
      color: "#007AFF",
      prompt: `Analiza el nicho de [NICHO] para una agencia de inteligencia artificial. Necesito:

<análisis_requerido>
1. **Tamaño del mercado**: Número estimado de empresas en España, ticket medio, decisor de compra

2. **Problemas principales**: Top 5 pain points que sufren en [NICHO] que la IA puede resolver

3. **Soluciones IA aplicables**: Para cada problema, qué tipo de agente/automatización lo resuelve mejor

4. **Competencia**: Qué agencias o herramientas ya están atacando este nicho

5. **Propuesta de valor diferenciada**: Cómo posicionar mi agencia como la opción especializada

6. **Pricing recomendado**: Rangos de precio para paquetes básico/intermedio/premium

7. **Objeciones frecuentes**: Las 3 objeciones más comunes y cómo rebatirlas

8. **Caso de éxito hipotético**: Ejemplo concreto de ROI para un cliente tipo
</análisis_requerido>

Sé específico, usa datos cuando los tengas, y prioriza información accionable sobre teoría.`,
    },
    {
      category: "Prompt Engineering",
      title: "Mejora y optimiza cualquier prompt",
      color: "#00FF88",
      prompt: `Actúa como un experto en prompt engineering con 5 años de experiencia optimizando LLMs para casos de uso empresariales.

Voy a darte un prompt que necesito mejorar:

<prompt_original>
[PEGA AQUÍ TU PROMPT]
</prompt_original>

<contexto>
- Modelo objetivo: Claude Sonnet
- Caso de uso: [DESCRIBE EL CASO DE USO]
- Problema actual: [QUÉ FALLA O QUÉ QUIERES MEJORAR]
</contexto>

Por favor:
1. Identifica los 3 principales problemas del prompt original
2. Explica qué técnicas aplicarás y por qué
3. Escribe la versión mejorada completa
4. Lista los cambios realizados con explicación breve
5. Sugiere 2 variaciones alternativas para A/B testing

Usa las mejores prácticas: XML estructurado, few-shot examples si aplica, chain of thought para decisiones complejas.`,
    },
    {
      category: "Automatización",
      title: "Diseña un workflow n8n completo",
      color: "#FFD700",
      prompt: `Necesito diseñar un workflow de n8n para automatizar el siguiente proceso:

**Proceso a automatizar**: [DESCRIBE EL PROCESO]

**Herramientas involucradas**: [Lista: CRM, email, WhatsApp, etc.]

Por favor, diseña el workflow detallando:

1. **Trigger**: Qué inicia el workflow (webhook, cron, evento)
2. **Nodos necesarios**: Lista completa con función de cada uno
3. **Lógica condicional**: Qué ramificaciones hay (if/else)
4. **Manejo de errores**: Qué pasa si falla algún nodo
5. **Variables y datos**: Qué datos fluyen entre nodos
6. **Estimación de tiempo**: Cuánto tarda en ejecutarse
7. **Costes estimados**: Si hay APIs de pago involucradas

Incluye el pseudocódigo de los nodos de transformación de datos más complejos.`,
    },
    {
      category: "Contenido",
      title: "Genera contenido para LinkedIn de alto engagement",
      color: "#FF6B35",
      prompt: `Eres un experto en personal branding y copywriting para LinkedIn, especializado en el sector de inteligencia artificial y negocios digitales.

Crea un post de LinkedIn sobre: [TEMA]

<especificaciones>
- Tono: Directo, auténtico, sin corporativismo
- Longitud: 150-250 palabras (ideal para LinkedIn)
- Estructura: Hook potente + desarrollo + CTA
- Incluir: 1 dato/estadística real, 1 historia personal o caso
- Formato: Párrafos cortos (máx 2 líneas), emojis estratégicos (máx 3)
- Hashtags: 3-5 al final, relevantes pero no genéricos
</especificaciones>

<objetivo>
El post debe generar comentarios, no solo likes. Termina con una pregunta que invite a la reflexión o al debate.
</objetivo>

Dame 3 versiones con diferentes hooks para elegir.`,
    },
    {
      category: "Estrategia",
      title: "Plan de 90 días para lanzar tu agencia IA",
      color: "#00C4FF",
      prompt: `Actúa como un mentor de negocios especializado en agencias de IA con track record de haber lanzado 10+ agencias exitosas.

Crea un plan detallado de 90 días para lanzar una agencia de IA enfocada en [NICHO].

Mi situación actual:
- Experiencia técnica: [NIVEL: básico/intermedio/avanzado]
- Capital inicial: [CANTIDAD]€
- Horas disponibles por semana: [HORAS]
- Red de contactos en el nicho: [NINGUNA/MEDIA/BUENA]

El plan debe incluir por semana:
- Objetivo principal de la semana
- 3-5 acciones concretas con tiempo estimado
- Métricas de éxito a alcanzar
- Herramientas/recursos necesarios
- Posibles obstáculos y cómo superarlos

Sé específico, evita las generalizaciones. Quiero un plan que alguien pueda seguir al pie de la letra.`,
    },
  ],
  ChatGPT: [
    {
      category: "GPTs Personalizados",
      title: "Instrucciones para un GPT de ventas",
      color: "#10A37F",
      prompt: `# Nombre del GPT
Consultor de Ventas IA para [SECTOR]

# Descripción
Asistente especializado en estrategias de ventas para [SECTOR], con foco en aplicaciones de inteligencia artificial.

# Instrucciones
Eres un consultor de ventas senior con 10 años de experiencia en [SECTOR] y 3 años especializándote en implementaciones de IA.

Tu función es ayudar al usuario a:
1. Identificar oportunidades de venta en su nicho
2. Diseñar propuestas de valor convincentes
3. Prepararse para objeciones frecuentes
4. Crear scripts de llamadas y emails de prospección
5. Calcular ROI para presentar a potenciales clientes

Siempre que propongas algo, incluye un ejemplo concreto del [SECTOR]. Cuando el usuario mencione un cliente o prospect, adapta todos tus consejos a ese caso específico.

Nunca hagas promesas de resultados sin basar en datos. Si no tienes información suficiente, pregunta.

# Inicio de conversación
Saluda al usuario y pregunta: ¿Estás buscando captar nuevos clientes, mejorar la conversión, o preparar una propuesta específica?`,
    },
    {
      category: "Análisis de Datos",
      title: "Interpreta datos de negocio con Advanced Data Analysis",
      color: "#10A37F",
      prompt: `Analiza los datos del archivo adjunto y proporciona:

1. **Resumen ejecutivo** (3-5 puntos clave, máximo 100 palabras)

2. **Tendencias identificadas**:
   - Tendencias positivas con porcentaje de cambio
   - Tendencias negativas con impacto estimado
   - Anomalías que requieren atención

3. **KPIs calculados**:
   - [MÉTRICAS RELEVANTES para tu negocio]
   - Comparativa con período anterior si hay datos

4. **Insights accionables**: Top 3 recomendaciones basadas en los datos, ordenadas por impacto potencial

5. **Visualizaciones**: Crea los gráficos más relevantes (al menos 2: evolución temporal y distribución)

6. **Preguntas de seguimiento**: 3 análisis adicionales que podrían ser valiosos

Usa lenguaje de negocio, no técnico. Los insights deben ser concretos y accionables.`,
    },
    {
      category: "Automatización",
      title: "Genera código Python para automatización",
      color: "#10A37F",
      prompt: `Necesito un script de Python para automatizar el siguiente proceso:

**Qué hace**: [DESCRIBE EL PROCESO]
**Inputs**: [ARCHIVOS/APIS/DATOS que recibe]
**Output esperado**: [QUÉ DEBE PRODUCIR]
**Frecuencia de ejecución**: [MANUAL/DIARIA/HORARIA]

Requisitos técnicos:
- Python 3.10+
- Usar librerías estándar cuando sea posible
- Manejo de errores robusto con logging
- Variables de entorno para credenciales (nunca hardcodeadas)
- Comentarios en español explicando la lógica
- Función main() con argparse para parámetros

Por favor incluye:
1. El código completo y funcional
2. requirements.txt
3. Instrucciones de instalación y uso
4. Ejemplo de ejecución con datos de prueba`,
    },
    {
      category: "Copywriting",
      title: "Email de prospección frío de alta conversión",
      color: "#10A37F",
      prompt: `Escribe una secuencia de 3 emails de prospección fría para vender servicios de IA a [TIPO DE EMPRESA].

Sobre mí/mi empresa:
- Servicio: [QUÉ OFREZCO]
- Resultado clave: [EL MEJOR RESULTADO DE UN CLIENTE]
- Propuesta de valor: [QUÉ ME DIFERENCIA]

Email 1 - El gancho (día 1):
- Asunto: máximo 7 palabras, sin clickbait
- Personalización: menciona algo específico de la empresa del prospect
- Valor: un insight o dato relevante para su sector
- CTA: suave (respuesta simple, no venta directa)
- Longitud: máximo 100 palabras

Email 2 - El caso de éxito (día 4):
- Asunto: diferente, referencia al email anterior
- Historia: caso de éxito de cliente similar (puede ser hipotético)
- Prueba social: métricas reales
- CTA: solicitud de llamada de 15 min

Email 3 - El último intento (día 9):
- Asunto: honesto ("último email")
- Brevísimo: máximo 50 palabras
- CTA: cierre con puerta abierta

Tono: directo, humano, sin corporativismo.`,
    },
    {
      category: "Estrategia",
      title: "Análisis DAFO para agencia IA",
      color: "#10A37F",
      prompt: `Necesito un análisis DAFO completo para mi agencia de IA con estas características:

Mi agencia:
- Nicho: [NICHO]
- Servicios: [SERVICIOS QUE OFREZCO]
- Equipo: [TAMAÑO Y PERFILES]
- Antigüedad: [MESES/AÑOS]
- MRR actual: [CANTIDAD]€

Entorno:
- Localización: España
- Competidores directos: [SI LOS CONOCES]
- Tendencias del sector: IA generativa, automatización, agentes

Para cada cuadrante del DAFO:
- Mínimo 5 puntos por cuadrante
- Puntuación de impacto (1-10) para cada punto
- Estrategias recomendadas: DA, FA, DO, FO

Al final: top 3 prioridades estratégicas para los próximos 6 meses.`,
    },
    {
      category: "Productividad",
      title: "Crea un SOP completo para cualquier proceso",
      color: "#10A37F",
      prompt: `Crea un SOP (Standard Operating Procedure) detallado para el siguiente proceso de mi agencia:

**Proceso**: [NOMBRE DEL PROCESO]
**Objetivo**: [QUÉ SE LOGRA AL COMPLETARLO]
**Responsable**: [ROL que ejecuta]
**Frecuencia**: [CUÁNDO SE EJECUTA]

El SOP debe incluir:

1. **Objetivo y alcance**: Qué cubre y qué no cubre este SOP
2. **Requisitos previos**: Qué se necesita antes de empezar
3. **Materiales y herramientas**: Lista completa con links/accesos
4. **Paso a paso**: Numerado, con capturas/descripción visual cuando ayude
5. **Puntos de decisión**: Si/no con camino para cada opción
6. **Control de calidad**: Checklist de verificación al finalizar
7. **Métricas de éxito**: Cómo saber si se hizo bien
8. **Errores frecuentes**: Top 3 y cómo evitarlos
9. **Historial de versiones**: Tabla para registrar cambios

Formato: Markdown limpio, listo para pegar en Notion.`,
    },
  ],
  Gemini: [
    {
      category: "Investigación",
      title: "Investigación de mercado con búsqueda web",
      color: "#4285F4",
      prompt: `Realiza una investigación exhaustiva sobre el mercado de [NICHO] en España para el año 2024.

Busca y analiza:

1. **Tamaño del mercado**
   - Número de empresas del sector en España
   - Facturación total del sector
   - Tasa de crecimiento anual

2. **Principales actores**
   - Top 10 empresas del sector
   - Sus puntos de dolor tecnológicos más conocidos
   - Iniciativas de IA/digitalización ya en marcha

3. **Tendencias actuales**
   - Últimas noticias sobre IA en este sector (2023-2024)
   - Casos de éxito de IA documentados
   - Regulaciones o cambios normativos relevantes

4. **Oportunidades para una agencia IA**
   - Procesos más automatizables
   - Decisores de compra y sus motivaciones
   - Canales de captación más efectivos

Cita tus fuentes e indica la fecha de cada dato. Prioriza fuentes españolas o europeas.`,
    },
    {
      category: "Multimodal",
      title: "Analiza una landing page o imagen de negocio",
      color: "#4285F4",
      prompt: `[ADJUNTA UNA IMAGEN: landing page, web, material de marketing]

Analiza esta imagen como si fueras un experto en conversión y UX con 8 años de experiencia.

Proporciona:

**Análisis visual (10 segundos)**
¿Qué capta la atención? ¿Qué mensaje transmite en el primer vistazo?

**Jerarquía de información**
- ¿El headline es claro y convincente?
- ¿La propuesta de valor se entiende inmediatamente?
- ¿El CTA es visible y accionable?

**Problemas identificados** (ordenados por impacto)
Lista los 5 principales problemas con:
- Descripción del problema
- Por qué afecta la conversión
- Solución específica recomendada

**Puntos fuertes**
Qué está bien y debe mantenerse

**Puntuación**: /100 con breakdown por categoría (diseño, copy, CTA, trust signals, velocidad aparente)

**Quick wins**: 3 cambios que puedes hacer esta semana con alto impacto`,
    },
    {
      category: "Código",
      title: "Genera un script de Google Apps Script para Sheets",
      color: "#4285F4",
      prompt: `Necesito un script de Google Apps Script para Google Sheets que haga lo siguiente:

**Función principal**: [DESCRIBE QUÉ DEBE HACER]

**Datos de entrada**:
- Hoja de origen: [NOMBRE]
- Columnas relevantes: [LISTA]

**Datos de salida**:
- Hoja de destino: [NOMBRE o "misma"]
- Formato esperado: [DESCRIBE]

**Automatización**:
- Trigger: [MANUAL/AL ABRIR/CADA DÍA A LAS X]
- Notificaciones: [EMAIL si aplica]

El script debe:
1. Tener comentarios explicativos en cada función
2. Manejar errores con mensajes claros al usuario
3. Ser eficiente (evitar loops innecesarios)
4. Incluir una función de prueba/demo
5. Tener un menú personalizado en Sheets para ejecutarlo fácilmente

Incluye instrucciones de instalación paso a paso.`,
    },
    {
      category: "Estrategia",
      title: "Análisis de competidores con datos actualizados",
      color: "#4285F4",
      prompt: `Busca información actualizada sobre los principales competidores de una agencia de IA especializada en [NICHO] en España.

Para cada competidor que encuentres, analiza:

1. **Perfil**: Nombre, web, fundación, equipo
2. **Servicios**: Qué ofrecen exactamente
3. **Precios**: Si son públicos, rangos estimados
4. **Posicionamiento**: Cómo se presentan al mercado
5. **Presencia digital**: Redes sociales, contenido, SEO
6. **Casos de éxito publicados**: Clientes y resultados
7. **Puntos débiles**: Gaps o críticas que aparezcan online

Al final, proporciona:
- Mapa de posicionamiento (visualizado en texto)
- Oportunidades de diferenciación basadas en los gaps encontrados
- Recomendación de posicionamiento único para mi agencia

Incluye las URLs de tus fuentes y fecha de consulta.`,
    },
    {
      category: "Creatividad",
      title: "Genera ideas de contenido viral para redes sociales",
      color: "#4285F4",
      prompt: `Soy fundador de una agencia de IA especializada en [NICHO]. Necesito 20 ideas de contenido para [RED SOCIAL] que puedan volverse virales o tener alto alcance orgánico.

Para cada idea incluye:
- **Formato**: Reel/Carrusel/Post/Story/Video largo
- **Hook** (primeras palabras o imagen)
- **Desarrollo** (resumen en 2-3 líneas)
- **Potencial viral**: Por qué podría funcionar
- **Dificultad de producción**: 1-5 (1=muy fácil, 5=complejo)

Criterios para las ideas:
- Educativas sobre IA pero sin ser técnicas
- Que muestren resultados reales (o case studies)
- Que generen debate o reflexión
- Que posicionen como experto sin parecer vendedor
- Mezcla de tendencias actuales de [AÑO ACTUAL]

Ordénalas por potencial de engagement de mayor a menor.`,
    },
    {
      category: "Productividad",
      title: "Transcribe y resume reuniones con action items",
      color: "#4285F4",
      prompt: `[ADJUNTA LA TRANSCRIPCIÓN O NOTAS DE TU REUNIÓN]

Procesa esta reunión y genera:

**1. Resumen ejecutivo** (5 líneas máximo)
¿De qué trató la reunión y cuál fue el resultado principal?

**2. Decisiones tomadas**
Lista numerada de todas las decisiones con formato:
✅ [DECISIÓN] — Responsable: [NOMBRE] — Plazo: [FECHA]

**3. Action Items**
Tabla con:
| Tarea | Responsable | Fecha límite | Prioridad | Notas |

**4. Temas pendientes**
Puntos que quedaron sin resolver y deben tratarse en la próxima reunión

**5. Próxima reunión**
- Fecha propuesta (si se mencionó)
- Agenda tentativa basada en los temas pendientes

**6. Contexto importante**
Información de fondo relevante que se mencionó y puede ser útil más adelante

Formato: Markdown limpio, listo para Notion o Google Docs.`,
    },
  ],
};

const MODEL_CONFIG = {
  Claude: { color: "#9B30FF", bg: "rgba(155,48,255,0.08)", border: "rgba(155,48,255,0.25)", badge: "purple" as const },
  ChatGPT: { color: "#10A37F", bg: "rgba(16,163,127,0.08)", border: "rgba(16,163,127,0.25)", badge: "green" as const },
  Gemini: { color: "#4285F4", bg: "rgba(66,133,244,0.08)", border: "rgba(66,133,244,0.25)", badge: "blue" as const },
};

export default function PromptsPage() {
  const [activeModel, setActiveModel] = useState<Model>("Claude");
  const [copied, setCopied] = useState<number | null>(null);

  const copyPrompt = (prompt: string, index: number) => {
    navigator.clipboard.writeText(prompt);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const config = MODEL_CONFIG[activeModel];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Biblioteca de <GradientText>Prompts</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Los mejores prompts para Claude, ChatGPT y Gemini — listos para copiar y usar
        </p>
      </motion.div>

      {/* Model tabs */}
      <div className="flex gap-2">
        {(Object.keys(PROMPTS) as Model[]).map((model) => {
          const mc = MODEL_CONFIG[model];
          const isActive = activeModel === model;
          return (
            <button
              key={model}
              onClick={() => setActiveModel(model)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all border"
              style={{
                background: isActive ? mc.bg : "transparent",
                borderColor: isActive ? mc.border : "var(--border-subtle)",
                color: isActive ? mc.color : "var(--text-secondary)",
              }}
            >
              {model}
            </button>
          );
        })}
      </div>

      {/* Prompts */}
      <div className="space-y-4">
        {PROMPTS[activeModel].map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
            <NeonCard className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <NeonBadge color={config.badge} size="sm">{p.category}</NeonBadge>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne)" }}>
                    {p.title}
                  </h3>
                </div>
                <button
                  onClick={() => copyPrompt(p.prompt, i)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                  style={{
                    background: copied === i ? "rgba(0,255,136,0.1)" : config.bg,
                    borderColor: copied === i ? "rgba(0,255,136,0.4)" : config.border,
                    color: copied === i ? "#00FF88" : config.color,
                  }}
                >
                  {copied === i ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copiado
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copiar
                    </>
                  )}
                </button>
              </div>

              <pre
                className="text-xs leading-relaxed overflow-x-auto rounded-xl p-3 whitespace-pre-wrap"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                  fontFamily: "monospace",
                  maxHeight: "200px",
                }}
              >
                {p.prompt}
              </pre>
            </NeonCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
