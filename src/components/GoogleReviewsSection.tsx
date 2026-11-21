"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialReviewsData, ReviewItem } from '@/data/reviews';

export default function GoogleReviewsSection() {
    const [activeModalPhoto, setActiveModalPhoto] = useState<{ url: string; caption: string } | null>(null);

    // Ambil 3 ulasan teratas paling representatif untuk Beranda
    const topReviews = initialReviewsData.slice(0, 3);

    return (
        <section className="section-padding google-reviews-section" style={{ backgroundColor: '#f8fafc', paddingTop: '65px', paddingBottom: '70px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
            <div className="container">
                
                {/* COMPACT GOOGLE MAPS HEADER */}
                <div style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '16px', 
                    border: '1px solid #e2e8f0', 
                    padding: '24px 28px', 
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        {/* Google Logo & Rating Score */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                backgroundColor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                </svg>
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>4.9</span>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbc04">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                                        Terverifikasi
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '3px' }}>
                                    Berdasarkan <strong>876+ Ulasan Pelanggan</strong> di Google Maps
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS (RINGKAS & LANGSUNG CTA) */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Link 
                            href="/tulis-ulasan"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#ffffff',
                                color: '#1a73e8',
                                border: '1.5px solid #1a73e8',
                                padding: '9px 18px',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span>✏️ Tulis Ulasan Anda</span>
                        </Link>
                        <Link 
                            href="/ulasan"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#1a73e8',
                                color: '#ffffff',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 2px 8px rgba(26,115,232,0.3)'
                            }}
                        >
                            <span>Lihat Semua 876+ Ulasan</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>

                {/* 3 COMPACT FEATURED REVIEW CARDS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '22px' }}>
                    {topReviews.map((rev) => (
                        <div 
                            key={rev.id}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                padding: '22px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            className="compact-review-card"
                        >
                            <div>
                                {/* Header: Author & Service */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '50%',
                                            backgroundColor: rev.avatarColor,
                                            color: '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            fontWeight: 800
                                        }}>
                                            {rev.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                                {rev.author}
                                            </h4>
                                            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>
                                                {rev.role}
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ 
                                        background: '#f1f5f9', 
                                        color: '#0284c7', 
                                        fontSize: '0.68rem', 
                                        fontWeight: 800, 
                                        padding: '2px 8px', 
                                        borderRadius: '4px' 
                                    }}>
                                        {rev.serviceTag}
                                    </span>
                                </div>

                                {/* Stars & Fleet */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span style={{ color: '#cbd5e1' }}>•</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
                                        {rev.carFleet}
                                    </span>
                                </div>

                                {/* Snippet Comment */}
                                <p style={{ 
                                    fontSize: '0.875rem', 
                                    color: '#334155', 
                                    lineHeight: '1.55', 
                                    margin: '0 0 12px 0',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    &ldquo;{rev.comment}&rdquo;
                                </p>
                            </div>

                            {/* Photo attachment preview if exists */}
                            {rev.photos && rev.photos.length > 0 && (
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    {rev.photos.slice(0, 2).map((photo, pIdx) => (
                                        <div 
                                            key={pIdx}
                                            onClick={() => setActiveModalPhoto(photo)}
                                            style={{
                                                position: 'relative',
                                                width: '70px',
                                                height: '50px',
                                                borderRadius: '6px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                border: '1px solid #e2e8f0'
                                            }}
                                            title="Klik untuk memperbesar foto"
                                        >
                                            <Image 
                                                src={photo.url} 
                                                alt={photo.caption} 
                                                fill 
                                                sizes="70px"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                    <Link 
                                        href="/ulasan" 
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            fontSize: '0.78rem', 
                                            color: '#1a73e8', 
                                            fontWeight: 600, 
                                            textDecoration: 'none',
                                            marginLeft: '4px' 
                                        }}
                                    >
                                        + Foto lainnya &rarr;
                                    </Link>
                                </div>
                            )}

                            {/* Footer link to read full in /ulasan */}
                            <div style={{ paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{rev.date}</span>
                                <Link 
                                    href="/ulasan"
                                    style={{ 
                                        fontSize: '0.8rem', 
                                        fontWeight: 700, 
                                        color: '#1a73e8', 
                                        textDecoration: 'none' 
                                    }}
                                >
                                    Baca Ulasan Lengkap &rarr;
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                {/* BOTTOM SUMMARY LINK */}
                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <Link 
                        href="/ulasan"
                        style={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: '#475569',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <span>Menampilkan 3 ulasan teratas • Buka seluruh 876+ ulasan &amp; foto dokumentasi pelanggan di halaman Ulasan</span>
                        <span>&rarr;</span>
                    </Link>
                </div>

            </div>

            {/* LIGHTBOX PHOTO MODAL */}
            {activeModalPhoto && (
                <div 
                    onClick={() => setActiveModalPhoto(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: '700px',
                            width: '100%',
                            backgroundColor: '#0f172a',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveModalPhoto(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ✕
                        </button>
                        <div style={{ position: 'relative', width: '100%', height: '420px' }}>
                            <Image 
                                src={activeModalPhoto.url} 
                                alt={activeModalPhoto.caption}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div style={{ padding: '16px 20px', backgroundColor: '#1e293b', color: '#ffffff' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                                {activeModalPhoto.caption}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{__html: `
                .compact-review-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08) !important;
                    border-color: #cbd5e1 !important;
                }
            `}} />
        </section>
    );
}
