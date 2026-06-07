"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
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
        { href: '/mobil', label: 'Pilihan Mobil' },
        { href: '/wisata', label: 'Paket Wisata' },
        { href: '/artikel', label: 'Tips & Berita' },
        { href: '/tentang', label: 'Tentang Kami' },
        { href: '/kontak', label: 'Kontak' },
    ];

    return (
        <header className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="container nav-container">
                <Link href="/" className="logo">
                    Aksara<span>Transport</span>
                </Link>
                <nav className={menuOpen ? 'active' : ''}>
                    <ul className="nav-menu" id="navMenu">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href} 
                                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
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
