import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Club de Golf d'Oka",
  description:
    "Club de Golf d'Oka — un des plus beaux 9 trous du Quebec. Reservations, tournois, mariages.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
