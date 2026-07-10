import "./globals.css";

export const metadata = {
  title: "Sud Ouest Finance",
  description:
    "Actualités M&A, PME et transmissions d'entreprises dans le Sud-Ouest de la France.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
