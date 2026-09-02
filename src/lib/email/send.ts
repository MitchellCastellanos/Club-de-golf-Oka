import { Resend } from "resend";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

export type SendResult =
  | { sent: true; id: string }
  | { sent: false; reason: "not_configured" };

/**
 * Envia un correo via Resend si RESEND_API_KEY y EMAIL_FROM estan
 * configurados. En modo demo (sin esas variables) no lanza error — permite
 * que el flujo de reserva siga funcionando mientras se conecta el
 * proveedor de correo real (Fase 3 / conexion del dominio del club).
 */
export async function sendEmail({ to, subject, html }: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(
      `[email] RESEND_API_KEY/EMAIL_FROM no configurados — correo "${subject}" a ${to} no enviado (modo demo).`,
    );
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({ from, to, subject, html });
  if (error || !data) {
    throw new Error(`No se pudo enviar el correo: ${error?.message ?? "error desconocido"}`);
  }
  return { sent: true, id: data.id };
}
