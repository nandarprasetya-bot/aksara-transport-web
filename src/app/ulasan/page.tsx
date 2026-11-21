import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { initialReviewsData } from '@/data/reviews';
import GoogleReviewsList from './GoogleReviewsList';

export const metadata: Metadata = {
    title: '870+ Ulasan Sewa Mobil Jogja Terverifikasi Bintang 4.9 | Aksara Transport',
    description: 'Kumpulan ulasan dan testimoni asli pelanggan sewa mobil Jogja lepas kunci & dengan supir. Rating 4.9/5.0 dari 870+ ulasan terverifikasi Google Maps.',
    alternates: {
        canonical: 'https://jogjasewamobil.com/ulasan',
    },
    openGraph: {
        title: '870+ Ulasan Sewa Mobil Jogja Terverifikasi | Aksara Transport',
        description: 'Rating 4.9/5.0 dari 870+ ulasan wisatawan dan instansi di Google Maps.',
        images: ['https://jogjasewamobil.com/images/hero_reborn_hd.webp'],
    }
};

export default function UlasanPage() {
    // Generate Rich Review Schema JSON-LD for Google Crawler
    const reviewSchema = {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        '@id': 'https://jogjasewamobil.com/#autorental',
        'name': 'Aksara Transport Jogja - Sewa Mobil Jogja',
        'url': 'https://jogjasewamobil.com',
        'telephone': '+628386000740',
        'priceRange': 'Rp 275.000 - Rp 3.500.000',
        'image': 'https://jogjasewamobil.com/images/hero_reborn_hd.webp',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Jl. Imogiri Barat No.RT.4, Salakan, Bangunharjo, Kec. Sewon',
            'addressLocality': 'Bantul',
            'addressRegion': 'Daerah Istimewa Yogyakarta',
            'postalCode': '55188',
            'addressCountry': 'ID'
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'bestRating': '5',
            'worstRating': '1',
            'ratingCount': '876',
            'reviewCount': '876'
        },
        'review': initialReviewsData.map(r => ({
            '@type': 'Review',
            'author': {
                '@type': 'Person',
                'name': r.author
            },
            'datePublished': r.isoDate,
            'reviewBody': r.comment,
            'reviewRating': {
                '@type': 'Rating',
                'bestRating': '5',
                'ratingValue': r.rating.toString(),
                'worstRating': '1'
            }
        }))
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
            />
            
            <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
                
                {/* BREADCRUMB */}
                <div style={{ marginBottom: '24px', fontSize: '0.875rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <Link href="/" style={{ color: 'var(--primary, #0284c7)', textDecoration: 'none' }}>Beranda</Link> &raquo;{' '}
                        <span>Ulasan Pelanggan</span>
                    </div>
                    <Link 
                        href="/tulis-ulasan"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#1a73e8',
                            color: '#ffffff',
                            padding: '8px 18px',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(26,115,232,0.3)'
                        }}
                    >
                        <span>✏️ Tulis Ulasan Anda</span>
                    </Link>
                </div>

                {/* INTERACTIVE CLIENT REVIEW COMPONENT */}
                <GoogleReviewsList />

            </div>
        </main>
    );
}
