"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface TopChartUnit {
    rank: number;
    rankBadge: string;
    name: string;
    category: string;
    image: string;
    normalPrice: string;
    packagePrice: string;
    dailyEquiv: string;
    savingText: string;
    seats: number;
    trans: string;
    fuel: string;
    features: string[];
    waMessage: string;
}

const topChartLepasKunci: TopChartUnit[] = [
    {
        rank: 1,
        rankBadge: 'TOP 1 BEST SELLER',
        name: 'Honda Brio Matic',
        category: 'City Car Paling Irit & Lincah',
        image: '/images/honda_brio.webp',
        normalPrice: 'Rp 2.275.000',
        packagePrice: 'Rp 2.100.000',
        dailyEquiv: 'Rp 300.000 / hari',
        savingText: 'HEMAT RP 175.000',
        seats: 5,
        trans: 'Automatic',
        fuel: 'Bensin Irit',
        features: [
            'Free Pengantaran Area Dalam Kota Jogja',
            'Unit Bersih, Wangi & Terawat Prima',
            'Sangat Praktis Bermanuver di Jalur Padat Malioboro',
            'AC Dingin Sejuk, Audio Bluetooth & USB'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari untuk unit Honda Brio Matic (Rp 2.100.000 / 7 hari). Mohon info ketersediaan unitnya.'
    },
    {
        rank: 2,
        rankBadge: 'TOP 2 MPV KELUARGA',
        name: 'Toyota Avanza Facelift',
        category: 'Family MPV Terlaris & Andal',
        image: '/images/toyota_avanza_facelift.webp',
        normalPrice: 'Rp 2.450.000',
        packagePrice: 'Rp 2.275.000',
        dailyEquiv: 'Rp 325.000 / hari',
        savingText: 'HEMAT RP 175.000',
        seats: 7,
        trans: 'Manual / Matic',
        fuel: 'Bensin Irit',
        features: [
            'Free Pengantaran Area Dalam Kota Jogja',
            'Kapasitas 7 Kursi Nyaman untuk Keluarga',
            'AC Double Blower Dingin Menyeluruh',
            'Bagasi Fleksibel & Luas untuk Koper / Oleh-Oleh'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari untuk unit Toyota Avanza Facelift (Rp 2.275.000 / 7 hari). Mohon info ketersediaan unitnya.'
    },
    {
        rank: 3,
        rankBadge: 'TOP 3 KABIN SENYAP',
        name: 'Toyota Avanza FWD Matic',
        category: 'Modern CVT MPV Halus',
        image: '/images/toyota_avanza_fwd.webp',
        normalPrice: 'Rp 2.625.000',
        packagePrice: 'Rp 2.450.000',
        dailyEquiv: 'Rp 350.000 / hari',
        savingText: 'HEMAT RP 175.000',
        seats: 7,
        trans: 'Matic CVT',
        fuel: 'Bensin Irit',
        features: [
            'Free Pengantaran Area Dalam Kota Jogja',
            'Transmisi Matic CVT Responsif & Halus',
            'Kekedapan Kabin Senyap dengan Suspensi Nyaman',
            'Fitur Keselamatan Modern & AC Dingin'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari untuk unit Toyota Avanza FWD Matic (Rp 2.450.000 / 7 hari). Mohon info ketersediaan unitnya.'
    },
    {
        rank: 4,
        rankBadge: 'TOP 4 KENYAMANAN PREMIUM',
        name: 'Toyota Innova Reborn Diesel',
        category: 'Medium MPV Diesel Turbo Tangguh',
        image: '/images/innova_reborn.webp',
        normalPrice: 'Rp 3.850.000',
        packagePrice: 'Rp 3.500.000',
        dailyEquiv: 'Rp 500.000 / hari',
        savingText: 'HEMAT RP 350.000',
        seats: 7,
        trans: 'Automatic',
        fuel: 'Diesel Turbo',
        features: [
            'Free Pengantaran Area Dalam Kota Jogja',
            'Mesin Diesel 2.4 Turbo Sangat Bertenaga di Tanjakan',
            'Suspensi Lembut Redam Guncangan Maksimal',
            'Kabin Sangat Luas & Nyaman untuk Perjalanan Jauh'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari untuk unit Toyota Innova Reborn Diesel (Rp 3.500.000 / 7 hari). Mohon info ketersediaan unitnya.'
    },
    {
        rank: 5,
        rankBadge: 'TOP 5 LUXURY HYBRID',
        name: 'Toyota Innova Zenix Hybrid',
        category: 'Executive Hybrid MPV Eksekutif',
        image: '/images/toyota_innova_zenix.webp',
        normalPrice: 'Rp 5.250.000',
        packagePrice: 'Rp 4.900.000',
        dailyEquiv: 'Rp 700.000 / hari',
        savingText: 'HEMAT RP 350.000',
        seats: 7,
        trans: 'Matic E-CVT',
        fuel: 'Hybrid Super Irit',
        features: [
            'Free Pengantaran Area Dalam Kota Jogja',
            'Teknologi Hybrid Modern Ekstra Senyap & Irit BBM',
            'Interior Futuristik & Fitur Keselamatan Lengkap',
            'Pilihan Bergengsi untuk Tamu Eksekutif & Dinas'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari untuk unit Toyota Innova Zenix Hybrid (Rp 4.900.000 / 7 hari). Mohon info ketersediaan unitnya.'
    }
];

const topChartDenganDriver: TopChartUnit[] = [
    {
        rank: 1,
        rankBadge: 'TOP 1 PAKET KELUARGA',
        name: 'Toyota Avanza + Driver + BBM',
        category: 'Paket All-In 7 Hari Hemat',
        image: '/images/toyota_avanza_facelift.webp',
        normalPrice: 'Rp 4.200.000',
        packagePrice: 'Rp 3.850.000',
        dailyEquiv: 'Rp 550.000 / hari',
        savingText: 'HEMAT RP 350.000',
        seats: 7,
        trans: 'Termasuk Driver',
        fuel: 'BBM Operasional Termasuk',
        features: [
            'Driver Ramah, Sopan & Hafal Rute Wisata Jogja',
            'BBM Operasional Harian Sudah Termasuk',
            'Durasi Pelayanan 12 Jam Penuh Setiap Hari',
            'Bebas Capek Mengemudi, Cukup Duduk Santai'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari DENGAN DRIVER unit Toyota Avanza (Rp 3.850.000 / 7 hari All-In). Mohon info ketersediaannya.'
    },
    {
        rank: 2,
        rankBadge: 'TOP 2 KENYAMANAN VIP',
        name: 'Toyota Innova Reborn + Driver + BBM',
        category: 'Executive Travel All-In 7 Hari',
        image: '/images/innova_reborn.webp',
        normalPrice: 'Rp 5.600.000',
        packagePrice: 'Rp 5.250.000',
        dailyEquiv: 'Rp 750.000 / hari',
        savingText: 'HEMAT RP 350.000',
        seats: 7,
        trans: 'Termasuk Driver',
        fuel: 'BBM Diesel Termasuk',
        features: [
            'Driver Profesional Berpengalaman Luar Kota & Wisata',
            'BBM Diesel Operasional Sudah Termasuk',
            'Kenyamanan Suspensi Empuk & Kabin Bersih Wangi',
            'Layanan Standar Eksekutif 12 Jam per Hari'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari DENGAN DRIVER unit Innova Reborn Diesel (Rp 5.250.000 / 7 hari All-In). Mohon info ketersediaannya.'
    },
    {
        rank: 3,
        rankBadge: 'TOP 3 HYBRID LUXURY',
        name: 'Toyota Innova Zenix + Driver + BBM',
        category: 'VIP Hybrid Executive All-In',
        image: '/images/toyota_innova_zenix.webp',
        normalPrice: 'Rp 7.350.000',
        packagePrice: 'Rp 6.650.000',
        dailyEquiv: 'Rp 950.000 / hari',
        savingText: 'HEMAT RP 700.000',
        seats: 7,
        trans: 'Driver VIP',
        fuel: 'BBM Termasuk',
        features: [
            'Driver VIP Berpakaian Rapi & Pelayanan Prima',
            'BBM Operasional Harian Sudah Termasuk',
            'Kenyamanan Kabin Mewah Modern Berkelas',
            'Sangat Cocok untuk Pejabat, Instansi & Pebisnis'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari DENGAN DRIVER unit Innova Zenix Hybrid (Rp 6.650.000 / 7 hari All-In). Mohon info ketersediaannya.'
    },
    {
        rank: 4,
        rankBadge: 'TOP 4 WISATA ROMBONGAN',
        name: 'Toyota Hiace Premio + Driver + BBM',
        category: 'Luxury Minibus 14 Seat All-In',
        image: '/images/toyota_hiace_premio.webp',
        normalPrice: 'Rp 9.800.000',
        packagePrice: 'Rp 9.100.000',
        dailyEquiv: 'Rp 1.300.000 / hari',
        savingText: 'HEMAT RP 700.000',
        seats: 14,
        trans: 'Driver Wisata',
        fuel: 'BBM Termasuk',
        features: [
            'Kapasitas 14 Penumpang dengan Legroom Ekstra Longgar',
            'Driver Spesialis Wisata Rombongan & Destinasi Favorit',
            'BBM Operasional Sudah Termasuk Selama 7 Hari',
            'AC Ducting Dingin Merata ke Seluruh Baris Kursi'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari DENGAN DRIVER unit Hiace Premio (Rp 9.100.000 / 7 hari All-In). Mohon info ketersediaannya.'
    },
    {
        rank: 5,
        rankBadge: 'TOP 5 VVIP SULTAN',
        name: 'Toyota Alphard Transformer VIP All-In',
        category: 'Presidential VVIP Service',
        image: '/images/toyota_alphard.webp',
        normalPrice: 'Rp 19.600.000',
        packagePrice: 'Rp 18.200.000',
        dailyEquiv: 'Rp 2.600.000 / hari',
        savingText: 'HEMAT RP 1.400.000',
        seats: 7,
        trans: 'Driver Jas VIP',
        fuel: 'BBM Termasuk',
        features: [
            'Captain Seat Kulit Mewah dengan Pengaturan Elektrik',
            'Driver Khusus Berjas Rapi & Protokol Tamu Kenegaraan',
            'BBM Operasional Sudah Termasuk Selama 7 Hari',
            'Privasi Maksimal & Pengalaman Berkendara Kelas Sultan'
        ],
        waMessage: 'Halo Aksara Transport, saya ingin pesan Paket Top Chart Sewa 7 Hari DENGAN DRIVER unit Toyota Alphard VIP (Rp 18.200.000 / 7 hari All-In). Mohon info ketersediaannya.'
    }
];

export default function TopChart7Hari() {
    const [activeTab, setActiveTab] = useState<'lepasKunci' | 'denganDriver'>('lepasKunci');

    const currentList = activeTab === 'lepasKunci' ? topChartLepasKunci : topChartDenganDriver;

    return (
        <section id="top-chart-7-hari" className="top-chart-section">
            <style dangerouslySetInnerHTML={{ __html: `
                .top-chart-section {
                    padding: 80px 0;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
                    position: relative;
                }
                .top-chart-header {
                    text-align: center;
                    max-width: 820px;
                    margin: 0 auto 40px auto;
                    padding: 0 16px;
                }
                .top-chart-kicker {
                    display: inline-block;
                    font-size: 0.78rem;
                    font-weight: 800;
                    letter-spacing: 0.14em;
                    color: #EA580C;
                    background: #FFF7ED;
                    border: 1px solid rgba(234, 88, 12, 0.25);
                    padding: 4px 14px;
                    border-radius: 999px;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                }
                .top-chart-title {
                    font-size: 2.2rem;
                    font-weight: 900;
                    color: #0B1B3D;
                    line-height: 1.25;
                    margin-bottom: 14px;
                }
                .top-chart-title span {
                    color: #EA580C;
                }
                .top-chart-subtitle {
                    font-size: 1rem;
                    color: #475569;
                    line-height: 1.6;
                    margin: 0 auto;
                }
                .top-chart-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 36px;
                    padding: 0 16px;
                }
                .top-chart-tab-btn {
                    padding: 12px 24px;
                    border-radius: 999px;
                    font-size: 0.92rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    border: 1.5px solid transparent;
                    white-space: nowrap;
                    font-family: inherit;
                }
                .top-chart-tab-btn.active {
                    background: #0B1B3D;
                    color: #ffffff;
                    border-color: #0B1B3D;
                    box-shadow: 0 4px 14px rgba(11, 27, 61, 0.2);
                }
                .top-chart-tab-btn:not(.active) {
                    background: #ffffff;
                    color: #475569;
                    border-color: #e2e8f0;
                }
                .top-chart-tab-btn:not(.active):hover {
                    background: #f1f5f9;
                    color: #0B1B3D;
                }

                /* GRID LAYOUT */
                .top-chart-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 22px;
                    padding: 0 16px;
                    max-width: 1220px;
                    margin: 0 auto;
                    box-sizing: border-box;
                }

                /* CARD */
                .top-chart-card {
                    background: #ffffff;
                    border-radius: 18px;
                    border: 1.5px solid #e2e8f0;
                    box-shadow: 0 4px 16px rgba(11, 27, 61, 0.05);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                    position: relative;
                    box-sizing: border-box;
                }
                .top-chart-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 28px rgba(11, 27, 61, 0.12);
                    border-color: #F97316;
                }

                /* RANK 1 SPECIAL GLOW */
                .top-chart-card.rank-1 {
                    border: 2px solid #F97316;
                    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.15);
                }

                .top-chart-card-topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    background: #fafafa;
                    border-bottom: 1px solid #f1f5f9;
                }
                .top-chart-card.rank-1 .top-chart-card-topbar {
                    background: linear-gradient(90deg, #FFF7ED 0%, #ffffff 100%);
                    border-bottom: 1px solid #fed7aa;
                }
                .top-chart-rank-pill {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    color: #ffffff;
                    background: #0B1B3D;
                    padding: 4px 10px;
                    border-radius: 6px;
                    text-transform: uppercase;
                }
                .top-chart-card.rank-1 .top-chart-rank-pill {
                    background: #EA580C;
                }
                .top-chart-savings-pill {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #15803d;
                    background: #dcfce7;
                    border: 1px solid rgba(22, 163, 74, 0.25);
                    padding: 4px 10px;
                    border-radius: 6px;
                }

                .top-chart-img-wrap {
                    height: 160px;
                    position: relative;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
                }
                .top-chart-img-wrap img {
                    object-fit: contain;
                    max-height: 100%;
                    width: auto;
                    transition: transform 0.3s ease;
                }
                .top-chart-card:hover .top-chart-img-wrap img {
                    transform: scale(1.04);
                }

                .top-chart-card-body {
                    padding: 18px 18px 20px 18px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    box-sizing: border-box;
                }
                .top-chart-car-title {
                    font-size: 1.25rem;
                    font-weight: 900;
                    color: #0B1B3D;
                    margin-bottom: 4px;
                    line-height: 1.3;
                }
                .top-chart-car-sub {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #64748b;
                    margin-bottom: 14px;
                }

                /* SPECS ROW */
                .top-chart-specs-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-bottom: 14px;
                }
                .top-chart-spec-tag {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #334155;
                    background: #f1f5f9;
                    padding: 4px 8px;
                    border-radius: 6px;
                    white-space: nowrap;
                }

                /* FREE ANTAR BADGE */
                .top-chart-free-antar {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #EA580C;
                    background: #FFF7ED;
                    border: 1px solid rgba(234, 88, 12, 0.2);
                    padding: 5px 8px;
                    border-radius: 6px;
                    margin-bottom: 16px;
                    text-align: center;
                }

                /* FEATURES LIST */
                .top-chart-features-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 18px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .top-chart-feature-item {
                    font-size: 0.80rem;
                    color: #475569;
                    line-height: 1.45;
                    position: relative;
                    padding-left: 14px;
                }
                .top-chart-feature-item::before {
                    content: "•";
                    position: absolute;
                    left: 2px;
                    top: 0;
                    color: #F97316;
                    font-weight: bold;
                    font-size: 1rem;
                    line-height: 1.3;
                }

                /* PRICE BOX */
                .top-chart-price-box {
                    margin-top: auto;
                    padding: 14px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    margin-bottom: 14px;
                }
                .top-chart-price-original {
                    font-size: 0.76rem;
                    color: #94a3b8;
                    text-decoration: line-through;
                    margin-bottom: 2px;
                    font-weight: 600;
                }
                .top-chart-price-main {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                    flex-wrap: wrap;
                }
                .top-chart-price-val {
                    font-size: 1.35rem;
                    font-weight: 900;
                    color: #EA580C;
                    line-height: 1;
                }
                .top-chart-price-unit {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #64748b;
                }
                .top-chart-price-daily {
                    font-size: 0.74rem;
                    color: #15803d;
                    font-weight: 800;
                    margin-top: 4px;
                }

                /* CTA BUTTON */
                .top-chart-btn-wa {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 12px 14px;
                    background: #0B1B3D;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    text-align: center;
                    transition: all 0.25s ease;
                    box-sizing: border-box;
                    letter-spacing: 0.02em;
                }
                .top-chart-card.rank-1 .top-chart-btn-wa {
                    background: #F97316;
                    color: #ffffff;
                }
                .top-chart-btn-wa:hover {
                    background: #EA580C;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                }

                /* TRUST FOOTER NOTE */
                .top-chart-trust-footer {
                    max-width: 900px;
                    margin: 32px auto 0 auto;
                    padding: 14px 20px;
                    background: #ffffff;
                    border: 1px dashed #cbd5e1;
                    border-radius: 14px;
                    text-align: center;
                    box-sizing: border-box;
                }
                .top-chart-trust-footer p {
                    font-size: 0.82rem;
                    color: #475569;
                    margin: 0;
                    line-height: 1.5;
                }
                .top-chart-trust-footer strong {
                    color: #0B1B3D;
                }

                /* MOBILE OPTIMIZATION - 1 FRAME PANDUAN CEPAT */
                @media (max-width: 768px) {
                    .top-chart-section {
                        padding: 40px 0;
                    }
                    .top-chart-header {
                        margin-bottom: 24px;
                        padding: 0 12px;
                    }
                    .top-chart-kicker {
                        font-size: 0.70rem;
                        padding: 3px 10px;
                    }
                    .top-chart-title {
                        font-size: 1.45rem;
                        line-height: 1.3;
                        margin-bottom: 8px;
                    }
                    .top-chart-subtitle {
                        font-size: 0.82rem;
                        line-height: 1.45;
                    }
                    .top-chart-tabs {
                        margin-bottom: 22px;
                        gap: 6px;
                        padding: 0 10px;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    .top-chart-tab-btn {
                        flex: 1;
                        padding: 9px 8px;
                        font-size: 0.74rem;
                        font-weight: 800;
                        text-align: center;
                    }
                    .top-chart-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                        padding: 0 12px;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    .top-chart-card {
                        width: 100%;
                        border-radius: 14px;
                        box-sizing: border-box;
                    }
                    .top-chart-img-wrap {
                        height: 125px;
                        padding: 8px;
                    }
                    .top-chart-card-body {
                        padding: 14px 14px 16px 14px;
                    }
                    .top-chart-car-title {
                        font-size: 1.05rem;
                    }
                    .top-chart-car-sub {
                        font-size: 0.76rem;
                        margin-bottom: 10px;
                    }
                    .top-chart-specs-row {
                        gap: 4px;
                        margin-bottom: 10px;
                    }
                    .top-chart-spec-tag {
                        font-size: 0.65rem;
                        padding: 3px 6px;
                    }
                    .top-chart-free-antar {
                        font-size: 0.66rem;
                        padding: 4px 6px;
                        margin-bottom: 12px;
                    }
                    .top-chart-features-list {
                        gap: 4px;
                        margin-bottom: 14px;
                    }
                    .top-chart-feature-item {
                        font-size: 0.74rem;
                        line-height: 1.4;
                    }
                    .top-chart-price-box {
                        padding: 10px 12px;
                        margin-bottom: 12px;
                    }
                    .top-chart-price-original {
                        font-size: 0.70rem;
                    }
                    .top-chart-price-val {
                        font-size: 1.15rem;
                    }
                    .top-chart-price-unit {
                        font-size: 0.70rem;
                    }
                    .top-chart-price-daily {
                        font-size: 0.70rem;
                    }
                    .top-chart-btn-wa {
                        padding: 10px 12px;
                        font-size: 0.78rem;
                        border-radius: 8px;
                    }
                    .top-chart-trust-footer {
                        margin: 22px 12px 0 12px;
                        padding: 10px 12px;
                    }
                    .top-chart-trust-footer p {
                        font-size: 0.74rem;
                    }
                }
            `}} />

            <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', boxSizing: 'border-box' }}>
                {/* HEADER SECTION */}
                <div className="top-chart-header">
                    <span className="top-chart-kicker">
                        TOP CHART SEWA 7 HARI MINGGUAN
                    </span>
                    <h2 className="top-chart-title">
                        Daftar Harga Sewa Mobil <span>7 Hari</span> Paling Hemat
                    </h2>
                    <p className="top-chart-subtitle">
                        Peringkat armada terfavorit pilihan wisatawan &amp; pebisnis untuk paket mingguan (7 hari) di Jogja. 
                        Dapatkan tarif spesial lebih murah dibanding sewa harian, kuota kilometer leluasa, dan gratis pengantaran area dalam kota Yogyakarta.
                    </p>
                </div>

                {/* TABS SWITCHER (LEPAS KUNCI VS DENGAN DRIVER) */}
                <div className="top-chart-tabs">
                    <button
                        type="button"
                        onClick={() => setActiveTab('lepasKunci')}
                        className={`top-chart-tab-btn ${activeTab === 'lepasKunci' ? 'active' : ''}`}
                    >
                        Lepas Kunci (Paket 7 Hari)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('denganDriver')}
                        className={`top-chart-tab-btn ${activeTab === 'denganDriver' ? 'active' : ''}`}
                    >
                        Dengan Driver + BBM (Paket 7 Hari)
                    </button>
                </div>

                {/* TOP CHART LEADERBOARD GRID */}
                <div className="top-chart-grid">
                    {currentList.map((item) => {
                        const waUrl = `https://wa.me/6282241787498?text=${encodeURIComponent(item.waMessage)}`;
                        return (
                            <div 
                                key={item.rank + '-' + item.name} 
                                className={`top-chart-card rank-${item.rank}`}
                            >
                                {/* TOP BAR WITH RANK BADGE & SAVINGS */}
                                <div className="top-chart-card-topbar">
                                    <span className="top-chart-rank-pill">
                                        {item.rankBadge}
                                    </span>
                                    <span className="top-chart-savings-pill">
                                        {item.savingText}
                                    </span>
                                </div>

                                {/* CAR IMAGE */}
                                <div className="top-chart-img-wrap">
                                    <Image
                                        src={item.image}
                                        alt={`Sewa 7 Hari ${item.name} Jogja`}
                                        width={280}
                                        height={150}
                                        style={{ objectFit: 'contain' }}
                                        priority={item.rank === 1}
                                    />
                                </div>

                                {/* BODY */}
                                <div className="top-chart-card-body">
                                    <h3 className="top-chart-car-title">{item.name}</h3>
                                    <div className="top-chart-car-sub">{item.category}</div>

                                    {/* SPECS */}
                                    <div className="top-chart-specs-row">
                                        <span className="top-chart-spec-tag">{item.seats} Kursi</span>
                                        <span className="top-chart-spec-tag">{item.trans}</span>
                                        <span className="top-chart-spec-tag">{item.fuel}</span>
                                    </div>

                                    {/* FREE ANTAR BADGE (TEXT ONLY) */}
                                    <div className="top-chart-free-antar">
                                        Free Pengantaran Area Dalam Kota Jogja
                                    </div>

                                    {/* FEATURES */}
                                    <ul className="top-chart-features-list">
                                        {item.features.map((feat, idx) => (
                                            <li key={idx} className="top-chart-feature-item">
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* PRICE BOX */}
                                    <div className="top-chart-price-box">
                                        <div className="top-chart-price-original">
                                            Tarif Normal: {item.normalPrice}
                                        </div>
                                        <div className="top-chart-price-main">
                                            <span className="top-chart-price-val">{item.packagePrice}</span>
                                            <span className="top-chart-price-unit">/ 7 Hari Penuh</span>
                                        </div>
                                        <div className="top-chart-price-daily">
                                            Rata-rata: {item.dailyEquiv} (Diskon Paket Mingguan)
                                        </div>
                                    </div>

                                    {/* WHATSAPP ACTION BUTTON */}
                                    <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="top-chart-btn-wa"
                                    >
                                        Pesan Paket 7 Hari via WhatsApp
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* TRUST FOOTER NOTE */}
                <div className="top-chart-trust-footer">
                    <p>
                        <strong>Syarat Sewa 7 Hari Sangat Mudah:</strong> Cukup verifikasi KTP &amp; SIM A secara online via WhatsApp tanpa jaminan ribet. 
                        Unit diantar langsung tepat waktu ke Stasiun Tugu, Stasiun Lempuyangan, Bandara YIA, atau Hotel Anda di Jogja.
                    </p>
                </div>
            </div>
        </section>
    );
}
