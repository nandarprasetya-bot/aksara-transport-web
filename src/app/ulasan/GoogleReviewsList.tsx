"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialReviewsData, ReviewItem } from '@/data/reviews';

export default function GoogleReviewsList() {
    const [reviews, setReviews] = useState<ReviewItem[]>(initialReviewsData);
    const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [activeModalPhoto, setActiveModalPhoto] = useState<{ url: string; caption: string } | null>(null);

    // Ambil ulasan tambahan yang baru saja disubmit user via localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('aksara_custom_reviews');
            if (saved) {
                const parsed: ReviewItem[] = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setReviews([...parsed, ...initialReviewsData]);
                }
            }
        } catch {
            // ignore
        }
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredReviews = reviews.filter(rev => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'with-photos') return rev.photos && rev.photos.length > 0;
        if (activeFilter === 'lepas-kunci') return rev.serviceCategory === 'lepas-kunci';
        if (activeFilter === 'dengan-driver') return rev.serviceCategory === 'dengan-driver';
        if (activeFilter === 'hiace') return rev.serviceCategory === 'hiace';
        if (activeFilter === 'vvip') return rev.serviceCategory === 'vvip';
        return true;
    });

    return (
        <div>
            {/* GOOGLE MAPS RATING SUMMARY CARD */}
            <div style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid #e2e8f0', 
                padding: '32px', 
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)', 
                marginBottom: '30px' 
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '30px', alignItems: 'center' }} className="g-review-summary-grid">
                    
                    {/* LEFT: BIG RATING NUMBER & STARS */}
                    <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9', paddingRight: '20px' }} className="g-summary-left">
                        <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
                            4.9
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '14px 0 8px 0' }}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#fbbc04">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                            Berdasarkan 876+ Ulasan
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                            Profil Resmi Aksara Transport di Google Maps
                        </div>
                        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <Link 
                                href="/tulis-ulasan"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    backgroundColor: '#1a73e8',
                                    color: '#ffffff',
                                    padding: '10px 20px',
                                    borderRadius: '50px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(26,115,232,0.3)'
                                }}
                            >
                                <span>✏️ Tulis Ulasan Anda</span>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: RATING BARS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                            <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>5</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                <div style={{ width: '95%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                            </div>
                            <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>832</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                            <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>4</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                <div style={{ width: '4.5%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                            </div>
                            <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>38</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                            <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>3</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                <div style={{ width: '0.7%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                            </div>
                            <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>6</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                            <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>2</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                <div style={{ width: '0%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                            </div>
                            <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>0</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                            <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>1</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                <div style={{ width: '0%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                            </div>
                            <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>0</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* FILTER PILLS */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '22px', WebkitOverflowScrolling: 'touch' }}>
                {[
                    { key: 'all', label: `Semua Ulasan (${reviews.length})` },
                    { key: 'with-photos', label: '📷 Ada Foto' },
                    { key: 'lepas-kunci', label: 'Lepas Kunci' },
                    { key: 'dengan-driver', label: 'Dengan Supir' },
                    { key: 'hiace', label: 'Hiace Rombongan' },
                    { key: 'vvip', label: 'Layanan VVIP' }
                ].map(f => (
                    <button
                        key={f.key}
                        type="button"
                        onClick={() => setActiveFilter(f.key)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: activeFilter === f.key ? 800 : 600,
                            border: activeFilter === f.key ? '1.5px solid #1a73e8' : '1px solid #cbd5e1',
                            backgroundColor: activeFilter === f.key ? '#e8f0fe' : '#ffffff',
                            color: activeFilter === f.key ? '#1a73e8' : '#475569',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* REVIEWS LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredReviews.map((rev) => {
                    const isExpanded = !!expandedReviews[rev.id];
                    const shouldTruncate = rev.comment.length > 175;
                    const displayText = (shouldTruncate && !isExpanded) 
                        ? rev.comment.slice(0, 175) + '...' 
                        : rev.comment;

                    return (
                        <div 
                            key={rev.id}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                padding: '24px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                            }}
                        >
                            {/* REVIEW HEADER */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                        backgroundColor: rev.avatarColor || '#0284c7',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.15rem',
                                        fontWeight: 800
                                    }}>
                                        {rev.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                                            {rev.author}
                                        </h3>
                                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                            {rev.role}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ 
                                        display: 'inline-block',
                                        background: '#f1f5f9', 
                                        color: '#0284c7', 
                                        fontSize: '0.72rem', 
                                        fontWeight: 800, 
                                        padding: '3px 9px', 
                                        borderRadius: '4px',
                                        marginBottom: '4px'
                                    }}>
                                        {rev.serviceTag}
                                    </span>
                                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{rev.date}</div>
                                </div>
                            </div>

                            {/* STARS & CAR FLEET */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[...Array(rev.rating)].map((_, i) => (
                                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbc04">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <span style={{ color: '#cbd5e1' }}>•</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                                    Armada: <strong style={{ color: '#1e293b' }}>{rev.carFleet}</strong>
                                </span>
                                {rev.routeWisata && (
                                    <>
                                        <span style={{ color: '#cbd5e1' }}>•</span>
                                        <span style={{ fontSize: '0.8rem', color: '#0284c7' }}>
                                            📍 {rev.routeWisata}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* COMMENT */}
                            <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.65', marginBottom: '14px' }}>
                                <span>&ldquo;{displayText}&rdquo;</span>
                                {shouldTruncate && (
                                    <button 
                                        type="button" 
                                        onClick={() => toggleExpand(rev.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#1a73e8',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            padding: '0 0 0 6px'
                                        }}
                                    >
                                        {isExpanded ? 'Tutup' : 'Lainnya'}
                                    </button>
                                )}
                            </div>

                            {/* PHOTOS */}
                            {rev.photos && rev.photos.length > 0 && (
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    {rev.photos.map((photo, pIdx) => (
                                        <div 
                                            key={pIdx}
                                            onClick={() => setActiveModalPhoto(photo)}
                                            style={{
                                                position: 'relative',
                                                width: '100px',
                                                height: '75px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                border: '1px solid #e2e8f0',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                            }}
                                            title="Klik untuk memperbesar foto"
                                        >
                                            <Image 
                                                src={photo.url} 
                                                alt={photo.caption} 
                                                fill 
                                                sizes="100px"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* OWNER RESPONSE */}
                            {rev.ownerResponse && (
                                <div style={{
                                    backgroundColor: '#f8fafc',
                                    borderLeft: '4px solid #1a73e8',
                                    borderRadius: '0 8px 8px 0',
                                    padding: '14px 16px',
                                    marginTop: '12px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
                                            Tanggapan dari pemilik
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>• {rev.ownerResponse.date}</span>
                                    </div>
                                    <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                                        {rev.ownerResponse.text}
                                    </p>
                                </div>
                            )}

                            {/* FOOTER */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.8rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                    </svg>
                                    Membantu ({rev.likes})
                                </span>
                                <span>•</span>
                                <span>Ulasan Terverifikasi Google</span>
                            </div>
                        </div>
                    );
                })}
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
                            maxWidth: '750px',
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
                        <div style={{ position: 'relative', width: '100%', height: '450px' }}>
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
        </div>
    );
}
