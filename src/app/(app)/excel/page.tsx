"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import NeonBadge from "@/components/ui/NeonBadge";
import NeonCard from "@/components/ui/NeonCard";
import NeonButton from "@/components/ui/NeonButton";

const TEMPLATES = [
  {
    id: 1,
    name: "CRM de Clientes",
    desc: "Base de datos completa con clientes, estados, ingresos y seguimiento.",
    category: "CRM",
    color: "#00AAFF",
    icon: "👥",
    rows: 25,
    columns: ["ID", "Nombre", "Email", "Teléfono", "Empresa", "Estado", "Plan", "MRR", "Fecha Alta", "Notas"],
    data: [
      ["001", "María García", "maria@empresa.es", "+34 611 234 567", "Tech Solutions SL", "Activo", "Pro", "340€", "2024-01-15", "Cliente satisfecho"],
      ["002", "Carlos Ruiz", "carlos@innovate.com", "+34 622 345 678", "Innovate Digital", "Trial", "Free", "0€", "2024-02-20", "Evalúa plan Pro"],
      ["003", "Ana Martínez", "ana@clinica.es", "+34 633 456 789", "Clínica Estética Norte", "Activo", "Premium", "600€", "2023-11-05", "Renovación en marzo"],
      ["004", "Javier López", "javier@inmobiliaria.es", "+34 644 567 890", "Grupo Inmobiliario Sur", "Activo", "Pro", "340€", "2024-01-30", "Interesado en agentes IA"],
      ["005", "Laura Sánchez", "laura@ecommerce.com", "+34 655 678 901", "TiendaOnline24", "Inactivo", "Pro", "0€", "2023-09-12", "Canceló en diciembre"],
    ],
  },
  {
    id: 2,
    name: "Tracker de Leads",
    desc: "Seguimiento de prospectos desde el primer contacto hasta el cierre.",
    category: "Ventas",
    color: "#00FF88",
    icon: "🎯",
    rows: 30,
    columns: ["ID", "Nombre", "Empresa", "Origen", "Fase", "Valor Estimado", "Probabilidad", "Próximo Paso", "Fecha Contacto", "Responsable"],
    data: [
      ["L001", "Pedro Fernández", "Agencia Marketing Pro", "LinkedIn", "Propuesta Enviada", "2.400€", "70%", "Llamada cierre", "2024-03-01", "Admin"],
      ["L002", "Sofía Torres", "Consultora Torres & Co", "Referido", "Demo Realizada", "1.800€", "85%", "Enviar contrato", "2024-03-03", "Admin"],
      ["L003", "Miguel Alonso", "Restaurant Chain ESP", "Meta Ads", "Primer Contacto", "3.600€", "30%", "Agendar demo", "2024-03-05", "Admin"],
      ["L004", "Elena Castro", "Academia Online Elite", "Instagram", "Calificación", "1.200€", "55%", "Reunión virtual", "2024-03-06", "Admin"],
      ["L005", "Roberto Díaz", "Despacho Abogados Díaz", "Web Form", "Propuesta Enviada", "2.000€", "65%", "Follow-up email", "2024-02-28", "Admin"],
    ],
  },
  {
    id: 3,
    name: "Reporte Financiero Mensual",
    desc: "Resumen de ingresos, gastos y KPIs financieros de tu agencia.",
    category: "Finanzas",
    color: "#FFD700",
    icon: "💰",
    rows: 20,
    columns: ["Concepto", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Total H1"],
    data: [
      ["MRR Total", "3.200€", "3.540€", "3.880€", "4.220€", "4.560€", "4.900€", "24.300€"],
      ["Nuevos Clientes (MRR)", "340€", "340€", "340€", "340€", "340€", "340€", "2.040€"],
      ["Cancelaciones (MRR)", "0€", "0€", "0€", "0€", "0€", "0€", "0€"],
      ["Gastos Herramientas", "180€", "180€", "195€", "195€", "210€", "210€", "1.170€"],
      ["Gastos Marketing", "500€", "500€", "600€", "600€", "700€", "700€", "3.600€"],
      ["Beneficio Neto", "2.520€", "2.860€", "3.085€", "3.425€", "3.650€", "3.990€", "19.530€"],
      ["Margen %", "78.8%", "80.8%", "79.5%", "81.2%", "80.0%", "81.4%", "80.4%"],
    ],
  },
  {
    id: 4,
    name: "Planificación de Contenido",
    desc: "Calendario editorial con posts para redes sociales y blog.",
    category: "Marketing",
    color: "#A855F7",
    icon: "📅",
    rows: 28,
    columns: ["Semana", "Red Social", "Formato", "Tema / Título", "Copy (extracto)", "Hashtags", "Fecha Publicación", "Estado"],
    data: [
      ["S1", "LinkedIn", "Carrusel", "Cómo un agente IA vendió por mí mientras dormía", "Imagina despertar y ver 3 reuniones agendadas sin haber hecho nada...", "#IA #Automatización #Agencia", "2024-03-04", "Publicado"],
      ["S1", "Instagram", "Reel 30s", "El error #1 de las agencias IA en 2024", "El 90% de agencias IA falla por esto: no tienen un sistema de captación...", "#AgenciaIA #Emprendimiento", "2024-03-06", "Publicado"],
      ["S2", "LinkedIn", "Post texto", "Por qué cobro 2.000€/mes y mis clientes están felices", "El precio no se fija por horas, se fija por el valor que entregas...", "#Pricing #Freelance #IA", "2024-03-11", "Redactado"],
      ["S2", "TikTok", "Video 60s", "Demo en vivo de mi agente IA para clínicas", "En este video te muestro exactamente cómo funciona el bot que captura pacientes...", "#TikTokEmpresa #IA #Clinicas", "2024-03-13", "Pendiente"],
      ["S3", "LinkedIn", "Artículo", "El Stack de IA que uso en mi agencia (2024)", "Después de probar 40+ herramientas, estos son los 5 que uso en producción...", "#Stack #Herramientas #n8n", "2024-03-18", "Pendiente"],
    ],
  },
  {
    id: 5,
    name: "KPIs de Agentes IA",
    desc: "Métricas de rendimiento de tus agentes IA por cliente.",
    category: "Análisis",
    color: "#FF6B35",
    icon: "📊",
    rows: 22,
    columns: ["Agente", "Cliente", "Conversaciones/Mes", "Leads Capturados", "Tasa Conversión", "Tiempo Respuesta Prom.", "Satisfacción", "Revenue Generado"],
    data: [
      ["ARIA - Ventas", "Clínica Estética Norte", "342", "89", "26%", "< 2 min", "4.8/5", "18.600€"],
      ["NEXO - Soporte", "Tech Solutions SL", "156", "N/A", "N/A", "< 1 min", "4.9/5", "Retención"],
      ["LUNA - Booking", "Restaurant Chain ESP", "89", "34", "38%", "< 3 min", "4.6/5", "8.200€"],
      ["ATLAS - Lead Gen", "Grupo Inmobiliario Sur", "214", "67", "31%", "< 2 min", "4.7/5", "134.000€"],
      ["IRIS - Onboarding", "Academia Online Elite", "445", "N/A", "N/A", "< 1 min", "4.9/5", "Retención"],
    ],
  },
];

function generateAndDownloadXLSX(template: typeof TEMPLATES[0]) {
  // Dynamic import to avoid SSR issues
  import("xlsx").then((XLSX) => {
    const wb = XLSX.utils.book_new();

    // Main data sheet
    const wsData = [template.columns, ...template.data];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws["!cols"] = template.columns.map(() => ({ wch: 20 }));

    XLSX.utils.book_append_sheet(wb, ws, template.name);

    // Info sheet
    const infoData = [
      ["Plantilla:", template.name],
      ["Descripción:", template.desc],
      ["Categoría:", template.category],
      ["Generado por:", "Neuraxis IA"],
      ["Fecha:", new Date().toLocaleDateString("es-ES")],
      ["", ""],
      ["Filas de datos:", template.rows],
      ["Columnas:", template.columns.length],
    ];
    const wsInfo = XLSX.utils.aoa_to_sheet(infoData);
    wsInfo["!cols"] = [{ wch: 18 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, wsInfo, "Info");

    XLSX.writeFile(wb, `Neuraxis_${template.name.replace(/\s+/g, "_")}.xlsx`);
  });
}

export default function ExcelPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
          Excel <GradientText>IA</GradientText>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Descarga plantillas Excel profesionales listas para usar en tu agencia
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((tpl, i) => (
          <motion.div
            key={tpl.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <NeonCard hover className="p-5 flex flex-col gap-4 h-full">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{tpl.icon}</span>
                <NeonBadge
                  color={tpl.category === "CRM" ? "blue" : tpl.category === "Ventas" ? "green" : tpl.category === "Finanzas" ? "gold" : tpl.category === "Marketing" ? "purple" : "orange"}
                  size="sm"
                >
                  {tpl.category}
                </NeonBadge>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1.5" style={{ fontFamily: "var(--font-syne, sans-serif)", color: "var(--text-primary)" }}>
                  {tpl.name}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tpl.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                <span>{tpl.columns.length} columnas</span>
                <span>·</span>
                <span>~{tpl.rows} filas</span>
                <span>·</span>
                <span>.xlsx</span>
              </div>

              {/* Preview columns */}
              <div className="flex flex-wrap gap-1">
                {tpl.columns.slice(0, 4).map((col) => (
                  <span key={col} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${tpl.color}15`, color: tpl.color, border: `1px solid ${tpl.color}25` }}>
                    {col}
                  </span>
                ))}
                {tpl.columns.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
                    +{tpl.columns.length - 4} más
                  </span>
                )}
              </div>

              <NeonButton
                size="sm"
                className="w-full justify-center"
                onClick={() => generateAndDownloadXLSX(tpl)}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                }
              >
                Descargar Excel
              </NeonButton>
            </NeonCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
