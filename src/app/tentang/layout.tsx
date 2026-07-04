import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tentang Kami - Aksara Transport Jogja",
  description: "Profil perusahaan Aksara Transport, penyedia jasa rental mobil terpercaya #1 di Yogyakarta.",
  alternates: {
    canonical: "https://jogjasewamobil.com/tentang"
  }
};

export default function TentangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
