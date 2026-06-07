"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// --- DATA: Itineraries & Rates ---
const tourItineraries: Record<string, any> = {
    'Paket A': { name: 'Paket A: Borobudur, VW Tour & Prambanan', destinations: 'Candi Borobudur, VW Safari Tour, Kopi Klothok, Candi Prambanan.', timeline: [ { time: '07:00', text: 'Penjemputan di Stasiun/Hotel area Jogja kota.' }, { time: '08:30', text: 'Tiba di Candi Borobudur (Eksplorasi stupa & arsitektur candi).' }, { time: '11:30', text: 'Wisata keliling pedesaan Borobudur menaiki VW Safari Tour.' }, { time: '13:00', text: 'Makan siang di Kopi Klothok Kaliurang.' }, { time: '14:30', text: 'Menjelajahi keindahan Candi Prambanan.' }, { time: '17:30', text: 'Perjalanan kembali dan pengantaran pulang (drop-off).' } ] },
    'Paket B': { name: 'Paket B: Candi & Volcano Adventure', destinations: 'Candi Borobudur, Lavatour Merapi, Kopi Klothok, Candi Prambanan.', timeline: [ { time: '07:00', text: 'Penjemputan di Stasiun/Hotel area Jogja kota.' }, { time: '08:30', text: 'Menuju Candi Borobudur untuk melihat situs warisan dunia UNESCO.' }, { time: '11:30', text: 'Menuju Kaliurang untuk wisata Jeep Lava Tour Merapi.' }, { time: '13:30', text: 'Makan siang masakan lodeh khas di Kopi Klothok.' }, { time: '15:30', text: 'Mengunjungi megahnya Candi Hindu Candi Prambanan.' }, { time: '18:00', text: 'Kembali ke Jogja kota & drop-off.' } ] },
    'Paket C': { name: 'Paket C: Volcano, Sand Dunes & Sea View', destinations: 'Lavatour Merapi, Kopi Klothok, Gumukpasir, Obelix Sea View.', timeline: [ { time: '07:00', text: 'Penjemputan di titik penjemputan Jogja.' }, { time: '08:00', text: 'Lava Tour Merapi dengan Jeep Merapi.' }, { time: '11:00', text: 'Makan siang ndeso di Kopi Klothok Cangkringan.' }, { time: '14:00', text: 'Bermain sandboarding di Gumuk Pasir Parangtritis.' }, { time: '16:30', text: 'Menikmati sunset spektakuler dan makan malam di Obelix Sea View.' }, { time: '19:30', text: 'Drop-off kembali ke hotel/stasiun.' } ] },
    'Paket D': { name: 'Paket D: Prambanan, Pines & Ocean Sunset', destinations: 'Candi Prambanan, Hutan Pinus, Gumukpasir, Obelix Sea View.', timeline: [ { time: '07:30', text: 'Penjemputan di area Jogja kota.' }, { time: '08:30', text: 'Eksplorasi mahakarya arsitektur Hindu di Candi Prambanan.' }, { time: '11:30', text: 'Menikmati kesejukan pinus Mangunan / Pinus Pengger.' }, { time: '14:30', text: 'Menuju Gumuk Pasir Parangtritis untuk spot foto gurun eksotis.' }, { time: '16:30', text: 'Menikmati sunset samudera romantis di Obelix Sea View.' }, { time: '19:30', text: 'Pengantaran kembali.' } ] },
    'Paket E': { name: 'Paket E: Kraton, Tamansari & Family Zoo', destinations: 'Keraton, Tamansari, Suraloka Zoo, Ibarbo Park.', timeline: [ { time: '08:00', text: 'Penjemputan di hotel/stasiun.' }, { time: '08:30', text: 'Belajar sejarah Kesultanan Yogyakarta di istana Keraton Jogja.' }, { time: '10:30', text: 'Mengunjungi kolam pemandian kerajaan di Taman Sari.' }, { time: '12:30', text: 'Makan siang kuliner lokal Jogja.' }, { time: '14:00', text: 'Berwisata edukasi keluarga berinteraksi dengan satwa di Suraloka Zoo.' }, { time: '16:30', text: 'Belanja oleh-oleh terlengkap Jogja di Ibarbo Park.' }, { time: '18:30', text: 'Pengantaran kembali ke stasiun/hotel.' } ] },
    'Paket F': { name: 'Paket F: Rock Coastline & Gesing Wonderland', destinations: 'On The Rock, Gesing Wonderland, Puncak Segoro, Obelix Sea View.', timeline: [ { time: '08:00', text: 'Penjemputan di area Jogja.' }, { time: '09:30', text: 'Menikmati keindahan tebing laut eksotis di On The Rock.' }, { time: '11:00', text: 'Menjelajah wahana foto dan jembatan kaca di Gesing Wonderland.' }, { time: '13:30', text: 'Makan siang seafood dengan view Samudera Hindia di tebing Puncak Segoro.' }, { time: '16:00', text: 'Menanti sunset premium bertabur lampu estetik di Obelix Sea View.' }, { time: '19:00', text: 'Perjalanan pulang menuju kota Jogja.' } ] },
    'Paket G': { name: 'Paket G: Bali van Jogja & Ocean Cliffs', destinations: 'Pantai Ngobaran, Gesing Wonderland, Puncak Segoro, Obelix Sea View.', timeline: [ { time: '08:00', text: 'Penjemputan di hotel.' }, { time: '09:30', text: 'Mengunjungi Pantai Ngobaran (pantai eksotis dengan arsitektur pura).' }, { time: '11:30', text: 'Mengunjungi spot wisata Gesing Wonderland.' }, { time: '13:30', text: 'Makan siang santai di Puncak Segoro.' }, { time: '16:00', text: 'Hunting sunset di Obelix Sea View.' }, { time: '19:00', text: 'Pengantaran kembali ke kota.' } ] },
    'Paket H': { name: 'Paket H: White Sands & Sea View Sunset', destinations: 'On The Rock, Pantai Sadranan, Pantai Slili, Obelix Sea View.', timeline: [ { time: '08:00', text: 'Penjemputan di lokasi Anda.' }, { time: '09:30', text: 'Spot foto pertama di tebing On The Rock Gunungkidul.' }, { time: '11:00', text: 'Bermain air, snorkeling, atau kano di pantai pasir putih Pantai Sadranan.' }, { time: '13:30', text: 'Makan siang santai di tepi pantai Pantai Slili.' }, { time: '16:00', text: 'Sunset dan makan malam romantis di Obelix Sea View.' }, { time: '19:00', text: 'Perjalanan kembali ke Jogja kota.' } ] },
    'Paket I': { name: 'Paket I: Timang Gondola & Cave Tubing', destinations: 'Pantai Timang, Goa Pindul, Pictniq Land.', timeline: [ { time: '07:00', text: 'Penjemputan pagi.' }, { time: '09:00', text: 'Uji adrenalin menyeberang pulau karang menaiki Gondola Pantai Timang.' }, { time: '13:00', text: 'Petualangan Cave Tubing Goa Pindul menyusuri sungai bawah tanah.' }, { time: '16:00', text: 'Bersantai menikmati senja di Pictniq Land.' }, { time: '18:30', text: 'Kembali menuju hotel/stasiun.' } ] },
    'Paket J': { name: 'Paket J: Menoreh, VW Heritage & Bukit Rhema', destinations: 'Tumpeng Menoreh, Vw Safari Tour, Candi Borobudur, Gereja Ayam.', timeline: [ { time: '04:00', text: 'Penjemputan subuh di hotel.' }, { time: '05:30', text: 'Menikmati sunrise dan keindahan alam Menoreh di Tumpeng Menoreh.' }, { time: '09:00', text: 'Menaiki mobil klasik VW Safari mengelilingi pedesaan Borobudur.' }, { time: '11:30', text: 'Menjelajah kawasan candi Buddha terbesar Candi Borobudur.' }, { time: '14:00', text: 'Melihat pemandangan bukit Menoreh dari Gereja Ayam (Bukit Rhema).' }, { time: '16:30', text: 'Drop-off pulang ke stasiun/hotel.' } ] },
    'Paket K': { name: 'Paket K: Pine Valley, Cave Tubing & Cliffs', destinations: 'Kebun Buah, Hutan Pinus, Goa Pindul, Pictniq Land.', timeline: [ { time: '07:30', text: 'Penjemputan.' }, { time: '08:30', text: 'Melihat pemandangan sungai berkelok di Kebun Buah Mangunan.' }, { time: '10:00', text: 'Menghirup udara segar di spot rindang Hutan Pinus Imogiri.' }, { time: '12:30', text: 'Aktivitas basah-basahan cave tubing menyusuri Goa Pindul.' }, { time: '15:30', text: 'Menikmati suasana piknik sore hari di Pictniq Land.' }, { time: '18:00', text: 'Drop-off kembali ke kota.' } ] },
    'Paket Dieng': { name: 'Paket Dieng: Sikunir Sunrise & Vulkanik', destinations: 'Puncak Sikunir, Kawah Sikidang, Candi Arjuna, Gardu Pandang Tieng.', timeline: [ { time: '00:00', text: 'Penjemputan tengah malam di area Yogyakarta.' }, { time: '04:00', text: 'Tiba di kawasan Dieng, persiapan trekking Puncak Sikunir.' }, { time: '07:30', text: 'Singgah di Gardu Pandang Tieng & sarapan pagi.' }, { time: '09:00', text: 'Eksplorasi letupan belerang aktif di Kawah Sikidang.' }, { time: '10:30', text: 'Mengunjungi kompleks candi Hindu tertua Candi Arjuna Dieng.' }, { time: '12:00', text: 'Makan siang dan perjalanan kembali pulang menuju Yogyakarta.' }, { time: '16:00', text: 'Tiba kembali di Kota Yogyakarta (drop-off).' } ] },
    'Kustom Rute': { name: 'Kustom Rute (Bebas Tentukan Tujuan Sendiri)', destinations: 'Rute destinasi kustom sesuai pilihan Anda (maksimal 4 tempat wisata Jogja & sekitarnya).', timeline: [ { time: '--:--', text: 'Penjemputan sesuai jam request Anda.' }, { time: 'Tour', text: 'Mengunjungi rute destinasi yang Anda cantumkan di kolom input.' }, { time: '12 Jam', text: 'Durasi total tour maksimal 12 jam pelayanan per hari.' }, { time: '--:--', text: 'Pengantaran kembali ke hotel / stasiun Jogja.' } ] }
};

const tourCarRatesByPackage: Record<string, Record<string, number>> = {
    'default': { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1300000, 'Hiace Premio': 1500000 },
    'Paket F': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 },
    'Paket G': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 },
    'Paket H': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 },
    'Paket I': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 },
    'Paket J': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 },
    'Paket K': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 },
    'Paket Dieng': { 'Avanza / Xenia Facelift': 800000, 'Avanza / Xenia FWD': 900000, 'Innova Reborn': 1000000, 'Hiace Commuter': 1500000, 'Hiace Premio': 1700000 }
};

const getTourCarRate = (wisata: string, car: string) => {
    const pkgRates = tourCarRatesByPackage[wisata] || tourCarRatesByPackage['default'];
    return pkgRates[car] || 600000; // Fallback
};

const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num).replace('IDR', 'Rp');
};

function PesanWisataInner() {
    const searchParams = useSearchParams();
    
    const [nama, setNama] = useState('');
    const [wa1, setWa1] = useState('');
    const [wa2, setWa2] = useState('');
    const [paket, setPaket] = useState('Paket A');
    const [mobil, setMobil] = useState('Avanza / Xenia Facelift');
    const [kustomRute, setKustomRute] = useState('');
    const [tglMulai, setTglMulai] = useState('');
    const [jamMulai, setJamMulai] = useState('08:00');
    const [durasi, setDurasi] = useState(1);
    const [alamatJemput, setAlamatJemput] = useState('');
    const [catatan, setCatatan] = useState('');
    const [layananTambahan, setLayananTambahan] = useState('');

    useEffect(() => {
        const wisataParam = searchParams.get('wisata');
        const mobilParam = searchParams.get('mobil');
        if (wisataParam) setPaket(wisataParam);
        if (mobilParam) setMobil(mobilParam);
        
        // Set tomorrow default
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTglMulai(tomorrow.toISOString().split('T')[0]);
    }, [searchParams]);

    const baseRate = getTourCarRate(paket, mobil);
    const mobilTotal = baseRate * durasi;
    const grandTotal = mobilTotal;
    const dp = grandTotal * 0.3;

    const itinerary = tourItineraries[paket] || tourItineraries['Kustom Rute'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let text = `*FORM PEMESANAN - SEWA MOBIL PAKET WISATA*\nAksara Transport Yogyakarta\n\n`;
        text += `*Data Pelanggan:*\n- Nama: ${nama}\n- WA 1: ${wa1}\n- WA 2: ${wa2}\n\n`;
        text += `*Detail Tour:*\n- Paket: ${paket}\n- Mobil: ${mobil}\n- Penjemputan: ${tglMulai} ${jamMulai} WIB\n- Durasi: ${durasi} Hari\n- Lokasi Jemput: ${alamatJemput}\n\n`;
        
        if (paket === 'Kustom Rute') {
            text += `*Rute Kustom:*\n${kustomRute}\n\n`;
        }

        if (layananTambahan) text += `*Layanan Tambahan:*\n${layananTambahan}\n\n`;

        if (catatan) text += `*Catatan:*\n${catatan}\n\n`;

        text += `*TOTAL TARIF:* ${formatRupiah(grandTotal)}\n`;
        text += `*ESTIMASI DP (30%):* ${formatRupiah(dp)}\n\n`;
        text += `Mohon ketersediaan armada dikonfirmasi.`;

        try {
            const { supabase } = await import('@/utils/supabase/client');
            const { data, error } = await supabase.from('bookings').insert([{
                nama: nama,
                wa_utama: wa1,
                wa_cadangan: wa2,
                tipe_layanan: '1-Day Tour',
                mobil: mobil,
                paket: paket,
                durasi_hari: durasi,
                tgl_mulai: tglMulai,
                jam_mulai: jamMulai,
                alamat_jemput: alamatJemput,
                rute_destinasi: paket === 'Kustom Rute' ? kustomRute : undefined,
                catatan: catatan + (layananTambahan ? `\n\nLayanan Tambahan:\n${layananTambahan}` : ''),
                harga_mobil: grandTotal,
                biaya_ekstra: 0,
                total_biaya: grandTotal,
                dp_biaya: dp
            }]).select('id').single();

            if (data && data.id) {
                text += `\n\nLihat Detail Pesanan Anda: ${window.location.origin}/detail-pesanan/${data.id}`;
                text += `\n\n====================\n[KHUSUS ADMIN AKSARA]\nKlik link di bawah ini untuk meng-ACC pesanan (LUNAS):\n${window.location.origin}/admin/acc?id=${data.id}`;
            } else {
                console.error('Supabase Error:', error);
                const encodedData = btoa(unescape(encodeURIComponent(text)));
                text += `\n\nLihat Detail Pesanan Anda: ${window.location.origin}/detail-pesanan?data=${encodedData}`;
            }
        } catch (err) {
            console.error('Failed to import or connect to supabase:', err);
            const encodedData = btoa(unescape(encodeURIComponent(text)));
            text += `\n\nLihat Detail Pesanan Anda: ${window.location.origin}/detail-pesanan?data=${encodedData}`;
        }

        window.open(`https://wa.me/628386000740?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <main>
            <section style={{ padding: '120px 0 50px 0', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Form Pemesanan - Paket Wisata</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Lengkapi formulir di bawah ini untuk pemesanan paket tour dengan driver + BBM.</p>
                </div>
            </section>

            <section style={{ backgroundColor: '#f8fafc', padding: '40px 0 80px 0' }}>
                <div className="container" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    
                    {/* LEFT FORM */}
                    <div style={{ flex: '1 1 600px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px' }}>Detail Perjalanan Wisata</h2>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Nama Lengkap</label>
                                <input type="text" value={nama} onChange={e => setNama(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>WhatsApp 1</label>
                                    <input type="tel" value={wa1} onChange={e => setWa1(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>WhatsApp 2</label>
                                    <input type="tel" value={wa2} onChange={e => setWa2(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Paket Wisata</label>
                                    <select value={paket} onChange={e => setPaket(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }}>
                                        {Object.keys(tourItineraries).map(pkg => (
                                            <option key={pkg} value={pkg}>{tourItineraries[pkg].name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Unit Mobil</label>
                                    <select value={mobil} onChange={e => setMobil(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }}>
                                        <option value="Avanza / Xenia Facelift">Avanza / Xenia Facelift</option>
                                        <option value="Avanza / Xenia FWD">Avanza / Xenia FWD</option>
                                        <option value="Innova Reborn">Innova Reborn</option>
                                        <option value="Hiace Commuter">Hiace Commuter</option>
                                        <option value="Hiace Premio">Hiace Premio</option>
                                    </select>
                                </div>
                            </div>

                            {paket === 'Kustom Rute' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Destinasi Kustom Wisata</label>
                                    <textarea value={kustomRute} onChange={e => setKustomRute(e.target.value)} required rows={3} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} />
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Tgl Penjemputan</label>
                                    <input type="date" value={tglMulai} onChange={e => setTglMulai(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Jam</label>
                                    <input type="time" value={jamMulai} onChange={e => setJamMulai(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Durasi (Hari)</label>
                                    <input type="number" min="1" value={durasi} onChange={e => setDurasi(parseInt(e.target.value))} required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Alamat Penjemputan</label>
                                <textarea value={alamatJemput} onChange={e => setAlamatJemput(e.target.value)} required rows={2} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} />
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
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Catatan Tambahan</label>
                                <textarea value={catatan} onChange={e => setCatatan(e.target.value)} rows={2} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid #e2e8f0', resize: 'vertical' }} />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: 'pointer', borderRadius: '6px' }}>
                                Proses Pemesanan via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div style={{ flex: '1 1 350px', position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Itinerary */}
                        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '5px' }}>{itinerary.name}</h3>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', background: '#f1f5f9', padding: '8px 12px', borderRadius: '4px', marginBottom: '20px' }}>
                                Destinasi: {itinerary.destinations}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {itinerary.timeline.map((t: any, i: number) => (
                                    <div key={i} style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
                                        <div style={{ fontWeight: 800, color: '#64748b', minWidth: '45px' }}>{t.time}</div>
                                        <div style={{ color: 'var(--text-dark)' }}>{t.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calculator */}
                        <div style={{ background: 'var(--primary)', color: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>Rincian Biaya Tour</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Paket Wisata</span> <strong>{paket}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Unit Mobil</span> <strong>{mobil}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Durasi</span> <strong>{durasi} Hari</strong>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '15px', marginTop: '5px', fontSize: '1.15rem', color: '#fff' }}>
                                    <strong>Total Biaya</strong> <strong style={{ color: 'var(--accent)' }}>{formatRupiah(grandTotal)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px', fontSize: '1.1rem', color: '#fff' }}>
                                    <span>Tanda Jadi / DP (30%)</span> <strong style={{ color: '#10b981' }}>{formatRupiah(dp)}</strong>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default function PesanWisataPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <PesanWisataInner />
        </Suspense>
    );
}
