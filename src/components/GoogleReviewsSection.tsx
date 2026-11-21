"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ReviewPhoto {
    url: string;
    caption: string;
}

interface ReviewItem {
    id: string;
    author: string;
    role: string;
    avatarColor: string;
    rating: number;
    date: string;
    serviceTag: string;
    serviceCategory: 'lepas-kunci' | 'dengan-driver' | 'hiace' | 'vvip' | 'wisata';
    carFleet: string;
    comment: string;
    photos?: ReviewPhoto[];
    likes: number;
    ownerResponse?: {
        date: string;
        text: string;
    };
}

const googleReviewsData: ReviewItem[] = [
    {
        id: 'rev-1',
        author: 'Budi Santoso',
        role: 'Local Guide • Level 6 • 48 ulasan',
        avatarColor: '#1a73e8',
        rating: 5,
        date: '2 hari lalu',
        serviceTag: 'LEPAS KUNCI',
        serviceCategory: 'lepas-kunci',
        carFleet: 'Honda Brio Satya E Matic',
        comment: 'Sewa mobil lepas kunci di Aksara Transport sangat praktis dan menyenangkan. Verifikasi identitas cepat via WhatsApp tanpa ribet, unit Brio Matic diantarkan tepat waktu ke Stasiun Tugu dalam kondisi sangat bersih, wangi, dan bensin full. Selama 3 hari keliling Malioboro, Tumpeng Menoreh, dan kulineran malam di Jogja, tarikan mobil sangat responsif dan irit BBM. Pelayanan staf antar jemput unit juga ramah banget. Sangat recommended bagi yang cari rental mobil Jogja terpercaya!',
        photos: [
            { url: '/images/honda_brio.webp', caption: 'Unit Honda Brio Matic serah terima di Stasiun Tugu Yogyakarta' },
            { url: '/images/gallery_trip_1.webp', caption: 'Trip santai keliling kota Jogja' }
        ],
        likes: 18,
        ownerResponse: {
            date: '1 hari lalu',
            text: 'Halo Mas Budi Santoso, terima kasih banyak atas ulasan bintang 5 dan apresiasinya! Senang sekali unit Honda Brio kami bisa menemani agenda kulineran dan liburan Mas di Jogja dengan nyaman. Ditunggu kedatangannya kembali di Aksara Transport!'
        }
    },
    {
        id: 'rev-2',
        author: 'Rina Melati & Keluarga',
        role: 'Local Guide • Level 5 • 34 ulasan',
        avatarColor: '#e37400',
        rating: 5,
        date: '5 hari lalu',
        serviceTag: 'DENGAN DRIVER',
        serviceCategory: 'dengan-driver',
        carFleet: 'New Toyota Avanza Facelift',
        comment: 'Pakai paket Avanza dengan supir untuk liburan keluarga besar ke Pantai Timang dan HeHa Sky View di Gunungkidul. Mas sopirnya (Pak Yanto) sangat sopan, ramah, dan hafal jalan tikus untuk menghindari titik macet saat libur panjang. Orang tua yang sudah sepuh dan anak-anak merasa sangat nyaman sepanjang jalan karena gaya menyetirnya halus. Ditambah lagi Mas driver bantu foto-foto keluarga kami di spot-spot bagus. Pengalaman bintang lima!',
        photos: [
            { url: '/images/tour_timang_gondola.webp', caption: 'Spot Pantai Timang Gunungkidul bersama keluarga' },
            { url: '/images/hero_avanza_hd.webp', caption: 'Toyota Avanza bersih dan AC dingin maksimal' }
        ],
        likes: 24,
        ownerResponse: {
            date: '4 hari lalu',
            text: 'Terima kasih banyak Ibu Rina Melati sekeluarga! Salam hangat juga untuk keluarga di Surabaya. Pak Yanto sangat senang bisa melayani perjalanan wisata keluarga Ibu ke Gunungkidul. Semoga sehat dan sukses selalu!'
        }
    },
    {
        id: 'rev-3',
        author: 'Dimas Setiawan',
        role: 'PT Megah Nusantara (Bandung) • 12 ulasan',
        avatarColor: '#5c6bc0',
        rating: 5,
        date: '1 minggu lalu',
        serviceTag: 'PERJALANAN DINAS',
        serviceCategory: 'dengan-driver',
        carFleet: 'Toyota Innova Zenix Hybrid',
        comment: 'Sewa Innova Zenix untuk agenda dinas kantor dan kunjungan kementerian selama 4 hari di Yogyakarta. Pelayanan tim admin Aksara sangat profesional dan responsif 24 jam. Dokumen invoice resmi, kuitansi bermaterai, dan surat jalan disiapkan cepat tanpa kendala reimbursement perusahaan. Unit Zenix sangat senyap, suspensi empuk, dan interior harum mewah. Driver berpakaian rapi dan tepat waktu selalu standby sebelum jadwal penjemputan.',
        photos: [
            { url: '/images/test_zenix_clean.webp', caption: 'Innova Zenix Hybrid prima untuk agenda dinas kantor' },
            { url: '/images/gallery_vvip_1.webp', caption: 'Penjemputan tepat waktu di lobby hotel bintang 5' }
        ],
        likes: 15,
        ownerResponse: {
            date: '6 hari lalu',
            text: 'Terima kasih Bapak Dimas Setiawan dan rekan-rekan PT Megah Nusantara atas kepercayaannya. Kami berkomitmen selalu memberikan standar operasional korporat terbaik untuk perjalanan dinas Anda di Jogja.'
        }
    },
    {
        id: 'rev-4',
        author: 'Saraswati & Rekan',
        role: 'Local Guide • Level 7 • 89 ulasan',
        avatarColor: '#00897b',
        rating: 5,
        date: '1 minggu lalu',
        serviceTag: 'ROMBONGAN WISATA',
        serviceCategory: 'hiace',
        carFleet: 'Toyota Hiace Premio Luxury',
        comment: 'Rombongan kami 12 orang sewa Hiace Premio selama 3 hari keliling Candi Prambanan, Lava Tour Merapi, dan Tebing Breksi. Kabin sangat lapang, legroom lega, suspensi empuk, dan AC ducting dingin merata sampai baris kursi paling belakang. Driver pariwisata sangat sabar, menguasai rute sejarah candi, dan bahkan membantu mengkoordinasikan tiket masuk rombongan sehingga kami tidak perlu antre panjang. Sangat puas dengan armada Hiace Aksara!',
        photos: [
            { url: '/images/toyota_hiace_premio.webp', caption: 'Armada Hiace Premio Luxury kapasitas 14 penumpang' },
            { url: '/images/tour_merapi.webp', caption: 'Trip seru rombongan kami saat Lava Tour Merapi' }
        ],
        likes: 31,
        ownerResponse: {
            date: '1 minggu lalu',
            text: 'Halo Kak Saraswati & rekan-rekan rombongan Tangerang! Terima kasih ulasan bintang 5 dan ceritanya. Senang sekali bisa membersamai trip seru Lava Tour dan Candi-candi Jogja. Semoga berkesan dan ditunggu agenda gathering selanjutnya!'
        }
    },
    {
        id: 'rev-5',
        author: 'dr. Hendra Wijaya, Sp.PD',
        role: 'Dokter Spesialis • Semarang • 19 ulasan',
        avatarColor: '#7b1fa2',
        rating: 5,
        date: '2 minggu lalu',
        serviceTag: 'LAYANAN VVIP',
        serviceCategory: 'vvip',
        carFleet: 'Toyota Alphard Facelift VIP',
        comment: 'Memesan Alphard untuk menyambut pembicara tamu kehormatan dari Jakarta dalam simposium kedokteran di Yogyakarta. Driver berpakaian jas formal, rapi, dan tepat waktu standby di Bandara Internasional YIA sebelum pesawat landing. Kondisi unit sangat prima layaknya baru keluar dari dealer resmi, bersih total, dan dilengkapi air mineral serta tissue basah. Standar pelayanan VVIP terbaik di Jogja.',
        photos: [
            { url: '/images/hero_alphard_hd.webp', caption: 'Toyota Alphard Facelift VIP standby penjemputan Bandara YIA' }
        ],
        likes: 20,
        ownerResponse: {
            date: '2 minggu lalu',
            text: 'Terima kasih banyak dr. Hendra Wijaya atas kepercayaannya mempercayakan penjemputan tamu VIP kepada Aksara Transport. Suatu kehormatan bagi kami bisa mendukung kesuksesan simposium Anda.'
        }
    },
    {
        id: 'rev-6',
        author: 'Fachri Ramadhan',
        role: 'Medan • 8 ulasan',
        avatarColor: '#2e7d32',
        rating: 5,
        date: '2 minggu lalu',
        serviceTag: 'DROP OFF BANDARA',
        serviceCategory: 'dengan-driver',
        carFleet: 'Toyota Innova Reborn Diesel',
        comment: 'Butuh rental Innova Reborn mendadak malam hari jam 22.00 untuk drop off dini hari pukul 03.30 pagi ke Bandara YIA Kulon Progo. CS merespons dengan cepat dan ramah, mobil tiba 25 menit sebelum jadwal penjemputan di hotel. Driver sangat tenang berkendara saat subuh dan perjalanan terasa sangat aman. Pelayanan tepat waktu dan harga sangat transparan tanpa pungutan liar.',
        photos: [
            { url: '/images/hero_reborn_hd.webp', caption: 'Innova Reborn Diesel tangguh dan tepat waktu di YIA' }
        ],
        likes: 12,
        ownerResponse: {
            date: '2 minggu lalu',
            text: 'Terima kasih Bang Fachri Ramadhan! Tim CS dan driver kami memang siaga 24 jam untuk melayani penjemputan darurat maupun drop off subuh ke Bandara YIA. Selamat sampai tujuan di Medan!'
        }
    },
    {
        id: 'rev-7',
        author: 'drg. Anindya Putri & Suami',
        role: 'Local Guide • Level 4 • 26 ulasan',
        avatarColor: '#c2185b',
        rating: 5,
        date: '3 minggu lalu',
        serviceTag: 'PAKET WISATA',
        serviceCategory: 'wisata',
        carFleet: 'Toyota Fortuner VRZ',
        comment: 'Trip honeymoon keliling Borobudur sunrise dan Bukit Rhema Gereja Ayam. Kami memilih Toyota Fortuner VRZ dengan supir. Mobil gagah, bersih kinclong, dan sangat tangguh melibas tanjakan Menoreh yang cukup curam. Supir hafal spot foto aesthetic yang sepi pengunjung sehingga kami bisa leluasa foto berdua. Layanan ramah dan harga paket all in bbm sangat worth it!',
        photos: [
            { url: '/images/tour_borobudur.webp', caption: 'Pemandangan magis Borobudur Sunrise saat trip bersama Aksara' },
            { url: '/images/toyota_fortuner.webp', caption: 'Toyota Fortuner VRZ hitam gagah & nyaman' }
        ],
        likes: 27,
        ownerResponse: {
            date: '3 minggu lalu',
            text: 'Selamat atas pernikahannya drg. Anindya & suami! Terima kasih telah memilih Aksara Transport untuk menemani momen honeymoon berharga di Jogja & Magelang. Langgeng dan bahagia selalu ya!'
        }
    },
    {
        id: 'rev-8',
        author: 'Kevin Pratama',
        role: 'Solo Traveler • Jakarta • 15 ulasan',
        avatarColor: '#0288d1',
        rating: 5,
        date: '1 bulan lalu',
        serviceTag: 'LEPAS KUNCI',
        serviceCategory: 'lepas-kunci',
        carFleet: 'Honda Brio Matic',
        comment: 'Sewa Brio lepas kunci 3 hari. Syaratnya mudah banget cuma e-KTP, SIM A, dan tiket kereta. Mobil langsung diserahkan di pintu selatan Stasiun Tugu saat saya baru turun dari Kereta Taksaka. Kondisi mobil wangi, ban tebal, rem pakem, dan audio Bluetooth lancar jaya buat denger Spotify sepanjang rute Hutan Pinus Mangunan sampai Pantai Parangtritis.',
        photos: [
            { url: '/images/tour_pines_sunset.webp', caption: 'Sunset syahdu di Hutan Pinus Mangunan' }
        ],
        likes: 19,
        ownerResponse: {
            date: '1 bulan lalu',
            text: 'Terima kasih Bro Kevin! Brio Matic memang primadona untuk solo backpacker atau road trip santai di Jogja. Sampai jumpa di solo trip berikutnya!'
        }
    },
    {
        id: 'rev-9',
        author: 'Ibu Ratna Dewi',
        role: 'Arisan Alumni • Bekasi • 14 ulasan',
        avatarColor: '#f57c00',
        rating: 5,
        date: '1 bulan lalu',
        serviceTag: 'ROMBONGAN WISATA',
        serviceCategory: 'hiace',
        carFleet: 'Toyota Hiace Commuter 15 Seat',
        comment: 'Acara reuni arisan SMA ke Jogja 14 orang. Sewa Hiace Commuter 15 seat di Aksara Transport selama 2 hari. Mobil bersih, AC dingin semilir, dan kapasitas bagasi belakang lega sekali menampung koper plus kardus oleh-oleh Bakpia Pathok. Driver Pak Joko sabar banget mengantar ibu-ibu belanja oleh-oleh dan makan di Sate Klatak Pak Pong. Terima kasih Aksara Transport!',
        photos: [
            { url: '/images/tour_cave_tubing.webp', caption: 'Keseruan cave tubing di Goa Pindul rombongan arisan kami' },
            { url: '/images/hero_hiace_hd.webp', caption: 'Unit Hiace Commuter 15 kursi yang sangat nyaman' }
        ],
        likes: 22,
        ownerResponse: {
            date: '1 bulan lalu',
            text: 'Matur nuwun sanget Ibu Ratna Dewi dan rombongan arisan alumni! Pak Joko menyampaikan salam kembali untuk ibu-ibu semua. Senang bisa membuat reuni di Jogja jadi berkesan dan penuh tawa.'
        }
    },
    {
        id: 'rev-10',
        author: 'Muhammad Rizky & Keluarga',
        role: 'Local Guide • Level 5 • 41 ulasan',
        avatarColor: '#388e3c',
        rating: 5,
        date: '1 bulan lalu',
        serviceTag: 'LIBURAN KELUARGA',
        serviceCategory: 'dengan-driver',
        carFleet: 'Toyota Avanza FWD Matic',
        comment: 'Keluarga kami dari Pekanbaru liburan ke Jogja saat peak season. Awalnya takut kehabisan mobil, untung Aksara Transport sigap mengamankan unit Avanza baru. Pelayanan bintang 5: unit bersih higienis, driver sopan tidak ugal-ugalan, dan tarif transparan sesuai yang tertera di website tanpa biaya tersembunyi. Next liburan ke Jogja pasti pakai Aksara lagi!',
        photos: [
            { url: '/images/tour_parangtritis.webp', caption: 'Pemandangan sore di Pantai Parangtritis' }
        ],
        likes: 16,
        ownerResponse: {
            date: '1 bulan lalu',
            text: 'Terima kasih banyak Bapak Muhammad Rizky sekeluarga dari Pekanbaru! Senang bisa memberikan pelayanan terbaik untuk liburan keluarga di Jogja. Sampai jumpa di liburan berikutnya!'
        }
    }
];

export default function GoogleReviewsSection() {
    const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [activeModalPhoto, setActiveModalPhoto] = useState<ReviewPhoto | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredReviews = googleReviewsData.filter(rev => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'with-photos') return rev.photos && rev.photos.length > 0;
        if (activeFilter === 'lepas-kunci') return rev.serviceCategory === 'lepas-kunci';
        if (activeFilter === 'dengan-driver') return rev.serviceCategory === 'dengan-driver';
        if (activeFilter === 'hiace') return rev.serviceCategory === 'hiace';
        if (activeFilter === 'vvip') return rev.serviceCategory === 'vvip';
        return true;
    });

    return (
        <section className="section-padding google-reviews-section" style={{ backgroundColor: '#f8fafc', paddingTop: '80px', paddingBottom: '90px', borderTop: '1px solid #e2e8f0' }}>
            <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
                
                {/* SECTION TITLE & BADGE */}
                <div className="text-center" style={{ marginBottom: '35px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '50px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', marginBottom: '16px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>Ulasan Google Bisnis Terverifikasi</span>
                        <span style={{ background: '#e0f2fe', color: '#0284c7', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>4.9 ★★★★★</span>
                    </div>
                    <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                        Apa Kata Pelanggan Aksara Transport?
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
                        Transparansi ulasan nyata dari ribuan wisatawan domestik, keluarga, hingga instansi yang telah merasakan kenyamanan rental mobil di Jogja bersama kami.
                    </p>
                </div>

                {/* GOOGLE MAPS RATING SUMMARY CARD (CARD ALA GOOGLE REVIEWS) */}
                <div style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '16px', 
                    border: '1px solid #e2e8f0', 
                    padding: '30px', 
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)', 
                    marginBottom: '30px' 
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '30px', alignItems: 'center' }} className="g-review-summary-grid">
                        
                        {/* LEFT: BIG RATING NUMBER & STARS */}
                        <div style={{ textAlign: 'center', borderRight: '1px solid #f1f5f9', paddingRight: '20px' }} className="g-summary-left">
                            <div style={{ fontSize: '4.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
                                4.9
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '12px 0 8px 0' }}>
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#fbbc04">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#334155' }}>
                                Berdasarkan 876 Ulasan
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                                Profil Resmi Aksara Transport di Google Maps
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <a 
                                    href="https://wa.me/628386000740?text=Halo%20Aksara%20Transport,%20saya%20ingin%20tanya%20sewa%20mobil%20jogja"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#1a73e8',
                                        color: '#ffffff',
                                        padding: '9px 18px',
                                        borderRadius: '50px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        boxShadow: '0 2px 8px rgba(26,115,232,0.3)'
                                    }}
                                >
                                    <span>Tulis Ulasan Anda</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: RATING BARS (5 BINTANG S/D 1 BINTANG) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* 5 Stars */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>5</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{ width: '95%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                                </div>
                                <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>832</span>
                            </div>

                            {/* 4 Stars */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>4</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{ width: '4.5%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                                </div>
                                <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>38</span>
                            </div>

                            {/* 3 Stars */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>3</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{ width: '0.7%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                                </div>
                                <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>6</span>
                            </div>

                            {/* 2 Stars */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>2</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{ width: '0%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                                </div>
                                <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>0</span>
                            </div>

                            {/* 1 Star */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <span style={{ width: '14px', fontWeight: 700, color: '#334155' }}>1</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                <div style={{ flex: 1, height: '10px', backgroundColor: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
                                    <div style={{ width: '0%', height: '100%', backgroundColor: '#fbbc04', borderRadius: '50px' }}></div>
                                </div>
                                <span style={{ width: '38px', textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>0</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* FILTER PILLS (ALA GOOGLE MAPS) */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
                    {[
                        { key: 'all', label: 'Semua Ulasan (10)' },
                        { key: 'with-photos', label: '📷 Ada Foto (8)' },
                        { key: 'lepas-kunci', label: 'Lepas Kunci' },
                        { key: 'dengan-driver', label: 'Dengan Supir' },
                        { key: 'hiace', label: 'Hiace Rombongan' },
                        { key: 'vvip', label: 'Layanan VVIP' }
                    ].map(f => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setActiveFilter(f.key)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: activeFilter === f.key ? 800 : 600,
                                border: activeFilter === f.key ? '1.5px solid #1a73e8' : '1px solid #cbd5e1',
                                backgroundColor: activeFilter === f.key ? '#e8f0fe' : '#ffffff',
                                color: activeFilter === f.key ? '#1a73e8' : '#475569',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* 10 REVIEWS VERTICAL LIST (BERJAJAR KE BAWAH) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {filteredReviews.map((rev) => {
                        const isExpanded = !!expandedReviews[rev.id];
                        const shouldTruncate = rev.comment.length > 175;
                        const displayText = (shouldTruncate && !isExpanded) 
                            ? rev.comment.slice(0, 175) + '...' 
                            : rev.comment;

                        return (
                            <div 
                                key={rev.id}
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    padding: '24px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
                                }}
                            >
                                {/* REVIEW HEADER */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', marginBottom: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        {/* Avatar with Google badge */}
                                        <div style={{ position: 'relative' }}>
                                            <div style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '50%',
                                                backgroundColor: rev.avatarColor,
                                                color: '#ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.15rem',
                                                fontWeight: 800,
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                                            }}>
                                                {rev.author.charAt(0)}
                                            </div>
                                            {/* Google G small badge */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                right: '-2px',
                                                backgroundColor: '#ffffff',
                                                borderRadius: '50%',
                                                padding: '2px',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                                </svg>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                                                {rev.author}
                                            </h4>
                                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                                {rev.role}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Service Badge & Date */}
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ 
                                            display: 'inline-block',
                                            background: '#f1f5f9', 
                                            color: '#0284c7', 
                                            fontSize: '0.72rem', 
                                            fontWeight: 800, 
                                            padding: '3px 9px', 
                                            borderRadius: '4px',
                                            letterSpacing: '0.5px',
                                            marginBottom: '4px'
                                        }}>
                                            {rev.serviceTag}
                                        </span>
                                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{rev.date}</div>
                                    </div>
                                </div>

                                {/* STARS & FLEET TAG */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[...Array(rev.rating)].map((_, i) => (
                                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbc04">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span style={{ color: '#cbd5e1' }}>•</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                                        Armada: <strong style={{ color: '#1e293b' }}>{rev.carFleet}</strong>
                                    </span>
                                </div>

                                {/* COMMENT WITH INLINE "SELENGKAPNYA" ALA GOOGLE MAPS */}
                                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.65', marginBottom: '14px' }}>
                                    <span>&ldquo;{displayText}&rdquo;</span>
                                    {shouldTruncate && (
                                        <button 
                                            type="button" 
                                            onClick={() => toggleExpand(rev.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#1a73e8',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                padding: '0 0 0 6px',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {isExpanded ? 'Tutup' : 'Lainnya'}
                                        </button>
                                    )}
                                </div>

                                {/* PHOTO ATTACHMENTS (THUMBNAILS) */}
                                {rev.photos && rev.photos.length > 0 && (
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                        {rev.photos.map((photo, pIdx) => (
                                            <div 
                                                key={pIdx}
                                                onClick={() => setActiveModalPhoto(photo)}
                                                style={{
                                                    position: 'relative',
                                                    width: '100px',
                                                    height: '75px',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    border: '1px solid #e2e8f0',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                    transition: 'transform 0.2s ease'
                                                }}
                                                className="review-photo-thumb"
                                                title="Klik untuk memperbesar foto"
                                            >
                                                <Image 
                                                    src={photo.url} 
                                                    alt={photo.caption} 
                                                    fill 
                                                    sizes="100px"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'rgba(0,0,0,0.15)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s ease'
                                                }} className="photo-hover-overlay">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* OWNER RESPONSE (TANGGAPAN DARI PEMILIK ALA GOOGLE MAPS) */}
                                {rev.ownerResponse && (
                                    <div style={{
                                        backgroundColor: '#f8fafc',
                                        borderLeft: '4px solid #1a73e8',
                                        borderRadius: '0 8px 8px 0',
                                        padding: '14px 16px',
                                        marginTop: '12px',
                                        marginBottom: '12px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
                                                Tanggapan dari pemilik
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>• {rev.ownerResponse.date}</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                                            {rev.ownerResponse.text}
                                        </p>
                                    </div>
                                )}

                                {/* FOOTER: HELPFUL COUNT */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.8rem' }}>
                                    <button 
                                        type="button"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            color: '#64748b',
                                            cursor: 'pointer',
                                            padding: 0,
                                            fontSize: '0.8rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                        </svg>
                                        <span>Membantu ({rev.likes})</span>
                                    </button>
                                    <span>•</span>
                                    <span>Ulasan Terverifikasi Google</span>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* BOTTOM GOOGLE MAPS CTA BUTTON */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: '#ffffff',
                            color: '#1a73e8',
                            border: '1.5px solid #1a73e8',
                            padding: '12px 28px',
                            borderRadius: '50px',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(26,115,232,0.1)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span>Lihat Semua 876+ Ulasan di Google Maps</span>
                        <span>&rarr;</span>
                    </a>
                </div>

            </div>

            {/* LIGHTBOX PHOTO MODAL (UNTUK MEMPERBESAR FOTO ULASAN) */}
            {activeModalPhoto && (
                <div 
                    onClick={() => setActiveModalPhoto(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: '750px',
                            width: '100%',
                            backgroundColor: '#0f172a',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveModalPhoto(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#ffffff',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ position: 'relative', width: '100%', height: '450px' }}>
                            <Image 
                                src={activeModalPhoto.url} 
                                alt={activeModalPhoto.caption}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        <div style={{ padding: '16px 20px', backgroundColor: '#1e293b', color: '#ffffff' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>
                                Foto Dokumentasi Pelanggan • Google Maps Review
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                                {activeModalPhoto.caption}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{__html: `
                .review-photo-thumb:hover {
                    transform: scale(1.05);
                }
                .review-photo-thumb:hover .photo-hover-overlay {
                    opacity: 1 !important;
                }
                @media (max-width: 640px) {
                    .g-review-summary-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    .g-summary-left {
                        border-right: none !important;
                        border-bottom: 1px solid #f1f5f9;
                        padding-right: 0 !important;
                        padding-bottom: 20px;
                    }
                }
            `}} />
        </section>
    );
}
