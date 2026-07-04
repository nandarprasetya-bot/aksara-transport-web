import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Panduan Rental Mobil & FAQ | Aksara Transport",
  description: "Cara pemesanan, syarat dan ketentuan sewa mobil lepas kunci di Jogja serta pertanyaan umum pelanggan.",
  alternates: {
    canonical: "https://jogjasewamobil.com/panduan"
  }
};

export default function PanduanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
