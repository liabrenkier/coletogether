import { Outfit, Sora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

export const metadata = {
  title: "Cole Together | Salidas, Viajes y Eventos",
  description:
    "Cole Together organiza salidas, eventos y viajes economicos con buena onda desde hace anos."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
