"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const denganSopirRates: Record<string, Record<string, number>> = {
    'Honda Brio': { '12-Jam': 450000, 'Fullday': 550000 },
    'Toyota Avanza Facelift': { '12-Jam': 550000, 'Fullday': 600000 },
    'Toyota Avanza FWD': { '12-Jam': 650000, 'Fullday': 750000 },
    'Mitsubishi Xpander': { '12-Jam': 700000, 'Fullday': 800000 },
    'Toyota Innova Reborn 2026': { '12-Jam': 750000, 'Fullday': 850000 },
    'Toyota Innova Zenix 2026': { '12-Jam': 1000000, 'Fullday': 1100000 },
    'Toyota Fortuner 2026': { '12-Jam': 1500000, 'Fullday': 1600000 },
    'Mitsubishi Pajero 2026': { '12-Jam': 1500000, 'Fullday': 1600000 },
    'Toyota Alphard Facelift 2023': { '12-Jam': 2899000, 'Fullday': 2999999 },
    'Toyota Alphard HEV 2026': { '12-Jam': 3899999, 'Fullday': 3999999 },
    'Toyota Hiace Commuter': { '12-Jam': 1100000, 'Fullday': 1200000 },
    'Toyota Hiace Premio': { '12-Jam': 1400000, 'Fullday': 1500000 },
    'Elf Long 19 Seat': { '12-Jam': 1500000, 'Fullday': 1600000 }
};

function formatRupiah(num: number) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

function PesanSopirInner() {
    const searchParams = useSearchParams();

    // Field States
    const [sewaMobil, setSewaMobil] = useState('Honda Brio');
    const [sewaPaket, setSewaPaket] = useState('12-Jam');
    const [sewaNama, setSewaNama] = useState('');
    const [sewaTelepon, setSewaTelepon] = useState('');
    const [sewaTeleponAlt, setSewaTeleponAlt] = useState('');
    const [sewaMulai, setSewaMulai] = useState('');
    const [sewaMulaiTime, setSewaMulaiTime] = useState('08:00');
    const [sewaDurasi, setSewaDurasi] = useState(1);
    const [sewaTujuan, setSewaTujuan] = useState('');
    const [sewaPengantaranAlamat, setSewaPengantaranAlamat] = useState('');
    const [chkAntarYIA, setChkAntarYIA] = useState(false);
    const [sewaBiayaTambahan, setSewaBiayaTambahan] = useState(0);
    const [sewaCatatan, setSewaCatatan] = useState('');

    const [isLuarKota, setIsLuarKota] = useState(false);
    const [luarKotaAlert, setLuarKotaAlert] = useState(false);

    // Calculated End Date/Time
    const [sewaSelesai, setSewaSelesai] = useState('');
    const [sewaSelesaiTime, setSewaSelesaiTime] = useState('');

    useEffect(() => {
        const mobilParam = searchParams.get('mobil');
        const paketParam = searchParams.get('paket');
        let finalMobil = sewaMobil;

        if (mobilParam && denganSopirRates[mobilParam]) {
            setSewaMobil(mobilParam);
            finalMobil = mobilParam;
        } else if (mobilParam) {
            // Find closest match
            const matched = Object.keys(denganSopirRates).find(k => k.toLowerCase().includes(mobilParam.toLowerCase()));
            if (matched) {
                setSewaMobil(matched);
                finalMobil = matched;
            }
        }

        if (paketParam && finalMobil && denganSopirRates[finalMobil] && denganSopirRates[finalMobil][paketParam]) {
            setSewaPaket(paketParam);
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = tomorrow.toISOString().split('T')[0];
        setSewaMulai(nextDay);
    }, [searchParams]);

    // Handle out-of-town checking
    useEffect(() => {
        const luarKotaRegex = /semarang|solo|klaten|magelang|dieng|wonosobo|purworejo|kebumen|purwokerto|salatiga|boyolali|karanganyar|sragen|ngawi|madiun|pacitan|cilacap|tegal|pekalongan/i;
        if (luarKotaRegex.test(sewaTujuan)) {
            if (!isLuarKota) {
                setIsLuarKota(true);
                setSewaPaket('Fullday'); // Force Fullday
                setLuarKotaAlert(true);
                setTimeout(() => setLuarKotaAlert(false), 5000);
            }
        } else {
            setIsLuarKota(false);
        }
    }, [sewaTujuan, isLuarKota]);

    // Calculate End Date/Time
    useEffect(() => {
        if (!sewaMulai || !sewaMulaiTime || sewaDurasi < 1) return;
        
        const startDateTime = new Date(`${sewaMulai}T${sewaMulaiTime}`);
        if (isNaN(startDateTime.getTime())) return;

        if (sewaPaket === '12-Jam') {
            const endDateTime = new Date(startDateTime.getTime() + (12 * 60 * 60 * 1000));
            // Multi-day 12-Jam => The last day adds (duration - 1) days
            endDateTime.setDate(endDateTime.getDate() + (sewaDurasi - 1));
            
            setSewaSelesai(endDateTime.toISOString().split('T')[0]);
            const hrs = String(endDateTime.getHours()).padStart(2, '0');
            const mins = String(endDateTime.getMinutes()).padStart(2, '0');
            setSewaSelesaiTime(`${hrs}:${mins}`);
        } else {
            // Fullday finishes at 22:30 on the last day
            const endDateTime = new Date(startDateTime);
            endDateTime.setDate(endDateTime.getDate() + (sewaDurasi - 1));
            setSewaSelesai(endDateTime.toISOString().split('T')[0]);
            setSewaSelesaiTime('22:30');
        }
    }, [sewaMulai, sewaMulaiTime, sewaDurasi, sewaPaket]);


    const handleMobilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSewaMobil(e.target.value);
    };

    const curRates = denganSopirRates[sewaMobil] || {};
    const mobilPrice = curRates[sewaPaket] || 0;
    const biayaAntarJemput = (chkAntarYIA ? 150000 : 0) + sewaBiayaTambahan;
    const total = (mobilPrice * sewaDurasi) + biayaAntarJemput;
    const dp = total * 0.3;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let text = `*FORM PEMESANAN SEWA MOBIL DENGAN SOPIR*\nAksara Transport Yogyakarta\n\n`;
        text += `*Data Pelanggan:*\n- Nama: ${sewaNama}\n- WA Pemesan: ${sewaTelepon}\n- WA Cadangan: ${sewaTeleponAlt || '-'}\n\n`;
        text += `*Detail Pesanan:*\n- Armada: ${sewaMobil}\n- Paket: ${sewaPaket}\n- Durasi: ${sewaDurasi} Hari\n- Tgl Mulai: ${sewaMulai} jam ${sewaMulaiTime}\n- Tgl Selesai: ${sewaSelesai} jam ${sewaSelesaiTime}\n- Tujuan: ${sewaTujuan}\n\n`;
        text += `*Lokasi Penjemputan:*\n- Alamat: ${sewaPengantaranAlamat} ${chkAntarYIA ? '(Bandara YIA)' : ''}\n\n`;
        if (sewaCatatan) text += `*Catatan:*\n${sewaCatatan}\n\n`;
        text += `*Estimasi Biaya:*\n- Harga Mobil: ${formatRupiah(mobilPrice)}\n- Biaya Jemput/Extra: ${formatRupiah(biayaAntarJemput)}\n- Total: *${formatRupiah(total)}*\n- Estimasi DP (30%): *${formatRupiah(dp)}*\n\n`;
        text += `Mohon konfirmasi ketersediaan unit dan admin akan memandu proses selanjutnya. Terima kasih.`;

        try {
            const { supabase } = await import('@/utils/supabase/client');
            const { data, error } = await supabase.from('bookings').insert([{
                nama: sewaNama,
                wa_utama: sewaTelepon,
                wa_cadangan: sewaTeleponAlt,
                tipe_layanan: 'Dengan Sopir',
                mobil: sewaMobil,
                paket: sewaPaket,
                tgl_mulai: sewaMulai,
                jam_mulai: sewaMulaiTime,
                tgl_selesai: sewaSelesai,
                durasi_hari: sewaDurasi,
                alamat_jemput: sewaPengantaranAlamat + (chkAntarYIA ? ' (Bandara YIA)' : ''),
                rute_destinasi: sewaTujuan,
                catatan: sewaCatatan,
                harga_mobil: mobilPrice * sewaDurasi,
                biaya_ekstra: biayaAntarJemput,
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
        <main>
            <section className="hero" style={{ padding: '120px 0 60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Form Booking Dengan Sopir</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Lengkapi formulir pemesanan mobil beserta layanan sopir berpengalaman. Duduk manis dan nikmati perjalanan Anda.</p>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: '#f1f5f9' }}>
                <div className="container">
                    <div className="contact-layout">
                        <div className="contact-card" style={{ flex: 1, background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Formulir Pemesanan - Dengan Sopir</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <label>Pilihan Armada Mobil</label>
                                    <select value={sewaMobil} onChange={handleMobilChange} required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', fontWeight: 600 }}>
                                        {Object.keys(denganSopirRates).map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label>Nama Lengkap</label>
                                        <input type="text" value={sewaNama} onChange={e=>setSewaNama(e.target.value)} placeholder="Contoh: Budi Santoso" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                    <div>
                                        <label>Nomor WhatsApp Aktif 1</label>
                                        <input type="tel" value={sewaTelepon} onChange={e=>setSewaTelepon(e.target.value)} placeholder="Contoh: 081234567890" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label>Pilihan Paket Waktu</label>
                                        <select value={sewaPaket} onChange={e=>setSewaPaket(e.target.value)} required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', fontWeight: 600 }}>
                                            {!isLuarKota && <option value="12-Jam">12-Jam (Area Dalam Kota)</option>}
                                            <option value="Fullday">Fullday (Area Dalam Kota / Luar Kota)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Nomor WhatsApp Aktif 2 (Cadangan)</label>
                                        <input type="tel" value={sewaTeleponAlt} onChange={e=>setSewaTeleponAlt(e.target.value)} placeholder="Contoh: 089876543210" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label>Tanggal Mulai & Jam Jemput</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input type="date" value={sewaMulai} onChange={e=>setSewaMulai(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                            <input type="time" value={sewaMulaiTime} onChange={e=>setSewaMulaiTime(e.target.value)} required style={{ width: '110px', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Durasi Sewa (Hari)</label>
                                        <input type="number" min="1" value={sewaDurasi} onChange={e=>setSewaDurasi(parseInt(e.target.value))} required style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label>Tanggal Selesai & Jam Selesai (Otomatis)</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input type="date" value={sewaSelesai} disabled style={{ flex: 1, padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', backgroundColor: '#f8fafc', color: '#64748b' }} />
                                        <input type="time" value={sewaSelesaiTime} disabled style={{ width: '110px', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', backgroundColor: '#f8fafc', color: '#64748b' }} />
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>*Waktu selesai dihitung otomatis berdasarkan durasi paket. Jika melebihi batas waktu akan dikenakan biaya overtime.</p>
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label>Rencana Tujuan Perjalanan</label>
                                    <input type="text" value={sewaTujuan} onChange={e=>setSewaTujuan(e.target.value)} placeholder="Contoh: Borobudur, Malioboro, atau luar kota seperti Semarang" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    {luarKotaAlert && <div style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: '4px', fontWeight: 600 }}>Tujuan terdeteksi Luar Kota, paket otomatis diubah ke Fullday.</div>}
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label>Alamat Lengkap Penjemputan</label>
                                    <textarea value={sewaPengantaranAlamat} onChange={e=>setSewaPengantaranAlamat(e.target.value)} rows={2} placeholder="Hotel, Stasiun, Rumah, atau Link Google Maps" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', resize: 'vertical' }} />
                                    <div style={{ marginTop: '8px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={chkAntarYIA} onChange={e=>setChkAntarYIA(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                                            Penjemputan di Bandara YIA (+Rp 150.000)
                                        </label>
                                    </div>
                                </div>

                                <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '6px', padding: '18px', marginBottom: '20px', marginTop: '20px' }}>
                                    <h4 style={{ color: '#0369a1', fontWeight: 700, margin: '0 0 10px 0', fontSize: '0.95rem' }}>Notice Ketentuan Pembayaran:</h4>
                                    <ul style={{ fontSize: '0.85rem', color: '#075985', paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
                                        <li>Pembayaran DP 30% dilakukan setelah pesanan di-acc oleh admin sebagai tanda jadi.</li>
                                        <li>Pelunasan pembayaran sewa dilakukan setelah pelayanan hari terakhir selesai atau melalui invoice resmi.</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label>Biaya Tambahan Pengantaran / Luar Kota (Rp) - Diisi Admin jika ada</label>
                                    <input type="number" value={sewaBiayaTambahan || ''} onChange={e=>setSewaBiayaTambahan(parseInt(e.target.value)||0)} placeholder="0" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                </div>

                                {/* Price Panel */}
                                <div style={{ background: 'var(--primary-light)', color: '#fff', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Kalkulator Biaya</span>
                                        <span style={{ fontSize: '0.75rem', background: 'var(--accent)', padding: '4px 10px', borderRadius: '50px' }}>Perhitungan</span>
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Unit Armada ({sewaMobil})</span>
                                            <strong>{formatRupiah(mobilPrice)}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Durasi Pemakaian</span>
                                            <strong>{sewaDurasi} Hari</strong>
                                        </div>
                                        {biayaAntarJemput > 0 && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Biaya Jemput & Extra</span>
                                                <strong>{formatRupiah(biayaAntarJemput)}</strong>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: '12px', fontSize: '1.15rem' }}>
                                            <strong>Total Biaya Sewa</strong>
                                            <strong style={{ color: 'var(--accent)' }}>{formatRupiah(total)}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px', fontSize: '1.15rem' }}>
                                            <span>Tanda Jadi / DP (30%)</span>
                                            <strong style={{ color: '#10b981' }}>{formatRupiah(dp)}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label>Catatan Tambahan (Opsional)</label>
                                    <textarea value={sewaCatatan} onChange={e=>setSewaCatatan(e.target.value)} rows={3} placeholder="Misal: Penjemputan di Stasiun Tugu pintu timur jam 9 pagi." style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', resize: 'vertical' }} />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', borderRadius: '6px' }}>
                                    Proses Pemesanan via WhatsApp
                                </button>
                            </form>
                        </div>
                        <div className="contact-info-wrapper" style={{ flex: '0 0 350px' }}>
                            <div className="info-box" style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Hubungi Kami</h3>
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Telepon / WhatsApp</h4>
                                    <p style={{ fontWeight: 800 }}>+62 812-3456-7890</p>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Kantor Pusat</h4>
                                    <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>Jl. Raya Utama No. 45, Kebayoran Baru, Jakarta Selatan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function PesanSopirPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <PesanSopirInner />
        </Suspense>
    );
}
