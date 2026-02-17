import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reachflow | Moteur de Filtration pour Bureaux d'Orientation",
  description:
    "Nous installons un Moteur de Filtration pour les Bureaux d'Orientation au Maroc qui disqualifie les curieux et remplit votre calendrier de familles prêtes à investir.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
