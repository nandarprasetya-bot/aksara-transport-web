import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tips & Berita Wisata Jogja | Aksara Transport',
    description: 'Kumpulan artikel, tips wisata, rekomendasi kuliner, dan berita terbaru seputar Yogyakarta.',
};

const dummyArticles = [
    {
        id: '1',
        created_at: '2026-06-01T10:00:00Z',
        title: '5 Rekomendasi Kuliner Malam Legendaris di Jogja yang Wajib Dicoba',
        slug: '5-rekomendasi-kuliner-malam-jogja',
        category: 'Kuliner',
        image: '/images/tour_city.webp',
        excerpt: 'Malam di Jogja kurang lengkap tanpa mencicipi kuliner khasnya. Berikut 5 tempat makan malam legendaris yang selalu ramai.',
    },
    {
        id: '2',
        created_at: '2026-05-28T14:30:00Z',
        title: 'Tips Memilih Mobil Rental untuk Liburan Keluarga di Jogja',
        slug: 'tips-memilih-mobil-rental-keluarga',
        category: 'Tips',
        image: '/images/tour_merapi.webp',
        excerpt: 'Liburan bersama keluarga butuh kenyamanan ekstra. Simak tips jitu memilih mobil rental yang tepat agar liburan tetap asyik.',
    },
    {
        id: '3',
        created_at: '2026-05-15T09:15:00Z',
        title: 'Panduan Lengkap Wisata ke Gunungkidul: Rute & Pantai Terbaik',
        slug: 'panduan-wisata-gunungkidul',
        category: 'Wisata',
        image: '/images/tour_parangtritis.webp',
        excerpt: 'Merencanakan liburan ke pantai-pantai cantik di Gunungkidul? Ini panduan rute dan pilihan destinasi pantai pasir putih terbaik.',
    }
];

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArtikelPage({
    searchParams,
}: {
    searchParams: { k?: string }
}) {
    const categoryFilter = searchParams.k || 'Semua';

    let articles = [];

    if (supabase) {
        // Fetch from database
        let query = supabase.from('articles').select('id, created_at, title, slug, category, image, excerpt').order('created_at', { ascending: false });
        if (categoryFilter !== 'Semua') {
            query = query.eq('category', categoryFilter);
        }
        const { data, error } = await query;
        if (!error && data) {
            articles = data;
        } else {
            articles = dummyArticles; // Fallback to dummy if error
        }
    } else {
        // Fallback if supabase not configured yet
        articles = dummyArticles;
    }

    // Filter dummy if using dummy
    if (!supabase && categoryFilter !== 'Semua') {
        articles = articles.filter(a => a.category === categoryFilter);
    }

    const categories = ['Semua', 'Wisata', 'Kuliner', 'Berita Jogja', 'Tips'];

    return (
        <main>
            {/* HERO */}
            <section style={{ padding: '120px 0 60px 0', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
                <div className="container">
                    <span style={{ background: 'var(--accent)', color: '#fff', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '15px', display: 'inline-block' }}>PORTAL BERITA</span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '15px' }}>Tips &amp; Info Wisata Jogja</h1>
                    <p style={{ color: '#cbd5e1', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>Temukan rekomendasi destinasi wisata terbaru, kuliner hits, dan tips sewa mobil terbaik untuk menemani perjalanan Anda di Yogyakarta.</p>
                </div>
            </section>

            {/* CATEGORIES NAV */}
            <section style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div className="container" style={{ display: 'flex', gap: '10px', padding: '20px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    {categories.map(cat => (
                        <Link 
                            href={cat === 'Semua' ? '/artikel' : `/artikel?k=${encodeURIComponent(cat)}`} 
                            key={cat}
                            style={{ 
                                padding: '10px 24px', 
                                background: categoryFilter === cat ? 'var(--primary)' : '#fff', 
                                color: categoryFilter === cat ? '#fff' : '#475569', 
                                borderRadius: '50px', 
                                fontWeight: 600, 
                                fontSize: '0.9rem', 
                                border: '1px solid',
                                borderColor: categoryFilter === cat ? 'var(--primary)' : '#cbd5e1',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s'
                            }}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </section>

            {/* ALERT IF SUPABASE NOT CONFIGURED */}
            {!supabase && (
                <div className="container" style={{ marginTop: '30px' }}>
                    <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', color: '#b45309', padding: '16px', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <strong style={{ fontSize: '1.2rem' }}>⚠️</strong> 
                        <div>
                            <strong>Supabase belum terhubung.</strong> Artikel di bawah ini adalah data contoh (dummy). Untuk menambah artikel baru dari panel admin, silakan masukkan <code>NEXT_PUBLIC_SUPABASE_URL</code> di file <code>.env.local</code>.
                        </div>
                    </div>
                </div>
            )}

            {/* ARTICLES GRID */}
            <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
                <div className="container">
                    {articles.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ color: '#64748b', fontSize: '1.2rem' }}>Belum ada artikel di kategori ini.</h3>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                            {articles.map((item) => (
                                <Link href={`/artikel/${item.slug}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    <div className="article-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', transition: 'all 0.3s', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                            <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, zIndex: 10 }}>{item.category}</div>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                        </div>
                                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px', fontWeight: 600 }}>
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', lineHeight: 1.4 }}>{item.title}</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>{item.excerpt}</p>
                                            
                                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>
                                                Baca Selengkapnya
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
