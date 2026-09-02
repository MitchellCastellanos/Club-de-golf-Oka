/**
 * Renderer HTML de correo, portado literalmente de la funcion emailHTML()
 * en design/mockups/golf-oka-emails.html — mismos estilos inline, misma
 * estructura de tabla (compatibilidad con clientes de correo), mismo pie
 * legal LCAP. No se cambio ningun valor visual respecto a la maqueta.
 */
import type { Lang } from "@/lib/site-content";

export type EmailContent = {
  h: string;
  body: string;
  details?: [string, string][];
  cta: string;
  note: string;
};

export function renderEmailHtml(lang: Lang, t: EmailContent): string {
  const rowsHtml = (t.details ?? [])
    .map(
      ([k, v]) => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #E8E0C8;font-size:13px;color:#4B5245;">${escapeHtml(k)}</td>
      <td style="padding:9px 0;border-bottom:1px solid #E8E0C8;font-size:13px;color:#14261C;font-weight:700;text-align:right;">${escapeHtml(v)}</td>
    </tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#DADFD5;font-family:Segoe UI,system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#DADFD5;padding:28px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;">
        <tr><td style="background:#14261C;padding:26px 32px;">
          <div style="font-family:Georgia,serif;color:#F3EFE1;font-size:20px;">Golf d'Oka</div>
          <div style="font-family:Georgia,serif;color:#C7A768;font-size:11px;letter-spacing:.04em;margin-top:2px;">${
            lang === "fr" ? "CLUB ÉTABLI EN 1960" : "CLUB FOUNDED IN 1960"
          }</div>
        </td></tr>
        <tr><td style="padding:36px 32px 8px;">
          <h1 style="font-family:Georgia,serif;color:#14261C;font-size:22px;margin:0 0 14px;">${escapeHtml(t.h)}</h1>
          <p style="font-size:14px;line-height:1.6;color:#4B5245;margin:0 0 18px;">${escapeHtml(t.body)}</p>
        </td></tr>
        ${
          t.details
            ? `<tr><td style="padding:0 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3EFE1;border-radius:4px;padding:4px 16px;">${rowsHtml}</table>
        </td></tr>`
            : ""
        }
        <tr><td style="padding:26px 32px 8px;">
          <a href="#" style="display:inline-block;background:#9C6B26;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 26px;border-radius:3px;">${escapeHtml(t.cta)}</a>
        </td></tr>
        <tr><td style="padding:20px 32px 32px;">
          <p style="font-size:12px;color:#8a9186;margin:0;">${escapeHtml(t.note)}</p>
        </td></tr>
        <tr><td style="background:#F3EFE1;padding:22px 32px;border-top:1px solid #E8E0C8;">
          <p style="font-size:11px;color:#8a9186;margin:0 0 6px;">Club de Golf d'Oka — 345, rue St-Michel, Oka, Québec, J0N 1E0</p>
          <p style="font-size:11px;color:#8a9186;margin:0;">
            <a href="#" style="color:#3C6E8F;text-decoration:underline;">${lang === "fr" ? "Se désinscrire" : "Unsubscribe"}</a>
            &nbsp;·&nbsp;
            <a href="#" style="color:#3C6E8F;text-decoration:underline;">${lang === "fr" ? "Gérer mes préférences" : "Manage preferences"}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
