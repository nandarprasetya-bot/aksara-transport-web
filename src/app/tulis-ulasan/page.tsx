"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TulisUlasanPage() {
    const [rating, setRating] = useState<number>(5);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [nama, setNama] = useState<string>('');
    const [asalKota, setAsalKota] = useState<string>('');
    const [layanan, setLayanan] = useState<string>('Lepas Kunci');
    const [armada, setArmada] = useState<string>('Honda Brio Matic');
    const [ruteWisata, setRuteWisata] = useState<string>('');
    const [ulasan, setUlasan] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simpan ke local storage ulasan baru agar langsung tampil
        const newReview = {
            id: 'rev-user-' + Date.now(),
            author: nama,
            city: asalKota,
            role: `${asalKota ? asalKota + ' • ' : ''}Ulasan Terverifikasi`,
            avatarColor: '#0284c7',
            rating: rating,
            date: 'Baru saja',
            isoDate: new Date().toISOString().split('T')[0],
            serviceTag: layanan.toUpperCase(),
            serviceCategory: layanan.toLowerCase().includes('lepas') ? 'lepas-kunci' : (layanan.toLowerCase().includes('hiace') ? 'hiace' : 'dengan-driver'),
            carFleet: armada,
            routeWisata: ruteWisata,
            comment: ulasan,
            likes: 1
        };

        try {
            const existing = localStorage.getItem('aksara_custom_reviews');
            const list = existing ? JSON.parse(existing) : [];
            list.unshift(newReview);
            localStorage.setItem('aksara_custom_reviews', JSON.stringify(list));
        } catch {
            // ignore storage err
        }

        setSubmitted(true);
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '110px', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
                
                {/* BREADCRUMB */}
                <div style={{ marginBottom: '20px', fontSize: '0.875rem', color: '#64748b' }}>
                    <Link href="/" style={{ color: 'var(--primary, #0284c7)', textDecoration: 'none' }}>Beranda</Link> &raquo;{' '}
                    <Link href="/ulasan" style={{ color: 'var(--primary, #0284c7)', textDecoration: 'none' }}>Ulasan Pelanggan</Link> &raquo;{' '}
                    <span>Tulis Ulasan</span>
                </div>

                {!submitted ? (
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
                        
                        {/* FORM HEADER */}
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', color: '#1d4ed8', padding: '4px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '12px' }}>
                                ⭐ PENGALAMAN ANDA SANGAT BERHARGA
                            </div>
                            <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 10px 0' }}>
                                Bagikan Pengalaman Sewa Mobil Anda
                            </h1>
                            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                                Ulasan Anda membantu wisatawan lain memilih transportasi terbaik di Yogyakarta dan membantu kami terus meningkatkan kualitas armada &amp; layanan driver.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            
                            {/* RATING STARS PICKER */}
                            <div style={{ textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                                    Berapa Bintang Penilaian Anda? <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '10px 0' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '4px',
                                                transition: 'transform 0.15s ease'
                                            }}
                                            aria-label={`Beri bintang ${star}`}
                                        >
                                            <svg 
                                                width="36" 
                                                height="36" 
                                                viewBox="0 0 24 24" 
                                                fill={(hoverRating || rating) >= star ? '#fbbc04' : '#cbd5e1'}
                                                style={{ transition: 'fill 0.15s ease' }}
                                            >
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>
                                    {rating === 5 && '🌟 5.0 - Sangat Memuaskan (Sempurna)'}
                                    {rating === 4 && '👍 4.0 - Bagus & Memuaskan'}
                                    {rating === 3 && '😐 3.0 - Cukup Baik'}
                                    {rating === 2 && '👎 2.0 - Kurang Memuaskan'}
                                    {rating === 1 && '⚠️ 1.0 - Sangat Kecewa'}
                                </span>
                            </div>

                            {/* NAMA & KOTA */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                        Nama Lengkap / Panggilan <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                        placeholder="Contoh: Budi Santoso / Rina Melati"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                        Asal Kota / Instansi
                                    </label>
                                    <input 
                                        type="text" 
                                        value={asalKota}
                                        onChange={(e) => setAsalKota(e.target.value)}
                                        placeholder="Contoh: Jakarta / Surabaya / PT Telkom"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* PILIHAN LAYANAN & ARMADA */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                        Jenis Layanan Sewa <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <select
                                        value={layanan}
                                        onChange={(e) => setLayanan(e.target.value)}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', background: '#fff' }}
                                    >
                                        <option value="Lepas Kunci">Rental Lepas Kunci (Self Drive 24 Jam)</option>
                                        <option value="Dengan Driver">Sewa Mobil + Supir Profesional</option>
                                        <option value="Hiace Rombongan">Minibus Hiace / Elf Rombongan Wisata</option>
                                        <option value="Drop Off Bandara">Antar Jemput Bandara YIA / Stasiun Tugu</option>
                                        <option value="Perjalanan Dinas">Perjalanan Dinas Kantor / Tamu VVIP</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                        Tipe Armada yang Digunakan <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <select
                                        value={armada}
                                        onChange={(e) => setArmada(e.target.value)}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', background: '#fff' }}
                                    >
                                        <option value="Honda Brio Matic">Honda Brio Matic</option>
                                        <option value="Toyota Avanza Facelift">Toyota Avanza Facelift</option>
                                        <option value="Toyota Innova Reborn Diesel">Toyota Innova Reborn Diesel</option>
                                        <option value="Toyota Innova Zenix Hybrid">Toyota Innova Zenix Hybrid</option>
                                        <option value="Toyota Hiace Premio Luxury">Toyota Hiace Premio Luxury</option>
                                        <option value="Toyota Hiace Commuter 15 Seat">Toyota Hiace Commuter 15 Seat</option>
                                        <option value="Toyota Alphard Facelift VIP">Toyota Alphard Facelift VIP</option>
                                        <option value="Toyota Fortuner VRZ">Toyota Fortuner VRZ</option>
                                        <option value="Mitsubishi Pajero Sport">Mitsubishi Pajero Sport</option>
                                        <option value="Isuzu Elf Long 19 Seat">Isuzu Elf Long 19 Seat</option>
                                    </select>
                                </div>
                            </div>

                            {/* RUTE WISATA YANG DIKUNJUNGI (SEO BOOSTER) */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                    Destinasi / Rute Wisata yang Dikunjungi di Jogja
                                </label>
                                <input 
                                    type="text" 
                                    value={ruteWisata}
                                    onChange={(e) => setRuteWisata(e.target.value)}
                                    placeholder="Contoh: Candi Borobudur, Malioboro, Pantai Timang, HeHa Ocean View"
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                                />
                                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                                    💡 Sebutkan tempat-tempat yang Anda kunjungi agar ulasan ini membantu wisatawan lain merencanakan itinerary.
                                </span>
                            </div>

                            {/* KOLOM ULASAN */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                    Ceritakan Pengalaman Anda Selama di Jogja <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={ulasan}
                                    onChange={(e) => setUlasan(e.target.value)}
                                    placeholder="Bagaimana kondisi mobil, kebersihan kabin, ketepatan waktu penjemputan, keramahan supir atau proses lepas kunci? Tuliskan ulasan jujur Anda di sini..."
                                    style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                                />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#1a73e8',
                                    color: '#ffffff',
                                    padding: '16px',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(26,115,232,0.35)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <span>Publikasikan Ulasan Anda</span>
                                <span>&rarr;</span>
                            </button>

                        </form>
                    </div>
                ) : (
                    /* SUCCESS STATE */
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '2rem' }}>
                            ✓
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '10px' }}>
                            Terima Kasih Atas Ulasan Anda!
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '550px', margin: '0 auto 25px auto', lineHeight: 1.6 }}>
                            Ulasan Anda mengenai layanan <strong>{armada} ({layanan})</strong> telah berhasil direkam dan akan tampil di halaman ulasan website Aksara Transport.
                        </p>

                        {/* GOOGLE MAPS DIRECT SHARE PROMPT */}
                        <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '12px', padding: '24px', maxWidth: '560px', margin: '0 auto 30px auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                </svg>
                                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Bantu Kami Juga di Google Maps!</strong>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '16px', lineHeight: 1.6 }}>
                                Salin teks ulasan Anda dan bantu kami dengan menempelkannya langsung di profil Google Maps resmi Aksara Transport agar wisatawan lain di Google Maps bisa melihat rekomendasi Anda.
                            </p>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: '#1a73e8',
                                    color: '#ffffff',
                                    padding: '10px 22px',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    textDecoration: 'none'
                                }}
                            >
                                <span>Buka Profil Google Maps Kami</span>
                                <span>&rarr;</span>
                            </a>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <Link 
                                href="/ulasan"
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '50px',
                                    border: '1.5px solid #cbd5e1',
                                    color: '#334155',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    textDecoration: 'none'
                                }}
                            >
                                Lihat Halaman Ulasan
                            </Link>
                            <Link 
                                href="/"
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '50px',
                                    backgroundColor: 'var(--primary, #0284c7)',
                                    color: '#ffffff',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    textDecoration: 'none'
                                }}
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
