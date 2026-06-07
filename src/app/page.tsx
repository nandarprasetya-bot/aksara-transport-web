"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
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
                <div className="container hero-grid">
                    <div className="hero-content">
                        <span className="badge badge-accent" style={{ marginBottom: '20px' }}>Rental Mobil Premium #1</span>
                        <h1>Perjalanan Aman, Nyaman, dan <span>Tanpa Ribet</span></h1>
                        <p>Temukan solusi rental mobil terbaik untuk kebutuhan liburan keluarga, perjalanan bisnis, hingga acara pernikahan dengan armada terbaru dan layanan ramah.</p>
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

            {/* WHY CHOOSE US */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Mengapa Aksara Transport</span>
                        <h2 className="section-title">Layanan Terbaik Untuk Perjalanan Anda</h2>
                        <p className="section-subtitle">Kami menaruh prioritas tertinggi pada kenyamanan, keamanan, dan kepuasan setiap pelanggan kami.</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            </div>
                            <h3>Armada Prima &amp; Terawat</h3>
                            <p>Semua kendaraan kami selalu dibersihkan secara berkala, disinfeksi penuh, dan diservis rutin di bengkel resmi demi performa optimal di jalan.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <h3>Supir Ramah &amp; Berpengalaman</h3>
                            <p>Didukung oleh tim supir bersertifikat, hafal jalanan lokal dan tempat wisata, serta mengutamakan keselamatan berkendara secara aman.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <h3>Harga Jujur &amp; Transparan</h3>
                            <p>Tidak ada biaya tersembunyi. Harga sewa yang tertera sudah termasuk asuransi dasar. Dapatkan diskon khusus untuk sewa mingguan atau bulanan.</p>
                        </div>
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
                                <img loading="lazy" src="/images/honda_brio.webp" alt="Sewa Honda Brio Murah" />
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
                                <img loading="lazy" src="/images/toyota_avanza.webp" alt="Sewa Toyota Avanza Murah" />
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
                                <img loading="lazy" src="/images/wuling_binguo.webp" alt="Sewa Wuling Binguo EV Jogja" />
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
                                <img loading="lazy" src="/images/toyota_hiace_premio.webp" alt="Sewa Toyota Hiace Premio Jogja" />
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
                            <img src="/images/tour_city.webp" alt="Paket Wisata" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginTop: 0 }}>Paket Wisata Jogja</h3>
                                <p style={{ flex: 1 }}>Jelajahi keindahan Yogyakarta tanpa repot. Sudah termasuk armada nyaman, driver merangkap guide, dan kebebasan memilih destinasi.</p>
                                <Link href="/wisata" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lihat Pilihan Wisata</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <img src="/images/paket_wedding.png" alt="Paket Wedding" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginTop: 0 }}>Mobil Pengantin VIP</h3>
                                <p style={{ flex: 1 }}>Sempurnakan momen hari bahagia Anda dengan pilihan mobil mewah yang elegan, dilengkapi dekorasi bunga dan driver profesional.</p>
                                <Link href="/wisata" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Detail Wedding Car</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <img src="/images/paket_wisuda.png" alt="Paket Wisuda" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
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
