"use client";

import React, { useState, useRef, useEffect } from 'react';

interface StepItem {
    num: string;
    title: string;
    desc: string;
    tag: string;
    icon: React.ReactNode;
}

const stepsData: StepItem[] = [
    {
        num: '01',
        title: 'Pilih Mobil Sesuai Kebutuhan',
        desc: 'Tentukan tipe mobil idaman Anda (City Car, MPV Keluarga, EV, atau Minibus) & sistem sewa (Lepas Kunci / Driver).',
        tag: 'Pilihan Armada',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11 2 11.4V16c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2"/>
                <path d="M9 17h6"/>
                <circle cx="17" cy="17" r="2"/>
            </svg>
        )
    },
    {
        num: '02',
        title: 'Pilih Tanggal & Rute',
        desc: 'Tentukan durasi sewa, tanggal mulai & selesai, serta lokasi antar unit (Stasiun Tugu/Lempuyangan, YIA, atau Hotel).',
        tag: 'Jadwal & Lokasi',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
        )
    },
    {
        num: '03',
        title: 'Konfirmasi via WhatsApp',
        desc: 'Chat langsung dengan tim CS kami. Verifikasi identitas (KTP & SIM A) instan secara online tanpa prosedur ribet.',
        tag: 'Fast Response',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
        )
    },
    {
        num: '04',
        title: 'Mobil Diantar & Siap Jalan',
        desc: 'Unit bersih wangi, BBM siap, diantarkan tepat waktu ke titik Anda. Siap jalan nikmati keindahan Jogja!',
        tag: 'Tepat Waktu',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 11 3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
        )
    }
];

export default function HowItWorksSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.offsetWidth * 0.78;
        const newIndex = Math.min(stepsData.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    const scrollToStep = (index: number) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cards = container.querySelectorAll('.how-step-card');
        if (cards[index]) {
            cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            setActiveIndex(index);
        }
    };

    // Google HowTo Schema JSON-LD
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "4 Langkah Mudah Sewa Mobil di Jogja",
        "description": "Proses pemesanan rental mobil lepas kunci dan dengan driver di Aksara Transport Jogja selesai dalam waktu kurang dari 5 menit via WhatsApp.",
        "totalTime": "PT5M",
        "step": stepsData.map((s, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": s.title,
            "text": s.desc,
            "url": "https://jogjasewamobil.com/#langkah-sewa"
        }))
    };

    return (
        <section id="langkah-sewa" className="how-it-works-section">
            {/* SEO Rich Snippet HowTo Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <div className="container">
                {/* Header with compact margin */}
                <div className="how-header text-center">
                    <div className="how-badge-wrapper">
                        <span className="badge badge-accent how-badge">Panduan Cepat</span>
                        <span className="how-quick-hint">⚡ Selesai &lt; 5 Menit via WA</span>
                    </div>
                    <h2 className="how-title">4 Langkah Mudah Sewa Mobil di Jogja</h2>
                    <p className="how-subtitle">
                        Proses praktis dan transparan, tanpa jaminan berbelit. Pesan online langsung dari smartphone Anda.
                    </p>
                </div>

                {/* Steps Container: Connected Desktop Stepper & Horizontal Swipeable Carousel on Mobile */}
                <div className="how-steps-wrapper">
                    <div 
                        className="how-steps-carousel" 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                    >
                        {stepsData.map((step, idx) => (
                            <div 
                                key={step.num}
                                className={`how-step-card ${activeIndex === idx ? 'is-active-step' : ''}`}
                                onClick={() => scrollToStep(idx)}
                            >
                                <div className="how-card-top">
                                    <div className="how-step-num-badge">
                                        <span className="how-num-text">{step.num}</span>
                                        <span className="how-icon-box">{step.icon}</span>
                                    </div>
                                    <span className="how-tag-pill">{step.tag}</span>
                                </div>
                                <h3 className="how-card-title">{step.title}</h3>
                                <p className="how-card-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Dot Stepper Indicators */}
                    <div className="how-dots-indicator" aria-label="Step carousel indicators">
                        {stepsData.map((s, idx) => (
                            <button
                                key={s.num}
                                className={`how-dot-btn ${activeIndex === idx ? 'active' : ''}`}
                                onClick={() => scrollToStep(idx)}
                                aria-label={`Pindah ke langkah ${s.num}: ${s.title}`}
                            >
                                <span className="how-dot-inner"></span>
                                {activeIndex === idx && <span className="how-dot-label">Step {s.num}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
