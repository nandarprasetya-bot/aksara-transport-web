import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { dummyArticles } from '@/data/articles';

export const revalidate = 60; // Revalidate every 60 seconds

// Generate SEO Metadata dynamically
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    let article = null;

    if (supabase) {
        const { data } = await supabase.from('articles').select('title, excerpt, image').eq('slug', params.slug).single();
        article = data;
    }
    
    if (!article) {
        article = dummyArticles.find(a => a.slug === params.slug);
    }

    if (!article) return { title: 'Artikel Tidak Ditemukan' };

    return {
        title: `${article.title} | Aksara Transport`,
        description: article.excerpt,
        alternates: {
            canonical: `https://jogjasewamobil.com/artikel/${params.slug}`
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.image],
        }
    };
}

export default async function ArtikelDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    let article: any = null;
    let popularArticles: any[] = [];

    if (supabase) {
        const { data, error } = await supabase.from('articles').select('*').eq('slug', params.slug).single();
        article = data;

        const { data: popData } = await supabase.from('articles').select('id, title, slug, created_at').order('created_at', { ascending: false }).limit(4);
        if (popData && popData.length > 0) {
            popularArticles = popData;
        }
    }

    // Fallback to dummy articles if supabase is not connected or article not found in DB
    if (!article) {
        article = dummyArticles.find(a => a.slug === params.slug);
    }

    if (popularArticles.length === 0) {
        popularArticles = dummyArticles.slice(0, 4);
    }

    if (!article) {
        notFound();
    }

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'description': article.excerpt,
        'image': article.image ? (article.image.startsWith('http') ? article.image : `https://jogjasewamobil.com${article.image}`) : 'https://jogjasewamobil.com/images/hero_reborn_hd.webp',
        'datePublished': article.created_at || '2026-11-08T10:00:00Z',
        'dateModified': article.created_at || '2026-11-08T10:00:00Z',
        'author': {
            '@type': 'Organization',
            'name': 'Aksara Transport Jogja',
            'url': 'https://jogjasewamobil.com'
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Aksara Transport',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://jogjasewamobil.com/icon.png'
            }
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://jogjasewamobil.com/artikel/${params.slug}`
        }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Beranda',
                'item': 'https://jogjasewamobil.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Artikel',
                'item': 'https://jogjasewamobil.com/artikel'
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': article.title,
                'item': `https://jogjasewamobil.com/artikel/${params.slug}`
            }
        ]
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="container">
                
                {/* BREADCRUMB */}
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Beranda</Link> &raquo;{' '}
                        <Link href="/artikel" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Berita</Link> &raquo;{' '}
                        <Link href={`/artikel?k=${encodeURIComponent(article.category)}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{article.category}</Link>
                    </div>
                    <Link href="/artikel" style={{ padding: '6px 15px', background: '#e2e8f0', color: '#475569', borderRadius: '50px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        &larr; Kembali ke Daftar Berita
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>
                    
                    {/* LEFT COLUMN: ARTICLE CONTENT */}
                    <article style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                {article.category}
                            </span>
                        </div>
                        
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b', marginBottom: '20px', lineHeight: 1.3 }}>
                            {article.title}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#64748b', fontSize: '0.9rem', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                            <div style={{ fontWeight: 600, color: '#475569' }}>Oleh: Redaksi Aksara</div>
                            <div>•</div>
                            <div>{new Date(article.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB</div>
                        </div>

                        {article.image && (
                            <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', marginBottom: '30px' }}>
                                <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                        )}

                        <div 
                            className="article-body" 
                            style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.8 }}
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* SHARE BUTTONS */}
                        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <strong style={{ color: '#1e293b' }}>Bagikan Artikel:</strong>
                            <button className="btn" style={{ background: '#3b5998', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Facebook</button>
                            <button className="btn" style={{ background: '#1DA1F2', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Twitter</button>
                            <button className="btn" style={{ background: '#25D366', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>WhatsApp</button>
                        </div>
                    </article>

                    {/* RIGHT COLUMN: SIDEBAR */}
                    <aside style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* ADVERTISEMENT BANNER */}
                        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%)', borderRadius: '8px', padding: '25px 20px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Promo Sewa Hiace Commuter</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '20px', opacity: 0.9 }}>Kapasitas rombongan hingga 14 orang. Liburan ke Jogja makin hemat & nyaman.</p>
                            <Link href="/wisata" className="btn" style={{ background: 'var(--accent)', color: '#fff', padding: '10px 20px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                                Pesan Sekarang
                            </Link>
                        </div>

                        {/* BACA JUGA */}
                        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '15px', paddingBottom: '10px', borderBottom: '2px solid #f1f5f9' }}>Baca Juga</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {popularArticles?.filter(a => a.id !== article.id).slice(0, 3).map((item) => (
                                    <Link href={`/artikel/${item.slug}`} key={item.id} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#334155', margin: '0 0 5px 0', lineHeight: 1.4 }}>{item.title}</h4>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .article-body h2 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin: 35px 0 18px 0; }
                .article-body h3 { font-size: 1.35rem; font-weight: 700; color: #1e293b; margin: 25px 0 15px 0; }
                .article-body p { margin-bottom: 20px; line-height: 1.8; color: #334155; }
                .article-body ul, .article-body ol { margin-bottom: 24px; padding-left: 24px; line-height: 1.8; color: #334155; }
                .article-body li { margin-bottom: 10px; }
                .article-body a { color: var(--primary); text-decoration: none; font-weight: 600; }
                .article-body a:hover { text-decoration: underline; }
                .article-body img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
                
                /* Table Styles */
                .table-responsive { width: 100%; overflow-x: auto; margin: 25px 0; -webkit-overflow-scrolling: touch; border-radius: 8px; border: 1px solid #e2e8f0; }
                .article-body table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem; }
                .article-body th { background: #f1f5f9; color: #1e293b; font-weight: 700; padding: 14px 16px; border-bottom: 2px solid #cbd5e1; }
                .article-body td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; }
                .article-body tr:last-child td { border-bottom: none; }
                .article-body tr:hover { background-color: #f8fafc; }
                
                /* FAQ Section */
                .faq-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 25px 0; }
                .faq-section h3 { margin-top: 15px; font-size: 1.15rem; color: #0f172a; }
                .faq-section h3:first-child { margin-top: 0; }
                .faq-section p { margin-bottom: 15px; color: #475569; }

                /* CTA Box */
                .article-cta-box { background: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%); border-left: 5px solid var(--primary); padding: 25px; border-radius: 8px; margin: 35px 0; }
                .article-cta-box h3 { font-size: 1.4rem; font-weight: 800; color: #1e3a8a; margin: 0 0 10px 0; }
                .article-cta-box p { color: #1e293b; margin-bottom: 15px; }
                .article-cta-box .btn-wa { display: inline-block; background: #25D366; color: #fff !important; font-weight: 700; padding: 12px 24px; border-radius: 50px; text-decoration: none !important; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); transition: transform 0.2s; }
                .article-cta-box .btn-wa:hover { transform: translateY(-2px); }

                @media (max-width: 768px) {
                    .container > div { grid-template-columns: 1fr !important; }
                    article { padding: 20px !important; }
                    h1 { font-size: 1.8rem !important; }
                    .article-body h2 { font-size: 1.5rem; }
                    .article-body h3 { font-size: 1.2rem; }
                }
            `}} />
        </main>
    );
}
