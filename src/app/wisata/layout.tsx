import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Paket Wisata Jogja Murah & Terlengkap | Aksara Transport",
  description: "Pilihan paket tour & wisata Yogyakarta harian & multi-day dengan driver ramah dan armada nyaman.",
  alternates: {
    canonical: "https://jogjasewamobil.com/wisata"
  }
};

export default function WisataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
