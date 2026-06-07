"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const carRatesPerDay: Record<string, number> = {
    'Avanza / Xenia Facelift': 550000,
    'Avanza / Xenia FWD': 600000,
    'Innova Reborn': 750000,
    'Innova Zenix': 850000,
    'Xpander': 700000,
    'Hiace Commuter': 1100000,
    'Hiace Premio': 1400000,
    'Elf Long 19 Seat': 1500000
};

const packageDestinations: Record<string, string> = {
    'Paket A': 'Candi Borobudur, VW Tour, Candi Prambanan',
    'Paket B': 'Candi Prambanan, Lava Tour Merapi, Candi Plaosan',
    'Paket C': 'Lava Tour Merapi, Gumuk Pasir, Pantai Parangtritis',
    'Paket D': 'Candi Prambanan, Hutan Pinus Mangunan, Obelix Sea View',
    'Paket E': 'Kraton Jogja, Tamansari, Gembira Loka Zoo, Malioboro',
    'Paket F': 'On The Rock, Gesing Wonderland, Puncak Segoro, Obelix Sea View',
    'Paket G': 'Pantai Ngobaran, Gesing Wonderland, Puncak Segoro, Obelix Sea View',
    'Paket H': 'On The Rock, Pantai Sadranan, Pantai Slili, Obelix Sea View',
    'Paket I': 'Pantai Timang, Goa Pindul, Pictniq Land',
    'Paket J': 'Tumpeng Menoreh, Vw Safari Tour, Candi Borobudur, Gereja Ayam',
    'Paket K': 'Kebun Buah Mangunan, Hutan Pinus, Goa Pindul, Pictniq Land',
    'Paket Dieng': 'Puncak Sikunir, Kawah Sikidang, Candi Arjuna, Gardu Pandang Tieng'
};

const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
};

const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '-';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${parseInt(parts[2], 10)} ${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
};

function PesanMultidayInner() {
    const searchParams = useSearchParams();

    const [nama, setNama] = useState('');
    const [wa1, setWa1] = useState('');
    const [wa2, setWa2] = useState('');
    const [paket, setPaket] = useState('2 Day Service');
    const [mobil, setMobil] = useState('Avanza / Xenia Facelift');
    const [tglMulai, setTglMulai] = useState('');
    const [jamMulai, setJamMulai] = useState('08:00');
    const [tglSelesai, setTglSelesai] = useState('');
    const [jamSelesai, setJamSelesai] = useState('20:00');
    const [alamatJemput, setAlamatJemput] = useState('');
    const [ruteDestinasi, setRuteDestinasi] = useState('');
    const [layananTambahan, setLayananTambahan] = useState('');
    const [catatan, setCatatan] = useState('');

    useEffect(() => {
        const daysParam = searchParams.get('days');
        const mobilParam = searchParams.get('mobil');
        const paketParam = searchParams.get('paket');

        if (daysParam) {
            setPaket(`${daysParam} Day Service`);
        }

        if (mobilParam) {
            const matched = Object.keys(carRatesPerDay).find(m => m.toLowerCase().includes(mobilParam.toLowerCase()));
            if (matched) setMobil(matched);
        }

        if (paketParam) {
            const packageNames = paketParam.split(' | ');
            const ruteText = packageNames.map(p => {
                const dest = packageDestinations[p] ? ` (${packageDestinations[p]})` : '';
                return `- ${p}${dest}`;
            }).join('\n');
            setRuteDestinasi(`Paket Wisata Terpilih:\n${ruteText}`);
        }

        // Set tomorrow default
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        setTglMulai(`${yyyy}-${mm}-${dd}`);
    }, [searchParams]);

    // Handle end date calculation
    useEffect(() => {
        if (!tglMulai || !jamMulai) return;

        const days = parseInt(paket.replace(/\D/g, '')) || 2;
        
        const startDate = new Date(tglMulai + 'T00:00:00');
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days - 1);

        let endH = parseInt(jamMulai.split(':')[0]) + 12;
        const endM = jamMulai.split(':')[1];
        
        if (endH >= 24) {
            endH -= 24;
            endDate.setDate(endDate.getDate() + 1);
        }

        const endYyyy = endDate.getFullYear();
        const endMm = String(endDate.getMonth() + 1).padStart(2, '0');
        const endDd = String(endDate.getDate()).padStart(2, '0');
        
        setTglSelesai(`${endYyyy}-${endMm}-${endDd}`);
        setJamSelesai(`${String(endH).padStart(2, '0')}:${endM}`);
    }, [tglMulai, jamMulai, paket]);

    const durasi = parseInt(paket.replace(/\D/g, '')) || 2;
    const rate = carRatesPerDay[mobil] || 550000;
    const total = rate * durasi;
    const dp = total * 0.3;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let text = `*FORM PEMESANAN - PAKET MULTI-DAY*\nAksara Transport Yogyakarta\n\n`;
        text += `*Data Pelanggan:*\n- Nama: ${nama}\n- WA 1: ${wa1}\n- WA 2: ${wa2 || '-'}\n\n`;
        text += `*Detail Pemesanan:*\n- Paket: ${paket}\n- Mobil: ${mobil}\n- Penjemputan: ${tglMulai} ${jamMulai} WIB\n- Selesai: ${tglSelesai} ${jamSelesai} WIB\n- Lokasi Jemput: ${alamatJemput}\n\n`;
        
        if (ruteDestinasi) text += `*Rute & Destinasi:*\n${ruteDestinasi}\n\n`;
        if (layananTambahan) text += `*Layanan Tambahan:*\n${layananTambahan}\n\n`;
        if (catatan) text += `*Catatan:*\n${catatan}\n\n`;

        text += `*Rincian Biaya:*\n- Tarif Per Hari: ${formatRupiah(rate)}\n- Total (${durasi} Hari): ${formatRupiah(total)}\n`;
        text += `---------------------------------\n`;
        text += `*TOTAL BIAYA:* ${formatRupiah(total)}\n*ESTIMASI DP (30%):* ${formatRupiah(dp)}\n\n`;
        text += `Mohon ketersediaan armada dikonfirmasi. Terima kasih!`;

        try {
            const { supabase } = await import('@/utils/supabase/client');
            const { data, error } = await supabase.from('bookings').insert([{
                nama: nama,
                wa_utama: wa1,
                wa_cadangan: wa2,
                tipe_layanan: 'Multi-Day Tour',
                mobil: mobil,
                paket: paket,
                tgl_mulai: tglMulai,
                jam_mulai: jamMulai,
                tgl_selesai: tglSelesai,
                durasi_hari: durasi,
                alamat_jemput: alamatJemput,
                rute_destinasi: ruteDestinasi,
                catatan: catatan + (layananTambahan ? `\n\nLayanan Tambahan:\n${layananTambahan}` : ''),
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
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Form Pemesanan - Paket Multi-Hari</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Lengkapi formulir di bawah ini untuk pemesanan paket multi-hari dengan driver + BBM. Rincian biaya akan dihitung secara otomatis.</p>
                </div>
            </section>

            <section className="container" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    
                    {/* FORM */}
                    <div style={{ flex: '1 1 500px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Detail Pemesanan Paket Multi-Hari</h2>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Nama Lengkap</label>
                                <input type="text" value={nama} onChange={e => setNama(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>WhatsApp 1 (Utama)</label>
                                    <input type="tel" value={wa1} onChange={e => setWa1(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>WhatsApp 2 (Cadangan)</label>
                                    <input type="tel" value={wa2} onChange={e => setWa2(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Pilihan Paket</label>
                                    <select value={paket} onChange={e => setPaket(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }}>
                                        {[2, 3, 4, 5, 6, 7].map(d => (
                                            <option key={d} value={`${d} Day Service`}>{d} Day Service</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Pilihan Unit Mobil</label>
                                    <select value={mobil} onChange={e => setMobil(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }}>
                                        {Object.keys(carRatesPerDay).map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tanggal Mulai Penjemputan</label>
                                    <input type="date" value={tglMulai} onChange={e => setTglMulai(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Jam Penjemputan</label>
                                    <input type="time" value={jamMulai} onChange={e => setJamMulai(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div style={{ marginTop: '5px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tanggal &amp; Jam Selesai (Otomatis)</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="date" value={tglSelesai} readOnly style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }} />
                                    <input type="time" value={jamSelesai} readOnly style={{ width: '110px', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Alamat Lengkap Lokasi Penjemputan</label>
                                <textarea value={alamatJemput} onChange={e => setAlamatJemput(e.target.value)} required rows={2} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Rute / Destinasi yang Diinginkan (Opsional)</label>
                                <textarea value={ruteDestinasi} onChange={e => setRuteDestinasi(e.target.value)} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Layanan Tambahan (Opsional)</label>
                                <textarea 
                                    value={layananTambahan} 
                                    onChange={e => setLayananTambahan(e.target.value)} 
                                    placeholder="Mau sekalian layanan tambahan kami? VW, Jeep Merapi, Goa Pindul, Timang bisa pesan lewat kita"
                                    rows={2} 
                                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} 
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Catatan Tambahan (Opsional)</label>
                                <textarea value={catatan} onChange={e => setCatatan(e.target.value)} rows={2} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '6px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                                Proses Pemesanan via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* SIDEBAR */}
                    <div style={{ flex: '1 1 350px', position: 'sticky', top: '100px' }}>
                        
                        {/* Package Info Card */}
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>Detail Paket Multi-Hari</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>Paket Dipilih</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{paket}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>Unit Mobil</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{mobil}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>Durasi</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{durasi} Hari</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>Tgl Mulai</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatDateDisplay(tglMulai)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b', fontWeight: 600 }}>Tgl Selesai</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatDateDisplay(tglSelesai)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Kalkulator Biaya */}
                        <div style={{ background: 'var(--primary)', color: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '12px', marginBottom: '16px' }}>Kalkulator Rincian Biaya</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Unit Mobil ({mobil})</span>
                                    <strong style={{ textAlign: 'right' }}>{formatRupiah(rate)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Tarif per Hari</span>
                                    <strong>{formatRupiah(rate)} / Hari</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Durasi Pemakaian</span>
                                    <strong>{durasi} Hari</strong>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: '12px', fontSize: '1.15rem', color: '#ffffff', fontWeight: 800 }}>
                                    <span>Total Biaya</span>
                                    <span style={{ color: 'var(--accent)' }}>{formatRupiah(total)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px', fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
                                    <span>Tanda Jadi / DP (30%)</span>
                                    <span style={{ color: '#10b981' }}>{formatRupiah(dp)}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}

export default function PesanMultidayPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <PesanMultidayInner />
        </Suspense>
    );
}
