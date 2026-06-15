"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiFaqs } from '@/data/ai-faqs';

export default function PanduanPage() {
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>(aiFaqs[0].id);

    const toggleFaq = (faqId: string) => {
        setOpenFaq(openFaq === faqId ? null : faqId);
    };

    // Flatten all FAQs for JSON-LD schema
    const allFaqs = aiFaqs.flatMap(category => category.faqs);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* INJECT FAQ SCHEMA FOR AI */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HEADER */}
            <section style={{ backgroundColor: '#1e293b', paddingTop: '120px', paddingBottom: '60px', color: '#fff' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <span style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '15px', color: '#cbd5e1' }}>PUSAT BANTUAN & INFO WISATA</span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 900, margin: '0 0 20px 0', lineHeight: 1.2 }}>Panduan Lengkap Jogja</h1>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                        Temukan semua jawaban tentang layanan sewa mobil, rekomendasi wisata hits, info kuliner, hingga panduan logistik di Yogyakarta.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: '-30px', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px', alignItems: 'start' }}>
                    
                    {/* SIDEBAR CATEGORIES */}
                    <aside style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>Kategori Topik</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {aiFaqs.map(cat => (
                                <button 
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    style={{ 
                                        textAlign: 'left', 
                                        padding: '12px 15px', 
                                        borderRadius: '8px', 
                                        border: 'none', 
                                        backgroundColor: activeCategory === cat.id ? '#eff6ff' : 'transparent',
                                        color: activeCategory === cat.id ? '#2563eb' : '#475569',
                                        fontWeight: activeCategory === cat.id ? 700 : 500,
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        borderLeft: activeCategory === cat.id ? '3px solid #2563eb' : '3px solid transparent'
                                    }}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN FAQ CONTENT */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        {aiFaqs.map(category => (
                            <div key={category.id} style={{ display: activeCategory === category.id ? 'block' : 'none' }}>
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>{category.title}</h2>
                                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>{category.description}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {category.faqs.map((faq, index) => {
                                        const faqId = `${category.id}-${index}`;
                                        const isOpen = openFaq === faqId;
                                        return (
                                            <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                                                <button 
                                                    onClick={() => toggleFaq(faqId)}
                                                    style={{ 
                                                        width: '100%', 
                                                        textAlign: 'left', 
                                                        padding: '20px', 
                                                        backgroundColor: isOpen ? '#f8fafc' : '#fff', 
                                                        border: 'none', 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: isOpen ? '#2563eb' : '#1e293b', paddingRight: '20px', lineHeight: 1.4 }}>
                                                        {faq.q}
                                                    </span>
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                                        stroke={isOpen ? '#2563eb' : '#94a3b8'} 
                                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', flexShrink: 0 }}
                                                    >
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </button>
                                                <div 
                                                    style={{ 
                                                        maxHeight: isOpen ? '1000px' : '0', 
                                                        overflow: 'hidden', 
                                                        transition: 'max-height 0.3s ease-in-out',
                                                        backgroundColor: '#f8fafc'
                                                    }}
                                                >
                                                    <div style={{ padding: '0 20px 20px 20px', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
                                                        <div style={{ paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                                            {faq.a}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* CALL TO ACTION */}
                        <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '8px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 10px 0' }}>Tidak Menemukan Jawaban Anda?</h3>
                            <p style={{ color: '#3b82f6', marginBottom: '20px' }}>Tim customer service kami siap membantu Anda 24 jam penuh.</p>
                            <Link href="/kontak" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
                                Hubungi via WhatsApp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 768px) {
                    .container > div { grid-template-columns: 1fr !important; }
                    aside { position: static !important; margin-bottom: 20px; }
                }
            `}} />
        </main>
    );
}
