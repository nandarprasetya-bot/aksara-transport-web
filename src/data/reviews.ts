export interface ReviewItem {
    id: string;
    author: string;
    city: string;
    role: string;
    avatarColor: string;
    rating: number;
    date: string;
    isoDate: string;
    serviceTag: string;
    serviceCategory: 'lepas-kunci' | 'dengan-driver' | 'hiace' | 'vvip' | 'wisata';
    carFleet: string;
    routeWisata?: string;
    comment: string;
    photos?: {
        url: string;
        caption: string;
    }[];
    likes: number;
    ownerResponse?: {
        date: string;
        text: string;
    };
}

export const initialReviewsData: ReviewItem[] = [
    {
        id: 'rev-1',
        author: 'Budi Santoso',
        city: 'Jakarta',
        role: 'Local Guide • Level 6 • 48 ulasan',
        avatarColor: '#1a73e8',
        rating: 5,
        date: '2 hari lalu',
        isoDate: '2026-11-20',
        serviceTag: 'LEPAS KUNCI',
        serviceCategory: 'lepas-kunci',
        carFleet: 'Honda Brio Satya E Matic',
        routeWisata: 'Stasiun Tugu, Malioboro, Tumpeng Menoreh',
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
        city: 'Surabaya',
        role: 'Local Guide • Level 5 • 34 ulasan',
        avatarColor: '#e37400',
        rating: 5,
        date: '5 hari lalu',
        isoDate: '2026-11-17',
        serviceTag: 'DENGAN DRIVER',
        serviceCategory: 'dengan-driver',
        carFleet: 'New Toyota Avanza Facelift',
        routeWisata: 'Pantai Timang, HeHa Sky View Gunungkidul',
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
        city: 'Bandung',
        role: 'PT Megah Nusantara (Bandung) • 12 ulasan',
        avatarColor: '#5c6bc0',
        rating: 5,
        date: '1 minggu lalu',
        isoDate: '2026-11-15',
        serviceTag: 'PERJALANAN DINAS',
        serviceCategory: 'dengan-driver',
        carFleet: 'Toyota Innova Zenix Hybrid',
        routeWisata: 'Kunjungan Kerja Dinas & Hotel Tentrem',
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
        city: 'Tangerang',
        role: 'Local Guide • Level 7 • 89 ulasan',
        avatarColor: '#00897b',
        rating: 5,
        date: '1 minggu lalu',
        isoDate: '2026-11-14',
        serviceTag: 'ROMBONGAN WISATA',
        serviceCategory: 'hiace',
        carFleet: 'Toyota Hiace Premio Luxury',
        routeWisata: 'Candi Prambanan, Lava Tour Merapi, Tebing Breksi',
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
        city: 'Semarang',
        role: 'Dokter Spesialis • Semarang • 19 ulasan',
        avatarColor: '#7b1fa2',
        rating: 5,
        date: '2 minggu lalu',
        isoDate: '2026-11-08',
        serviceTag: 'LAYANAN VVIP',
        serviceCategory: 'vvip',
        carFleet: 'Toyota Alphard Facelift VIP',
        routeWisata: 'Bandara YIA, Simposium Kedokteran UGM',
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
        city: 'Medan',
        role: 'Medan • 8 ulasan',
        avatarColor: '#2e7d32',
        rating: 5,
        date: '2 minggu lalu',
        isoDate: '2026-11-06',
        serviceTag: 'DROP OFF BANDARA',
        serviceCategory: 'dengan-driver',
        carFleet: 'Toyota Innova Reborn Diesel',
        routeWisata: 'Kota Jogja ke Bandara YIA Subuh',
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
        city: 'Surabaya',
        role: 'Local Guide • Level 4 • 26 ulasan',
        avatarColor: '#c2185b',
        rating: 5,
        date: '3 minggu lalu',
        isoDate: '2026-11-01',
        serviceTag: 'PAKET WISATA',
        serviceCategory: 'wisata',
        carFleet: 'Toyota Fortuner VRZ',
        routeWisata: 'Borobudur Sunrise, Bukit Rhema Gereja Ayam',
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
        city: 'Jakarta',
        role: 'Solo Traveler • Jakarta • 15 ulasan',
        avatarColor: '#0288d1',
        rating: 5,
        date: '1 bulan lalu',
        isoDate: '2026-10-25',
        serviceTag: 'LEPAS KUNCI',
        serviceCategory: 'lepas-kunci',
        carFleet: 'Honda Brio Matic',
        routeWisata: 'Hutan Pinus Mangunan, Pantai Parangtritis',
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
        city: 'Bekasi',
        role: 'Arisan Alumni • Bekasi • 14 ulasan',
        avatarColor: '#f57c00',
        rating: 5,
        date: '1 bulan lalu',
        isoDate: '2026-10-18',
        serviceTag: 'ROMBONGAN WISATA',
        serviceCategory: 'hiace',
        carFleet: 'Toyota Hiace Commuter 15 Seat',
        routeWisata: 'Goa Pindul, Pantai Drini, Sate Klatak Pak Pong',
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
        city: 'Pekanbaru',
        role: 'Local Guide • Level 5 • 41 ulasan',
        avatarColor: '#388e3c',
        rating: 5,
        date: '1 bulan lalu',
        isoDate: '2026-10-10',
        serviceTag: 'LIBURAN KELUARGA',
        serviceCategory: 'dengan-driver',
        carFleet: 'Toyota Avanza FWD Matic',
        routeWisata: 'Kaliurang, Keraton Yogyakarta, Sentra Gudeg Wijilan',
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
