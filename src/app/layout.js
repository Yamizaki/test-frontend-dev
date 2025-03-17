import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlockChain / Cursos de programación",
  description:
    "BlockChain es una plataforma educativa interactiva diseñada para ofrecer una experiencia de aprendizaje estructurada y personalizada. El proyecto combina recursos multimedia (como videos) con un sistema de seguimiento de progreso intuitivo, permitiendo a los usuarios aprender habilidades técnicas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
