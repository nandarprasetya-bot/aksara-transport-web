import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DynamicLandingPage from '@/components/DynamicLandingPage';
import { seoKeywords, getKeywordData } from '@/data/seoKeywords';

export async function generateStaticParams() {
  return seoKeywords.map((data) => ({
    slug: data.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const seoData = getKeywordData(slug);
  
  if (!seoData) {
    return {};
  }

  return {
    title: `${seoData.title} Murah & Lepas Kunci | Aksara Transport`,
    description: `Layanan ${seoData.title.toLowerCase()} terbaik. Armada bersih, harga murah, lepas kunci atau dengan supir profesional.`,
    alternates: {
      canonical: `https://jogjasewamobil.com/${slug}`,
    }
  };
}

export default async function KeywordLandingPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const seoData = getKeywordData(slug);

  if (!seoData) {
    notFound();
  }

  return (
    <DynamicLandingPage seoData={seoData} />
  );
}
