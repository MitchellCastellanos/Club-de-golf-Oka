import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { renderEmailHtml } from "@/lib/email/render";
import { weddingRequestContent, weddingRequestSubject } from "@/lib/email/templates";
import type { Lang } from "@/lib/site-content";

type WeddingRequest = {
  name: string;
  email: string;
  dateRequested?: string;
  guests?: number;
  message?: string;
  lang: Lang;
};

function isValid(body: Partial<WeddingRequest>): body is WeddingRequest {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 1 &&
    typeof body.email === "string" &&
    /^\S+@\S+\.\S+/.test(body.email) &&
    (body.lang === "fr" || body.lang === "en")
  );
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<WeddingRequest> | null;
  if (!body || !isValid(body)) {
    return NextResponse.json({ error: "Datos invalidos." }, { status: 400 });
  }

  const admin = createAdminClient();
  let persisted = false;

  if (admin) {
    const { error } = await admin.from("wedding_inquiries").insert({
      name: body.name,
      email: body.email,
      date_requested: body.dateRequested || null,
      guests: body.guests ?? null,
      notes: body.message || null,
      stage: "new",
    });
    if (error) {
      return NextResponse.json({ error: "No se pudo guardar la solicitud." }, { status: 500 });
    }
    persisted = true;
  }

  const emailData = {
    lang: body.lang,
    dateRequested: body.dateRequested,
    guests: body.guests,
  };
  const html = renderEmailHtml(body.lang, weddingRequestContent(emailData));
  const emailResult = await sendEmail({
    to: body.email,
    subject: weddingRequestSubject(emailData),
    html,
  });

  return NextResponse.json({ persisted, emailSent: emailResult.sent });
}
