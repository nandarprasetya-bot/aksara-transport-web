"use client";
import React, { useState, useEffect } from 'react';

export default function AdminTagihanPage() {
    const [nama, setNama] = useState('');
    const [noWa, setNoWa] = useState('');
    const [mobil, setMobil] = useState('');
    const [layanan, setLayanan] = useState('Lepas Kunci');
    const [durasi, setDurasi] = useState('1 Hari');
    
    const [hargaDeal, setHargaDeal] = useState<number>(0);
    const [dpPercent, setDpPercent] = useState<number>(30);

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
        text += `BCA: 4452490696\n`;
        text += `a.n Nandar Prasetya\n\n`;

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
        <main className="tagihan-page" style={{ background: '#f1f5f9', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    body { background: white !important; margin: 0; padding: 0; }
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    #invoice-preview { box-shadow: none !important; margin: 0 !important; width: 100% !important; padding: 0 !important; }
                    @page { margin: 10mm; }
                }
            `}} />

            <div className="container no-print" style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', background: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexWrap: 'wrap' }}>
                    <a href="/admin" style={{ padding: '8px 16px', background: '#f8fafc', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                        📋 Dasbor Admin
                    </a>
                    <a href="/admin/tagihan" style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
                        💰 Kalkulator Tagihan & Invoice
                    </a>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '30px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>Form Input Invoice</h1>
                        <p style={{ color: '#64748b' }}>Isi data di bawah ini, preview Invoice Resmi (Kop Surat) akan terbuat otomatis di bawah.</p>
                    </div>

                    <form>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Nama Pelanggan</label>
                                <input type="text" value={nama} onChange={e=>setNama(e.target.value)} placeholder="Contoh: Budi Santoso" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Nomor WA Pelanggan (Opsional)</label>
                                <input type="text" value={noWa} onChange={e=>setNoWa(e.target.value)} placeholder="Contoh: 081234567890" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Armada Mobil</label>
                                <input type="text" value={mobil} onChange={e=>setMobil(e.target.value)} placeholder="Contoh: Honda Brio" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Layanan</label>
                                <input type="text" value={layanan} onChange={e=>setLayanan(e.target.value)} placeholder="Lepas Kunci / Sopir" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Durasi Sewa</label>
                                <input type="text" value={durasi} onChange={e=>setDurasi(e.target.value)} placeholder="Contoh: 2 Hari" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>

                        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px', color: '#0f172a' }}>Rincian Biaya</h3>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Harga Deal Pokok Sewa (Rp)</label>
                                <input type="number" value={hargaDeal || ''} onChange={e=>setHargaDeal(parseInt(e.target.value)||0)} placeholder="Contoh: 300000" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>

                            <div style={{ borderTop: '1px solid #e2e8f0', margin: '20px 0', paddingTop: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <label style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem' }}>Biaya Tambahan Lain-Lain</label>
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
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Persentase DP (%)</label>
                                <input type="number" value={dpPercent} onChange={e=>setDpPercent(parseInt(e.target.value)||0)} className="form-control" style={{ width: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button type="button" onClick={handleKirimWA} className="btn" style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '8px', background: '#25d366', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                                Kirim ke WhatsApp
                            </button>
                            <button type="button" onClick={handlePrintPDF} className="btn" style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '8px', background: '#e2e8f0', border: '1px solid #cbd5e1', color: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                                🖨️ Cetak Invoice (PDF)
                            </button>
                        </div>
                    </form>
                </div>
                
                <h2 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px', color: '#64748b', fontSize: '1.2rem', fontWeight: 700 }}>👇 PREVIEW INVOICE RESMI 👇</h2>
            </div>

            {/* VISIBLE INVOICE AREA (Becomes full page on print) */}
            <div id="invoice-preview" style={{ 
                maxWidth: '900px', 
                margin: '0 auto', 
                background: 'white', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                padding: '50px',
                borderRadius: '8px',
                color: '#0f172a'
            }}>
                {/* KOP SURAT (LETTERHEAD) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #d97706', paddingBottom: '20px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Fake Logo Icon using HTML */}
                        <div style={{ width: '70px', height: '70px', background: '#d97706', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 900, fontSize: '30px', letterSpacing: '-2px' }}>
                            AT
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>AKSARA TRANSPORT</h1>
                            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#475569', fontWeight: 600 }}>Pusat Sewa Mobil Premium & Wisata Yogyakarta</p>
                            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748b' }}>Jl. Imogiri Barat No.RT.4, Sewon, Bantul, Daerah Istimewa Yogyakarta 55188</p>
                            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748b' }}>WhatsApp: 0838-6000-740 | Website: jogjasewamobil.com</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                        <h2 style={{ margin: 0, fontSize: '38px', color: '#d97706', fontWeight: 900, letterSpacing: '2px' }}>INVOICE</h2>
                        <p style={{ margin: '5px 0 0 0', fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>No. {invoiceNumber}</p>
                        <p style={{ margin: '3px 0 0 0', fontSize: '14px', color: '#64748b' }}>Tanggal: {invoiceDate}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '13px', margin: '0 0 10px 0', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>DITAGIHKAN KEPADA:</h3>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 800, fontSize: '18px', color: '#0f172a' }}>{nama || '(Nama Pelanggan)'}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>Telp / WA: {noWa || '-'}</p>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                        <h3 style={{ fontSize: '13px', margin: '0 0 10px 0', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>DETAIL LAYANAN:</h3>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#0f172a' }}><strong>Armada:</strong> {mobil || '-'}</p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#0f172a' }}><strong>Sistem:</strong> {layanan || '-'}</p>
                        <p style={{ margin: '0 0 0 0', fontSize: '14px', color: '#0f172a' }}><strong>Durasi:</strong> {durasi || '-'}</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                            <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '8px 0 0 0' }}>DESKRIPSI BIAYA</th>
                            <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', width: '220px', borderRadius: '0 8px 0 0' }}>JUMLAH (IDR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', color: '#1e293b' }}>Harga Pokok Sewa Kendaraan</td>
                            <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatRupiah(hargaDeal)}</td>
                        </tr>
                        {tambahanList.map((t) => {
                            if (t.ket && t.harga > 0) {
                                return (
                                    <tr key={t.id}>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', color: '#1e293b' }}>Biaya Tambahan: {t.ket}</td>
                                        <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatRupiah(t.harga)}</td>
                                    </tr>
                                )
                            }
                            return null;
                        })}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <div style={{ width: '400px', backgroundColor: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '16px', color: '#475569' }}>
                            <span>SUBTOTAL</span>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatRupiah(total)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '16px', color: '#059669', backgroundColor: '#ecfdf5' }}>
                            <span style={{ fontWeight: 700 }}>TANDA JADI / DP ({dpPercent}%)</span>
                            <span style={{ fontWeight: 800 }}>{formatRupiah(dpAmount)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', fontSize: '16px', backgroundColor: '#fffbeb', color: '#b45309' }}>
                            <span style={{ fontWeight: 700 }}>SISA PELUNASAN</span>
                            <span style={{ fontWeight: 800 }}>{formatRupiah(sisa)}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ width: '60%' }}>
                        <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', textTransform: 'uppercase', color: '#475569', letterSpacing: '1px' }}>METODE PEMBAYARAN:</h3>
                        <div style={{ borderLeft: '4px solid #d97706', paddingLeft: '15px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>BCA: 4452490696</p>
                            <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>a/n: <strong>Nandar Prasetya</strong></p>
                        </div>
                    </div>

                    <div style={{ width: '200px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 60px 0', fontSize: '14px', color: '#475569' }}>Hormat Kami,</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>Aksara Transport</p>
                    </div>
                </div>

                <div style={{ borderTop: '2px dashed #cbd5e1', marginTop: '40px', paddingTop: '20px', fontSize: '13px', color: '#475569', lineHeight: '1.6', backgroundColor: '#fef2f2', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 800, color: '#b91c1c' }}>PENGINGAT PENTING (TERMS OF PAYMENT):</p>
                    <p style={{ margin: '0 0 5px 0', color: '#991b1b' }}>{generateWarningText()}</p>
                    <p style={{ margin: 0, color: '#991b1b' }}><em>Kuitansi ini dicetak otomatis dari sistem dan sah tanpa tanda tangan basah apabila DP sudah ditransfer ke rekening resmi kami.</em></p>
                </div>
            </div>
        </main>
    );
}
