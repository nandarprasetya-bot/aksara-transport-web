"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const [supir, setSupir] = useState('lepas-kunci');
    const [tanggal, setTanggal] = useState('');
    const [tanggalSelesai, setTanggalSelesai] = useState('');
    const [mobilInput, setMobilInput] = useState('');

    // Fleet Filter State
    const [selectedCategory, setSelectedCategory] = useState('all');

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Detail Modal State
    const [selectedModalCar, setSelectedModalCar] = useState<any>(null);

    const [showStickyCta, setShowStickyCta] = useState(false);

    // Gallery States
    const [activeGalleryTab, setActiveGalleryTab] = useState('all');
    const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowStickyCta(true);
            } else {
                setShowStickyCta(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize dates
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatLocal = (d: Date) => {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        setTanggal(formatLocal(today));
        setTanggalSelesai(formatLocal(tomorrow));
    }, []);

    // Handle date changes
    const handleTanggalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startVal = e.target.value;
        setTanggal(startVal);
        const start = new Date(startVal);
        const end = new Date(tanggalSelesai);
        if (end < start) {
            const newEnd = new Date(start);
            newEnd.setDate(newEnd.getDate() + 1);
            setTanggalSelesai(newEnd.toISOString().split('T')[0]);
        }
    };

    const handleTanggalSelesaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endVal = e.target.value;
        setTanggalSelesai(endVal);
    };



    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceLabel = supir === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Sopir)' : 'Dengan Sopir (Driver + BBM)';
        
        const textMessage = `*Cek Ketersediaan Sewa Mobil - Aksara Transport*
--------------------------------------------

Halo Aksara Transport, saya ingin menanyakan ketersediaan rental mobil dengan detail berikut:

• *Jenis/Tipe Mobil:* ${mobilInput || 'Semua Tipe'}
• *Layanan:* ${serviceLabel}
• *Tanggal Sewa:* ${tanggal} s.d. ${tanggalSelesai}

Mohon informasi ketersediaan unit dan tarifnya. Terima kasih!`;

        window.open(`https://wa.me/628386000740?text=${encodeURIComponent(textMessage)}`, '_blank');
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Popular local cars array for homepage with clear URL routing, description and specifications
    const popularCars = [
        {
            id: 'brio',
            name: 'Honda Brio Matic',
            category: 'city',
            seats: 5,
            trans: 'Automatic',
            fuel: 'Bensin',
            image: '/images/honda_brio.webp',
            tag: 'Laris',
            desc: 'Honda Brio adalah opsi sewa mobil perkotaan (city car) yang irit, gesit, dan sangat mudah untuk bermanuver di jalanan Jogja yang padat. Favorit utama wisatawan berdua atau keluarga kecil.',
            features: ['AC Dingin Sejuk', '5 Kursi Nyaman', 'Kabin Compact', 'Mesin 1200 CC Irit', 'Audio System'],
            routes: [
                { route: 'Pusat Kota Jogja (Malioboro/Keraton)', reason: 'Sangat mudah diparkir di area jalanan sempit khas pusat kota.' },
                { route: 'Kulineran Jogja', reason: 'Sangat irit bahan bakar untuk rute stop-and-go.' }
            ],
            priceLepasKunci: 'Rp 275.000',
            priceLepasKunciUnit: '/12j',
            priceDenganSopir: 'Rp 450.000',
            priceDenganSopirUnit: '/12j',
            waMessageLepasKunci: 'Halo Aksara Transport, saya ingin booking unit LEPAS KUNCI Honda Brio Matic.',
            waMessageDenganSopir: 'Halo Aksara Transport, saya ingin booking unit DENGAN SOPIR Honda Brio Matic.'
        },
        {
            id: 'avanza',
            name: 'Toyota Avanza Facelift',
            category: 'family',
            seats: 7,
            trans: 'Manual / Matic',
            fuel: 'Bensin',
            image: '/images/toyota_avanza.webp',
            tag: 'Terpopuler',
            desc: 'Toyota Avanza adalah MPV andalan keluarga Indonesia yang sangat legendaris. Dilengkapi dengan kabin yang luas dan ground clearance tinggi, menjamin ketangguhan berkendara keliling Yogyakarta.',
            features: ['Double Blower AC', 'Kapasitas 7 Kursi', 'Bagasi Fleksibel', 'Mesin 1300 CC Kuat', 'Dual SRS Airbag'],
            routes: [
                { route: 'Candi Borobudur', reason: 'Kabin lapang membuat keluarga tetap nyaman selama perjalanan.' },
                { route: 'Lereng Gunung Merapi (Kaliurang)', reason: 'Mesin tangguh dengan penggerak roda yang handal di rute menanjak.' }
            ],
            priceLepasKunci: 'Rp 300.000',
            priceLepasKunciUnit: '/12j',
            priceDenganSopir: 'Rp 550.000',
            priceDenganSopirUnit: '/12j',
            waMessageLepasKunci: 'Halo Aksara Transport, saya ingin booking unit LEPAS KUNCI Toyota Avanza Facelift.',
            waMessageDenganSopir: 'Halo Aksara Transport, saya ingin booking unit DENGAN SOPIR Toyota Avanza Facelift.'
        },
        {
            id: 'binguo',
            name: 'Wuling Binguo EV',
            category: 'electric',
            seats: 4,
            trans: 'Automatic',
            fuel: 'Listrik',
            image: '/images/wuling_binguo.webp',
            tag: 'Eco Friendly',
            desc: 'Wuling Binguo EV menyajikan kenyamanan mobil listrik modern dengan desain eksterior retro-futuristik yang sangat stylish. Berkendara keliling Jogja dengan senyap, ramah lingkungan, dan hemat tanpa BBM.',
            features: ['Sistem Listrik Penuh (EV)', 'Kapasitas 4 Kursi', 'Bebas Polusi Udara', 'Jangkauan Baterai 333 KM', 'Smart Key'],
            routes: [
                { route: 'Heritage Tour (Taman Sari)', reason: 'Praktis dikendarai melintasi rute stop-and-go di gang bersejarah Jogja.' },
                { route: 'Heha Sky View', reason: 'Tampil modis dan sangat fotogenik di kawasan wisata instagramable.' }
            ],
            priceLepasKunci: 'Rp 500.000',
            priceLepasKunciUnit: '/hari',
            priceDenganSopir: 'Rp 700.000',
            priceDenganSopirUnit: '/hari',
            waMessageLepasKunci: 'Halo Aksara Transport, saya ingin booking unit LEPAS KUNCI Wuling Binguo EV.',
            waMessageDenganSopir: 'Halo Aksara Transport, saya ingin booking unit DENGAN SOPIR Wuling Binguo EV.'
        },
        {
            id: 'innova',
            name: 'Toyota Innova Reborn',
            category: 'family',
            seats: 7,
            trans: 'Automatic',
            fuel: 'Diesel',
            image: '/images/innova_reborn.webp',
            tag: 'Premium Family',
            desc: 'Toyota Innova Reborn menawarkan kemewahan berkendara dengan kenyamanan suspensi tingkat tinggi yang mampu meredam getaran sempurna. Pilihan utama untuk perjalanan keluarga eksklusif maupun bisnis.',
            features: ['AC Triple Blower', 'Kapasitas 7 Penumpang', 'Kabin Sangat Senyap & Luas', 'Mesin 2400 CC Turbo Diesel', 'Captain Seats'],
            routes: [
                { route: 'Wisata Pantai Gunungkidul', reason: 'Mesin diesel turbo sangat bertenaga melibas jalanan menanjak curam.' },
                { route: 'Perjalanan Bisnis VIP / Event Dinas', reason: 'Tampilan elegan memberikan kesan profesional untuk menyambut tamu.' }
            ],
            priceLepasKunci: 'Rp 550.000',
            priceLepasKunciUnit: '/hari',
            priceDenganSopir: 'Rp 750.000',
            priceDenganSopirUnit: '/12j',
            waMessageLepasKunci: 'Halo Aksara Transport, saya ingin booking unit LEPAS KUNCI Toyota Innova Reborn.',
            waMessageDenganSopir: 'Halo Aksara Transport, saya ingin booking unit DENGAN SOPIR Toyota Innova Reborn.'
        },
        {
            id: 'pajero',
            name: 'Mitsubishi Pajero Sport',
            category: 'suv',
            seats: 7,
            trans: 'Automatic',
            fuel: 'Diesel',
            image: '/images/mitsubishi_pajero.webp',
            tag: 'SUV Premium',
            desc: 'Mitsubishi Pajero Sport menyajikan tampilan tangguh berjiwa petualang dikombinasikan dengan kabin interior mewah. SUV premium ini sangat andal di segala medan rute wisata alam Yogyakarta.',
            features: ['Leather Luxury Seats', '7 Kursi Lapang', 'Gagah & Desain Sporty', 'Mesin 2400 CC MIVEC Diesel', 'Active Stability Control'],
            routes: [
                { route: 'Lava Tour Merapi (Kaliurang)', reason: 'Ground clearance tinggi sangat kokoh melintasi jalanan bebatuan lereng gunung.' },
                { route: 'Pantai Tersembunyi Gunungkidul', reason: 'Melaju tanpa ragu di jalanan berpasir kasar atau tanah berbatu terjal.' }
            ],
            priceLepasKunci: null,
            priceLepasKunciUnit: '',
            priceDenganSopir: 'Rp 1.500.000',
            priceDenganSopirUnit: '/12j',
            waMessageLepasKunci: '',
            waMessageDenganSopir: 'Halo Aksara Transport, saya ingin booking unit DENGAN SOPIR Mitsubishi Pajero Sport.'
        },
        {
            id: 'hiace',
            name: 'Toyota Hiace Premio',
            category: 'microbus',
            seats: 14,
            trans: 'Manual',
            fuel: 'Diesel',
            image: '/images/toyota_hiace_premio.webp',
            tag: 'Rombongan VIP',
            desc: 'Toyota Hiace Premio adalah pilihan minibus premium terbaik untuk perjalanan rombongan besar. Dengan kabin berplafon tinggi, suspensi empuk, dan penataan kursi yang ergonomis, memastikan kenyamanan seluruh rombongan.',
            features: ['AC Vent Individual tiap Kursi', 'Kapasitas 14 Penumpang', 'Kabin Sangat Luas & Tinggi', 'Mesin 2800 CC Bertenaga', 'Safety Hammer'],
            routes: [
                { route: 'Tour Rombongan Jogja-Solo', reason: 'Sangat efisien memuat rombongan besar keluarga atau rekan kantor dalam satu unit.' },
                { route: 'Gathering Kantor / Rombongan Wedding', reason: 'Meningkatkan kebersamaan yang hangat dalam kabin luas sepanjang perjalanan.' }
            ],
            priceLepasKunci: null,
            priceLepasKunciUnit: '',
            priceDenganSopir: 'Rp 1.400.000',
            priceDenganSopirUnit: '/12j',
            waMessageLepasKunci: '',
        }
    ];

    const galleryImages = [
        {
            src: '/images/gallery_vvip_1.webp',
            category: 'layanan',
            caption: 'Penyambutan VVIP Kaesang Pangarep bersama Tim Aksara Transport',
            tag: 'Layanan VVIP'
        },
        {
            src: '/images/gallery_trip_2.webp',
            category: 'trip',
            caption: 'Trip Wisata Seru VW Safari Borobudur bersama pelanggan setia',
            tag: 'Trip Wisata'
        },
        {
            src: '/images/gallery_driver_1.webp',
            category: 'layanan',
            caption: 'Pelayanan prima armada Innova Reborn bersama driver Aksara Transport',
            tag: 'Layanan Driver'
        },
        {
            src: '/images/gallery_trip_1.webp',
            category: 'trip',
            caption: 'Momen kebersamaan rombongan wisata keliling tempat hits Jogja',
            tag: 'Trip Wisata'
        }
    ];

    const filteredCars = selectedCategory === 'all' 
        ? popularCars 
        : popularCars.filter(car => car.category === selectedCategory);

    return (
        <>
            {/* HERO SECTION */}
            <section className="hero">
                <Image 
                    src="/images/hero_background.webp" 
                    alt="Latar Belakang Aksara Transport" 
                    fill 
                    priority 
                    style={{ objectFit: 'cover', zIndex: 0, opacity: 0.15 }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="home-hero-split">
                        
                        {/* Hero Left Content */}
                        <div className="hero-content" style={{ textAlign: 'left' }}>
                            <div className="hero-rating-badge">
                                <span>⭐ 4.9/5 Rating Pelanggan (1,200+ Trip)</span>
                            </div>
                            <h1 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '20px', color: '#ffffff' }}>
                                <span style={{ color: 'var(--accent)' }}>Sewa Mobil Terpercaya #1</span> di <span style={{ color: 'var(--accent)' }}>Yogyakarta</span> <br />
                                <span style={{ color: 'var(--accent)' }}>Lepas Kunci</span> atau <span style={{ color: 'var(--accent)' }}>Dengan Driver</span>
                            </h1>
                            <p style={{ fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '32px', maxWidth: '580px', lineHeight: 1.6 }}>
                                Sewa mobil murah & terpercaya di Yogyakarta. Menyediakan unit armada terbaru yang bersih, wangi, dan terawat. Bebas pilih sistem sewa lepas kunci atau didampingi driver profesional.
                            </p>

                            <div className="hero-buttons" style={{ justifyContent: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                                <Link href="/tentang" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', fontWeight: 700 }}>
                                    Syarat Rental Mobil ➔
                                </Link>
                                <a href="#galeri" className="btn btn-outline" style={{ color: 'var(--accent)', borderColor: 'rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.08)', fontWeight: 700 }}>
                                    ✓ 100% Foto Real &amp; Layanan ➔
                                </a>
                            </div>
                        </div>

                        {/* Hero Right Booking Card */}
                        <div className="modern-booking-card">
                            <div className="booking-tabs">
                                <button 
                                    type="button"
                                    className={`booking-tab ${supir === 'lepas-kunci' ? 'active' : ''}`}
                                    onClick={() => setSupir('lepas-kunci')}
                                >
                                    🚗 Lepas Kunci
                                </button>
                                <button 
                                    type="button"
                                    className={`booking-tab ${supir === 'dengan-sopir' ? 'active' : ''}`}
                                    onClick={() => setSupir('dengan-sopir')}
                                >
                                    👨‍✈️ Dengan Driver
                                </button>
                            </div>

                            <form className="booking-card-form" onSubmit={handleBookingSubmit}>
                                <div className="booking-field-group">
                                    <label htmlFor="car-input">Jenis Mobil Yang Dicari</label>
                                    <div className="booking-input-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
                                        <input 
                                            type="text" 
                                            id="car-input" 
                                            className="booking-input-control" 
                                            placeholder="Contoh: Honda Brio, Avanza, Innova..."
                                            value={mobilInput}
                                            onChange={(e) => setMobilInput(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="booking-field-group">
                                    <label htmlFor="start-date">Tanggal Mulai</label>
                                    <div className="booking-input-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        <input 
                                            type="date" 
                                            id="start-date" 
                                            className="booking-input-control" 
                                            value={tanggal} 
                                            onChange={handleTanggalChange} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="booking-field-group">
                                    <label htmlFor="end-date">Tanggal Selesai</label>
                                    <div className="booking-input-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        <input 
                                            type="date" 
                                            id="end-date" 
                                            className="booking-input-control" 
                                            value={tanggalSelesai} 
                                            onChange={handleTanggalSelesaiChange} 
                                            required 
                                        />
                                    </div>
                                </div>



                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontWeight: 800, fontSize: '1rem', marginTop: '10px' }}>
                                    Cek Ketersediaan
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Simple Benefit Boxes in Hero */}
                    <div className="hero-benefits-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', zIndex: 3, position: 'relative' }}>
                        <div className="hero-benefit-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{ background: 'rgba(249, 115, 22, 0.15)', color: 'var(--primary)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>Armada Prima &amp; Higienis</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>Dicuci bersih &amp; disinfeksi wangi setiap sebelum diserahkan ke pelanggan.</p>
                            </div>
                        </div>
                        <div className="hero-benefit-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{ background: 'rgba(249, 115, 22, 0.15)', color: 'var(--primary)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>Sopir Ramah &amp; Profesional</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>Driver berpengalaman yang menguasai rute jalanan &amp; objek wisata Jogja secara detail.</p>
                            </div>
                        </div>
                        <div className="hero-benefit-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{ background: 'rgba(249, 115, 22, 0.15)', color: 'var(--primary)', padding: '10px', borderRadius: '8px', flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>Tarif Murah &amp; Transparan</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>Harga sewa yang jujur dan transparan tanpa ada biaya tambahan tersembunyi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section-padding" style={{ backgroundColor: '#f8fafc', paddingTop: '100px', paddingBottom: '80px' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '40px' }}>
                        <span className="badge badge-accent">Kenapa Pilih Kami</span>
                        <h2 className="section-title" style={{ maxWidth: '800px', margin: '0 auto 15px auto', lineHeight: '1.25' }}>
                            Kenapa Ribuan Wisatawan Pilih Aksara Transport untuk Rental Mobil di Jogja?
                        </h2>
                    </div>

                    {/* SEO Description Paragraphs */}
                    <div style={{ maxWidth: '900px', margin: '0 auto 50px auto', color: '#475569', lineHeight: '1.8', fontSize: '1rem', textAlign: 'justify' }}>
                        <p style={{ marginBottom: '20px' }}>
                            <strong>Sewa mobil di Jogja</strong> adalah solusi transportasi terbaik untuk menikmati keindahan Yogyakarta tanpa batasan waktu dan rute. Di <strong>Aksara Transport</strong>, kami menyediakan armada <strong>rental mobil Jogja</strong> dengan pilihan terlengkap — dari City Car hingga Premium SUV dan Minibus — untuk kebutuhan wisata, bisnis, maupun keluarga.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Dengan pengalaman bertahun-tahun melayani ribuan pelanggan di seluruh wilayah Daerah Istimewa Yogyakarta, kami memahami apa yang Anda butuhkan: unit bersih dan terawat, harga transparan tanpa biaya tambahan tersembunyi, serta pelayanan CS yang responsif. Harga yang tertera adalah harga final.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Sebagai pusat <strong>rental mobil Yogyakarta</strong> yang telah beroperasi selama lebih dari satu dekade, Aksara Transport hadir melayani berbagai segmen: wisatawan domestik dan mancanegara, keluarga berlibur ke Borobudur dan Prambanan, delegasi bisnis yang butuh unit representatif, hingga masyarakat lokal untuk keperluan harian.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Layanan <strong>sewa mobil Yogyakarta</strong> kami tersedia dalam dua pilihan utama: <strong>lepas kunci (self drive)</strong> per 24 jam dengan syarat SIM A aktif dan KTP, atau paket <strong>dengan sopir</strong> berpengalaman yang hafal rute wisata Jogja. Keduanya bisa dipesan via WhatsApp — tidak perlu isi formulir atau antri di konter.
                        </p>
                        <p style={{ marginBottom: '0' }}>
                            Yang membedakan kami dari <em>rental mobil Jogja</em> lainnya: armada selalu dicuci, diperiksa kondisi mesin dan ban, serta disemprot pengharum sebelum diserahkan. Kami juga tidak menerapkan biaya jemput ke stasiun atau Bandara YIA untuk area dalam kota — layanan antar unit sudah termasuk dalam tarif sewa.
                        </p>
                    </div>

                    {/* Service Feature Grid */}
                    <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                        <Link href="/mobil?service=lepasKunci" className="feature-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', textAlign: 'left', padding: '24px', cursor: 'pointer', textDecoration: 'none' }}>
                            <div style={{ background: '#fef3c7', color: '#d97706', padding: '12px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"></path></svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-dark)' }}>Sewa Mobil Lepas Kunci</h3>
                                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>Self drive, bebas rute. Durasi 24 jam. Mulai Rp 250.000/hari.</p>
                            </div>
                        </Link>
                        <Link href="/mobil?service=denganSopir" className="feature-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', textAlign: 'left', padding: '24px', cursor: 'pointer', textDecoration: 'none' }}>
                            <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '12px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-dark)' }}>Sewa Mobil Dengan Sopir</h3>
                                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>Driver berpengalaman &amp; ramah. Paket 12 jam. Mulai Rp 550.000.</p>
                            </div>
                        </Link>
                        <Link href="/mobil?service=lepasKunci" className="feature-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', textAlign: 'left', padding: '24px', cursor: 'pointer', textDecoration: 'none' }}>
                            <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-dark)' }}>Sewa Mobil Listrik (EV)</h3>
                                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>IONIQ 5, BYD, Wuling Binguo. Modern &amp; zero emission.</p>
                            </div>
                        </Link>
                        <Link href="/mobil" className="feature-card" style={{ display: 'flex', gap: '16px', alignItems: 'center', textAlign: 'left', padding: '24px', cursor: 'pointer', textDecoration: 'none' }}>
                            <div style={{ background: '#f3e8ff', color: '#7e22ce', padding: '12px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-dark)' }}>Daftar Harga Lengkap</h3>
                                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>Lihat tabel harga semua kendaraan secara rinci &amp; transparan.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>



            {/* POPULAR VEHICLES SECTION WITH CATEGORIES FILTER */}
            <section className="section-padding fleet-section" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Armada Pilihan</span>
                        <h2 className="section-title">Pilihan Mobil Terpopuler</h2>
                        <p className="section-subtitle">Unit armada terbaru yang wangi, bersih, dan prima, siap disesuaikan dengan kebutuhan aktivitas berkendara Anda. Klik gambar untuk melihat spesifikasi detail unit.</p>
                    </div>

                    {/* Filter Bar Kategori Mobil */}
                    <div className="sticky-filter-bar">
                        <div className="filter-bar-container">
                            <button 
                                className={`filter-bar-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                Semua Mobil
                            </button>
                            <button 
                                className={`filter-bar-btn ${selectedCategory === 'city' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('city')}
                            >
                                City Car
                            </button>
                            <button 
                                className={`filter-bar-btn ${selectedCategory === 'family' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('family')}
                            >
                                Family MPV
                            </button>
                            <button 
                                className={`filter-bar-btn ${selectedCategory === 'suv' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('suv')}
                            >
                                Premium SUV
                            </button>
                            <button 
                                className={`filter-bar-btn ${selectedCategory === 'electric' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('electric')}
                            >
                                Mobil Listrik (EV)
                            </button>
                            <button 
                                className={`filter-bar-btn ${selectedCategory === 'microbus' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('microbus')}
                            >
                                Minibus / Group
                            </button>
                        </div>
                    </div>

                    <div className="cars-grid mobile-horizontal-scroll">
                        {filteredCars.map((car) => (
                            <div className="car-card premium-car-card" key={car.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="car-image-container clickable-car-image" onClick={() => setSelectedModalCar(car)}>
                                    <span className="badge badge-success car-tag">{car.tag}</span>
                                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                        <Image 
                                            src={car.image} 
                                            alt={`Sewa ${car.name} Murah Jogja`} 
                                            fill 
                                            style={{ objectFit: 'contain' }} 
                                            sizes="(max-width: 768px) 100vw, 33vw" 
                                        />
                                    </div>
                                    <span className="badge badge-accent" style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '0.65rem' }}>
                                        {car.fuel}
                                    </span>
                                </div>
                                <div className="car-details" style={{ textAlign: 'left', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 className="car-name" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{car.name}</h3>
                                    
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {car.desc}
                                    </p>

                                    <div className="car-specs" style={{ marginBottom: '16px' }}>
                                        <div className="spec-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                            <span>{car.seats} Kursi</span>
                                        </div>
                                        <div className="spec-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            <span>{car.trans}</span>
                                        </div>
                                    </div>

                                    {/* Dual Pricing Comparison Box */}
                                    <div className="beranda-price-compare" style={{ marginTop: 'auto' }}>
                                        <div className="beranda-price-box">
                                            <span className="beranda-price-label">Lepas Kunci</span>
                                            {car.priceLepasKunci ? (
                                                <span className="beranda-price-value">{car.priceLepasKunci}<span style={{ fontSize: '0.65rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{car.priceLepasKunciUnit}</span></span>
                                            ) : (
                                                <span className="beranda-price-na">Tidak Tersedia</span>
                                            )}
                                        </div>
                                        <div className="beranda-price-box">
                                            <span className="beranda-price-label">+ Driver + BBM</span>
                                            {car.priceDenganSopir ? (
                                                <span className="beranda-price-value">{car.priceDenganSopir}<span style={{ fontSize: '0.65rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{car.priceDenganSopirUnit}</span></span>
                                            ) : (
                                                <span className="beranda-price-na">Tidak Tersedia</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Double CTA Button Group */}
                                    <div className="beranda-cta-group">
                                        {car.priceLepasKunci ? (
                                            <a 
                                                href={`https://wa.me/628386000740?text=${encodeURIComponent(car.waMessageLepasKunci || '')}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="btn-wa-cta btn-wa-cta-lk"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                Pesan Lepas Kunci
                                            </a>
                                        ) : (
                                            <span className="btn-wa-cta btn-wa-cta-disabled">Lepas Kunci N/A</span>
                                        )}

                                        {car.priceDenganSopir ? (
                                            <a 
                                                href={`https://wa.me/628386000740?text=${encodeURIComponent(car.waMessageDenganSopir || '')}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="btn-wa-cta btn-wa-cta-ds"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                                Pesan + Driver + BBM
                                            </a>
                                        ) : (
                                            <span className="btn-wa-cta btn-wa-cta-disabled">Driver + BBM N/A</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center" style={{ marginTop: '50px' }}>
                        <Link href="/mobil" className="btn btn-secondary">Lihat Seluruh Armada</Link>
                    </div>
                </div>
            </section>

            {/* SPECIAL SERVICES PACKAGES */}
            <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Layanan Tambahan</span>
                        <h2 className="section-title">Paket Transportasi Spesial</h2>
                        <p className="section-subtitle">Selain rental reguler, kami juga menyediakan paket lengkap transportasi untuk momen spesial Anda.</p>
                    </div>
                    <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/tour_city.webp" alt="Paket Wisata Jogja" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <h3 style={{ marginTop: 0 }}>Paket Wisata Jogja</h3>
                                <p style={{ flex: 1, fontSize: '0.9rem', marginBottom: '20px' }}>Jelajahi keindahan tempat wisata hits di Yogyakarta tanpa repot. Sudah include armada, driver merangkap guide lokal, & bebas pilih destinasi sesukamu.</p>
                                <Link href="/wisata" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '0.95rem', fontWeight: 800 }}>Lihat Pilihan Wisata</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/paket_wedding.webp" alt="Mobil Pengantin VIP" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <h3 style={{ marginTop: 0 }}>Mobil Pengantin VIP</h3>
                                <p style={{ flex: 1, fontSize: '0.9rem', marginBottom: '20px' }}>Sempurnakan momen hari pernikahan bahagia Anda dengan rental mobil mewah elegan, lengkap dengan dekorasi bunga segar dan driver khusus berpakaian rapi.</p>
                                <Link href="/pesan-wedding" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '0.95rem', fontWeight: 800 }}>Pesan Wedding Car</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/paket_wisuda.webp" alt="Paket Wisuda Keluarga" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <h3 style={{ marginTop: 0 }}>Paket Wisuda Keluarga</h3>
                                <p style={{ flex: 1, fontSize: '0.9rem', marginBottom: '20px' }}>Hadirkan kemudahan transportasi bagi keluarga tercinta di hari kelulusan Anda. Tepat waktu, nyaman, kabin luas, dan driver yang sigap membantu.</p>
                                <Link href="/pesan-wisuda" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '0.95rem', fontWeight: 800 }}>Pesan Paket Wisuda</Link>
                            </div>
                        </div>
                        <div className="feature-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                                <Image src="/images/tour_2day.webp" alt="Antar Jemput Bandara YIA" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 25vw" />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                <h3 style={{ marginTop: 0 }}>Drop In/Out Bandara YIA</h3>
                                <p style={{ flex: 1, fontSize: '0.9rem', marginBottom: '20px' }}>Layanan antar-jemput cepat Bandara Internasional YIA (Yogyakarta) ke hotel atau sebaliknya. Harga all-in termasuk driver, BBM, tol, dan parkir.</p>
                                <a href="https://wa.me/628386000740?text=Halo%20Aksara%20Transport%2C%20saya%20tertarik%20pesan%20layanan%20Drop%20In%20/%20Out%20Bandara%20YIA" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 'auto', textAlign: 'center', padding: '12px 0', fontSize: '0.95rem', fontWeight: 800 }}>Pesan Drop Bandara</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Panduan</span>
                        <h2 className="section-title">4 Langkah Mudah Sewa Mobil</h2>
                        <p className="section-subtitle">Proses penyewaan armada di Aksara Transport sangat mudah dan cepat, kurang dari 10 menit saja.</p>
                    </div>
                    <div className="steps-grid mobile-horizontal-scroll">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h4>Pilih Unit Mobil</h4>
                            <p>Jelajahi halaman katalog kami dan pilih kendaraan yang paling sesuai untuk rencana aktivitas Anda.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h4>Isi Tanggal Sewa</h4>
                            <p>Lengkapi formulir tanggal sewa beserta durasi serta pilihan lepas kunci atau dengan sopir.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h4>Konfirmasi via WA</h4>
                            <p>Kirim detail data Anda. CS kami akan melakukan verifikasi berkas pendukung dalam hitungan menit.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h4>Serah Terima Unit</h4>
                            <p>Mobil siap dikirim langsung ke hotel, stasiun, rumah Anda, atau bisa diambil di kantor kami.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-success">Apa Kata Mereka</span>
                        <h2 className="section-title">Testimoni Pelanggan</h2>
                        <p className="section-subtitle">Ribuan pelanggan setia kami telah mempercayakan perjalanannya bersama Aksara Transport.</p>
                    </div>
                    <div className="features-grid mobile-horizontal-scroll" style={{ gap: '20px', marginTop: '40px' }}>
                        <div className="feature-card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#475569', fontSize: '0.925rem' }}>"Sewa mobil lepas kunci di Aksara Transport sangat praktis. Verifikasi datanya cepat, mobil Brio-nya bersih dan wangi. Menyetir keliling Jogja jadi sangat menyenangkan!"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--accent)' }}>B</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Budi Santoso</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Wisatawan Domestik</span>
                                </div>
                            </div>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#475569', fontSize: '0.925rem' }}>"Pakai layanan dengan driver untuk keliling pantai Gunungkidul. Driver-nya sangat sopan, sabar, dan hafal jalanan pintas menghindari macet akhir pekan."</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--accent)' }}>R</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Rina Melati</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Perjalanan Keluarga</span>
                                </div>
                            </div>
                        </div>
                        <div className="feature-card" style={{ textAlign: 'left', padding: '30px' }}>
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#475569', fontSize: '0.925rem' }}>"Invoice digital dikirim cepat untuk keperluan reimbursement kantor. Kondisi mobil Hiace Premio luar biasa nyaman dan bersih untuk operasional tim kami."</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--accent)' }}>A</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Andi Pratama</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Event Organizer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE SERVICE GALLERY SECTION */}
            <section id="galeri" className="section-padding gallery-section" style={{ backgroundColor: '#f1f5f9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '40px' }}>
                        <span className="badge badge-accent">Dokumentasi</span>
                        <h2 className="section-title">Galeri Pelayanan &amp; Aktivitas Real</h2>
                        <p className="section-subtitle">Melihat lebih dekat pelayanan prima, kesiapan armada, dan momen berharga bersama para pelanggan setia kami di Yogyakarta.</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="gallery-tabs-container" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '35px', flexWrap: 'wrap' }}>
                        <button 
                            className={`gallery-tab-btn ${activeGalleryTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveGalleryTab('all')}
                        >
                            Semua Dokumentasi
                        </button>
                        <button 
                            className={`gallery-tab-btn ${activeGalleryTab === 'layanan' ? 'active' : ''}`}
                            onClick={() => setActiveGalleryTab('layanan')}
                        >
                            Pelayanan &amp; VVIP
                        </button>
                        <button 
                            className={`gallery-tab-btn ${activeGalleryTab === 'trip' ? 'active' : ''}`}
                            onClick={() => setActiveGalleryTab('trip')}
                        >
                            Perjalanan Wisata
                        </button>
                    </div>

                    {/* Gallery Grid */}
                    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {galleryImages
                            .filter(img => activeGalleryTab === 'all' || img.category === activeGalleryTab)
                            .map((img, index) => (
                                <div 
                                    className="gallery-item-card" 
                                    key={index} 
                                    onClick={() => setActiveLightbox(img.src)}
                                    style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', position: 'relative', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', backgroundColor: '#ffffff', aspectRatio: '4/3' }}
                                >
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image 
                                            src={img.src} 
                                            alt={img.caption} 
                                            fill 
                                            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                            className="gallery-img-hover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                    <span className="gallery-item-tag">{img.tag}</span>
                                    <div className="gallery-item-overlay">
                                        <p className="gallery-item-caption">{img.caption}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* LIGHTBOX POPUP MODAL */}
            {activeLightbox && (
                <div 
                    className="lightbox-modal-overlay" 
                    onClick={() => setActiveLightbox(null)}
                >
                    <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="lightbox-close-btn" 
                            onClick={() => setActiveLightbox(null)}
                            aria-label="Tutup foto"
                        >
                            ✕
                        </button>
                        <div className="lightbox-image-wrapper" style={{ position: 'relative', width: '100%', height: '80vh' }}>
                            <Image 
                                src={activeLightbox} 
                                alt="Foto Dokumentasi Aksara Transport" 
                                fill 
                                style={{ objectFit: 'contain' }} 
                                sizes="90vw"
                            />
                        </div>
                        {(() => {
                            const found = galleryImages.find(img => img.src === activeLightbox);
                            return found ? <p className="lightbox-caption">{found.caption}</p> : null;
                        })()}
                    </div>
                </div>
            )}

            {/* SEO FAQ SECTION WITH INTERACTIVE ACCORDIONS */}
            <section className="section-padding faq-section" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="text-center">
                        <span className="badge badge-accent">Tanya Jawab</span>
                        <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
                        <p className="section-subtitle">Jawaban cepat seputar syarat penyewaan lepas kunci, biaya overtime, cakupan area, dan pembatalan sewa.</p>
                    </div>
                    
                    <div className="faq-container">
                        {[
                            {
                                q: "Apa saja syarat untuk sewa mobil lepas kunci?",
                                a: "Untuk rental mobil tanpa sopir (lepas kunci), Anda cukup melampirkan foto KTP asli, SIM A aktif, bukti reservasi tiket pesawat/kereta atau booking hotel tempat menginap di Jogja. CS kami akan melakukan survei singkat secara online untuk verifikasi dokumen."
                            },
                            {
                                q: "Apakah biaya sewa dengan driver sudah termasuk BBM, tol, dan parkir?",
                                a: "Tarif sewa dasar Dengan Sopir (Driver) sudah termasuk jasa sopir berpengalaman dan mobil. Namun biaya bahan bakar (BBM), tol, tiket parkir, serta konsumsi driver menjadi tanggung jawab penyewa. Anda juga dapat memilih Paket All-In (Mobil + Supir + BBM) jika tidak ingin repot."
                            },
                            {
                                q: "Bagaimana jika terjadi keterlambatan pengembalian unit sewa (overtime)?",
                                a: "Kami memberikan toleransi keterlambatan pengembalian hingga 1 jam. Keterlambatan lebih dari batas tersebut dikenakan biaya denda overtime sebesar 10% per jam dari harga sewa harian mobil bersangkutan. Keterlambatan melebihi 5 jam akan dihitung sebagai sewa tambahan 1 hari penuh."
                            },
                            {
                                q: "Apakah mobil boleh dibawa keluar daerah Yogyakarta?",
                                a: "Ya, kami memperbolehkan perjalanan luar kota (misalnya ke Jawa Tengah, Jawa Timur, dll). Untuk rental lepas kunci ke luar kota Jogja, minimal durasi penyewaan adalah 2 hari berturut-turut. Sangat disarankan menyewa dengan sopir demi faktor keamanan perjalanan jauh."
                            },
                            {
                                q: "Bagaimana kebijakan pembatalan (refund) sewa?",
                                a: "Pembatalan pesanan sebelum H-3 jadwal rental tidak dikenakan biaya denda (refund penuh/gratis pembatalan). Pembatalan pada H-2 hingga H-1 dikenakan denda sebesar 50% dari total biaya hari pertama. Sedangkan pembatalan pada hari H (no-show) dikenakan denda 100% dari total tagihan."
                            }
                        ].map((faq, index) => (
                            <div className={`faq-item ${openFaq === index ? 'active' : ''}`} key={index}>
                                <div className="faq-header" onClick={() => toggleFaq(index)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                                    <span>{faq.q}</span>
                                    <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                                <div className="faq-body" style={{ maxHeight: openFaq === index ? '500px' : '0', transition: 'max-height 0.3s ease-out', overflow: 'hidden' }}>
                                    <div className="faq-body-content" style={{ color: 'var(--text-muted)', paddingTop: '10px', fontSize: '0.925rem', lineHeight: '1.6' }}>
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DETAIL VEHICLE MODAL POPUP */}
            {selectedModalCar && (
                <div className="modal-overlay" onClick={() => setSelectedModalCar(null)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedModalCar(null)} aria-label="Tutup detail">✕</button>
                        <div className="modal-grid">
                            
                            {/* Left Column (Image & Price) */}
                            <div className="modal-left">
                                <div className="modal-img-wrapper">
                                    <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                        <Image 
                                            src={selectedModalCar.image} 
                                            alt={selectedModalCar.name} 
                                            fill 
                                            style={{ objectFit: 'contain' }}
                                            sizes="250px"
                                        />
                                    </div>
                                </div>
                                <div className="modal-price-box" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-light)' }}>
                                    {selectedModalCar.priceLepasKunci && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Lepas Kunci:</span>
                                            <strong style={{ color: 'var(--accent)' }}>{selectedModalCar.priceLepasKunci} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{selectedModalCar.priceLepasKunciUnit}</span></strong>
                                        </div>
                                    )}
                                    {selectedModalCar.priceDenganSopir && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem', paddingTop: '2px' }}>
                                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>+ Driver + BBM:</span>
                                            <strong style={{ color: 'var(--accent)' }}>{selectedModalCar.priceDenganSopir} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{selectedModalCar.priceDenganSopirUnit}</span></strong>
                                        </div>
                                    )}
                                </div>
                                {selectedModalCar.priceLepasKunci && (
                                    <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic', lineHeight: '1.4', textAlign: 'center' }}>
                                        * Note: Tarif Lepas Kunci dihitung per 12 Jam / 24 Jam. Silakan tanyakan syarat & ketentuan via WhatsApp.
                                    </p>
                                )}
                            </div>
                            
                            {/* Right Column (Details) */}
                            <div className="modal-right">
                                <h2>{selectedModalCar.name}</h2>
                                <div className="modal-tag-row">
                                    <span className="badge badge-success">{selectedModalCar.tag}</span>
                                    <span className="badge badge-accent">{selectedModalCar.seats} Kursi</span>
                                    <span className="badge badge-accent" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>{selectedModalCar.trans}</span>
                                    <span className="badge badge-accent" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>{selectedModalCar.fuel}</span>
                                </div>
                                
                                <div>
                                    <h3 className="modal-section-title">Detail Kendaraan</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                                        {selectedModalCar.desc}
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="modal-section-title">Fitur Kenyamanan &amp; Keselamatan</h3>
                                    <ul className="modal-feature-list">
                                        {selectedModalCar.features.map((feature: string, idx: number) => (
                                            <li className="modal-feature-item" key={idx}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="modal-section-title">Cocok untuk Rute Wisata:</h3>
                                    <ul className="modal-route-list">
                                        {selectedModalCar.routes.map((r: any, idx: number) => (
                                            <li className="modal-route-item" key={idx}>
                                                <strong>• {r.route}:</strong> {r.reason}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '15px' }}>
                                    {selectedModalCar.priceLepasKunci && (
                                        <a 
                                            href={`https://wa.me/628386000740?text=${encodeURIComponent(selectedModalCar.waMessageLepasKunci)}`}
                                            target="_blank" 
                                            rel="noopener" 
                                            className="btn btn-success" 
                                            style={{ width: '100%', padding: '12px', fontSize: '0.9rem', fontWeight: 800, display: 'flex', justifyContent: 'center', backgroundColor: 'var(--success)' }}
                                        >
                                            Pesan Lepas Kunci via WA
                                        </a>
                                    )}
                                    {selectedModalCar.priceDenganSopir && (
                                        <a 
                                            href={`https://wa.me/628386000740?text=${encodeURIComponent(selectedModalCar.waMessageDenganSopir)}`}
                                            target="_blank" 
                                            rel="noopener" 
                                            className="btn btn-primary" 
                                            style={{ width: '100%', padding: '12px', fontSize: '0.9rem', fontWeight: 800, display: 'flex', justifyContent: 'center' }}
                                        >
                                            Pesan + Driver + BBM via WA
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* STICKY MOBILE BOTTOM CTA BAR */}
            <div className={`sticky-mobile-cta ${showStickyCta ? 'visible' : ''}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>Tanya Ketersediaan</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>Aksara Transport</span>
                </div>
                <a 
                    href="https://wa.me/628386000740?text=Halo%20Aksara%20Transport%2C%20saya%20tertarik%20tanya%20sewa%20mobil%20di%20Jogja."
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Pesan via WA
                </a>
            </div>
        </>
    );
}
