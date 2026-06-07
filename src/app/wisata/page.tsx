"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// --- DATA: 1 Day Service ---
const oneDayPackages = [
    { id: 'Paket A', name: 'Paket A: Borobudur, VW Tour & Prambanan', badge: 'Borobudur & Prambanan', badgeBg: 'success', image: '/images/tour_borobudur.webp', desc: 'Perpaduan sejarah candi termegah dengan petualangan pedesaan asri naik mobil VW klasik.', destinations: 'Candi Borobudur, VW Safari Tour, Kopi Klothok, Candi Prambanan.' },
    { id: 'Paket B', name: 'Paket B: Candi & Volcano Adventure', badge: 'Borobudur & Merapi', badgeBg: 'success', image: '/images/tour_merapi.webp', desc: 'Mengunjungi warisan budaya candi Buddha dan menantang adrenalin dengan petualangan Jeep Merapi.', destinations: 'Candi Borobudur, Lavatour Merapi, Kopi Klothok, Candi Prambanan.' },
    { id: 'Paket C', name: 'Paket C: Volcano, Sand Dunes & Sea View', badge: 'Petualangan & Sunset', badgeColor: '#ffedd5', badgeText: '#ea580c', image: '/images/tour_sand_dunes.webp', desc: 'Petualangan lengkap dari dinginnya lereng Gunung Merapi hingga keindahan sunset tebing laut pantai selatan.', destinations: 'Lavatour Merapi, Kopi Klothok, Gumukpasir, Obelix Sea View.' },
    { id: 'Paket D', name: 'Paket D: Prambanan, Pines & Ocean Sunset', badge: 'Kombinasi Alam', badgeColor: '#fce7f3', badgeText: '#db2777', image: '/images/tour_pines_sunset.webp', desc: 'Menyusuri mahakarya candi Hindu kuno, kesejukan hutan pinus, hingga pasir putih dan tebing samudera.', destinations: 'Candi Prambanan, Hutan Pinus, Gumukpasir, Obelix Sea View.' },
    { id: 'Paket E', name: 'Paket E: Kraton, Tamansari & Family Zoo', badge: 'Heritage & Family', badgeBg: 'success', image: '/images/tour_city.webp', desc: 'Wisata ramah keluarga melintasi warisan budaya kerajaan Jogja hingga kebun binatang interaktif.', destinations: 'Keraton, Tamansari, Suraloka Zoo, Ibarbo Park.' },
    { id: 'Paket F', name: 'Paket F: Rock Coastline & Wonderland', badge: 'Gunungkidul Ocean', badgeColor: '#e0f2fe', badgeText: '#0369a1', image: '/images/tour_rock_coastline.webp', desc: 'Petualangan menyusuri jajaran destinasi pesisir pantai Gunungkidul yang berkarang megah dan modern.', destinations: 'On The Rock, Gesing Wonderland, Puncak Segoro, Obelix Sea View.' },
    { id: 'Paket G', name: 'Paket G: Bali van Jogja & Ocean Cliffs', badge: 'Pura & Pantai', badgeColor: '#e0f2fe', badgeText: '#0369a1', image: '/images/tour_ngobaran_bali.webp', desc: 'Menikmati sensasi pura eksotis di bibir tebing laut layaknya Bali, berpadu keindahan pantai selatan.', destinations: 'Pantai Ngobaran, Gesing Wonderland, Puncak Segoro, Obelix Sea View.' },
    { id: 'Paket H', name: 'Paket H: White Sands & Sea View Sunset', badge: 'Pantai Pasir Putih', badgeColor: '#e0f2fe', badgeText: '#0369a1', image: '/images/tour_white_sands.webp', desc: 'Petualangan menyusuri pantai pasir putih Gunungkidul yang berair jernih, dilanjut bersantai di atas tebing.', destinations: 'On The Rock, Pantai Sadranan, Pantai Slili, Obelix Sea View.' },
    { id: 'Paket I', name: 'Paket I: Timang Gondola & Cave Tubing', badge: 'Petualangan Ekstrim', badgeColor: '#ffedd5', badgeText: '#ea580c', image: '/images/tour_timang_gondola.webp', desc: 'Uji nyali menaiki kereta gantung kayu tradisional ke pulau karang laut, digabung serunya susur goa basah.', destinations: 'Pantai Timang, Goa Pindul, Pictniq Land.' },
    { id: 'Paket J', name: 'Paket J: Menoreh, VW Heritage & Bukit Rhema', badge: 'Borobudur & Menoreh', badgeBg: 'success', image: '/images/tour_menoreh_vw.webp', desc: 'Melihat lanskap pegunungan Menoreh yang menawan, dilanjut keliling desa Borobudur naik VW klasik.', destinations: 'Tumpeng Menoreh, Vw Safari Tour, Candi Borobudur, Gereja Ayam.' },
    { id: 'Paket K', name: 'Paket K: Pine Valley, Cave Tubing & Cliffs', badge: 'Mangunan & Goa', badgeBg: 'success', image: '/images/tour_cave_tubing.webp', desc: 'Merasakan embun pagi bukit buah, ketenangan jajaran pohon pinus tinggi, hingga petualangan sungai bawah tanah.', destinations: 'Kebun Buah, Hutan Pinus, Goa Pindul, Pictniq Land.' },
    { id: 'Paket Dieng', name: 'Paket Dieng: Sikunir Sunrise & Vulkanik', badge: 'Negeri Di Atas Awan', badgeColor: '#ffedd5', badgeText: '#ea580c', image: '/images/tour_dieng_sunrise.webp', desc: 'Mengunjungi dataran tinggi Dieng yang berselimut kabut, melihat kawah aktif, dan menikmati golden sunrise tercantik.', destinations: 'Puncak Sikunir, Kawah Sikidang, Candi Arjuna, Gardu Pandang Tieng.', isDieng: true }
];

// --- PRICING LOGIC ---
const getCarRates = (packageId: string) => {
    let rates = { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1300000, 'Hiace Premio': 1500000 };
    if (['Paket F', 'Paket G', 'Paket H', 'Paket I', 'Paket J', 'Paket K'].includes(packageId)) {
        rates = { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1550000 };
    } else if (packageId === 'Paket Dieng') {
        rates = { 'Avanza / Xenia Facelift': 800000, 'Avanza / Xenia FWD': 900000, 'Innova Reborn': 1000000, 'Hiace Commuter': 1500000, 'Hiace Premio': 1700000 };
    }
    return rates;
};

const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num).replace('IDR', 'Rp');
};

const cars = [
    { id: 'Avanza / Xenia Facelift', name: 'Avanza / Xenia Facelift', image: '/images/toyota_avanza_facelift.webp', cap: '1-6 Pax' },
    { id: 'Avanza / Xenia FWD', name: 'Avanza / Xenia FWD', image: '/images/toyota_avanza_fwd.webp', cap: '1-6 Pax' },
    { id: 'Innova Reborn', name: 'Innova Reborn', image: '/images/innova_reborn.webp', cap: '1-7 Pax' },
    { id: 'Hiace Commuter', name: 'Hiace Commuter', image: '/images/toyota_hiace_commuter.webp', cap: '1-14 Pax' },
    { id: 'Hiace Premio', name: 'Hiace Premio', image: '/images/toyota_hiace_premio.webp', cap: '1-14 Pax' }
];

const specialCars = [
    { name: 'Honda Brio Matic', capacity: '1-4 Pax', price: 450000, img: '/images/honda_brio.webp' },
    { name: 'Avanza / Xenia Facelift', capacity: '1-6 Pax', price: 550000, img: '/images/toyota_avanza_facelift.webp' },
    { name: 'Avanza / Xenia FWD', capacity: '1-6 Pax', price: 650000, img: '/images/toyota_avanza_fwd.webp' },
    { name: 'Xpander', capacity: '1-6 Pax', price: 700000, img: '/images/mitsubishi_xpander.webp' },
    { name: 'Innova Reborn', capacity: '1-7 Pax', price: 750000, img: '/images/innova_reborn.webp' },
    { name: 'Innova Zenix', capacity: '1-7 Pax', price: 1000000, img: '/images/toyota_innova_zenix.webp' },
    { name: 'Fortuner', capacity: '1-7 Pax', price: 1500000, img: '/images/toyota_fortuner.webp' },
    { name: 'Pajero', capacity: '1-7 Pax', price: 1500000, img: '/images/mitsubishi_pajero.webp' },
    { name: 'Alphard Facelift', capacity: '1-7 Pax', price: 2899000, img: '/images/toyota_alphard.webp' },
    { name: 'Alphard HEV', capacity: '1-7 Pax', price: 3899999, img: '/images/toyota_alphard_hev.webp' },
    { name: 'Hiace Commuter', capacity: '1-14 Pax', price: 1100000, img: '/images/toyota_hiace_commuter.webp' },
    { name: 'Hiace Premio', capacity: '1-14 Pax', price: 1400000, img: '/images/toyota_hiace_premio.webp' },
    { name: 'Elf Long', capacity: '1-19 Pax', price: 1500000, img: '/images/elf_long.webp' }
];

function WisataInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tabParam = searchParams.get('tab') || '1day';
    const [activeTab, setActiveTab] = useState(tabParam);
    
    // 1-Day State
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Multi-Day State
    const [multiDayDays, setMultiDayDays] = useState(0);
    const [showMultiDayPackagesModal, setShowMultiDayPackagesModal] = useState(false);
    const [selectedMultiDayPackages, setSelectedMultiDayPackages] = useState<string[]>([]);
    const [showMultiDayCarModal, setShowMultiDayCarModal] = useState(false);

    // Special Modal State
    const [specialPackage, setSpecialPackage] = useState<'Wisuda' | 'Wedding' | null>(null);
    const [showSpecialModal, setShowSpecialModal] = useState(false);

    useEffect(() => {
        if (searchParams.get('tab')) {
            setActiveTab(searchParams.get('tab')!);
        }
    }, [searchParams]);

    // 1-Day Handlers
    const handleSelectPackage = (pkgId: string) => {
        if (pkgId === 'Kustom Rute') {
            router.push('/kontak?layanan=Kustom+Rute');
        } else {
            setSelectedPackage(pkgId);
            setShowModal(true);
        }
    };
    const handleSelectCar = (carId: string) => {
        router.push(`/pesan-wisata?wisata=${encodeURIComponent(selectedPackage || '')}&mobil=${encodeURIComponent(carId)}`);
    };

    // Multi-Day Handlers
    const startMultiDay = (days: number) => {
        setMultiDayDays(days);
        setSelectedMultiDayPackages([]);
        setShowMultiDayPackagesModal(true);
    };

    const toggleMultiDayPackage = (pkgId: string) => {
        setSelectedMultiDayPackages(prev => {
            if (prev.includes(pkgId)) return prev.filter(p => p !== pkgId);
            if (prev.length >= multiDayDays) {
                alert(`Maksimal memilih ${multiDayDays} paket.`);
                return prev;
            }
            return [...prev, pkgId];
        });
    };

    const confirmMultiDayPackages = () => {
        if (selectedMultiDayPackages.length !== multiDayDays) {
            alert(`Silakan pilih tepat ${multiDayDays} paket wisata.`);
            return;
        }
        setShowMultiDayPackagesModal(false);
        setShowMultiDayCarModal(true);
    };

    const getMultiDayCarPrice = (carId: string) => {
        let total = 0;
        selectedMultiDayPackages.forEach(pkg => {
            const rates = getCarRates(pkg);
            total += rates[carId as keyof typeof rates] || 600000;
        });
        return total;
    };

    const handleSelectMultiDayCar = (carId: string) => {
        const pkgs = selectedMultiDayPackages.join(' | ');
        router.push(`/pesan-multiday?days=${multiDayDays}&mobil=${encodeURIComponent(carId)}&paket=${encodeURIComponent(pkgs)}`);
    };

    // Special Handlers (Wisuda/Wedding)
    const openSpecialModal = (type: 'Wisuda' | 'Wedding') => {
        setSpecialPackage(type);
        setShowSpecialModal(true);
    };

    const handleSelectSpecialCar = (carName: string) => {
        if (specialPackage === 'Wisuda') {
            router.push(`/pesan-wisuda?mobil=${encodeURIComponent(carName)}`);
        } else {
            router.push(`/pesan-wedding?mobil=${encodeURIComponent(carName)}`);
        }
    };

    return (
        <>
            <section className="hero" style={{ padding: '120px 0 60px 0', textAlign: 'center' }}>
                <div className="container">
                    <span className="badge badge-accent" style={{ marginBottom: '10px' }}>Jogja Tour Packages</span>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px', color: '#fff' }}>Paket Wisata Yogyakarta</h1>
                    <p style={{ color: '#cbd5e1', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        Lengkapi pengalaman perjalanan Anda di Yogyakarta dengan pilihan paket wisata menarik. Kami menyediakan unit mobil prima beserta supir berpengalaman yang siap mengantarkan Anda menyusuri destinasi favorit.
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="wisata-tab-nav" style={{ display: 'flex', width: 'fit-content', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto 40px auto', padding: '6px', background: '#f1f5f9', borderRadius: '50px', border: '1px solid #e2e8f0' }}>
                        {[
                            { id: '1day', label: '1 Day Service', count: 12 },
                            { id: 'multiday', label: 'Multi-Day (2–7 Hari)', count: 6 },
                            { id: 'wisuda', label: 'Wisuda & Wedding' },
                            { id: 'event', label: 'Event & Kerjasama' }
                        ].map(t => (
                            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', border: 'none', borderRadius: '50px', background: activeTab === t.id ? '#ffffff' : 'transparent', color: activeTab === t.id ? 'var(--primary)' : '#64748b', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', boxShadow: activeTab === t.id ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}>
                                {t.label}
                                {t.count && <span style={{ background: activeTab === t.id ? 'var(--primary)' : '#e2e8f0', color: activeTab === t.id ? '#ffffff' : '#475569', padding: '2px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700 }}>{t.count}</span>}
                            </button>
                        ))}
                    </div>

                    {activeTab === '1day' && (
                        <div className="wisata-tab-content" style={{ display: 'block', animation: 'fadeIn 0.3s ease' }}>
                            <div className="category-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>Paket 1 Day Service</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>Pilih paket wisata harian dengan driver + BBM. Maksimal 12 jam pelayanan per hari. Semua rute sudah dirancang optimal untuk pengalaman terbaik.</p>
                            </div>
                            <div className="wisata-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                                {oneDayPackages.map(pkg => (
                                    <div key={pkg.id} className="tour-card" style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}>
                                        <div className="tour-image-container" style={{ position: 'relative' }}>
                                            <span className={`badge ${pkg.badgeBg ? 'badge-'+pkg.badgeBg : ''} car-tag`} style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 2, ...(pkg.badgeColor ? {backgroundColor: pkg.badgeColor, color: pkg.badgeText} : {}) }}>{pkg.badge}</span>
                                            <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                                        </div>
                                        <div className="tour-details" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 className="tour-name" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '10px' }}>{pkg.name}</h3>
                                            <p className="tour-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{pkg.desc}</p>
                                            <ul className="tour-details-list" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '18px', marginBottom: '20px', lineHeight: 1.6 }}>
                                                <li><strong>Destinasi:</strong> {pkg.destinations}</li>
                                                <li><strong>Durasi:</strong> {pkg.isDieng ? 'Satu hari perjalanan khusus luar kota Jogja.' : 'Maksimal 12 Jam pelayanan dengan driver + BBM.'}</li>
                                            </ul>
                                            <div className="tour-pricing-footer" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                <div className="price-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Mulai Dari</span>
                                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>Rp 600.000<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}> / 12 jam</span></span>
                                                </div>
                                                <button onClick={() => handleSelectPackage(pkg.id)} className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', border: 'none', cursor: 'pointer', textAlign: 'center', fontWeight: 700 }}>Pesan Paket</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'multiday' && (
                        <div className="wisata-tab-content" style={{ display: 'block', animation: 'fadeIn 0.3s ease' }}>
                            <div className="category-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>Paket Multi-Day Service (2–7 Hari)</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>Nikmati perjalanan panjang menjelajahi Yogyakarta dan sekitarnya. Sewa mobil + driver fullday per hari dengan rute fleksibel sesuai keinginan Anda.</p>
                            </div>
                            <div className="wisata-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {[2, 3, 4, 5, 6, 7].map(d => (
                                    <div key={d} className="special-package-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--accent), #f59e0b, var(--accent))' }}></div>
                                        <img src={`/images/tour_${d}day.webp`} alt={`${d} Day Service`} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)', marginBottom: '16px' }} />
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>{d} Day Service</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>{d} hari penuh petualangan. Jelajahi destinasi pilihan Anda secara mendalam dan fleksibel.</p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left' }}>
                                            <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px dashed var(--border-color)' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> {d} hari fullday (maks. 12 jam/hari)</li>
                                            <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px dashed var(--border-color)' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> Driver + BBM termasuk</li>
                                            <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> Rute rekomendasi atau kustom</li>
                                        </ul>
                                        <button onClick={() => startMultiDay(d)} className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem', display: 'block', textAlign: 'center', border: 'none', cursor: 'pointer' }}>Pilih {d} Paket</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'wisuda' && (
                        <div className="wisata-tab-content" style={{ display: 'block', animation: 'fadeIn 0.3s ease' }}>
                            <div className="category-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>🎓 Paket Wisuda &amp; Wedding</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>Layanan rental mobil premium beserta driver profesional di Jogja, didedikasikan khusus untuk mendukung kelancaran mobilitas di hari spesial wisuda dan pernikahan Anda.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
                                {/* Wisuda */}
                                <div className="special-package-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '30px', textAlign: 'left', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--accent), #f59e0b, var(--accent))' }}></div>
                                    <img src="/images/paket_wisuda.png" alt="Paket Wisuda" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)', marginBottom: '20px', marginTop: '10px' }} />
                                    <h3 style={{ textAlign: 'center', fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>Paket Wisuda</h3>
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>Rayakan kelulusan dengan layanan penjemputan eksklusif. Driver siap standby selama acara berlangsung.</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left' }}>
                                        <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px dashed var(--border-color)' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> <strong>Sudah Termasuk:</strong> Mobil, Driver, BBM</li>
                                        <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px dashed var(--border-color)' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> <strong>Standby di Kampus:</strong> Ya</li>
                                    </ul>
                                    <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '20px' }}>Mulai dari Rp 450.000 <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 12 jam</small></div>
                                    <button onClick={() => openSpecialModal('Wisuda')} className="btn btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '14px', display: 'block', textAlign: 'center', border: 'none', cursor: 'pointer' }}>🎓 Pilih Mobil Wisuda</button>
                                </div>
                                {/* Wedding */}
                                <div className="special-package-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '30px', textAlign: 'left', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--accent), #f59e0b, var(--accent))' }}></div>
                                    <img src="/images/paket_wedding.png" alt="Paket Wedding" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)', marginBottom: '20px', marginTop: '10px' }} />
                                    <h3 style={{ textAlign: 'center', fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>Paket Wedding</h3>
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>Jadikan hari pernikahan lebih elegan. Layanan driver VIP siap membantu mobilitas pengantin seharian.</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left' }}>
                                        <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px dashed var(--border-color)' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> <strong>Sudah Termasuk:</strong> Mobil, Driver, BBM</li>
                                        <li style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px dashed var(--border-color)' }}><span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span> <strong>Layanan VIP:</strong> Driver rapi / jas</li>
                                    </ul>
                                    <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '20px' }}>Mulai dari Rp 800.000 <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 12 jam</small></div>
                                    <button onClick={() => openSpecialModal('Wedding')} className="btn btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '14px', display: 'block', textAlign: 'center', border: 'none', cursor: 'pointer' }}>💍 Pilih Mobil Wedding</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'event' && (
                        <div className="wisata-tab-content" style={{ display: 'block', animation: 'fadeIn 0.3s ease' }}>
                            <div className="category-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>Paket Kerjasama Event & Korporat</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>Sewa mobil event dan korporat di Yogyakarta dengan armada lengkap dan driver profesional. Layanan rental mobil borongan untuk dinas instansi pemerintah, gathering perusahaan, wisata rombongan, hingga pernikahan.</p>
                            </div>
                            <div className="wisata-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                                {[
                                    { id: 'dinas', name: 'Dinas Pemerintah', icon: '🏛️', desc: 'Layanan armada untuk kegiatan dinas, kunjungan kerja, dan inspeksi lapangan instansi pemerintah.', feats: ['Armada seragam tersedia', 'Driver berseragam rapi', 'Koordinator lapangan', 'Invoice resmi / kwitansi'] },
                                    { id: 'perusahaan', name: 'Event Perusahaan', icon: '🏢', desc: 'Solusi transportasi untuk outing kantor, gathering, team building, dan acara internal perusahaan.', feats: ['Multi-unit tersedia', 'Pilihan mobil fleksibel', 'Harga volume discount', 'Durasi fleksibel 1-7 hari'] },
                                    { id: 'rombongan', name: 'Wisata Rombongan', icon: '👥', desc: 'Sewa armada rombongan besar untuk wisata keluarga besar, reuni, atau grup komunitas.', feats: ['Kapasitas hingga ratusan orang', 'Mix unit: MPV + Hiace + Elf', 'Rute wisata customizable', 'Paket multi-hari tersedia'] }
                                ].map(evt => (
                                    <div key={evt.id} className="tour-card" style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '30px', textAlign: 'left', transition: 'all 0.3s' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{evt.icon}</div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '10px' }}>{evt.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>{evt.desc}</p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {evt.feats.map((f, i) => (
                                                <li key={i} style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: i === evt.feats.length - 1 ? 'none' : '1px dashed var(--border-color)' }}>
                                                    <span style={{ color: 'var(--success)' }}>✓</span> {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={`/pesan-event?layanan=${encodeURIComponent(evt.name)}`} className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', display: 'block', textAlign: 'center', marginTop: '20px', fontWeight: 700 }}>Pesan Event</Link>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ marginTop: '50px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '30px' }}>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '15px' }}>Syarat dan Ketentuan Paket Event & Korporat</h3>
                                <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                                    <li>Maksimal pembayaran pelunasan 7 hari setelah acara selesai dilaksanakan.</li>
                                    <li>DP (Tanda Jadi) minimal 30% pada saat konfirmasi pemesanan untuk mengamankan ketersediaan armada.</li>
                                    <li>Rute, destinasi, dan jadwal kegiatan harus disepakati oleh kedua belah pihak sebelum hari H pelaksaan.</li>
                                    <li>Pembatalan sepihak maksimal 3 hari sebelum acara dikenakan biaya kompensasi sebesar 50% dari total tagihan keseluruhan.</li>
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* MODAL PILIH MOBIL UNTUK 1 DAY SERVICE */}
            {showModal && selectedPackage && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '1000px', maxHeight: '90vh', borderRadius: 'var(--border-radius-md)', overflowY: 'auto', position: 'relative', padding: '30px' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✖</button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px', textAlign: 'center' }}>Pilih Mobil untuk {selectedPackage}</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                            {cars.map(car => {
                                const price = getCarRates(selectedPackage)[car.id as keyof ReturnType<typeof getCarRates>];
                                return (
                                    <div key={car.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <img src={car.image} alt={car.name} style={{ height: '80px', objectFit: 'contain', marginBottom: '10px' }} />
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 5px 0' }}>{car.name}</h4>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Kapasitas: {car.cap}</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '15px' }}>
                                            {formatRupiah(price)} <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 12 Jam</small>
                                        </div>
                                        <button onClick={() => handleSelectCar(car.id)} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginTop: 'auto', border: 'none', cursor: 'pointer' }}>Pilih & Lanjutkan</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL MULTI-DAY: PILIH PAKET */}
            {showMultiDayPackagesModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={(e) => { if (e.target === e.currentTarget) setShowMultiDayPackagesModal(false) }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '1100px', maxHeight: '90vh', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>Pilih {multiDayDays} Paket Wisata</h2>
                            <button onClick={() => setShowMultiDayPackagesModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✖</button>
                        </div>
                        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, background: '#f8fafc' }}>
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '20px' }}>Silakan pilih tepat {multiDayDays} paket (Anda sudah memilih {selectedMultiDayPackages.length}).</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                {oneDayPackages.map(pkg => (
                                    <div key={pkg.id} onClick={() => toggleMultiDayPackage(pkg.id)} style={{ background: '#fff', border: `2px solid ${selectedMultiDayPackages.includes(pkg.id) ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: 'var(--border-radius-md)', padding: '15px', cursor: 'pointer', position: 'relative', transition: 'all 0.2s', boxShadow: selectedMultiDayPackages.includes(pkg.id) ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none' }}>
                                        {selectedMultiDayPackages.includes(pkg.id) && (
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10 }}>✓</div>
                                        )}
                                        <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-dark)' }}>{pkg.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{pkg.destinations}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: '#fff', borderRadius: '0 0 var(--border-radius-md) var(--border-radius-md)' }}>
                            <button onClick={confirmMultiDayPackages} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', border: 'none', cursor: 'pointer' }}>Lanjutkan Pilih Kendaraan</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL MULTI-DAY: PILIH MOBIL */}
            {showMultiDayCarModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={(e) => { if (e.target === e.currentTarget) setShowMultiDayCarModal(false) }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '1000px', maxHeight: '90vh', borderRadius: 'var(--border-radius-md)', overflowY: 'auto', position: 'relative', padding: '30px' }}>
                        <button onClick={() => setShowMultiDayCarModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✖</button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '5px', textAlign: 'center' }}>Pilih Mobil Multi-Day</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '20px' }}>Total durasi: {multiDayDays} Hari</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                            {cars.map(car => {
                                const price = getMultiDayCarPrice(car.id);
                                return (
                                    <div key={car.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <img src={car.image} alt={car.name} style={{ height: '80px', objectFit: 'contain', marginBottom: '10px' }} />
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 5px 0' }}>{car.name}</h4>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Kapasitas: {car.cap}</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '15px' }}>
                                            {formatRupiah(price)} <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ {multiDayDays} Hari</small>
                                        </div>
                                        <button onClick={() => handleSelectMultiDayCar(car.id)} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginTop: 'auto', border: 'none', cursor: 'pointer' }}>Konfirmasi Pesanan</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL SPECIAL (WISUDA / WEDDING) */}
            {showSpecialModal && specialPackage && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={(e) => { if (e.target === e.currentTarget) setShowSpecialModal(false) }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '1000px', maxHeight: '90vh', borderRadius: 'var(--border-radius-md)', overflowY: 'auto', position: 'relative', padding: '30px' }}>
                        <button onClick={() => setShowSpecialModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✖</button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '5px', textAlign: 'center' }}>Pilih Kendaraan - <span style={{ color: 'var(--accent)' }}>Paket {specialPackage}</span></h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '20px' }}>Silakan pilih tipe mobil yang sesuai dengan kebutuhan kapasitas dan kenyamanan rombongan Anda (Harga Sewa + Sopir 12 Jam).</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                            {specialCars.map(car => (
                                <div key={car.name} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <img src={car.img} alt={car.name} style={{ height: '80px', objectFit: 'contain', marginBottom: '10px' }} />
                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 5px 0' }}>{car.name}</h4>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Kapasitas: {car.capacity}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '15px' }}>
                                        {formatRupiah(car.price)} <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 12 Jam</small>
                                    </div>
                                    <div style={{ textAlign: 'left', borderTop: '1px dashed var(--border-color)', paddingTop: '10px', margin: '8px 0 15px 0', width: '100%' }}>
                                        <ul style={{ paddingLeft: '15px', margin: 0, fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                            <li style={{ marginBottom: '4px' }}><strong>Termasuk:</strong> Mobil, Driver, & BBM (12 Jam).</li>
                                            <li><strong>Belum:</strong> Parkir, Tol, Makan Driver.</li>
                                        </ul>
                                    </div>
                                    <button onClick={() => handleSelectSpecialCar(car.name)} className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginTop: 'auto', border: 'none', cursor: 'pointer' }}>Pilih & Lanjutkan</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function CatalogWisata() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <WisataInner />
        </Suspense>
    );
}
