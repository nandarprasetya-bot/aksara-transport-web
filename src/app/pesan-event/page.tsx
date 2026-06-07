"use client";

import React, { useState, Suspense } from 'react';

type VehicleItem = {
    id: number;
    type: string;
    qty: number;
};

const vehicleOptions = [
    'Avanza / Xenia', 'Innova Reborn', 'Innova Zenix', 'Xpander', 'Fortuner', 'Pajero', 'Alphard', 'Hiace Commuter', 'Hiace Premio', 'Elf Long 19 Seat', 'Medium Bus', 'Big Bus'
];

function PesanEventInner() {
    const [nama, setNama] = useState('');
    const [waUtama, setWaUtama] = useState('');
    const [waCadangan, setWaCadangan] = useState('');
    const [instansi, setInstansi] = useState('');
    const [jenisAcara, setJenisAcara] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [durasi, setDurasi] = useState(1);
    const [rute, setRute] = useState('');
    
    const [vehicles, setVehicles] = useState<VehicleItem[]>([{ id: Date.now(), type: '', qty: 1 }]);

    const addVehicle = () => {
        setVehicles([...vehicles, { id: Date.now(), type: '', qty: 1 }]);
    };

    const removeVehicle = (id: number) => {
        if (vehicles.length > 1) {
            setVehicles(vehicles.filter(v => v.id !== id));
        }
    };

    const updateVehicle = (id: number, field: keyof VehicleItem, value: any) => {
        setVehicles(vehicles.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const invalidVehicles = vehicles.filter(v => !v.type || v.qty <= 0);
        if (invalidVehicles.length > 0) {
            alert('Mohon lengkapi tipe mobil dan jumlah unit untuk semua baris kendaraan.');
            return;
        }

        const vehicleList = vehicles.map(v => `- ${v.qty} Unit ${v.type}`).join('\n');

        let text = `*FORM PEMESANAN - PAKET KERJASAMA EVENT / KORPORAT*\nAksara Transport Yogyakarta\n\n`;
        text += `*Data PIC / Penanggung Jawab:*\n- Nama PIC: ${nama}\n- WhatsApp Utama: ${waUtama}\n- WhatsApp Cadangan: ${waCadangan}\n- Instansi: ${instansi}\n\n`;
        text += `*Detail Acara:*\n- Jenis Acara: ${jenisAcara}\n- Tanggal Acara: ${tanggal}\n- Durasi: ${durasi} Hari\n\n`;
        text += `*Kebutuhan Kendaraan:*\n${vehicleList}\n\n`;
        text += `*Rute / Tujuan Perjalanan:*\n${rute}\n\n`;
        text += `---------------------------------\n*HARGA: Menunggu Penawaran Khusus*\n*DP: Sesuai Kesepakatan*\n\n`;
        text += `Mohon penawaran harga untuk kebutuhan di atas. Terima kasih!`;

        try {
            const { supabase } = await import('@/utils/supabase/client');
            const { data, error } = await supabase.from('bookings').insert([{
                nama: nama,
                wa_utama: waUtama,
                wa_cadangan: waCadangan,
                tipe_layanan: `Event Korporat (${instansi} - ${jenisAcara})`,
                mobil: vehicleList,
                tgl_mulai: tanggal,
                durasi_hari: durasi,
                rute_destinasi: rute,
                harga_mobil: 0,
                total_biaya: 0,
                dp_biaya: 0
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
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Form Pemesanan - Paket Event & Korporat</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Lengkapi formulir di bawah ini untuk pemesanan armada &gt;1 unit. Detail acara Anda akan dikirim ke admin untuk penawaran harga terbaik.</p>
                </div>
            </section>

            <section className="container" style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    
                    {/* FORM */}
                    <div style={{ flex: '1 1 500px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Detail Acara & Kendaraan</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Nama PIC</label>
                                    <input type="text" value={nama} onChange={e => setNama(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Instansi</label>
                                    <input type="text" value={instansi} onChange={e => setInstansi(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
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

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Jenis Acara</label>
                                    <select value={jenisAcara} onChange={e => setJenisAcara(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                        <option value="" disabled>-- Pilih Jenis --</option>
                                        <option value="Dinas Pemerintah">Dinas Pemerintah</option>
                                        <option value="Event Perusahaan">Event Perusahaan</option>
                                        <option value="Wisata Rombongan">Wisata Rombongan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tanggal Acara</label>
                                    <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Durasi Acara (Hari)</label>
                                <input type="number" min="1" value={durasi} onChange={e => setDurasi(parseInt(e.target.value))} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Kebutuhan Armada</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {vehicles.map((v, index) => (
                                        <div key={v.id} style={{ display: 'flex', gap: '10px' }}>
                                            <select value={v.type} onChange={e => updateVehicle(v.id, 'type', e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                                <option value="" disabled>-- Pilih Mobil --</option>
                                                {vehicleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                            <input type="number" min="1" value={v.qty} onChange={e => updateVehicle(v.id, 'qty', parseInt(e.target.value))} required style={{ width: '80px', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                            <button type="button" onClick={() => removeVehicle(v.id)} disabled={vehicles.length === 1} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '0 15px', cursor: vehicles.length === 1 ? 'not-allowed' : 'pointer', opacity: vehicles.length === 1 ? 0.5 : 1 }}>X</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addVehicle} style={{ background: '#f1f5f9', color: '#475569', border: '1px dashed #cbd5e1', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>+ Tambah Kendaraan Lain</button>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Rute / Tujuan</label>
                                <textarea value={rute} onChange={e => setRute(e.target.value)} rows={3} required placeholder="Detail rute..." style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '6px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                                Minta Penawaran Harga
                            </button>
                        </form>
                    </div>

                    {/* SIDEBAR */}
                    <div style={{ flex: '1 1 350px', position: 'sticky', top: '100px' }}>
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '15px' }}>Event & Korporat</div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>Layanan sewa armada &gt;1 unit untuk kebutuhan dinas, event perusahaan, wisata rombongan, dan acara besar lainnya.</p>

                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <li>✓ Harga kompetitif untuk volume besar</li>
                                <li>✓ Koordinator lapangan (opsional)</li>
                                <li>✓ Invoice & penagihan korporat</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default function PesanEventPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <PesanEventInner />
        </Suspense>
    );
}
