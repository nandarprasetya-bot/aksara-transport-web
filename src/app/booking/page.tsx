"use client";

import React, { useState } from 'react';

export default function BookingPage() {
    const [sewaNama, setSewaNama] = useState('');
    const [sewaTelepon, setSewaTelepon] = useState('');
    const [sewaWaPJ, setSewaWaPJ] = useState('');
    const [layanan, setLayanan] = useState('lepas-kunci');
    const [sewaMobil, setSewaMobil] = useState('');
    const [sewaMulai, setSewaMulai] = useState('');
    const [sewaMulaiTime, setSewaMulaiTime] = useState('08:00');
    const [sewaSelesai, setSewaSelesai] = useState('');
    const [sewaSelesaiTime, setSewaSelesaiTime] = useState('08:00');
    const [sewaTujuan, setSewaTujuan] = useState('');
    const [sewaPengantaranAlamat, setSewaPengantaranAlamat] = useState('');
    const [sewaPengambilanAlamat, setSewaPengambilanAlamat] = useState('');
    const [sewaCatatan, setSewaCatatan] = useState('');
    const [sewaSyaratCheck, setSewaSyaratCheck] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!sewaSyaratCheck) {
            alert('Silakan centang persetujuan Syarat & Ketentuan terlebih dahulu.');
            return;
        }

        const layananText = layanan === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Sopir)' : 'Dengan Sopir';
        
        let text = `*FORM PEMESANAN MANUAL*\nAksara Transport Yogyakarta\n\n`;
        text += `*Data Penyewa:*\n- Nama: ${sewaNama}\n- WA Pemesan: ${sewaTelepon}\n`;
        if (layanan === 'lepas-kunci') {
            text += `- WA Penanggung Jawab: ${sewaWaPJ}\n`;
        }
        text += `\n*Detail Pesanan:*\n- Layanan: ${layananText}\n- Armada (Manual): ${sewaMobil}\n- Tgl Mulai: ${sewaMulai} jam ${sewaMulaiTime}\n- Tgl Selesai: ${sewaSelesai} jam ${sewaSelesaiTime}\n- Rencana Tujuan: ${sewaTujuan}\n\n`;
        text += `*Lokasi Serah Terima:*\n- Antar ke: ${sewaPengantaranAlamat}\n- Ambil di: ${sewaPengambilanAlamat}\n\n`;
        
        if (sewaCatatan) text += `*Catatan:*\n${sewaCatatan}\n\n`;
        
        text += `Mohon info ketersediaan unit dan total biaya sewanya. Terima kasih.\n\n`;

        if (layanan === 'lepas-kunci') {
            text += `*CATATAN PENTING (Khusus Lepas Kunci):*\n`;
            text += `Bersama pesan ini, saya siap melampirkan foto dokumen persyaratan:\n`;
            text += `1. Foto KTP Asli (Penyewa & Penjamin)\n`;
            text += `2. Foto SIM A Asli\n`;
            text += `3. Tiket Pulang Pergi (Pesawat/Kereta)\n`;
            text += `4. Voucher Penginapan Hotel\n`;
            text += `* Khusus Domisili Jogja wajib menjaminkan Sepeda Motor dan STNK atas nama pribadi.\n`;
        }

        const waNumber = "628386000740"; 
        const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
        
        window.location.href = waLink;
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '120px', paddingBottom: '60px' }}>
            <div className="container" style={{ maxWidth: '700px' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Formulir Pemesanan Manual</h1>
                        <p style={{ color: '#64748b' }}>Isi lengkap data di bawah ini untuk dikirimkan ke WhatsApp Admin.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Jenis Layanan</label>
                            <select value={layanan} onChange={e=>setLayanan(e.target.value)} required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontWeight: 600, backgroundColor: '#fff' }}>
                                <option value="lepas-kunci">Lepas Kunci (Tanpa Sopir)</option>
                                <option value="dengan-sopir">Dengan Sopir Profesional</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Pilihan Armada Mobil (Ketik Manual)</label>
                            <input type="text" value={sewaMobil} onChange={e=>setSewaMobil(e.target.value)} placeholder="Contoh: Honda Brio / Innova Reborn" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                            <div>
                                <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Nama Lengkap</label>
                                <input type="text" value={sewaNama} onChange={e=>setSewaNama(e.target.value)} placeholder="Contoh: Budi Santoso" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Nomor WhatsApp Aktif</label>
                                <input type="tel" value={sewaTelepon} onChange={e=>setSewaTelepon(e.target.value)} placeholder="Contoh: 081234567890" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                            </div>
                        </div>

                        {layanan === 'lepas-kunci' && (
                            <div style={{ marginTop: '15px' }}>
                                <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>No. WA Penanggung Jawab / Darurat</label>
                                <input type="tel" value={sewaWaPJ} onChange={e=>setSewaWaPJ(e.target.value)} placeholder="Contoh: 087654321098" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                            <div>
                                <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Tanggal Mulai & Jam Antar</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="date" value={sewaMulai} onChange={e=>setSewaMulai(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                                    <input type="time" value={sewaMulaiTime} onChange={e=>setSewaMulaiTime(e.target.value)} required style={{ width: '110px', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Tanggal Selesai & Jam Kembali</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="date" value={sewaSelesai} onChange={e=>setSewaSelesai(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                                    <input type="time" value={sewaSelesaiTime} onChange={e=>setSewaSelesaiTime(e.target.value)} required style={{ width: '110px', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Rencana Wilayah / Kota Pemakaian Mobil</label>
                            <input type="text" value={sewaTujuan} onChange={e=>setSewaTujuan(e.target.value)} placeholder="Contoh: Dalam kota Jogja saja / Ke Solo" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }} />
                        </div>

                        <div style={{ marginTop: '15px' }}>
                            <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Alamat Lengkap Pengantaran (Hotel/Stasiun/Bandara)</label>
                            <textarea value={sewaPengantaranAlamat} onChange={e=>setSewaPengantaranAlamat(e.target.value)} rows={2} placeholder="Tulis alamat detail..." required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', resize: 'vertical' }} />
                        </div>

                        <div style={{ marginTop: '15px', marginBottom: '20px' }}>
                            <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Alamat Lengkap Pengembalian (Hotel/Stasiun/Bandara)</label>
                            <textarea value={sewaPengambilanAlamat} onChange={e=>setSewaPengambilanAlamat(e.target.value)} rows={2} placeholder="Tulis alamat detail..." required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', resize: 'vertical' }} />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: 800, display: 'block', marginBottom: '8px' }}>Catatan Tambahan (Opsional)</label>
                            <textarea value={sewaCatatan} onChange={e=>setSewaCatatan(e.target.value)} rows={2} placeholder="Misal: Rombongan kami 5 orang bawa koper." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', resize: 'vertical' }} />
                        </div>

                        {layanan === 'lepas-kunci' && (
                            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '8px', padding: '18px', marginBottom: '20px' }}>
                                <h4 style={{ color: '#b45309', fontWeight: 700, margin: '0 0 10px 0', fontSize: '0.95rem' }}>Persyaratan Dokumen Lepas Kunci (Wajib Foto):</h4>
                                <ul style={{ fontSize: '0.85rem', color: '#78350f', paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
                                    <li>Foto 2 KTP asli aktif penyewa & penanggung jawab</li>
                                    <li>Foto SIM A aktif pengemudi</li>
                                    <li>Foto tiket pesawat / kereta api pulang-pergi Jogja</li>
                                    <li>Foto voucher hotel / penginapan di Jogja</li>
                                    <li><strong>Khusus Domisili Jogja:</strong> Wajib menjaminkan Sepeda Motor dan STNK atas nama pribadi</li>
                                </ul>
                            </div>
                        )}

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={sewaSyaratCheck} onChange={e=>setSewaSyaratCheck(e.target.checked)} required style={{ marginTop: '4px', width: '20px', height: '20px' }} />
                                <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5, color: '#334155' }}>Saya menyetujui syarat & ketentuan sewa dan bersedia melengkapi data setelah dihubungi admin.</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: 800, border: 'none', cursor: 'pointer', borderRadius: '8px', backgroundColor: '#25d366', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Kirim Format Booking ke WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
