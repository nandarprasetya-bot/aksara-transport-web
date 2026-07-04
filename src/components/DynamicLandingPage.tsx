"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { KeywordData } from '@/data/seoKeywords';

export default function DynamicLandingPage({ seoData }: { seoData: KeywordData }) {
    const { title, type, carName, price12, fullday, priceWithDriver, priceAllIn, benefits, imageUrl } = seoData;
    
    // Booking Form State
    const [layanan, setLayanan] = useState('lepas-kunci');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [inputCarName, setInputCarName] = useState(carName || '');
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

        setTanggalMulai(formatLocal(today));
        setTanggalSelesai(formatLocal(tomorrow));
    }, []);

    // Calculate duration when dates change
    useEffect(() => {
        if (tanggalMulai && tanggalSelesai) {
            const start = new Date(tanggalMulai);
            const end = new Date(tanggalSelesai);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
            setDurasi(diffDays);
        }
    }, [tanggalMulai, tanggalSelesai]);

    const handleTanggalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startVal = e.target.value;
        setTanggalMulai(startVal);
        const start = new Date(startVal);
        const end = new Date(tanggalSelesai);
        if (end < start) {
            const newEnd = new Date(start);
            newEnd.setDate(newEnd.getDate() + 1);
            setTanggalSelesai(newEnd.toISOString().split('T')[0]);
        }
    };

    const handleTanggalSelesaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTanggalSelesai(e.target.value);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceLabel = layanan === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Supir)' : 'Dengan Driver Profesional';
        
        // Build customized WhatsApp message text
        const messageText = `Halo Aksara Transport, saya ingin menanyakan ketersediaan armada rental mobil:\n\n` +
                            `- Mobil: ${inputCarName}\n` +
                            `- Layanan: ${serviceLabel}\n` +
                            `- Tanggal Sewa: ${tanggalMulai}\n` +
                            `- Tanggal Selesai: ${tanggalSelesai}\n` +
                            `- Durasi: ${durasi} Hari\n\n` +
                            `Mohon informasi ketersediaan unit dan rincian persyaratannya. Terima kasih!`;

        const waUrl = `https://wa.me/628386000740?text=${encodeURIComponent(messageText)}`;
        window.open(waUrl, '_blank');
    };

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Infer car specifications based on name
    const getSpecs = () => {
        const name = (carName || '').toLowerCase();
        if (name.includes('brio') || name.includes('jazz')) {
            return { seats: '5 Penumpang', trans: 'Automatic', fuel: 'Pertalite / BBM', class: 'City Car' };
        } else if (name.includes('raize')) {
            return { seats: '5 Penumpang', trans: 'Automatic (Turbo)', fuel: 'Pertamax', class: 'Compact SUV' };
        } else if (name.includes('avanza') || name.includes('xpander') || name.includes('innova')) {
            return { seats: '7 Penumpang', trans: name.includes('innova') ? 'Automatic' : 'Automatic / Manual', fuel: 'Pertamax / Diesel', class: 'MPV Keluarga' };
        } else if (name.includes('pajero') || name.includes('fortuner')) {
            return { seats: '7 Penumpang', trans: 'Automatic', fuel: 'Dexlite / Diesel', class: 'SUV Premium' };
        } else if (name.includes('hiace')) {
            return { seats: '14-15 Penumpang', trans: 'Manual / Automatic', fuel: 'Diesel', class: 'Microbus' };
        } else if (name.includes('elf')) {
            return { seats: '19 Penumpang', trans: 'Manual', fuel: 'Diesel', class: 'Microbus Long' };
        } else if (name.includes('listrik') || name.includes('binguo') || name.includes('air ev')) {
            return { seats: '4-5 Penumpang', trans: 'Automatic', fuel: '100% Listrik (EV)', class: 'Eco Electric' };
        }
        return { seats: '7 Penumpang', trans: 'Automatic / Manual', fuel: 'BBM', class: 'MPV' };
    };

    const specs = getSpecs();

    return (
        <div style={{ backgroundColor: 'var(--surface-color)', minHeight: '100vh', paddingBottom: '60px' }}>
            
            {/* BREADCRUMB BAR */}
            <div style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--border-color)', padding: '16px 0', marginTop: 'var(--header-height, 80px)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)' }} className="hover-accent">Home</Link>
                    <span>/</span>
                    <Link href="/mobil" style={{ color: 'var(--text-muted)' }} className="hover-accent">Sewa Mobil</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--text-dark)' }}>{carName || title}</span>
                </div>
            </div>

            {/* MAIN TWO COLUMN SECTION */}
            <section style={{ padding: '40px 0' }}>
                <div className="container dynamic-landing-grid">
                    
                    {/* LEFT COLUMN: PRODUCT CONTENT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* HEADER TITLE SECTION */}
                        <div>
                            {type === 'car' && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                    <span style={{ backgroundColor: '#fff0e5', color: 'var(--accent)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>{specs.class}</span>
                                    <span style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{specs.seats}</span>
                                    <span style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{specs.trans}</span>
                                    <span style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{specs.fuel}</span>
                                </div>
                            )}
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: '1.2', marginBottom: '16px' }}>
                                {title}
                            </h1>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                Sewa {carName || 'mobil'} murah di Yogyakarta dengan kondisi armada bersih, wangi, terawat, dan keluaran terbaru. Tersedia sistem sewa lepas kunci maupun sewa dengan sopir profesional ramah.
                            </p>
                        </div>

                        {/* HERO CAR IMAGE */}
                        {imageUrl && (
                            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <div style={{ position: 'relative', width: '100%', height: '320px', maxWidth: '550px' }}>
                                    <Image 
                                        src={imageUrl} 
                                        alt={`Sewa Mobil ${carName} Jogja`} 
                                        fill 
                                        style={{ objectFit: 'contain' }}
                                        priority
                                    />
                                </div>
                            </div>
                        )}

                        {/* TARIF SEWA TABLE */}
                        {type === 'car' && (price12 || fullday || priceWithDriver || priceAllIn) && (
                            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '8px', marginBottom: '20px' }}>
                                    Pilihan Varian &amp; Tarif Harga
                                </h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-dark)', fontWeight: 800 }}>
                                                <th style={{ padding: '12px 16px', fontSize: '0.95rem' }}>Layanan</th>
                                                <th style={{ padding: '12px 16px', fontSize: '0.95rem' }}>Durasi</th>
                                                <th style={{ padding: '12px 16px', fontSize: '0.95rem', textAlign: 'right' }}>Harga Sewa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {price12 && (
                                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>Sewa Lepas Kunci (Tanpa Sopir)</td>
                                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>12 Jam (Weekday)</td>
                                                    <td style={{ padding: '16px', fontWeight: 800, color: 'var(--accent)', textAlign: 'right', fontSize: '1.1rem' }}>Rp {price12.toLocaleString('id-ID')}</td>
                                                </tr>
                                            )}
                                            {fullday && (
                                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>Sewa Lepas Kunci (Tanpa Sopir)</td>
                                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>Fullday (Weekend/Liburan)</td>
                                                    <td style={{ padding: '16px', fontWeight: 800, color: 'var(--accent)', textAlign: 'right', fontSize: '1.1rem' }}>Rp {fullday.toLocaleString('id-ID')}</td>
                                                </tr>
                                            )}
                                            {priceWithDriver && (
                                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>Mobil + Sopir (Belum Termasuk BBM)</td>
                                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>12 Jam / Fullday</td>
                                                    <td style={{ padding: '16px', fontWeight: 800, color: 'var(--accent)', textAlign: 'right', fontSize: '1.1rem' }}>Rp {priceWithDriver.toLocaleString('id-ID')}</td>
                                                </tr>
                                            )}
                                            {priceAllIn && (
                                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>All-In (Mobil + Sopir + BBM)</td>
                                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>12 Jam / Fullday</td>
                                                    <td style={{ padding: '16px', fontWeight: 800, color: 'var(--accent)', textAlign: 'right', fontSize: '1.1rem' }}>Rp {priceAllIn.toLocaleString('id-ID')}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '15px', fontStyle: 'italic' }}>
                                    * Note: Untuk sewa lepas kunci 12 Jam &amp; 24 Jam berlaku khusus hari weekday (Senin-Kamis). Hari Jumat-Minggu serta libur nasional dilayani dengan paket sewa Fullday.
                                </p>
                            </div>
                        )}

                        {/* DESCRIPTION / ARTICLE */}
                        <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '8px', marginBottom: '20px' }}>
                                Deskripsi Ulasan {carName || 'Layanan'}
                            </h2>
                            <div style={{ color: '#475569', fontSize: '1.025rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <p>
                                    Yogyakarta memiliki kekayaan budaya dan destinasi alam menakjubkan yang tersebar luas, mulai dari perkotaan bersejarah, pegunungan sejuk Merapi, hingga jejeran pantai eksotis di Gunungkidul. Memilih armada transportasi yang tepat adalah kunci utama menikmati liburan dengan tenang.
                                </p>
                                <p>
                                    {carName ? `Armada ${carName} kami rawat secara berkala di bengkel resmi demi memastikan mesin dalam kondisi prima, AC dingin maksimal, serta kabin senyap terbebas dari bau asap rokok. Kabin yang lapang menjamin kenyamanan seluruh penumpang selama menempuh rute perjalanan jauh maupun menghadapi kepadatan lalu lintas kota Jogja.` : `Layanan transportasi kami rancang khusus untuk memenuhi kebutuhan perjalanan Anda dengan aman, fleksibel, dan ekonomis.`}
                                </p>
                                <p>
                                    Didukung tim driver profesional berpengalaman yang hafal jalan tikus Jogja dan bersikap sopan, kami siap menemani aktivitas Anda dengan standar kenyamanan bintang 5. Bagi Anda yang menyukai privasi, pilihan rental lepas kunci dapat disewa dengan syarat verifikasi cepat dan mudah.
                                </p>
                            </div>
                        </div>

                        {/* BENEFITS SECTION */}
                        {benefits && benefits.length > 0 && (
                            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '8px', marginBottom: '20px' }}>
                                    Fitur &amp; Keunggulan Utama
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {benefits.map((benefit, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', flexShrink: 0, fontWeight: 800, fontSize: '0.85rem' }}>✓</span>
                                            <span style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.5' }}>{benefit}</span>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '10px', padding: '16px', backgroundColor: '#fff8eb', borderRadius: '8px', border: '1px solid #ffe8cc' }}>
                                        <span style={{ color: 'var(--accent)', fontSize: '1.25rem', lineHeight: '1', flexShrink: 0 }}>★</span>
                                        <span style={{ color: '#b25e00', fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.5' }}>
                                            Aksara Transport menjamin unit dalam kondisi higienis dan disemprot disinfektan sebelum diserahkan kepada Anda.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAQ SECTION */}
                        <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '8px', marginBottom: '20px' }}>
                                Tanya Jawab Umum (FAQ)
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    {
                                        q: "Bagaimana syarat sewa mobil lepas kunci?",
                                        a: "Persyaratan sewa lepas kunci sangatlah mudah: Anda hanya perlu mengirimkan scan foto KTP asli, SIM A aktif, bukti kepemilikan motor dengan STNK atas nama pribadi, serta bersedia di-survei singkat via telepon."
                                    },
                                    {
                                        q: "Apakah harga sewa sudah termasuk BBM dan Tol?",
                                        a: "Untuk sistem sewa Lepas Kunci, BBM ditanggung oleh penyewa. Untuk sistem Dengan Sopir, tarif dasar belum termasuk BBM, Tol, dan parkir, kecuali Anda memesan paket spesial All-In."
                                    },
                                    {
                                        q: "Apakah bisa diantar-jemput ke hotel atau stasiun?",
                                        a: "Ya! Kami menyediakan layanan antar-jemput armada ke Stasiun Tugu, Lempuyangan, Bandara YIA, serta berbagai hotel di pusat kota Yogyakarta dengan tarif antar-jemput yang sangat terjangkau."
                                    }
                                ].map((faq, index) => (
                                    <div key={index} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                                        <div 
                                            onClick={() => toggleFaq(index)} 
                                            style={{ backgroundColor: '#f8fafc', padding: '16px 20px', fontWeight: 700, color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            <span>{faq.q}</span>
                                            <span style={{ fontSize: '0.8rem', transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                                        </div>
                                        {openFaq === index && (
                                            <div style={{ padding: '20px', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', backgroundColor: '#fff' }}>
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: BOOKING SIDEBAR CARD */}
                    <div>
                        <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            {/* BOOKING CARD */}
                            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '5px' }}>Booking Cepat via WA</h3>
                                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Silakan lengkapi rincian di bawah untuk memeriksa ketersediaan unit</p>
                                
                                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>Pilihan Layanan</label>
                                        <select 
                                            value={layanan} 
                                            onChange={(e) => setLayanan(e.target.value)}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.9rem', outline: 'none', backgroundColor: '#fff' }}
                                        >
                                            <option value="lepas-kunci">Lepas Kunci (Tanpa Sopir)</option>
                                            <option value="dengan-sopir">Dengan Driver Profesional</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>Tanggal Mulai Sewa</label>
                                        <input 
                                            type="date" 
                                            value={tanggalMulai} 
                                            onChange={handleTanggalChange}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.9rem', outline: 'none' }}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>Tanggal Selesai Sewa</label>
                                        <input 
                                            type="date" 
                                            value={tanggalSelesai} 
                                            onChange={handleTanggalSelesaiChange}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.9rem', outline: 'none' }}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>Tipe Mobil (Input Manual)</label>
                                        <input 
                                            type="text" 
                                            value={inputCarName} 
                                            onChange={(e) => setInputCarName(e.target.value)}
                                            placeholder="Ketik tipe mobil..."
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.9rem', outline: 'none' }}
                                            required
                                        />
                                    </div>

                                    <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimasi Durasi</span>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)' }}>{durasi} Hari</span>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        style={{ width: '100%', height: '48px', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                                    >
                                        Cek Ketersediaan via WA
                                    </button>

                                </form>
                            </div>
                            
                            {/* TRUST WIDGET */}
                            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-dark)' }}>100% Pembatalan Gratis</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Bebas denda pembatalan sebelum H-3 jadwal penjemputan. Liburan aman tanpa cemas rencana berubah.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
