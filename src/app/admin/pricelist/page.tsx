"use client";
import React from 'react';

const lepasKunciCars = [
    { name: 'Honda Brio Matic', price: 'Rp 250.000 / Hari' },
    { name: 'Honda Jazz Matic', price: 'Rp 325.000 / Hari' },
    { name: 'Toyota Raize Matic', price: 'Rp 325.000 / Hari' },
    { name: 'Avanza Facelift Matic', price: 'Rp 250.000 / Hari' },
    { name: 'Avanza FWD Matic', price: 'Rp 300.000 / Hari' },
    { name: 'Mitsubishi Xpander Matic', price: 'Rp 325.000 / Hari' },
    { name: 'Innova Reborn Matic', price: 'Rp 550.000 / Hari' },
    { name: 'Wuling Air EV', price: 'Rp 450.000 / Hari' },
    { name: 'Wuling Binguo EV', price: 'Rp 550.000 / Hari' }
];

const denganSopirCars = [
    { name: 'Honda Brio', price: 'Rp 450.000 (12 Jam) | Rp 550.000 (Fullday)' },
    { name: 'Toyota Avanza Facelift', price: 'Rp 550.000 (12 Jam) | Rp 600.000 (Fullday)' },
    { name: 'Toyota Avanza FWD', price: 'Rp 650.000 (12 Jam) | Rp 750.000 (Fullday)' },
    { name: 'Mitsubishi Xpander', price: 'Rp 700.000 (12 Jam) | Rp 800.000 (Fullday)' },
    { name: 'Toyota Innova Reborn 2026', price: 'Rp 750.000 (12 Jam) | Rp 850.000 (Fullday)' },
    { name: 'Toyota Innova Zenix 2026', price: 'Rp 1.000.000 (12 Jam) | Rp 1.100.000 (Fullday)' },
    { name: 'Mitsubishi Pajero 2026', price: 'Rp 1.500.000 (12 Jam) | Rp 1.600.000 (Fullday)' },
    { name: 'Toyota Fortuner 2026', price: 'Rp 1.500.000 (12 Jam) | Rp 1.600.000 (Fullday)' },
    { name: 'Toyota Alphard Facelift 2023', price: 'Rp 2.899.000 (12 Jam) | Rp 2.999.999 (Fullday)' },
    { name: 'Toyota Alphard HEV 2026', price: 'Rp 3.899.999 (12 Jam) | Rp 3.999.999 (Fullday)' },
    { name: 'Toyota Hiace Commuter', price: 'Rp 1.100.000 (12 Jam) | Rp 1.200.000 (Fullday)' },
    { name: 'Toyota Hiace Premio', price: 'Rp 1.400.000 (12 Jam) | Rp 1.500.000 (Fullday)' },
    { name: 'Elf Long 19 Seat', price: 'Rp 1.500.000 (12 Jam) | Rp 1.600.000 (Fullday)' }
];

export default function AdminPricelistPage() {
    const handleKirimWA = (e: React.FormEvent) => {
        e.preventDefault();
        
        let text = `*PRICELIST RESMI AKSARA TRANSPORT YOGYAKARTA*\n\n`;
        text += `Halo! Berikut adalah daftar harga sewa mobil kami:\n\n`;
        
        text += `*🚘 LAYANAN LEPAS KUNCI (Tanpa Sopir)*\n`;
        text += `_Syarat: Wajib menjaminkan motor & STNK atas nama pribadi (Khusus domisili Jogja)_\n`;
        lepasKunciCars.forEach(car => {
            text += `- ${car.name}: ${car.price}\n`;
        });
        
        text += `\n*👨‍✈️ LAYANAN DENGAN SOPIR (Include BBM)*\n`;
        denganSopirCars.forEach(car => {
            text += `- ${car.name}: ${car.price}\n`;
        });

        text += `\n_*Catatan:_*\n`;
        text += `- Harga Sewa Dengan Sopir berlaku untuk rute dalam Kota Yogyakarta.\n`;
        text += `- Harga dapat berubah sewaktu-waktu (terutama saat periode High Season).\n\n`;
        text += `Silakan balas pesan ini jika Anda ingin melakukan pemesanan atau memiliki pertanyaan lebih lanjut. Terima kasih! 🙏`;

        let waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(waLink, '_blank');
    };

    const handlePrintPDF = () => {
        const originalContent = document.body.innerHTML;
        const printContent = document.getElementById('pricelist-preview')?.innerHTML;
        
        if (printContent) {
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload(); 
        }
    };

    return (
        <main className="tagihan-page" style={{ background: '#f1f5f9', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
            <style>{`
                .responsive-flex { display: flex; gap: 15px; }
                .kop-atas-kiri { display: flex; align-items: center; gap: 20px; }
                .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; }
                
                @media (max-width: 768px) {
                    .responsive-flex { flex-direction: column; }
                    .invoice-header { flex-direction: column; align-items: center; text-align: center; gap: 20px; }
                    .kop-atas-kiri { flex-direction: column; text-align: center; }
                    .invoice-header > div:last-child { text-align: center; padding-top: 0; }
                    #pricelist-preview { padding: 20px !important; }
                    th, td { padding: 10px !important; font-size: 13px !important; }
                    .btn-aksi { width: 100%; justify-content: center; }
                }
            `}</style>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '40px' }}>
                <div className="responsive-flex" style={{ marginBottom: '30px', background: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <a href="/admin" style={{ padding: '8px 16px', background: '#f8fafc', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        📋 Dasbor Admin
                    </a>
                    <a href="/admin/tagihan" style={{ padding: '8px 16px', background: '#f8fafc', color: '#475569', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        💰 Kalkulator Tagihan
                    </a>
                    <a href="/admin/pricelist" style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                        📑 Generator Pricelist
                    </a>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '30px', marginBottom: '40px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>Bagikan Pricelist ke Pelanggan</h1>
                        <p style={{ color: '#64748b' }}>Gunakan tombol di bawah ini untuk mengirimkan daftar harga secara rapi ke WhatsApp pelanggan, atau cetak sebagai PDF berlogo perusahaan.</p>
                    </div>

                    <div className="responsive-flex">
                        <button type="button" onClick={handleKirimWA} className="btn btn-aksi" style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '8px', background: '#25d366', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                            📱 Kirim Teks Pricelist via WA
                        </button>
                        <button type="button" onClick={handlePrintPDF} className="btn btn-aksi" style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 800, borderRadius: '8px', background: '#e2e8f0', border: '1px solid #cbd5e1', color: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                            🖨️ Cetak PDF Pricelist Resmi
                        </button>
                    </div>
                </div>
                
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#64748b', fontSize: '1.2rem', fontWeight: 700 }}>👇 PREVIEW PDF PRICELIST 👇</h2>
            </div>

            {/* VISIBLE PRICELIST AREA (Becomes full page on print) */}
            <div id="pricelist-preview" style={{ 
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
                        <h2 style={{ margin: 0, fontSize: '30px', color: '#d97706', fontWeight: 900, letterSpacing: '2px' }}>PRICELIST</h2>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>Update Terakhir: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>

                <div style={{ width: '100%', overflowX: 'auto', marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '18px', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>🚗 Layanan Lepas Kunci (Tanpa Sopir)</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f1f5f9' }}>
                                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>Nama Armada</th>
                                <th style={{ padding: '12px 15px', textAlign: 'right', fontSize: '14px', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>Tarif Sewa (Per Hari)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lepasKunciCars.map((car, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '12px 15px', fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>{car.name}</td>
                                    <td style={{ padding: '12px 15px', fontSize: '15px', textAlign: 'right', color: '#0f172a' }}>{car.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ width: '100%', overflowX: 'auto', marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '18px', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>👨‍✈️ Layanan Dengan Sopir (Include BBM)</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f1f5f9' }}>
                                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '14px', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>Nama Armada</th>
                                <th style={{ padding: '12px 15px', textAlign: 'right', fontSize: '14px', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>Tarif Sewa (12 Jam / Fullday)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {denganSopirCars.map((car, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '12px 15px', fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>{car.name}</td>
                                    <td style={{ padding: '12px 15px', fontSize: '15px', textAlign: 'right', color: '#0f172a' }}>{car.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '20px', fontSize: '13px', color: '#475569', lineHeight: '1.6', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 800, color: '#0f172a' }}>CATATAN PENTING:</p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>Untuk sewa Lepas Kunci wajib menjaminkan sepeda motor & STNK atas nama pribadi (khusus domisili Yogyakarta).</li>
                        <li>Harga Sewa Dengan Sopir berlaku untuk rute dalam Kota Yogyakarta (City Tour). Untuk luar kota dikenakan tarif tambahan.</li>
                        <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, terutama saat masa *High Season* (Lebaran, Natal, Tahun Baru).</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
