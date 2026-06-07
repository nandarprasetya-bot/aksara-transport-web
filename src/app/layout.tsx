import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-main',
});

export const metadata: Metadata = {
  title: "Jogja Sewa Mobil | Aksara Transport Murah & Terpercaya",
  description: "Layanan sewa mobil Jogja lepas kunci dan pakai supir. Armada terlengkap: Avanza, Innova Reborn/Zenix, Hiace, Alphard. Harga murah dan pelayanan profesional.",
  keywords: "jogja sewa mobil, sewa mobil jogja, rental mobil jogja, sewa mobil jogja lepas kunci, rental mobil murah jogja, sewa hiace jogja, sewa alphard jogja",
  openGraph: {
    title: 'Jogja Sewa Mobil | Aksara Transport',
    description: 'Layanan rental mobil terbaik di Yogyakarta. Lepas kunci & dengan supir.',
    url: 'https://jogjasewamobil.com',
    siteName: 'Aksara Transport',
    images: [
      {
        url: 'https://jogjasewamobil.com/images/hero_car.webp',
        width: 1200,
        height: 630,
        alt: 'Sewa Mobil Jogja - Aksara Transport',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={plusJakarta.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
