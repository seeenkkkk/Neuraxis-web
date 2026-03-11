"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonCard from "@/components/ui/NeonCard";

const ARTICLES = [
  {
    id: 1,
    title: "Cómo construir un agente IA de ventas en 2024",
    category: "Agentes IA",
    readTime: "8 min",
    date: "1 Mar 2024",
    color: "#007AFF",
    excerpt: "Los agentes IA de ventas están revolucionando la forma en que las empresas captan y convierten clientes. En este artículo te explico paso a paso cómo construir uno desde cero.",
    content: `Los agentes IA de ventas están redefiniendo el embudo comercial moderno. Mientras un comercial humano puede gestionar 20-30 conversaciones al día, un agente IA bien configurado puede manejar miles simultáneamente, sin perder calidad.

**¿Qué es un agente IA de ventas?**

Un agente IA de ventas es un sistema autónomo que puede:
- Calificar leads automáticamente según criterios predefinidos
- Responder preguntas frecuentes con precisión
- Agendar reuniones en el calendario del comercial
- Hacer seguimiento automatizado por WhatsApp o email
- Detectar el momento óptimo para escalar a un humano

**Stack tecnológico recomendado**

Para construir un agente de ventas efectivo en 2024, te recomiendo este stack:

1. **LLM Base**: Claude Sonnet 4.6 (mejor relación calidad-precio) o GPT-4o para casos que requieran visión
2. **Orquestador**: n8n para los workflows de automatización
3. **CRM**: HubSpot o Notion como base de datos
4. **Mensajería**: WhatsApp Business API o Telegram Bot
5. **Scheduling**: Calendly con integración webhook

**Paso a paso: Tu primer agente de ventas**

*Paso 1: Define el ICP (Ideal Customer Profile)*
Antes de construir nada, necesitas saber exactamente a quién va dirigido tu agente. Documenta: sector, tamaño de empresa, cargo del decisor, problemas principales, objeciones frecuentes.

*Paso 2: Diseña el árbol de conversación*
Mapea todos los posibles caminos de la conversación: saludo inicial, calificación, presentación de solución, manejo de objeciones, cierre o escalado.

*Paso 3: Escribe el system prompt*
El system prompt es el alma de tu agente. Debe incluir: personalidad, misión, reglas de conversación, información de la empresa, y cuándo escalar a un humano.

*Paso 4: Conecta las herramientas*
Usa n8n para conectar: el LLM con el CRM, el calendario, y el canal de mensajería. Define los webhooks y los triggers de cada acción.

*Paso 5: Itera con datos reales*
Lanza con tráfico real, analiza las conversaciones, identifica los puntos de fricción y mejora el prompt semana a semana.

**Resultados que puedes esperar**

Con un agente IA de ventas bien configurado, nuestros clientes reportan:
- 40% más de leads calificados al mes
- 65% reducción en tiempo de respuesta inicial
- 3x más reuniones agendadas vs email frío

La clave está en la iteración constante y en no intentar automatizar todo desde el día 1.`,
  },
  {
    id: 2,
    title: "n8n vs Make vs Zapier: ¿cuál usar para tu agencia IA?",
    category: "Automatización",
    readTime: "6 min",
    date: "22 Feb 2024",
    color: "#00FF88",
    excerpt: "Comparativa honesta de las tres principales plataformas de automatización para agencias de IA. Te digo cuál uso yo y por qué.",
    content: `Cuando empiezas una agencia de IA, elegir la plataforma de automatización correcta puede marcar la diferencia entre un negocio escalable y uno que te consume todo el tiempo.

**n8n: La elección del arquitecto**

n8n es mi recomendación número uno para agencias que quieren escalar. Es open-source, puedes hostearla en tu propio servidor, y tiene integraciones nativas con LLMs.

Ventajas:
- Self-hosted = sin límites de ejecuciones
- Código JavaScript para lógica compleja
- Integración nativa con LangChain
- Ideal para workflows de IA complejos
- Coste previsible y bajo

Desventajas:
- Curva de aprendizaje más pronunciada
- Requiere conocimientos técnicos básicos

**Make (antes Integromat): El equilibrio**

Make es el punto medio entre potencia y accesibilidad. Tiene una interfaz muy visual y es ideal para agencias que sirven a clientes menos técnicos.

Ventajas:
- Interfaz visual muy intuitiva
- Excelente para demostrar a clientes
- Gran variedad de módulos
- Precio razonable

Desventajas:
- Límite de operaciones mensual
- Menos flexible para casos complejos de IA

**Zapier: El veterano accesible**

Zapier es el más conocido pero el menos recomendado para agencias IA serias. Caro a escala y con menos flexibilidad.

Ventajas:
- Curva de aprendizaje mínima
- Más de 5.000 integraciones
- Fiable y con buen soporte

Desventajas:
- Muy caro a escala
- Zaps de un solo paso (salvo plan superior)
- No pensado para IA nativa

**Mi recomendación**

Usa **n8n** si: tienes conocimientos técnicos básicos, quieres margen máximo, o construyes workflows complejos de IA.

Usa **Make** si: tus clientes quieren ver el workflow funcionando, o si el cliente tiene acceso directo.

Evita Zapier para agencias IA salvo para integraciones muy simples y puntuales.`,
  },
  {
    id: 3,
    title: "Prompt Engineering: La guía definitiva para Claude",
    category: "Prompt Engineering",
    readTime: "10 min",
    date: "15 Feb 2024",
    color: "#9B30FF",
    excerpt: "Técnicas avanzadas de prompt engineering específicamente para Claude. Aprende a extraer el máximo rendimiento de los modelos de Anthropic.",
    content: `Claude es, en mi opinión, el mejor LLM para casos de uso empresariales en 2024. Su capacidad de seguir instrucciones complejas y su alineación con valores hace que sea ideal para agentes de atención al cliente, ventas y soporte.

**Los 5 principios del prompt engineering para Claude**

**1. Claridad sobre brevedad**
Claude responde mejor a instrucciones explícitas y detalladas. No temas escribir system prompts largos si el caso lo requiere.

**2. XML para estructurar**
Claude fue entrenado con XML y lo procesa excepcionalmente bien:
\`\`\`
<contexto>Eres un agente de ventas para Clínica Norte...</contexto>
<reglas>
  - Siempre saluda por el nombre
  - Nunca menciones precios sin calificar primero
</reglas>
<objetivo>Agendar consultas de valoración gratuita</objetivo>
\`\`\`

**3. Few-shot examples**
Incluye 2-3 ejemplos de conversaciones ideales dentro del system prompt. Claude aprende el tono y el estilo mucho más rápido con ejemplos.

**4. Chain of Thought para decisiones**
Para decisiones complejas, pide a Claude que piense paso a paso:
"Antes de responder, analiza: 1) ¿El usuario está calificado? 2) ¿Qué objeción tiene? 3) ¿Cuál es la mejor respuesta?"

**5. Constitutional prompting**
Define explícitamente qué NO debe hacer el agente: "Nunca inventes información, nunca hagas promesas de resultados específicos, nunca critiques a la competencia."

**Técnicas avanzadas**

*Persona robusta*: Dale un nombre, historia, y valores a tu agente. "Eres ARIA, asistente de ventas de Clínica Norte desde 2022. Eres empática, profesional y genuinamente te importa ayudar a los pacientes."

*Manejo de contexto*: En conversaciones largas, resume el contexto clave cada N mensajes para no perder información importante.

*Escalado inteligente*: Define exactamente cuándo el agente debe decir "Voy a conectarte con un especialista" y cuáles son las señales de complejidad.

**Métricas para evaluar tu prompt**

- Tasa de conversación completada (sin abandonos)
- Porcentaje de escalados a humano
- Satisfacción del usuario (si implementas encuesta post-chat)
- Tiempo promedio de conversación

Un buen prompt de ventas debería lograr >25% de conversión lead → reunión.`,
  },
  {
    id: 4,
    title: "Cómo fijar precios en tu agencia IA (sin dejar dinero sobre la mesa)",
    category: "Negocio",
    readTime: "7 min",
    date: "8 Feb 2024",
    color: "#FFD700",
    excerpt: "El error de pricing más común en agencias IA es cobrar por horas. Te explico el modelo de precios basado en valor que multiplica tus ingresos.",
    content: `El 80% de las agencias IA nacientes cometen el mismo error: cobrar por horas o por "implementación". Este modelo te condena a un techo de ingresos y a una dependencia constante de nuevos clientes.

**El problema con cobrar por horas**

Cuando cobras 50€/hora por implementar un agente IA, estás:
- Limitando tus ingresos a las horas que puedes trabajar
- Incentivando al cliente a pedirte lo mínimo
- Creando una relación transaccional en vez de estratégica
- Compitiendo con freelancers de países con menor coste de vida

**El modelo correcto: Value-Based Pricing**

El value-based pricing parte de una pregunta simple: **¿cuánto vale lo que entregas para el cliente?**

Ejemplo real: Un agente IA de ventas para una clínica estética que:
- Gestiona 300 conversaciones/mes
- Convierte al 25% → 75 consultas
- De las cuales cierran el 40% → 30 clientes nuevos
- Ticket promedio de tratamiento: 400€
- Valor generado: **12.000€/mes**

¿Cuánto puedes cobrar? Fácilmente entre 800€ y 1.500€/mes de retainer, representando entre el 6% y el 12% del valor generado. El cliente gana, tú ganas.

**Los 3 paquetes que recomiendo**

*Paquete Starter (500-800€/mes)*
- 1 agente IA configurado
- Hasta 500 conversaciones/mes
- Soporte por email
- Reportes mensuales

*Paquete Growth (1.200-1.800€/mes)*
- 3 agentes IA (ventas + soporte + booking)
- Conversaciones ilimitadas
- Integración CRM + calendario
- Reunión mensual de revisión

*Paquete Scale (2.500-4.000€/mes)*
- Suite completa de automatización
- Workflows n8n personalizados
- Onboarding de equipo
- Soporte prioritario 24h

**Cómo presentar el precio**

Nunca presentes el precio sin antes haber calculado el ROI del cliente. La conversación debe ser:

"Basándonos en tu ticket promedio de X€ y tu tasa de conversión actual, este sistema podría generarte entre 8.000€ y 15.000€ adicionales al mes. La inversión es de 1.500€/mes. ¿Tiene sentido para ti?"

A nadie le duele pagar 1.500€ si entiende que va a recibir 10x.`,
  },
  {
    id: 5,
    title: "Los 10 mejores nichos para agencias de IA en 2024",
    category: "Estrategia",
    readTime: "5 min",
    date: "1 Feb 2024",
    color: "#FF6B35",
    excerpt: "No todos los nichos son igual de rentables para una agencia de IA. Aquí tienes los 10 sectores con mayor potencial y menor competencia.",
    content: `Elegir el nicho correcto puede ser la diferencia entre luchar por cada cliente y tener lista de espera. Después de analizar +200 agencias IA, estos son los 10 nichos con mayor ROI.

**1. Clínicas Estéticas y de Salud**
Por qué: Alto ticket, competencia feroz por citas, mucho volumen de consultas repetitivas.
Solución IA: Agente de booking + calificación de procedimientos + seguimiento post-tratamiento.
Ticket promedio de agencia: 1.200-2.000€/mes

**2. Inmobiliarias**
Por qué: El 80% de los leads inmobiliarios se pierden por falta de seguimiento inmediato.
Solución IA: Agente 24/7 que califica propiedades, agenda visitas y hace nurture.
Ticket promedio: 1.500-3.000€/mes

**3. Academia y Formación Online**
Por qué: Necesitan soporte constante para alumnos y ventas recurrentes de nuevos cursos.
Solución IA: Bot de soporte académico + vendedor de upsell de programas.
Ticket promedio: 800-1.500€/mes

**4. Restaurantes y Hostelería**
Por qué: Gestión de reservas, respuesta a reseñas y pedidos online es un caos sin IA.
Solución IA: Agente de reservas + gestión de reseñas Google + atención WhatsApp.
Ticket promedio: 500-900€/mes

**5. Despachos de Abogados**
Por qué: Alto volumen de consultas iniciales repetitivas, mucho valor por cliente captado.
Solución IA: Agente de calificación + agenda + FAQ jurídico básico.
Ticket promedio: 1.000-2.000€/mes

**6. Agencias de Seguros**
Por qué: Proceso de comparación y cotización perfectamente automatizable.
Solución IA: Bot de cotización + nurture + renovaciones automáticas.
Ticket promedio: 1.500-2.500€/mes

**7. E-commerce (mediano)**
Por qué: Soporte al cliente, recuperación de carritos y upsell son tareas repetitivas.
Solución IA: Agente de soporte + recuperador de carritos + recomendador de productos.
Ticket promedio: 800-1.500€/mes

**8. Coaches y Consultores**
Por qué: Necesitan calificar muchos leads sin invertir tiempo propio en llamadas de discovery.
Solución IA: Agente de calificación + agenda de llamadas estratégicas.
Ticket promedio: 600-1.200€/mes

**9. Centros de Formación Presencial**
Por qué: Proceso de matrícula, dudas sobre cursos y seguimiento de abandonos es costoso.
Solución IA: Bot de información + matrícula guiada + seguimiento de ausencias.
Ticket promedio: 700-1.200€/mes

**10. SaaS B2B**
Por qué: Onboarding de usuarios, soporte técnico y reducción de churn son críticos.
Solución IA: Agente de onboarding + soporte técnico 24/7 + detección de churn.
Ticket promedio: 2.000-5.000€/mes

**Mi recomendación**

Elige un nicho donde: conoces el sector, hay volumen de empresas en tu zona, y el ticket del cliente te permite cobrar 1.000€+/mes con ROI claro. Clínicas y coaches son los más fáciles de empezar.`,
  },
  {
    id: 6,
    title: "Automatiza tu agencia: el sistema que me permite trabajar 4 horas al día",
    category: "Productividad",
    readTime: "9 min",
    date: "25 Ene 2024",
    color: "#00D4FF",
    excerpt: "El sistema de operaciones internas que uso para gestionar 8 clientes recurrentes con solo 4 horas de trabajo diario. Stack, procesos y automatizaciones.",
    content: `Cuando empecé mi agencia IA trabajaba 12 horas al día. Hoy gestiono 8 clientes recurrentes con una media de 4 horas diarias. Este es el sistema que lo hace posible.

**El problema del solopreneur**

Sin sistemas, cada cliente requiere:
- 2-3 horas/mes de reportes manuales
- 1-2 horas/semana de soporte reactivo
- Reuniones sin estructura
- Revisión manual de métricas

Con 8 clientes, eso son 40+ horas semanales solo en operaciones. Inviable.

**Mi sistema de 4 horas**

**Bloque 1 (09:00-11:00): Estrategia y creación**
Las primeras 2 horas las reservo para trabajo de alto valor: mejorar prompts, crear nuevas automatizaciones, preparar propuestas. Sin emails, sin Slack.

**Bloque 2 (11:00-12:00): Revisión de clientes**
Tengo un dashboard en Notion que agrega automáticamente (via n8n) las métricas de todos mis clientes. En 1 hora reviso todo y detecto anomalías.

**Bloque 3 (16:00-17:00): Comunicación**
Respondo emails, atiendo mensajes de clientes, hago las llamadas programadas. Todo en un bloque, nunca reactivo.

**Las automatizaciones que me liberan**

*Reporte automático de clientes*: n8n extrae métricas de cada agente IA cada lunes a las 9:00 y manda un email automático al cliente con su resumen. Yo no toco nada.

*Facturación automática*: Stripe + n8n genera y envía las facturas el día 1 de cada mes. Cobro automatizado, sin seguimiento manual.

*Onboarding de nuevos clientes*: Cuando un nuevo cliente firma, un workflow automatizado envía: email de bienvenida, accesos a la plataforma, solicitud de activos (logo, copy, etc.), y agenda la llamada de kickoff.

*Alertas de anomalías*: Si un agente tiene tasa de conversión < 15% o muchos abandonos, recibo una notificación automática en Telegram.

**El stack que uso**

- **Notion**: Base de operaciones y CRM interno
- **n8n (self-hosted)**: Automatizaciones
- **Stripe**: Pagos y facturación
- **Loom**: Vídeos explicativos para clientes
- **Calendly**: Reuniones sin email back-and-forth
- **Claude API**: Generación de reportes narrativos automáticos

**El resultado**

4 horas al día, 8 clientes, 12.000€/mes de MRR. La clave no es trabajar más, es diseñar sistemas que trabajen por ti.`,
  },
];

export default function ContentPage() {
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(ARTICLES.map((a) => a.category)))];
  const filtered = filter === "Todos" ? ARTICLES : ARTICLES.filter((a) => a.category === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Blog <GradientText>IA</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Artículos, guías y estrategias para escalar tu agencia de inteligencia artificial
        </p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all"
            style={{
              background: filter === cat ? "rgba(0,170,255,0.12)" : "transparent",
              borderColor: filter === cat ? "rgba(0,170,255,0.4)" : "var(--border-subtle)",
              color: filter === cat ? "#007AFF" : "var(--text-secondary)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article, i) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
            <NeonCard hover className="p-5 flex flex-col gap-3 h-full cursor-pointer" onClick={() => setSelectedArticle(article)}>
              <div className="flex items-center justify-between">
                <NeonBadge
                  color={article.category === "Agentes IA" ? "blue" : article.category === "Automatización" ? "green" : article.category === "Prompt Engineering" ? "purple" : article.category === "Negocio" ? "gold" : article.category === "Estrategia" ? "orange" : "cyan"}
                  size="sm"
                >
                  {article.category}
                </NeonBadge>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{article.readTime}</span>
              </div>

              <h3 className="font-bold text-sm leading-snug flex-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
                {article.title}
              </h3>

              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{article.date}</span>
                <span className="text-xs font-medium" style={{ color: article.color }}>Leer →</span>
              </div>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Article modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-2xl rounded-2xl p-6 mb-8"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <NeonBadge color="blue" size="sm">{selectedArticle.category}</NeonBadge>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{selectedArticle.readTime} · {selectedArticle.date}</span>
                </div>
                <button onClick={() => setSelectedArticle(null)} className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(255,255,255,0.05)]" style={{ color: "var(--text-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <h2 className="text-xl font-black mb-4" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
                {selectedArticle.title}
              </h2>

              <div className="prose prose-invert max-w-none space-y-3">
                {selectedArticle.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return <h3 key={i} className="text-sm font-bold mt-4" style={{ color: "var(--text-primary)", fontFamily: "var(--font-syne)" }}>{para.replace(/\*\*/g, "")}</h3>;
                  }
                  if (para.startsWith("*") && para.endsWith("*")) {
                    return <h4 key={i} className="text-xs font-semibold mt-3" style={{ color: selectedArticle.color }}>{para.replace(/\*/g, "")}</h4>;
                  }
                  return (
                    <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}
                      dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
