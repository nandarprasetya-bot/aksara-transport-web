import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-main',
});

export const metadata: Metadata = {
  title: "Sewa Mobil Jogja Murah Lepas Kunci & Driver 24 Jam | Aksara Transport",
  description: "Rental mobil Jogja murah 24 jam lepas kunci & dengan driver berpengalaman. Free antar jemput Stasiun Tugu, Lempuyangan, Bandara YIA & Hotel. Unit Brio, Avanza, Zenix, Hiace & Alphard prima.",
  keywords: "sewa mobil jogja, rental mobil jogja, sewa mobil jogja lepas kunci, rental mobil jogja lepas kunci, rental mobil murah jogja, sewa hiace jogja, sewa alphard jogja, sewa innova zenix jogja, sewa mobil jogja dengan sopir, rental mobil jogja stasiun tugu, sewa mobil bandara yia",
  verification: {
    google: 'chh1k_l3xMe_SmRy_x-GRSuqPjhGC9SEWfJnAqvTXC0',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: 'https://jogjasewamobil.com',
  },
  openGraph: {
    title: 'Sewa Mobil Jogja Murah Lepas Kunci & Driver 24 Jam | Aksara Transport',
    description: 'Rental mobil Jogja murah 24 jam lepas kunci & dengan driver berpengalaman. Free antar jemput Stasiun Tugu, Lempuyangan, Bandara YIA & Hotel.',
    url: 'https://jogjasewamobil.com',
    siteName: 'Aksara Transport Jogja',
    images: [
      {
        url: 'https://jogjasewamobil.com/images/hero_reborn_hd.webp',
        width: 1200,
        height: 630,
        alt: 'Sewa Mobil Jogja Murah - Aksara Transport',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sewa Mobil Jogja Murah Lepas Kunci & Driver 24 Jam | Aksara Transport',
    description: 'Rental mobil Jogja murah 24 jam lepas kunci & dengan driver berpengalaman. Free antar jemput Stasiun Tugu, Lempuyangan, Bandara YIA & Hotel.',
    images: ['https://jogjasewamobil.com/images/hero_reborn_hd.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://jogjasewamobil.com/#website',
  name: 'Aksara Transport Jogja',
  url: 'https://jogjasewamobil.com',
  description: 'Layanan sewa dan rental mobil terbaik di Yogyakarta. Lepas kunci & dengan driver profesional.',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://jogjasewamobil.com/#organization',
    name: 'Aksara Transport Jogja',
    url: 'https://jogjasewamobil.com',
    logo: 'https://jogjasewamobil.com/icon.png',
    telephone: '+628386000740',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Imogiri Barat No.RT.4, Salakan, Bangunharjo, Kec. Sewon',
      addressLocality: 'Bantul',
      addressRegion: 'Daerah Istimewa Yogyakarta',
      postalCode: '55188',
      addressCountry: 'ID'
    }
  }
};

import { GoogleAnalytics } from '@next/third-parties/google';
import MetaPixel from '@/components/MetaPixel';
import { Suspense } from 'react';

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <GoogleAnalytics gaId="G-G00BF38QDS" />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var userLang = navigator.language || navigator.userLanguage || '';
                  var isEnglish = userLang.toLowerCase().indexOf('en') === 0;
                  var hasCookie = document.cookie.indexOf('googtrans=') !== -1;
                  if (isEnglish && !hasCookie) {
                    document.cookie = "googtrans=/id/en; path=/; domain=" + window.location.hostname;
                    document.cookie = "googtrans=/id/en; path=/";
                  }
                } catch(e) {}
              })();
              
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'id',
                  includedLanguages: 'en,id',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `
          }}
        />
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="4HiAKCfdqGLdtBQHHLHQgA" async></script>
      </head>
      <body className={plusJakarta.className}>
        <LanguageProvider>
          <div id="google_translate_element" style={{ display: 'none' }}></div>
          <Suspense fallback={null}>
            <MetaPixel />
          </Suspense>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main>
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
