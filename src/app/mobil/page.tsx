"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const lepasKunciCars = [
    { id: 'brio', name: 'Honda Brio Matic', category: 'city', image: '/images/honda_brio.webp', badge: 'Hemat', seats: 5, trans: 'Automatic', rates: [
        { label: '12 Jam Weekday', price: 'Rp 250.000' }, { label: '24 Jam Weekday', price: 'Rp 350.000' }, { label: 'Fullday Weekend', price: 'Rp 300.000' }
    ], startPrice: 'Rp 250.000', queryName: 'Honda+Brio+Matic' },
    { id: 'jazz', name: 'Honda Jazz Matic', category: 'city', image: '/images/honda_jazz.webp', badge: 'Sporty', seats: 5, trans: 'Automatic', badgeColor: 'accent', rates: [
        { label: '12 Jam Weekday', price: 'Rp 325.000' }, { label: '24 Jam Weekday', price: 'Rp 425.000' }, { label: 'Fullday Weekend', price: 'Rp 375.000' }
    ], startPrice: 'Rp 325.000', queryName: 'Honda+Jazz+Matic' },
    { id: 'raize', name: 'Toyota Raize Matic', category: 'suv', image: '/images/toyota_raize.webp', badge: 'Compact SUV', seats: 5, trans: 'Automatic', badgeColor: 'accent', rates: [
        { label: '12 Jam Weekday', price: 'Rp 325.000' }, { label: '24 Jam Weekday', price: 'Rp 425.000' }, { label: 'Fullday Weekend', price: 'Rp 375.000' }
    ], startPrice: 'Rp 325.000', queryName: 'Toyota+Raize' },
    { id: 'avanza-fl', name: 'Avanza Facelift Matic', category: 'family', image: '/images/toyota_avanza_facelift.webp', badge: 'Irit', seats: 7, trans: 'Automatic', rates: [
        { label: '12 Jam Weekday', price: 'Rp 250.000' }, { label: '24 Jam Weekday', price: 'Rp 350.000' }, { label: 'Fullday Weekend', price: 'Rp 300.000' }
    ], startPrice: 'Rp 250.000', queryName: 'Toyota+Avanza+Facelift+Matic' },
    { id: 'avanza-fwd', name: 'Avanza FWD Matic', category: 'family', image: '/images/toyota_avanza_fwd.webp', badge: 'Kabin Luas', seats: 7, trans: 'Automatic', badgeColor: 'accent', rates: [
        { label: '12 Jam Weekday', price: 'Rp 300.000' }, { label: '24 Jam Weekday', price: 'Rp 375.000' }, { label: 'Fullday Weekend', price: 'Rp 350.000' }
    ], startPrice: 'Rp 300.000', queryName: 'Toyota+Avanza+FWD+Matic' },
    { id: 'xpander', name: 'Mitsubishi Xpander Matic', category: 'family', image: '/images/mitsubishi_xpander.webp', badge: 'Nyaman', seats: 7, trans: 'Automatic', badgeColor: 'accent', rates: [
        { label: '12 Jam Weekday', price: 'Rp 325.000' }, { label: '24 Jam Weekday', price: 'Rp 425.000' }, { label: 'Fullday Weekend', price: 'Rp 375.000' }
    ], startPrice: 'Rp 325.000', queryName: 'Mitsubishi+Xpander+Matic' },
    { id: 'innova', name: 'Innova Reborn Matic', category: 'family', image: '/images/innova_reborn.webp', badge: 'Gagah', seats: 7, trans: 'Automatic', badgeBg: '#fef3c7', badgeText: '#b45309', rates: [
        { label: 'Fullday Weekend', price: 'Rp 550.000' }, { label: '* Hubungi kami untuk tarif weekday', price: '', isInfo: true }
    ], startPrice: 'Rp 550.000', priceLabel: 'Tarif Weekend', queryName: 'Toyota+Innova+Reborn+Matic' },
    { id: 'air-ev', name: 'Wuling Air EV', category: 'electric', image: '/images/wuling_air_ev.webp', badge: 'Full Electric', seats: 4, trans: 'Baterai 300km', badgeBg: '#dbeafe', badgeText: '#1e40af', rates: [
        { label: 'Fullday (Weekday/Weekend)', price: 'Rp 450.000' }, { label: '* Free Baterai / Cas Penuh', price: '', isSuccessInfo: true }
    ], startPrice: 'Rp 450.000', priceLabel: 'Tarif Allday', queryName: 'Wuling+Air+EV' },
    { id: 'binguo-ev', name: 'Wuling Binguo EV', category: 'electric', image: '/images/wuling_binguo.webp', badge: 'Full Electric', seats: 5, trans: 'Baterai 400km', badgeBg: '#dbeafe', badgeText: '#1e40af', rates: [
        { label: 'Fullday (Weekday/Weekend)', price: 'Rp 550.000' }, { label: '* Free Baterai / Cas Penuh', price: '', isSuccessInfo: true }
    ], startPrice: 'Rp 550.000', priceLabel: 'Tarif Allday', queryName: 'Wuling+Binguo+EV' }
];

const denganSopirCars = [
    { id: 'ds-brio', name: 'Honda Brio', category: 'family', image: '/images/honda_brio.webp', badge: 'Hemat', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 450.000' }, { label: 'Fullday', price: 'Rp 550.000' }
    ], startPrice: 'Rp 450.000', queryName: 'Honda+Brio' },
    { id: 'ds-avanza-fl', name: 'Toyota Avanza Facelift', category: 'family', image: '/images/toyota_avanza_facelift.webp', badge: 'Paling Laris', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 550.000' }, { label: 'Fullday', price: 'Rp 600.000' }
    ], startPrice: 'Rp 550.000', queryName: 'Toyota+Avanza+Facelift' },
    { id: 'ds-avanza-fwd', name: 'Toyota Avanza FWD', category: 'family', image: '/images/toyota_avanza_fwd.webp', badge: 'Terbaru', badgeColor: 'accent', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 650.000' }, { label: 'Fullday', price: 'Rp 750.000' }
    ], startPrice: 'Rp 650.000', queryName: 'Toyota+Avanza+FWD' },
    { id: 'ds-xpander', name: 'Mitsubishi Xpander', category: 'family', image: '/images/mitsubishi_xpander.webp', badge: 'Nyaman', badgeColor: 'accent', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 700.000' }, { label: 'Fullday', price: 'Rp 800.000' }
    ], startPrice: 'Rp 700.000', queryName: 'Mitsubishi+Xpander' },
    { id: 'ds-innova', name: 'Toyota Innova Reborn 2026', category: 'family', image: '/images/innova_reborn.webp', badge: 'Tangguh', badgeColor: 'accent', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 750.000' }, { label: 'Fullday', price: 'Rp 850.000' }
    ], startPrice: 'Rp 750.000', queryName: 'Toyota+Innova+Reborn+2026' },
    { id: 'ds-zenix', name: 'Toyota Innova Zenix 2026', category: 'family', image: '/images/toyota_innova_zenix.webp', badge: 'Premium', badgeBg: '#e0f2fe', badgeText: '#0369a1', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 1.000.000' }, { label: 'Fullday', price: 'Rp 1.100.000' }
    ], startPrice: 'Rp 1.000.000', queryName: 'Toyota+Innova+Zenix+2026' },
    { id: 'ds-pajero', name: 'Mitsubishi Pajero 2026', category: 'suv', image: '/images/mitsubishi_pajero.webp', badge: 'Gagah SUV', badgeBg: '#ffedd5', badgeText: '#ea580c', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 1.500.000' }, { label: 'Fullday', price: 'Rp 1.600.000' }
    ], startPrice: 'Rp 1.500.000', queryName: 'Mitsubishi+Pajero+2026' },
    { id: 'ds-fortuner', name: 'Toyota Fortuner 2026', category: 'suv', image: '/images/toyota_fortuner.webp', badge: 'SUV Tangguh', badgeBg: '#ffedd5', badgeText: '#ea580c', disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 1.500.000' }, { label: 'Fullday', price: 'Rp 1.600.000' }
    ], startPrice: 'Rp 1.500.000', queryName: 'Toyota+Fortuner+2026' },
    { id: 'ds-alphard-fl', name: 'Toyota Alphard Facelift 2023', category: 'luxury', image: '/images/toyota_alphard.webp', badge: 'VIP Luxury', badgeBg: '#f3e8ff', badgeText: '#9333ea', isLuxury: true, disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 2.899.000' }, { label: 'Fullday', price: 'Rp 2.999.999' }
    ], startPrice: 'Rp 2.899.000', queryName: 'Toyota+Alphard+Facelift+2023' },
    { id: 'ds-alphard-hev', name: 'Toyota Alphard HEV 2026', category: 'luxury', image: '/images/toyota_alphard_hev.webp', badge: 'VIP Hybrid', badgeBg: '#f3e8ff', badgeText: '#9333ea', isLuxury: true, disclaimer: '* Pemakaian khusus area dalam kota.', rates: [
        { label: '12 Jam', price: 'Rp 3.899.999' }, { label: 'Fullday', price: 'Rp 3.999.999' }
    ], startPrice: 'Rp 3.899.999', queryName: 'Toyota+Alphard+HEV+2026' },
    { id: 'ds-hiace-com', name: 'Toyota Hiace Commuter', category: 'microbus', image: '/images/toyota_hiace_commuter.webp', badge: 'Group Rombongan', badgeBg: '#ccfbf1', badgeText: '#0f766e', disclaimer: '* Kapasitas hingga 15 Kursi.', rates: [
        { label: '12 Jam', price: 'Rp 1.100.000' }, { label: 'Fullday', price: 'Rp 1.200.000' }
    ], startPrice: 'Rp 1.100.000', queryName: 'Toyota+Hiace+Commuter' },
    { id: 'ds-hiace-pre', name: 'Toyota Hiace Premio', category: 'microbus', image: '/images/toyota_hiace_premio.webp', badge: 'Premium Group', badgeBg: '#ccfbf1', badgeText: '#0f766e', disclaimer: '* Kabin Premio Mewah, Kapasitas 12-14 Kursi.', rates: [
        { label: '12 Jam', price: 'Rp 1.400.000' }, { label: 'Fullday', price: 'Rp 1.500.000' }
    ], startPrice: 'Rp 1.400.000', queryName: 'Toyota+Hiace+Premio' },
    { id: 'ds-elf', name: 'Elf Long 19 Seat', category: 'microbus', image: '/images/elf_long.webp', badge: 'Kapasitas Besar', badgeBg: '#ccfbf1', badgeText: '#0f766e', disclaimer: '* Kapasitas hingga 19 Kursi Penumpang.', rates: [
        { label: '12 Jam', price: 'Rp 1.500.000' }, { label: 'Fullday', price: 'Rp 1.600.000' }
    ], startPrice: 'Rp 1.500.000', queryName: 'Elf+Long+19+Seat' }
];

function CatalogMobilInner() {
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get('service') || 'lepasKunci';
    
    const [activeService, setActiveService] = useState(serviceParam);
    const [lkFilter, setLkFilter] = useState('all');
    const [dsFilter, setDsFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

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
        const encodedData = btoa(unescape(encodeURIComponent(textMessage)));
        textMessage += `\n\nLihat Ringkasan Pesanan Anda: ${window.location.origin}/ringkasan-pesanan?data=${encodedData}`;
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

        const rateValueParam = selectedRate.label.replace(/\s+/g, '-');
        const href = `${targetPage}?supir=${supir}&mobil=${car.queryName}&paket=${encodeURIComponent(selectedRate.label)}`;

        return (
            <div className="car-card">
                <div className="car-image-container">
                    <span className={`badge badge-${car.badgeColor || 'success'} car-tag`} style={car.badgeBg ? {backgroundColor: car.badgeBg, color: car.badgeText} : {}}>{car.badge}</span>
                    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                        <Image src={car.image} alt={`Sewa ${car.name}`} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                </div>
                <div className="car-details">
                    <h3 className="car-name">{car.name}</h3>
                    
                    {isLK ? (
                        <div className="car-specs">
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
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Include:</span> Mobil, Driver, BBM{car.isLuxury ? ', Refreshment' : ''}<br />
                                <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>Exclude:</span> Tol, Parkir, Tiket wisata, Makan driver
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', fontStyle: 'italic' }}>{car.disclaimer}</p>
                        </>
                    )}
                    
                    <div className="rate-list">
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

                    <div className="car-pricing-footer">
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
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 30px auto' }}>Dapatkan unit mobil terbaik dengan kondisi prima dan bersih. Pilih sistem sewa Lepas Kunci atau Dengan Sopir di bawah ini.</p>
                    
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

                            {/* BEAUTIFUL PRICELIST TABLE */}
                            <div style={{ maxWidth: '800px', margin: '0 auto 50px auto', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                                {/* Header */}
                                <div style={{ backgroundColor: '#1a1a1a', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span># AUTOMATIC</span>
                                        <span style={{ color: '#f97316' }}>A/T</span>
                                    </div>
                                    <div style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                                        Matic
                                    </div>
                                </div>

                                {/* Table Container */}
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>UNIT</th>
                                                <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>12 JAM</th>
                                                <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>24 JAM</th>
                                                <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FULL DAY</th>
                                                <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SEAT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { unit: 'Toyota Agya', jam12: '275K', jam24: '325K', fullday: '325K', seat: 5 },
                                                { unit: 'Honda Brio', jam12: '275K', jam24: '325K', fullday: '325K', seat: 5 },
                                                { unit: 'Honda Jazz', jam12: '375K', jam24: '425K', fullday: '425K', seat: 4 },
                                                { unit: 'Toyota Avanza', jam12: '300K', jam24: '350K', fullday: '350K', seat: 7 },
                                                { unit: 'Toyota New Avanza FWD', jam12: '—', jam24: '—', fullday: '425K', seat: 7 },
                                                { unit: 'Nissan Livina', jam12: '—', jam24: '—', fullday: '425K', seat: 7 },
                                                { unit: 'Suzuki Ertiga', jam12: '—', jam24: '—', fullday: '425K', seat: 7 },
                                                { unit: 'Honda Mobilio', jam12: '—', jam24: '—', fullday: '425K', seat: 7 },
                                                { unit: 'Mitsubishi Xpander', jam12: '—', jam24: '—', fullday: '500K', seat: 7 },
                                                { unit: 'Toyota Zenix', jam12: '—', jam24: '—', fullday: '700K', seat: 7 },
                                                { unit: 'Toyota Innova Reborn', jam12: '—', jam24: '—', fullday: '550K', seat: 7 },
                                                { unit: 'Bingou EV', jam12: '—', jam24: '—', fullday: '500K', seat: 4 },
                                                { unit: 'Wuling AirEV', jam12: '—', jam24: '—', fullday: '500K', seat: 4 },
                                                { unit: 'Hyundai Ioniq 5', jam12: '—', jam24: '—', fullday: '1.500K', seat: 5 },
                                                { unit: 'Neta V-II', jam12: '—', jam24: '—', fullday: '600K', seat: 5 },
                                                { unit: 'Toyota Fortuner VRZ', jam12: '—', jam24: '—', fullday: '1.100K', seat: 7 },
                                                { unit: 'Mitsubishi New Pajero', jam12: '—', jam24: '—', fullday: '1.200K', seat: 7 },
                                            ].map((car, index) => (
                                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#fffaf4', borderBottom: '1px solid #f3f4f6' }}>
                                                    <td style={{ padding: '14px 20px', fontSize: '0.95rem', color: '#374151', fontWeight: 500 }}>{car.unit}</td>
                                                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 700, color: car.jam12 === '—' ? '#9ca3af' : '#ea580c' }}>{car.jam12}</td>
                                                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 700, color: car.jam24 === '—' ? '#9ca3af' : '#ea580c' }}>{car.jam24}</td>
                                                    <td style={{ padding: '14px 20px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 700, color: car.fullday === '—' ? '#9ca3af' : '#ea580c' }}>{car.fullday}</td>
                                                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                                                        <span style={{ backgroundColor: '#f3f4f6', color: '#6b7280', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>
                                                            {car.seat}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Footer Alert */}
                                <div style={{ padding: '24px' }}>
                                    <div style={{ backgroundColor: '#fffaf4', borderLeft: '4px solid #ea580c', padding: '16px', borderRadius: '4px' }}>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.5' }}>
                                            <strong style={{ color: '#ea580c' }}>Syarat & Ketentuan:</strong> Weekend (Jumat-Minggu) tarif per-Tanggal. Max per-hari pukul <strong style={{ color: '#ea580c' }}>22:30 WIB</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.5rem', fontWeight: 800 }}>Pilih Unit & Detail Spesifikasi</h2>

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
