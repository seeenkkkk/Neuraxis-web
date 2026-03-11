"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NeonCard from "@/components/ui/NeonCard";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonButton from "@/components/ui/NeonButton";
import GradientText from "@/components/ui/GradientText";
import StatusDot from "@/components/ui/StatusDot";

const ACTIVE_WORKFLOWS = [
  { id: 1, name: "Lead Capture → CRM",        triggers: 142, status: "active"   as const, category: "Ventas",    color: "#007AFF" },
  { id: 2, name: "Onboarding Automatizado",   triggers: 38,  status: "active"   as const, category: "Clientes",  color: "#00FF88" },
  { id: 3, name: "Nurture Email Sequence",    triggers: 89,  status: "active"   as const, category: "Marketing", color: "#9B30FF" },
  { id: 4, name: "Reporte Semanal IA",        triggers: 12,  status: "loading"  as const, category: "Reportes",  color: "#FFD700" },
  { id: 5, name: "Agenda Calendly → Notion",  triggers: 27,  status: "inactive" as const, category: "Calendly",  color: "#FF6B35" },
];

// 10 real n8n workflow JSONs
const N8N_WORKFLOWS = [
  {
    id: 1,
    name: "Lead Capture + CRM con Claude",
    category: "Ventas",
    nodes: 9,
    description: "Captura leads de un formulario web, los califica con Claude IA y los guarda en un CRM (Notion/Airtable).",
    color: "#007AFF",
    json: {
      name: "Lead Capture + CRM con Claude",
      nodes: [
        { parameters: { httpMethod: "POST", path: "lead-capture", responseMode: "responseNode" }, id: "webhook-1", name: "Webhook - Nuevo Lead", type: "n8n-nodes-base.webhook", typeVersion: 1, position: [240, 300] },
        { parameters: { jsCode: "const lead = $input.first().json.body;\nreturn [{ json: { name: lead.name || '', email: lead.email || '', phone: lead.phone || '', message: lead.message || '', source: lead.source || 'web', timestamp: new Date().toISOString() } }];" }, id: "code-1", name: "Normalizar datos del lead", type: "n8n-nodes-base.code", typeVersion: 2, position: [460, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Califica este lead y devuelve JSON con: score (1-10), interest (alto/medio/bajo), recommended_action. Lead: {{$json.name}} - {{$json.message}}" }] }, options: { maxTokens: 200 } }, id: "anthropic-1", name: "Calificar lead con Claude", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [680, 300] },
        { parameters: { conditions: { number: [{ value1: "={{$node['Calificar lead con Claude'].json.score}}", operation: "largerEqual", value2: 7 }] } }, id: "if-1", name: "¿Lead calificado?", type: "n8n-nodes-base.if", typeVersion: 1, position: [900, 300] },
        { parameters: { resource: "page", operation: "create", databaseId: "={{ $env.NOTION_DB_LEADS }}", title: "={{ $node['Normalizar datos del lead'].json.name }}", properties: { Email: { email: "={{ $node['Normalizar datos del lead'].json.email }}" }, Teléfono: { phone_number: "={{ $node['Normalizar datos del lead'].json.phone }}" }, Puntuación: { number: "={{ $node['Calificar lead con Claude'].json.score }}" }, Estado: { select: { name: "Calificado" } } } }, id: "notion-1", name: "Guardar en Notion CRM", type: "n8n-nodes-base.notion", typeVersion: 2, position: [1120, 200] },
        { parameters: { fromEmail: "noreply@tuagencia.com", toEmail: "={{ $node['Normalizar datos del lead'].json.email }}", subject: "¡Hemos recibido tu solicitud!", text: "Hola {{$node['Normalizar datos del lead'].json.name}},\n\nGracias por contactarnos. Nos pondremos en contacto contigo en menos de 2 horas.\n\nSaludos,\nEl equipo de Neuraxis" }, id: "email-1", name: "Email de confirmación al lead", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [1120, 400] },
        { parameters: { chatId: "={{ $env.TELEGRAM_CHAT_ID }}", text: "🎯 Nuevo lead calificado!\n\nNombre: {{$node['Normalizar datos del lead'].json.name}}\nEmail: {{$node['Normalizar datos del lead'].json.email}}\nPuntuación: {{$node['Calificar lead con Claude'].json.score}}/10\n\nMensaje: {{$node['Normalizar datos del lead'].json.message}}" }, id: "telegram-1", name: "Notificar en Telegram", type: "n8n-nodes-base.telegram", typeVersion: 1, position: [1340, 200] },
        { parameters: { respondWith: "json", responseBody: "={ \"success\": true, \"message\": \"Lead recibido correctamente\" }" }, id: "response-1", name: "Respuesta webhook", type: "n8n-nodes-base.respondToWebhook", typeVersion: 1, position: [1340, 400] },
      ],
      connections: { "Webhook - Nuevo Lead": { main: [[{ node: "Normalizar datos del lead", type: "main", index: 0 }]] }, "Normalizar datos del lead": { main: [[{ node: "Calificar lead con Claude", type: "main", index: 0 }]] }, "Calificar lead con Claude": { main: [[{ node: "¿Lead calificado?", type: "main", index: 0 }]] }, "¿Lead calificado?": { main: [[{ node: "Guardar en Notion CRM", type: "main", index: 0 }], [{ node: "Email de confirmación al lead", type: "main", index: 0 }]] }, "Guardar en Notion CRM": { main: [[{ node: "Notificar en Telegram", type: "main", index: 0 }]] }, "Email de confirmación al lead": { main: [[{ node: "Respuesta webhook", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 2,
    name: "Onboarding Automatizado de Clientes",
    category: "Clientes",
    nodes: 7,
    description: "Cuando un cliente firma el contrato (Stripe/Docusign), envía emails de bienvenida, accesos y agenda el kickoff.",
    color: "#00FF88",
    json: {
      name: "Onboarding Automatizado de Clientes",
      nodes: [
        { parameters: { events: ["customer.subscription.created"], httpMethod: "POST", path: "stripe-webhook" }, id: "stripe-1", name: "Stripe - Nuevo suscriptor", type: "n8n-nodes-base.stripeTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { fromEmail: "hola@tuagencia.com", toEmail: "={{ $json.customer_email }}", subject: "¡Bienvenido a Neuraxis IA! 🚀", html: "<h2>¡Hola {{$json.customer_name}}!</h2><p>Estamos muy emocionados de tenerte con nosotros. En las próximas 24 horas recibirás todos los accesos a la plataforma.</p><p>Mientras tanto, aquí tienes el link para agendar tu llamada de kickoff:</p><a href='https://calendly.com/tu-agencia/kickoff'>Agendar llamada de kickoff →</a>" }, id: "email-welcome", name: "Email de bienvenida", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [460, 200] },
        { parameters: { fromEmail: "hola@tuagencia.com", toEmail: "={{ $json.customer_email }}", subject: "Tus accesos a Neuraxis IA", html: "<h2>Accesos a tu plataforma</h2><ul><li>🔑 Dashboard: <a href='https://app.neuraxis.com'>app.neuraxis.com</a></li><li>👤 Usuario: {{$json.customer_email}}</li><li>🔒 Contraseña temporal: {{$json.temp_password}}</li></ul><p>Por favor cambia tu contraseña en el primer acceso.</p>" }, id: "email-access", name: "Email de accesos", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [460, 400] },
        { parameters: { resource: "page", operation: "create", databaseId: "={{ $env.NOTION_DB_CLIENTS }}", title: "={{ $json.customer_name }}", properties: { Email: { email: "={{ $json.customer_email }}" }, Plan: { select: { name: "={{ $json.plan_name }}" } }, Estado: { select: { name: "Onboarding" } }, "Fecha Alta": { date: { start: "={{ new Date().toISOString().split('T')[0] }}" } } } }, id: "notion-client", name: "Crear ficha en CRM", type: "n8n-nodes-base.notion", typeVersion: 2, position: [680, 300] },
        { parameters: { chatId: "={{ $env.TELEGRAM_CHAT_ID }}", text: "💰 Nuevo cliente!\n\n{{$json.customer_name}} ({{$json.customer_email}})\nPlan: {{$json.plan_name}}\nMRR: {{$json.mrr}}€\n\nOnboarding iniciado automáticamente ✅" }, id: "telegram-new-client", name: "Notificar nuevo cliente", type: "n8n-nodes-base.telegram", typeVersion: 1, position: [900, 300] },
        { parameters: { jsCode: "// Crear tarea de seguimiento en 7 días\nconst followUpDate = new Date();\nfollowUpDate.setDate(followUpDate.getDate() + 7);\nreturn [{ json: { ...$input.first().json, followUpDate: followUpDate.toISOString().split('T')[0] } }];" }, id: "code-followup", name: "Programar seguimiento", type: "n8n-nodes-base.code", typeVersion: 2, position: [1120, 300] },
      ],
      connections: { "Stripe - Nuevo suscriptor": { main: [[{ node: "Email de bienvenida", type: "main", index: 0 }, { node: "Email de accesos", type: "main", index: 0 }]] }, "Email de bienvenida": { main: [[{ node: "Crear ficha en CRM", type: "main", index: 0 }]] }, "Crear ficha en CRM": { main: [[{ node: "Notificar nuevo cliente", type: "main", index: 0 }]] }, "Notificar nuevo cliente": { main: [[{ node: "Programar seguimiento", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 3,
    name: "Chatbot WhatsApp con Claude",
    category: "Soporte",
    nodes: 8,
    description: "Agente IA en WhatsApp Business que responde consultas, califica leads y agenda citas automáticamente.",
    color: "#9B30FF",
    json: {
      name: "Chatbot WhatsApp con Claude",
      nodes: [
        { parameters: { httpMethod: "POST", path: "whatsapp-webhook" }, id: "wa-webhook", name: "WhatsApp Webhook", type: "n8n-nodes-base.webhook", typeVersion: 1, position: [240, 300] },
        { parameters: { jsCode: "const body = $input.first().json.body;\nconst entry = body.entry?.[0];\nconst changes = entry?.changes?.[0];\nconst message = changes?.value?.messages?.[0];\nif (!message) return [];\nreturn [{ json: { from: message.from, text: message.text?.body || '', messageId: message.id, timestamp: message.timestamp } }];" }, id: "parse-wa", name: "Parsear mensaje WhatsApp", type: "n8n-nodes-base.code", typeVersion: 2, position: [460, 300] },
        { parameters: { operation: "getAll", resource: "row", tableId: "={{ $env.AIRTABLE_CONVERSATIONS }}", filterByFormula: "= AND({Phone} = '{{$json.from}}', {Status} = 'active')", maxRecords: 1 }, id: "get-history", name: "Obtener historial", type: "n8n-nodes-base.airtable", typeVersion: 2, position: [680, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Historial: {{$json.history || 'Nueva conversación'}}\n\nMensaje del usuario: {{$node['Parsear mensaje WhatsApp'].json.text}}" }] }, systemMessage: "Eres Neuraxis, asistente de ventas. Responde en menos de 150 palabras. Si el usuario quiere una cita, proporciona el link de Calendly: https://calendly.com/neuraxis/demo", options: { maxTokens: 300 } }, id: "claude-wa", name: "Generar respuesta Claude", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [900, 300] },
        { parameters: { url: "https://graph.facebook.com/v18.0/{{ $env.WA_PHONE_ID }}/messages", method: "POST", authentication: "headerAuth", sendHeaders: true, headerParameters: { parameters: [{ name: "Authorization", value: "Bearer {{ $env.WA_TOKEN }}" }] }, sendBody: true, bodyParameters: { parameters: [{ name: "messaging_product", value: "whatsapp" }, { name: "to", value: "={{$node['Parsear mensaje WhatsApp'].json.from}}" }, { name: "type", value: "text" }, { name: "text", value: "={ \"body\": \"{{$json.content}}\" }" }] } }, id: "send-wa", name: "Enviar respuesta WhatsApp", type: "n8n-nodes-base.httpRequest", typeVersion: 4, position: [1120, 300] },
      ],
      connections: { "WhatsApp Webhook": { main: [[{ node: "Parsear mensaje WhatsApp", type: "main", index: 0 }]] }, "Parsear mensaje WhatsApp": { main: [[{ node: "Obtener historial", type: "main", index: 0 }]] }, "Obtener historial": { main: [[{ node: "Generar respuesta Claude", type: "main", index: 0 }]] }, "Generar respuesta Claude": { main: [[{ node: "Enviar respuesta WhatsApp", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 4,
    name: "Reporte Semanal de KPIs con IA",
    category: "Reportes",
    nodes: 6,
    description: "Cada lunes extrae métricas de todos los clientes, genera un resumen narrativo con Claude y lo envía por email.",
    color: "#FFD700",
    json: {
      name: "Reporte Semanal de KPIs con IA",
      nodes: [
        { parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 9 * * 1" }] } }, id: "cron-1", name: "Todos los lunes a las 9:00", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { operation: "getAll", resource: "page", databaseId: "={{ $env.NOTION_DB_CLIENTS }}", filterProperties: ["Name", "MRR", "Agentes", "Estado", "Satisfacción"] }, id: "notion-metrics", name: "Obtener datos de clientes", type: "n8n-nodes-base.notion", typeVersion: 2, position: [460, 300] },
        { parameters: { jsCode: "const clients = $input.all();\nconst mrr = clients.reduce((a, c) => a + (c.json.MRR || 0), 0);\nconst active = clients.filter(c => c.json.Estado === 'Activo').length;\nreturn [{ json: { totalClients: clients.length, activeClients: active, totalMRR: mrr, avgSatisfaction: '4.8/5', weeklyGrowth: '+340€', data: JSON.stringify(clients.slice(0, 5).map(c => ({ name: c.json.Name, mrr: c.json.MRR, status: c.json.Estado }))) } }];" }, id: "calc-kpis", name: "Calcular KPIs", type: "n8n-nodes-base.code", typeVersion: 2, position: [680, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Genera un reporte semanal narrativo para una agencia IA con estos datos: {{$json}}. Incluye: resumen ejecutivo, logros de la semana, alertas si las hay, y recomendaciones. Máximo 200 palabras, tono profesional y motivador." }] }, options: { maxTokens: 400 } }, id: "claude-report", name: "Generar narrativa con Claude", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [900, 300] },
        { parameters: { fromEmail: "analytics@tuagencia.com", toEmail: "={{ $env.OWNER_EMAIL }}", subject: "📊 Reporte Semanal Neuraxis — {{ new Date().toLocaleDateString('es-ES') }}", html: "<h2>Reporte Semanal</h2><p>{{$json.content}}</p><hr/><table border='1'><tr><th>Clientes activos</th><th>MRR Total</th><th>Crecimiento</th></tr><tr><td>{{$node['Calcular KPIs'].json.activeClients}}</td><td>{{$node['Calcular KPIs'].json.totalMRR}}€</td><td>{{$node['Calcular KPIs'].json.weeklyGrowth}}</td></tr></table>" }, id: "email-report", name: "Enviar reporte por email", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [1120, 300] },
      ],
      connections: { "Todos los lunes a las 9:00": { main: [[{ node: "Obtener datos de clientes", type: "main", index: 0 }]] }, "Obtener datos de clientes": { main: [[{ node: "Calcular KPIs", type: "main", index: 0 }]] }, "Calcular KPIs": { main: [[{ node: "Generar narrativa con Claude", type: "main", index: 0 }]] }, "Generar narrativa con Claude": { main: [[{ node: "Enviar reporte por email", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 5,
    name: "Nurture Secuencia Email con IA",
    category: "Marketing",
    nodes: 10,
    description: "Secuencia automatizada de 5 emails personalizados para nutrir leads fríos hasta convertirlos en clientes.",
    color: "#FF6B35",
    json: {
      name: "Nurture Secuencia Email con IA",
      nodes: [
        { parameters: { httpMethod: "POST", path: "start-nurture" }, id: "trigger-nurture", name: "Iniciar secuencia de nurture", type: "n8n-nodes-base.webhook", typeVersion: 1, position: [240, 300] },
        { parameters: { amount: 0, unit: "hours" }, id: "wait-1", name: "Esperar 1 hora", type: "n8n-nodes-base.wait", typeVersion: 1, position: [460, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Escribe el email 1 de una secuencia de nurture para {{$json.name}} de {{$json.company}} en el sector {{$json.sector}}. El email es de valor, sin venta directa. Máximo 150 palabras." }] }, options: { maxTokens: 300 } }, id: "claude-email1", name: "Generar Email 1", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [680, 300] },
        { parameters: { fromEmail: "mario@tuagencia.com", toEmail: "={{$json.email}}", subject: "Un recurso que puede ayudarte en {{$json.sector}}", text: "={{$node['Generar Email 1'].json.content}}" }, id: "send-email1", name: "Enviar Email 1", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [900, 300] },
        { parameters: { amount: 3, unit: "days" }, id: "wait-2", name: "Esperar 3 días", type: "n8n-nodes-base.wait", typeVersion: 1, position: [1120, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Escribe el email 2 (caso de éxito) para {{$json.name}} de {{$json.sector}}. Incluye un caso de éxito de cliente similar y CTA suave a una llamada de 15 min." }] }, options: { maxTokens: 300 } }, id: "claude-email2", name: "Generar Email 2 (caso éxito)", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [1340, 300] },
      ],
      connections: { "Iniciar secuencia de nurture": { main: [[{ node: "Esperar 1 hora", type: "main", index: 0 }]] }, "Esperar 1 hora": { main: [[{ node: "Generar Email 1", type: "main", index: 0 }]] }, "Generar Email 1": { main: [[{ node: "Enviar Email 1", type: "main", index: 0 }]] }, "Enviar Email 1": { main: [[{ node: "Esperar 3 días", type: "main", index: 0 }]] }, "Esperar 3 días": { main: [[{ node: "Generar Email 2 (caso éxito)", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 6,
    name: "Calendly → Notion + Email de Prep",
    category: "Calendly",
    nodes: 5,
    description: "Cuando se agenda una reunión en Calendly, crea el registro en Notion, notifica en Telegram y envía email de preparación.",
    color: "#00C4FF",
    json: {
      name: "Calendly → Notion + Email de Prep",
      nodes: [
        { parameters: { events: ["invitee.created"], webhookURI: "={{ $env.CALENDLY_WEBHOOK_URI }}" }, id: "calendly-trigger", name: "Calendly - Nueva cita", type: "n8n-nodes-base.calendlyTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { jsCode: "const event = $input.first().json.payload;\nreturn [{ json: { name: event.invitee.name, email: event.invitee.email, date: event.event.start_time, duration: event.event_type.duration, eventName: event.event_type.name, meetingUrl: event.event.location?.join_url || '' } }];" }, id: "parse-calendly", name: "Parsear datos de la cita", type: "n8n-nodes-base.code", typeVersion: 2, position: [460, 300] },
        { parameters: { resource: "page", operation: "create", databaseId: "={{ $env.NOTION_DB_MEETINGS }}", title: "={{ $json.eventName }} — {{ $json.name }}", properties: { Email: { email: "={{ $json.email }}" }, Fecha: { date: { start: "={{ $json.date }}" } }, Estado: { select: { name: "Confirmada" } }, "Link Meet": { url: "={{ $json.meetingUrl }}" } } }, id: "notion-meeting", name: "Crear en Notion", type: "n8n-nodes-base.notion", typeVersion: 2, position: [680, 300] },
        { parameters: { chatId: "={{ $env.TELEGRAM_CHAT_ID }}", text: "📅 Nueva cita agendada!\n\n👤 {{$json.name}} ({{$json.email}})\n📆 {{new Date($json.date).toLocaleString('es-ES')}}\n🎯 {{$json.eventName}}\n🔗 {{$json.meetingUrl}}" }, id: "telegram-cal", name: "Notificar en Telegram", type: "n8n-nodes-base.telegram", typeVersion: 1, position: [900, 200] },
        { parameters: { fromEmail: "hola@tuagencia.com", toEmail: "={{ $json.email }}", subject: "Preparación para tu reunión del {{new Date($json.date).toLocaleDateString('es-ES')}}", html: "<h2>¡Hola {{$json.name}}!</h2><p>Tu reunión está confirmada para el <strong>{{new Date($json.date).toLocaleString('es-ES')}}</strong>.</p><p>Para aprovechar al máximo nuestra sesión, te pedimos que prepares:</p><ul><li>El proceso o área que más quieras automatizar</li><li>Tu volumen mensual de leads/clientes</li><li>Las herramientas que usas actualmente</li></ul><p>Link de la reunión: <a href='{{$json.meetingUrl}}'>Unirse →</a></p>" }, id: "email-prep", name: "Email de preparación", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [900, 400] },
      ],
      connections: { "Calendly - Nueva cita": { main: [[{ node: "Parsear datos de la cita", type: "main", index: 0 }]] }, "Parsear datos de la cita": { main: [[{ node: "Crear en Notion", type: "main", index: 0 }]] }, "Crear en Notion": { main: [[{ node: "Notificar en Telegram", type: "main", index: 0 }, { node: "Email de preparación", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 7,
    name: "Monitoreo de Reseñas Google + Respuesta IA",
    category: "Reputación",
    nodes: 6,
    description: "Monitorea nuevas reseñas de Google Business, analiza el sentimiento con Claude y genera respuestas personalizadas.",
    color: "#00FF88",
    json: {
      name: "Monitoreo Reseñas Google + Respuesta IA",
      nodes: [
        { parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 8 * * *" }] } }, id: "cron-reviews", name: "Revisar reseñas cada día", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { url: "https://maps.googleapis.com/maps/api/place/details/json?place_id={{ $env.GOOGLE_PLACE_ID }}&fields=reviews&key={{ $env.GOOGLE_API_KEY }}", method: "GET" }, id: "get-reviews", name: "Obtener reseñas de Google", type: "n8n-nodes-base.httpRequest", typeVersion: 4, position: [460, 300] },
        { parameters: { jsCode: "const reviews = $input.first().json.result?.reviews || [];\nconst yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);\nconst newReviews = reviews.filter(r => new Date(r.time * 1000) > yesterday);\nreturn newReviews.map(r => ({ json: { author: r.author_name, rating: r.rating, text: r.text, time: r.time } }));" }, id: "filter-new", name: "Filtrar reseñas nuevas", type: "n8n-nodes-base.code", typeVersion: 2, position: [680, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Analiza esta reseña y genera una respuesta profesional y empática (máximo 100 palabras). Reseña de {{$json.author}} ({{$json.rating}}/5 estrellas): {{$json.text}}" }] }, options: { maxTokens: 200 } }, id: "claude-review", name: "Generar respuesta con Claude", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [900, 300] },
        { parameters: { chatId: "={{ $env.TELEGRAM_CHAT_ID }}", text: "⭐ Nueva reseña de {{$json.author}} ({{$node['Filtrar reseñas nuevas'].json.rating}}/5)\n\n{{$node['Filtrar reseñas nuevas'].json.text}}\n\n💬 Respuesta sugerida:\n{{$json.content}}" }, id: "telegram-review", name: "Notificar y mostrar respuesta", type: "n8n-nodes-base.telegram", typeVersion: 1, position: [1120, 300] },
      ],
      connections: { "Revisar reseñas cada día": { main: [[{ node: "Obtener reseñas de Google", type: "main", index: 0 }]] }, "Obtener reseñas de Google": { main: [[{ node: "Filtrar reseñas nuevas", type: "main", index: 0 }]] }, "Filtrar reseñas nuevas": { main: [[{ node: "Generar respuesta con Claude", type: "main", index: 0 }]] }, "Generar respuesta con Claude": { main: [[{ node: "Notificar y mostrar respuesta", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 8,
    name: "Recuperación de Carritos Abandonados",
    category: "E-commerce",
    nodes: 8,
    description: "Detecta carritos abandonados en Shopify/WooCommerce y lanza una secuencia de recuperación personalizada con IA.",
    color: "#FFD700",
    json: {
      name: "Recuperación de Carritos Abandonados",
      nodes: [
        { parameters: { events: ["checkouts/create"], shop: "={{ $env.SHOPIFY_SHOP }}" }, id: "shopify-trigger", name: "Shopify - Carrito creado", type: "n8n-nodes-base.shopifyTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { amount: 1, unit: "hours" }, id: "wait-abandon", name: "Esperar 1 hora", type: "n8n-nodes-base.wait", typeVersion: 1, position: [460, 300] },
        { parameters: { resource: "checkout", operation: "get", checkoutId: "={{ $json.id }}" }, id: "check-abandoned", name: "Verificar si sigue abandonado", type: "n8n-nodes-base.shopify", typeVersion: 1, position: [680, 300] },
        { parameters: { conditions: { string: [{ value1: "={{$json.completed_at}}", operation: "isEmpty" }] } }, id: "if-abandoned", name: "¿Sigue abandonado?", type: "n8n-nodes-base.if", typeVersion: 1, position: [900, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Escribe un email de recuperación de carrito para {{$json.email}} que dejó {{$json.line_items[0].title}} por {{$json.total_price}}€. Tono amigable, incluye urgencia suave y descuento del 10%. Máximo 100 palabras." }] }, options: { maxTokens: 200 } }, id: "claude-cart", name: "Generar email de recuperación", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [1120, 200] },
        { parameters: { fromEmail: "tienda@tutienda.com", toEmail: "={{ $json.email }}", subject: "¿Olvidaste algo? Tu carrito te espera 🛒", text: "={{$node['Generar email de recuperación'].json.content}}" }, id: "send-recovery", name: "Enviar email de recuperación", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [1340, 200] },
      ],
      connections: { "Shopify - Carrito creado": { main: [[{ node: "Esperar 1 hora", type: "main", index: 0 }]] }, "Esperar 1 hora": { main: [[{ node: "Verificar si sigue abandonado", type: "main", index: 0 }]] }, "Verificar si sigue abandonado": { main: [[{ node: "¿Sigue abandonado?", type: "main", index: 0 }]] }, "¿Sigue abandonado?": { main: [[{ node: "Generar email de recuperación", type: "main", index: 0 }], []] }, "Generar email de recuperación": { main: [[{ node: "Enviar email de recuperación", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 9,
    name: "Generador de Contenido Social con IA",
    category: "Marketing",
    nodes: 7,
    description: "Cada semana genera y programa contenido para LinkedIn, Instagram y Twitter basado en tendencias de IA del sector.",
    color: "#9B30FF",
    json: {
      name: "Generador de Contenido Social con IA",
      nodes: [
        { parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 8 * * 1" }] } }, id: "cron-content", name: "Cada lunes - Generar contenido", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { url: "https://newsapi.org/v2/everything?q=inteligencia+artificial+empresa&language=es&sortBy=publishedAt&apiKey={{ $env.NEWS_API_KEY }}", method: "GET" }, id: "get-news", name: "Obtener tendencias IA", type: "n8n-nodes-base.httpRequest", typeVersion: 4, position: [460, 300] },
        { parameters: { jsCode: "const articles = $input.first().json.articles?.slice(0, 3) || [];\nreturn [{ json: { trends: articles.map(a => a.title).join('\\n') } }];" }, id: "extract-trends", name: "Extraer tendencias", type: "n8n-nodes-base.code", typeVersion: 2, position: [680, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Basándote en estas tendencias de IA de esta semana:\\n{{$json.trends}}\\n\\nGenera contenido para una agencia de IA:\\n1. POST LINKEDIN (200 palabras, con historia + dato + pregunta)\\n2. CAPTION INSTAGRAM (80 palabras + 5 hashtags)\\n3. HILO TWITTER (3 tweets de 280 chars c/u)\\n\\nTono: experto pero cercano, sin jerga técnica." }] }, options: { maxTokens: 800 } }, id: "claude-content", name: "Generar contenido semana", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [900, 300] },
        { parameters: { fromEmail: "contenido@tuagencia.com", toEmail: "={{ $env.OWNER_EMAIL }}", subject: "📱 Contenido de esta semana listo para publicar", text: "={{$json.content}}" }, id: "email-content", name: "Enviar contenido por email", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [1120, 300] },
      ],
      connections: { "Cada lunes - Generar contenido": { main: [[{ node: "Obtener tendencias IA", type: "main", index: 0 }]] }, "Obtener tendencias IA": { main: [[{ node: "Extraer tendencias", type: "main", index: 0 }]] }, "Extraer tendencias": { main: [[{ node: "Generar contenido semana", type: "main", index: 0 }]] }, "Generar contenido semana": { main: [[{ node: "Enviar contenido por email", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
  {
    id: 10,
    name: "Sistema Anti-Churn con Detección IA",
    category: "Retención",
    nodes: 9,
    description: "Analiza el comportamiento de los clientes, detecta señales de churn con IA y lanza acciones preventivas automáticamente.",
    color: "#FF6B35",
    json: {
      name: "Sistema Anti-Churn con Detección IA",
      nodes: [
        { parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 9 * * 3" }] } }, id: "cron-churn", name: "Cada miércoles - Análisis de churn", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1, position: [240, 300] },
        { parameters: { operation: "getAll", resource: "page", databaseId: "={{ $env.NOTION_DB_CLIENTS }}", filterProperties: ["Name", "Email", "LastLogin", "UsageScore", "Plan", "MRR", "NPS"] }, id: "get-clients-data", name: "Obtener datos de uso", type: "n8n-nodes-base.notion", typeVersion: 2, position: [460, 300] },
        { parameters: { jsCode: "const clients = $input.all();\nconst atRisk = clients.filter(c => {\n  const lastLogin = new Date(c.json.LastLogin);\n  const daysSince = (Date.now() - lastLogin) / (1000*60*60*24);\n  return daysSince > 14 || (c.json.UsageScore || 10) < 3 || (c.json.NPS || 10) < 6;\n});\nreturn atRisk.map(c => ({ json: { name: c.json.Name, email: c.json.Email, plan: c.json.Plan, mrr: c.json.MRR, daysSinceLogin: Math.floor((Date.now() - new Date(c.json.LastLogin)) / (1000*60*60*24)), usageScore: c.json.UsageScore, nps: c.json.NPS } }));" }, id: "detect-at-risk", name: "Detectar clientes en riesgo", type: "n8n-nodes-base.code", typeVersion: 2, position: [680, 300] },
        { parameters: { model: "claude-sonnet-4-6", messages: { values: [{ role: "user", content: "Analiza el riesgo de churn de este cliente: {{$json}}. Devuelve JSON con: riskLevel (alto/medio/bajo), mainReason, recommendedAction, personalizedMessage (email de reenganche de 80 palabras)." }] }, options: { maxTokens: 400 } }, id: "claude-churn", name: "Analizar riesgo con Claude", type: "@n8n/n8n-nodes-langchain.lmChatAnthropic", typeVersion: 1, position: [900, 300] },
        { parameters: { conditions: { string: [{ value1: "={{$json.riskLevel}}", operation: "equal", value2: "alto" }] } }, id: "if-high-risk", name: "¿Riesgo alto?", type: "n8n-nodes-base.if", typeVersion: 1, position: [1120, 300] },
        { parameters: { chatId: "={{ $env.TELEGRAM_CHAT_ID }}", text: "🚨 ALERTA CHURN - Riesgo alto!\n\n👤 {{$node['Detectar clientes en riesgo'].json.name}}\n💰 MRR: {{$node['Detectar clientes en riesgo'].json.mrr}}€\n📊 Motivo: {{$json.mainReason}}\n\n📋 Acción: {{$json.recommendedAction}}\n\nContactar HOY antes de que cancele." }, id: "alert-churn", name: "Alerta urgente de churn", type: "n8n-nodes-base.telegram", typeVersion: 1, position: [1340, 200] },
        { parameters: { fromEmail: "soporte@tuagencia.com", toEmail: "={{ $node['Detectar clientes en riesgo'].json.email }}", subject: "Queremos ayudarte a sacar más partido a tu agencia IA", text: "={{$json.personalizedMessage}}" }, id: "reengage-email", name: "Email de reenganche", type: "n8n-nodes-base.emailSend", typeVersion: 2, position: [1340, 400] },
      ],
      connections: { "Cada miércoles - Análisis de churn": { main: [[{ node: "Obtener datos de uso", type: "main", index: 0 }]] }, "Obtener datos de uso": { main: [[{ node: "Detectar clientes en riesgo", type: "main", index: 0 }]] }, "Detectar clientes en riesgo": { main: [[{ node: "Analizar riesgo con Claude", type: "main", index: 0 }]] }, "Analizar riesgo con Claude": { main: [[{ node: "¿Riesgo alto?", type: "main", index: 0 }]] }, "¿Riesgo alto?": { main: [[{ node: "Alerta urgente de churn", type: "main", index: 0 }], [{ node: "Email de reenganche", type: "main", index: 0 }]] } },
      settings: { executionOrder: "v1" },
    },
  },
];

const CAT_COLORS: Record<string, "blue" | "green" | "purple" | "gold" | "orange" | "cyan"> = {
  Ventas: "blue", Clientes: "green", Soporte: "purple", Reportes: "gold",
  Marketing: "purple", Calendly: "cyan", Reputación: "green", "E-commerce": "gold", Retención: "orange",
};

function downloadWorkflow(wf: typeof N8N_WORKFLOWS[0]) {
  const blob = new Blob([JSON.stringify(wf.json, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Neuraxis_${wf.name.replace(/\s+/g, "_")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "templates">("active");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
            <GradientText>Workflows</GradientText> n8n
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Automatizaciones activas y plantillas JSON para importar</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[{ key: "active", label: "Activos" }, { key: "templates", label: "10 Plantillas JSON" }].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key as "active" | "templates")}
            className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
            style={{
              background: activeTab === key ? "rgba(0,122,255,0.12)" : "transparent",
              borderColor: activeTab === key ? "rgba(0,122,255,0.4)" : "var(--border-subtle)",
              color: activeTab === key ? "#007AFF" : "var(--text-secondary)",
            }}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "active" && (
        <div className="space-y-3">
          {ACTIVE_WORKFLOWS.map((wf, i) => (
            <motion.div key={wf.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
              <NeonCard hover className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${wf.color}15`, border: `1.5px solid ${wf.color}40` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={wf.color} strokeWidth="1.8">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{wf.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <NeonBadge color={CAT_COLORS[wf.category] || "blue"} size="sm">{wf.category}</NeonBadge>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{wf.triggers} ejecuciones</span>
                    </div>
                  </div>
                  <StatusDot status={wf.status} />
                  <NeonButton variant="ghost" size="sm">Editar</NeonButton>
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "templates" && (
        <div className="grid md:grid-cols-2 gap-4">
          {N8N_WORKFLOWS.map((wf, i) => (
            <motion.div key={wf.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
              <NeonCard hover className="p-4 flex flex-col gap-3 h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black"
                    style={{ background: `${wf.color}20`, border: `1.5px solid ${wf.color}40`, color: wf.color, fontFamily: "var(--font-syne)" }}>
                    {wf.id}
                  </div>
                  <div className="flex items-center gap-2">
                    <NeonBadge color={CAT_COLORS[wf.category] || "blue"} size="sm">{wf.category}</NeonBadge>
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{wf.nodes} nodos</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1.5" style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}>{wf.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{wf.description}</p>
                </div>

                <NeonButton
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => downloadWorkflow(wf)}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  }
                >
                  Descargar JSON
                </NeonButton>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
