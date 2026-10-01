import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dayane Lima – SB Estética & Beleza | Mega Hair & Mechas em Montes Claros",
  description: "Mais de 20 anos de excelência em Mega Hair de alta precisão, Mechas de luxo com saúde capilar, Cílios e Sobrancelhas no Monte Carmelo, Montes Claros - MG.",
  keywords: ["Mega Hair Montes Claros", "Mechas Montes Claros", "Dayane Lima", "SB Estética", "Salão Monte Carmelo"],
  authors: [{ name: "Dayane Lima" }],
  openGraph: {
    title: "Dayane Lima – SB Estética & Beleza",
    description: "Transformações exclusivas em Mega Hair e Mechas com preservação rigorosa da fibra capilar. Agende sua consultoria VIP.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth font-sans">
      <head>
        <meta name="theme-color" content="#121110" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-brand-offwhite text-brand-graphite-950 antialiased selection:bg-brand-champagne/30 selection:text-brand-graphite-950 font-sans">
        {children}
      </body>
    </html>
  );
}
