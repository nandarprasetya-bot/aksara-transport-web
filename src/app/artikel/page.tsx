import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portal Berita & Info Wisata Jogja | Aksara Transport',
    description: 'Kumpulan berita terbaru, tips wisata, rekomendasi kuliner, dan panduan perjalanan di Yogyakarta.',
};

import { dummyArticles } from '@/data/articles';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArtikelPage(props: {
    searchParams: Promise<{ k?: string }>
}) {
    const searchParams = await props.searchParams;
    const categoryFilter = searchParams?.k || 'Semua';

    let articles = [];

    if (supabase) {
        // Fetch from database
        let query = supabase.from('articles').select('id, created_at, title, slug, category, image, excerpt').order('created_at', { ascending: false });
        if (categoryFilter !== 'Semua') {
            query = query.eq('category', categoryFilter);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
            articles = data;
        } else {
            articles = dummyArticles; // Fallback to dummy if error or empty
        }
    } else {
        // Fallback if supabase not configured yet
        articles = dummyArticles;
    }

    // Filter dummy if using dummy
    if (!supabase && categoryFilter !== 'Semua') {
        articles = articles.filter(a => a.category === categoryFilter);
    }

    const categories = ['Semua', 'Wisata', 'Kuliner', 'Berita Jogja', 'Tips', 'Promo'];

    // Separate Headline (first article) and the rest
    const headlineArticle = articles.length > 0 ? articles[0] : null;
    const remainingArticles = articles.length > 1 ? articles.slice(1) : [];

    // Popular Articles (just taking the last 3 for demo)
    const popularArticles = [...articles].sort((a,b) => a.title.localeCompare(b.title)).slice(0, 3);

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* NEWSPAPER STYLE HEADER */}
            <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', paddingTop: '100px' }}>
                <div className="container" style={{ padding: '20px 0', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', margin: 0, fontFamily: 'serif', letterSpacing: '-1px' }}>JOGJA HARI INI</h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Portal Berita & Pariwisata Aksara Transport</p>
                </div>
                
                {/* CATEGORIES NAV */}
                <div style={{ borderTop: '1px solid #f1f5f9', borderBottom: '2px solid #1e293b' }}>
                    <div className="container" style={{ display: 'flex', gap: '20px', padding: '15px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        {categories.map(cat => (
                            <Link 
                                href={cat === 'Semua' ? '/artikel' : `/artikel?k=${encodeURIComponent(cat)}`} 
                                key={cat}
                                style={{ 
                                    color: categoryFilter === cat ? 'var(--primary)' : '#475569', 
                                    fontWeight: categoryFilter === cat ? 800 : 600, 
                                    fontSize: '0.95rem', 
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                    textTransform: 'uppercase',
                                    borderBottom: categoryFilter === cat ? '2px solid var(--primary)' : 'none',
                                    paddingBottom: '4px'
                                }}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ALERT IF SUPABASE NOT CONFIGURED */}
            {!supabase && (
                <div className="container" style={{ marginTop: '20px' }}>
                    <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', color: '#b45309', padding: '12px 16px', borderRadius: '4px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <strong>⚠️ Database Belum Terhubung:</strong> Menampilkan berita contoh. Tambahkan URL Supabase di .env untuk menulis berita asli.
                    </div>
                </div>
            )}

            <div className="container" style={{ marginTop: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>
                    
                    {/* LEFT COLUMN: MAIN NEWS */}
                    <div style={{ width: '100%' }}>
                        
                        {/* HEADLINE ARTICLE */}
                        {headlineArticle && (
                            <div style={{ marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '30px' }}>
                                <Link href={`/artikel/${headlineArticle.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
                                        <Image src={headlineArticle.image} alt={headlineArticle.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-zoom" />
                                        <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            {headlineArticle.category}
                                        </div>
                                    </div>
                                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '15px', lineHeight: 1.3 }}>
                                        {headlineArticle.title}
                                    </h2>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '15px' }}>
                                        {headlineArticle.excerpt}
                                    </p>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                                        Dipublikasikan pada {new Date(headlineArticle.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* LIST ARTICLES */}
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '20px', borderLeft: '4px solid var(--primary)', paddingLeft: '10px' }}>Berita Terbaru</h3>
                        
                        {remainingArticles.length === 0 && !headlineArticle && (
                            <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>Belum ada berita.</div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {remainingArticles.map((item) => (
                                <Link href={`/artikel/${item.slug}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ display: 'flex', gap: '20px', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', transition: 'all 0.2s' }} className="hover-shadow">
                                        <div style={{ position: 'relative', width: '220px', height: '140px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                                            <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>{item.category}</div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '10px', lineHeight: 1.4 }}>{item.title}</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {item.excerpt}
                                            </p>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT COLUMN: SIDEBAR */}
                    <aside style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* ADVERTISEMENT BANNER */}
                        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%)', borderRadius: '8px', padding: '25px 20px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Butuh Kendaraan di Jogja?</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '20px', opacity: 0.9 }}>Sewa mobil premium dengan supir profesional mulai dari Rp 450rb/12 Jam.</p>
                            <Link href="/wisata" className="btn" style={{ background: 'var(--accent)', color: '#fff', padding: '10px 20px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                                Lihat Katalog Mobil
                            </Link>
                        </div>

                        {/* TRENDING SECTION */}
                        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '15px', paddingBottom: '10px', borderBottom: '2px solid #f1f5f9' }}>Berita Terpopuler</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {popularArticles.map((item, index) => (
                                    <Link href={`/artikel/${item.slug}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e2e8f0', lineHeight: 1 }}>{index + 1}</div>
                                        <div>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#334155', margin: '0 0 5px 0', lineHeight: 1.4 }}>{item.title}</h4>
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* INFO WIDGET */}
                        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '15px', paddingBottom: '10px', borderBottom: '2px solid #f1f5f9' }}>Kategori Pilihan</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {categories.slice(1).map(cat => (
                                    <li key={cat} style={{ padding: '8px 0', borderBottom: '1px dashed #e2e8f0' }}>
                                        <Link href={`/artikel?k=${encodeURIComponent(cat)}`} style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{cat}</span>
                                            <span style={{ color: '#cbd5e1' }}>&rarr;</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </aside>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .hover-zoom:hover { transform: scale(1.05); }
                .hover-shadow:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-color: #cbd5e1 !important; transform: translateY(-2px); }
                @media (max-width: 768px) {
                    .container > div { grid-template-columns: 1fr !important; }
                    .hover-shadow { flex-direction: column; }
                    .hover-shadow > div:first-child { width: 100% !important; height: 200px !important; }
                }
            `}} />
        </main>
    );
}
