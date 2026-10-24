"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { 
            label: 'Sewa Mobil', 
            isDropdown: true,
            dropdownItems: [
                { href: '/mobil?service=lepasKunci', label: 'Sewa Lepas Kunci' },
                { href: '/mobil?service=denganSopir', label: 'Dengan Driver' },
            ]
        },
        { href: '/wisata', label: 'Paket Wisata' },
        { href: '/artikel', label: 'Tips & Berita' },
        { href: '/panduan', label: 'Panduan & FAQ' },
        { href: '/tentang', label: 'Tentang Kami' },
        { href: '/kontak', label: 'Kontak' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        if (href.includes('?')) {
            const [path, query] = href.split('?');
            const searchService = searchParams.get('service');
            const queryService = query.split('=')[1];
            return pathname === path && searchService === queryService;
        }
        return pathname.startsWith(href) && !pathname.includes('?');
    };

    const forceScrolled = pathname !== '/';

    return (
        <header className={`${(scrolled || forceScrolled) ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" className="logo">
                    Aksara<span>Transport</span>
                </Link>
                <nav>
                    <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu" style={{ display: 'flex', alignItems: 'center' }}>
                        {navLinks.map((link, idx) => {
                            if (link.isDropdown && link.dropdownItems) {
                                const isSubActive = link.dropdownItems.some(item => isActive(item.href));
                                return (
                                    <li key={idx} className="nav-item-dropdown">
                                        <span className={`nav-link dropdown-toggle ${isSubActive ? 'active' : ''}`}>
                                            {link.label} <span className="dropdown-arrow">▼</span>
                                        </span>
                                        <ul className="dropdown-menu">
                                            {link.dropdownItems.map((item) => (
                                                <li key={item.href}>
                                                    <Link 
                                                        href={item.href} 
                                                        className={`dropdown-link ${isActive(item.href) ? 'active' : ''}`}
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            }
                            return (
                                <li key={link.href || link.label}>
                                    <Link 
                                        href={link.href || '#'} 
                                        className={`nav-link ${isActive(link.href || '#') ? 'active' : ''}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="nav-cta">
                    <Link href="/kontak" className="btn btn-primary" id="headerCta">
                        Pesan Sekarang
                    </Link>
                </div>
                <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} id="menuToggle" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
}
