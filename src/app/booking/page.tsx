"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function BookingPage() {
    const [nama, setNama] = useState('');
    const [layanan, setLayanan] = useState('lepas-kunci');
    const [mobil, setMobil] = useState('Brio');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [durasi, setDurasi] = useState(1);
    const [lokasiAntar, setLokasiAntar] = useState('');

    // Calculate duration automatically
    useEffect(() => {
        if (tanggalMulai && tanggalSelesai) {
            const start = new Date(tanggalMulai);
            const end = new Date(tanggalSelesai);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
            setDurasi(diffDays);
        }
    }, [tanggalMulai, tanggalSelesai]);

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const layananText = layanan === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Sopir)' : 'Dengan Sopir';
        
        let message = `Halo Aksara Transport, saya ingin booking mobil dengan detail berikut:%0A%0A`;
        message += `*Nama:* ${nama}%0A`;
        message += `*Layanan:* ${layananText}%0A`;
        message += `*Mobil:* ${mobil}%0A`;
        message += `*Tanggal:* ${tanggalMulai} s/d ${tanggalSelesai} (${durasi} Hari)%0A`;
        message += `*Lokasi Antar/Jemput:* ${lokasiAntar}%0A%0A`;

        if (layanan === 'lepas-kunci') {
            message += `*CATATAN PENTING (Khusus Lepas Kunci):*%0A`;
            message += `Bersama pesan ini, saya akan melampirkan foto dokumen persyaratan:%0A`;
            message += `1. Foto KTP Asli (2 Buah)%0A`;
            message += `2. Foto SIM A Asli%0A`;
            message += `3. Tiket Pulang Pergi (Pesawat/Kereta)%0A`;
            message += `4. Voucher Penginapan Hotel%0A`;
        }

        const waNumber = "628386000740"; 
        const waLink = `https://wa.me/${waNumber}?text=${message}`;
        
        window.location.href = waLink;
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Form Pemesanan</h1>
                        <p style={{ color: '#64748b' }}>Isi detail di bawah untuk melanjutkan booking via WhatsApp.</p>
                    </div>

                    <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="nama" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>Nama Lengkap</label>
                            <input 
                                type="text" 
                                id="nama" 
                                className="form-control" 
                                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                                value={nama} 
                                onChange={(e) => setNama(e.target.value)} 
                                required 
                                placeholder="Masukkan nama Anda"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="layanan" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>Jenis Layanan</label>
                            <select 
                                id="layanan" 
                                className="form-control" 
                                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#fff' }}
                                value={layanan} 
                                onChange={(e) => setLayanan(e.target.value)} 
                                required
                            >
                                <option value="lepas-kunci">Lepas Kunci (Tanpa Sopir)</option>
                                <option value="dengan-sopir">Dengan Sopir Profesional</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobil" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>Pilihan Mobil</label>
                            <select 
                                id="mobil" 
                                className="form-control" 
                                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#fff' }}
                                value={mobil} 
                                onChange={(e) => setMobil(e.target.value)} 
                                required
                            >
                                <option value="Brio">Honda Brio</option>
                                <option value="Agya">Toyota Agya</option>
                                <option value="Avanza">Toyota Avanza</option>
                                <option value="Xenia">Daihatsu Xenia</option>
                                <option value="Innova Reborn">Toyota Innova Reborn</option>
                                <option value="Innova Zenix">Toyota Innova Zenix</option>
                                <option value="Hiace">Toyota Hiace</option>
                                <option value="Alphard">Toyota Alphard</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label htmlFor="tanggalMulai" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>Tanggal Mulai</label>
                                <input 
                                    type="date" 
                                    id="tanggalMulai" 
                                    className="form-control" 
                                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                                    value={tanggalMulai} 
                                    onChange={(e) => setTanggalMulai(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tanggalSelesai" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>Tanggal Selesai</label>
                                <input 
                                    type="date" 
                                    id="tanggalSelesai" 
                                    className="form-control" 
                                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                                    value={tanggalSelesai} 
                                    onChange={(e) => setTanggalSelesai(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lokasiAntar" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#334155' }}>Lokasi Antar/Jemput (Stasiun/Hotel/Bandara)</label>
                            <input 
                                type="text" 
                                id="lokasiAntar" 
                                className="form-control" 
                                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px' }}
                                value={lokasiAntar} 
                                onChange={(e) => setLokasiAntar(e.target.value)} 
                                required 
                                placeholder="Contoh: Stasiun Tugu / Hotel Tentrem"
                            />
                        </div>

                        {layanan === 'lepas-kunci' && (
                            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                                <p style={{ fontSize: '0.85rem', color: '#b45309', margin: 0, fontWeight: 600 }}>
                                    ⚠️ Perhatian: Untuk layanan Lepas Kunci, pastikan Anda menyiapkan dokumen (KTP, SIM A, Tiket, Voucher Hotel) untuk dikirimkan via WhatsApp setelah menekan tombol di bawah.
                                </p>
                            </div>
                        )}

                        <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#25d366', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Kirim Format Booking ke WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
