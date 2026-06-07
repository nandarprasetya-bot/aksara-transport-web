import re

with open('src/app/kontak/page.tsx', 'w') as f:
    f.write(`"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const lepasKunciRates: Record<string, Record<string, number>> = {
    'Honda Brio Matic': { '12 Jam Weekday': 250000, '24 Jam Weekday': 350000, 'Fullday Weekend': 300000 },
    'Honda Jazz Matic': { '12 Jam Weekday': 325000, '24 Jam Weekday': 425000, 'Fullday Weekend': 375000 },
    'Toyota Raize': { '12 Jam Weekday': 325000, '24 Jam Weekday': 425000, 'Fullday Weekend': 375000 },
    'Toyota Avanza Facelift Matic': { '12 Jam Weekday': 250000, '24 Jam Weekday': 350000, 'Fullday Weekend': 300000 },
    'Toyota Avanza FWD Matic': { '12 Jam Weekday': 300000, '24 Jam Weekday': 375000, 'Fullday Weekend': 350000 },
    'Mitsubishi Xpander Matic': { '12 Jam Weekday': 325000, '24 Jam Weekday': 425000, 'Fullday Weekend': 375000 },
    'Toyota Innova Reborn Matic': { 'Fullday Weekend': 550000 },
    'Wuling Air EV': { 'Fullday (Weekday/Weekend)': 450000 },
    'Wuling Binguo EV': { 'Fullday (Weekday/Weekend)': 550000 }
};

function formatRupiah(num: number) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

function KontakInner() {
    const searchParams = useSearchParams();

    // Field States
    const [sewaMobil, setSewaMobil] = useState('Honda Brio Matic');
    const [sewaPaket, setSewaPaket] = useState('12 Jam Weekday');
    const [sewaNama, setSewaNama] = useState('');
    const [sewaTelepon, setSewaTelepon] = useState('');
    const [sewaWaPJ, setSewaWaPJ] = useState('');
    const [sewaMulai, setSewaMulai] = useState('');
    const [sewaMulaiTime, setSewaMulaiTime] = useState('08:00');
    const [sewaDurasi, setSewaDurasi] = useState(1);
    const [sewaSelesai, setSewaSelesai] = useState('');
    const [sewaSelesaiTime, setSewaSelesaiTime] = useState('08:00');
    const [sewaTujuan, setSewaTujuan] = useState('');
    const [sewaPengantaranAlamat, setSewaPengantaranAlamat] = useState('');
    const [chkAntarYIA, setChkAntarYIA] = useState(false);
    const [sewaPengambilanAlamat, setSewaPengambilanAlamat] = useState('');
    const [chkJemputYIA, setChkJemputYIA] = useState(false);
    const [sewaSyaratCheck, setSewaSyaratCheck] = useState(false);
    const [sewaBiayaTambahan, setSewaBiayaTambahan] = useState(0);
    const [sewaCatatan, setSewaCatatan] = useState('');

    useEffect(() => {
        const mobilParam = searchParams.get('mobil');
        const paketParam = searchParams.get('paket');
        if (mobilParam && lepasKunciRates[mobilParam]) {
            setSewaMobil(mobilParam);
            const pkgs = Object.keys(lepasKunciRates[mobilParam]);
            if (paketParam && pkgs.includes(paketParam)) {
                setSewaPaket(paketParam);
            } else if (pkgs.length > 0) {
                setSewaPaket(pkgs[0]);
            }
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = tomorrow.toISOString().split('T')[0];
        setSewaMulai(nextDay);
        
        const finishDay = new Date(tomorrow);
        finishDay.setDate(finishDay.getDate() + 1);
        setSewaSelesai(finishDay.toISOString().split('T')[0]);
    }, [searchParams]);

    // Auto calculate End Date & Time based on Paket (Only resets when Paket/Mulai changes)
    useEffect(() => {
        if (!sewaMulai || !sewaMulaiTime) return;
        
        const startDateTime = new Date(\`\${sewaMulai}T\${sewaMulaiTime}\`);
        if (isNaN(startDateTime.getTime())) return;

        if (sewaPaket.includes('12 Jam') || sewaPaket.includes('12-Jam')) {
            const endDateTime = new Date(startDateTime.getTime() + (12 * 60 * 60 * 1000));
            setSewaSelesai(endDateTime.toISOString().split('T')[0]);
            const hrs = String(endDateTime.getHours()).padStart(2, '0');
            const mins = String(endDateTime.getMinutes()).padStart(2, '0');
            setSewaSelesaiTime(\`\${hrs}:\${mins}\`);
        } else if (sewaPaket.includes('24 Jam') || sewaPaket.includes('24-Jam')) {
            const endDateTime = new Date(startDateTime.getTime() + (24 * 60 * 60 * 1000));
            setSewaSelesai(endDateTime.toISOString().split('T')[0]);
            setSewaSelesaiTime(sewaMulaiTime);
        } else if (sewaPaket.includes('Fullday')) {
            const endDateTime = new Date(startDateTime);
            setSewaSelesai(endDateTime.toISOString().split('T')[0]);
            setSewaSelesaiTime('22:30');
        }
    }, [sewaPaket, sewaMulai, sewaMulaiTime]);

    // Calculate duration based on Mulai and Selesai
    useEffect(() => {
        if (!sewaMulai || !sewaMulaiTime || !sewaSelesai || !sewaSelesaiTime) return;
        const startDateTime = new Date(\`\${sewaMulai}T\${sewaMulaiTime}\`);
        const endDateTime = new Date(\`\${sewaSelesai}T\${sewaSelesaiTime}\`);
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) return;
        
        let calculatedDurasi = 1;
        const diffTime = endDateTime.getTime() - startDateTime.getTime();
        
        if (diffTime > 0) {
            if (sewaPaket.includes('Fullday')) {
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                calculatedDurasi = Math.max(1, diffDays + 1);
            } else {
                const diffHours = diffTime / (1000 * 60 * 60);
                calculatedDurasi = Math.max(1, Math.ceil(diffHours / 24));
            }
        }
        setSewaDurasi(calculatedDurasi);
    }, [sewaMulai, sewaMulaiTime, sewaSelesai, sewaSelesaiTime, sewaPaket]);

    // Handle Mobil Change
    const handleMobilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const mobil = e.target.value;
        setSewaMobil(mobil);
        const pkgs = Object.keys(lepasKunciRates[mobil] || {});
        if (pkgs.length > 0) {
            setSewaPaket(pkgs[0]);
        }
    };

    const curRates = lepasKunciRates[sewaMobil] || {};
    const mobilPrice = curRates[sewaPaket] || 0;
    const biayaAntarJemput = (chkAntarYIA ? 150000 : 0) + (chkJemputYIA ? 150000 : 0) + sewaBiayaTambahan;
    const total = (mobilPrice * sewaDurasi) + biayaAntarJemput;
    const dp = total * 0.3;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!sewaSyaratCheck) {
            alert('Silakan centang persetujuan Syarat & Ketentuan terlebih dahulu.');
            return;
        }

        let text = \`*FORM PEMESANAN SEWA MOBIL LEPAS KUNCI*\\nAksara Transport Yogyakarta\\n\\n\`;
        text += \`*Data Penyewa:*\\n- Nama: \${sewaNama}\\n- WA Pemesan: \${sewaTelepon}\\n- WA Penanggung Jawab: \${sewaWaPJ}\\n\\n\`;
        text += \`*Detail Pesanan:*\\n- Armada: \${sewaMobil}\\n- Paket: \${sewaPaket}\\n- Durasi: \${sewaDurasi} Hari\\n- Tgl Mulai: \${sewaMulai} jam \${sewaMulaiTime}\\n- Tgl Selesai: \${sewaSelesai} jam \${sewaSelesaiTime}\\n- Rencana Tujuan: \${sewaTujuan}\\n\\n\`;
        text += \`*Lokasi Serah Terima:*\\n- Antar ke: \${sewaPengantaranAlamat} \${chkAntarYIA ? '(Bandara YIA)' : ''}\\n- Ambil di: \${sewaPengambilanAlamat} \${chkJemputYIA ? '(Bandara YIA)' : ''}\\n\\n\`;
        if (sewaCatatan) text += \`*Catatan:*\\n\${sewaCatatan}\\n\\n\`;
        text += \`*Estimasi Biaya:*\\n- Harga Mobil: \${formatRupiah(mobilPrice)}\\n- Biaya Antar/Jemput/Extra: \${formatRupiah(biayaAntarJemput)}\\n- Total: *\${formatRupiah(total)}*\\n- Estimasi DP (30%): *\${formatRupiah(dp)}*\\n\\n\`;
        text += \`Mohon konfirmasi ketersediaan unit dan kelengkapan dokumen persyaratan. Terima kasih.\`;

        window.open(\`https://wa.me/6281234567890?text=\${encodeURIComponent(text)}\`, '_blank');
    };

    return (
        <main>
            <section className="hero" style={{ padding: '120px 0 60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Form Booking Lepas Kunci</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Silakan lengkapi formulir sewa di bawah untuk pemesanan cepat. Admin kami akan segera merespons ketersediaan unit melalui WhatsApp.</p>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: '#f1f5f9' }}>
                <div className="container">
                    <div className="contact-layout">
                        <div className="contact-card" style={{ flex: 1, background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Formulir Pemesanan - Sewa Lepas Kunci</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <label style={{ fontWeight: 800 }}>Pilihan Armada Mobil</label>
                                    <select value={sewaMobil} onChange={handleMobilChange} required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', fontWeight: 600 }}>
                                        {Object.keys(lepasKunciRates).map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label style={{ fontWeight: 800 }}>Nama Lengkap</label>
                                        <input type="text" value={sewaNama} onChange={e=>setSewaNama(e.target.value)} placeholder="Contoh: Budi Santoso" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 800 }}>Nomor WhatsApp Aktif 1</label>
                                        <input type="tel" value={sewaTelepon} onChange={e=>setSewaTelepon(e.target.value)} placeholder="Contoh: 081234567890" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label style={{ fontWeight: 800 }}>Pilihan Paket Waktu</label>
                                        <select value={sewaPaket} onChange={e=>setSewaPaket(e.target.value)} required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', fontWeight: 600 }}>
                                            {Object.keys(curRates).map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 800 }}>No. WA Penanggung Jawab / Darurat</label>
                                        <input type="tel" value={sewaWaPJ} onChange={e=>setSewaWaPJ(e.target.value)} placeholder="Contoh: 087654321098" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label style={{ fontWeight: 800 }}>Tanggal Mulai & Jam Antar</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input type="date" value={sewaMulai} onChange={e=>setSewaMulai(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                            <input type="time" value={sewaMulaiTime} onChange={e=>setSewaMulaiTime(e.target.value)} required style={{ width: '110px', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 800 }}>Durasi Sewa (Dihitung Sistem)</label>
                                        <input type="number" min="1" value={sewaDurasi} readOnly style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }} />
                                    </div>
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label style={{ fontWeight: 800 }}>Tanggal Selesai & Jam Kembali (Bisa Diubah)</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input type="date" value={sewaSelesai} onChange={e=>setSewaSelesai(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                        <input type="time" value={sewaSelesaiTime} onChange={e=>setSewaSelesaiTime(e.target.value)} required style={{ width: '110px', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>*Waktu selesai diisi manual, durasi sewa otomatis menyesuaikan paket & waktu yang Anda pilih.</p>
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label style={{ fontWeight: 800 }}>Rencana Wilayah / Kota Pemakaian Mobil</label>
                                    <input type="text" value={sewaTujuan} onChange={e=>setSewaTujuan(e.target.value)} placeholder="Contoh: Dalam kota Jogja saja" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)' }} />
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <label style={{ fontWeight: 800 }}>Alamat Lengkap Pengantaran</label>
                                    <textarea value={sewaPengantaranAlamat} onChange={e=>setSewaPengantaranAlamat(e.target.value)} rows={2} placeholder="Hotel, Stasiun, atau Link Google Maps" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', resize: 'vertical' }} />
                                    <div style={{ marginTop: '8px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={chkAntarYIA} onChange={e=>setChkAntarYIA(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                                            Pengantaran di Bandara YIA (+Rp 150.000)
                                        </label>
                                    </div>
                                </div>

                                <div style={{ marginTop: '15px', marginBottom: '20px' }}>
                                    <label style={{ fontWeight: 800 }}>Alamat Lengkap Pengembalian</label>
                                    <textarea value={sewaPengambilanAlamat} onChange={e=>setSewaPengambilanAlamat(e.target.value)} rows={2} placeholder="Hotel, Stasiun, atau Link Google Maps" required style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', resize: 'vertical' }} />
                                    <div style={{ marginTop: '8px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={chkJemputYIA} onChange={e=>setChkJemputYIA(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                                            Pengembalian di Bandara YIA (+Rp 150.000)
                                        </label>
                                    </div>
                                </div>

                                {/* Syarat & Ketentuan Notice */}
                                <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '6px', padding: '18px', marginBottom: '20px' }}>
                                    <h4 style={{ color: '#b45309', fontWeight: 700, margin: '0 0 10px 0', fontSize: '0.95rem' }}>Persyaratan Dokumen Lepas Kunci (Wajib Foto):</h4>
                                    <ul style={{ fontSize: '0.85rem', color: '#78350f', paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
                                        <li>Foto 2 KTP asli aktif penyewa & penanggung jawab</li>
                                        <li>Foto SIM A aktif pengemudi</li>
                                        <li>Foto identitas pendukung (KK / KTM / ID Card Karyawan)</li>
                                        <li>Foto tiket pesawat / kereta api pulang-pergi Jogja</li>
                                        <li>Foto voucher hotel / penginapan di Jogja</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px', display: 'block' }}>Syarat & Ketentuan Sewa Lepas Kunci</label>
                                    <div style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', fontSize: '0.85rem', lineHeight: '1.6', color: '#334155' }}>
                                        <h4 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 8px 0' }}>TANGGUNG JAWAB PENYEWA</h4>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong>Kondisi Mobil</strong>: Penyewa wajib memeriksa dan memvideo kondisi mobil (fisik, interior, fungsi) sebelum serah terima. Jika terdapat kerusakan menjadi sepenuhnya tanggung jawab penyewa.</li>
                                            <li><strong>Perawatan Ringan</strong>: Penyewa wajib menjaga kebersihan dan melakukan perawatan ringan selama masa sewa (contoh: menjaga tekanan ban, tidak memaksakan mobil jika ada indikasi masalah).</li>
                                            <li><strong>Kerusakan & Kehilangan</strong>: Penyewa bertanggung jawab penuh atas segala kerusakan (kecuali kerusakan akibat pemakaian normal), kehilangan bagian mobil, atau kehilangan mobil selama masa sewa, baik akibat kelalaian penyewa maupun pihak ketiga. Biaya perbaikan atau penggantian akan ditanggung penyewa.</li>
                                            <li><strong>Pelanggaran Lalu Lintas</strong>: Segala denda atau sanksi akibat pelanggaran lalu lintas (tilang, parkir liar, dll.) selama masa sewa sepenuhnya menjadi tanggung jawab penyewa.</li>
                                        </ul>

                                        <h4 style={{ color: '#dc2626', fontWeight: 700, margin: '0 0 8px 0' }}>LARANGAN KERAS:</h4>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px', color: '#b91c1c' }}>
                                            <li><strong>DILARANG</strong> menggunakan mobil untuk kegiatan ilegal, balapan, membawa muatan melebihi kapasitas, atau menarik kendaraan lain.</li>
                                            <li><strong>DILARANG</strong> merokok di dalam mobil atau membawa hewan peliharaan.</li>
                                            <li><strong>DILARANG</strong> memindahtangankan sewa kepada pihak lain.</li>
                                            <li><strong>DILARANG</strong> membawa hasil laut atau benda berbau menyengat di dalam mobil untuk menjaga kenyamanan dan kebersihan.</li>
                                        </ul>

                                        <h4 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 8px 0' }}>PENGEMBALIAN KENDARAAN</h4>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong>Waktu Pengembalian</strong>: Mobil harus dikembalikan tepat waktu sesuai durasi sewa yang disepakati. Keterlambatan akan dikenakan biaya overtime.</li>
                                            <li><strong>Kondisi Pengembalian</strong>: Mobil harus dikembalikan dalam kondisi yang sama seperti saat serah terima (bahan bakar kembali semula sesuai awal serah terima, tidak ada kerusakan baru).</li>
                                            <li><strong>Pemeriksaan</strong>: Pihak kami akan melakukan pemeriksaan menyeluruh saat mobil dikembalikan.</li>
                                        </ul>

                                        <h4 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 8px 0' }}>PEMBATALAN</h4>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong>Pembatalan oleh Penyewa:</strong><br/>- Pembatalan kurang dari 24 jam sebelum waktu sewa dapat dikenakan biaya penuh.<br/>- Kebijakan pengembalian uang muka untuk pembatalan lebih awal akan diatur terpisah.</li>
                                            <li><strong>Perubahan Jadwal</strong>: Perubahan jadwal harus diinformasikan sesegera mungkin dan disesuaikan dengan ketersediaan.</li>
                                        </ul>

                                        <h4 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 8px 0' }}>CATATAN PENTING LAINNYA</h4>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong>Jaminan Dokumen Asli</strong>: Rental wajib membawa dokumen asli yang dijaminkan saat serah terima mobil.</li>
                                            <li><strong>Jaminan Sepeda Motor</strong>: Khusus penyewa berdomisili Yogyakarta & sekitarnya, wajib menjaminkan sepeda motor saat sewa.</li>
                                            <li><strong>Perhitungan Sewa</strong>: Untuk sewa pada akhir pekan dan hari libur, perhitungan sewa berdasarkan tanggal (per hari), bukan 24 jam.</li>
                                            <li><strong>Sewa Keluar Kota</strong>: Untuk sewa mobil keluar kota (misalnya Solo, Semarang, Dieng) akan dikenakan biaya tambahan. Mohon informasikan tujuan Anda saat pemesanan.</li>
                                            <li><strong>Pengantaran Bandara YIA</strong>: Akan dikenakan biaya tambahan Rp 150.000. Jika terjadi keterlambatan (delay) penerbangan hingga melebihi pukul 22.30 WIB, biaya kepulangan kru ditanggung oleh penyewa.</li>
                                        </ul>
                                        <p style={{ fontWeight: 700, textAlign: 'center', marginTop: '16px' }}>TERIMA KASIH atas kepercayaan Anda menggunakan layanan kami.</p>
                                    </div>
                                </div>

                                <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '6px', padding: '18px', marginBottom: '20px' }}>
                                    <h4 style={{ color: '#0369a1', fontWeight: 700, margin: '0 0 10px 0', fontSize: '0.95rem' }}>Notice Ketentuan Pembayaran:</h4>
                                    <ul style={{ fontSize: '0.85rem', color: '#075985', paddingLeft: '20px', margin: 0, lineHeight: 1.6 }}>
                                        <li>Pembayaran DP 30% dilakukan setelah pesanan di-acc oleh admin sebagai tanda jadi.</li>
                                        <li>Pelunasan pembayaran sewa dilakukan pada saat serah terima / penyerahan kunci kendaraan.</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={sewaSyaratCheck} onChange={e=>setSewaSyaratCheck(e.target.checked)} required style={{ marginTop: '4px', width: '20px', height: '20px' }} />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>Saya menyetujui syarat & ketentuan sewa lepas kunci di atas dan bersedia melengkapinya setelah dihubungi admin.</span>
                                    </label>
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ fontWeight: 800 }}>Biaya Tambahan Pengantaran / Luar Kota (Rp) - Diisi Admin jika ada</label>
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
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Biaya Antar & Jemput Unit</span>
                                            <strong>{formatRupiah(biayaAntarJemput)}</strong>
                                        </div>
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
                                    <label style={{ fontWeight: 800 }}>Catatan Tambahan (Opsional)</label>
                                    <textarea value={sewaCatatan} onChange={e=>setSewaCatatan(e.target.value)} rows={3} placeholder="Misal: Rombongan kami 5 orang." style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1.5px solid var(--border-color)', resize: 'vertical' }} />
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

export default function KontakPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <KontakInner />
        </Suspense>
    );
}
`)

