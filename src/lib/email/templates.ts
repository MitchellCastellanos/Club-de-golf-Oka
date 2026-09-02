import type { Lang } from "@/lib/site-content";
import type { EmailContent } from "@/lib/email/render";

export type BookingConfirmationData = {
  lang: Lang;
  date: string;
  time: string;
  holes: 9 | 18;
  players: number;
  cart: boolean;
  total: number;
  confirmationCode: string;
};

export function bookingConfirmationSubject(d: BookingConfirmationData) {
  return d.lang === "fr"
    ? `Votre départ du ${d.date} à ${d.time} est confirmé`
    : `Your ${d.date} tee time at ${d.time} is confirmed`;
}

export type WeddingRequestData = {
  lang: Lang;
  dateRequested?: string;
  guests?: number;
  packageName?: string;
};

export function weddingRequestSubject(d: WeddingRequestData) {
  return d.lang === "fr"
    ? "Nous avons bien reçu votre demande"
    : "We've received your request";
}

export function weddingRequestContent(d: WeddingRequestData): EmailContent {
  const fr = d.lang === "fr";
  const details: [string, string][] = [];
  if (d.dateRequested) details.push([fr ? "Date souhaitée" : "Preferred date", d.dateRequested]);
  if (d.guests) details.push([fr ? "Nombre d'invités" : "Number of guests", String(d.guests)]);
  if (d.packageName) details.push([fr ? "Forfait" : "Package", d.packageName]);

  return {
    h: fr ? "Demande reçue" : "Request received",
    body: fr
      ? "Merci pour votre intérêt envers le Club de Golf d'Oka pour votre réception. Voici un résumé de votre demande :"
      : "Thank you for your interest in Club de Golf d'Oka for your reception. Here's a summary of your request:",
    details: details.length ? details : undefined,
    cta: fr ? "Voir nos forfaits" : "View our packages",
    note: fr
      ? "Notre équipe d'événements vous contactera normalement sous 48 heures."
      : "Our events team will normally reach out within 48 hours.",
  };
}

export function bookingConfirmationContent(
  d: BookingConfirmationData,
): EmailContent {
  const fr = d.lang === "fr";
  const details: [string, string][] = [
    [fr ? "Date" : "Date", d.date],
    [fr ? "Heure de départ" : "Tee time", d.time],
    [fr ? "Parcours" : "Course", fr ? `${d.holes} trous` : `${d.holes} holes`],
    [fr ? "Joueurs" : "Players", String(d.players)],
    [
      fr ? "Voiturette" : "Cart",
      d.cart ? (fr ? `Oui (${d.players}x)` : `Yes (x${d.players})`) : fr ? "Non" : "No",
    ],
    [fr ? "Confirmation" : "Confirmation", d.confirmationCode],
    [fr ? "Total payé" : "Total paid", `${d.total.toFixed(2)} $`],
  ];

  return {
    h: fr ? "Réservation confirmée" : "Booking confirmed",
    body: fr
      ? "Votre partie est confirmée. Voici le détail :"
      : "Your round is confirmed. Here are the details:",
    details,
    cta: fr ? "Gérer ma réservation" : "Manage my booking",
    note: fr
      ? "Présentez-vous 15 minutes avant votre départ à la boutique."
      : "Please arrive 15 minutes before your tee time at the pro shop.",
  };
}
