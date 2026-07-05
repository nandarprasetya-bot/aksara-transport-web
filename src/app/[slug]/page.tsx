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

  const carSchema = seoData.type === 'car' ? {
    '@context': 'https://schema.org',
    '@type': 'Car',
    'name': seoData.carName || seoData.title,
    'image': seoData.imageUrl ? `https://jogjasewamobil.com${seoData.imageUrl}` : 'https://jogjasewamobil.com/icon.png',
    'description': `Layanan ${seoData.title.toLowerCase()} terbaik di Yogyakarta. Armada bersih, harga murah, lepas kunci atau dengan supir profesional.`,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'IDR',
      'price': seoData.price12 || seoData.priceWithDriver || seoData.priceAllIn || seoData.fullday || 250000,
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': seoData.price12 || seoData.priceWithDriver || seoData.priceAllIn || seoData.fullday || 250000,
        'priceCurrency': 'IDR',
        'unitText': 'DAY'
      },
      'url': `https://jogjasewamobil.com/${slug}`,
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'AutoRental',
        'name': 'Aksara Transport Jogja',
        'url': 'https://jogjasewamobil.com',
        'telephone': '+628386000740'
      }
    }
  } : null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Bagaimana syarat sewa mobil lepas kunci?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Persyaratan sewa lepas kunci sangatlah mudah: Anda hanya perlu mengirimkan scan foto KTP asli, SIM A aktif, bukti kepemilikan motor dengan STNK atas nama pribadi, serta bersedia di-survei singkat via telepon.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Apakah harga sewa sudah termasuk BBM dan Tol?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Untuk sistem sewa Lepas Kunci, BBM ditanggung oleh penyewa. Untuk sistem Dengan Sopir, tarif dasar belum termasuk BBM, Tol, dan parkir, kecuali Anda memesan paket spesial All-In.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Apakah bisa diantar-jemput ke hotel atau stasiun?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Ya! Kami menyediakan layanan antar-jemput armada ke Stasiun Tugu, Lempuyangan, Bandara YIA, serta berbagai hotel di pusat kota Yogyakarta dengan tarif antar-jemput yang sangat terjangkau.'
        }
      }
    ]
  };

  return (
    <>
      {carSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DynamicLandingPage seoData={seoData} />
    </>
  );
}
