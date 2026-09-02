import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/site/language-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Club de Golf d'Oka",
  description:
    "Club de Golf d'Oka — un des plus beaux 9 trous du Quebec. Reservations, tournois, mariages.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <LanguageProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
