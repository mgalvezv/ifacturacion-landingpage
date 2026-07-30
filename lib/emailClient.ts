export const CONTACT_EMAIL = 'contacto@redcibercom.com.mx';

export type EmailClientId = 'default' | 'gmail' | 'outlook' | 'yahoo' | 'copy';

export interface EmailClientOption {
  id: EmailClientId;
  label: string;
  description: string;
}

export const EMAIL_CLIENT_OPTIONS: EmailClientOption[] = [
  {
    id: 'default',
    label: 'App predeterminada del sistema',
    description: 'Abre Mail, Spark, Outlook u otra app configurada en tu equipo.',
  },
  {
    id: 'gmail',
    label: 'Gmail (navegador)',
    description: 'Redactar en Gmail web con asunto y cuerpo prellenados.',
  },
  {
    id: 'outlook',
    label: 'Outlook (navegador)',
    description: 'Redactar en Outlook.com con asunto y cuerpo prellenados.',
  },
  {
    id: 'yahoo',
    label: 'Yahoo Mail (navegador)',
    description: 'Redactar en Yahoo Mail web.',
  },
  {
    id: 'copy',
    label: 'Copiar correo',
    description: 'Copia la dirección al portapapeles para pegarla donde prefieras.',
  },
];

export interface MailPayload {
  to: string;
  subject: string;
  body: string;
}

/**
 * Los navegadores no permiten elegir la app de correo instalada: `mailto:` siempre
 * usa el cliente predeterminado del sistema operativo (p. ej. Mail en Mac aunque
 * el usuario use Spark). Solo Gmail/Outlook/Yahoo web permiten destino explícito.
 */
export function openEmailClient(
  clientId: EmailClientId,
  { to, subject, body }: MailPayload
): Promise<'opened' | 'copied'> {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  switch (clientId) {
    case 'gmail':
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodedSubject}&body=${encodedBody}`,
        '_blank',
        'noopener,noreferrer'
      );
      return Promise.resolve('opened');

    case 'outlook':
      window.open(
        `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(to)}&subject=${encodedSubject}&body=${encodedBody}`,
        '_blank',
        'noopener,noreferrer'
      );
      return Promise.resolve('opened');

    case 'yahoo':
      window.open(
        `https://compose.mail.yahoo.com/?to=${encodeURIComponent(to)}&subject=${encodedSubject}&body=${encodedBody}`,
        '_blank',
        'noopener,noreferrer'
      );
      return Promise.resolve('opened');

    case 'copy':
      return navigator.clipboard.writeText(to).then(() => 'copied');

    case 'default':
    default:
      window.location.href = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
      return Promise.resolve('opened');
  }
}
