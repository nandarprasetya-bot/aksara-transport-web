import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rental & Sewa Mobil Jogja Terlengkap | Aksara Transport",
  description: "Daftar harga rental mobil Yogyakarta murah lepas kunci atau dengan driver. Avanza, Innova, Hiace, Alphard.",
  alternates: {
    canonical: "https://jogjasewamobil.com/mobil"
  }
};

export default function MobilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
