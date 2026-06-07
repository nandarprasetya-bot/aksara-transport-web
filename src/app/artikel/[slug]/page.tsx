import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 60;

const dummyArticles = [
    {
        id: '1',
        created_at: '2026-06-01T10:00:00Z',
        title: '5 Rekomendasi Kuliner Malam Legendaris di Jogja yang Wajib Dicoba',
        slug: '5-rekomendasi-kuliner-malam-jogja',
        category: 'Kuliner',
        image: '/images/tour_city.webp',
        excerpt: 'Malam di Jogja kurang lengkap tanpa mencicipi kuliner khasnya. Berikut 5 tempat makan malam legendaris yang selalu ramai.',
        content: `
            <p>Malam di Jogja kurang lengkap tanpa mencicipi kuliner khasnya. Angkringan, gudeg, hingga bakmi jawa menjadi incaran wisatawan yang ingin merasakan syahdunya malam di Kota Pelajar.</p>
            <h3>1. Gudeg Bromo Bu Tekluk</h3>
            <p>Berbeda dengan gudeg pada umumnya yang manis, Gudeg Bromo menawarkan rasa yang lebih gurih pedas. Warung ini buka tengah malam dan selalu antre panjang.</p>
            <h3>2. Oseng Mercon Bu Narti</h3>
            <p>Bagi pencinta pedas, oseng mercon adalah menu wajib. Daging koyor yang dimasak dengan cabai rawit melimpah siap membuat Anda berkeringat di malam hari.</p>
            <h3>3. Bakmi Mbah Gito</h3>
            <p>Dengan interior berbahan kayu yang unik ala pedesaan, Bakmi Mbah Gito menyajikan bakmi jawa otentik yang lezat.</p>
            <p><em>Pastikan Anda menyewa mobil dengan sopir dari Aksara Transport agar wisata kuliner malam Anda aman dan nyaman tanpa pusing cari parkir!</em></p>
        `
    },
    {
        id: '2',
        created_at: '2026-05-28T14:30:00Z',
        title: 'Tips Memilih Mobil Rental untuk Liburan Keluarga di Jogja',
        slug: 'tips-memilih-mobil-rental-keluarga',
        category: 'Tips',
        image: '/images/tour_merapi.webp',
        excerpt: 'Liburan bersama keluarga butuh kenyamanan ekstra. Simak tips jitu memilih mobil rental yang tepat agar liburan tetap asyik.',
        content: `
            <p>Liburan bersama keluarga butuh persiapan ekstra, terutama soal transportasi. Memilih mobil yang tepat sangat menentukan kenyamanan selama di perjalanan.</p>
            <h3>Perhatikan Kapasitas Penumpang</h3>
            <p>Jika rombongan Anda 4-6 orang, <strong>Toyota Avanza atau Innova Reborn</strong> adalah pilihan terbaik. Namun jika lebih dari 10 orang, pertimbangkan menyewa <strong>Toyota Hiace</strong> agar tidak berdesakan.</p>
            <h3>Kondisi Mobil & AC</h3>
            <p>Jogja bisa sangat panas di siang hari. Pastikan Anda menyewa dari agen terpercaya seperti Aksara Transport yang selalu menjamin kondisi AC dingin dan mesin prima.</p>
            <h3>Pilih Paket "Dengan Sopir"</h3>
            <p>Jalanan Jogja saat musim liburan cukup padat. Dengan menggunakan jasa sopir, Anda bisa beristirahat di mobil sementara sopir yang hafal rute mencari jalan tikus agar tidak terjebak macet.</p>
        `
    },
    {
        id: '3',
        created_at: '2026-05-15T09:15:00Z',
        title: 'Panduan Lengkap Wisata ke Gunungkidul: Rute & Pantai Terbaik',
        slug: 'panduan-wisata-gunungkidul',
        category: 'Wisata',
        image: '/images/tour_parangtritis.webp',
        excerpt: 'Merencanakan liburan ke pantai-pantai cantik di Gunungkidul? Ini panduan rute dan pilihan destinasi pantai pasir putih terbaik.',
        content: `
            <p>Gunungkidul adalah primadona wisata pantai di Yogyakarta. Dengan pasir putih dan tebing karang yang memukau, kawasan ini selalu menjadi favorit.</p>
            <h3>Rute Terbaik Menuju Gunungkidul</h3>
            <p>Dari pusat kota Jogja, Anda akan menempuh perjalanan sekitar 1.5 hingga 2 jam melintasi perbukitan Baturagung. Jalanan didominasi tanjakan dan tikungan, sehingga sangat disarankan menggunakan kendaraan dengan tenaga yang cukup.</p>
            <h3>Pantai Pasir Putih Terbaik</h3>
            <ul>
                <li><strong>Pantai Indrayanti:</strong> Pantai modern dengan fasilitas lengkap dan deretan kafe pinggir pantai.</li>
                <li><strong>Pantai Sadranan:</strong> Surganya snorkeling! Ombaknya tenang dan banyak penyewaan alat snorkeling.</li>
                <li><strong>Pantai Mesra (Ngrawah):</strong> Pantai bersih dengan taman rumput hijau dan penerangan yang indah.</li>
            </ul>
        `
    }
];

export async function generateMetadata({ params }: { params: { slug: string } }) {
    let article = dummyArticles.find(a => a.slug === params.slug);

    if (supabase) {
        const { data } = await supabase.from('articles').select('title, excerpt, image').eq('slug', params.slug).single();
        if (data) article = data as any;
    }

    if (!article) return { title: 'Artikel Tidak Ditemukan' };

    return {
        title: `${article.title} | Aksara Transport`,
        description: article.excerpt || article.title,
    };
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
    let article = dummyArticles.find(a => a.slug === params.slug) as any;

    if (supabase) {
        const { data } = await supabase.from('articles').select('*').eq('slug', params.slug).single();
        if (data) article = data;
    }

    if (!article) {
        notFound();
    }

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
            <article>
                {/* HERO HEADER */}
                <header style={{ position: 'relative', height: '500px', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '60px' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.8) 100%)' }}></div>
                    </div>
                    
                    <div className="container" style={{ position: 'relative', zIndex: 2, color: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <Link href="/artikel" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                Kembali
                            </Link>
                            <span style={{ color: '#64748b' }}>|</span>
                            <span style={{ background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>{article.category}</span>
                            <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 500 }}>
                                {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.3, maxWidth: '900px', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {article.title}
                        </h1>
                    </div>
                </header>

                {/* CONTENT */}
                <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 3 }}>
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '40px 50px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', maxWidth: '900px', margin: '0 auto' }}>
                        
                        <div 
                            className="article-content" 
                            style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155' }}
                            dangerouslySetInnerHTML={{ __html: article.content }} 
                        />
                        
                        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '2px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>A</div>
                                <div>
                                    <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>Admin Aksara</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Redaksi Aksara Transport</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Cek artikel menarik ini: ' + article.title + ' https://aksaratransport.com/artikel/' + article.slug)}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    Bagikan
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* STYLES FOR ARTICLE HTML CONTENT */}
            <style dangerouslySetInnerHTML={{__html: `
                .article-content h2, .article-content h3 {
                    color: var(--primary);
                    font-weight: 800;
                    margin-top: 35px;
                    margin-bottom: 15px;
                }
                .article-content h2 { font-size: 1.8rem; }
                .article-content h3 { font-size: 1.4rem; }
                .article-content p {
                    margin-bottom: 20px;
                }
                .article-content ul {
                    margin-bottom: 20px;
                    padding-left: 20px;
                }
                .article-content li {
                    margin-bottom: 10px;
                }
                .article-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 12px;
                    margin: 20px 0;
                }
            `}} />
        </main>
    );
}
