"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const weddingRates: Record<string, number> = {
    'Honda Brio Matic': 450000,
    'Avanza / Xenia Facelift': 550000,
    'Avanza / Xenia FWD': 650000,
    'Xpander': 700000,
    'Innova Reborn': 750000,
    'Innova Zenix': 1000000,
    'Fortuner': 1500000,
    'Pajero': 1500000,
    'Alphard Facelift': 2899000,
    'Alphard HEV': 3899999,
    'Hiace Commuter': 1100000,
    'Hiace Premio': 1400000,
    'Elf Long': 1500000
};

const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
};

function PesanWeddingInner() {
    const searchParams = useSearchParams();

    const [nama, setNama] = useState('');
    const [waUtama, setWaUtama] = useState('');
    const [waCadangan, setWaCadangan] = useState('');
    const [mobil, setMobil] = useState('Avanza / Xenia Facelift');
    const [tanggal, setTanggal] = useState('');
    const [jamMulai, setJamMulai] = useState('06:00');
    const [alamat, setAlamat] = useState('');
    const [lokasiAcara, setLokasiAcara] = useState('');
    const [catatan, setCatatan] = useState('');

    useEffect(() => {
        const mobilParam = searchParams.get('mobil');
        if (mobilParam) {
            const matched = Object.keys(weddingRates).find(m => m.toLowerCase().includes(mobilParam.toLowerCase()));
            if (matched) setMobil(matched);
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTanggal(tomorrow.toISOString().split('T')[0]);
    }, [searchParams]);

    // Kalkulasi Waktu Selesai (12 Jam)
    let endTanggal = '';
    let endJam = '';
    if (tanggal && jamMulai) {
        const [hours, minutes] = jamMulai.split(':').map(Number);
        const startDate = new Date(`${tanggal}T00:00:00`);
        let endHour = hours + 12;
        let dayOffset = 0;
        if (endHour >= 24) {
            endHour -= 24;
            dayOffset = 1;
        }
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + dayOffset);
        endTanggal = endDate.toISOString().split('T')[0];
        endJam = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    // Kalkulasi Biaya
    const rate = weddingRates[mobil] || 0;
    const total = rate;
    const dp = total * 0.3;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let text = `*FORM PEMESANAN - PAKET WEDDING*\nAksara Transport Yogyakarta\n\n`;
        text += `*Data Pemesan:*\n- Nama: ${nama}\n- WhatsApp 1: ${waUtama}\n- WhatsApp 2: ${waCadangan}\n\n`;
        text += `*Lokasi Acara:*\n- Gedung / Lokasi: ${lokasiAcara}\n\n`;
        text += `*Detail Pemesanan:*\n- Layanan: Paket Wedding\n- Mobil: ${mobil}\n- Tanggal Wedding: ${tanggal}\n- Jam Penjemputan: ${jamMulai} WIB\n- Rencana Selesai: ${endTanggal} (${endJam} WIB)\n- Lokasi Penjemputan: ${alamat}\n\n`;
        
        if (catatan) text += `*Catatan Khusus:*\n${catatan}\n\n`;

        text += `*Rincian Biaya:*\n- Tarif Unit: ${formatRupiah(total)}\n`;
        text += `---------------------------------\n`;
        text += `*TOTAL BIAYA:* ${formatRupiah(total)}\n*ESTIMASI DP (30%):* ${formatRupiah(dp)}\n\n`;
        text += `Mohon ketersediaan armada dikonfirmasi. Terima kasih!`;

        try {
            const { supabase } = await import('@/utils/supabase/client');
            const { data, error } = await supabase.from('bookings').insert([{
                nama: nama,
                wa_utama: waUtama,
                wa_cadangan: waCadangan,
                tipe_layanan: 'Paket Wedding',
                mobil: mobil,
                tgl_mulai: tanggal,
                jam_mulai: jamMulai,
                alamat_jemput: alamat,
                rute_destinasi: lokasiAcara,
                catatan: catatan,
                harga_mobil: total,
                total_biaya: total,
                dp_biaya: dp
            }]).select('id').single();

            if (error) throw error;

            text += `\n\nLihat Detail Pesanan Anda: ${window.location.origin}/detail-pesanan/${data.id}`;
            text += `\n\n====================\n[KHUSUS ADMIN AKSARA]\nKlik link di bawah ini untuk meng-ACC pesanan (LUNAS):\n${window.location.origin}/admin/acc?id=${data.id}`;
        } catch (err) {
            console.error('Supabase error:', err);
            const encodedData = btoa(unescape(encodeURIComponent(text)));
            text += `\n\nLihat Ringkasan Pesanan Anda: ${window.location.origin}/ringkasan-pesanan?data=${encodedData}`;
        }

        window.open(`https://wa.me/628386000740?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <main style={{ backgroundColor: '#f8fafc', paddingBottom: '80px' }}>
            <section style={{ padding: '120px 0 50px 0', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Form Pemesanan - Paket Wedding</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Lengkapi formulir di bawah ini untuk pemesanan rental mobil + driver khusus acara wedding Anda.</p>
                </div>
            </section>

            <section className="container" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    
                    {/* FORM */}
                    <div style={{ flex: '1 1 500px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Detail Pemesanan</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Nama Lengkap</label>
                                <input type="text" value={nama} onChange={e => setNama(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>WA Utama</label>
                                    <input type="tel" value={waUtama} onChange={e => setWaUtama(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>WA Cadangan</label>
                                    <input type="tel" value={waCadangan} onChange={e => setWaCadangan(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Pilihan Unit Mobil</label>
                                <select value={mobil} onChange={e => setMobil(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                    {Object.keys(weddingRates).map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tanggal Acara</label>
                                    <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Jam Penjemputan</label>
                                    <input type="time" value={jamMulai} onChange={e => setJamMulai(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Selesai (Otomatis 12 Jam)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" value={endTanggal} readOnly style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#f1f5f9', color: '#64748b' }} />
                                    <input type="text" value={endJam} readOnly style={{ width: '100px', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#f1f5f9', color: '#64748b' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Lokasi Penjemputan</label>
                                <textarea value={alamat} onChange={e => setAlamat(e.target.value)} rows={2} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Lokasi Acara / Gedung</label>
                                <input type="text" value={lokasiAcara} onChange={e => setLokasiAcara(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Catatan Khusus</label>
                                <textarea value={catatan} onChange={e => setCatatan(e.target.value)} rows={2} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '6px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                                Pesan via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* SIDEBAR KALKULATOR */}
                    <div style={{ flex: '1 1 350px', position: 'sticky', top: '100px' }}>
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '15px' }}>Paket Wedding</div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>Layanan rental mobil + driver khusus untuk acara wedding. Sudah termasuk Mobil, Driver, BBM (12 Jam), dan Menunggu.</p>
                            <p style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>* Tidak termasuk Dekorasi & Parkir</p>
                        </div>

                        <div style={{ background: 'var(--primary)', color: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '15px', marginBottom: '20px' }}>Rincian Biaya</h3>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.95rem' }}>
                                <span>Unit Mobil</span>
                                <span style={{ fontWeight: 700 }}>{mobil}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.95rem' }}>
                                <span>Durasi Pemakaian</span>
                                <span style={{ fontWeight: 700 }}>12 Jam</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '20px', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 800 }}>
                                <span>Total Biaya</span>
                                <span style={{ color: 'var(--accent)' }}>{formatRupiah(total)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px', fontSize: '1.05rem', fontWeight: 700 }}>
                                <span>DP (30%)</span>
                                <span style={{ color: '#10b981' }}>{formatRupiah(dp)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default function PesanWeddingPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <PesanWeddingInner />
        </Suspense>
    );
}
