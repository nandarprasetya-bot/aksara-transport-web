"use client";
import React, { useState, useEffect } from 'react';

export default function AdminTagihanPage() {
    const [nama, setNama] = useState('');
    const [noWa, setNoWa] = useState('');
    const [mobil, setMobil] = useState('');
    const [layanan, setLayanan] = useState('Lepas Kunci');
    
    // Auto Calculate fields
    const [hargaHarian, setHargaHarian] = useState<number>(0);
    const [jumlahHari, setJumlahHari] = useState<number>(1);
    
    const [dpPercent, setDpPercent] = useState<number>(30);

    const [tambahanList, setTambahanList] = useState<{id: number, ket: string, harga: number}[]>([
        { id: Date.now(), ket: '', harga: 0 }
    ]);
    
    // Diskon
    const [diskon, setDiskon] = useState<number>(0);

    const [totalHargaSewa, setTotalHargaSewa] = useState(0);
    const [total, setTotal] = useState(0);
    const [dpAmount, setDpAmount] = useState(0);
    const [sisa, setSisa] = useState(0);

    const invoiceDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    useEffect(() => {
        const hSewa = hargaHarian * jumlahHari;
        setTotalHargaSewa(hSewa);
        
        const totalTambahan = tambahanList.reduce((sum, item) => sum + (item.harga || 0), 0);
        let t = hSewa + totalTambahan - (diskon || 0);
        if (t < 0) t = 0; // Prevent negative total
        
        const dp = Math.round(t * (dpPercent / 100));
        setTotal(t);
        setDpAmount(dp);
        setSisa(t - dp);
    }, [hargaHarian, jumlahHari, tambahanList, diskon, dpPercent]);

    const formatRupiah = (angka: number) => {
        if (!angka) return 'Rp 0';
        return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Helper for formatting input with dots
    const handleNumberChange = (val: string, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const numericString = val.replace(/\D/g, '');
        setter(numericString ? parseInt(numericString, 10) : 0);
    };

    const addTambahan = () => {
        setTambahanList([...tambahanList, { id: Date.now(), ket: '', harga: 0 }]);
    };

    const removeTambahan = (id: number) => {
        setTambahanList(tambahanList.filter(t => t.id !== id));
    };

    const updateTambahanStr = (id: number, field: string, value: string) => {
        setTambahanList(tambahanList.map(t => {
            if (t.id === id) {
                return { ...t, [field]: value };
            }
            return t;
        }));
    };
    
    const updateTambahanNum = (id: number, valueStr: string) => {
        const numericString = valueStr.replace(/\D/g, '');
        const val = numericString ? parseInt(numericString, 10) : 0;
        setTambahanList(tambahanList.map(t => {
            if (t.id === id) {
                return { ...t, harga: val };
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
        text += `- Durasi: ${jumlahHari} Hari\n\n`;

        text += `*Rincian Biaya:*\n`;
        text += `- Harga Sewa Kendaraan (${jumlahHari}x ${formatRupiah(hargaHarian)}): ${formatRupiah(totalHargaSewa)}\n`;
        
        tambahanList.forEach(t => {
            if (t.ket && t.harga > 0) {
                text += `- ${t.ket}: ${formatRupiah(t.harga)}\n`;
            }
        });
        
        if (diskon > 0) {
            text += `- Diskon / Potongan Harga: -${formatRupiah(diskon)}\n`;
        }
        
        text += `-----------------------------------\n`;
        text += `*Total Biaya Keseluruhan:* ${formatRupiah(total)}\n\n`;

        text += `*Termin Pembayaran:*\n`;
        text += `- *Tanda Jadi / DP (${dpPercent}%): ${formatRupiah(dpAmount)}*\n`;
        text += `- *Sisa Pelunasan: ${formatRupiah(sisa)}*\n\n`;

        text += `*⚠️ PENTING:* \n_${generateWarningText()}_\n\n`;

        text += `*Rekening Pembayaran:*\n`;
        text += `BCA: 4452490696\n`;
        text += `a/n Nandar Prasetya\n\n`;

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
        // Simple trick to isolate only the invoice
        const originalContent = document.body.innerHTML;
        const printContent = document.getElementById('invoice-preview')?.innerHTML;
        
        if (printContent) {
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload(); // To re-hydrate react properly
        }
    };

    return (
        <main className="tagihan-page" style={{ background: '#f1f5f9', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
            <style>{`
                .responsive-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .responsive-grid-3 { display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 20px; }
                .responsive-flex { display: flex; gap: 15px; }
                .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; }
                .invoice-footer { display: flex; justify-content: space-between; align-items: flex-end; }
                .subtotal-box { width: 400px; }
                .table-container { width: 100%; overflow-x: auto; }
                .form-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); padding: 30px; }
                .kop-atas-kiri { display: flex; align-items: center; gap: 20px; }
                .tambahan-grid { display: grid; grid-template-columns: 2fr 1fr auto; gap: 10px; align-items: center; }
                
                @media (max-width: 768px) {
                    .tagihan-page { padding: 20px 10px !important; }
                    .form-container { padding: 15px !important; }
                    .responsive-grid { grid-template-columns: 1fr; gap: 15px; }
                    .responsive-grid-3 { grid-template-columns: 1fr; gap: 15px; }
                    .responsive-flex { flex-direction: column; }
                    .tambahan-grid { grid-template-columns: 1fr; }
                    .tambahan-grid > button { width: 100% !important; margin-top: 5px; }
                    
                    .invoice-header { flex-direction: column; align-items: center; text-align: center; gap: 20px; }
                    .kop-atas-kiri { flex-direction: column; text-align: center; }
                    .invoice-header > div:last-child { text-align: center; padding-top: 0; }
                    
                    .invoice-footer { flex-direction: column; align-items: center; gap: 30px; text-align: center; }
                    .invoice-footer > div { width: 100% !important; }
                    .subtotal-box { width: 100% !important; }
                    #invoice-preview { padding: 20px !important; }
                    
                    th, td { padding: 10px !important; font-size: 13px !important; }
                    h1 { font-size: 1.5rem !important; }
                    .btn-aksi { width: 100%; justify-content: center; }
                }
            `}</style>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '40px' }}>
                <div className="responsive-flex" style={{ marginBottom: '30px', background: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <a href="/admin" style={{ padding: '8px 16px', background: '#f8fafc', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        📋 Dasbor Admin
                    </a>
                    <a href="/admin/tagihan" style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                        💰 Kalkulator Tagihan & Invoice
                    </a>
                </div>

                <div className="form-container">
                    <div style={{ marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>Form Input Invoice</h1>
                        <p style={{ color: '#64748b' }}>Isi data di bawah ini, preview Invoice Resmi (Kop Surat) akan terbuat otomatis di bawah.</p>
                    </div>

                    <form>
                        <div className="responsive-grid" style={{ marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Nama Pelanggan</label>
                                <input type="text" value={nama} onChange={e=>setNama(e.target.value)} placeholder="Contoh: Budi Santoso" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Nomor WA Pelanggan (Opsional)</label>
                                <input type="text" value={noWa} onChange={e=>setNoWa(e.target.value)} placeholder="Contoh: 081234567890" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>

                        <div className="responsive-grid" style={{ marginBottom: '20px' }}>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Armada Mobil</label>
                                <input type="text" value={mobil} onChange={e=>setMobil(e.target.value)} placeholder="Contoh: Honda Brio" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Layanan</label>
                                <input type="text" value={layanan} onChange={e=>setLayanan(e.target.value)} placeholder="Lepas Kunci / Sopir" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                        </div>

                        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px', color: '#0f172a' }}>Rincian Biaya & Durasi</h3>
                            
                            <div className="responsive-grid-3" style={{ marginBottom: '15px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Harga Sewa / Hari (Rp)</label>
                                    <input type="text" value={formatRupiah(hargaHarian)} onChange={e=>handleNumberChange(e.target.value, setHargaHarian)} placeholder="Rp 300.000" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Jumlah Hari</label>
                                    <input type="number" value={jumlahHari} onChange={e=>setJumlahHari(parseInt(e.target.value)||1)} min={1} className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Total Pokok Sewa (Otomatis)</label>
                                    <input type="text" value={formatRupiah(totalHargaSewa)} readOnly className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#e2e8f0', color: '#1e293b', fontWeight: 700 }} />
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #e2e8f0', margin: '20px 0', paddingTop: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <label style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem' }}>Biaya Tambahan Lain-Lain</label>
                                    <button type="button" onClick={addTambahan} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>+ Tambah Biaya</button>
                                </div>
                                
                                {tambahanList.map((t, index) => (
                                    <div key={t.id} className="tambahan-grid" style={{ marginBottom: '10px' }}>
                                        <input type="text" value={t.ket} onChange={e=>updateTambahanStr(t.id, 'ket', e.target.value)} placeholder={`Keterangan (misal: Antar Stasiun)`} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                                        <input type="text" value={t.harga === 0 ? '' : formatRupiah(t.harga)} onChange={e=>updateTambahanNum(t.id, e.target.value)} placeholder="Rp Nominal" className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                                        {tambahanList.length > 1 && (
                                            <button type="button" onClick={() => removeTambahan(t.id)} style={{ background: '#ef4444', color: 'white', border: 'none', minWidth: '35px', height: '35px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="responsive-grid" style={{ borderTop: '1px solid #e2e8f0', marginTop: '15px', paddingTop: '15px' }}>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#b91c1c' }}>Potongan / Diskon (Rp)</label>
                                    <input type="text" value={diskon === 0 ? '' : formatRupiah(diskon)} onChange={e=>handleNumberChange(e.target.value, setDiskon)} placeholder="Misal diskon: Rp 50.000" className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #fca5a5', backgroundColor: '#fef2f2' }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Persentase DP (%)</label>
                                    <input type="number" value={dpPercent} onChange={e=>setDpPercent(parseInt(e.target.value)||0)} className="form-control" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', maxWidth: '150px' }} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="responsive-flex">
                            <button type="button" onClick={handleKirimWA} className="btn btn-aksi" style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '8px', background: '#25d366', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                Kirim ke WhatsApp
                            </button>
                            <button type="button" onClick={handlePrintPDF} className="btn btn-aksi" style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '8px', background: '#e2e8f0', border: '1px solid #cbd5e1', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
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
                <div className="invoice-header" style={{ borderBottom: '3px solid #d97706', paddingBottom: '20px', marginBottom: '30px' }}>
                    <div className="kop-atas-kiri">
                        <div style={{ width: '70px', height: '70px', background: '#d97706', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 900, fontSize: '30px', letterSpacing: '-2px', margin: '0 auto' }}>
                            AT
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>AKSARA TRANSPORT</h1>
                            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#475569', fontWeight: 600 }}>Pusat Sewa Mobil Premium & Wisata Yogyakarta</p>
                            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748b' }}>Jl. Imogiri Barat No.RT.4, Sewon, Bantul, Daerah Istimewa Yogyakarta 55188</p>
                            <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748b' }}>WhatsApp: 0838-6000-740 | Website: jogjasewamobil.com</p>
                        </div>
                    </div>
                    <div style={{ paddingTop: '10px' }}>
                        <h2 style={{ margin: 0, fontSize: '38px', color: '#d97706', fontWeight: 900, letterSpacing: '2px' }}>INVOICE</h2>
                        <p style={{ margin: '5px 0 0 0', fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>No. {invoiceNumber}</p>
                        <p style={{ margin: '3px 0 0 0', fontSize: '14px', color: '#64748b' }}>Tanggal: {invoiceDate}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '13px', margin: '0 0 10px 0', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>DITAGIHKAN KEPADA:</h3>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 800, fontSize: '18px', color: '#0f172a' }}>{nama || '(Nama Pelanggan)'}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>Telp / WA: {noWa || '-'}</p>
                    </div>
                </div>

                <div className="table-container" style={{ marginBottom: '30px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '8px 0 0 0' }}>DESKRIPSI LAYANAN & BIAYA</th>
                                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', width: '220px', borderRadius: '0 8px 0 0' }}>JUMLAH (IDR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', color: '#1e293b' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>Sewa {mobil || 'Kendaraan'}</div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>Layanan: {layanan || '-'} | Durasi: {jumlahHari} Hari (x {formatRupiah(hargaHarian)})</div>
                                </td>
                                <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', textAlign: 'right', fontWeight: 700, color: '#0f172a', verticalAlign: 'top' }}>{formatRupiah(totalHargaSewa)}</td>
                            </tr>
                            {tambahanList.map((t) => {
                                if (t.ket && t.harga > 0) {
                                    return (
                                        <tr key={t.id}>
                                            <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', color: '#1e293b' }}>{t.ket}</td>
                                            <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatRupiah(t.harga)}</td>
                                        </tr>
                                    )
                                }
                                return null;
                            })}
                            {diskon > 0 && (
                                <tr>
                                    <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', color: '#b91c1c', fontWeight: 700 }}>Diskon / Potongan Harga</td>
                                    <td style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', fontSize: '15px', textAlign: 'right', fontWeight: 700, color: '#b91c1c' }}>-{formatRupiah(diskon)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <div className="subtotal-box" style={{ backgroundColor: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
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

                <div className="invoice-footer">
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
