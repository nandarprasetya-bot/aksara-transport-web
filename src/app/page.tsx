"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Data Katalog Sewa Mobil Lepas Kunci (8 Unit Sesuai Permintaan)
const lepasKunciCatalog = [
    {
        id: 'lk-brio',
        name: 'Honda Brio Matic',
        category: 'city',
        price: 'Rp 325.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 5,
        trans: 'Automatic',
        fuel: 'Bensin Irit',
        image: '/images/honda_brio.webp',
        tag: 'Paling Laris',
        desc: 'Honda Brio Matic adalah city car paling irit, lincah bermanuver, dan sangat praktis diparkir di pusat keramaian Jogja seperti Malioboro.',
        features: ['AC Dingin Sejuk', '5 Kursi Nyaman', 'Transmisi Matic Halus', 'Mesin 1200 CC Irit', 'Audio System & USB'],
        routes: [
            { route: 'Pusat Kota & Malioboro', reason: 'Sangat mudah bermanuver dan parkir di jalan sempit.' },
            { route: 'Wisata Kuliner Jogja', reason: 'Irit BBM untuk rute santai keliling resto & kafe hits.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Honda Brio Matic (Rp 325.000/hari).'
    },
    {
        id: 'lk-jazz',
        name: 'Honda Jazz Matic',
        category: 'city',
        price: 'Rp 375.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 5,
        trans: 'Automatic',
        fuel: 'Bensin',
        image: '/images/honda_jazz.webp',
        tag: 'Sporty & Lincah',
        desc: 'Honda Jazz Matic menghadirkan sensasi berkendara sporty dengan kabin fleksibel Ultra Seat. Akselerasi responsif dan sangat nyaman.',
        features: ['Ultra Seat Fleksibel', '5 Kursi Nyaman', 'Transmisi Matic Sporty', 'Mesin 1500 CC Bertenaga', 'Kabin Dinamis'],
        routes: [
            { route: 'Kawasan Malioboro & Keraton', reason: 'Desain sporty dan lincah melibas lalu lintas kota.' },
            { route: 'Candi Prambanan', reason: 'Akselerasi stabil dan nyaman di rute aspal antarkota.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Honda Jazz Matic (Rp 375.000/hari).'
    },
    {
        id: 'lk-raize',
        name: 'Toyota Raize Matic',
        category: 'suv',
        price: 'Rp 375.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 5,
        trans: 'Matic Turbo',
        fuel: 'Bensin',
        image: '/images/toyota_raize.webp',
        tag: 'Compact Turbo',
        desc: 'Toyota Raize Matic adalah Compact SUV modern dengan mesin turbo bertenaga dan ground clearance tinggi untuk rute perkotaan dan perbukitan.',
        features: ['Mesin 1000 CC Turbo', '5 Penumpang Nyaman', 'Ground Clearance Tinggi', 'Head Unit Digital', 'LED Headlamp'],
        routes: [
            { route: 'Kawasan Kaliurang & Merapi', reason: 'Torsi turbo bertenaga mantap di jalanan menanjak.' },
            { route: 'Bukit Bintang & Pathuk', reason: 'Lincah dan stabil di jalanan berkelok perbukitan.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Toyota Raize Matic (Rp 375.000/hari).'
    },
    {
        id: 'lk-avanza-fl',
        name: 'Toyota Avanza Facelift',
        category: 'family',
        price: 'Rp 350.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 7,
        trans: 'Manual / Matic',
        fuel: 'Bensin',
        image: '/images/toyota_avanza_facelift.webp',
        tag: 'Terpopuler',
        desc: 'Toyota Avanza Facelift adalah MPV andalan keluarga dengan kabin lapang, AC double blower dingin, dan efisiensi bahan bakar maksimal.',
        features: ['Double Blower AC Dingin', 'Kapasitas 7 Kursi', 'Bagasi Fleksibel Luas', 'Mesin 1300 CC Kuat', 'Dual SRS Airbag'],
        routes: [
            { route: 'Candi Borobudur & Prambanan', reason: 'Kabin lapang membuat seluruh anggota keluarga nyaman.' },
            { route: 'Wisata Pantai Parangtritis', reason: 'Tangguh dan suspensi stabil melintasi jalur selatan.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Toyota Avanza Facelift (Rp 350.000/hari).'
    },
    {
        id: 'lk-avanza-fwd',
        name: 'Toyota Avanza FWD Matic',
        category: 'family',
        price: 'Rp 375.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 7,
        trans: 'Matic CVT',
        fuel: 'Bensin',
        image: '/images/toyota_avanza_fwd.webp',
        tag: 'Kabin Senyap',
        desc: 'All New Avanza dengan penggerak roda depan (FWD) dan platform TNGA. Kabin ekstra senyap, suspensi empuk, dan legroom baris kedua sangat lega.',
        features: ['Penggerak Roda Depan (FWD)', 'Kapasitas 7 Kursi', 'Kabin Ekstra Senyap', 'Transmisi CVT Halus', 'Fitur Keselamatan Modern'],
        routes: [
            { route: 'Trip Wisata Candi Borobudur', reason: 'Suspensi empuk menjaga kebugaran keluarga di rute jauh.' },
            { route: 'Keliling Kota Yogyakarta', reason: 'Transmisi CVT sangat halus dan irit di kondisi stop-and-go.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Toyota Avanza FWD Matic (Rp 375.000/hari).'
    },
    {
        id: 'lk-xpander',
        name: 'Mitsubishi Xpander',
        category: 'family',
        price: 'Rp 400.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 7,
        trans: 'Matic',
        fuel: 'Bensin',
        image: '/images/mitsubishi_xpander.webp',
        tag: 'Suspensi Terbaik',
        desc: 'Mitsubishi Xpander menyajikan kenyamanan suspensi kelas atas dengan desain sporty Dynamic Shield. Kabin senyap dan ruang bagasi luas serbaguna.',
        features: ['Suspensi Kelas SUV', '7 Kursi Ergonomis', 'Desain Dynamic Shield', 'Kabin Sangat Kedap', 'Banyak Kompartemen'],
        routes: [
            { route: 'Pantai Indrayanti & Timang', reason: 'Meredam getaran jalan bergelombang dengan sangat sempurna.' },
            { route: 'Pusat Kota Jogja', reason: 'Kenyamanan kabin senyap dan AC dingin merata ke baris ketiga.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Mitsubishi Xpander (Rp 400.000/hari).'
    },
    {
        id: 'lk-innova-reborn',
        name: 'Toyota Innova Reborn',
        category: 'family',
        price: 'Rp 550.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 7,
        trans: 'Matic',
        fuel: 'Diesel Turbo',
        image: '/images/innova_reborn.webp',
        tag: 'Paling Nyaman',
        desc: 'Toyota Innova Reborn diesel menawarkan tenaga berlimpah dengan torsi kuat dan suspensi premium yang sangat stabil di semua medan rute Yogyakarta.',
        features: ['Mesin Diesel 2.4L Turbo', 'Kapasitas 7 Kursi Luas', 'AC Triple Blower', 'Kenyamanan Suspensi Tinggi', 'Kekedapan Maksimal'],
        routes: [
            { route: 'Rute Menanjak Gunungkidul', reason: 'Torsi diesel melibas tanjakan curam tanpa kendala.' },
            { route: 'Perjalanan Bisnis & Keluarga', reason: 'Tampilan prestisius dengan kenyamanan berkendara nomor satu.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Toyota Innova Reborn (Rp 550.000/hari).'
    },
    {
        id: 'lk-innova-zenix',
        name: 'Toyota Innova Zenix G',
        category: 'family',
        price: 'Rp 750.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 7,
        trans: 'Matic CVT',
        fuel: 'Bensin Modern',
        image: '/images/toyota_innova_zenix.webp',
        tag: 'Generasi Baru',
        desc: 'Toyota Innova Zenix G hadir dengan platform TNGA terbaru. Kabin ultra lapang, pengendalian presisi, dan rasa berkendara mewah khas crossover modern.',
        features: ['Platform TNGA Crossover', '7 Kursi Luas Mewah', 'Layar Multimedia Canggih', 'Transmisi 10-Speed CVT', 'Kenyamanan Berkendara Modern'],
        routes: [
            { route: 'Wisata Candi Prambanan & Boko', reason: 'Kabin tenang dan suspensi TNGA yang sangat stabil.' },
            { route: 'Tour Jogja - Solo', reason: 'Kenyamanan berkendara jarak jauh yang setara mobil luxury.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Toyota Innova Zenix G (Rp 750.000/hari).'
    },
    {
        id: 'lk-binguo-ev',
        name: 'Wuling Binguo EV',
        category: 'electric',
        price: 'Rp 500.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 4,
        trans: 'Matic EV',
        fuel: 'Baterai 333 KM',
        image: '/images/wuling_binguo.webp',
        tag: 'Mobil Listrik Modern',
        desc: 'Wuling Binguo EV menyajikan kenyamanan mobil listrik modern berdesain retro-futuristik. Senyap, ramah lingkungan, hemat tanpa BBM, dan jangkauan baterai hingga 333 KM.',
        features: ['100% Listrik Tanpa BBM', 'Jangkauan Baterai 333 KM', 'Kabin Retro Modern 4 Kursi', 'Smart Key & Digital Cluster', 'Kamera Parkir & Sensor'],
        routes: [
            { route: 'Heritage Tour (Taman Sari & Kotagede)', reason: 'Sangat lincah bermanuver di jalan bersejarah Jogja.' },
            { route: 'Kawasan Wisata Kaliurang', reason: 'Torsi instan responsif nyaman menanjak rute Merapi.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Wuling Binguo EV (Rp 500.000/hari).'
    },
    {
        id: 'lk-air-ev',
        name: 'Wuling Air EV',
        category: 'electric',
        price: 'Rp 450.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 4,
        trans: 'Matic EV',
        fuel: 'Baterai 300 KM',
        image: '/images/wuling_air_ev.webp',
        tag: 'Lincah & Irit',
        desc: 'Wuling Air EV adalah compact city car listrik yang paling lincah dan praktis di Jogja. Sangat mudah diparkir di pusat keramaian, senyap, bebas polusi, dan hemat biaya.',
        features: ['100% Full Electric (EV)', 'Jangkauan Baterai 300 KM', 'Kapasitas 4 Kursi', 'Sangat Mudah Parkir', 'Smart Keyless System'],
        routes: [
            { route: 'Kawasan Malioboro & Keraton', reason: 'Sangat gesit melibas jalanan kota Jogja dan gang sempit.' },
            { route: 'Wisata Kuliner Tengah Kota', reason: 'Praktis parkir di area resto & kafe tanpa khawatir BBM.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Wuling Air EV (Rp 450.000/hari).'
    },
    {
        id: 'lk-ioniq-5',
        name: 'Hyundai Ioniq 5',
        category: 'electric',
        price: 'Rp 1.500.000',
        period: '/hari',
        type: 'Lepas Kunci (Self Drive)',
        seats: 5,
        trans: 'Matic EV',
        fuel: 'Baterai 480 KM',
        image: '/images/hyundai_ioniq_5.webp',
        tag: 'VIP Electric',
        desc: 'Hyundai Ioniq 5 menghadirkan kemewahan SUV listrik kelas atas. Desain futuristik parametrik memukau, kabin VVIP ultra senyap dan lapang, serta akselerasi bertenaga.',
        features: ['Platform EV Premium E-GMP', 'Kapasitas 5 Kursi VVIP', 'Jangkauan Baterai 480 KM', 'Panoramic Sunroof & V2L', 'Fitur Keselamatan ADAS Canggih'],
        routes: [
            { route: 'Perjalanan Bisnis & Tamu VVIP', reason: 'Impresi prestisius dan kemewahan berkendara tingkat tertinggi.' },
            { route: 'Tour Wisata Eksklusif Yogyakarta', reason: 'Kenyamanan kabin senyap berkelas dan suspensi ultra empuk.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit LEPAS KUNCI Hyundai Ioniq 5 (Rp 1.500.000/hari).'
    }
];

// Data Katalog Sewa Mobil Dengan Driver (14 Unit Sesuai Permintaan)
const denganDriverCatalog = [
    {
        id: 'ds-avanza-fl',
        name: 'Toyota Avanza Facelift',
        category: 'family',
        price: 'Rp 650.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Bensin',
        image: '/images/toyota_avanza_facelift.webp',
        tag: 'Paling Favorit',
        desc: 'Paket hemat sewa Avanza Facelift lengkap dengan sopir ramah dan BBM. Bebas capek menyetir dan langsung diantar ke seluruh destinasi wisata favorit.',
        features: ['Sudah Termasuk Sopir + BBM', 'Kapasitas 7 Kursi', 'Driver Hafal Rute Wisata', 'AC Double Blower Dingin', 'Pelayanan Ramah & Santun'],
        routes: [
            { route: 'City Tour Jogja & Malioboro', reason: 'Bebas repot parkir, dijemput tepat waktu di lobi stasiun/hotel.' },
            { route: 'Candi Borobudur & Merapi', reason: 'Driver siap merekomendasikan spot foto dan tempat makan enak.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Avanza Facelift (Rp 650.000/hari).'
    },
    {
        id: 'ds-avanza-fwd',
        name: 'Toyota Avanza FWD',
        category: 'family',
        price: 'Rp 750.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Bensin',
        image: '/images/toyota_avanza_fwd.webp',
        tag: 'Kabin Nyaman',
        desc: 'New Avanza FWD generasi baru dengan kabin ekstra senyap dan legroom lapang. Ditemani driver handal dan sudah include BBM harian.',
        features: ['Sudah Termasuk Mobil + Driver + BBM', 'Kabin Ekstra Senyap', 'Kapasitas 7 Kursi', 'Suspensi Empuk TNGA', 'Driver Profesional'],
        routes: [
            { route: 'Wisata Candi Borobudur', reason: 'Perjalanan santai keluarga tanpa lelah menyetir.' },
            { route: 'Rute Kuliner Khas Jogja', reason: 'Driver siap mengantar ke sentra gudeg dan oleh-oleh terbaik.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Avanza FWD (Rp 750.000/hari).'
    },
    {
        id: 'ds-xpander',
        name: 'Mitsubishi Xpander',
        category: 'family',
        price: 'Rp 750.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Bensin',
        image: '/images/mitsubishi_xpander.webp',
        tag: 'Suspensi Empuk',
        desc: 'Kenyamanan suspensi MPV terbaik di kelasnya dipadukan dengan sopir berpengalaman. Cocok untuk wisata keluarga yang mengutamakan ketenangan.',
        features: ['Termasuk Mobil + Driver + BBM', 'Suspensi Super Empuk', 'Kapasitas 7 Penumpang', 'Kabin Hening & Dingin', 'Driver Paham Rute'],
        routes: [
            { route: 'Wisata Pantai Gunungkidul', reason: 'Suspensi empuk meredam jalanan berkelok beraspal bergelombang.' },
            { route: 'HeHa Sky View & Hutan Pinus', reason: 'Driver menguasai jalan alternatif bebas macet.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Mitsubishi Xpander (Rp 750.000/hari).'
    },
    {
        id: 'ds-innova-reborn',
        name: 'Toyota Innova Reborn',
        category: 'family',
        price: 'Rp 850.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Diesel Turbo',
        image: '/images/innova_reborn.webp',
        tag: 'Best Seller',
        desc: 'Unit terlaris untuk liburan keluarga dan kunjungan kerja di Jogja. Mesin diesel bertenaga, kabin mewah, dan suspensi sangat empuk.',
        features: ['Termasuk Mobil + Sopir + BBM', 'Mesin Diesel 2.4L Bertenaga', '7 Kursi Mewah Lapang', 'AC Triple Blower', 'Sopir Berbusana Rapi'],
        routes: [
            { route: 'Tour Pantai Slili & Indrayanti', reason: 'Tenaga diesel melibas tanjakan Gunungkidul dengan santai.' },
            { route: 'Kunjungan Dinas & VIP', reason: 'Tampilan representatif untuk menyambut tamu instansi/perusahaan.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Innova Reborn (Rp 850.000/hari).'
    },
    {
        id: 'ds-innova-zenix-g',
        name: 'Toyota Innova Zenix G',
        category: 'family',
        price: 'Rp 1.100.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Bensin Modern',
        image: '/images/toyota_innova_zenix.webp',
        tag: 'Elegan Modern',
        desc: 'Innova Zenix generasi terbaru dengan kemewahan kabin modern, platform TNGA, dan pelayanan sopir ramah standar eksekutif.',
        features: ['Include Mobil + Driver + BBM', 'Platform TNGA Mewah', 'Kabin Modern Sangat Lapang', 'Kenyamanan Eksekutif', 'Driver Berpengalaman'],
        routes: [
            { route: 'Wisata Candi Prambanan & Kraton', reason: 'Kenyamanan suspensi modern terbaik untuk keluarga.' },
            { route: 'Agenda Dinas & Protokoler', reason: 'Unit berpenampilan prestisius dan modern terkini.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Innova Zenix G (Rp 1.100.000/hari).'
    },
    {
        id: 'ds-zenix-q',
        name: 'Toyota Innova Zenix Q (Captain Seat)',
        category: 'luxury',
        price: 'Rp 1.400.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 6,
        trans: 'Driver Profesional',
        fuel: 'Hybrid Senyap',
        image: '/images/toyota_innova_zenix.webp',
        tag: 'Captain Seat VIP',
        desc: 'Tipe tertinggi Innova Zenix dengan jok Captain Seat Ottoman elektrik. Menghadirkan kenyamanan kelas eksekutif serasa naik private jet.',
        features: ['Captain Seat Ottoman Elektrik', 'Panoramic Sunroof Mewah', 'Mesin Hybrid Senyap & Halus', 'Driver Standar Protokoler', 'Include Driver + BBM'],
        routes: [
            { route: 'Tamu VIP & Pejabat', reason: 'Kenyamanan jok captain seat untuk relaksasi maksimal sepanjang jalan.' },
            { route: 'Honeymoon & Wedding Trip', reason: 'Nuansa mewah dengan panoramic roof dan kabin kedap suara.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Innova Zenix Q Captain Seat (Rp 1.400.000/hari).'
    },
    {
        id: 'ds-fortuner-gr',
        name: 'Toyota Fortuner GR Sport',
        category: 'suv',
        price: 'Rp 1.700.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Diesel Turbo',
        image: '/images/toyota_fortuner.webp',
        tag: 'Big SUV Gagah',
        desc: 'Big SUV gagah berkarakter tangguh dari divisi Toyota Gazoo Racing (GR). Tampil berwibawa di setiap acara dinas, bisnis, maupun wisata alam.',
        features: ['GR Sport Aerokit Mewah', 'Mesin 2.8L Diesel Turbo Kuat', 'Interior Kulit Sporty', 'Ground Clearance Tinggi', 'Include Driver + BBM'],
        routes: [
            { route: 'Lava Tour Merapi (Kaliurang)', reason: 'Sangat tangguh dan gagah di jalur lereng pegunungan.' },
            { route: 'Pengawalan & Tamu Kehormatan', reason: 'Tampilan gagah berwibawa memberikan impresi keamanan maksimal.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Fortuner GR Sport (Rp 1.700.000/hari).'
    },
    {
        id: 'ds-pajero-dakar',
        name: 'Mitsubishi Pajero Dakar',
        category: 'suv',
        price: 'Rp 1.700.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 7,
        trans: 'Driver Profesional',
        fuel: 'Diesel Turbo',
        image: '/images/mitsubishi_pajero.webp',
        tag: 'Prestige SUV',
        desc: 'SUV premium dengan performa mesin MIVEC Diesel bertenaga tinggi dan sunroof elektrik. Pilihan favorit tamu VIP dan pecinta SUV tangguh.',
        features: ['Sunroof Elektrik', 'Mesin MIVEC 2.4L Diesel Turbo', 'Leather Luxury Seats', 'Suspensi Tangguh & Nyaman', 'Include Driver + BBM'],
        routes: [
            { route: 'Wisata Alam Pantai Gunungkidul', reason: 'Sangat nyaman melibas medan terjal menuju hidden beach.' },
            { route: 'Event Perusahaan & Bisnis VIP', reason: 'Desain elegan dan sporty yang sangat prestisius.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Mitsubishi Pajero Dakar (Rp 1.700.000/hari).'
    },
    {
        id: 'ds-alphard-fl',
        name: 'Toyota Alphard Facelift',
        category: 'luxury',
        price: 'Rp 2.900.000',
        period: '/hari',
        type: 'All In (BBM, Mobil, Driver, Parkir) + Refreshment',
        seats: 6,
        trans: 'Driver Profesional',
        fuel: 'Bensin',
        image: '/images/toyota_alphard.webp',
        tag: 'Luxury VVIP',
        desc: 'Standar tertinggi kendaraan mewah di Yogyakarta. Paket All In lengkap BBM, Driver profesional, Parkir, dan Refreshment VIP. Dilengkapi pilot lounge captain seat dengan reclining ottoman, dual sunroof, dan privasi tinggi.',
        features: ['All In BBM, Mobil, Driver, Parkir', 'Free Refreshment VIP', 'Pilot Lounge Captain Seats', 'Dual Sunroof Mewah', 'Driver Berpakaian Formal'],
        routes: [
            { route: 'Protokoler Kenegaraan / Tamu VVIP', reason: 'Standar resmi penyambutan tokoh penting di Jogja.' },
            { route: 'Pernikahan (Wedding Car)', reason: 'Memberikan kesan megah dan mewah di hari istimewa.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Alphard Facelift All In BBM, Mobil, Driver, Parkir + Refreshment (Rp 2.900.000/hari).'
    },
    {
        id: 'ds-alphard-hev',
        name: 'Toyota Alphard HEV (Hybrid)',
        category: 'luxury',
        price: 'Rp 3.900.000',
        period: '/hari',
        type: 'All In (BBM, Mobil, Driver, Parkir) + Refreshment',
        seats: 6,
        trans: 'Driver Profesional',
        fuel: 'Hybrid Senyap',
        image: '/images/toyota_alphard_hev.webp',
        tag: 'Model Terbaru',
        desc: 'All New Alphard Hybrid generasi terbaru dengan kemewahan kabin ultra modern. Paket All In lengkap BBM, Driver profesional, Parkir, dan Refreshment VIP. Super senyap, berkelas, dan menghadirkan pengalaman VVIP tak tertandingi.',
        features: ['All In BBM, Mobil, Driver, Parkir', 'Free Refreshment VIP', 'Teknologi Hybrid Ultra Senyap', 'Executive Lounge Captain Seat', 'Driver VVIP Berdasi'],
        routes: [
            { route: 'Tamu Kehormatan & Direksi', reason: 'Kenyamanan terbaik untuk figur publik dan direksi korporasi.' },
            { route: 'Private Luxury Tour Jogja', reason: 'Jelajahi Jogja dengan standar kemewahan hotel bintang lima berjalan.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Alphard HEV Hybrid All In BBM, Mobil, Driver, Parkir + Refreshment (Rp 3.900.000/hari).'
    },
    {
        id: 'ds-hiace-commuter',
        name: 'Toyota Hiace Commuter (15 Seat)',
        category: 'microbus',
        price: 'Rp 1.200.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 15,
        trans: 'Driver Profesional',
        fuel: 'Diesel',
        image: '/images/toyota_hiace_commuter.webp',
        tag: 'Rombongan 15 Seat',
        desc: 'Solusi transportasi terbaik rombongan keluarga besar atau kantor. Memuat hingga 15 orang dengan kabin lapang, AC sejuk, dan bagasi memadai.',
        features: ['Kapasitas 15 Kursi Penumpang', 'AC Vent Dingin Tiap Kursi', 'Kabin Luas dan Bersih', 'Driver Berpengalaman Rombongan', 'Include Mobil + Driver + BBM'],
        routes: [
            { route: 'Tour Rombongan Candi & Tebing Breksi', reason: 'Sangat efisien menampung seluruh anggota rombongan dalam 1 armada.' },
            { route: 'Kunjungan Kerja / Studi Banding', reason: 'Perjalanan dinas yang kompak, tepat waktu, dan ekonomis.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Hiace Commuter 15 Seat (Rp 1.200.000/hari).'
    },
    {
        id: 'ds-hiace-premio',
        name: 'Toyota Hiace Premio (14 Seat)',
        category: 'microbus',
        price: 'Rp 1.400.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 14,
        trans: 'Driver Profesional',
        fuel: 'Diesel',
        image: '/images/toyota_hiace_premio.webp',
        tag: 'VIP 14 Seat',
        desc: 'Minibus premium dengan moncong depan modern (semi-bonnet). Plafon tinggi, suspensi empuk, dan legroom lapang untuk rombongan VIP.',
        features: ['Kapasitas 14 Kursi Ergonomis', 'Plafon Tinggi Lega', 'Suspensi Empuk Semi-Bonnet', 'Kabin Kedap & Wangi', 'Driver Rombongan Ramah'],
        routes: [
            { route: 'Wisata Hits Jogja-Solo-Semarang', reason: 'Suspensi sangat nyaman untuk perjalanan antarkota jarak jauh.' },
            { route: 'Rombongan Wedding & Family Gathering', reason: 'Nuansa modern yang membuat seluruh rombongan merasa diistimewakan.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Hiace Premio 14 Seat (Rp 1.400.000/hari).'
    },
    {
        id: 'ds-hiace-luxury',
        name: 'Toyota Hiace Premio Luxury (8-9 Seat)',
        category: 'luxury',
        price: 'Rp 2.400.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 9,
        trans: 'Driver Profesional',
        fuel: 'Diesel',
        image: '/images/toyota_hiace_premio.webp',
        tag: 'Royal Luxury Captain',
        desc: 'Modifikasi luxury eksklusif dengan jok Captain Seat berfitur massage, meja lipat, dan ambient lighting. Standar mewah untuk rombongan VVIP.',
        features: ['Captain Seat Mewah (8-9 Kursi)', 'Fitur Pijat Elektrik & Meja', 'Interior Kayu & Ambient Light', 'Smart Android TV & Audio', 'Pelayanan Driver VIP'],
        routes: [
            { route: 'Kunjungan Kerja Direksi Korporasi', reason: 'Fasilitas meeting berjalan dengan kenyamanan privat tak tertandingi.' },
            { route: 'Liburan Mewah Eksklusif Keluarga', reason: 'Kenyamanan first-class sepanjang perjalanan keliling Yogyakarta.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Toyota Hiace Premio Luxury 8-9 Seat (Rp 2.400.000/hari).'
    },
    {
        id: 'ds-elf-long',
        name: 'Isuzu Elf Long (19 Seat)',
        category: 'microbus',
        price: 'Rp 1.600.000',
        period: '/hari',
        type: 'All-In (Mobil + Driver + BBM)',
        seats: 19,
        trans: 'Driver Profesional',
        fuel: 'Diesel',
        image: '/images/elf_long.webp',
        tag: 'Rombongan 19 Seat',
        desc: 'Kapasitas maksimal hingga 19 orang penumpang untuk rombongan pariwisata, ziarah, gathering instansi, atau komunitas pecinta wisata Jogja.',
        features: ['Kapasitas 19 Kursi Penumpang', 'Bagasi Belakang Luas', 'AC Ducting Tiap Deret', 'Mesin Isuzu Diesel Tangguh', 'Driver Handal Berlisensi'],
        routes: [
            { route: 'Wisata Candi Borobudur & Prambanan', reason: 'Muat seluruh anggota rombongan besar secara hemat dan praktis.' },
            { route: 'Gathering Komunitas & Reuni', reason: 'Menciptakan suasana kebersamaan ceria sepanjang perjalanan.' }
        ],
        waText: 'Halo Aksara Transport, saya ingin sewa unit DENGAN DRIVER Isuzu Elf Long 19 Seat (Rp 1.600.000/hari).'
    }
];

// Reusable Auto-Sliding Catalog Slider (Berjalan otomatis di background)
function AutoSlideFleetSlider({
    id,
    badge,
    badgeClass,
    title,
    titleHighlight,
    subtitle,
    items,
    isDriverService,
    onSelectCar,
    onSwitchTab,
    switchTabText
}: {
    id: string;
    badge?: string;
    badgeClass?: string;
    title: string;
    titleHighlight?: string;
    subtitle?: string;
    items: any[];
    isDriverService: boolean;
    onSelectCar: (car: any, isDriver: boolean) => void;
    onSwitchTab?: () => void;
    switchTabText?: string;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [userTouching, setUserTouching] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getStep = () => {
        if (!trackRef.current) return 180;
        const card = trackRef.current.querySelector('.fleet-slide-card') as HTMLElement;
        if (!card) return 180;
        const computedGap = parseFloat(window.getComputedStyle(trackRef.current).gap);
        const gap = !isNaN(computedGap) ? computedGap : (window.innerWidth <= 768 ? 8 : 22);
        return card.offsetWidth + gap;
    };

    // IntersectionObserver: langsung jalankan animasi begitu elemen terlihat di viewport
    useEffect(() => {
        const el = trackRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setIsInView(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const slideNext = () => {
        if (trackRef.current) {
            const el = trackRef.current;
            const step = getStep();
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= maxScroll - 15) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: step, behavior: 'smooth' });
            }
        }
    };

    // Saat disentuh/hover: berhenti seketika
    const handleTouchStart = () => {
        setUserTouching(true);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    // Saat dilepas: langsung kembali jalan otomatis tanpa delay
    const handleTouchEnd = () => {
        setUserTouching(false);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            slideNext();
        }, 350);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            slideNext();
        }, 350);
    };

    // Auto-slide scroll otomatis: langsung aktif saat scroll ke bawah, jeda saat sentuh, lanjut tanpa delay saat lepas
    useEffect(() => {
        if (isPaused || userTouching || !isInView) return;

        const initialTimer = setTimeout(() => {
            slideNext();
        }, 700);

        const timer = setInterval(() => {
            slideNext();
        }, 2400);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(timer);
        };
    }, [isPaused, userTouching, isInView]);

    return (
        <div className="fleet-slider-box" id={id}>
            <div className="fleet-slider-header">
                <div className="fleet-slider-title-area">
                    {badge ? (
                        <span className={`fleet-slider-badge ${badgeClass || 'fleet-badge-orange'}`}>
                            {badge}
                        </span>
                    ) : null}
                    <h3 className="fleet-slider-heading">
                        {title} {titleHighlight ? <span style={{ color: '#F97316' }}>{titleHighlight}</span> : null}
                    </h3>
                    {subtitle ? <p className="fleet-slider-subheading">{subtitle}</p> : null}
                </div>
            </div>

            <div 
                className="fleet-slider-track-wrap"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={() => setUserTouching(false)}
            >
                <div 
                    ref={trackRef} 
                    className="fleet-slider-track"
                >
                    {items.map((car) => (
                        <div className="fleet-slide-card" key={car.id}>
                            <div 
                                className="fleet-card-img-area" 
                                onClick={() => onSelectCar(car, isDriverService)}
                                title="Klik untuk melihat spesifikasi detail"
                            >
                                <span className="fleet-card-badge-top">{car.tag}</span>
                                <span className="fleet-card-rating-top">4.9 / 5.0</span>
                                <Image 
                                    src={car.image} 
                                    alt={`Sewa ${car.name} Jogja`} 
                                    fill 
                                    className="fleet-card-car-img" 
                                    sizes="(max-width: 768px) 85vw, 33vw"
                                />
                            </div>

                            <div className="fleet-card-body">
                                <div>
                                    <h4 className="fleet-card-title">{car.name}</h4>
                                    
                                    <div className="fleet-card-specs">
                                        <span className="fleet-spec-tag">{car.seats} Kursi</span>
                                        <span className="fleet-spec-tag">{car.trans}</span>
                                        <span className="fleet-spec-tag">{car.fuel}</span>
                                    </div>

                                    {isDriverService ? (
                                        <div className="fleet-driver-clean-pill">
                                            {(car.id === 'ds-alphard-fl' || car.id === 'ds-alphard-hev') 
                                                ? 'All-In: BBM, Mobil, Driver, Parkir' 
                                                : 'All-In: Mobil + Driver + BBM'}
                                        </div>
                                    ) : (
                                        <div className="fleet-lk-clean-pill">
                                            Free Pengantaran Area Dalam Kota Jogja
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="fleet-card-price-row">
                                        <span className="fleet-card-price-label">Tarif Sewa</span>
                                        <div className="fleet-card-price-val">
                                            {car.price}
                                            <span className="fleet-card-price-unit">{car.period}</span>
                                        </div>
                                    </div>

                                    <div className="fleet-card-cta-group">
                                        <a 
                                            href={`https://wa.me/628386000740?text=${encodeURIComponent(car.waText)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-fleet-wa"
                                        >
                                            <span>Pesan WhatsApp</span>
                                        </a>

                                        <button 
                                            type="button" 
                                            onClick={() => onSelectCar(car, isDriverService)}
                                            className="btn-fleet-detail"
                                        >
                                            Cek Detail Unit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

// Data Layanan Unggulan (6 Maskot Resmi Selaras dengan Jogjasewamobil.com)
const layananServices = [
    {
        id: 'layanan-lepas-kunci',
        name: 'Lepas Kunci',
        mascot: '/images/mascot_lepas_kunci.webp',
        desc: 'Bebas berkendara sendiri dengan armada terbaik sesuai kebutuhan Anda.',
        waText: 'Halo, saya tertarik menanyakan ketersediaan mobil untuk layanan Lepas Kunci'
    },
    {
        id: 'layanan-dengan-driver',
        name: 'Dengan Driver',
        mascot: '/images/mascot_driver.webp',
        desc: 'Nikmati perjalanan tanpa lelah bersama driver profesional & ramah.',
        waText: 'Halo, saya tertarik menanyakan ketersediaan mobil untuk layanan Dengan Driver'
    },
    {
        id: 'layanan-paket-wisata',
        name: 'Paket Wisata',
        mascot: '/images/mascot_wisata.webp',
        desc: 'Jelajahi destinasi terbaik di Jogja dengan paket wisata menarik.',
        waText: 'Halo, saya tertarik menanyakan ketersediaan mobil untuk layanan Paket Wisata'
    },
    {
        id: 'layanan-drop-yia',
        name: 'Drop Off / In Out',
        mascot: '/images/mascot_airport.webp',
        desc: 'Antar jemput bandara YIA tepat waktu, nyaman dan bebas khawatir.',
        waText: 'Halo, saya tertarik menanyakan ketersediaan mobil untuk layanan Drop Off / In Out'
    },
    {
        id: 'layanan-drop-luar-kota',
        name: 'Drop In/Out Luar Kota',
        mascot: '/images/mascot_drop_luar_kota.webp',
        desc: 'Layanan drop antar kota nyaman, tepat waktu & profesional dari Jogja.',
        waText: 'Halo, saya tertarik menanyakan ketersediaan mobil untuk layanan Drop In/Out Luar Kota'
    },
    {
        id: 'layanan-wedding',
        name: 'Wedding Car',
        mascot: '/images/mascot_wedding.webp',
        desc: 'Armada mewah & elegan untuk hari istimewa pernikahan Anda.',
        waText: 'Halo, saya tertarik menanyakan ketersediaan mobil untuk layanan Wedding Car'
    }
];

// Komponen Auto-Slide Scroll Otomatis untuk Layanan Kami (Berjalan di background)
function AutoSlideLayananSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [userTouching, setUserTouching] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getStep = () => {
        if (!trackRef.current) return 260;
        const card = trackRef.current.querySelector('.layanan-card') as HTMLElement;
        const gap = typeof window !== 'undefined' && window.innerWidth <= 768 ? 12 : 16;
        return card ? card.offsetWidth + gap : 260;
    };

    // IntersectionObserver: langsung aktif ketika bagian ini masuk ke layar
    useEffect(() => {
        const el = trackRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setIsInView(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const slideNext = () => {
        if (trackRef.current) {
            const el = trackRef.current;
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (maxScroll <= 10) return;

            const step = getStep();
            if (el.scrollLeft >= maxScroll - 15) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: step, behavior: 'smooth' });
            }
        }
    };

    // Saat disentuh/hover: berhenti seketika
    const handleTouchStart = () => {
        setUserTouching(true);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    // Saat dilepas: langsung kembali jalan otomatis tanpa delay
    const handleTouchEnd = () => {
        setUserTouching(false);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            slideNext();
        }, 350);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            slideNext();
        }, 350);
    };

    // Auto-slide scroll otomatis: bergerak otomatis saat masuk layar, jeda saat sentuh, lanjut tanpa delay saat lepas
    useEffect(() => {
        if (isPaused || userTouching || !isInView) return;

        const initialTimer = setTimeout(() => {
            slideNext();
        }, 700);

        const timer = setInterval(() => {
            slideNext();
        }, 2400);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(timer);
        };
    }, [isPaused, userTouching, isInView]);

    return (
        <section className="layanan-section" style={{ background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)', paddingTop: '50px', paddingBottom: '36px' }}>
            <div className="container">
                <div className="layanan-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
                    <div>
                        <span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            LAYANAN KAMI
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.3rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, margin: 0 }}>
                            Solusi Perjalanan Anda di <span style={{ color: '#F97316' }}>Yogyakarta</span>
                        </h2>
                    </div>
                </div>

                <div 
                    className="layanan-grid-wrapper" 
                    style={{ position: 'relative' }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={() => setUserTouching(false)}
                >
                    <div className="layanan-grid" id="layanan-scroll" ref={trackRef}>
                        {layananServices.map((service) => (
                            <div className="layanan-card" key={service.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', border: '1px solid #ffffff' }}>
                                <div className="layanan-card-img" style={{ height: '180px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #EEF2FF 0%, #FFF7ED 100%)' }}>
                                    <img src={service.mascot} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                                </div>
                                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 className="layanan-card-title" style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', marginTop: 0 }}>{service.name}</h3>
                                    <p className="layanan-card-desc" style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, flex: 1, margin: 0, marginBottom: '12px' }}>
                                        {service.desc}
                                    </p>
                                    <a 
                                        href={`https://wa.me/628386000740?text=${encodeURIComponent(service.waText)}`}
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="layanan-card-btn"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                        Booking
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Data Mobil untuk Rotating Hero Showcase (Sebelah Kiri) - Versi HD Jernih & Presisi
const heroCars = [
    {
        name: 'Toyota Innova Zenix',
        category: 'MPV Premium Hybrid',
        price: 'Rp 750.000',
        period: '/hari',
        badge: 'Favorit Keluarga',
        image: '/images/hero_zenix_hd.webp',
        alt: 'Sewa Innova Zenix Jogja'
    },
    {
        name: 'Toyota Innova Reborn',
        category: 'Kenyamanan Maksimal',
        price: 'Rp 550.000',
        period: '/hari',
        badge: 'Paling Laris',
        image: '/images/hero_reborn_hd.webp',
        alt: 'Sewa Innova Reborn Jogja'
    },
    {
        name: 'Honda Brio Matic',
        category: 'City Car Irit',
        price: 'Rp 325.000',
        period: '/hari',
        badge: 'Lincah & Irit',
        image: '/images/hero_brio_hd.webp',
        alt: 'Sewa Honda Brio Jogja'
    },
    {
        name: 'Toyota Avanza Facelift',
        category: 'Mobil Keluarga Hemat',
        price: 'Rp 350.000',
        period: '/hari',
        badge: 'Ekonomis & Tangguh',
        image: '/images/hero_avanza_hd.webp',
        alt: 'Sewa Avanza Jogja'
    },
    {
        name: 'Toyota Hiace Premio',
        category: 'Executive Minibus',
        price: 'Rp 1.400.000',
        period: '/hari',
        badge: 'Rombongan Wisata',
        image: '/images/hero_hiace_hd.webp',
        alt: 'Sewa Hiace Premio Jogja'
    },
    {
        name: 'Toyota Alphard Transformers',
        category: 'Luxury VVIP',
        price: 'Rp 2.800.000',
        period: '/hari',
        badge: 'Mewah & Eksklusif',
        image: '/images/hero_alphard_hd.webp',
        alt: 'Sewa Alphard Jogja'
    }
];

export default function Home() {
    const [activeHeroCarIndex, setActiveHeroCarIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveHeroCarIndex((prev) => (prev + 1) % heroCars.length);
        }, 3200);
        return () => clearInterval(timer);
    }, []);

    const handleSelectCar = (car: any, isDriver: boolean) => {
        const isAlphard = car.id === 'ds-alphard-fl' || car.id === 'ds-alphard-hev';
        setSelectedModalCar({
            ...car,
            isDriverService: isDriver,
            isAlphard,
            priceLepasKunci: isDriver ? null : car.price,
            priceLepasKunciUnit: isDriver ? '' : car.period,
            priceDenganSopir: isDriver ? car.price : null,
            priceDenganSopirUnit: isDriver ? car.period : '',
            waMessageLepasKunci: isDriver ? '' : car.waText,
            waMessageDenganSopir: isDriver ? car.waText : ''
        });
    };

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Detail Modal State
    const [selectedModalCar, setSelectedModalCar] = useState<any>(null);

    // Availability Check Modal State
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
    const [availServiceType, setAvailServiceType] = useState<'lepas-kunci' | 'dengan-driver'>('lepas-kunci');
    const [availCar, setAvailCar] = useState('Toyota Innova Zenix Hybrid');
    const [availStartDate, setAvailStartDate] = useState('');
    const [availEndDate, setAvailEndDate] = useState('');
    const [availLocation, setAvailLocation] = useState('');
    const [availNotes, setAvailNotes] = useState('');

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

        setAvailStartDate(formatLocal(today));
        setAvailEndDate(formatLocal(tomorrow));
    }, []);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setAvailStartDate(val);
        const start = new Date(val);
        const end = new Date(availEndDate);
        if (end < start) {
            const newEnd = new Date(start);
            newEnd.setDate(newEnd.getDate() + 1);
            const yyyy = newEnd.getFullYear();
            const mm = String(newEnd.getMonth() + 1).padStart(2, '0');
            const dd = String(newEnd.getDate()).padStart(2, '0');
            setAvailEndDate(`${yyyy}-${mm}-${dd}`);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvailEndDate(e.target.value);
    };

    const handleAvailabilitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceLabel = availServiceType === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Driver)' : 'Dengan Driver (Driver + BBM)';
        
        const textMessage = `*Cek Ketersediaan Unit Sewa Mobil - Aksara Transport*
--------------------------------------------
Halo Aksara Transport, saya ingin menanyakan ketersediaan rental mobil dengan rincian berikut:

• *Jenis Armada:* ${availCar || 'Pilihan Rekomendasi'}
• *Layanan:* ${serviceLabel}
• *Tanggal Sewa:* ${availStartDate} s.d. ${availEndDate}
• *Lokasi Antar/Jemput:* ${availLocation || 'Kota Jogja / Stasiun / Hotel'}
${availNotes ? `• *Catatan Khusus:* ${availNotes}\n` : ''}
Mohon konfirmasi ketersediaan unit dan penawaran tarif terbaiknya. Terima kasih!`;

        window.open(`https://wa.me/628386000740?text=${encodeURIComponent(textMessage)}`, '_blank');
        setShowAvailabilityModal(false);
    };

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



    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };



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



    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'AutoRental',
                '@id': 'https://jogjasewamobil.com/#autorental',
                name: 'Aksara Transport Jogja - Sewa & Rental Mobil Murah',
                alternateName: ['Aksara Transport', 'Rental Mobil Jogja Aksara', 'Jogja Sewa Mobil'],
                url: 'https://jogjasewamobil.com',
                logo: 'https://jogjasewamobil.com/icon.png',
                image: 'https://jogjasewamobil.com/images/hero_reborn_hd.webp',
                description: 'Layanan sewa mobil Jogja lepas kunci 24 jam dan sewa mobil dengan driver profesional murah di Yogyakarta. Armada Brio, Avanza, Innova Reborn, Zenix Hybrid, Hiace Premio & Alphard dengan free antar jemput stasiun dan hotel.',
                telephone: '+628386000740',
                priceRange: 'IDR 250.000 - IDR 2.800.000',
                currenciesAccepted: 'IDR',
                paymentAccepted: 'Cash, Bank Transfer, QRIS, BCA, Mandiri, BRI, E-Wallet',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Jl. Imogiri Barat No.RT.4, Salakan, Bangunharjo, Kec. Sewon',
                    addressLocality: 'Bantul',
                    addressRegion: 'Daerah Istimewa Yogyakarta',
                    postalCode: '55188',
                    addressCountry: 'ID'
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: -7.8427,
                    longitude: 110.3705
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        opens: '00:00',
                        closes: '23:59'
                    }
                ],
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '358',
                    bestRating: '5',
                    worstRating: '1'
                },
                areaServed: [
                    { '@type': 'AdministrativeArea', name: 'Kota Yogyakarta' },
                    { '@type': 'AdministrativeArea', name: 'Kabupaten Sleman' },
                    { '@type': 'AdministrativeArea', name: 'Kabupaten Bantul' },
                    { '@type': 'AdministrativeArea', name: 'Kabupaten Kulon Progo' },
                    { '@type': 'AdministrativeArea', name: 'Kabupaten Gunungkidul' }
                ]
            },
            {
                '@type': 'FAQPage',
                '@id': 'https://jogjasewamobil.com/#faq',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Apa saja syarat untuk sewa mobil lepas kunci?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Untuk rental mobil tanpa sopir (lepas kunci), Anda cukup melampirkan foto KTP asli, SIM A aktif, bukti reservasi tiket pesawat/kereta atau booking hotel tempat menginap di Jogja. CS kami akan melakukan survei singkat secara online untuk verifikasi dokumen.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah biaya sewa dengan driver sudah termasuk BBM, tol, dan parkir?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Tarif sewa dasar Dengan Sopir (Driver) sudah termasuk jasa sopir berpengalaman dan mobil. Namun biaya bahan bakar (BBM), tol, tiket parkir, serta konsumsi driver menjadi tanggung jawab penyewa. Anda juga dapat memilih Paket All-In (Mobil + Supir + BBM) jika tidak ingin repot.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Bagaimana jika terjadi keterlambatan pengembalian unit sewa (overtime)?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Kami memberikan toleransi keterlambatan pengembalian hingga 1 jam. Keterlambatan lebih dari batas tersebut dikenakan biaya denda overtime sebesar 10% per jam dari harga sewa harian mobil bersangkutan. Keterlambatan melebihi 5 jam akan dihitung sebagai sewa tambahan 1 hari penuh.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah mobil boleh dibawa keluar daerah Yogyakarta?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Ya, kami memperbolehkan perjalanan luar kota (misalnya ke Jawa Tengah, Jawa Timur, dll). Untuk rental lepas kunci ke luar kota Jogja, minimal durasi penyewaan adalah 2 hari berturut-turut. Sangat disarankan menyewa dengan sopir demi faktor keamanan perjalanan jauh.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Bagaimana kebijakan pembatalan (refund) sewa?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Pembatalan pesanan sebelum H-3 jadwal rental tidak dikenakan biaya denda (refund penuh/gratis pembatalan). Pembatalan pada H-2 hingga H-1 dikenakan denda sebesar 50% dari total biaya hari pertama. Sedangkan pembatalan pada hari H (no-show) dikenakan denda 100% dari total tagihan.'
                        }
                    }
                ]
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Beranda',
                        item: 'https://jogjasewamobil.com/'
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Sewa Mobil Lepas Kunci Jogja',
                        item: 'https://jogjasewamobil.com/#slider-lepas-kunci'
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Rental Mobil Dengan Driver Jogja',
                        item: 'https://jogjasewamobil.com/#slider-dengan-driver'
                    }
                ]
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* HERO BRIGHT SECTION: BIRU MUDA CERAH DENGAN GAMBAR MOBIL BERGANTIAN DI SEBELAH KIRI */}
            <section className="hero-bright-section">
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="hero-bright-grid">
                        
                        {/* SEBELAH KIRI: Gambar Mobil yang Bergantian */}
                        <div className="hero-car-showcase">
                            <div className="hero-car-stage">
                                <div className="hero-car-pedestal"></div>
                                {heroCars.map((car, idx) => (
                                    <div 
                                        key={car.name}
                                        className={`hero-car-img-wrap ${idx === activeHeroCarIndex ? 'active' : 'inactive'}`}
                                    >
                                        <Image 
                                            src={car.image} 
                                            alt={car.alt} 
                                            width={900}
                                            height={520}
                                            priority={idx <= 1}
                                            unoptimized={true}
                                            className="hero-car-img" 
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Floating Car Info Bar */}
                            <div className="hero-car-info-bar">
                                <div>
                                    <span className="hero-car-info-name">{heroCars[activeHeroCarIndex].name}</span>
                                    <span className="hero-car-info-badge">{heroCars[activeHeroCarIndex].badge} • {heroCars[activeHeroCarIndex].category}</span>
                                </div>
                                <div className="hero-car-info-price">
                                    <span className="hero-car-price-val">{heroCars[activeHeroCarIndex].price}</span>
                                    <span className="hero-car-price-unit">{heroCars[activeHeroCarIndex].period}</span>
                                </div>
                            </div>

                            {/* Dot Indicators */}
                            <div className="hero-car-dots">
                                {heroCars.map((_, idx) => (
                                    <button 
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveHeroCarIndex(idx)}
                                        className={`hero-car-dot ${idx === activeHeroCarIndex ? 'active' : ''}`}
                                        aria-label={`Pilih mobil ${heroCars[idx].name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SEBELAH KANAN: Headline, Keunggulan & Tombol WhatsApp */}
                        <div className="hero-bright-content">
                            <span className="hero-tagline-badge">
                                AKSARATRANSPORT.COM • JOGJA SEWA MOBIL
                            </span>

                            <h1 className="hero-bright-title">
                                Sewa Mobil di Jogja<br />
                                <span style={{ color: '#F97316' }}>Mudah, Aman &amp; Terpercaya</span>
                            </h1>

                            <p className="hero-bright-desc">
                                Layanan sewa mobil Jogja lepas kunci 24 jam dan dengan driver profesional. Armada terbaru, bersih, wangi, dan prima dengan jaminan harga transparan serta free antar jemput di Stasiun Tugu, Lempuyangan, atau Hotel.
                            </p>

                            <div className="hero-feature-pill-list">
                                <span className="hero-feature-pill">Free Pengantaran Area Dalam Kota Jogja</span>
                                <span className="hero-feature-pill">Driver Profesional Ramah</span>
                                <span className="hero-feature-pill">Harga Bersahabat &amp; Transparan</span>
                                <span className="hero-feature-pill">Free Antar Jemput Stasiun/Hotel</span>
                            </div>

                            <div className="hero-cta-buttons">
                                <a 
                                    href="https://wa.me/628386000740?text=Halo%20Aksara%20Transport%2C%20saya%20tertarik%20tanya%20sewa%20mobil%20di%20Jogja."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-hero-primary"
                                >
                                    <span>Pesan via WhatsApp</span>
                                </a>

                                <button 
                                    type="button"
                                    onClick={() => setShowAvailabilityModal(true)}
                                    className="btn-hero-secondary"
                                >
                                    <span>Cek Ketersediaan Unit</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* LAYANAN SECTION WITH 6 OFFICIAL MASCOTS (AUTO-SLIDE RESPONSIVE) */}
            <AutoSlideLayananSection />

            {/* KATALOG ARMADA DENGAN TAMPILAN TETAP: LEPAS KUNCI DI ATAS, DENGAN DRIVER DI BAWAHNYA */}
            <section id="armada" className="catalog-section">
                <style dangerouslySetInnerHTML={{ __html: `
                    @media (max-width: 768px) {
                        #armada {
                            padding-top: 20px !important;
                            padding-bottom: 24px !important;
                        }
                        #armada .catalog-header-area {
                            margin-bottom: 14px !important;
                        }
                        #armada .catalog-header-area .badge {
                            font-size: 0.68rem !important;
                            padding: 3px 8px !important;
                        }
                        #armada .catalog-header-area .section-title {
                            font-size: 1.2rem !important;
                            margin-bottom: 3px !important;
                        }
                        #armada .catalog-header-area .section-subtitle {
                            font-size: 0.74rem !important;
                            line-height: 1.35 !important;
                        }
                        .fleet-slider-box {
                            padding: 12px 8px 8px 8px !important;
                            border-radius: 14px !important;
                            margin-bottom: 16px !important;
                            background: #ffffff !important;
                            border: 1px solid #e2e8f0 !important;
                            border-top: 3px solid #F97316 !important;
                        }
                        .fleet-slider-header {
                            margin-bottom: 8px !important;
                            gap: 4px !important;
                        }
                        .fleet-slider-badge {
                            font-size: 0.64rem !important;
                            padding: 2px 7px !important;
                            margin-bottom: 2px !important;
                            letter-spacing: 0.04em !important;
                        }
                        .fleet-slider-heading {
                            font-size: 1.15rem !important;
                            font-weight: 800 !important;
                            color: #0B1B3D !important;
                            margin-bottom: 4px !important;
                            line-height: 1.25 !important;
                        }
                        .fleet-slider-subheading {
                            font-size: 0.82rem !important;
                            color: #475569 !important;
                            line-height: 1.45 !important;
                            margin-bottom: 8px !important;
                        }
                        .fleet-slider-actions {
                            display: flex !important;
                            width: 100% !important;
                            justify-content: space-between !important;
                            align-items: center !important;
                            gap: 4px !important;
                        }
                        .fleet-status-pill {
                            font-size: 0.62rem !important;
                            padding: 3px 7px !important;
                        }
                        .fleet-btn-toggle-play {
                            font-size: 0.62rem !important;
                            padding: 3px 7px !important;
                        }
                        .fleet-nav-btn {
                            width: 26px !important;
                            height: 26px !important;
                        }
                        .fleet-slider-track-wrap {
                            margin: 0 !important;
                            padding: 2px 0 !important;
                        }
                        .fleet-slider-track {
                            gap: 8px !important;
                            padding-bottom: 6px !important;
                            scroll-snap-type: x mandatory !important;
                            overscroll-behavior-x: contain !important;
                            overscroll-behavior-y: auto !important;
                            touch-action: pan-x pan-y !important;
                            padding-left: 1px !important;
                            padding-right: 1px !important;
                        }
                        .fleet-slide-card {
                            flex: 0 0 calc(50% - 4px) !important;
                            min-width: calc(50% - 4px) !important;
                            max-width: calc(50% - 4px) !important;
                            width: calc(50% - 4px) !important;
                            border-radius: 14px !important;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
                            border: 1px solid #e2e8f0 !important;
                            touch-action: pan-y pinch-zoom !important;
                            scroll-snap-align: start !important;
                            box-sizing: border-box !important;
                        }
                        .fleet-card-img-area {
                            height: 105px !important;
                            padding: 6px 6px !important;
                            background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) !important;
                        }
                        .fleet-card-badge-top {
                            font-size: 0.58rem !important;
                            padding: 2px 6px !important;
                            top: 6px !important;
                            left: 6px !important;
                            border-radius: 4px !important;
                        }
                        .fleet-card-rating-top {
                            font-size: 0.58rem !important;
                            padding: 2px 5px !important;
                            top: 6px !important;
                            right: 6px !important;
                            border-radius: 4px !important;
                        }
                        .fleet-card-body {
                            padding: 8px 8px 10px 8px !important;
                            display: flex !important;
                            flex-direction: column !important;
                            justify-content: space-between !important;
                            flex: 1 !important;
                        }
                        .fleet-card-title {
                            font-size: 0.84rem !important;
                            font-weight: 800 !important;
                            margin-bottom: 3px !important;
                            line-height: 1.22 !important;
                            display: -webkit-box !important;
                            -webkit-line-clamp: 2 !important;
                            -webkit-box-orient: vertical !important;
                            overflow: hidden !important;
                            text-overflow: ellipsis !important;
                            white-space: normal !important;
                            min-height: 2.1em !important;
                            color: #0f172a !important;
                        }
                        .fleet-card-specs {
                            display: flex !important;
                            flex-wrap: wrap !important;
                            gap: 2px !important;
                            margin-bottom: 5px !important;
                        }
                        .fleet-spec-tag {
                            font-size: 0.58rem !important;
                            padding: 2px 4px !important;
                            border-radius: 4px !important;
                            gap: 2px !important;
                            white-space: nowrap !important;
                        }
                        .fleet-driver-clean-pill,
                        .fleet-lk-clean-pill {
                            font-size: 0.60rem !important;
                            padding: 3px 5px !important;
                            border-radius: 5px !important;
                            margin-bottom: 5px !important;
                            line-height: 1.3 !important;
                            font-weight: 700 !important;
                            background: #FFF7ED !important;
                            color: #EA580C !important;
                            border: 1px solid rgba(234, 88, 12, 0.2) !important;
                            text-align: center !important;
                            white-space: normal !important;
                        }
                        .fleet-card-price-row {
                            padding-top: 5px !important;
                            margin-bottom: 5px !important;
                            border-top: 1px solid #f1f5f9 !important;
                            display: flex !important;
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            gap: 1px !important;
                        }
                        .fleet-card-price-label {
                            font-size: 0.56rem !important;
                            color: #64748b !important;
                            line-height: 1 !important;
                        }
                        .fleet-card-price-val {
                            font-size: 0.92rem !important;
                            font-weight: 900 !important;
                            color: #F97316 !important;
                            line-height: 1.1 !important;
                        }
                        .fleet-card-price-unit {
                            font-size: 0.58rem !important;
                            color: #94a3b8 !important;
                            font-weight: normal !important;
                        }
                        .fleet-card-cta-group {
                            gap: 4px !important;
                        }
                        .btn-fleet-wa {
                            padding: 6px 4px !important;
                            font-size: 0.68rem !important;
                            font-weight: 700 !important;
                            border-radius: 7px !important;
                            gap: 3px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            white-space: nowrap !important;
                            width: 100% !important;
                            box-sizing: border-box !important;
                        }
                        .btn-fleet-wa svg {
                            width: 12px !important;
                            height: 12px !important;
                            flex-shrink: 0 !important;
                        }
                        .btn-fleet-detail {
                            font-size: 0.6rem !important;
                            padding: 2px 0 !important;
                            font-weight: 600 !important;
                            white-space: nowrap !important;
                            text-align: center !important;
                            width: 100% !important;
                        }
                    }
                    @media (max-width: 400px) {
                        .fleet-slider-track {
                            gap: 8px !important;
                        }
                        .fleet-slide-card {
                            flex: 0 0 calc(50% - 4px) !important;
                            min-width: calc(50% - 4px) !important;
                            max-width: calc(50% - 4px) !important;
                            width: calc(50% - 4px) !important;
                        }
                        .fleet-card-img-area {
                            height: 96px !important;
                            padding: 4px 6px !important;
                        }
                        .fleet-card-title {
                            font-size: 0.78rem !important;
                        }
                        .fleet-card-price-val {
                            font-size: 0.88rem !important;
                        }
                        .btn-fleet-wa {
                            font-size: 0.65rem !important;
                            padding: 5px 3px !important;
                        }
                        .btn-fleet-detail {
                            font-size: 0.58rem !important;
                        }
                    }
                `}} />
                <div className="container">
                    <div className="text-center catalog-header-area">
                        <span style={{ color: '#F97316', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '8px' }}>
                            ----- AKSARA TRANSPORT -----
                        </span>
                        <h2 className="section-title">Sewa Mobil Lepas Kunci &amp; Dengan Driver</h2>
                        <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
                            Unit armada terbaru yang wangi, bersih, dan prima, siap disesuaikan dengan kebutuhan aktivitas berkendara Anda.
                        </p>
                    </div>

                    {/* 1. Tampilan Tetap: Sewa Mobil Lepas Kunci */}
                    <AutoSlideFleetSlider
                        id="slider-lepas-kunci"
                        badge="LEPAS KUNCI"
                        badgeClass="fleet-badge-orange"
                        title="Rental Mobil"
                        titleHighlight="Lepas Kunci"
                        subtitle="Layanan sewa mobil lepas kunci di Yogyakarta dengan armada bersih, nyaman, dan terawat."
                        items={lepasKunciCatalog}
                        isDriverService={false}
                        onSelectCar={handleSelectCar}
                    />

                    {/* 2. Tampilan Tetap di Bawahnya: Sewa Mobil Dengan Driver */}
                    <AutoSlideFleetSlider
                        id="slider-dengan-driver"
                        badge="DENGAN DRIVER"
                        badgeClass="fleet-badge-orange"
                        title="Rental Mobil"
                        titleHighlight="Dengan Driver"
                        subtitle="Layanan sewa mobil di Yogyakarta lengkap bersama driver profesional dan paket All-In BBM."
                        items={denganDriverCatalog}
                        isDriverService={true}
                        onSelectCar={handleSelectCar}
                    />
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section-padding" style={{ backgroundColor: '#ffffff', paddingTop: '90px', paddingBottom: '90px' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '45px' }}>
                        <span className="badge badge-accent">Panduan Cepat</span>
                        <h2 className="section-title">4 Langkah Mudah Sewa Mobil di Jogja</h2>
                        <p className="section-subtitle">Proses penyewaan armada di Aksara Transport sangat praktis dan cepat, selesai dalam kurang dari 5 menit via WhatsApp.</p>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h4>Pilih Mobil Sesuai Kebutuhan</h4>
                            <p>Tentukan tipe mobil yang Anda inginkan (City Car, MPV Keluarga, EV, atau Minibus) dan sistem sewa (Lepas Kunci / Driver).</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h4>Pilih Tanggal &amp; Rute</h4>
                            <p>Tentukan durasi penggunaan mobil, tanggal mulai hingga selesai, serta lokasi serah terima unit (Stasiun, Bandara, atau Hotel).</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h4>Konfirmasi via WhatsApp</h4>
                            <p>Klik tombol booking untuk terhubung ke CS kami. Verifikasi identitas (KTP &amp; SIM A) dilakukan cepat secara online tanpa ribet.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">04</div>
                            <h4>Mobil Diantar &amp; Siap Jalan</h4>
                            <p>Unit yang sudah dicuci bersih dan wangi langsung diantarkan tepat waktu ke lokasi Anda. Nikmati liburan keliling Jogja!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section-padding testi-modern-section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '45px' }}>
                        <div className="testi-trust-pill">
                            <span className="testi-trust-rating">4.9 / 5.0</span>
                            <span className="testi-trust-divider">|</span>
                            <span className="testi-trust-text">Rating dari 350+ Ulasan Google Terverifikasi</span>
                        </div>
                        <h2 className="section-title">Apa Kata Pelanggan Aksara Transport?</h2>
                        <p className="section-subtitle">Ribuan wisatawan domestik, keluarga, hingga instansi telah mempercayakan kenyamanan perjalanannya di Jogja kepada kami.</p>
                    </div>
                    
                    <div className="testi-modern-grid">
                        {/* Review 1 */}
                        <div className="testi-modern-card">
                            <div className="testi-card-header">
                                <span className="testi-badge-service badge-lepas-kunci">LEPAS KUNCI</span>
                                <span className="testi-verified-text">Terverifikasi Google • 2 hari lalu</span>
                            </div>
                            <div className="testi-card-fleet-tag">Armada: Honda Brio Satya E CVT</div>
                            <p className="testi-card-comment">
                                &ldquo;Sewa mobil lepas kunci di Aksara Transport sangat praktis dan menyenangkan. Verifikasi identitas cepat via WhatsApp tanpa ribet, unit Brio Matic diantarkan tepat waktu ke Stasiun Tugu dalam kondisi sangat bersih, wangi, dan bensin full. Keliling spot kuliner Jogja jadi bebas dan santai!&rdquo;
                            </p>
                            <div className="testi-card-footer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="testi-avatar avatar-blue">B</div>
                                    <div>
                                        <h4 className="testi-author-name">Budi Santoso</h4>
                                        <span className="testi-author-role">Wisatawan Domestik (Jakarta)</span>
                                    </div>
                                </div>
                                <span className="testi-rating-badge">Skor 5.0 / 5.0</span>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="testi-modern-card">
                            <div className="testi-card-header">
                                <span className="testi-badge-service badge-dengan-driver">DENGAN DRIVER</span>
                                <span className="testi-verified-text">Terverifikasi Google • 5 hari lalu</span>
                            </div>
                            <div className="testi-card-fleet-tag">Armada: New Toyota Avanza Facelift</div>
                            <p className="testi-card-comment">
                                &ldquo;Pakai paket Avanza dengan sopir untuk liburan keluarga ke Pantai Timang dan HeHa Sky View di Gunungkidul. Mas sopirnya sangat sopan, ramah, dan hafal jalan tikus menghindari macet saat libur panjang. Orang tua dan anak-anak nyaman sepanjang perjalanan.&rdquo;
                            </p>
                            <div className="testi-card-footer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="testi-avatar avatar-orange">R</div>
                                    <div>
                                        <h4 className="testi-author-name">Rina Melati &amp; Keluarga</h4>
                                        <span className="testi-author-role">Liburan Keluarga (Surabaya)</span>
                                    </div>
                                </div>
                                <span className="testi-rating-badge">Skor 5.0 / 5.0</span>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div className="testi-modern-card">
                            <div className="testi-card-header">
                                <span className="testi-badge-service badge-dinas">PERJALANAN DINAS</span>
                                <span className="testi-verified-text">Terverifikasi Google • 1 minggu lalu</span>
                            </div>
                            <div className="testi-card-fleet-tag">Armada: Toyota Innova Zenix Hybrid</div>
                            <p className="testi-card-comment">
                                &ldquo;Sewa Innova Zenix untuk agenda dinas dan kunjungan kerja di Yogyakarta. Pelayanan admin sangat responsif 24 jam, invoice resmi dan bukti serah terima cepat disiapkan untuk kebutuhan reimbursement kantor kami. Unit sangat senyap dan berkelas.&rdquo;
                            </p>
                            <div className="testi-card-footer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="testi-avatar avatar-indigo">D</div>
                                    <div>
                                        <h4 className="testi-author-name">Dimas Setiawan</h4>
                                        <span className="testi-author-role">PT Megah Nusantara (Bandung)</span>
                                    </div>
                                </div>
                                <span className="testi-rating-badge">Skor 5.0 / 5.0</span>
                            </div>
                        </div>

                        {/* Review 4 */}
                        <div className="testi-modern-card">
                            <div className="testi-card-header">
                                <span className="testi-badge-service badge-vvip">LAYANAN VVIP</span>
                                <span className="testi-verified-text">Terverifikasi Google • 1 minggu lalu</span>
                            </div>
                            <div className="testi-card-fleet-tag">Armada: Toyota Alphard Facelift VIP</div>
                            <p className="testi-card-comment">
                                &ldquo;Memesan Alphard untuk menyambut tamu kehormatan dari Jakarta. Driver berpakaian rapi dan tepat waktu standby di Bandara Internasional YIA. Kondisi kendaraan sangat prima layaknya baru keluar dari dealer. Standar pelayanan VVIP terbaik di Jogja.&rdquo;
                            </p>
                            <div className="testi-card-footer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="testi-avatar avatar-purple">H</div>
                                    <div>
                                        <h4 className="testi-author-name">dr. Hendra Wijaya</h4>
                                        <span className="testi-author-role">Kunjungan Profesional (Semarang)</span>
                                    </div>
                                </div>
                                <span className="testi-rating-badge">Skor 5.0 / 5.0</span>
                            </div>
                        </div>

                        {/* Review 5 */}
                        <div className="testi-modern-card">
                            <div className="testi-card-header">
                                <span className="testi-badge-service badge-rombongan">ROMBONGAN WISATA</span>
                                <span className="testi-verified-text">Terverifikasi Google • 2 minggu lalu</span>
                            </div>
                            <div className="testi-card-fleet-tag">Armada: Toyota Hiace Premio Luxury</div>
                            <p className="testi-card-comment">
                                &ldquo;Rombongan kami 12 orang sewa Hiace Premio selama 3 hari keliling Candi Prambanan, Lava Tour Merapi, dan Tebing Breksi. Kabin sangat lapang, suspensi empuk, dan AC dingin merata. Driver sangat sabar dan bahkan membantu mengambil foto dokumentasi kami.&rdquo;
                            </p>
                            <div className="testi-card-footer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="testi-avatar avatar-teal">S</div>
                                    <div>
                                        <h4 className="testi-author-name">Saraswati &amp; Rekan</h4>
                                        <span className="testi-author-role">Wisata Rombongan (Tangerang)</span>
                                    </div>
                                </div>
                                <span className="testi-rating-badge">Skor 5.0 / 5.0</span>
                            </div>
                        </div>

                        {/* Review 6 */}
                        <div className="testi-modern-card">
                            <div className="testi-card-header">
                                <span className="testi-badge-service badge-dropoff">DROP OFF BANDARA</span>
                                <span className="testi-verified-text">Terverifikasi Google • 3 minggu lalu</span>
                            </div>
                            <div className="testi-card-fleet-tag">Armada: Toyota Innova Reborn Diesel</div>
                            <p className="testi-card-comment">
                                &ldquo;Butuh rental Innova Reborn mendadak malam hari untuk drop off dini hari ke Bandara YIA Kulon Progo. CS merespons dengan cepat dan ramah, mobil tiba 30 menit sebelum jadwal penjemputan. Pelayanan sangat terpercaya dan tepat waktu.&rdquo;
                            </p>
                            <div className="testi-card-footer">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div className="testi-avatar avatar-emerald">F</div>
                                    <div>
                                        <h4 className="testi-author-name">Fachri Ramadhan</h4>
                                        <span className="testi-author-role">Perjalanan Bisnis (Medan)</span>
                                    </div>
                                </div>
                                <span className="testi-rating-badge">Skor 5.0 / 5.0</span>
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

                    {/* Animated Sideways Gallery Conveyor */}
                    {(() => {
                        const filtered = galleryImages.filter(img => activeGalleryTab === 'all' || img.category === activeGalleryTab);
                        // Duplicate items to ensure seamless infinite looping animation
                        const marqueeList = [...filtered, ...filtered, ...filtered, ...filtered].slice(0, Math.max(8, filtered.length * 2));
                        return (
                            <div className="gallery-marquee-viewport">
                                <div className="gallery-marquee-track">
                                    {marqueeList.map((img, index) => (
                                        <div 
                                            className="gallery-marquee-item" 
                                            key={index} 
                                            onClick={() => setActiveLightbox(img.src)}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={img.caption}
                                        >
                                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                <Image 
                                                    src={img.src} 
                                                    alt={img.caption} 
                                                    fill 
                                                    style={{ objectFit: 'cover' }} 
                                                    className="gallery-img-hover"
                                                    sizes="(max-width: 768px) 260px, 320px"
                                                />
                                            </div>
                                            <span className="gallery-item-tag">{img.tag}</span>
                                            <div className="gallery-item-overlay">
                                                <p className="gallery-item-caption">{img.caption}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="gallery-marquee-hint">
                                    Klik foto untuk memperbesar tampilan • Sentuh atau arahkan kursor untuk menjeda animasi
                                </p>
                            </div>
                        );
                    })()}
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

                    {/* FAQ WhatsApp Support Box */}
                    <div className="faq-support-card">
                        <div className="faq-support-content">
                            <span className="faq-support-tag">BANTUAN &amp; KONSULTASI 24 JAM</span>
                            <h3 className="faq-support-title">Masih Memiliki Pertanyaan Lain Seputar Rental Mobil?</h3>
                            <p className="faq-support-desc">
                                Tim reservasi Aksara Transport siap memberikan konsultasi gratis seputar ketersediaan unit, rekomendasi rute wisata Jogja, dan estimasi biaya tanpa komitmen.
                            </p>
                        </div>
                        <a 
                            href="https://wa.me/628386000740?text=Halo%20Aksara%20Transport%2C%20saya%20ingin%20konsultasi%20mengenai%20sewa%20mobil%20di%20Jogja."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-faq-support"
                        >
                            Konsultasi Gratis via WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* POPUP CEK KETERSEDIAAN UNIT ARMADA */}
            {showAvailabilityModal && (
                <div className="modal-overlay" onClick={() => setShowAvailabilityModal(false)}>
                    <div 
                        className="modal-container availability-modal-card" 
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <button 
                            type="button"
                            className="modal-close-btn" 
                            onClick={() => setShowAvailabilityModal(false)} 
                            aria-label="Tutup popup"
                        >
                            ✕
                        </button>

                        <div className="avail-modal-header">
                            <span className="avail-modal-badge">AKSARATRANSPORT.COM</span>
                            <h2 className="avail-modal-title">Cek Ketersediaan Unit</h2>
                            <p className="avail-modal-subtitle">
                                Pilih jenis armada, tanggal perjalanan, dan paket layanan. Admin kami akan segera mengecek unit dan memberikan penawaran terbaik via WhatsApp.
                            </p>
                        </div>

                        <form onSubmit={handleAvailabilitySubmit} className="avail-modal-form">
                            {/* Pilihan Layanan */}
                            <div className="avail-form-group">
                                <label className="avail-form-label">Pilihan Layanan</label>
                                <div className="avail-service-tabs">
                                    <button
                                        type="button"
                                        onClick={() => setAvailServiceType('lepas-kunci')}
                                        className={`avail-service-tab ${availServiceType === 'lepas-kunci' ? 'active' : ''}`}
                                    >
                                        Tanpa Driver (Lepas Kunci)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAvailServiceType('dengan-driver')}
                                        className={`avail-service-tab ${availServiceType === 'dengan-driver' ? 'active' : ''}`}
                                    >
                                        Dengan Driver (+ BBM)
                                    </button>
                                </div>
                            </div>

                            {/* Jenis Armada */}
                            <div className="avail-form-group">
                                <label className="avail-form-label" htmlFor="avail-car-select">Jenis / Model Armada</label>
                                <select
                                    id="avail-car-select"
                                    value={availCar}
                                    onChange={(e) => setAvailCar(e.target.value)}
                                    className="avail-form-select"
                                    required
                                >
                                    <optgroup label="Paling Populer &amp; Favorit">
                                        <option value="Toyota Innova Zenix Hybrid">Toyota Innova Zenix Hybrid</option>
                                        <option value="Toyota Innova Reborn Diesel">Toyota Innova Reborn Diesel</option>
                                        <option value="Toyota Avanza Facelift">Toyota Avanza Facelift</option>
                                        <option value="Honda Brio Matic">Honda Brio Matic</option>
                                    </optgroup>
                                    <optgroup label="Family MPV">
                                        <option value="Toyota Avanza FWD Matic">Toyota Avanza FWD Matic</option>
                                        <option value="Mitsubishi Xpander">Mitsubishi Xpander</option>
                                        <option value="Toyota Raize Matic">Toyota Raize Matic</option>
                                    </optgroup>
                                    <optgroup label="SUV Tangguh">
                                        <option value="Toyota Fortuner VRZ">Toyota Fortuner VRZ</option>
                                        <option value="Mitsubishi Pajero Sport">Mitsubishi Pajero Sport</option>
                                    </optgroup>
                                    <optgroup label="Executive Minibus &amp; Rombongan">
                                        <option value="Toyota Hiace Premio Luxury">Toyota Hiace Premio Luxury</option>
                                        <option value="Toyota Hiace Commuter 15 Seat">Toyota Hiace Commuter 15 Seat</option>
                                        <option value="Isuzu Elf Long 19 Seat">Isuzu Elf Long 19 Seat</option>
                                    </optgroup>
                                    <optgroup label="Luxury VVIP">
                                        <option value="Toyota Alphard Transformers">Toyota Alphard Transformers</option>
                                        <option value="Toyota Alphard HEV 2024">Toyota Alphard HEV 2024</option>
                                    </optgroup>
                                    <optgroup label="City Car &amp; Mobil Listrik (EV)">
                                        <option value="Toyota Agya Facelift">Toyota Agya Facelift</option>
                                        <option value="Wuling Binguo EV">Wuling Binguo EV</option>
                                        <option value="Hyundai Ioniq 5 EV">Hyundai Ioniq 5 EV</option>
                                    </optgroup>
                                    <optgroup label="Konsultasi">
                                        <option value="Belum Tahu / Butuh Rekomendasi Terbaik">Belum Tahu / Butuh Rekomendasi Terbaik</option>
                                    </optgroup>
                                </select>
                            </div>

                            {/* Tanggal Sewa */}
                            <div className="avail-form-row">
                                <div className="avail-form-group">
                                    <label className="avail-form-label" htmlFor="avail-start-date">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        id="avail-start-date"
                                        value={availStartDate}
                                        onChange={handleStartDateChange}
                                        min={availStartDate}
                                        className="avail-form-input"
                                        required
                                    />
                                </div>
                                <div className="avail-form-group">
                                    <label className="avail-form-label" htmlFor="avail-end-date">Tanggal Selesai</label>
                                    <input
                                        type="date"
                                        id="avail-end-date"
                                        value={availEndDate}
                                        onChange={handleEndDateChange}
                                        min={availStartDate}
                                        className="avail-form-input"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Lokasi Penjemputan */}
                            <div className="avail-form-group">
                                <label className="avail-form-label" htmlFor="avail-location">Lokasi Antar / Penjemputan</label>
                                <input
                                    type="text"
                                    id="avail-location"
                                    value={availLocation}
                                    onChange={(e) => setAvailLocation(e.target.value)}
                                    placeholder="Contoh: Stasiun Tugu / Bandara YIA / Hotel Malioboro"
                                    className="avail-form-input"
                                />
                            </div>

                            {/* Catatan Tambahan (Opsional) */}
                            <div className="avail-form-group">
                                <label className="avail-form-label" htmlFor="avail-notes">Catatan Tambahan (Opsional)</label>
                                <input
                                    type="text"
                                    id="avail-notes"
                                    value={availNotes}
                                    onChange={(e) => setAvailNotes(e.target.value)}
                                    placeholder="Contoh: Jemput jam 08.00 pagi, perlu car seat"
                                    className="avail-form-input"
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn-avail-submit">
                                <span>Kirim Cek Ketersediaan via WhatsApp</span>
                            </button>

                            <p className="avail-modal-guarantee">
                                Fast Response 24 Jam • Tarif Transparan • Free Antar Jemput Stasiun/Hotel
                            </p>
                        </form>
                    </div>
                </div>
            )}

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
                                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                                                {selectedModalCar.isAlphard ? 'All In VIP + Driver:' : '+ Driver + BBM:'}
                                            </span>
                                            <strong style={{ color: 'var(--accent)' }}>{selectedModalCar.priceDenganSopir} <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{selectedModalCar.priceDenganSopirUnit}</span></strong>
                                        </div>
                                    )}
                                </div>
                                {selectedModalCar.priceLepasKunci && (
                                    <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic', lineHeight: '1.4', textAlign: 'center' }}>
                                        * Note: Tarif Lepas Kunci dihitung per 12 Jam / 24 Jam. Silakan tanyakan syarat & ketentuan via WhatsApp.
                                    </p>
                                )}
                                {selectedModalCar.isDriverService && (
                                    <div style={{
                                        marginTop: '12px',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        backgroundColor: selectedModalCar.isAlphard ? '#faf5ff' : '#f0fdf4',
                                        border: selectedModalCar.isAlphard ? '1.5px solid #d8b4fe' : '1.5px solid #bbf7d0',
                                        fontSize: '0.8rem',
                                        lineHeight: '1.45',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{ fontWeight: 800, color: selectedModalCar.isAlphard ? '#6b21a8' : '#15803d', marginBottom: '4px' }}>
                                            {selectedModalCar.isAlphard 
                                                ? '✨ INCLUDE : All In (BBM, Mobil, Driver, Parkir) + Refreshment' 
                                                : '✅ INCLUDE : BBM, MOBIL, DRIVER'}
                                        </div>
                                        <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: '6px' }}>
                                            {selectedModalCar.isAlphard
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
                                            style={{ width: '100%', padding: '12px', fontSize: '0.9rem', fontWeight: 800, display: 'flex', justifyContent: 'center', backgroundColor: selectedModalCar.isAlphard ? '#7e22ce' : undefined, borderColor: selectedModalCar.isAlphard ? '#7e22ce' : undefined }}
                                        >
                                            {selectedModalCar.isAlphard ? 'Pesan Alphard All-In via WA' : 'Pesan + Driver + BBM via WA'}
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
                <div className="sticky-mobile-info">
                    <div className="sticky-mobile-status">
                        <span className="pulsing-green-dot"></span>
                        <span className="sticky-mobile-status-text">Fast Response 24 Jam</span>
                    </div>
                    <span className="sticky-mobile-brand">Aksara Transport Jogja</span>
                </div>
                <a 
                    href="https://wa.me/628386000740?text=Halo%20Aksara%20Transport%2C%20saya%20tertarik%20tanya%20sewa%20mobil%20di%20Jogja." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-sticky-mobile"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Chat WA Sekarang</span>
                </a>
            </div>
        </>
    );
}
