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
  /** Acciones concretas que el usuario puede hacer en CFID */
  operations?: string[];
  badge?: string;
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'prefactura',
    icon: React.createElement(Store, { className: 'w-6 h-6 text-brand-primary' }),
    title: 'Prefactura y Captura',
    description:
      'Arma borradores, captura conceptos a mano o parte de tus tickets. Revisas todo antes de timbrar.',
    detailedDescription:
      'Con CFID preparas la factura con calma: guardas un borrador (prefactura), capturas conceptos e impuestos o partes de un ticket ya registrado. Cuando todo esté correcto, timbras. Así reduces errores y no pierdes tiempo corrigiendo después.',
    highlights: [
      'Borradores para retomar cuando quieras',
      'Captura libre de conceptos e impuestos',
      'Factura desde tickets o catálogo',
      'Revisión clara antes de timbrar',
    ],
    operations: [
      'Crear o retomar una prefactura',
      'Facturar productos o servicios',
      'Captura libre de conceptos',
      'Facturar honorarios',
      'Consultar tickets pendientes',
    ],
  },
  {
    id: 'envio-automatico',
    icon: React.createElement(Send, { className: 'w-6 h-6 text-brand-tech' }),
    title: 'Envío de XML y PDF',
    description:
      'Después de timbrar, envía el comprobante al cliente por correo o WhatsApp desde la misma pantalla.',
    detailedDescription:
      'Al timbrar, CFID genera el XML y el PDF. Desde la misma operación puedes mandárselos al cliente por correo (con el diseño y mensaje de tu empresa) o por WhatsApp. Sin salir a otra herramienta ni adjuntar archivos a mano.',
    highlights: [
      'Envío por correo con XML y/o PDF',
      'Envío por WhatsApp desde la factura',
      'Mensajes y plantillas de tu empresa',
      'PDF con logo y datos del emisor',
    ],
    operations: [
      'Enviar factura por correo',
      'Enviar factura por WhatsApp',
      'Configurar mensajes de correo',
      'Ajustar plantillas del PDF',
    ],
  },
  {
    id: 'web-movil',
    icon: React.createElement(Smartphone, { className: 'w-6 h-6 text-purple-400' }),
    title: '100% Web y Móvil',
    description:
      'Entra desde cualquier navegador en computadora, tablet o celular. Sin instalar programas.',
    detailedDescription:
      'CFID funciona en el navegador. Facturas, consultas y administración están disponibles en la oficina o en campo, con la misma cuenta. No necesitas instalar software ni depender de un solo equipo.',
    highlights: [
      'Se adapta a PC, tablet y celular',
      'Sin instalaciones',
      'Misma cuenta en cualquier dispositivo',
      'Listo para operar fuera de la oficina',
    ],
    operations: [
      'Iniciar sesión en el portal web',
      'Capturar y consultar en móvil o tablet',
      'Trabajar el dashboard y menús diarios',
    ],
  },
  {
    id: 'cumplimiento-sat',
    icon: React.createElement(ShieldCheck, { className: 'w-6 h-6 text-green-400' }),
    title: 'Cumplimiento SAT',
    description:
      'CFDI 4.0 con revisión de datos antes de timbrar: RFC, uso de CFDI y reglas fiscales.',
    detailedDescription:
      'Antes de enviar al timbrado, CFID revisa que los datos del cliente y del comprobante cumplan con lo requerido (RFC, domicilio, uso de CFDI, etc.). Usa catálogos del SAT y un PAC autorizado (Finkok) para el timbrado oficial. Menos rechazos y menos correcciones.',
    highlights: [
      'Facturación electrónica CFDI 4.0',
      'Revisión de RFC y datos del receptor',
      'Catálogos SAT dentro de la plataforma',
      'Timbrado con PAC autorizado',
    ],
    operations: [
      'Consultar catálogos SAT',
      'Validar datos antes de timbrar',
      'Emitir y cancelar con motivos SAT',
      'Usar complementos (pagos, nómina, carta porte…)',
    ],
  },
  {
    id: 'control-roles',
    icon: React.createElement(Users, { className: 'w-6 h-6 text-yellow-400' }),
    title: 'Control por Roles',
    description:
      'Cada persona ve solo lo que le corresponde: menús, tiendas y permisos según su perfil.',
    detailedDescription:
      'Defines perfiles (operador, administración, superusuario, etc.), qué menús ve cada uno, qué usuarios hay en el sistema y a qué tienda están asignados. También puedes activar verificación en dos pasos, cambio de contraseña y claves para conectar otros sistemas con seguridad.',
    highlights: [
      'Perfiles con menús a la medida',
      'Usuarios y acceso por empresa',
      'Asignación a tiendas',
      'Seguridad: 2FA, contraseña y claves de API',
    ],
    operations: [
      'Administrar usuarios del sistema',
      'Administrar tiendas y asignaciones',
      'Configurar qué menús ve cada perfil',
      'Gestionar seguridad y claves de acceso',
    ],
  },
  {
    id: 'todo-en-uno',
    icon: React.createElement(Layers, { className: 'w-6 h-6 text-brand-primary' }),
    title: 'Todo en Uno',
    description:
      'Facturas, notas de crédito, pagos, nómina, carta porte, global, cancelación y consultas en un solo lugar.',
    detailedDescription:
      'No necesitas varios sistemas para el día a día fiscal. En CFID emites distintos tipos de comprobante, cancelas, consultas historial, refacturas y das seguimiento con reportes. Todo con la misma cuenta y el mismo historial.',
    highlights: [
      'Facturas, notas de crédito y pagos',
      'Nómina, carta porte, retenciones y global',
      'Cancelación y consultas unificadas',
      'Series, folios y reportes',
    ],
    operations: [
      'Emitir factura, NC, pago o retención',
      'Emitir nómina, carta porte o factura global',
      'Cancelar comprobantes',
      'Consultar facturas, tickets y refacturar',
      'Revisar reportes y monitor',
    ],
  },
];

export const STAMPING_FEATURES: FeatureItem[] = [
  {
    id: 'alta-disponibilidad',
    icon: React.createElement(Activity, { className: 'w-6 h-6 text-brand-primary' }),
    title: 'Alta Disponibilidad',
    description: 'Revisa el estado del servicio, bitácora y logs cuando algo no responde como esperas.',
    detailedDescription:
      'Si hay una incidencia, CFID te da visibilidad: monitor de disponibilidad, bitácora de eventos y logs. También puedes revisar la cola de timbres pendientes para reintentar lo que no terminó de timbrar. Menos tiempo a ciegas diagnosticando.',
    highlights: [
      'Estado del servicio a la vista',
      'Bitácora de timbrado y cancelación',
      'Cola para reintentar timbres pendientes',
      'Logs y herramientas de diagnóstico',
    ],
    operations: [
      'Ver disponibilidad y gráficas',
      'Consultar bitácora y logs',
      'Reprocesar timbres pendientes',
    ],
  },
  {
    id: 'facturacion-1-a-1',
    icon: React.createElement(FileText, { className: 'w-6 h-6 text-brand-tech' }),
    title: 'Facturación 1 a 1',
    description: 'Emite un comprobante a la vez: captura libre, borrador, ticket o catálogo.',
    detailedDescription:
      'Ideal para mostrador, contadores y profesionistas. Capturas o retomas un borrador, revisas al cliente y los importes, timbras y, si quieres, envías el XML/PDF al instante. Control detallado en cada factura.',
    highlights: [
      'Captura libre o desde borrador / ticket',
      'Revisión antes de timbrar',
      'Respuesta inmediata al timbrar',
      'Envío del comprobante al cliente',
    ],
    operations: [
      'Facturar un cliente',
      'Usar captura libre o honorarios',
      'Consultar y reenviar facturas emitidas',
    ],
  },
  {
    id: 'carga-masiva',
    icon: React.createElement(Upload, { className: 'w-6 h-6 text-purple-400' }),
    title: 'Factura Global y lotes',
    description:
      'Cierra el periodo con factura global, cancela varios CFDI y reprocesa timbres pendientes.',
    detailedDescription:
      'Cuando el volumen crece, CFID te ayuda con factura global a partir de tickets del periodo, cancelación de varios comprobantes y reintento de timbres que quedaron pendientes. El lote nace de tu operación diaria, no de un archivo suelto de Excel.',
    highlights: [
      'Factura global por periodo y tienda',
      'Cancelación de varios comprobantes',
      'Reintento de timbres pendientes',
      'Reportes de integración global',
    ],
    operations: [
      'Generar factura global',
      'Cancelar varios CFDI',
      'Revisar cola de timbre pendiente',
      'Consultar reportes de factura global',
    ],
  },
  {
    id: 'validacion-tiempo-real',
    icon: React.createElement(ShieldCheck, { className: 'w-6 h-6 text-green-400' }),
    title: 'Validación en tiempo real',
    description: 'Detecta errores de RFC y datos del comprobante antes de timbrar.',
    detailedDescription:
      'CFID te avisa si falta o está mal un dato importante (RFC, uso de CFDI, complementos, etc.) antes de mandar a timbrar. Si el PAC rechaza, el mensaje se muestra en pantalla para corregir sin perder el contexto de la captura.',
    highlights: [
      'Aviso temprano de datos incompletos',
      'Revisión según el tipo de comprobante',
      'Mensajes claros ante rechazo',
      'Menos idas y vueltas al capturar',
    ],
    operations: [
      'Validar al guardar o timbrar',
      'Corregir datos del receptor o conceptos',
      'Consultar catálogos SAT de apoyo',
    ],
  },
  {
    id: 'integracion-api-rest',
    icon: React.createElement(Code2, { className: 'w-6 h-6 text-yellow-400' }),
    title: 'Integración con otros sistemas',
    description:
      'Conecta tu ERP o tienda en línea con CFID de forma segura, sin compartir datos del PAC.',
    detailedDescription:
      'Si ya tienes un sistema propio, puedes conectarlo a CFID para timbrar, consultar o cancelar. Usas una clave de acceso (API Key) o tu sesión. La documentación y guías están pensadas para tu equipo de sistemas o un integrador.',
    highlights: [
      'Conexión segura con clave de acceso',
      'Timbrar y cancelar desde tu sistema',
      'Sin exponer credenciales del PAC',
      'Guías y documentación para integrar',
    ],
    operations: [
      'Crear y administrar API Keys',
      'Timbrar desde un sistema externo',
      'Cancelar o consultar desde integración',
    ],
  },
];

export const AI_MCP_FEATURES: FeatureItem[] = [
  {
    id: 'servidor-mcp',
    icon: React.createElement(Terminal, { className: 'w-5 h-5 text-brand-tech' }),
    title: 'Asistente con MCP',
    description:
      'Capa para que asistentes de IA ayuden a facturar y consultar (vista previa).',
    detailedDescription:
      'Estamos preparando un asistente conectado a CFID para que puedas pedir operaciones en lenguaje sencillo desde herramientas como Cursor o Claude. En esta página puedes ver una vista previa. Mientras tanto, la forma estable de operar sigue siendo la web CFID o la integración con tu sistema.',
    highlights: [
      'Pensado para asistentes de IA',
      'Vista previa disponible aquí',
      'Complementa la plataforma web',
      'No sustituye el portal de facturación',
    ],
    operations: [
      'Probar la demo del asistente en esta página',
      'Seguir facturando en el portal CFID',
    ],
    badge: 'Vista previa',
  },
  {
    id: 'auth-api-key',
    icon: React.createElement(Key, { className: 'w-5 h-5 text-brand-primary' }),
    title: 'Claves de acceso (API Key)',
    description:
      'Genera claves por sistema o integración. Controlas el acceso sin compartir tu contraseña ni el PAC.',
    detailedDescription:
      'Desde Seguridad → API Keys (con perfil administrador) creas claves para que otro sistema hable con CFID. Puedes dar de alta, identificar por proyecto y dejar de usar una clave cuando ya no la necesites, sin tocar las credenciales del PAC.',
    highlights: [
      'Una clave por sistema o proyecto',
      'Sin compartir tu contraseña de usuario',
      'Sin exponer datos del PAC',
      'Revoca o renueva cuando lo necesites',
    ],
    operations: [
      'Crear una API Key',
      'Asignar nombre / proyecto',
      'Usarla desde tu integración',
    ],
  },
  {
    id: 'orquestacion-flujos',
    icon: React.createElement(Workflow, { className: 'w-5 h-5 text-purple-400' }),
    title: 'Conecta tus flujos',
    description:
      'Une CFID con tu ERP o automatizaciones usando la API y tus claves de acceso.',
    detailedDescription:
      'Tú decides cómo automatizar: tu ERP, scripts o herramientas de automatización llaman a CFID para validar, timbrar o cancelar. CFID aporta la API y las claves; el diseño del flujo lo haces con las herramientas que ya usa tu equipo.',
    highlights: [
      'Conexión con sistemas propios',
      'Automatiza timbrado y consulta',
      'Misma lógica fiscal que la web',
      'Flexible para tu operación',
    ],
    operations: [
      'Conectar ERP o e-commerce vía API',
      'Automatizar emisión o cancelación',
      'Consultar estatus desde tu flujo',
    ],
  },
  {
    id: 'facturacion-conversacional',
    icon: React.createElement(Sparkles, { className: 'w-5 h-5 text-green-400' }),
    title: 'Facturación conversacional',
    description:
      'Describe la venta en lenguaje natural; confirmas antes de timbrar (vista previa).',
    detailedDescription:
      'La demo del asistente muestra cómo podrías decir “quiero facturar…” y que el sistema arme la propuesta para que tú confirmes. Todavía es una experiencia en desarrollo. Para el día a día, usa el portal CFID o tu integración.',
    highlights: [
      'Hablas en lenguaje cotidiano (demo)',
      'Tú confirmas antes de timbrar',
      'Útil para quien no vive en formularios',
      'La web y la API siguen siendo el canal principal',
    ],
    operations: [
      'Probar la demo en IA & MCP',
      'Facturar en el portal cuando sea operación real',
    ],
    badge: 'Vista previa',
  },
];

const ALL_FEATURES = [...FEATURES, ...STAMPING_FEATURES, ...AI_MCP_FEATURES];

export const FEATURE_BY_ID = Object.fromEntries(
  ALL_FEATURES.map((f) => [f.id, f])
) as Record<string, FeatureItem>;

export const FOOTER_FEATURE_LINKS: Record<string, string> = {
  facturacion: 'prefactura',
  complementos: 'todo-en-uno',
  'carta-porte': 'todo-en-uno',
};
