import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hubungi Kami - Aksara Transport Jogja",
  description: "Kontak layanan sewa mobil Jogja. Hubungi via WhatsApp atau telepon untuk pemesanan cepat 24 jam.",
  alternates: {
    canonical: "https://jogjasewamobil.com/kontak"
  }
};

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
