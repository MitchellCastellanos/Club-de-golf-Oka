import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { renderEmailHtml } from "@/lib/email/render";
import {
  bookingConfirmationContent,
  bookingConfirmationSubject,
} from "@/lib/email/templates";
import type { Lang } from "@/lib/site-content";

type BookingRequest = {
  date: string;
  time: string;
  holes: 9 | 18;
  players: number;
  cart: boolean;
  name: string;
  email: string;
  phone?: string;
  lang: Lang;
};

function isValid(body: Partial<BookingRequest>): body is BookingRequest {
  return (
    typeof body.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(body.date) &&
    typeof body.time === "string" &&
    /^\d{2}:\d{2}$/.test(body.time) &&
    (body.holes === 9 || body.holes === 18) &&
    typeof body.players === "number" &&
    body.players > 0 &&
    body.players <= 4 &&
    typeof body.cart === "boolean" &&
    typeof body.name === "string" &&
    body.name.trim().length > 1 &&
    typeof body.email === "string" &&
    /^\S+@\S+\.\S+$/.test(body.email) &&
    (body.lang === "fr" || body.lang === "en")
  );
}

function computeTotal(holes: 9 | 18, players: number, cart: boolean) {
  const greenUnit = holes === 18 ? 36 : 28;
  const cartUnit = holes === 18 ? 18 : 14;
  return greenUnit * players + (cart ? cartUnit * players : 0);
}

function demoCode() {
  return `OKA-${Math.floor(100000 + Math.random() * 899999)}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<BookingRequest> | null;

  if (!body || !isValid(body)) {
    return NextResponse.json({ error: "Datos de reserva invalidos." }, { status: 400 });
  }

  const total = computeTotal(body.holes, body.players, body.cart);
  const admin = createAdminClient();

  let confirmationCode: string;
  let persisted = false;

  if (admin) {
    const { data: slot, error: slotError } = await admin
      .from("tee_slots")
      .upsert(
        {
          date: body.date,
          time: body.time,
          holes: body.holes,
          capacity: 4,
          status: "open",
        },
        { onConflict: "date,time", ignoreDuplicates: false },
      )
      .select("id")
      .single();

    if (slotError || !slot) {
      return NextResponse.json(
        { error: "No se pudo reservar ese horario. Intenta con otro." },
        { status: 500 },
      );
    }

    const { data: booking, error: bookingError } = await admin
      .from("bookings")
      .insert({
        tee_slot_id: slot.id,
        customer_name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        players: body.players,
        cart_addon: body.cart,
        total,
        status: "confirmed",
      })
      .select("confirmation_code")
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "No se pudo crear la reserva." },
        { status: 500 },
      );
    }

    confirmationCode = booking.confirmation_code;
    persisted = true;
  } else {
    confirmationCode = demoCode();
  }

  const emailData = {
    lang: body.lang,
    date: body.date,
    time: body.time,
    holes: body.holes,
    players: body.players,
    cart: body.cart,
    total,
    confirmationCode,
  };
  const html = renderEmailHtml(body.lang, bookingConfirmationContent(emailData));
  const subject = bookingConfirmationSubject(emailData);
  const emailResult = await sendEmail({ to: body.email, subject, html });

  return NextResponse.json({
    confirmationCode,
    total,
    persisted,
    emailSent: emailResult.sent,
  });
}
