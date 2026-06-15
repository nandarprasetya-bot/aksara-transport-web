"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function AdminTagihanPage() {
    const [nama, setNama] = useState('');
    const [noWa, setNoWa] = useState('');
    const [mobil, setMobil] = useState('');
    const [layanan, setLayanan] = useState('Lepas Kunci');
    const [durasi, setDurasi] = useState('1 Hari');
    
    const [hargaDeal, setHargaDeal] = useState<number>(0);
    const [dpPercent, setDpPercent] = useState<number>(30);

    // Multiple Tambahan Biaya
    const [tambahanList, setTambahanList] = useState<{id: number, ket: string, harga: number}[]>([
        { id: Date.now(), ket: '', harga: 0 }
    ]);

    const [total, setTotal] = useState(0);
    const [dpAmount, setDpAmount] = useState(0);
    const [sisa, setSisa] = useState(0);

    const invoiceDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    useEffect(() => {
        const totalTambahan = tambahanList.reduce((sum, item) => sum + (item.harga || 0), 0);
        const t = (hargaDeal || 0) + totalTambahan;
        const dp = Math.round(t * (dpPercent / 100));
        setTotal(t);
        setDpAmount(dp);
        setSisa(t - dp);
    }, [hargaDeal, tambahanList, dpPercent]);

    const formatRupiah = (angka: number) => {
        if (!angka) return 'Rp 0';
        return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const addTambahan = () => {
        setTambahanList([...tambahanList, { id: Date.now(), ket: '', harga: 0 }]);
    };

    const removeTambahan = (id: number) => {
        setTambahanList(tambahanList.filter(t => t.id !== id));
    };

    const updateTambahan = (id: number, field: string, value: string | number) => {
        setTambahanList(tambahanList.map(t => {
            if (t.id === id) {
                return { ...t, [field]: value };
            }
            return t;
        }));
    };

    const generateWarningText = () => {
        return "Pelunasan sewa wajib lunas saat serah terima mobil (khusus Lepas Kunci). Jika menggunakan layanan Dengan Sopir, pelunasan dapat dilakukan pada hari terakhir setelah selesai bertugas.";
    };

    const handleKirimWA = (e: React.FormEvent) => {
        e.preventDefault();
        
        let text = `*INVOICE & TAGIHAN SEWA MOBIL*\n*AKSARA TRANSPORT YOGYAKARTA*\n${invoiceNumber} | ${invoiceDate}\n\n`;
        text += `Halo Kak *${nama || 'Pelanggan'}*,\nTerima kasih telah mempercayakan perjalanan Anda kepada kami. Berikut adalah rincian tagihan sewa mobil Anda:\n\n`;
        
        text += `*Detail Pesanan:*\n`;
        text += `- Armada: ${mobil}\n`;
        text += `- Layanan: ${layanan}\n`;
        text += `- Durasi: ${durasi}\n\n`;

        text += `*Rincian Biaya:*\n`;
        text += `- Harga Sewa Kendaraan: ${formatRupiah(hargaDeal)}\n`;
        
        tambahanList.forEach(t => {
            if (t.ket && t.harga > 0) {
                text += `- ${t.ket}: ${formatRupiah(t.harga)}\n`;
            }
        });
        
        text += `-----------------------------------\n`;
        text += `*Total Biaya Keseluruhan:* ${formatRupiah(total)}\n\n`;

        text += `*Termin Pembayaran:*\n`;
        text += `- *Tanda Jadi / DP (${dpPercent}%): ${formatRupiah(dpAmount)}*\n`;
        text += `- *Sisa Pelunasan: ${formatRupiah(sisa)}*\n\n`;

        text += `*⚠️ PENTING:* \n_${generateWarningText()}_\n\n`;

        text += `*Rekening Pembayaran:*\n`;
        text += `BCA: 1234567890\n`;
        text += `Mandiri: 0987654321\n`;
        text += `a.n Aksara Transport\n\n`;

        text += `Mohon lampirkan bukti transfer jika sudah melakukan pembayaran DP. Jadwal armada Anda akan segera kami amankan setelah DP diterima. Terima kasih! 🙏`;

        let waLink = `https://wa.me/`;
        if (noWa) {
            let cleanWa = noWa.replace(/\D/g, '');
            if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.substring(1);
            waLink += `${cleanWa}?text=${encodeURIComponent(text)}`;
        } else {
            waLink += `?text=${encodeURIComponent(text)}`;
        }

        window.open(waLink, '_blank');
    };

    const handlePrintPDF = () => {
        window.print();
    };

    return (
        <main className="tagihan-page">
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    body * { visibility: hidden; }
                    #print-invoice, #print-invoice * { visibility: visible; }
                    #print-invoice { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
                    .no-print { display: none !important; }
                    .tagihan-page { background: white !important; padding: 0 !important; }
                    .container { max-width: 100% !important; margin: 0 !important; }
                }
            `}} />

            <div className="container no-print" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', minHeight: '100vh' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', background: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexWrap: 'wrap' }}>
                    <a href="/admin" style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                        📋 Pesanan Rental
                    </a>
                    <a href="/admin/tagihan" style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
                        💰 Kalkulator Tagihan WA & PDF
                    </a>
                    <a href="/admin/artikel" style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                        📰 Manajemen Artikel
                    </a>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>Kalkulator Tagihan & Invoice PDF</h1>
                            <p style={{ color: '#64748b' }}>Buat tagihan WhatsApp dan cetak Invoice Resmi (PDF).</p>
                        </div>
                    </div>

                    <form onSubmit={handleKirimWA}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Nama Pelanggan</label>
                                <input type="text" value={nama} onChange={e=>setNama(e.target.value)} placeholder="Contoh: Budi Santoso" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
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

                        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px', color: '#0f172a' }}>Rincian Harga & Biaya</h3>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Harga Deal Pokok Sewa (Rp)</label>
                                <input type="number" value={hargaDeal || ''} onChange={e=>setHargaDeal(parseInt(e.target.value)||0)} placeholder="Contoh: 300000" required className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>

                            <div style={{ borderTop: '1px solid #e2e8f0', margin: '20px 0', paddingTop: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <label style={{ fontWeight: 700, display: 'block' }}>Daftar Biaya Tambahan</label>
                                    <button type="button" onClick={addTambahan} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>+ Tambah Biaya</button>
                                </div>
                                
                                {tambahanList.map((t, index) => (
                                    <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                        <input type="text" value={t.ket} onChange={e=>updateTambahan(t.id, 'ket', e.target.value)} placeholder={`Keterangan (misal: Antar Stasiun)`} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                                        <input type="number" value={t.harga || ''} onChange={e=>updateTambahan(t.id, 'harga', parseInt(e.target.value)||0)} placeholder="Nominal (Rp)" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                                        {tambahanList.length > 1 && (
                                            <button type="button" onClick={() => removeTambahan(t.id)} style={{ background: '#ef4444', color: 'white', border: 'none', width: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '15px', paddingTop: '15px' }}>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Persentase DP (%)</label>
                                <input type="number" value={dpPercent} onChange={e=>setDpPercent(parseInt(e.target.value)||0)} required className="form-control" style={{ width: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
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

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button type="submit" className="btn" style={{ flex: 1, padding: '16px', fontSize: '1.1rem', fontWeight: 800, borderRadius: '8px', background: '#25d366', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                Kirim ke WhatsApp
                            </button>
                            <button type="button" onClick={handlePrintPDF} className="btn" style={{ flex: 1, padding: '16px', fontSize: '1.1rem', fontWeight: 800, borderRadius: '8px', background: '#e2e8f0', border: '1px solid #cbd5e1', color: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                🖨️ Cetak Invoice (PDF)
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* PRINTABLE INVOICE AREA (HIDDEN EXCEPT WHEN PRINTING) */}
            <div id="print-invoice" style={{ display: 'none', fontFamily: 'sans-serif', color: '#000', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '30px' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '28px', color: '#d97706', fontWeight: 900, textTransform: 'uppercase' }}>AKSARA TRANSPORT</h1>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#475569' }}>Rental Mobil Premium & Wisata Yogyakarta</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>Jl. Imogiri Barat No.RT.4, Sewon, Bantul, DIY | WA: 0838-6000-740</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ margin: 0, fontSize: '32px', color: '#0f172a', letterSpacing: '2px' }}>INVOICE</h2>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>#{invoiceNumber}</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px' }}>Tanggal: {invoiceDate}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '5px' }}>DITAGIHKAN KEPADA:</h3>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '18px' }}>{nama || 'Nama Pelanggan'}</p>
                        {noWa && <p style={{ margin: 0, fontSize: '14px' }}>WA: {noWa}</p>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '5px' }}>DETAIL LAYANAN:</h3>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Armada:</strong> {mobil || '-'}</p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Sistem:</strong> {layanan || '-'}</p>
                        <p style={{ margin: '0 0 0 0', fontSize: '14px' }}><strong>Durasi:</strong> {durasi || '-'}</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                            <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px' }}>DESKRIPSI BIAYA</th>
                            <th style={{ padding: '12px 15px', textAlign: 'right', fontSize: '14px', width: '200px' }}>JUMLAH (IDR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>Harga Pokok Sewa Armada</td>
                            <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px', textAlign: 'right', fontWeight: 'bold' }}>{formatRupiah(hargaDeal)}</td>
                        </tr>
                        {tambahanList.map((t) => {
                            if (t.ket && t.harga > 0) {
                                return (
                                    <tr key={t.id}>
                                        <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>Biaya Tambahan: {t.ket}</td>
                                        <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', fontSize: '14px', textAlign: 'right', fontWeight: 'bold' }}>{formatRupiah(t.harga)}</td>
                                    </tr>
                                )
                            }
                            return null;
                        })}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <div style={{ width: '350px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', borderBottom: '1px solid #e2e8f0', fontSize: '16px', fontWeight: 'bold' }}>
                            <span>TOTAL KESELURUHAN</span>
                            <span>{formatRupiah(total)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', borderBottom: '1px solid #e2e8f0', fontSize: '16px', color: '#059669', fontWeight: 'bold', backgroundColor: '#d1fae5' }}>
                            <span>TANDA JADI / DP ({dpPercent}%)</span>
                            <span>{formatRupiah(dpAmount)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', fontSize: '16px', fontWeight: 'bold' }}>
                            <span>SISA PELUNASAN</span>
                            <span>{formatRupiah(sisa)}</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '14px', margin: '0 0 5px 0', textTransform: 'uppercase', color: '#64748b' }}>Metode Pembayaran (Transfer Bank)</h3>
                    <p style={{ margin: '0 0 3px 0', fontSize: '14px', fontWeight: 'bold' }}>BCA: 123-456-7890</p>
                    <p style={{ margin: '0 0 3px 0', fontSize: '14px', fontWeight: 'bold' }}>Mandiri: 098-765-4321</p>
                    <p style={{ margin: 0, fontSize: '14px' }}>Atas Nama: <strong>Aksara Transport</strong></p>
                </div>

                <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '20px', fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#dc2626' }}>PERINGATAN PENTING:</p>
                    <p style={{ margin: 0 }}>{generateWarningText()}</p>
                    <p style={{ margin: '10px 0 0 0' }}>Bukti DP mohon dikirimkan via WhatsApp. Kuitansi sah diterbitkan setelah pembayaran lunas.</p>
                </div>
            </div>
            {/* HACK: Make print area visible during print dynamically via CSS block above */}
        </main>
    );
}
