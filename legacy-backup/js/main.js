document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SCROLLING HEADER EFFECT
    // ==========================================================================
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ==========================================================================
    // 2. MOBILE MENU DRAWER
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 3. FAQ ACCORDION LOGIC
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const body = item.querySelector('.faq-body');

        if (header && body) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBody = otherItem.querySelector('.faq-body');
                    if (otherBody) otherBody.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    body.style.maxHeight = body.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    body.style.maxHeight = null;
                }
            });
        }
    });

    // ==========================================================================
    // 4. LEPAS KUNCI VS DENGAN SOPIR SERVICE TAB TOGGLER (mobil.html)
    // ==========================================================================
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceSections = document.querySelectorAll('.service-section');

    if (serviceTabs.length > 0 && serviceSections.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active classes
                serviceTabs.forEach(t => t.classList.remove('active'));
                serviceSections.forEach(s => s.style.display = 'none');

                // Add active to current
                tab.classList.add('active');
                const targetService = tab.getAttribute('data-service');
                const targetSection = document.getElementById(targetService + 'Section');
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
                
                // Reset category filters to "All" when switching main tabs
                const activeSection = document.getElementById(targetService + 'Section');
                if (activeSection) {
                    const activeFilterTab = activeSection.querySelector('.filter-tab[data-filter="all"]');
                    if (activeFilterTab) {
                        activeFilterTab.click();
                    }
                }
            });
        });
    }

    // ==========================================================================
    // 4b. CLICKABLE RATES IN CAR CATALOG CARDS (mobil.html)
    // ==========================================================================
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        // Tag decorative / warning items as info items (not clickable)
        const allItems = card.querySelectorAll('.rate-list .rate-item');
        allItems.forEach(item => {
            const hasStrong = item.querySelector('strong') !== null;
            const text = item.textContent || '';
            if (!hasStrong || text.includes('*')) {
                item.classList.add('info-item');
            }
        });

        // Clickable rates selection
        const clickableItems = Array.from(card.querySelectorAll('.rate-list .rate-item:not(.info-item)'));
        if (clickableItems.length > 0) {
            // Set first rate active by default
            clickableItems[0].classList.add('active');

            const updateCardValues = (item) => {
                const labelText = item.querySelector('span').textContent.trim();
                const priceText = item.querySelector('strong').textContent.trim();
                
                const priceVal = card.querySelector('.price-val');
                const priceLabel = card.querySelector('.price-label');
                const btn = card.querySelector('.car-pricing-footer a.btn');
                const carName = card.querySelector('.car-name').textContent.trim();

                if (priceVal) priceVal.textContent = priceText;
                if (priceLabel) {
                    if (labelText.includes('12 Jam')) priceLabel.textContent = 'Tarif 12 Jam';
                    else if (labelText.includes('24 Jam')) priceLabel.textContent = 'Tarif 24 Jam';
                    else priceLabel.textContent = 'Tarif Fullday';
                }

                if (btn) {
                    const isDenganSopir = card.closest('#denganSopirSection') !== null;
                    const initialHref = btn.getAttribute('href') || '';
                    let supir = 'lepas-kunci';
                    let targetPage = 'kontak.html';

                    if (isDenganSopir || initialHref.includes('pesan-sopir.html') || initialHref.includes('supir=dengan-sopir')) {
                        supir = 'dengan-sopir';
                        targetPage = 'pesan-sopir.html';
                    }

                    const paketVal = labelText.replace(/\s+/g, '-');
                    const numericPrice = priceText.replace(/[^\d]/g, '');
                    btn.setAttribute('href', `${targetPage}?supir=${supir}&mobil=${encodeURIComponent(carName)}&paket=${encodeURIComponent(paketVal)}&harga=${numericPrice}`);
                }
            };

            // Run once at start
            updateCardValues(clickableItems[0]);

            clickableItems.forEach(item => {
                item.addEventListener('click', () => {
                    clickableItems.forEach(r => r.classList.remove('active'));
                    item.classList.add('active');
                    updateCardValues(item);
                });
            });
        }
    });

    // ==========================================================================
    // 5. VEHICLE CATEGORY FILTERING (mobil.html)
    // ==========================================================================
    // Handle category filters for Lepas Kunci
    const lepasKunciFilterTabs = document.querySelectorAll('#lepasKunciSection .filter-tab');
    const lepasKunciCards = document.querySelectorAll('#lepasKunciSection .car-card');
    
    if (lepasKunciFilterTabs.length > 0 && lepasKunciCards.length > 0) {
        lepasKunciFilterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                lepasKunciFilterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filterValue = tab.getAttribute('data-filter');

                lepasKunciCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Handle category filters for Dengan Sopir
    const denganSopirFilterTabs = document.querySelectorAll('#denganSopirSection .filter-tab');
    const denganSopirCards = document.querySelectorAll('#denganSopirSection .car-card');
    
    if (denganSopirFilterTabs.length > 0 && denganSopirCards.length > 0) {
        denganSopirFilterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                denganSopirFilterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filterValue = tab.getAttribute('data-filter');

                denganSopirCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 6. CUSTOM CAR REQUEST WHATSAPP BUILDER (mobil.html)
    // ==========================================================================
    const customCarForm = document.getElementById('customCarForm');
    if (customCarForm) {
        customCarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const carName = document.getElementById('customCarName').value.trim();
            const serviceType = document.getElementById('customServiceType').value;

            if (!carName) {
                alert('Silakan isi nama mobil yang Anda ajukan.');
                return;
            }

            const adminWA = '6281234567890';
            const textMessage = `*Permintaan Unit Mobil Kustom - Aksara Transport*\n-------------------------------------------\n\nSaya ingin menanyakan ketersediaan sewa mobil kustom yang tidak ada di katalog:\n\n*Nama Mobil:* ${carName}\n*Sistem Sewa:* ${serviceType === 'lepas-kunci' ? 'Lepas Kunci (Tanpa Supir)' : 'Dengan Supir'}\n\nMohon informasi ketersediaan unit dan tarif harganya. Terima kasih!`;
            
            const encodedText = encodeURIComponent(textMessage);
            window.open(`https://wa.me/${adminWA}?text=${encodedText}`, '_blank');
        });
    }

    // ==========================================================================
    // 7. BOOKING FORM LOGIC & REAL-TIME CALCULATOR (kontak.html)
    // ==========================================================================
    var bookingForm = document.getElementById('bookingForm');
    var selectSopir = document.getElementById('sewaSupir');
    var selectMobil = document.getElementById('sewaMobil');
    var selectPaket = document.getElementById('sewaPaket');
    var selectWisata = document.getElementById('sewaPaketWisata');
    
    // Parse URL params at the top of the block so they are scoped for all form helper functions
    const urlParams = new URLSearchParams(window.location.search);
    const carParam = urlParams.get('mobil');
    const wisataParam = urlParams.get('wisata');
    
    // Tour Packages Transport Base Rates Database (Package rate is now 0 as the rate is fully determined by the car)
    const tourPackages = {
        'Paket A': 0,
        'Paket B': 0,
        'Paket C': 0,
        'Paket D': 0,
        'Paket E': 0,
        'Paket F': 0,
        'Paket G': 0,
        'Paket H': 0,
        'Paket I': 0,
        'Paket J': 0,
        'Paket K': 0,
        'Paket Dieng': 0,
        'Kustom Rute': 0
    };

    // Dynamic Car Rates database by Tour Package (Includes Car + Driver + BBM for 12 Hours)
    const tourCarRatesByPackage = {
        'default': {
            'Avanza / Xenia Facelift': 600000,
            'Avanza / Xenia FWD': 650000,
            'Innova Reborn': 900000,
            'Hiace Commuter': 1300000,
            'Hiace Premio': 1500000
        },
        'Paket A': { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1200000, 'Hiace Premio': 1400000 },
        'Paket B': { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1200000, 'Hiace Premio': 1400000 },
        'Paket C': { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1200000, 'Hiace Premio': 1400000 },
        'Paket D': { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1200000, 'Hiace Premio': 1400000 },
        'Paket E': { 'Avanza / Xenia Facelift': 600000, 'Avanza / Xenia FWD': 650000, 'Innova Reborn': 800000, 'Hiace Commuter': 1200000, 'Hiace Premio': 1400000 },
        'Paket F': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1250000, 'Hiace Premio': 1450000 },
        'Paket G': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1250000, 'Hiace Premio': 1450000 },
        'Paket H': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1250000, 'Hiace Premio': 1450000 },
        'Paket I': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1250000, 'Hiace Premio': 1450000 },
        'Paket J': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1250000, 'Hiace Premio': 1450000 },
        'Paket K': { 'Avanza / Xenia Facelift': 650000, 'Avanza / Xenia FWD': 700000, 'Innova Reborn': 850000, 'Hiace Commuter': 1250000, 'Hiace Premio': 1450000 },
        'Paket Dieng': { 'Avanza / Xenia Facelift': 800000, 'Avanza / Xenia FWD': 900000, 'Innova Reborn': 1000000, 'Hiace Commuter': 1350000, 'Hiace Premio': 1600000 }
    };

    const getTourCarRate = (wisata, car) => {
        if (tourCarRatesByPackage[wisata] && tourCarRatesByPackage[wisata][car] !== undefined) {
            return tourCarRatesByPackage[wisata][car];
        }
        return tourCarRatesByPackage['default'][car] || 0;
    };

    // Rates Database
    const carRates = {
        'lepas-kunci': {
            'Honda Brio Matic': {
                '12-Jam-Weekday': 250000,
                '24-Jam-Weekday': 350000,
                'Fullday-Weekend': 300000
            },
            'Honda Jazz Matic': {
                '12-Jam-Weekday': 325000,
                '24-Jam-Weekday': 425000,
                'Fullday-Weekend': 375000
            },
            'Toyota Raize': {
                '12-Jam-Weekday': 325000,
                '24-Jam-Weekday': 425000,
                'Fullday-Weekend': 375000
            },
            'Avanza Facelift Matic': {
                '12-Jam-Weekday': 250000,
                '24-Jam-Weekday': 350000,
                'Fullday-Weekend': 300000
            },
            'Avanza FWD Matic': {
                '12-Jam-Weekday': 300000,
                '24-Jam-Weekday': 375000,
                'Fullday-Weekend': 350000
            },
            'Mitsubishi Xpander Matic': {
                '12-Jam-Weekday': 325000,
                '24-Jam-Weekday': 425000,
                'Fullday-Weekend': 375000
            },
            'Toyota Innova Reborn Matic': {
                '12-Jam-Weekday': 450000,
                '24-Jam-Weekday': 500000,
                'Fullday-Weekend': 550000
            },
            'Wuling Air EV': {
                'Fullday-(Weekday/Weekend)': 450000
            },
            'Wuling Binguo EV': {
                'Fullday-(Weekday/Weekend)': 550000
            }
        },
        'dengan-sopir': {
            'Honda Brio (Sopir)': {
                '12-Jam': 450000,
                'Fullday': 550000
            },
            'Toyota Avanza Facelift (Sopir)': {
                '12-Jam': 550000,
                'Fullday': 600000
            },
            'Toyota Avanza FWD (Sopir)': {
                '12-Jam': 650000,
                'Fullday': 750000
            },
            'Mitsubishi Xpander (Sopir)': {
                '12-Jam': 700000,
                'Fullday': 800000
            },
            'Toyota Innova Reborn 2026 (Sopir)': {
                '12-Jam': 750000,
                'Fullday': 850000
            },
            'Toyota Innova Zenix 2026 (Sopir)': {
                '12-Jam': 1000000,
                'Fullday': 1100000
            },
            'Toyota Fortuner 2026 (Sopir)': {
                '12-Jam': 1500000,
                'Fullday': 1600000
            },
            'Mitsubishi Pajero 2026 (Sopir)': {
                '12-Jam': 1500000,
                'Fullday': 1600000
            },
            'Toyota Alphard Facelift 2023 (Sopir)': {
                '12-Jam': 2899000,
                'Fullday': 2999999
            },
            'Toyota Alphard HEV 2026 (Sopir)': {
                '12-Jam': 3899999,
                'Fullday': 3999999
            },
            'Toyota Hiace Commuter (Sopir)': {
                '12-Jam': 1100000,
                'Fullday': 1200000
            },
            'Toyota Hiace Premio (Sopir)': {
                '12-Jam': 1400000,
                'Fullday': 1500000
            },
            'Elf Long 19 Seat (Sopir)': {
                '12-Jam': 1500000,
                'Fullday': 1600000
            }
        }
    };

    const formatRupiah = (num) => {
        return 'Rp ' + num.toLocaleString('id-ID');
    };

    if (selectSopir && selectMobil) {
        // Populate time dropdowns with 24-hour options
        const populateTimeDropdown = (selectEl, defaultValue) => {
            if (!selectEl) return;
            if (selectEl.tagName === 'INPUT') {
                selectEl.value = defaultValue;
                return;
            }
            selectEl.innerHTML = '';
            for (let h = 0; h < 24; h++) {
                const hStr = String(h).padStart(2, '0');
                ['00', '30'].forEach(m => {
                    const val = `${hStr}:${m}`;
                    const opt = document.createElement('option');
                    opt.value = val;
                    opt.textContent = val;
                    if (val === defaultValue) {
                        opt.selected = true;
                    }
                    selectEl.appendChild(opt);
                });
            }
        };

        const startTimeInput = document.getElementById('sewaMulaiTime');
        const endTimeInput = document.getElementById('sewaSelesaiTime');

        populateTimeDropdown(startTimeInput, '08:00');
        populateTimeDropdown(endTimeInput, '08:00');

        const parseLocalDate = (dateStr) => {
            const [year, month, day] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day);
        };

        const formatLocalDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const updateReturnDateTime = () => {
            const startVal = document.getElementById('sewaMulai').value;
            const startTimeVal = startTimeInput ? startTimeInput.value : '';
            const paketVal = selectPaket.value;
            const isLepasKunci = selectSopir.value === 'lepas-kunci';
            const durasiInput = document.getElementById('sewaDurasi');
            const durasiVal = parseInt(durasiInput ? durasiInput.value : 1) || 1;

            const endInput = document.getElementById('sewaSelesai');

            if (!startVal) return;

            // Pastikan input jam mulai selalu bisa diedit
            if (startTimeInput) {
                startTimeInput.disabled = false;
                startTimeInput.style.backgroundColor = '#ffffff';
                startTimeInput.style.cursor = 'pointer';
                startTimeInput.style.color = 'inherit';
            }

            const startDate = parseLocalDate(startVal);
            let minEndDateStr = startVal;
            let targetTimeStr = '';

            if (isLepasKunci) {
                // Lepas Kunci
                if (paketVal && (paketVal.includes('12-Jam') || paketVal.includes('12-jam'))) {
                    // 12 Jam: dihitung 1 hari. Jam kembali = jam antar + 12 jam.
                    if (startTimeVal) {
                        const [hours, minutes] = startTimeVal.split(':').map(Number);
                        let endHours = hours + 12;
                        let dayOffset = 0;
                        if (endHours >= 24) {
                            endHours -= 24;
                            dayOffset = 1;
                        }
                        const nextDay = new Date(startDate);
                        nextDay.setDate(nextDay.getDate() + dayOffset);
                        minEndDateStr = formatLocalDate(nextDay);

                        const endHoursStr = String(endHours).padStart(2, '0');
                        const endMinStr = String(minutes).padStart(2, '0');
                        targetTimeStr = `${endHoursStr}:${endMinStr}`;
                    }

                    // Lock return date
                    if (endInput) {
                        endInput.value = minEndDateStr;
                        endInput.readOnly = true;
                        endInput.style.backgroundColor = '#f1f5f9';
                        endInput.style.cursor = 'not-allowed';
                        endInput.style.color = '#64748b';
                    }

                    // Lock return time
                    if (endTimeInput) {
                        if (endTimeInput.tagName === 'INPUT') endTimeInput.readOnly = true;
                        else endTimeInput.disabled = true;
                        endTimeInput.style.backgroundColor = '#f1f5f9';
                        endTimeInput.style.cursor = 'not-allowed';
                        endTimeInput.style.color = '#64748b';
                    }

                    // Lock duration input to 1
                    if (durasiInput) {
                        durasiInput.value = 1;
                        durasiInput.readOnly = true;
                        durasiInput.style.backgroundColor = '#f1f5f9';
                        durasiInput.style.cursor = 'not-allowed';
                        durasiInput.style.color = '#64748b';
                    }
                } else if (paketVal && paketVal.includes('24-Jam')) {
                    // 24 Jam: tanggal selesai = tanggal mulai + durasi hari. Jam kembali = jam antar (jam yang sama).
                    const nextDay = new Date(startDate);
                    nextDay.setDate(nextDay.getDate() + durasiVal);
                    minEndDateStr = formatLocalDate(nextDay);
                    targetTimeStr = startTimeVal;

                    // Enable manual inputs
                    if (endInput) {
                        if (!endInput.value || parseLocalDate(endInput.value) < startDate) {
                            endInput.value = minEndDateStr;
                        }
                        endInput.readOnly = false;
                        endInput.style.backgroundColor = '#ffffff';
                        endInput.style.cursor = 'pointer';
                        endInput.style.color = 'inherit';
                    }

                    if (endTimeInput) {
                        if (endTimeInput.tagName === 'INPUT') endTimeInput.readOnly = false;
                        else endTimeInput.disabled = false;
                        endTimeInput.style.backgroundColor = '#ffffff';
                        endTimeInput.style.cursor = 'pointer';
                        endTimeInput.style.color = 'inherit';
                    }

                    // System calculates duration, make readonly
                    if (durasiInput) {
                        durasiInput.readOnly = true;
                        durasiInput.style.backgroundColor = '#f8fafc';
                        durasiInput.style.cursor = 'default';
                        durasiInput.style.color = 'inherit';
                    }
                } else {
                    // Fullday / Allday: tanggal selesai = tanggal mulai + durasi - 1 hari. Jam kembali maksimal 22:30.
                    const nextDay = new Date(startDate);
                    nextDay.setDate(nextDay.getDate() + durasiVal - 1);
                    minEndDateStr = formatLocalDate(nextDay);
                    targetTimeStr = "22:30";

                    // Enable manual inputs
                    if (endInput) {
                        if (!endInput.value || parseLocalDate(endInput.value) < startDate) {
                            endInput.value = minEndDateStr;
                        }
                        endInput.readOnly = false;
                        endInput.style.backgroundColor = '#ffffff';
                        endInput.style.cursor = 'pointer';
                        endInput.style.color = 'inherit';
                    }

                    if (endTimeInput) {
                        if (endTimeInput.tagName === 'INPUT') endTimeInput.readOnly = false;
                        else endTimeInput.disabled = false;
                        endTimeInput.style.backgroundColor = '#ffffff';
                        endTimeInput.style.cursor = 'pointer';
                        endTimeInput.style.color = 'inherit';
                    }

                    // System calculates duration, make readonly
                    if (durasiInput) {
                        durasiInput.readOnly = true;
                        durasiInput.style.backgroundColor = '#f8fafc';
                        durasiInput.style.cursor = 'default';
                        durasiInput.style.color = 'inherit';
                    }
                }
            } else {
                // Dengan Sopir: return date/time calculated automatically based on duration
                if (paketVal && (paketVal.includes('12-Jam') || paketVal.includes('12-jam') || paketVal === '12-Jam')) {
                    if (startTimeVal) {
                        const [hours, minutes] = startTimeVal.split(':').map(Number);
                        let endHours = hours + 12;
                        let dayOffset = 0;
                        if (endHours >= 24) {
                            endHours -= 24;
                            dayOffset = 1;
                        }
                        const nextDay = new Date(startDate);
                        nextDay.setDate(nextDay.getDate() + durasiVal - 1 + dayOffset);
                        minEndDateStr = formatLocalDate(nextDay);

                        const endHoursStr = String(endHours).padStart(2, '0');
                        const endMinStr = String(minutes).padStart(2, '0');
                        targetTimeStr = `${endHoursStr}:${endMinStr}`;
                    }
                } else {
                    const nextDay = new Date(startDate);
                    nextDay.setDate(nextDay.getDate() + durasiVal - 1);
                    minEndDateStr = formatLocalDate(nextDay);
                    targetTimeStr = "22:30";
                }

                if (endInput) {
                    endInput.value = minEndDateStr;
                    endInput.readOnly = true;
                    endInput.style.backgroundColor = '#f1f5f9';
                    endInput.style.cursor = 'not-allowed';
                    endInput.style.color = '#64748b';
                }

                if (endTimeInput) {
                    if (endTimeInput.tagName === 'INPUT') endTimeInput.readOnly = true;
                    else endTimeInput.disabled = true;
                    endTimeInput.style.backgroundColor = '#f1f5f9';
                    endTimeInput.style.cursor = 'not-allowed';
                    endTimeInput.style.color = '#64748b';
                }

                if (durasiInput) {
                    durasiInput.readOnly = false;
                    durasiInput.style.backgroundColor = '#ffffff';
                    durasiInput.style.cursor = 'pointer';
                    durasiInput.style.color = 'inherit';
                }
            }
            
            // Set calculated time in select dropdown (add dynamically if it doesn't exist)
            if (targetTimeStr && endTimeInput) {
                if (endTimeInput.tagName === 'INPUT') {
                    endTimeInput.value = targetTimeStr;
                } else {
                    let exists = false;
                    for (let option of endTimeInput.options) {
                        if (option.value === targetTimeStr) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        const opt = document.createElement('option');
                        opt.value = targetTimeStr;
                        opt.textContent = targetTimeStr;
                        endTimeInput.appendChild(opt);
                    }
                    endTimeInput.value = targetTimeStr;
                }
            }
        };

        const recalculateDurationFromDates = () => {
            const startVal = document.getElementById('sewaMulai').value;
            const startTimeVal = startTimeInput ? startTimeInput.value : '';
            const endVal = document.getElementById('sewaSelesai').value;
            const endTimeVal = endTimeInput ? endTimeInput.value : '';
            const paketVal = selectPaket.value;
            const isLepasKunci = selectSopir.value === 'lepas-kunci';
            const durasiInput = document.getElementById('sewaDurasi');

            if (!startVal || !endVal || !durasiInput) return;

            const startDate = parseLocalDate(startVal);
            const endDate = parseLocalDate(endVal);

            // Validate that return date is not before start date
            if (endDate < startDate) {
                document.getElementById('sewaSelesai').value = startVal;
                durasiInput.value = 1;
                calculatePrice();
                return;
            }

            let duration = 1;

            if (isLepasKunci) {
                if (paketVal && (paketVal.includes('12-Jam') || paketVal.includes('12-jam'))) {
                    duration = 1;
                } else if (paketVal && paketVal.includes('24-Jam')) {
                    // Calculate difference in hours
                    const startDateTime = new Date(startDate);
                    if (startTimeVal) {
                        const [h, m] = startTimeVal.split(':').map(Number);
                        startDateTime.setHours(h, m, 0, 0);
                    }
                    const endDateTime = new Date(endDate);
                    if (endTimeVal) {
                        const [h, m] = endTimeVal.split(':').map(Number);
                        endDateTime.setHours(h, m, 0, 0);
                    }

                    const diffMs = endDateTime.getTime() - startDateTime.getTime();
                    const diffHours = diffMs / (1000 * 60 * 60);
                    duration = Math.max(1, Math.ceil(diffHours / 24));
                } else {
                    // Fullday: calendar days difference + 1
                    const diffTime = endDate.getTime() - startDate.getTime();
                    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                    duration = Math.max(1, diffDays + 1);
                }
            } else {
                // Dengan Sopir: calendar days difference + 1
                const diffTime = endDate.getTime() - startDate.getTime();
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                duration = Math.max(1, diffDays + 1);
            }

            durasiInput.value = duration;
            calculatePrice();
        };

        // Recalculate everything when inputs change
        const calculatePrice = () => {
            const isLepasKunci = selectSopir.value === 'lepas-kunci';
            const carVal = selectMobil.value;
            const startVal = document.getElementById('sewaMulai').value;
            const endVal = document.getElementById('sewaSelesai').value;
            
            // Toggle form visibility
            const fieldsLepasKunci = document.getElementById('fieldsLepasKunci');
            const fieldsDenganSopir = document.getElementById('fieldsDenganSopir');
            const rowBiayaAntarJemput = document.getElementById('rowBiayaAntarJemput');

            // Dynamic Form Labels
            const sewaPaketLabel = document.getElementById('sewaPaketLabel');
            if (sewaPaketLabel) {
                sewaPaketLabel.textContent = isLepasKunci ? "Pilihan Paket Waktu" : "Pelayanan";
            }
            const sewaMulaiLabel = document.getElementById('sewaMulaiLabel');
            if (sewaMulaiLabel) {
                sewaMulaiLabel.textContent = isLepasKunci ? "Tanggal Mulai & Jam Antar" : "Tanggal Mulai & Jam Penjemputan";
            }
            const sewaSelesaiLabel = document.getElementById('sewaSelesaiLabel');
            if (sewaSelesaiLabel) {
                sewaSelesaiLabel.textContent = isLepasKunci ? "Tanggal Selesai & Jam Kembali (Bisa Diisi Manual)" : "Tanggal & Jam Selesai (Otomatis)";
            }
            const sewaPengantaranLabel = document.getElementById('sewaPengantaranLabel');
            const sewaPengantaranAlamat = document.getElementById('sewaPengantaranAlamat');
            if (sewaPengantaranLabel) {
                sewaPengantaranLabel.textContent = isLepasKunci ? "Alamat Lengkap Pengantaran" : "Lokasi Lengkap Penjemputan";
            }
            if (sewaPengantaranAlamat) {
                sewaPengantaranAlamat.placeholder = isLepasKunci 
                    ? "Masukkan alamat lengkap (Hotel, Stasiun, Rumah, dll) atau paste Link Google Maps"
                    : "Masukkan alamat lengkap penjemputan (Hotel, Stasiun, Bandara, Rumah, dll) atau paste Link Google Maps";
            }

            // Checkbox YIA Surcharges Visibility
            const chkAntarYIAContainer = document.getElementById('chkAntarYIAContainer');
            if (chkAntarYIAContainer) {
                chkAntarYIAContainer.style.display = isLepasKunci ? 'flex' : 'none';
            }
            if (!isLepasKunci) {
                const chkAntarYIA = document.getElementById('chkAntarYIA');
                if (chkAntarYIA) chkAntarYIA.checked = false;
            }

            // Toggle WhatsApp 2 vs PJ
            const colSewaWaPJ = document.getElementById('colSewaWaPJ');
            const colSewaTeleponAlt = document.getElementById('colSewaTeleponAlt');
            const sewaWaPJ = document.getElementById('sewaWaPJ');
            const sewaTeleponAlt = document.getElementById('sewaTeleponAlt');

            if (isLepasKunci) {
                if (colSewaWaPJ) colSewaWaPJ.style.display = 'block';
                if (colSewaTeleponAlt) colSewaTeleponAlt.style.display = 'none';
                if (sewaWaPJ) sewaWaPJ.required = true;
                if (sewaTeleponAlt) {
                    sewaTeleponAlt.required = false;
                    sewaTeleponAlt.value = '';
                }
            } else {
                if (colSewaWaPJ) colSewaWaPJ.style.display = 'none';
                if (colSewaTeleponAlt) colSewaTeleponAlt.style.display = 'block';
                if (sewaWaPJ) {
                    sewaWaPJ.required = false;
                    sewaWaPJ.value = '';
                }
                if (sewaTeleponAlt) sewaTeleponAlt.required = true;
            }

            if (isLepasKunci) {
                if (fieldsLepasKunci) fieldsLepasKunci.style.display = 'block';
                if (fieldsDenganSopir) fieldsDenganSopir.style.display = 'none';
                if (rowBiayaAntarJemput) rowBiayaAntarJemput.style.display = 'flex';
                
                document.getElementById('sewaPaket').required = true;
                document.getElementById('sewaPengantaranAlamat').required = true;
                document.getElementById('sewaPengambilanAlamat').required = true;
                document.getElementById('sewaSyaratCheck').required = true;
            } else {
                if (fieldsLepasKunci) fieldsLepasKunci.style.display = 'none';
                if (fieldsDenganSopir) fieldsDenganSopir.style.display = 'block';
                if (rowBiayaAntarJemput) rowBiayaAntarJemput.style.display = 'none';
                
                document.getElementById('sewaPaket').required = true;
                document.getElementById('sewaPengantaranAlamat').required = true;
                document.getElementById('sewaPengambilanAlamat').required = false;
                document.getElementById('sewaSyaratCheck').required = false;
            }

            if (!carVal) {
                document.getElementById('calcMobilName').textContent = '-';
                document.getElementById('calcMobilPrice').textContent = 'Rp 0';
                document.getElementById('calcTotal').textContent = 'Rp 0';
                document.getElementById('calcDP').textContent = 'Rp 0';
                return;
            }

            let days = 1;
            const durasiInput = document.getElementById('sewaDurasi');
            if (durasiInput) {
                days = parseInt(durasiInput.value) || 1;
            }

            let carPrice = 0;
            let deliveryFee = 0;
            let adminSurcharge = 0;

            const paketVal = selectPaket.value;

            if (isLepasKunci) {
                if (paketVal && carRates['lepas-kunci'][carVal] && carRates['lepas-kunci'][carVal][paketVal]) {
                    carPrice = carRates['lepas-kunci'][carVal][paketVal];
                }
                
                // Delivery / Return Fees based on YIA Checkboxes
                const antarYia = document.getElementById('chkAntarYIA') && document.getElementById('chkAntarYIA').checked;
                const jemputYia = document.getElementById('chkJemputYIA') && document.getElementById('chkJemputYIA').checked;

                if (antarYia) deliveryFee += 150000;
                if (jemputYia) deliveryFee += 150000;
            } else {
                const wisataVal = selectWisata ? selectWisata.value : '';
                const tourCarRate = getTourCarRate(wisataVal, carVal);
                if (wisataVal && tourCarRate > 0) {
                    carPrice = tourCarRate;
                } else {
                    if (paketVal && carRates['dengan-sopir'][carVal] && carRates['dengan-sopir'][carVal][paketVal]) {
                        carPrice = carRates['dengan-sopir'][carVal][paketVal];
                    }
                }
            }

            // Admin / Custom Out of Town Delivery Cost Input (Common)
            const biayaTambahanEl = document.getElementById('sewaBiayaTambahan');
            if (biayaTambahanEl && biayaTambahanEl.value) {
                adminSurcharge = parseFloat(biayaTambahanEl.value) || 0;
            }

            // Tour Package & Addons (Optional)
            let wisataFee = 0;
            let wisataAddonsFee = 0;
            let carDisplayPrice = carPrice;
            let baseCarPrice = carPrice;

            const rowBiayaWisata = document.getElementById('rowBiayaWisata');
            const rowBiayaWisataAddons = document.getElementById('rowBiayaWisataAddons');
            const calcWisataName = document.getElementById('calcWisataName');
            const calcWisataPrice = document.getElementById('calcWisataPrice');
            const calcWisataAddonsPrice = document.getElementById('calcWisataAddonsPrice');
            
            const wisataVal = selectWisata ? selectWisata.value : '';
            
            if (wisataVal && tourPackages[wisataVal] !== undefined) {
                wisataFee = 0; // Price is fully determined by the car
                
                carDisplayPrice = carPrice;
                baseCarPrice = carPrice;
                
                if (rowBiayaWisata) rowBiayaWisata.style.display = 'flex';
                if (calcWisataName) calcWisataName.textContent = wisataVal;
                if (calcWisataPrice) calcWisataPrice.textContent = "Sesuai Pilihan Unit";
                
                // Addon calculation
                const chkJeepMerapi = document.getElementById('addonJeepMerapi');
                const chkJeepGumuk = document.getElementById('addonJeepGumuk');
                const chkVWBorobudur = document.getElementById('addonVWBorobudur');
                
                if (chkJeepMerapi && chkJeepMerapi.checked) wisataAddonsFee += 350000;
                if (chkJeepGumuk && chkJeepGumuk.checked) wisataAddonsFee += 350000;
                if (chkVWBorobudur && chkVWBorobudur.checked) wisataAddonsFee += 650000;
                
                if (wisataAddonsFee > 0) {
                    if (rowBiayaWisataAddons) rowBiayaWisataAddons.style.display = 'flex';
                    if (calcWisataAddonsPrice) calcWisataAddonsPrice.textContent = formatRupiah(wisataAddonsFee);
                } else {
                    if (rowBiayaWisataAddons) rowBiayaWisataAddons.style.display = 'none';
                }
            } else {
                if (rowBiayaWisata) rowBiayaWisata.style.display = 'none';
                if (rowBiayaWisataAddons) rowBiayaWisataAddons.style.display = 'none';
            }

            const baseTotal = baseCarPrice * days;
            const total = baseTotal + deliveryFee + adminSurcharge + wisataFee + wisataAddonsFee;
            const dp = total * 0.3;

            // Update UI elements
            document.getElementById('calcMobilName').textContent = carVal;
            if (wisataVal) {
                document.getElementById('calcMobilPrice').textContent = formatRupiah(carPrice) + ' (Tarif Wisata)';
            } else {
                document.getElementById('calcMobilPrice').textContent = formatRupiah(carPrice) + (isLepasKunci ? '' : ' / Hari');
            }
            document.getElementById('calcDurasi').textContent = `${days} Hari`;
            document.getElementById('calcAntarJemput').textContent = formatRupiah(deliveryFee + adminSurcharge);
            document.getElementById('calcTotal').textContent = formatRupiah(total);
            document.getElementById('calcDP').textContent = formatRupiah(dp);
        };

        const updatePaketDropdown = () => {
            const isLepasKunci = selectSopir.value === 'lepas-kunci';
            const carVal = selectMobil.value;
            const wisataVal = selectWisata ? selectWisata.value : '';
            
            if (!selectPaket) return;
            selectPaket.innerHTML = '';
            
            if (wisataVal && !isLepasKunci) {
                // Tour Package is selected: duration is 12 Jam (Include Sopir + BBM)
                const opt = document.createElement('option');
                opt.value = '12-Jam';
                opt.textContent = `Paket Wisata (12 Jam) - Sudah Include Sopir + BBM`;
                selectPaket.appendChild(opt);
            } else {
                if (isLepasKunci && carVal && carRates['lepas-kunci'][carVal]) {
                    const rates = carRates['lepas-kunci'][carVal];
                    Object.keys(rates).forEach(key => {
                        const opt = document.createElement('option');
                        opt.value = key;
                        const labelClean = key.replace(/-/g, ' ');
                        opt.textContent = `${labelClean} (${formatRupiah(rates[key])})`;
                        selectPaket.appendChild(opt);
                    });
                } else if (!isLepasKunci && carVal && carRates['dengan-sopir'][carVal]) {
                    const rates = carRates['dengan-sopir'][carVal];
                    Object.keys(rates).forEach(key => {
                        const opt = document.createElement('option');
                        opt.value = key;
                        const labelClean = key.replace(/-/g, ' ');
                        opt.textContent = `${labelClean} (Include Sopir + BBM - ${formatRupiah(rates[key])})`;
                        selectPaket.appendChild(opt);
                    });
                }
            }
        };

        const updateCarDropdown = () => {
            const isLepasKunci = selectSopir.value === 'lepas-kunci';
            const wisataVal = selectWisata ? selectWisata.value : '';
            
            // Clear existing options except default
            selectMobil.innerHTML = '<option value="" disabled selected>Pilih Unit Mobil</option>';
            
            if (wisataVal && !isLepasKunci) {
                // If tour package is selected, show the 5 tour vehicles
                const cars = Object.keys(tourCarRatesByPackage['default']);
                cars.forEach(car => {
                    const el = document.createElement('option');
                    el.value = car;
                    const price = getTourCarRate(wisataVal, car);
                    el.textContent = `${car} (${formatRupiah(price)})`;
                    selectMobil.appendChild(el);
                });

                // If we have a custom car parameter that does not match the 5 tour vehicles, append it
                if (carParam) {
                    let bestScore = 0;
                    for (let option of selectMobil.options) {
                        const score = matchCarScore(option.value, carParam);
                        if (score > bestScore) {
                            bestScore = score;
                        }
                    }
                    if (bestScore < 100) {
                        const normalCars = Object.keys(carRates['dengan-sopir']);
                        let bestNormalCar = null;
                        let bestNormalScore = 0;
                        normalCars.forEach(nc => {
                            const score = matchCarScore(nc, carParam);
                            if (score > bestNormalScore) {
                                bestNormalScore = score;
                                bestNormalCar = nc;
                            }
                        });
                        
                        if (bestNormalCar && bestNormalScore >= 100) {
                            const el = document.createElement('option');
                            el.value = bestNormalCar;
                            // Find standard rental rate with driver
                            const rates = carRates['dengan-sopir'][bestNormalCar];
                            const minPrice = Math.min(...Object.values(rates));
                            el.textContent = `${bestNormalCar} (Tarif Sewa: ${formatRupiah(minPrice)})`;
                            selectMobil.appendChild(el);
                        }
                    }
                }
            } else {
                // Normal behavior
                const cars = isLepasKunci ? Object.keys(carRates['lepas-kunci']) : Object.keys(carRates['dengan-sopir']);
                cars.forEach(car => {
                    const el = document.createElement('option');
                    el.value = car;
                    if (isLepasKunci) {
                        const rates = carRates['lepas-kunci'][car];
                        const minPrice = Math.min(...Object.values(rates));
                        el.textContent = `${car} (Mulai ${formatRupiah(minPrice)})`;
                    } else {
                        const rates = carRates['dengan-sopir'][car];
                        const minPrice = Math.min(...Object.values(rates));
                        el.textContent = `${car} (Mulai ${formatRupiah(minPrice)})`;
                    }
                    selectMobil.appendChild(el);
                });
            }
            
            updatePaketDropdown();
            updateReturnDateTime();
            calculatePrice();
        };

        // Dynamic Form Header Update
        const formTitle = document.querySelector('.contact-card h2');
        const updateFormHeader = () => {
            if (!formTitle || !selectSopir) return;
            if (selectSopir.value === 'lepas-kunci') {
                formTitle.textContent = "Formulir Pemesanan - Sewa Lepas Kunci";
            } else {
                formTitle.textContent = "Formulir Pemesanan - Sewa Dengan Sopir";
            }
        };

        // Form Event Listeners for Live Calculations & Autocomplete Return Times
        if (selectSopir) {
            // Initial load title update
            updateFormHeader();
            
            selectSopir.addEventListener('change', () => {
                updateFormHeader();
                updateCarDropdown();
            });
        }
        
        selectMobil.addEventListener('change', () => {
            updatePaketDropdown();
            updateReturnDateTime();
            calculatePrice();
        });

        if (selectPaket) {
            selectPaket.addEventListener('change', () => {
                updateReturnDateTime();
                calculatePrice();
            });
        }

        // Listener for Start date, time, and duration triggers return datetime calculation
        ['sewaMulai', 'sewaMulaiTime', 'sewaDurasi'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    updateReturnDateTime();
                    calculatePrice();
                });
                el.addEventListener('input', () => {
                    updateReturnDateTime();
                    calculatePrice();
                });
            }
        });

        // Other triggers for basic calculations
        ['sewaBiayaTambahan', 'sewaPaketWisata'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', calculatePrice);
        });

        // Special listener for manual input of return date and return time
        const endInputEl = document.getElementById('sewaSelesai');
        const endTimeInputEl = document.getElementById('sewaSelesaiTime');

        if (endInputEl) {
            endInputEl.addEventListener('change', recalculateDurationFromDates);
            endInputEl.addEventListener('input', recalculateDurationFromDates);
        }
        if (endTimeInputEl) {
            endTimeInputEl.addEventListener('change', recalculateDurationFromDates);
            endTimeInputEl.addEventListener('input', recalculateDurationFromDates);
        }

        // Checkbox YIA Surcharges triggers calculation
        ['chkAntarYIA', 'chkJemputYIA'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', calculatePrice);
        });

        // Fuzzy Match Scoring Helper for Cars Pre-selection
        const matchCarScore = (optionValue, queryValue) => {
            const optClean = optionValue.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
            const qClean = queryValue.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
            
            if (optClean === qClean) return 1000;
            
            if (optClean.includes(qClean) || qClean.includes(optClean)) {
                return 500 - Math.abs(optClean.length - qClean.length);
            }
            
            const cleanTokens = (str) => {
                return str.split(/\s+/).filter(t => t.length > 1);
            };
            const optTokens = cleanTokens(optClean);
            const qTokens = cleanTokens(qClean);
            
            let intersection = 0;
            qTokens.forEach(t => {
                if (optTokens.includes(t)) {
                    intersection++;
                }
            });
            
            if (intersection > 0) {
                return intersection * 10 - Math.abs(optTokens.length - qTokens.length);
            }
            return 0;
        };

        // Set Initial state
        updateCarDropdown();

        // Tour Package Event Listener & Dynamic Elements Toggle
        const colKustomRute = document.getElementById('colKustomRute');
        const sewaKustomRute = document.getElementById('sewaKustomRute');
        const wisataAddonsContainer = document.getElementById('wisataAddonsContainer');
        const addonJeepMerapiWrapper = document.getElementById('addonJeepMerapiWrapper');
        const addonJeepGumukWrapper = document.getElementById('addonJeepGumukWrapper');
        const addonVWBorobudurWrapper = document.getElementById('addonVWBorobudurWrapper');
        const chkJeepMerapi = document.getElementById('addonJeepMerapi');
        const chkJeepGumuk = document.getElementById('addonJeepGumuk');
        const addonVWBorobudur = document.getElementById('addonVWBorobudur');

        const handleWisataChange = () => {
            const wisataVal = selectWisata ? selectWisata.value : '';
            
            // 1. Force dengan-sopir and disable it when a package is chosen
            if (wisataVal !== '') {
                selectSopir.value = 'dengan-sopir';
                selectSopir.disabled = true;
                selectSopir.style.backgroundColor = '#f1f5f9';
                selectSopir.style.cursor = 'not-allowed';
            } else {
                selectSopir.disabled = false;
                selectSopir.style.backgroundColor = '#ffffff';
                selectSopir.style.cursor = 'pointer';
            }
            
            // Trigger car dropdown and other dependencies updates
            updateCarDropdown();
            updateFormHeader();
            
            // 2. Toggle Custom Route Textarea
            if (wisataVal === 'Kustom Rute') {
                if (colKustomRute) colKustomRute.style.display = 'block';
                if (sewaKustomRute) sewaKustomRute.required = true;
            } else {
                if (colKustomRute) colKustomRute.style.display = 'none';
                if (sewaKustomRute) {
                    sewaKustomRute.required = false;
                    sewaKustomRute.value = '';
                }
            }

            // 3. Toggle Addons Checkboxes (Only display relevant checkboxes for selected Trip, or all for Kustom Rute)
            if (wisataVal === 'Paket B') {
                if (wisataAddonsContainer) wisataAddonsContainer.style.display = 'block';
                if (addonJeepMerapiWrapper) addonJeepMerapiWrapper.style.display = 'flex';
                if (addonJeepGumukWrapper) addonJeepGumukWrapper.style.display = 'none';
                if (addonVWBorobudurWrapper) addonVWBorobudurWrapper.style.display = 'none';
                if (chkJeepGumuk) chkJeepGumuk.checked = false;
                if (addonVWBorobudur) addonVWBorobudur.checked = false;
            } else if (wisataVal === 'Paket C') {
                if (wisataAddonsContainer) wisataAddonsContainer.style.display = 'block';
                if (addonJeepMerapiWrapper) addonJeepMerapiWrapper.style.display = 'flex';
                if (addonJeepGumukWrapper) addonJeepGumukWrapper.style.display = 'flex';
                if (addonVWBorobudurWrapper) addonVWBorobudurWrapper.style.display = 'none';
                if (addonVWBorobudur) addonVWBorobudur.checked = false;
            } else if (wisataVal === 'Paket D') {
                if (wisataAddonsContainer) wisataAddonsContainer.style.display = 'block';
                if (addonJeepMerapiWrapper) addonJeepMerapiWrapper.style.display = 'none';
                if (addonJeepGumukWrapper) addonJeepGumukWrapper.style.display = 'flex';
                if (addonVWBorobudurWrapper) addonVWBorobudurWrapper.style.display = 'none';
                if (chkJeepMerapi) chkJeepMerapi.checked = false;
                if (addonVWBorobudur) addonVWBorobudur.checked = false;
            } else if (wisataVal === 'Paket A' || wisataVal === 'Paket J') {
                if (wisataAddonsContainer) wisataAddonsContainer.style.display = 'block';
                if (addonJeepMerapiWrapper) addonJeepMerapiWrapper.style.display = 'none';
                if (addonJeepGumukWrapper) addonJeepGumukWrapper.style.display = 'none';
                if (addonVWBorobudurWrapper) addonVWBorobudurWrapper.style.display = 'flex';
                if (chkJeepMerapi) chkJeepMerapi.checked = false;
                if (chkJeepGumuk) chkJeepGumuk.checked = false;
            } else if (wisataVal === 'Kustom Rute') {
                if (wisataAddonsContainer) wisataAddonsContainer.style.display = 'block';
                if (addonJeepMerapiWrapper) addonJeepMerapiWrapper.style.display = 'flex';
                if (addonJeepGumukWrapper) addonJeepGumukWrapper.style.display = 'flex';
                if (addonVWBorobudurWrapper) addonVWBorobudurWrapper.style.display = 'flex';
            } else {
                if (wisataAddonsContainer) wisataAddonsContainer.style.display = 'none';
                if (addonJeepMerapiWrapper) addonJeepMerapiWrapper.style.display = 'none';
                if (addonJeepGumukWrapper) addonJeepGumukWrapper.style.display = 'none';
                if (addonVWBorobudurWrapper) addonVWBorobudurWrapper.style.display = 'none';
                if (chkJeepMerapi) chkJeepMerapi.checked = false;
                if (chkJeepGumuk) chkJeepGumuk.checked = false;
                if (addonVWBorobudur) addonVWBorobudur.checked = false;
            }

            calculatePrice();
        };

        if (selectWisata) {
            selectWisata.addEventListener('change', handleWisataChange);
        }
        [chkJeepMerapi, chkJeepGumuk, addonVWBorobudur].forEach(chk => {
            if (chk) chk.addEventListener('change', calculatePrice);
        });

        // Check URL parameters for auto-selecting car, service, package, date, and duration
        const serviceParam = urlParams.get('supir');
        const paketParam = urlParams.get('paket');
        const tanggalParam = urlParams.get('tanggal');
        const durasiParam = urlParams.get('durasi');

        if (serviceParam) {
            selectSopir.value = serviceParam;
            updateCarDropdown();
            selectSopir.dispatchEvent(new Event('change'));
        }

        const selectWisataEl = document.getElementById('sewaPaketWisata');
        if (wisataParam && selectWisataEl) {
            // Tour packages are always with driver
            selectSopir.value = 'dengan-sopir';
            updateCarDropdown();
            selectSopir.dispatchEvent(new Event('change'));
            
            for (let option of selectWisataEl.options) {
                const valClean = option.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                const paramClean = wisataParam.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (valClean === paramClean || valClean.includes(paramClean) || paramClean.includes(valClean)) {
                    option.selected = true;
                    selectWisataEl.value = option.value;
                    selectWisataEl.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }

        const ruteParam = urlParams.get('rute');
        if (ruteParam && sewaKustomRute) {
            sewaKustomRute.value = ruteParam;
        }

        if (carParam) {

            let bestOption = null;
            let bestScore = 0;
            
            for (let option of selectMobil.options) {
                const score = matchCarScore(option.value, carParam);

                if (score > bestScore) {
                    bestScore = score;
                    bestOption = option;
                }
            }

            
            if (bestOption) {
                bestOption.selected = true;
                selectMobil.value = bestOption.value;
                selectMobil.dispatchEvent(new Event('change'));
            }
            updatePaketDropdown();
        }

        if (paketParam && selectPaket) {
            for (let option of selectPaket.options) {
                if (option.value.toLowerCase() === paketParam.toLowerCase()) {
                    option.selected = true;
                    selectPaket.value = option.value;
                    selectPaket.dispatchEvent(new Event('change'));
                    break;
                }
            }
        } else if (durasiParam && parseInt(durasiParam) > 1 && selectPaket) {
            // Automatically default to 24-hour rate for multi-day rentals
            for (let option of selectPaket.options) {
                if (option.value.toLowerCase().includes('24-jam')) {
                    option.selected = true;
                    selectPaket.value = option.value;
                    selectPaket.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }

        if (tanggalParam) {
            const startInput = document.getElementById('sewaMulai');
            if (startInput) {
                startInput.value = tanggalParam;
                startInput.dispatchEvent(new Event('change'));
            }
        } else {
            // Set default start date to today's date if not provided in URL
            const startInput = document.getElementById('sewaMulai');
            if (startInput && !startInput.value) {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                startInput.value = `${year}-${month}-${day}`;
                startInput.dispatchEvent(new Event('change'));
            }
        }

        if (durasiParam) {
            const durasiInput = document.getElementById('sewaDurasi');
            if (durasiInput) {
                durasiInput.value = durasiParam;
                durasiInput.dispatchEvent(new Event('change'));
            }
        }
        
        updateReturnDateTime();
        calculatePrice();

    }

    // ==========================================================================
    // 7b. WHATSAPP FORM SUBMISSION LOGIC (OTP Removed)
    // ==========================================================================
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form inputs
            const nama = document.getElementById('sewaNama').value.trim();
            const teleponInput = document.getElementById('sewaTelepon').value.trim();
            const mobil = document.getElementById('sewaMobil').value;
            const tanggalMulai = document.getElementById('sewaMulai').value;
            const jamAntar = document.getElementById('sewaMulaiTime').value;
            const tanggalSelesai = document.getElementById('sewaSelesai').value;
            const jamKembali = document.getElementById('sewaSelesaiTime').value;
            const supir = document.getElementById('sewaSupir').value;
            const tujuan = document.getElementById('sewaTujuan') ? document.getElementById('sewaTujuan').value.trim() : '';
            const catatan = document.getElementById('sewaCatatan').value.trim();

            const isLepasKunci = supir === 'lepas-kunci';
            const teleponAltInput = document.getElementById('sewaTeleponAlt') ? document.getElementById('sewaTeleponAlt').value.trim() : '';

            if (isLepasKunci) {
                if (!nama || !teleponInput || !mobil || !tanggalMulai || !tanggalSelesai || !tujuan) {
                    alert('Mohon lengkapi seluruh kolom wajib.');
                    return;
                }
            } else {
                if (!nama || !teleponInput || !teleponAltInput || !mobil || !tanggalMulai || !tanggalSelesai || !tujuan) {
                    alert('Mohon lengkapi seluruh kolom wajib termasuk 2 nomor WhatsApp aktif.');
                    return;
                }
            }

            // Automatic Phone Number Formatting for WhatsApp
            const formatWhatsAppNumber = (phoneStr) => {
                let clean = phoneStr.replace(/[^0-9]/g, '');
                if (clean.startsWith('0')) {
                    clean = '62' + clean.slice(1);
                }
                return clean;
            };
            const telepon = formatWhatsAppNumber(teleponInput);
            const teleponAlt = teleponAltInput ? formatWhatsAppNumber(teleponAltInput) : '';

            // Calculations
            const calcTotal = document.getElementById('calcTotal').textContent;
            const calcDP = document.getElementById('calcDP').textContent;
            const calcDurasi = document.getElementById('calcDurasi').textContent;

            const selectWisataInput = document.getElementById('sewaPaketWisata');
            const wisataVal = selectWisataInput ? selectWisataInput.value : '';
            const wisataFee = wisataVal ? (tourPackages[wisataVal] || 0) : 0;

            let textMessage = `*Pemesanan Rental Mobil - Aksara Transport*\n`;
            textMessage += `-------------------------------------------\n\n`;
            textMessage += `*Nama Lengkap:* ${nama}\n`;
            if (isLepasKunci) {
                textMessage += `*No. WhatsApp:* ${teleponInput} (${telepon})\n`;
                textMessage += `*Layanan:* Lepas Kunci (Tanpa Sopir)\n`;
            } else {
                textMessage += `*No. WhatsApp 1:* ${teleponInput} (${telepon})\n`;
                textMessage += `*No. WhatsApp 2 (Cadangan):* ${teleponAltInput} (${teleponAlt})\n`;
                textMessage += `*Layanan:* Dengan Sopir + BBM\n`;
            }
            textMessage += `*Unit Mobil:* ${mobil}\n`;
            if (wisataVal) {
                textMessage += `*Paket Wisata:* ${wisataVal}\n`;
                const sewaKustomRuteEl = document.getElementById('sewaKustomRute');
                const kustomRuteVal = sewaKustomRuteEl ? sewaKustomRuteEl.value.trim() : '';
                if (wisataVal === 'Kustom Rute' && kustomRuteVal) {
                    textMessage += `*Rute Kustom Wisata:* ${kustomRuteVal}\n`;
                }
                
                const chkJeepMerapi = document.getElementById('addonJeepMerapi');
                const chkJeepGumuk = document.getElementById('addonJeepGumuk');
                const chkVWBorobudur = document.getElementById('addonVWBorobudur');
                let addonTextList = [];
                if (chkJeepMerapi && chkJeepMerapi.checked) addonTextList.push("Sewa Jeep Lava Tour Merapi (+Rp 350.000)");
                if (chkJeepGumuk && chkJeepGumuk.checked) addonTextList.push("Sewa Jeep Gumuk Pasir Parangtritis (+Rp 350.000)");
                if (chkVWBorobudur && chkVWBorobudur.checked) addonTextList.push("Sewa VW Safari Borobudur (+Rp 650.000)");
                if (addonTextList.length > 0) {
                    textMessage += `*Layanan Tambahan Tiket:* ${addonTextList.join(', ')}\n`;
                }
            }
            textMessage += `*Rencana Wilayah Pemakaian:* ${tujuan}\n`;
            
            if (isLepasKunci) {
                const waPJInput = document.getElementById('sewaWaPJ').value.trim();
                const waPJ = formatWhatsAppNumber(waPJInput);
                const paketText = selectPaket.options[selectPaket.selectedIndex].textContent;
                const alamatAntar = document.getElementById('sewaPengantaranAlamat').value.trim();
                const alamatJemput = document.getElementById('sewaPengambilanAlamat').value.trim();
                const antarYia = document.getElementById('chkAntarYIA') && document.getElementById('chkAntarYIA').checked;
                const jemputYia = document.getElementById('chkJemputYIA') && document.getElementById('chkJemputYIA').checked;
                const biayaTambahan = parseFloat(document.getElementById('sewaBiayaTambahan').value) || 0;

                textMessage += `*No. WA Penanggung Jawab:* ${waPJInput} (${waPJ})\n`;
                textMessage += `*Paket Dipilih:* ${paketText}\n`;
                textMessage += `*Alamat Pengantaran Unit:* ${alamatAntar}\n`;
                if (antarYia) textMessage += `  (Layanan Penjemputan di Bandara YIA: Ya)\n`;
                textMessage += `*Alamat Pengembalian Unit:* ${alamatJemput}\n`;
                if (jemputYia) textMessage += `  (Layanan Pengembalian di Bandara YIA: Ya)\n`;
                if (biayaTambahan > 0) textMessage += `*Biaya Tambahan Lain/Luar Kota:* ${formatRupiah(biayaTambahan)}\n`;
            } else {
                const paketText = selectPaket.options[selectPaket.selectedIndex].textContent;
                const lokasiPenjemputan = document.getElementById('sewaPengantaranAlamat').value.trim();
                const biayaTambahan = parseFloat(document.getElementById('sewaBiayaTambahan').value) || 0;

                textMessage += `*Pelayanan:* ${paketText}\n`;
                textMessage += `*Lokasi Penjemputan:* ${lokasiPenjemputan}\n`;
                if (biayaTambahan > 0) textMessage += `*Biaya Tambahan Lain/Luar Kota:* ${formatRupiah(biayaTambahan)}\n`;
            }

            if (isLepasKunci) {
                textMessage += `*Jadwal Antar:* ${formatDateString(tanggalMulai)} jam ${jamAntar}\n`;
                textMessage += `*Jadwal Kembali:* ${formatDateString(tanggalSelesai)} jam ${jamKembali}\n`;
            } else {
                textMessage += `*Jadwal Penjemputan:* ${formatDateString(tanggalMulai)} jam ${jamAntar}\n`;
                textMessage += `*Jadwal Selesai:* ${formatDateString(tanggalSelesai)} jam ${jamKembali}\n`;
            }
            textMessage += `*Durasi Sewa:* ${calcDurasi}\n\n`;

            textMessage += `-------------------------------------------\n`;
            textMessage += `*Rincian Biaya:*\n`;
            textMessage += `*Total Biaya:* ${calcTotal}\n`;
            if (wisataVal) {
                textMessage += `  (Pilihan Rute: ${wisataVal})\n`;
            }
            const chkJeepMerapi = document.getElementById('addonJeepMerapi');
            const chkJeepGumuk = document.getElementById('addonJeepGumuk');
            const chkVWBorobudur = document.getElementById('addonVWBorobudur');
            let wisataAddonsFee = 0;
            if (chkJeepMerapi && chkJeepMerapi.checked) wisataAddonsFee += 350000;
            if (chkJeepGumuk && chkJeepGumuk.checked) wisataAddonsFee += 350000;
            if (chkVWBorobudur && chkVWBorobudur.checked) wisataAddonsFee += 650000;
            if (wisataAddonsFee > 0) {
                textMessage += `  (Tiket Aktivitas Jeep/VW: ${formatRupiah(wisataAddonsFee)})\n`;
            }
            textMessage += `*DP Tanda Jadi (30%):* ${calcDP}\n\n`;

            if (catatan) {
                textMessage += `*Catatan:* ${catatan}\n`;
            }

            if (isLepasKunci) {
                textMessage += `-------------------------------------------\n`;
                textMessage += `*Dokumen Persyaratan (Saya setuju untuk mengirim foto KTP/SIM berikut):*\n`;
                textMessage += `✓ Foto 2 KTP asli penyewa & penanggung jawab\n`;
                textMessage += `✓ Foto SIM A aktif\n`;
                textMessage += `✓ ID pendukung (KK / KTM)\n`;
                textMessage += `✓ Tiket PP pesawat / kereta Jogja\n`;
                textMessage += `✓ Voucher hotel / penginapan\n`;
                textMessage += `\n*Notice Ketentuan Pembayaran:*\n`;
                textMessage += `- Pembayaran DP 30% dilakukan setelah pesanan di-acc oleh admin sebagai tanda jadi.\n`;
                textMessage += `- Nomor rekening pembayaran resmi akan dikirimkan langsung oleh nomor admin resmi.\n`;
                textMessage += `- Pelunasan sewa dilakukan pada saat serah terima / penyerahan kunci kendaraan.\n`;
            } else {
                textMessage += `-------------------------------------------\n`;
                textMessage += `*Notice Ketentuan Pembayaran:*\n`;
                textMessage += `- Pembayaran DP 30% dilakukan setelah pesanan di-acc oleh admin sebagai tanda jadi.\n`;
                textMessage += `- Nomor rekening pembayaran resmi akan dikirimkan langsung oleh nomor admin resmi.\n`;
                textMessage += `- Pelunasan sewa dilakukan setelah pelayanan hari terakhir selesai atau setelah Anda menerima invoice resmi.\n`;
            }

            textMessage += `\n-------------------------------------------\n`;
            textMessage += `Mohon konfirmasi ketersediaan unit dan kelanjutan booking. Terima kasih!`;

            // Set loading state on submit button
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Proses Pemesanan via WhatsApp';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin" style="width:16px; height:16px; margin-right:8px; border:2px solid white; border-top:2px solid transparent; border-radius:50%; display:inline-block; vertical-align:middle; animation: spin 1s linear infinite;" viewBox="0 0 24 24">
                        <style>
                            @keyframes spin { 100% { transform: rotate(360deg); } }
                        </style>
                    </svg>
                    Memproses Pemesanan...
                `;
            }

            setTimeout(() => {
                // Redirect to WhatsApp
                const adminWA = '6281234567890';
                const encodedText = encodeURIComponent(textMessage);
                window.open(`https://wa.me/${adminWA}?text=${encodedText}`, '_blank');
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }, 800);
        });
    }

    function formatDateString(dateStr) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        
        const year = parts[0];
        const monthIndex = parseInt(parts[1]) - 1;
        const day = parts[2];

        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        return `${day} ${months[monthIndex]} ${year}`;
    }

    // ==========================================================================
    // 8. HOME HERO WIDGET & HOMEPAGE LOGIC (index.html & mobil.html integration)
    // ==========================================================================
    
    // 8a. Date Picker & Duration Auto-calculation for Homepage
    const heroTanggal = document.getElementById('heroTanggal');
    const heroTanggalSelesai = document.getElementById('heroTanggalSelesai');
    const heroDurasi = document.getElementById('heroDurasi');

    if (heroTanggal && heroTanggalSelesai && heroDurasi) {
        const today = new Date();
        
        const formatLocal = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Set default dates if empty
        if (!heroTanggal.value) {
            heroTanggal.value = formatLocal(today);
        }
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (!heroTanggalSelesai.value) {
            heroTanggalSelesai.value = formatLocal(tomorrow);
        }

        // Set minimum dates
        heroTanggal.min = formatLocal(today);
        heroTanggalSelesai.min = heroTanggal.value;

        const updateDurasi = () => {
            const startVal = heroTanggal.value;
            const endVal = heroTanggalSelesai.value;
            if (!startVal || !endVal) return;
            
            const start = new Date(startVal);
            const end = new Date(endVal);
            
            if (end < start) {
                heroTanggalSelesai.value = startVal;
            }
            
            const timeDiff = new Date(heroTanggalSelesai.value) - new Date(startVal);
            const days = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
            heroDurasi.value = `${days} Hari`;
            
            // Dynamic min limit for end date
            heroTanggalSelesai.min = startVal;
        };

        heroTanggal.addEventListener('change', () => {
            const start = new Date(heroTanggal.value);
            const end = new Date(heroTanggalSelesai.value);
            if (end < start) {
                const newEnd = new Date(start);
                newEnd.setDate(newEnd.getDate() + 1);
                heroTanggalSelesai.value = formatLocal(newEnd);
            }
            updateDurasi();
        });
        
        heroTanggalSelesai.addEventListener('change', updateDurasi);
        updateDurasi();
    }

    // 8b. Submit and Redirect logic for Homepage Widget
    const heroBookingForm = document.getElementById('heroBookingForm');
    if (heroBookingForm) {
        heroBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const supirVal = document.getElementById('heroSupir').value; // 'lepas-kunci' or 'dengan-sopir'
            const tanggalVal = heroTanggal ? heroTanggal.value : '';
            const tanggalSelesaiVal = heroTanggalSelesai ? heroTanggalSelesai.value : '';
            const durasiValText = heroDurasi ? heroDurasi.value : '1 Hari';
            const durasiVal = parseInt(durasiValText) || 1;
            
            // Map supir value to target service catalog tab
            const serviceParam = supirVal === 'lepas-kunci' ? 'lepasKunci' : 'denganSopir';
            
            const targetUrl = `mobil.html?service=${serviceParam}&tanggal=${encodeURIComponent(tanggalVal)}&tanggalSelesai=${encodeURIComponent(tanggalSelesaiVal)}&durasi=${durasiVal}`;
            window.location.href = targetUrl;
        });
    }

    // 8c. Catalog page (mobil.html) query parameters logic
    if (window.location.pathname.includes('mobil.html') || document.querySelector('.service-tabs-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const tanggalParam = urlParams.get('tanggal');
        const tanggalSelesaiParam = urlParams.get('tanggalSelesai');
        const durasiParam = urlParams.get('durasi');
        const wisataParam = urlParams.get('wisata');
        const ruteParam = urlParams.get('rute');
        
        // Auto select tab
        if (serviceParam) {
            const targetTab = document.querySelector(`.service-tab[data-service="${serviceParam}"]`);
            if (targetTab) {
                // Wait briefly for elements to be fully ready
                setTimeout(() => {
                    targetTab.click();
                }, 100);
            }
        }
        
        // Propagate dates, wisata, and rute parameters to all booking buttons
        if (tanggalParam || tanggalSelesaiParam || durasiParam || wisataParam || ruteParam) {
            const updateButtonHrefs = () => {
                const bookingBtns = document.querySelectorAll('.car-card .car-pricing-footer a.btn');
                bookingBtns.forEach(btn => {
                    const currentHref = btn.getAttribute('href');
                    if (currentHref) {
                        try {
                            const urlObj = new URL(currentHref, window.location.origin);
                            if (tanggalParam) urlObj.searchParams.set('tanggal', tanggalParam);
                            if (tanggalSelesaiParam) urlObj.searchParams.set('tanggalSelesai', tanggalSelesaiParam);
                            if (durasiParam) urlObj.searchParams.set('durasi', durasiParam);
                            if (wisataParam) urlObj.searchParams.set('wisata', wisataParam);
                            if (ruteParam) urlObj.searchParams.set('rute', ruteParam);
                            if (wisataParam) {
                                urlObj.pathname = urlObj.pathname.replace('kontak.html', 'pesan-wisata.html').replace('pesan-sopir.html', 'pesan-wisata.html');
                            }
                            btn.setAttribute('href', urlObj.pathname + urlObj.search);
                        } catch (err) {
                            let newHref = currentHref;
                            if (wisataParam) {
                                newHref = newHref.replace('kontak.html', 'pesan-wisata.html').replace('pesan-sopir.html', 'pesan-wisata.html');
                            }
                            if (tanggalParam && !newHref.includes('tanggal=')) newHref += `&tanggal=${encodeURIComponent(tanggalParam)}`;
                            if (tanggalSelesaiParam && !newHref.includes('tanggalSelesai=')) newHref += `&tanggalSelesai=${encodeURIComponent(tanggalSelesaiParam)}`;
                            if (durasiParam && !newHref.includes('durasi=')) newHref += `&durasi=${encodeURIComponent(durasiParam)}`;
                            if (wisataParam && !newHref.includes('wisata=')) newHref += `&wisata=${encodeURIComponent(wisataParam)}`;
                            if (ruteParam && !newHref.includes('rute=')) newHref += `&rute=${encodeURIComponent(ruteParam)}`;
                            btn.setAttribute('href', newHref);
                        }
                    }
                });
            };
            
            // Run initially
            setTimeout(updateButtonHrefs, 150);
            
            // Run again on tab changes (since cards display states change, or if rates are clicked)
            const serviceTabs = document.querySelectorAll('.service-tab');
            serviceTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    setTimeout(updateButtonHrefs, 50);
                });
            });

            // Also intercept the rate selection click to append dates
            const rateItems = document.querySelectorAll('.rate-item');
            rateItems.forEach(item => {
                item.addEventListener('click', () => {
                    setTimeout(updateButtonHrefs, 10);
                });
            });
        }
    }

    // 8d. Dynamic Popular Car Prices Synchronizer (index.html)
    const syncPopularCarPrices = () => {
        const popularCards = document.querySelectorAll('.fleet-section .car-card');
        if (popularCards.length === 0) return;

        popularCards.forEach(card => {
            const carNameEl = card.querySelector('.car-name');
            if (!carNameEl) return;
            const name = carNameEl.textContent.trim();
            
            let dbName = '';
            let service = '';
            let rateKey = '';
            let suffix = ' / 12 jam';
            
            if (name === 'Honda Brio') {
                dbName = 'Honda Brio Matic';
                service = 'lepas-kunci';
                rateKey = '12-Jam-Weekday';
                suffix = ' / 12 jam';
            } else if (name === 'Toyota Avanza') {
                dbName = 'Avanza Facelift Matic';
                service = 'lepas-kunci';
                rateKey = '12-Jam-Weekday';
                suffix = ' / 12 jam';
            } else if (name === 'Wuling Binguo EV') {
                dbName = 'Wuling Binguo EV';
                service = 'lepas-kunci';
                rateKey = 'Fullday-(Weekday/Weekend)';
                suffix = ' / fullday';
            } else if (name === 'Toyota Hiace Premio') {
                dbName = 'Toyota Hiace Premio (Sopir)';
                service = 'dengan-sopir';
                rateKey = '12-Jam';
                suffix = ' / 12 jam';
            }
            
            if (dbName && carRates[service] && carRates[service][dbName]) {
                const price = carRates[service][dbName][rateKey];
                const priceValEl = card.querySelector('.price-val');
                if (priceValEl) {
                    priceValEl.innerHTML = `${formatRupiah(price)} <span>${suffix}</span>`;
                }
                
                // Update booking link to point to kontak.html / pesan-sopir.html with specific supir/car/paket values
                const btn = card.querySelector('.car-pricing-footer a.btn');
                if (btn) {
                    const targetPage = service === 'dengan-sopir' ? 'pesan-sopir.html' : 'kontak.html';
                    btn.setAttribute('href', `${targetPage}?supir=${service}&mobil=${encodeURIComponent(dbName)}&paket=${encodeURIComponent(rateKey)}&harga=${price}`);
                }
            }
        });
    };

    // Run price synchronizer on DOMContentLoaded
    syncPopularCarPrices();

    // ==========================================================================
    // 9. MAP PICKER MODAL LOGIC (kontak.html)
    // ==========================================================================
    const mapPicker = {
        map: null,
        marker: null,
        selectedLat: null,
        selectedLng: null,
        selectedAddress: '',
        targetInputId: '',
        
        loadAssets: function(callback) {
            if (window.L) {
                callback();
                return;
            }
            
            // Load Leaflet CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
            
            // Load Leaflet JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = callback;
            document.head.appendChild(script);
        },
        
        open: function(targetInputId) {
            this.targetInputId = targetInputId;
            const modal = document.getElementById('mapPickerModal');
            if (modal) {
                modal.style.display = 'flex';
            }
            
            const addressText = document.getElementById('selectedAddressText');
            const confirmBtn = document.getElementById('confirmMapPickerBtn');
            const searchInput = document.getElementById('mapSearchInput');
            
            if (addressText) {
                addressText.textContent = "Silakan klik pada peta atau cari lokasi di atas...";
            }
            if (confirmBtn) {
                confirmBtn.disabled = true;
                confirmBtn.style.background = "#94a3b8";
                confirmBtn.style.cursor = "not-allowed";
            }
            if (searchInput) {
                searchInput.value = '';
            }
            
            this.selectedAddress = '';
            this.selectedLat = null;
            this.selectedLng = null;
            
            this.loadAssets(() => {
                this.initMap();
            });
        },
        
        initMap: function() {
            if (this.map) {
                const defaultCenter = [-7.7956, 110.3695]; // Yogyakarta
                this.map.setView(defaultCenter, 13);
                if (this.marker) {
                    this.marker.setLatLng(defaultCenter);
                }
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 100);
                return;
            }
            
            // Default center: Yogyakarta (Tugu / Malioboro area)
            const defaultCenter = [-7.7956, 110.3695];
            
            this.map = L.map('leafletMap').setView(defaultCenter, 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);
            
            // Use custom SVG marker to avoid 404 image errors in Leaflet
            const markerIcon = L.divIcon({
                html: `<div style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d97706" width="30" height="30" stroke="#ffffff" stroke-width="1.5">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                       </div>`,
                className: 'custom-map-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });
            
            this.marker = L.marker(defaultCenter, { icon: markerIcon, draggable: true }).addTo(this.map);
            
            // Map Click event
            this.map.on('click', (e) => {
                const lat = e.latlng.lat;
                const lng = e.latlng.lng;
                this.updateMarkerPosition(lat, lng);
            });
            
            // Marker drag event
            this.marker.on('dragend', () => {
                const position = this.marker.getLatLng();
                this.updateMarkerPosition(position.lat, position.lng);
            });
        },
        
        updateMarkerPosition: function(lat, lng) {
            this.selectedLat = lat.toFixed(6);
            this.selectedLng = lng.toFixed(6);
            this.marker.setLatLng([lat, lng]);
            
            const addressText = document.getElementById('selectedAddressText');
            const confirmBtn = document.getElementById('confirmMapPickerBtn');
            
            if (addressText) {
                addressText.textContent = "Mencari alamat...";
            }
            if (confirmBtn) {
                confirmBtn.disabled = true;
                confirmBtn.style.background = "#94a3b8";
                confirmBtn.style.cursor = "not-allowed";
            }
            
            // Reverse Geocoding via Nominatim
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
                headers: {
                    'Accept-Language': 'id',
                    'User-Agent': 'AksaraTransportMapPicker/1.0'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    this.selectedAddress = data.display_name;
                    if (addressText) {
                        addressText.textContent = this.selectedAddress;
                    }
                    if (confirmBtn) {
                        confirmBtn.disabled = false;
                        confirmBtn.style.background = "var(--accent)";
                        confirmBtn.style.cursor = "pointer";
                    }
                } else {
                    this.selectedAddress = `Koordinat: ${this.selectedLat}, ${this.selectedLng}`;
                    if (addressText) {
                        addressText.textContent = this.selectedAddress;
                    }
                    if (confirmBtn) {
                        confirmBtn.disabled = false;
                        confirmBtn.style.background = "var(--accent)";
                        confirmBtn.style.cursor = "pointer";
                    }
                }
            })
            .catch(err => {
                console.error(err);
                this.selectedAddress = `Koordinat: ${this.selectedLat}, ${this.selectedLng}`;
                if (addressText) {
                    addressText.textContent = this.selectedAddress;
                }
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.style.background = "var(--accent)";
                    confirmBtn.style.cursor = "pointer";
                }
            });
        },
        
        search: function() {
            const query = document.getElementById('mapSearchInput').value.trim();
            if (!query) return;
            
            const addressText = document.getElementById('selectedAddressText');
            if (addressText) {
                addressText.textContent = "Mencari lokasi...";
            }
            
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
                headers: {
                    'Accept-Language': 'id',
                    'User-Agent': 'AksaraTransportMapPicker/1.0'
                }
            })
            .then(response => response.json())
            .then(results => {
                if (results && results.length > 0) {
                    const lat = parseFloat(results[0].lat);
                    const lng = parseFloat(results[0].lon);
                    this.map.setView([lat, lng], 16);
                    this.updateMarkerPosition(lat, lng);
                } else {
                    if (addressText) {
                        addressText.textContent = "Lokasi tidak ditemukan. Coba ketik nama jalan, gedung, atau daerah yang lebih spesifik.";
                    }
                }
            })
            .catch(err => {
                console.error(err);
                if (addressText) {
                    addressText.textContent = "Terjadi kesalahan saat mencari lokasi.";
                }
            });
        },
        
        confirm: function() {
            const targetInput = document.getElementById(this.targetInputId);
            if (targetInput && this.selectedAddress) {
                const cleanAddress = this.selectedAddress;
                const coordsUrl = `https://www.google.com/maps?q=${this.selectedLat},${this.selectedLng}`;
                targetInput.value = `${cleanAddress}\nLink Maps: ${coordsUrl}`;
                
                targetInput.dispatchEvent(new Event('input'));
                targetInput.dispatchEvent(new Event('change'));
            }
            this.close();
        },
        
        close: function() {
            const modal = document.getElementById('mapPickerModal');
            if (modal) {
                modal.style.display = 'none';
            }
        }
    };

    // Bind UI Elements for Map Picker Modal
    const btnMapAntar = document.getElementById('btnMapAntar');
    const btnMapJemput = document.getElementById('btnMapJemput');
    const closeMapPickerBtn = document.getElementById('closeMapPickerBtn');
    const cancelMapPickerBtn = document.getElementById('cancelMapPickerBtn');
    const confirmMapPickerBtn = document.getElementById('confirmMapPickerBtn');
    const mapSearchBtn = document.getElementById('mapSearchBtn');
    const mapSearchInput = document.getElementById('mapSearchInput');

    if (btnMapAntar) {
        btnMapAntar.addEventListener('click', (e) => {
            e.preventDefault();
            mapPicker.open('sewaPengantaranAlamat');
        });
    }

    if (btnMapJemput) {
        btnMapJemput.addEventListener('click', (e) => {
            e.preventDefault();
            mapPicker.open('sewaPengambilanAlamat');
        });
    }

    if (closeMapPickerBtn) {
        closeMapPickerBtn.addEventListener('click', () => mapPicker.close());
    }
    if (cancelMapPickerBtn) {
        cancelMapPickerBtn.addEventListener('click', () => mapPicker.close());
    }
    if (confirmMapPickerBtn) {
        confirmMapPickerBtn.addEventListener('click', () => mapPicker.confirm());
    }
    if (mapSearchBtn) {
        mapSearchBtn.addEventListener('click', () => mapPicker.search());
    }
    if (mapSearchInput) {
        mapSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                mapPicker.search();
            }
        });
    }
});

