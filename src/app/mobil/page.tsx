"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const lepasKunciCars = [
    { 
        id: 'agya', 
        name: 'Toyota Agya', 
        category: 'city', 
        image: '/images/toyota_agya.webp', 
        badge: 'Hemat', 
        seats: 5, 
        trans: 'Manual / Matic', 
        rates: [
            { label: '12 Jam', price: 'Rp 275.000' }, 
            { label: '24 Jam', price: 'Rp 325.000' }, 
            { label: 'Fullday', price: 'Rp 325.000' }
        ], 
        startPrice: 'Rp 275.000', 
        queryName: 'Toyota+Agya',
        desc: 'Toyota Agya adalah city car praktis yang sangat irit bensin, lincah, dan mudah diparkir di area perkotaan Yogyakarta.',
        features: ['AC Dingin Sejuk', '5 Kursi Nyaman', 'Kabin Bersih', 'Mesin Irit BBM', 'Sistem Audio'],
        routes: [
            { route: 'Kawasan Malioboro', reason: 'Sangat mudah mencari ruang parkir yang terbatas.' },
            { route: 'Pusat Kota Jogja', reason: 'Gesit menyusuri lalu lintas perkotaan yang padat.' }
        ],
        waMessage: 'Halo Aksara Transport, saya tertarik menyewa unit lepas kunci Toyota Agya. Mohon syarat & ketersediaannya.'
    },
    { 
        id: 'brio', 
        name: 'Honda Brio Matic', 
        category: 'city', 
        image: '/images/honda_brio.webp', 
        badge: 'Hemat', 
        seats: 5, 
        trans: 'Automatic', 
        rates: [
            { label: '12 Jam', price: 'Rp 275.000' }, 
            { label: '24 Jam', price: 'Rp 325.000' }, 
            { label: 'Fullday', price: 'Rp 325.000' }
        ], 
        startPrice: 'Rp 275.000', 
        queryName: 'Honda+Brio+Matic',
        desc: 'Honda Brio adalah opsi sewa mobil perkotaan (city car) yang ekonomis, gesit, dan sangat mudah untuk bermanuver di jalanan Jogja yang padat. Kendaraan ini menjadi favorit utama wisatawan berdua atau keluarga kecil.',
        features: ['AC Dingin Sejuk', '5 Kursi Nyaman', 'Kabin Compact', 'Mesin 1200 CC Irit', 'Audio System'],
        routes: [
            { route: 'Pusat Kota Jogja (Malioboro/Keraton)', reason: 'Sangat mudah diparkir di area jalanan sempit khas pusat kota.' },
            { route: 'Wisata Kuliner Jogja', reason: 'Sangat irit bahan bakar untuk rute stop-and-go berpindah-pindah lokasi kuliner.' },
            { route: 'Candi Prambanan & Ratu Boko', reason: 'Akselerasi stabil dan halus di rute aspal datar antar wilayah.' }
        ],
        waMessage: 'Halo Aksara Transport, saya tertarik menyewa unit lepas kunci Honda Brio Matic. Mohon syarat & ketersediaannya.'
    },
    { 
        id: 'jazz', 
        name: 'Honda Jazz Matic', 
        category: 'city', 
        image: '/images/honda_jazz.webp', 
        badge: 'Sporty', 
        seats: 4, 
        trans: 'Automatic', 
        rates: [
            { label: '12 Jam', price: 'Rp 375.000' }, 
            { label: '24 Jam', price: 'Rp 425.000' }, 
            { label: 'Fullday', price: 'Rp 425.000' }
        ], 
        startPrice: 'Rp 375.000', 
        queryName: 'Honda+Jazz+Matic',
        desc: 'Honda Jazz menyajikan sensasi berkendara yang sporty dengan kabin interior dinamis dan fleksibel (Ultra Seat). Sangat digemari oleh kawula muda yang mendambakan performa lincah bertenaga.',
        features: ['Kabin Fleksibel (Ultra Seat)', '4 Penumpang', 'Mesin 1500 CC Lincah', 'Sporty Dashboard Design', 'AC Dingin Maksimal'],
        routes: [
            { route: 'Kawasan Malioboro', reason: 'Kemudahan bermanuver dan melaju lincah di kemacetan kota.' },
            { route: 'Candi Prambanan', reason: 'Kestabilan berkendara yang mumpuni di rute jalan lurus antarkota.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin bertanya tentang ketersediaan unit lepas kunci Honda Jazz Matic. Terima kasih.'
    },
    { 
        id: 'raize', 
        name: 'Toyota Raize Matic', 
        category: 'suv', 
        image: '/images/toyota_raize.webp', 
        badge: 'Compact SUV', 
        seats: 5, 
        trans: 'Automatic', 
        badgeColor: 'accent', 
        rates: [
            { label: '12 Jam', price: 'Rp 375.000' }, 
            { label: '24 Jam', price: 'Rp 425.000' }, 
            { label: 'Fullday', price: 'Rp 425.000' }
        ], 
        startPrice: 'Rp 375.000', 
        queryName: 'Toyota+Raize',
        desc: 'Toyota Raize adalah compact SUV modern dengan mesin turbo bertenaga. Sangat lincah, berjiwa petualang, dan memiliki ground clearance tinggi untuk melibas segala rintangan jalanan perkotaan maupun pedesaan Jogja.',
        features: ['Mesin 1000 CC Turbo', '5 Penumpang Nyaman', 'Ground Clearance Tinggi', 'LED Headlamp Terang', 'Kabin Modern Digital'],
        routes: [
            { route: 'Kawasan Bukit Bintang', reason: 'Torsi mesin turbo yang handal menghadapi rute menanjak.' },
            { route: 'Lereng Gunung Merapi (Kaliurang)', reason: 'Ground clearance tinggi memberikan rasa aman dari rintangan jalanan rusak.' }
        ],
        waMessage: 'Halo Aksara Transport, saya berminat menyewa lepas kunci Toyota Raize Matic. Tolong info ketersediaan unit.'
    },
    { 
        id: 'avanza-fl', 
        name: 'Toyota Avanza Facelift', 
        category: 'family', 
        image: '/images/toyota_avanza.webp', 
        badge: 'Terpopuler', 
        seats: 7, 
        trans: 'Manual / Matic', 
        rates: [
            { label: '12 Jam', price: 'Rp 300.000' }, 
            { label: '24 Jam', price: 'Rp 350.000' }, 
            { label: 'Fullday', price: 'Rp 350.000' }
        ], 
        startPrice: 'Rp 300.000', 
        queryName: 'Toyota+Avanza',
        desc: 'Toyota Avanza adalah MPV andalan keluarga Indonesia yang sangat legendaris. Dilengkapi dengan kabin yang luas dan ground clearance tinggi, menjamin ketangguhan berkendara di berbagai rute perjalanan Anda di Yogyakarta.',
        features: ['Double Blower AC', 'Kapasitas 7 Kursi', 'Bagasi Fleksibel', 'Mesin 1300 CC Kuat', 'Dual SRS Airbag'],
        routes: [
            { route: 'Candi Borobudur', reason: 'Kabin lapang membuat keluarga tetap nyaman selama perjalanan luar kota.' },
            { route: 'Lereng Gunung Merapi (Kaliurang)', reason: 'Mesin tangguh dengan penggerak roda yang handal di rute menanjak pegunungan.' },
            { route: 'Pantai Parangtritis', reason: 'Suspensi nyaman meredam guncangan di rute lintas selatan.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin booking sewa lepas kunci unit Toyota Avanza. Mohon info ketersediaan unit.'
    },
    { 
        id: 'avanza-fwd', 
        name: 'Toyota New Avanza FWD', 
        category: 'family', 
        image: '/images/toyota_avanza_fwd.webp', 
        badge: 'Kabin Luas', 
        seats: 7, 
        trans: 'Automatic', 
        rates: [
            { label: 'Fullday', price: 'Rp 375.000' }
        ], 
        startPrice: 'Rp 375.000', 
        queryName: 'Toyota+New+Avanza+FWD',
        desc: 'Avanza generasi terbaru dengan sistem penggerak roda depan (FWD). Memberikan kabin yang jauh lebih hening, ruang kaki baris kedua yang lapang, serta suspensi yang empuk demi kenyamanan ekstra keluarga tercinta.',
        features: ['Penggerak Roda Depan (FWD)', 'Kapasitas 7 Kursi', 'Double Blower AC', 'Kabin Lebih Senyap', 'Fitur Keselamatan Modern'],
        routes: [
            { route: 'Kawasan Kaliurang', reason: 'Transmisi matic responsif dengan torsi handal di jalur berbukit.' },
            { route: 'Candi Borobudur', reason: 'Kabin lapang dan suspensi empuk menjaga kebugaran keluarga sepanjang perjalanan.' }
        ],
        waMessage: 'Halo Aksara Transport, saya tertarik menyewa lepas kunci Toyota New Avanza FWD. Bagaimana ketersediaannya?'
    },
    { 
        id: 'xpander', 
        name: 'Mitsubishi Xpander', 
        category: 'family', 
        image: '/images/mitsubishi_xpander.webp', 
        badge: 'Terfavorit', 
        seats: 7, 
        trans: 'Automatic', 
        rates: [
            { label: 'Fullday', price: 'Rp 450.000' }
        ], 
        startPrice: 'Rp 450.000', 
        queryName: 'Mitsubishi+Xpander',
        desc: 'Mitsubishi Xpander menyajikan kemewahan MPV keluarga premium dengan suspensi ternyaman di kelasnya. Desain eksterior yang modern gagah (Dynamic Shield) dipadukan dengan kesenyapan kabin tingkat tinggi.',
        features: ['Suspensi Kelas SUV', '7 Kursi Penumpang', 'Desain Dynamic Shield', 'Kekedapan Kabin Maksimal', 'Bagasi Fleksibel Serbaguna'],
        routes: [
            { route: 'Perjalanan ke Pantai Gunungkidul', reason: 'Kualitas suspensi luar biasa meredam guncangan di rute aspal berliku.' },
            { route: 'Pusat Kota Jogja', reason: 'Kabin senyap menjauhkan kebisingan jalanan kota dari kenyamanan penumpang.' }
        ],
        waMessage: 'Halo Aksara Transport, mohon info ketersediaan sewa lepas kunci unit Mitsubishi Xpander.'
    },
    { 
        id: 'innova', 
        name: 'Toyota Innova Reborn', 
        category: 'family', 
        image: '/images/innova_reborn.webp', 
        badge: 'Premium Family', 
        seats: 7, 
        trans: 'Automatic', 
        rates: [
            { label: 'Fullday', price: 'Rp 550.000' }
        ], 
        startPrice: 'Rp 550.000', 
        queryName: 'Toyota+Innova+Reborn',
        desc: 'Toyota Innova Reborn menawarkan kemewahan berkendara dengan kenyamanan suspensi tingkat tinggi yang mampu meredam getaran dengan sempurna. Pilihan utama untuk perjalanan keluarga eksklusif maupun dinas bisnis.',
        features: ['Mesin Diesel 2400 CC Turbo', 'Kapasitas 7 Kursi', 'Kabin Sangat Senyap & Luas', 'Suspensi Premium Empuk', 'AC Triple Blower'],
        routes: [
            { route: 'Wisata Pantai Gunungkidul (Indrayanti/Sadranan)', reason: 'Mesin diesel turbo sangat bertenaga melibas jalanan menanjak curam Gunungkidul.' },
            { route: 'Candi Borobudur & Prambanan', reason: 'Kekedapan kabin luar biasa, menjaga balita atau lansia tetap rileks sepanjang jalan.' },
            { route: 'Perjalanan Bisnis VIP / Event Dinas', reason: 'Tampilan elegan memberikan kesan profesional untuk menyambut tamu kehormatan.' }
        ],
        waMessage: 'Halo Aksara Transport, saya tertarik menyewa Toyota Innova Reborn lepas kunci. Mohon info ketersediaannya.'
    },
    { 
        id: 'binguo-ev', 
        name: 'Wuling Binguo EV', 
        category: 'electric', 
        image: '/images/wuling_binguo.webp', 
        badge: 'Full Electric', 
        seats: 4, 
        trans: 'Baterai 333km', 
        rates: [
            { label: 'Fullday', price: 'Rp 500.000' }
        ], 
        startPrice: 'Rp 500.000', 
        queryName: 'Wuling+Binguo+EV',
        desc: 'Wuling Binguo EV menyajikan kenyamanan mobil listrik modern dengan desain eksterior retro-futuristik yang sangat stylish. Berkendara keliling Jogja dengan senyap, ramah lingkungan, dan hemat tanpa BBM.',
        features: ['Sistem Listrik Penuh (EV)', 'Kapasitas 4 Kursi', 'Bebas Polusi Udara', 'Jangkauan Baterai 333 KM', 'Smart Key & Autopilot Urban'],
        routes: [
            { route: 'Heritage Tour (Taman Sari & Kotagede)', reason: 'Praktis dikendarai melintasi rute stop-and-go di gang bersejarah Jogja.' },
            { route: 'Kawasan Wisata Kaliurang', reason: 'Baterai melimpah kuat menanjak rute sejuk Merapi pulang-pergi.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin menanyakan ketersediaan sewa lepas kunci unit Wuling Binguo EV Jogja.'
    },
    { 
        id: 'air-ev', 
        name: 'Wuling Air EV', 
        category: 'electric', 
        image: '/images/wuling_air_ev.webp', 
        badge: 'Full Electric', 
        seats: 4, 
        trans: 'Baterai 300km', 
        rates: [
            { label: 'Fullday', price: 'Rp 450.000' }
        ], 
        startPrice: 'Rp 450.000', 
        queryName: 'Wuling+Air+EV',
        desc: 'Wuling Air EV menyajikan kelincahan mobil listrik kompak modern untuk menjelajahi perkotaan Jogja dengan lincah. Desain mungil, praktis, senyap, bebas polusi, dan gratis tanpa biaya BBM.',
        features: ['100% Energi Listrik (EV)', 'Kapasitas 4 Kursi', 'Bebas Polusi Udara', 'Jangkauan Baterai 300 KM', 'Keyless System & Mudah Parkir'],
        routes: [
            { route: 'Kawasan Malioboro & Keraton', reason: 'Sangat gesit melibas kepadatan lalu lintas perkotaan.' },
            { route: 'Wisata Heritage Taman Sari', reason: 'Sangat praktis diparkir di space terbatas perkotaan padat.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin menanyakan sewa lepas kunci unit Wuling Air EV. Terima kasih.'
    },
    { 
        id: 'ioniq-5', 
        name: 'Hyundai Ioniq 5', 
        category: 'electric', 
        image: '/images/hyundai_ioniq_5.webp', 
        badge: 'VIP Electric', 
        seats: 5, 
        trans: 'Baterai 480km', 
        rates: [
            { label: 'Fullday', price: 'Rp 1.500.000' }
        ], 
        startPrice: 'Rp 1.500.000', 
        queryName: 'Hyundai+Ioniq+5',
        desc: 'Hyundai Ioniq 5 menyajikan kemewahan mobil listrik premium dengan desain futuristik yang memukau. Nikmati kenyamanan VVIP berkendara keliling Jogja dengan kabin ekstra senyap dan lapang.',
        features: ['Sistem Listrik Premium (EV)', 'Kapasitas 5 Kursi', 'Bebas Polusi Udara', 'Jangkauan Baterai 480 KM', 'V2L Technology & Panoramic Sunroof'],
        routes: [
            { route: 'Kunjungan Tamu VIP', reason: 'Memberikan impresi mewah dan modern untuk kolega bisnis.' },
            { route: 'Pernikahan (Wedding Car)', reason: 'Sangat elegan didekorasi sebagai mobil pengantin masa kini.' }
        ],
        waMessage: 'Halo Aksara Transport, saya tertarik menyewa lepas kunci Hyundai Ioniq 5. Mohon syarat & ketersediaannya.'
    },
    { 
        id: 'neta-v', 
        name: 'Neta V-II', 
        category: 'electric', 
        image: '/images/neta_v_ii.webp', 
        badge: 'Full Electric', 
        seats: 5, 
        trans: 'Baterai 401km', 
        rates: [
            { label: 'Fullday', price: 'Rp 600.000' }
        ], 
        startPrice: 'Rp 600.000', 
        queryName: 'Neta+V-II',
        desc: 'Neta V-II menyajikan kepraktisan mobil crossover listrik modern berukuran kompak. Lincah menyusuri jalanan Jogja dengan kabin futuristik dan efisiensi energi listrik yang sangat baik.',
        features: ['100% Energi Listrik (EV)', 'Kapasitas 5 Kursi', 'Bebas Polusi Udara', 'Jangkauan Baterai 401 KM', 'Layar Multimedia 14.6 Inci'],
        routes: [
            { route: 'Pusat Kota Jogja', reason: 'Lincah menyusuri jalan padat dan ramah kantong tanpa bensin.' },
            { route: 'Heha Sky View', reason: 'Performa menanjak di perbukitan Pathuk yang stabil dan bertenaga.' }
        ],
        waMessage: 'Halo Aksara Transport, mohon info ketersediaan sewa lepas kunci unit Neta V-II. Terima kasih.'
    }
];

const denganSopirCars = [
    { 
        id: 'ds-brio', 
        name: 'Honda Brio', 
        category: 'family', 
        image: '/images/honda_brio.webp', 
        badge: 'Hemat', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 450.000' }, { label: 'Fullday', price: 'Rp 550.000' }
        ], 
        startPrice: 'Rp 450.000', 
        queryName: 'Honda+Brio',
        desc: 'Sewa Honda Brio dengan sopir profesional. Menghemat waktu mencari parkir dan sangat praktis untuk liburan berdua atau perjalanan dinas mandiri di dalam kota Yogyakarta.',
        features: ['AC Dingin Sejuk', 'Kapasitas 5 Penumpang', 'Driver Ramah Profesional', 'Sudah Termasuk Unit + Driver + BBM', 'Kabin Bersih'],
        routes: [
            { route: 'City Tour (Keraton/Taman Sari)', reason: 'Driver kami siap mengantar dan menjemput langsung di titik drop-off.' },
            { route: 'Wisata Kuliner Tengah Kota', reason: 'Bebas pusing memikirkan kemacetan jalanan kuliner Jogja.' }
        ],
        waMessage: 'Halo Aksara Transport, saya berminat sewa Honda Brio didampingi sopir. Mohon infonya.'
    },
    { 
        id: 'ds-avanza-fl', 
        name: 'Toyota Avanza Facelift', 
        category: 'family', 
        image: '/images/toyota_avanza_facelift.webp', 
        badge: 'Paling Laris', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 550.000' }, { label: 'Fullday', price: 'Rp 600.000' }
        ], 
        startPrice: 'Rp 550.000', 
        queryName: 'Toyota+Avanza+Facelift',
        desc: 'Unit rental Avanza didampingi sopir yang hafal seluk-beluk rute Jogja. Pilihan paling populer wisatawan keluarga yang mendambakan perjalanan nyaman tanpa lelah menyetir.',
        features: ['Double Blower AC', 'Kapasitas 7 Kursi', 'Driver Profesional Berlisensi', 'Sudah Termasuk Unit + Driver + BBM', 'Bagasi Lapang'],
        routes: [
            { route: 'Candi Borobudur & Prambanan', reason: 'Perjalanan aman dan sopir kami merangkap sebagai penunjuk rute lokal.' },
            { route: 'Wisata Alam Kaliurang', reason: 'Tangguh di tanjakan sejuk lereng gunung dengan kemudi sopir handal.' }
        ],
        waMessage: 'Halo Aksara Transport, mohon ketersediaan rental Toyota Avanza Facelift + Driver.'
    },
    { 
        id: 'ds-avanza-fwd', 
        name: 'Toyota Avanza FWD', 
        category: 'family', 
        image: '/images/toyota_avanza_fwd.webp', 
        badge: 'Terbaru', 
        badgeColor: 'accent', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 650.000' }, { label: 'Fullday', price: 'Rp 750.000' }
        ], 
        startPrice: 'Rp 650.000', 
        queryName: 'Toyota+Avanza+FWD',
        desc: 'Avanza generasi FWD terbaru dengan driver. Memberikan keheningan kabin optimal dan suspensi empuk, cocok untuk mengantar keluarga keliling tempat wisata hits Jogja.',
        features: ['Penggerak Depan FWD Nyaman', '7 Kursi Lapang', 'Kabin Hebat Senyap', 'Sopir Berpengalaman Ramah', 'Sudah Termasuk Unit + Driver + BBM'],
        routes: [
            { route: 'Heha Ocean View & Sky View', reason: 'Rute menantang diatasi dengan tenang oleh supir terlatih kami.' },
            { route: 'Tour Belanja Oleh-Oleh', reason: 'Sopir siap memarkirkan mobil dan membantu memuat barang belanjaan Anda.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin menanyakan unit Toyota Avanza FWD terbaru dengan sopir.'
    },
    { 
        id: 'ds-xpander', 
        name: 'Mitsubishi Xpander', 
        category: 'family', 
        image: '/images/mitsubishi_xpander.webp', 
        badge: 'Nyaman', 
        badgeColor: 'accent', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 700.000' }, { label: 'Fullday', price: 'Rp 800.000' }
        ], 
        startPrice: 'Rp 700.000', 
        queryName: 'Mitsubishi+Xpander',
        desc: 'Kombinasi kemewahan Xpander dan supir berpengalaman. Suspensi empuk kelas SUV yang sangat memanjakan penumpang di baris belakang selama mengitari destinasi wisata Jogja.',
        features: ['Suspensi Lembut Ekstra', '7 Kursi Penumpang', 'Kabin Sangat Senyap', 'Sopir Ramah & Sigap', 'Sudah Termasuk Unit + Driver + BBM'],
        routes: [
            { route: 'Pantai Gunungkidul', reason: 'Meredam guncangan rute berliku Gunungkidul secara maksimal, mencegah mabuk perjalanan.' },
            { route: 'Kunjungan Dinas Bisnis', reason: 'Tampilan gagah modis meningkatkan impresi saat menghadiri pertemuan kerja.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin menyewa Mitsubishi Xpander + Driver. Bagaimana ketersediaannya?'
    },
    { 
        id: 'ds-innova', 
        name: 'Toyota Innova Reborn 2026', 
        category: 'family', 
        image: '/images/innova_reborn.webp', 
        badge: 'Tangguh', 
        badgeColor: 'accent', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 750.000' }, { label: 'Fullday', price: 'Rp 850.000' }
        ], 
        startPrice: 'Rp 750.000', 
        queryName: 'Toyota+Innova+Reborn+2026',
        desc: 'Toyota Innova Reborn menawarkan kemewahan berkendara dengan kenyamanan suspensi tingkat tinggi yang mampu meredam getaran dengan sempurna. Pilihan utama untuk perjalanan keluarga eksklusif maupun dinas bisnis.',
        features: ['Mesin Diesel 2400 CC Turbo', 'Kapasitas 7 Kursi', 'Kabin Sangat Senyap & Luas', 'Suspensi Premium Empuk', 'AC Triple Blower'],
        routes: [
            { route: 'Wisata Pantai Gunungkidul (Indrayanti/Sadranan)', reason: 'Mesin diesel turbo sangat bertenaga melibas jalanan menanjak curam Gunungkidul.' },
            { route: 'Candi Borobudur & Prambanan', reason: 'Kekedapan kabin luar biasa, menjaga balita atau lansia tetap rileks sepanjang jalan.' },
            { route: 'Perjalanan Bisnis VIP / Event Dinas', reason: 'Tampilan elegan memberikan kesan profesional untuk menyambut tamu kehormatan.' }
        ],
        waMessage: 'Halo Aksara Transport, saya tertarik menyewa Toyota Innova Reborn dengan sopir. Tolong info ketersediaannya.'
    },
    { 
        id: 'ds-zenix', 
        name: 'Toyota Innova Zenix 2026', 
        category: 'family', 
        image: '/images/toyota_innova_zenix.webp', 
        badge: 'Premium', 
        badgeBg: '#e0f2fe', 
        badgeText: '#0369a1', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 1.000.000' }, { label: 'Fullday', price: 'Rp 1.100.000' }
        ], 
        startPrice: 'Rp 1.000.000', 
        queryName: 'Toyota+Innova+Zenix+2026',
        desc: 'Toyota Innova Zenix menyajikan platform berkendara eksekutif modern (TNGA). Kabin super lapang, transmisi halus, dipandu driver khusus kami untuk menghadirkan kenyamanan kelas wahid.',
        features: ['Sasis TNGA Nyaman', '7 Kursi Eksekutif', 'Kabin Ekstra Lapang & Senyap', 'Sopir Khusus VIP', 'Sudah Termasuk Unit + Driver + BBM'],
        routes: [
            { route: 'Kunjungan Tamu Kenegaraan / Dinas', reason: 'Kendaraan berkelas tinggi yang sangat representatif untuk menyambut kolega penting.' },
            { route: 'Perjalanan Liburan VIP Keluarga', reason: 'Memberikan standar kenyamanan dan kemewahan terbaik sepanjang trip Jogja.' }
        ],
        waMessage: 'Halo Aksara Transport, mohon informasi tarif sewa Toyota Innova Zenix + Driver.'
    },
    { 
        id: 'ds-pajero', 
        name: 'Mitsubishi Pajero 2026', 
        category: 'suv', 
        image: '/images/mitsubishi_pajero.webp', 
        badge: 'Gagah SUV', 
        badgeBg: '#ffedd5', 
        badgeText: '#ea580c', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 1.500.000' }, { label: 'Fullday', price: 'Rp 1.600.000' }
        ], 
        startPrice: 'Rp 1.500.000', 
        queryName: 'Mitsubishi+Pajero+2026',
        desc: 'Mitsubishi Pajero Sport menyajikan tampilan tangguh berjiwa petualang dikombinasikan dengan kabin interior mewah. SUV premium ini sangat andal di segala medan rute wisata alam Yogyakarta.',
        features: ['Leather Luxury Seats', '7 Kursi Lapang', 'Gagah & Desain Sporty', 'Mesin 2400 CC MIVEC Diesel', 'Active Stability Control'],
        routes: [
            { route: 'Lava Tour Merapi (Kaliurang)', reason: 'Ground clearance tinggi sangat kokoh melintasi jalanan bebatuan lereng gunung.' },
            { route: 'Rute Ekstrem Tebing Breksi & Bukit Bintang', reason: 'Sasis tangguh menjaga kendaraan tetap stabil di tikungan tajam berlereng.' },
            { route: 'Pantai Tersembunyi Gunungkidul', reason: 'Melaju tanpa ragu di jalanan berpasir kasar atau tanah berbatu terjal.' }
        ],
        waMessage: 'Halo Aksara Transport, mohon informasi ketersediaan unit Mitsubishi Pajero Sport dengan sopir.'
    },
    { 
        id: 'ds-fortuner', 
        name: 'Toyota Fortuner 2026', 
        category: 'suv', 
        image: '/images/toyota_fortuner.webp', 
        badge: 'SUV Tangguh', 
        badgeBg: '#ffedd5', 
        badgeText: '#ea580c', 
        disclaimer: '* Pemakaian khusus area dalam kota.', 
        rates: [
            { label: '12 Jam', price: 'Rp 1.500.000' }, { label: 'Fullday', price: 'Rp 1.600.000' }
        ], 
        startPrice: 'Rp 1.500.000', 
        queryName: 'Toyota+Fortuner+2026',
        desc: 'Toyota Fortuner menawarkan ketangguhan SUV sejati dikombinasikan dengan kemewahan interior berkelas. Didampingi supir terlatih, siap mengarungi segala rute perjalanan dinas maupun wisata Anda di Jogja.',
        features: ['Tampilan Gagah & Elegan', '7 Kursi Nyaman', 'Mesin 2800 CC Diesel Kuat', 'Sopir Handal Terlatih', 'Sudah Termasuk Unit + Driver + BBM'],
        routes: [
            { route: 'Kawasan Pegunungan Merapi', reason: 'Tenaga torsi mesin yang melimpah melibas jalan menanjak ekstrim.' },
            { route: 'Kunjungan Kerja Dinas Luar Kota', reason: 'Kabin kokoh dan aman memberikan rasa nyaman optimal bagi eksekutif.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin rental Toyota Fortuner didampingi sopir. Mohon info unit.'
    },
    { 
        id: 'ds-alphard-fl', 
        name: 'Toyota Alphard Facelift 2023', 
        category: 'luxury', 
        image: '/images/toyota_alphard.webp', 
        badge: 'VIP All-In', 
        badgeBg: '#f3e8ff', 
        badgeText: '#9333ea', 
        isLuxury: true, 
        isAlphard: true,
        rates: [
            { label: '12 Jam', price: 'Rp 2.899.000' }, { label: 'Fullday', price: 'Rp 2.999.999' }
        ], 
        startPrice: 'Rp 2.899.000', 
        queryName: 'Toyota+Alphard+Facelift+2023',
        desc: 'Toyota Alphard Facelift menyajikan kemewahan premium MPV nomor satu di Indonesia. Paket All In lengkap BBM, Mobil, Driver profesional, Parkir, dan Refreshment VIP. Kabin super senyap dengan Captain Seat mewah.',
        features: ['All In: BBM, Mobil, Driver, Parkir', 'Free Refreshment VIP', 'Luxury Captain Seats', 'Double Sunroof Mewah', 'Sopir Khusus Protokoler'],
        routes: [
            { route: 'Pernikahan (Wedding Car)', reason: 'Sangat anggun dan megah didekorasi bunga segar sebagai mobil pengantin.' },
            { route: 'Penyambutan Tamu Penting (VIP)', reason: 'Menunjukkan standar pelayanan tertinggi untuk menyambut kolega utama bisnis Anda.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Alphard Facelift (All In BBM, Mobil, Driver, Parkir + Refreshment).'
    },
    { 
        id: 'ds-alphard-hev', 
        name: 'Toyota Alphard HEV 2026', 
        category: 'luxury', 
        image: '/images/toyota_alphard_hev.webp', 
        badge: 'VIP All-In', 
        badgeBg: '#f3e8ff', 
        badgeText: '#9333ea', 
        isLuxury: true, 
        isAlphard: true,
        rates: [
            { label: '12 Jam', price: 'Rp 3.899.999' }, { label: 'Fullday', price: 'Rp 3.999.999' }
        ], 
        startPrice: 'Rp 3.899.999', 
        queryName: 'Toyota+Alphard+HEV+2026',
        desc: 'Sewa Toyota Alphard Hybrid (HEV) terbaru di Jogja. Paket All In lengkap BBM, Mobil, Driver profesional, Parkir, dan Refreshment VIP. Mesin hybrid super senyap, kabin super mewah kelas eksekutif protokoler.',
        features: ['All In: BBM, Mobil, Driver, Parkir', 'Free Refreshment VIP', 'Mesin Hybrid Super Senyap', 'Executive Lounge Captain Seats', 'Sopir VIP Protokoler Profesional'],
        routes: [
            { route: 'Event Kenegaraan / VIP Rombongan', reason: 'Kendaraan termewah yang menghadirkan wibawa dan kenyamanan maksimal.' },
            { route: 'Pernikahan Megah (Luxury Wedding)', reason: 'Pilihan terbaik untuk mengabadikan momen hari bahagia dengan kendaraan premium terbaru.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin menanyakan rental unit Toyota Alphard HEV Hybrid terbaru All In BBM, Mobil, Driver, Parkir + Refreshment.'
    },
    { 
        id: 'ds-hiace-com', 
        name: 'Toyota Hiace Commuter', 
        category: 'microbus', 
        image: '/images/toyota_hiace_commuter.webp', 
        badge: 'Group Rombongan', 
        badgeBg: '#ccfbf1', 
        badgeText: '#0f766e', 
        disclaimer: '* Kapasitas hingga 15 Kursi.', 
        rates: [
            { label: '12 Jam', price: 'Rp 1.100.000' }, { label: 'Fullday', price: 'Rp 1.200.000' }
        ], 
        startPrice: 'Rp 1.100.000', 
        queryName: 'Toyota+Hiace+Commuter',
        desc: 'Toyota Hiace Commuter adalah solusi rental rombongan paling andal dan ekonomis. Kabin luas menampung 15 orang, suspensi kokoh, dan dipandu supir ramah yang siap memandu perjalanan kelompok.',
        features: ['AC Penumpang Multi-Vent', '15 Kursi Rombongan', 'Kabin Lega & Bersih', 'Sopir Ramah Berpengalaman', 'Sudah Termasuk Unit + Driver + BBM'],
        routes: [
            { route: 'Liburan Keluarga Besar Keliling Jogja', reason: 'Seluruh rombongan dapat bepergian bersama dalam satu kabin yang akrab.' },
            { route: 'Tour Rombongan Kantor / Ziarah', reason: 'Sangat efisien membawa banyak penumpang ke berbagai rute destinasi.' }
        ],
        waMessage: 'Halo Aksara Transport, saya berminat sewa unit Toyota Hiace Commuter + Sopir untuk rombongan.'
    },
    { 
        id: 'ds-hiace-pre', 
        name: 'Toyota Hiace Premio', 
        category: 'microbus', 
        image: '/images/toyota_hiace_premio.webp', 
        badge: 'Premium Group', 
        badgeBg: '#ccfbf1', 
        badgeText: '#0f766e', 
        disclaimer: '* Kabin Premio Mewah, Kapasitas 12-14 Kursi.', 
        rates: [
            { label: '12 Jam', price: 'Rp 1.400.000' }, { label: 'Fullday', price: 'Rp 1.500.000' }
        ], 
        startPrice: 'Rp 1.400.000', 
        queryName: 'Toyota+Hiace+Premio',
        desc: 'Toyota Hiace Premio adalah pilihan microbus premium terbaik untuk perjalanan rombongan besar. Dengan kabin berplafon tinggi, suspensi empuk, dan penataan kursi yang ergonomis, memastikan kenyamanan seluruh rombongan tetap terjaga.',
        features: ['AC Vent Individual tiap Kursi', 'Kapasitas 14 Penumpang', 'Kabin Sangat Luas & Tinggi', 'Mesin 2800 CC Bertenaga', 'Safety Hammer & Exit Door'],
        routes: [
            { route: 'Tour Rombongan Jogja-Solo-Semarang', reason: 'Sangat efisien memuat rombongan besar keluarga atau rekan kantor dalam satu unit.' },
            { route: 'Rombongan Reuni Gunungkidul', reason: 'Kursi ergonomis dan kabin luas mengurangi kelelahan rombongan selama rute berliku.' },
            { route: 'Gathering Kantor / Rombongan Wedding', reason: 'Meningkatkan kebersamaan yang hangat dalam kabin luas sepanjang perjalanan.' }
        ],
        waMessage: 'Halo Aksara Transport, saya ingin menanyakan ketersediaan sewa Toyota Hiace Premio dengan driver untuk rombongan.'
    },
    { 
        id: 'ds-elf', 
        name: 'Elf Long 19 Seat', 
        category: 'microbus', 
        image: '/images/elf_long.webp', 
        badge: 'Kapasitas Besar', 
        badgeBg: '#ccfbf1', 
        badgeText: '#0f766e', 
        disclaimer: '* Kapasitas hingga 19 Kursi Penumpang.', 
        rates: [
            { label: '12 Jam', price: 'Rp 1.500.000' }, { label: 'Fullday', price: 'Rp 1.600.000' }
        ], 
        startPrice: 'Rp 1.500.000', 
        queryName: 'Elf+Long+19+Seat',
        desc: 'Isuzu Elf Long menyediakan ruang kabin berkapasitas ekstra besar hingga 19 tempat duduk. Pilihan utama untuk membawa rombongan tour travel skala sedang melewati rute pariwisata Yogyakarta.',
        features: ['Kapasitas 19 Kursi Penumpang', 'AC Dingin Merata', 'Sasis Elf Tangguh', 'Sopir Spesialis Rute Wisata', 'Sudah Termasuk Unit + Driver + BBM'],
        routes: [
            { route: 'Rute Wisata Alam Gunungkidul / Mangunan', reason: 'Mesin handal melibas jalan perbukitan dengan kapasitas penumpang maksimal.' },
            { route: 'Event Rombongan Pernikahan / Wisuda', reason: 'Praktis untuk antar-jemput keluarga pengantin/wisudawan dalam jumlah besar.' }
        ],
        waMessage: 'Halo Aksara Transport, mohon informasi tarif sewa Elf Long 19 Seat + Driver.'
    }
];

function CatalogMobilInner() {
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get('service') || 'lepasKunci';
    
    const [activeService, setActiveService] = useState(serviceParam);
    const [lkFilter, setLkFilter] = useState('all');
    const [dsFilter, setDsFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    // Detail Modal State
    const [selectedModalCar, setSelectedModalCar] = useState<any>(null);

    useEffect(() => {
        const serv = searchParams.get('service');
        if (serv === 'denganSopir' || serv === 'lepasKunci') {
            setActiveService(serv);
        }
    }, [searchParams]);

    const filterAndSortCars = (cars: any[], filter: string) => {
        let result = cars.filter(car => {
            const matchFilter = filter === 'all' || car.category === filter;
            const matchSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchFilter && matchSearch;
        });

        if (sortOrder === 'termurah') {
            result = result.sort((a, b) => {
                const aRate = a.rates.find((r: any) => !r.isInfo) || a.rates[0];
                const bRate = b.rates.find((r: any) => !r.isInfo) || b.rates[0];
                const aPrice = parseInt(aRate?.price?.replace(/[^0-9]/g, '') || '0');
                const bPrice = parseInt(bRate?.price?.replace(/[^0-9]/g, '') || '0');
                return aPrice - bPrice;
            });
        } else if (sortOrder === 'termahal') {
            result = result.sort((a, b) => {
                const aRate = a.rates.find((r: any) => !r.isInfo) || a.rates[0];
                const bRate = b.rates.find((r: any) => !r.isInfo) || b.rates[0];
                const aPrice = parseInt(aRate?.price?.replace(/[^0-9]/g, '') || '0');
                const bPrice = parseInt(bRate?.price?.replace(/[^0-9]/g, '') || '0');
                return bPrice - aPrice;
            });
        }
        return result;
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const carName = (document.getElementById('customCarName') as HTMLInputElement).value;
        const type = (document.getElementById('customServiceType') as HTMLSelectElement).value;
        if (!carName) {
            alert('Silakan isi nama mobil yang Anda ajukan.');
            return;
        }
        let textMessage = `*Permintaan Unit Mobil Kustom - Aksara Transport*\n-------------------------------------------\n\nSaya ingin menanyakan ketersediaan sewa mobil kustom yang tidak ada di katalog:\n\n*Nama Mobil:* ${carName}\n*Sistem Sewa:* ${type === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Supir)' : 'Dengan Supir'}\n\nMohon informasi ketersediaan unit dan tarif harganya. Terima kasih!`;
        if (type === 'lepas-kunci') {
            textMessage += `\n\n*PENTING*: Mohon lampirkan foto identitas diri (KTP/SIM) untuk keperluan verifikasi sesuai syarat & ketentuan Lepas Kunci.`;
        }
        window.open(`https://wa.me/628386000740?text=${encodeURIComponent(textMessage)}`, '_blank');
    };

    const CarCard = ({ car, service, filter }: { car: any, service: 'lepasKunci' | 'denganSopir', filter: string }) => {
        const defaultRate = car.rates.find((r: any) => !r.isInfo) || car.rates[0];
        const [selectedRate, setSelectedRate] = useState(defaultRate);

        const isLK = service === 'lepasKunci';
        const targetPage = isLK ? '/kontak' : '/pesan-sopir';
        const supir = isLK ? 'lepas-kunci' : 'dengan-sopir';
        
        let priceLabel = car.priceLabel || 'Mulai Dari';
        if (selectedRate.label.includes('12 Jam')) priceLabel = 'Tarif 12 Jam';
        else if (selectedRate.label.includes('24 Jam')) priceLabel = 'Tarif 24 Jam';
        else if (selectedRate.label.includes('Fullday')) priceLabel = 'Tarif Fullday';

        const href = `${targetPage}?supir=${supir}&mobil=${car.queryName}&paket=${encodeURIComponent(selectedRate.label)}`;

        return (
            <div className="car-card">
                <div className="car-image-container clickable-car-image" onClick={() => setSelectedModalCar(car)}>
                    <span className={`badge badge-${car.badgeColor || 'success'} car-tag`} style={car.badgeBg ? {backgroundColor: car.badgeBg, color: car.badgeText} : {}}>{car.badge}</span>
                    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                        <Image src={car.image} alt={`Sewa ${car.name}`} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                </div>
                <div className="car-details" style={{ textAlign: 'left' }}>
                    <h3 className="car-name">{car.name}</h3>
                    
                    {/* Short Description */}
                    <p className="car-desc-short" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {car.desc}
                    </p>

                    {isLK ? (
                        <div className="car-specs" style={{ marginBottom: '12px' }}>
                            <div className="spec-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                                <span>{car.seats} Kursi</span>
                            </div>
                            <div className="spec-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span>{car.trans}</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {(car.id === 'ds-alphard-fl' || car.id === 'ds-alphard-hev' || car.isLuxury) ? (
                                <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div style={{ fontSize: '0.82rem', background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '8px', padding: '8px 10px', lineHeight: 1.45 }}>
                                        <div style={{ color: '#7e22ce', fontWeight: 800, marginBottom: '3px' }}>
                                            ✨ INCLUDE : All In (BBM, Mobil, Driver, Parkir) + Refreshment
                                        </div>
                                        <div style={{ color: '#dc2626', fontWeight: 700 }}>
                                            • EXCLUDE : Retribusi Wisata, Konsumsi Driver.
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: '#334155', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '6px 8px', lineHeight: 1.4 }}>
                                        <div style={{ fontWeight: 600 }}>* Untuk Pemakaian 14 Jam Dan Maksimal Jam 22.00.</div>
                                        <div style={{ fontWeight: 600, color: '#0369a1', marginTop: '2px' }}>* Pemakaian Meliputi Area Gunungkidul Dan Magelang Kota.</div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div style={{ fontSize: '0.82rem', background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '8px', padding: '8px 10px', lineHeight: 1.45 }}>
                                        <div style={{ color: '#047857', fontWeight: 800, marginBottom: '3px' }}>
                                            ✅ INCLUDE : BBM, MOBIL, DRIVER
                                        </div>
                                        <div style={{ color: '#dc2626', fontWeight: 700 }}>
                                            • EXCLUDE : Parkir, Retribusi Wisata, Konsumsi Driver.
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: '#334155', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '6px 8px', lineHeight: 1.4 }}>
                                        <div style={{ fontWeight: 600 }}>* Untuk Pemakaian 14 Jam Dan Maksimal Jam 22.00.</div>
                                        <div style={{ fontWeight: 600, color: '#0369a1', marginTop: '2px' }}>* Pemakaian Meliputi Area Gunungkidul Dan Magelang Kota.</div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    
                    <div className="rate-list" style={{ marginBottom: '15px' }}>
                        {car.rates.map((r: any, idx: number) => {
                            if (r.isInfo || r.isSuccessInfo) {
                                return (
                                    <div key={idx} className="rate-item info-item" style={{ ...(r.isInfo ? {color: 'var(--text-muted)', fontStyle: 'italic'} : {color: 'var(--success)', fontWeight: 600}), cursor: 'default' }}>
                                        <span>{r.label}</span>
                                        {r.price && <strong>{r.price}</strong>}
                                    </div>
                               );
                            }
                            const isActive = selectedRate.label === r.label;
                            return (
                                <div key={idx} className={`rate-item ${isActive ? 'active' : ''}`} onClick={() => setSelectedRate(r)} style={{ cursor: 'pointer' }}>
                                    <span>{r.label}</span>
                                    {r.price && <strong>{r.price}</strong>}
                                </div>
                            );
                        })}
                    </div>
                    
                    {isLK && (
                        <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '-8px', marginBottom: '12px', fontStyle: 'italic', lineHeight: '1.3' }}>
                            * Note: Paket 12 Jam &amp; 24 Jam hanya untuk weekday (Senin-Kamis). Paket Fullday untuk liburan panjang &amp; weekend (Jumat-Minggu).
                        </p>
                    )}

                    <div className="car-pricing-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                        <div className="price-box">
                            <span className="price-label">{priceLabel}</span>
                            <span className="price-val">{selectedRate.price || car.startPrice}</span>
                        </div>
                        <Link href={href} className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>Sewa</Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <section className="hero" style={{ padding: '120px 0 60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Daftar Armada &amp; Tarif Sewa</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 30px auto' }}>Dapatkan unit mobil terbaik dengan kondisi prima dan bersih. Pilih sistem sewa Lepas Kunci atau Dengan Sopir di bawah ini. Klik gambar untuk melihat spesifikasi detail unit.</p>
                    
                    <div className="service-tabs-container">
                        <button className={`service-tab ${activeService === 'lepasKunci' ? 'active' : ''}`} onClick={() => {setActiveService('lepasKunci'); setLkFilter('all');}}>Lepas Kunci (Tanpa Sopir)</button>
                        <button className={`service-tab ${activeService === 'denganSopir' ? 'active' : ''}`} onClick={() => {setActiveService('denganSopir'); setDsFilter('all');}}>Dengan Sopir (Include Driver + BBM)</button>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: '#f1f5f9', paddingTop: '50px' }}>
                <div className="container">
                    
                    {activeService === 'lepasKunci' && (
                        <div id="lepasKunciSection" className="service-section">
                            <div className="filter-tabs">
                                <div className={`filter-tab ${lkFilter === 'all' ? 'active' : ''}`} onClick={() => setLkFilter('all')}>Semua Lepas Kunci</div>
                                <div className={`filter-tab ${lkFilter === 'city' ? 'active' : ''}`} onClick={() => setLkFilter('city')}>City Car</div>
                                <div className={`filter-tab ${lkFilter === 'family' ? 'active' : ''}`} onClick={() => setLkFilter('family')}>Family MPV</div>
                                <div className={`filter-tab ${lkFilter === 'suv' ? 'active' : ''}`} onClick={() => setLkFilter('suv')}>SUV</div>
                                <div className={`filter-tab ${lkFilter === 'electric' ? 'active' : ''}`} onClick={() => setLkFilter('electric')}>Mobil Listrik (EV)</div>
                            </div>
                            <div className="cars-grid">
                                {filterAndSortCars(lepasKunciCars, lkFilter).map(car => <CarCard key={car.id} car={car} service="lepasKunci" filter={lkFilter} />)}
                            </div>
                        </div>
                    )}

                    {activeService === 'denganSopir' && (
                        <div id="denganSopirSection" className="service-section">
                            <div className="filter-tabs">
                                <div className={`filter-tab ${dsFilter === 'all' ? 'active' : ''}`} onClick={() => setDsFilter('all')}>Semua Dengan Sopir</div>
                                <div className={`filter-tab ${dsFilter === 'family' ? 'active' : ''}`} onClick={() => setDsFilter('family')}>Keluarga (MPV)</div>
                                <div className={`filter-tab ${dsFilter === 'suv' ? 'active' : ''}`} onClick={() => setDsFilter('suv')}>SUV</div>
                                <div className={`filter-tab ${dsFilter === 'luxury' ? 'active' : ''}`} onClick={() => setDsFilter('luxury')}>VIP Luxury</div>
                                <div className={`filter-tab ${dsFilter === 'microbus' ? 'active' : ''}`} onClick={() => setDsFilter('microbus')}>Microbus / Elf</div>
                            </div>
                            <div className="cars-grid">
                                {filterAndSortCars(denganSopirCars, dsFilter).map(car => <CarCard key={car.id} car={car} service="denganSopir" filter={dsFilter} />)}
                            </div>
                        </div>
                    )}

                    <div className="custom-request-box" style={{ marginTop: '50px' }}>
                        <h3>Mobil yang Anda Cari Tidak Ada di Katalog?</h3>
                        <p>Jangan khawatir! Kami menyediakan berbagai tipe unit kendaraan kustom lainnya. Silakan ajukan permintaan jenis mobil impian Anda langsung ke WhatsApp admin kami.</p>
                        <form className="custom-request-form" id="customCarForm" onSubmit={handleCustomSubmit}>
                            <input type="text" id="customCarName" className="form-control" placeholder="Masukkan nama mobil (misal: Honda Civic)..." required />
                            <select id="customServiceType" className="form-control">
                                <option value="lepas-kunci">Sewa Lepas Kunci</option>
                                <option value="dengan-sopir">Sewa Dengan Sopir</option>
                            </select>
                            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: 700 }}>Ajukan via WhatsApp</button>
                        </form>
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
                                <div className="modal-price-box">
                                    <span className="modal-price-label">Tarif Mulai</span>
                                    <span className="modal-price-val">{selectedModalCar.startPrice || selectedModalCar.price} <span>{selectedModalCar.priceUnit || '/hari'}</span></span>
                                </div>
                                {activeService === 'lepasKunci' ? (
                                    <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic', lineHeight: '1.4', textAlign: 'center' }}>
                                        * Note: Paket 12 Jam &amp; 24 Jam hanya untuk weekday (Senin-Kamis). Paket Fullday untuk liburan panjang &amp; weekend (Jumat-Minggu).
                                    </p>
                                ) : (
                                    <div style={{
                                        marginTop: '12px',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        backgroundColor: (selectedModalCar.id === 'ds-alphard-fl' || selectedModalCar.id === 'ds-alphard-hev' || selectedModalCar.isLuxury) ? '#faf5ff' : '#f0fdf4',
                                        border: (selectedModalCar.id === 'ds-alphard-fl' || selectedModalCar.id === 'ds-alphard-hev' || selectedModalCar.isLuxury) ? '1.5px solid #d8b4fe' : '1.5px solid #bbf7d0',
                                        fontSize: '0.8rem',
                                        lineHeight: '1.45',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{ fontWeight: 800, color: (selectedModalCar.id === 'ds-alphard-fl' || selectedModalCar.id === 'ds-alphard-hev' || selectedModalCar.isLuxury) ? '#6b21a8' : '#15803d', marginBottom: '4px' }}>
                                            {(selectedModalCar.id === 'ds-alphard-fl' || selectedModalCar.id === 'ds-alphard-hev' || selectedModalCar.isLuxury)
                                                ? '✨ INCLUDE : All In (BBM, Mobil, Driver, Parkir) + Refreshment' 
                                                : '✅ INCLUDE : BBM, MOBIL, DRIVER'}
                                        </div>
                                        <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: '6px' }}>
                                            {(selectedModalCar.id === 'ds-alphard-fl' || selectedModalCar.id === 'ds-alphard-hev' || selectedModalCar.isLuxury)
                                                ? '• EXCLUDE : Retribusi Wisata, Konsumsi Driver.'
                                                : '• EXCLUDE : Parkir, Retribusi Wisata, Konsumsi Driver.'}
                                        </div>
                                        <div style={{ color: '#334155', fontWeight: 600, borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
                                            <div>* Untuk Pemakaian 14 Jam Dan Maksimal Jam 22.00.</div>
                                            <div style={{ marginTop: '2px', color: '#0369a1' }}>* Pemakaian Meliputi Area Gunungkidul Dan Magelang Kota.</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Right Column (Details) */}
                            <div className="modal-right">
                                <h2>{selectedModalCar.name}</h2>
                                <div className="modal-tag-row">
                                    <span className="badge badge-success">{selectedModalCar.badge || selectedModalCar.tag}</span>
                                    <span className="badge badge-accent">
                                        {activeService === 'lepasKunci' ? 'Lepas Kunci' : 'Dengan Sopir'}
                                    </span>
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
                                        {selectedModalCar.features?.map((feature: string, idx: number) => (
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
                                        {selectedModalCar.routes?.map((r: any, idx: number) => (
                                            <li className="modal-route-item" key={idx}>
                                                <strong>• {r.route}:</strong> {r.reason}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <a 
                                    href={`https://wa.me/628386000740?text=${encodeURIComponent(selectedModalCar.waMessage || `Halo Aksara Transport, saya ingin menyewa mobil ${selectedModalCar.name}`)}`}
                                    target="_blank" 
                                    rel="noopener" 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 800, marginTop: '10px', display: 'flex', justifyContent: 'center' }}
                                >
                                    Pesan Unit Ini via WA
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function CatalogMobil() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>}>
            <CatalogMobilInner />
        </Suspense>
    );
}
