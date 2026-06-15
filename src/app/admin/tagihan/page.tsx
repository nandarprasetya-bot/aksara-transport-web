"use client";
import React, { useState, useEffect } from 'react';

export default function AdminTagihanPage() {
    const [nama, setNama] = useState('');
    const [noWa, setNoWa] = useState('');
    const [mobil, setMobil] = useState('');
    const [layanan, setLayanan] = useState('Lepas Kunci');
    const [durasi, setDurasi] = useState('1 Hari');
    
    const [hargaDeal, setHargaDeal] = useState<number>(0);
    const [biayaTambahan, setBiayaTambahan] = useState<number>(0);
    const [ketTambahan, setKetTambahan] = useState('');
    const [dpPercent, setDpPercent] = useState<number>(30);

    const [total, setTotal] = useState(0);
    const [dpAmount, setDpAmount] = useState(0);
    const [sisa, setSisa] = useState(0);

    useEffect(() => {
        const t = (hargaDeal || 0) + (biayaTambahan || 0);
        const dp = Math.round(t * (dpPercent / 100));
        setTotal(t);
        setDpAmount(dp);
        setSisa(t - dp);
    }, [hargaDeal, biayaTambahan, dpPercent]);

    const formatRupiah = (angka: number) => {
        if (!angka) return 'Rp 0';
        return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleKirimWA = (e: React.FormEvent) => {
        e.preventDefault();
        
        let text = `*INVOICE & TAGIHAN SEWA MOBIL*\nAksara Transport Yogyakarta\n\n`;
        text += `Halo Kak *${nama || 'Pelanggan'}*,\nTerima kasih telah mempercayakan perjalanan Anda kepada kami. Berikut adalah rincian tagihan sewa mobil Anda:\n\n`;
        
        text += `*Detail Pesanan:*\n`;
        text += `- Armada: ${mobil}\n`;
        text += `- Layanan: ${layanan}\n`;
        text += `- Durasi: ${durasi}\n\n`;

        text += `*Rincian Biaya:*\n`;
        text += `- Harga Sewa Kendaraan: ${formatRupiah(hargaDeal)}\n`;
        if (biayaTambahan > 0) {
            text += `- Biaya Tambahan (${ketTambahan || 'Lain-lain'}): ${formatRupiah(biayaTambahan)}\n`;
        }
        text += `-----------------------------------\n`;
        text += `*Total Biaya Keseluruhan:* ${formatRupiah(total)}\n\n`;

        text += `*Termin Pembayaran:*\n`;
        text += `- *Tanda Jadi / DP (${dpPercent}%): ${formatRupiah(dpAmount)}*\n`;
        text += `- *Sisa Pelunasan: ${formatRupiah(sisa)}* (Dibayarkan saat serah terima unit)\n\n`;

        text += `*Rekening Pembayaran:*\n`;
        text += `BCA: 1234567890\n`;
        text += `Mandiri: 0987654321\n`;
        text += `a.n Aksara Transport\n\n`;

        text += `Mohon lampirkan bukti transfer jika sudah melakukan pembayaran DP. Jadwal armada Anda akan segera kami amankan setelah DP diterima. Terima kasih! 🙏`;

        // If admin inputted a WA number, use it. Otherwise, open a general WA link where they select contact.
        let waLink = `https://wa.me/`;
        if (noWa) {
            // Remove non-numeric
            let cleanWa = noWa.replace(/\D/g, '');
            if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.substring(1);
            waLink += `${cleanWa}?text=${encodeURIComponent(text)}`;
        } else {
            waLink += `?text=${encodeURIComponent(text)}`;
        }

        window.open(waLink, '_blank');
    };

    return (
        <main style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', background: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexWrap: 'wrap' }}>
                    <a href="/admin" style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                        📋 Pesanan Rental
                    </a>
                    <a href="/admin/tagihan" style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
                        💰 Kalkulator Tagihan WA
                    </a>
                    <a href="/admin/artikel" style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                        📰 Manajemen Artikel
                    </a>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '30px' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '10px' }}>Kalkulator & Generator Tagihan</h1>
                    <p style={{ color: '#64748b', marginBottom: '30px' }}>Gunakan form ini untuk menghitung DP dan membuat pesan tagihan pembayaran otomatis untuk dikirim ke pelanggan via WhatsApp.</p>

                    <form onSubmit={handleKirimWA}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Nama Pelanggan</label>
                                <input type="text" value={nama} onChange={e=>setNama(e.target.value)} placeholder="Contoh: Budi Santoso" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Nomor WA (Opsional)</label>
                                <input type="text" value={noWa} onChange={e=>setNoWa(e.target.value)} placeholder="Contoh: 081234567890" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Armada Mobil</label>
                                <input type="text" value={mobil} onChange={e=>setMobil(e.target.value)} placeholder="Contoh: Brio" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Layanan</label>
                                <input type="text" value={layanan} onChange={e=>setLayanan(e.target.value)} placeholder="Lepas Kunci / Sopir" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Durasi Sewa</label>
                                <input type="text" value={durasi} onChange={e=>setDurasi(e.target.value)} placeholder="Contoh: 2 Hari" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>

                        <div style={{ padding: '20px', background: '#f1f5f9', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px', color: '#0f172a' }}>Rincian Biaya</h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Harga Deal Sewa (Rp)</label>
                                    <input type="number" value={hargaDeal || ''} onChange={e=>setHargaDeal(parseInt(e.target.value)||0)} placeholder="300000" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Biaya Tambahan Lainnya (Rp)</label>
                                    <input type="number" value={biayaTambahan || ''} onChange={e=>setBiayaTambahan(parseInt(e.target.value)||0)} placeholder="0" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Keterangan Biaya Tambahan</label>
                                    <input type="text" value={ketTambahan} onChange={e=>setKetTambahan(e.target.value)} placeholder="Contoh: Antar Bandara YIA" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Persentase DP (%)</label>
                                    <input type="number" value={dpPercent} onChange={e=>setDpPercent(parseInt(e.target.value)||0)} required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'var(--primary-light)', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem' }}>
                                <span>Total Tagihan:</span>
                                <strong>{formatRupiah(total)}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.2rem', color: '#10b981', fontWeight: 800 }}>
                                <span>Total DP ({dpPercent}%):</span>
                                <span>{formatRupiah(dpAmount)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '10px', color: '#cbd5e1' }}>
                                <span>Sisa Pelunasan:</span>
                                <span>{formatRupiah(sisa)}</span>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: 800, borderRadius: '8px', background: '#25d366', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Kirim Tagihan ke WhatsApp Pelanggan
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
