import { ReactNode } from 'react';
import {
  Store,
  Send,
  ShieldCheck,
  Users,
  Layers,
  Smartphone,
  Activity,
  FileText,
  Upload,
  Code2,
  Terminal,
  Key,
  Workflow,
  Sparkles,
} from 'lucide-react';
import React from 'react';

export interface FeatureItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  detailedDescription: string;
  highlights: string[];
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'prefactura',
    icon: React.createElement(Store, { className: 'w-6 h-6 text-brand-primary' }),
    title: 'Prefactura y Captura',
    description:
      'Genera borradores antes de timbrar, captura libre de conceptos o importa desde tus sistemas. Flexible para cualquier tipo de negocio.',
    detailedDescription:
      'Crea prefacturas como borradores editables antes del timbrado definitivo. Captura conceptos manualmente, duplica facturas anteriores o importa datos desde Excel y otros sistemas. Ideal para operadores que revisan antes de enviar al PAC.',
    highlights: [
      'Borradores editables antes de timbrar',
      'Captura libre de conceptos e impuestos',
      'Importación desde Excel y sistemas externos',
      'Duplicar facturas anteriores en un clic',
    ],
  },
  {
    id: 'envio-automatico',
    icon: React.createElement(Send, { className: 'w-6 h-6 text-brand-tech' }),
    title: 'Envío Automático',
    description:
      'El XML y PDF se envían al receptor por correo y WhatsApp automáticamente al timbrar. Sin pasos manuales.',
    detailedDescription:
      'Al timbrar, CFID genera el XML y PDF y los distribuye automáticamente al receptor por correo electrónico y WhatsApp. Configura plantillas, copias al emisor y recordatorios sin intervención manual.',
    highlights: [
      'Envío automático de XML y PDF al timbrar',
      'Integración con correo y WhatsApp',
      'Plantillas personalizables por empresa',
      'Copia al emisor y archivado automático',
    ],
  },
  {
    id: 'web-movil',
    icon: React.createElement(Smartphone, { className: 'w-6 h-6 text-purple-400' }),
    title: '100% Web y Móvil',
    description:
      'Funciona desde cualquier navegador en PC, tablet o celular. Sin instalaciones, sin dependencias de equipo.',
    detailedDescription:
      'Accede desde cualquier dispositivo con navegador moderno. La interfaz se adapta a móvil y tablet para capturar, timbrar y consultar CFDI en campo. Sin instalaciones ni dependencia de un equipo específico.',
    highlights: [
      'Responsive en PC, tablet y celular',
      'Sin instalaciones locales',
      'Acceso desde cualquier navegador moderno',
      'Misma operación en oficina o en campo',
    ],
  },
  {
    id: 'cumplimiento-sat',
    icon: React.createElement(ShieldCheck, { className: 'w-6 h-6 text-green-400' }),
    title: 'Cumplimiento SAT',
    description:
      'CFDI 4.0 con validación en tiempo real antes de enviar al PAC. Detecta errores de RFC, uso de CFDI y complementos.',
    detailedDescription:
      'Validación estructural y fiscal antes de cada timbrado: RFC, régimen fiscal, uso de CFDI, complementos de pago, nómina y carta porte. Reduce rechazos del PAC y multas por errores de captura.',
    highlights: [
      'CFDI 4.0 con reglas SAT actualizadas',
      'Validación de RFC, uso CFDI y complementos',
      'Detección de errores antes del PAC',
      'Catálogos SAT sincronizados',
    ],
  },
  {
    id: 'control-roles',
    icon: React.createElement(Users, { className: 'w-6 h-6 text-yellow-400' }),
    title: 'Control por Roles',
    description:
      'Operador, jefe de tienda, administrador y superusuario: cada perfil ve solo lo que necesita y tiene permisos diferenciados.',
    detailedDescription:
      'Define perfiles con permisos granulares: captura, timbrado, cancelación, reportes y configuración. Cada sucursal o equipo opera con acceso acotado según su rol en la organización.',
    highlights: [
      'Perfiles: operador, jefe, admin y superusuario',
      'Permisos por módulo y acción',
      'Visibilidad acotada por sucursal o equipo',
      'Auditoría de operaciones por usuario',
    ],
  },
  {
    id: 'todo-en-uno',
    icon: React.createElement(Layers, { className: 'w-6 h-6 text-brand-primary' }),
    title: 'Todo en Uno',
    description:
      'Facturas, Notas de Crédito, Complementos de Pago, Nómina, Carta Porte y Retenciones en una sola plataforma unificada.',
    detailedDescription:
      'Centraliza todos los tipos de CFDI en una sola plataforma: facturas, notas de crédito, complementos de pago, recibos de nómina, carta porte y retenciones. Un solo acceso, un solo historial fiscal.',
    highlights: [
      'Facturas, NC, complementos y retenciones',
      'Recibos de nómina y carta porte',
      'Historial fiscal unificado',
      'Una sola plataforma para toda la operación',
    ],
  },
];

export const STAMPING_FEATURES: FeatureItem[] = [
  {
    id: 'alta-disponibilidad',
    icon: React.createElement(Activity, { className: 'w-6 h-6 text-brand-primary' }),
    title: 'Alta Disponibilidad',
    description: 'Monitor interno de logs y estado del servicio en tiempo real.',
    detailedDescription:
      'Infraestructura diseñada para operación continua con monitoreo interno de logs, alertas y estado del servicio en tiempo real. Detecta incidencias antes de que afecten tu operación de timbrado.',
    highlights: [
      'Monitor de logs y estado en tiempo real',
      'Alertas proactivas ante incidencias',
      'Alta disponibilidad para lotes y operación 1 a 1',
      'Historial de eventos del servicio',
    ],
  },
  {
    id: 'facturacion-1-a-1',
    icon: React.createElement(FileText, { className: 'w-6 h-6 text-brand-tech' }),
    title: 'Facturación 1 a 1',
    description: 'Captura libre o desde prefactura para operadores y profesionistas.',
    detailedDescription:
      'Emite comprobantes individuales con captura libre de conceptos o a partir de prefacturas. Ideal para operadores en mostrador, contadores y profesionistas que requieren control detallado antes de timbrar.',
    highlights: [
      'Captura libre o desde prefactura',
      'Interfaz optimizada para operadores',
      'Revisión antes de enviar al PAC',
      'Duplicar y editar comprobantes previos',
    ],
  },
  {
    id: 'carga-masiva',
    icon: React.createElement(Upload, { className: 'w-6 h-6 text-purple-400' }),
    title: 'Carga Masiva (Excel/XML)',
    description: 'Importa y procesa lotes de facturas o nóminas desde archivo.',
    detailedDescription:
      'Importa lotes completos desde Excel o XML y procesa cientos o miles de comprobantes en una sola operación. Ideal para nómina, facturación recurrente y cierres de periodo sin interrupciones.',
    highlights: [
      'Importación desde Excel y XML',
      'Procesamiento de lotes de facturas y nómina',
      'Reporte de errores por registro',
      'Reintento selectivo de comprobantes fallidos',
    ],
  },
  {
    id: 'validacion-tiempo-real',
    icon: React.createElement(ShieldCheck, { className: 'w-6 h-6 text-green-400' }),
    title: 'Validación en tiempo real',
    description: 'Detecta errores de RFC, complementos y estructura antes de enviar al PAC.',
    detailedDescription:
      'Cada comprobante se valida estructural y fiscalmente antes de llegar al PAC: RFC, complementos, impuestos y reglas SAT. Reduce rechazos, retrabajo y riesgo de multas por errores de captura.',
    highlights: [
      'Validación de RFC, complementos y estructura',
      'Reglas SAT actualizadas antes del PAC',
      'Detección de errores en lote y unitario',
      'Menos rechazos y retrabajo operativo',
    ],
  },
  {
    id: 'integracion-api-rest',
    icon: React.createElement(Code2, { className: 'w-6 h-6 text-yellow-400' }),
    title: 'Integración vía API REST',
    description: 'Colección Postman incluida. Conecta tu ERP, e-commerce o sistema propio de forma directa.',
    detailedDescription:
      'API REST documentada con colección Postman incluida. Integra CFID con tu ERP, e-commerce, POS o sistema propio para timbrar, consultar y cancelar CFDI de forma programática y segura.',
    highlights: [
      'API REST con documentación y Postman',
      'Integración con ERP, e-commerce y POS',
      'Conexión segura TLS 1.3',
      'Webhooks y consulta de estatus',
    ],
  },
];

export const AI_MCP_FEATURES: FeatureItem[] = [
  {
    id: 'servidor-mcp',
    icon: React.createElement(Terminal, { className: 'w-5 h-5 text-brand-tech' }),
    title: 'Servidor MCP incluido',
    description:
      'Expone timbrado, consulta de CFDI y catálogos SAT como herramientas listas para agentes de IA.',
    detailedDescription:
      'CFID incluye un servidor MCP que expone timbrado, consulta de CFDI, catálogos SAT y operaciones fiscales como herramientas estándar para agentes de IA. Sin desarrollar integraciones custom desde cero.',
    highlights: [
      'Herramientas MCP para timbrado y consulta',
      'Catálogos SAT disponibles para agentes',
      'Compatible con clientes MCP estándar',
      'Menos código de integración custom',
    ],
  },
  {
    id: 'auth-api-key',
    icon: React.createElement(Key, { className: 'w-5 h-5 text-brand-primary' }),
    title: 'Autenticación por API Key',
    description:
      'Genera claves por cliente o integración. Controla acceso sin compartir credenciales del PAC.',
    detailedDescription:
      'Genera API Keys por cliente, integración o agente. Controla permisos y revoca acceso sin exponer credenciales del PAC ni del emisor. Seguridad granular para entornos con múltiples sistemas conectados.',
    highlights: [
      'API Keys por cliente o integración',
      'Sin compartir credenciales del PAC',
      'Revocación y rotación de claves',
      'Control de acceso por operación',
    ],
  },
  {
    id: 'orquestacion-flujos',
    icon: React.createElement(Workflow, { className: 'w-5 h-5 text-purple-400' }),
    title: 'Orquestación de flujos',
    description:
      'Conecta Cursor, Claude Desktop, n8n o tu ERP para facturar, validar y enviar comprobantes automáticamente.',
    detailedDescription:
      'Orquesta flujos completos de facturación conectando Cursor, Claude Desktop, n8n, Make o tu ERP. Valida datos, genera pre-CFDI, timbra y envía comprobantes de forma automatizada.',
    highlights: [
      'Integración con Cursor y Claude Desktop',
      'Automatización con n8n y Make',
      'Flujos ERP → validación → timbrado → envío',
      'Menos pasos manuales en operación diaria',
    ],
  },
  {
    id: 'facturacion-conversacional',
    icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-green-400' }),
    title: 'Facturación conversacional',
    description:
      'Describe la operación en lenguaje natural: el agente arma el pre-CFDI, tú confirmas y timbras.',
    detailedDescription:
      'Describe la venta o servicio en lenguaje natural. El agente interpreta la operación, arma el pre-CFDI con conceptos e impuestos, y tú confirmas antes de timbrar. Ideal para equipos que prefieren conversación sobre formularios.',
    highlights: [
      'Captura en lenguaje natural',
      'El agente construye el pre-CFDI',
      'Confirmación humana antes de timbrar',
      'Menos fricción para usuarios no técnicos',
    ],
  },
];

const ALL_FEATURES = [...FEATURES, ...STAMPING_FEATURES, ...AI_MCP_FEATURES];

export const FEATURE_BY_ID = Object.fromEntries(
  ALL_FEATURES.map((f) => [f.id, f])
) as Record<string, FeatureItem>;

/** Enlaces del footer que abren modal de funcionalidad en lugar de solo hash */
export const FOOTER_FEATURE_LINKS: Record<string, string> = {
  facturacion: 'prefactura',
  complementos: 'todo-en-uno',
  'carta-porte': 'todo-en-uno',
};
