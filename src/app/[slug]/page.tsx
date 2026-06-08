import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DynamicLandingPage from '@/components/DynamicLandingPage';

export const validKeywords = [
  "sewa-brio-jogja",
  "sewa-avanza-jogja",
  "sewa-inova-reborn-jogja",
  "sewa-inova-zenix-jogja",
  "sewa-alphard-jogja",
  "sewa-hiace-jogja",
  "sewa-elf-jogja",
  "sewa-mobil-terdekat",
  "sewa-mobil-yogyakarta",
  "sewa-mobil-listrik-jogja",
  "sewa-mobil-murah",
  "sewa-mobil-1-di-yogyakarta"
];

function formatTitle(slug: string) {
  if (slug === 'sewa-mobil-1-di-yogyakarta') return 'Sewa Mobil #1 Di Yogyakarta';
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateStaticParams() {
  return validKeywords.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  if (!validKeywords.includes(slug)) {
    return {};
  }

  const title = formatTitle(slug);
  return {
    title: `${title} Murah & Lepas Kunci | Aksara Transport`,
    description: `Layanan ${title.toLowerCase()} terbaik. Armada bersih, harga murah, lepas kunci atau dengan supir profesional.`,
    alternates: {
      canonical: `https://jogjasewamobil.com/${slug}`,
    }
  };
}

export default function KeywordLandingPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!validKeywords.includes(slug)) {
    notFound();
  }

  const title = formatTitle(slug);

  return (
    <DynamicLandingPage title={title} />
  );
}
