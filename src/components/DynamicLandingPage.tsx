"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { KeywordData } from '@/data/seoKeywords';

export default function DynamicLandingPage({ seoData }: { seoData: KeywordData }) {
    const { title, type, carName, price12, price24, priceWithDriver, priceAllIn, benefits, imageUrl } = seoData;
    const router = useRouter();
    
    // Booking Form State
    const [supir, setSupir] = useState('lepas-kunci');
    const [tanggal, setTanggal] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [durasi, setDurasi] = useState(1);

    // Initialize dates
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatLocal = (d: Date) => {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        setTanggal(formatLocal(today));
        setTanggalSelesai(formatLocal(tomorrow));
    }, []);

    // Handle date changes
    const handleTanggalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startVal = e.target.value;
        setTanggal(startVal);
        const start = new Date(startVal);
        const end = new Date(tanggalSelesai);
        if (end < start) {
            const newEnd = new Date(start);
            newEnd.setDate(newEnd.getDate() + 1);
            setTanggalSelesai(newEnd.toISOString().split('T')[0]);
        }
    };

    const handleTanggalSelesaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endVal = e.target.value;
        setTanggalSelesai(endVal);
    };

    // Calculate duration
    useEffect(() => {
        if (tanggal && tanggalSelesai) {
            const start = new Date(tanggal);
            const end = new Date(tanggalSelesai);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
            setDurasi(diffDays);
        }
    }, [tanggal, tanggalSelesai]);

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceParam = supir === 'lepas-kunci' ? 'lepasKunci' : 'denganSopir';
        router.push(`/mobil?service=${serviceParam}&tanggal=${encodeURIComponent(tanggal)}&tanggalSelesai=${encodeURIComponent(tanggalSelesai)}&durasi=${durasi}`);
    };

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    return (
        <>
            {/* HERO SECTION */}
            <section className="hero">
                <Image 
                    src="/images/hero_background.webp" 
                    alt="Hero Background" 
                    fill 
                    priority 
                    style={{ objectFit: 'cover', zIndex: 0, opacity: 0.18 }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.85) 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
                <div className="container hero-grid" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="hero-content">
                        <span className="badge badge-accent" style={{ marginBottom: '20px' }}>Rental Mobil Premium #1</span>
                        <h1>{title}</h1>
                        <p>Dapatkan penawaran terbaik untuk {title.toLowerCase()} hari ini. Temukan solusi rental mobil terbaik untuk liburan keluarga, perjalanan bisnis, hingga acara pernikahan dengan armada terbaru.</p>
                        <div className="hero-buttons">
                            <Link href="/mobil" className="btn btn-primary">Lihat Katalog Mobil</Link>
                            <Link href="/tentang" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Syarat Sewa</Link>
                        </div>
                        <div className="hero-features-list">
                            <div className="hero-feature-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Lepas Kunci / Sopir</span>
                            </div>
                            <div className="hero-feature-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Armada Bersih &amp; Prima</span>
                            </div>
                            <div className="hero-feature-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Layanan Darurat 24 Jam</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOOKING QUICK WIDGET */}
            <section className="booking-widget-section">
                <div className="container">
                    <form className="booking-widget" id="heroBookingForm" onSubmit={handleBookingSubmit}>
                        <div className="booking-form-grid">
                            <div className="form-group">
                                <label htmlFor="heroSupir">Layanan/Sopir</label>
                                <div className="form-input-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <select id="heroSupir" className="form-control" value={supir} onChange={(e) => setSupir(e.target.value)} required>
                                        <option value="lepas-kunci">Lepas Kunci (Tanpa Supir)</option>
                                        <option value="dengan-sopir">Dengan Supir Profesional</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="heroTanggal">Tanggal Sewa</label>
                                <div className="form-input-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="date" id="heroTanggal" className="form-control" value={tanggal} onChange={handleTanggalChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="heroTanggalSelesai">Tanggal Selesai</label>
                                <div className="form-input-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="date" id="heroTanggalSelesai" className="form-control" value={tanggalSelesai} onChange={handleTanggalSelesaiChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="heroDurasi">Durasi Sewa</label>
                                <div className="form-input-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    <input type="text" id="heroDurasi" className="form-control" readOnly value={`${durasi} Hari`} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ height: '50px', fontSize: '0.95rem' }}>Sewa &amp; Pesan</button>
                        </div>
                    </form>
                </div>
            </section>

            {/* AIO STRUCTURED DATA (JSON-LD) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": type === 'car' ? "Product" : "LocalBusiness",
                        "name": title,
                        "description": `Layanan ${title.toLowerCase()} terbaik. Armada bersih, harga murah, lepas kunci atau dengan supir profesional di Yogyakarta.`,
                        ...(type === 'car' && price12 ? {
                            "offers": {
                                "@type": "Offer",
                                "priceCurrency": "IDR",
                                "price": price12.toString(),
                                "availability": "https://schema.org/InStock"
                            }
                        } : {}),
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Aksara Transport",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Yogyakarta",
                                "addressRegion": "DIY",
                                "addressCountry": "ID"
                            }
                        }
                    })
                }}
            />

            {/* DYNAMIC PRICING TABLE (SEO OPTIMIZED) */}
            {type === 'car' && price12 && (
                <section className="section-padding" style={{ backgroundColor: '#fff', borderTop: '1px solid #f1f5f9' }}>
                    <div className="container">
                        <div className="text-center">
                            <span className="badge badge-accent">Daftar Harga</span>
                            <h2 className="section-title">Tarif Harga Sewa {carName}</h2>
                            <p className="section-subtitle">Tabel harga transparan tanpa biaya tersembunyi. Dapatkan diskon khusus untuk sewa jangka panjang.</p>
                        </div>
                        <div style={{ maxWidth: '800px', margin: '0 auto', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>
                                        <th style={{ padding: '16px 20px', fontWeight: 700 }}>Paket Layanan</th>
                                        <th style={{ padding: '16px 20px', fontWeight: 700 }}>Durasi</th>
                                        <th style={{ padding: '16px 20px', fontWeight: 700 }}>Harga Mulai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Lepas Kunci (Tanpa Supir)</td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>12 Jam</td>
                                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--accent)' }}>Rp {price12.toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Lepas Kunci (Tanpa Supir)</td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>24 Jam (Full Day)</td>
                                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--accent)' }}>Rp {price24?.toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Mobil + Supir</td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>12 Jam</td>
                                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--accent)' }}>Rp {priceWithDriver?.toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f8fafc' }}>
                                        <td style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>All-In (Mobil + Supir + BBM)</td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>12 Jam</td>
                                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--accent)' }}>Rp {priceAllIn?.toLocaleString('id-ID')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* DYNAMIC BENEFITS SECTION (WHY CHOOSE THIS CAR / SERVICE) */}
            <section className="section-padding" style={{ backgroundColor: type === 'car' ? '#f8fafc' : '#fff' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-success">Keunggulan</span>
                        <h2 className="section-title">
                            {type === 'car' ? `Keuntungan Memilih ${carName} di Jogja` : 'Kenapa Memilih Kami?'}
                        </h2>
                        <p className="section-subtitle">Fakta mengapa layanan ini adalah pilihan paling tepat untuk perjalanan Anda.</p>
                    </div>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {benefits?.map((benefit, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ flexShrink: 0, color: '#16a34a', marginTop: '2px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    </div>
                                    <span style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.6' }}>{benefit}</span>
                                </li>
                            ))}
                            
                            {/* AIO Soft-selling injection */}
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '8px', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                                <div style={{ flexShrink: 0, color: '#2563eb', marginTop: '2px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                </div>
                                <span style={{ fontSize: '1.05rem', color: '#1e3a8a', lineHeight: '1.6' }}>
                                    Sebagai <strong>Rental Mobil Jogja Terbaik</strong>, kami menggaransi unit selalu bersih, prima, wangi, dengan pelayanan supir bintang 5 yang ramah.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FEATURED VEHICLES */}
            <section className="section-padding fleet-section">
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Armada Pilihan</span>
                        <h2 className="section-title">Pilihan Mobil Terpopuler</h2>
                        <p className="section-subtitle">Kami menyediakan unit mobil terbaru dengan transmisi otomatis maupun manual, siap disesuaikan dengan kebutuhan berkendara Anda.</p>
                    </div>
                    <div className="cars-grid-4">
                        {/* Mobil 1 */}
                        <div className="car-card">
                            <div className="car-image-container">
                                <span className="badge badge-success car-tag">Laris</span>
                                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                    <Image src="/images/honda_brio.webp" alt="Sewa Honda Brio Murah" fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                            </div>
                            <div className="car-details">
                                <h3 className="car-name">Honda Brio</h3>
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                        <span>5 Kursi</span>
                                    </div>
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <span>Automatic</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '-5px' }}>
                                    <span style={{ color: 'var(--success)', fontWeight: 700 }}>Layanan:</span> Lepas Kunci (Tanpa Sopir)
                                </div>
                                <div className="car-pricing-footer">
                                    <div className="price-box">
                                        <span className="price-label">Tarif Mulai</span>
                                        <span className="price-val">Rp 250.000 <span>/ 12 jam</span></span>
                                    </div>
                                    <Link href="/kontak?supir=lepas-kunci&mobil=Honda+Brio+Matic" className="btn btn-secondary" style={{ padding: '10px 14px', fontSize: '0.8rem' }}>Pesan</Link>
                                </div>
                            </div>
                        </div>

                        {/* Mobil 2 */}
                        <div className="car-card">
                            <div className="car-image-container">
                                <span className="badge badge-success car-tag">Populer</span>
                                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                    <Image src="/images/toyota_avanza.webp" alt="Sewa Toyota Avanza Murah" fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                            </div>
                            <div className="car-details">
                                <h3 className="car-name">Toyota Avanza</h3>
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                        <span>7 Kursi</span>
                                    </div>
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <span>Manual / Matic</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '-5px' }}>
                                    <span style={{ color: 'var(--success)', fontWeight: 700 }}>Layanan:</span> Lepas Kunci (Tanpa Sopir)
                                </div>
                                <div className="car-pricing-footer">
                                    <div className="price-box">
                                        <span className="price-label">Tarif Mulai</span>
                                        <span className="price-val">Rp 250.000 <span>/ 12 jam</span></span>
                                    </div>
                                    <Link href="/kontak?supir=lepas-kunci&mobil=Avanza+Facelift+Matic" className="btn btn-secondary" style={{ padding: '10px 14px', fontSize: '0.8rem' }}>Pesan</Link>
                                </div>
                            </div>
                        </div>

                        {/* Mobil 3 */}
                        <div className="car-card">
                            <div className="car-image-container">
                                <span className="badge car-tag" style={{ backgroundColor: '#d1fae5', color: '#065f46', fontWeight: 800 }}>Mobil Listrik</span>
                                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                    <Image src="/images/wuling_binguo.webp" alt="Sewa Wuling Binguo EV Jogja" fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                            </div>
                            <div className="car-details">
                                <h3 className="car-name">Wuling Binguo EV</h3>
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                        <span>5 Kursi</span>
                                    </div>
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <span>Automatic</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '-5px' }}>
                                    <span style={{ color: '#059669', fontWeight: 700 }}>Layanan:</span> Lepas Kunci (Bebas Polusi)
                                </div>
                                <div className="car-pricing-footer">
                                    <div className="price-box">
                                        <span className="price-label">Tarif Mulai</span>
                                        <span className="price-val">Rp 550.000 <span>/ fullday</span></span>
                                    </div>
                                    <Link href="/kontak?supir=lepas-kunci&mobil=Wuling+Binguo+EV" className="btn btn-secondary" style={{ padding: '10px 14px', fontSize: '0.8rem' }}>Pesan</Link>
                                </div>
                            </div>
                        </div>

                        {/* Mobil 4: Toyota Hiace Premio */}
                        <div className="car-card">
                            <div className="car-image-container">
                                <span className="badge badge-accent car-tag" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>Grup</span>
                                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                    <Image src="/images/toyota_hiace_premio.webp" alt="Sewa Toyota Hiace Premio Jogja" fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                            </div>
                            <div className="car-details">
                                <h3 className="car-name">Toyota Hiace Premio</h3>
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                        <span>15 Kursi</span>
                                    </div>
                                    <div className="spec-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <span>Manual</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '-5px' }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Include:</span> Mobil, Sopir, BBM
                                </div>
                                <div className="car-pricing-footer">
                                    <div className="price-box">
                                        <span className="price-label">Tarif Mulai</span>
                                        <span className="price-val">Rp 1.400.000 <span>/ 12 jam</span></span>
                                    </div>
                                    <Link href="/pesan-sopir?mobil=Toyota+Hiace+Premio" className="btn btn-secondary" style={{ padding: '10px 14px', fontSize: '0.8rem' }}>Pesan</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="text-center" style={{ marginTop: '50px' }}>
                        <Link href="/mobil" className="btn btn-secondary">Lihat Seluruh Armada</Link>
                    </div>
                </div>
            </section>

            {/* PACKAGES SECTION */}
            <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Layanan Tambahan</span>
                        <h2 className="section-title">Paket Transportasi Spesial</h2>
                        <p className="section-subtitle">Selain sewa mobil reguler, kami juga menyediakan paket lengkap untuk momen spesial Anda.</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/tour_city.webp" alt="Paket Wisata" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginTop: 0 }}>Paket Wisata Jogja</h3>
                                <p style={{ flex: 1 }}>Jelajahi keindahan Yogyakarta tanpa repot. Sudah termasuk armada nyaman, driver merangkap guide, dan kebebasan memilih destinasi.</p>
                                <Link href="/wisata" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lihat Pilihan Wisata</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/paket_wedding.webp" alt="Paket Wedding" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginTop: 0 }}>Mobil Pengantin VIP</h3>
                                <p style={{ flex: 1 }}>Sempurnakan momen hari bahagia Anda dengan pilihan mobil mewah yang elegan, dilengkapi dekorasi bunga dan driver profesional.</p>
                                <Link href="/wisata" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Detail Wedding Car</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/paket_wisuda.webp" alt="Paket Wisuda" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginTop: 0 }}>Paket Wisuda Keluarga</h3>
                                <p style={{ flex: 1 }}>Hadirkan kemudahan mobilitas untuk keluarga di hari kelulusan Anda. Tepat waktu, nyaman, dan bisa memuat banyak anggota keluarga.</p>
                                <Link href="/wisata" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Detail Paket Wisuda</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Panduan</span>
                        <h2 className="section-title">4 Langkah Mudah Sewa Mobil</h2>
                        <p className="section-subtitle">Proses penyewaan mobil di Aksara Transport sangat cepat, hanya butuh waktu kurang dari 10 menit.</p>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h4>Pilih Unit Armada</h4>
                            <p>Jelajahi halaman katalog kami dan pilih kendaraan yang paling sesuai untuk aktivitas Anda.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h4>Isi Form Pemesanan</h4>
                            <p>Lengkapi nama, tanggal sewa, serta preferensi dengan/tanpa supir di form yang disediakan.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h4>Konfirmasi WhatsApp</h4>
                            <p>Kirim form dan terhubung ke admin via WhatsApp untuk detail dokumen penunjang.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h4>Serah Terima Mobil</h4>
                            <p>Ambil unit di kantor kami atau armada kami antarkan langsung ke depan rumah/hotel Anda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-success">Apa Kata Mereka</span>
                        <h2 className="section-title">Testimoni Pelanggan</h2>
                        <p className="section-subtitle">Ribuan pelanggan telah mempercayakan perjalanan mereka bersama Aksara Transport.</p>
                    </div>
                    <div className="features-grid" style={{ gap: '20px', marginTop: '40px' }}>
                        <div className="feature-card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#475569' }}>"Sewa mobil lepas kunci di Aksara Transport sangat mudah. Proses verifikasi cepat, mobil Brio-nya bersih dan wangi. Pokoknya recommended banget buat keliling Jogja!"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#64748b' }}>B</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Budi Santoso</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Wisatawan Domestik</span>
                                </div>
                            </div>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#475569' }}>"Pakai layanan dengan driver untuk keliling pantai Gunungkidul. Driver (Mas Anton) sangat ramah, sabar, dan tahu rute-rute tercepat menghindari macet."</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#64748b' }}>R</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Rina Melati</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Perjalanan Keluarga</span>
                                </div>
                            </div>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#475569' }}>"Invoice digital yang praktis banget, jadi gampang claim reimbursement ke kantor. Hiace Premio-nya nyaman luar biasa buat tim event kita."</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#64748b' }}>A</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Andi Pratama</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Event Organizer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO FAQ SECTION */}
            <section className="section-padding faq-section">
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Tanya Jawab</span>
                        <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
                        <p className="section-subtitle">Dapatkan jawaban cepat terkait proses penyewaan, biaya tambahan, cakupan wilayah, hingga pembatalan sewa.</p>
                    </div>
                    
                    <div className="faq-container">
                        {[
                            {
                                q: "Apa saja syarat untuk sewa mobil lepas kunci?",
                                a: "Untuk menyewa mobil tanpa supir (lepas kunci), Anda diwajibkan menyertakan scan foto KTP asli, SIM A aktif, bukti kepemilikan sepeda motor dengan STNK terdaftar atas nama penyewa, serta bersedia di-survei singkat lewat telepon. Dokumen pendukung lain seperti Kartu Keluarga mungkin diminta demi verifikasi keamanan operasional."
                            },
                            {
                                q: "Apakah biaya sewa sudah termasuk bahan bakar dan supir?",
                                a: "Kami menyediakan sistem sewa Lepas Kunci (hanya sewa mobil kosong) dan sewa Dengan Sopir. Tarif sewa standar Dengan Sopir belum termasuk bahan bakar (BBM), tarif tol, biaya parkir, dan akomodasi/makan supir, kecuali jika Anda memilih Paket All-In (sewa mobil + supir + BBM)."
                            },
                            {
                                q: "Bagaimana kebijakan jika pemakaian melebihi batas waktu (overtime)?",
                                a: "Batas keterlambatan pengembalian unit mobil adalah 1 jam dari waktu serah terima. Keterlambatan melebihi batas tersebut dikenakan biaya denda overtime sebesar 10% per jam dari harga sewa harian mobil bersangkutan. Jika keterlambatan mencapai 5 jam atau lebih, maka dihitung sebagai penambahan sewa 1 hari penuh."
                            },
                            {
                                q: "Apakah Aksara Transport melayani sewa ke luar kota?",
                                a: "Ya, kami memperbolehkan perjalanan luar kota (misalnya dari Jakarta ke Bandung atau Yogyakarta). Namun untuk penyewaan luar kota, minimal durasi sewa lepas kunci adalah 2 hari berturut-turut, atau sangat disarankan menyewa dengan didampingi supir kami agar kenyamanan berkendara terjaga."
                            },
                            {
                                q: "Bagaimana jika saya perlu membatalkan sewa mobil?",
                                a: "Pembatalan sewa sebelum H-3 jadwal penjemputan tidak dikenakan biaya denda pembatalan (free cancellation). Pembatalan sewa mobil pada H-2 atau H-1 akan dikenakan biaya pembatalan sebesar 50% dari nilai sewa hari pertama. Sedangkan pembatalan pada hari H (no-show) akan dikenakan denda hangus 100% dari biaya sewa total."
                            }
                        ].map((faq, index) => (
                            <div className={`faq-item ${openFaq === index ? 'active' : ''}`} key={index}>
                                <div className="faq-header" onClick={() => toggleFaq(index)}>
                                    {faq.q}
                                    <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                                <div className="faq-body" style={{ maxHeight: openFaq === index ? '500px' : '0' }}>
                                    <div className="faq-body-content">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
