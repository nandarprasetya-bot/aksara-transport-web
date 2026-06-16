export type KeywordData = {
  slug: string;
  type: 'car' | 'general';
  title: string;
  carName?: string;
  price12?: number;
  price24?: number;
  priceWithDriver?: number;
  priceAllIn?: number;
  benefits?: string[];
  imageUrl?: string;
};

export const seoKeywords: KeywordData[] = [
  {
    slug: 'sewa-brio-jogja',
    type: 'car',
    title: 'Sewa Brio Jogja',
    carName: 'Honda Brio',
    price12: 250000,
    price24: 300000,
    priceWithDriver: 400000,
    priceAllIn: 550000,
    benefits: [
      'Sangat irit bahan bakar, cocok untuk keliling kota Jogja.',
      'Bentuk compact dan lincah, mudah parkir di area Malioboro atau jalanan sempit.',
      'AC dingin maksimal dengan kabin yang cukup lega untuk 4-5 penumpang.'
    ],
    imageUrl: '/images/honda_brio.webp'
  },
  {
    slug: 'sewa-avanza-jogja',
    type: 'car',
    title: 'Sewa Avanza Jogja',
    carName: 'Toyota Avanza',
    price12: 250000,
    price24: 350000,
    priceWithDriver: 450000,
    priceAllIn: 600000,
    benefits: [
      'Kapasitas 7 penumpang, pilihan terbaik untuk liburan rombongan keluarga kecil.',
      'Suspensi tangguh dan mesin handal untuk rute menanjak seperti ke Gunungkidul.',
      'Ruang bagasi luas untuk menaruh koper atau barang belanjaan oleh-oleh.'
    ],
    imageUrl: '/images/toyota_avanza.webp'
  },
  {
    slug: 'sewa-inova-reborn-jogja',
    type: 'car',
    title: 'Sewa Inova Reborn Jogja',
    carName: 'Toyota Innova Reborn',
    price12: 400000,
    price24: 500000,
    priceWithDriver: 600000,
    priceAllIn: 800000,
    benefits: [
      'Kenyamanan kelas premium dengan suspensi empuk dan kabin super kedap.',
      'Cocok untuk tamu VIP, perjalanan dinas, atau keluarga yang mencari kenyamanan ekstra.',
      'Mesin bertenaga besar, melibas semua medan wisata di Yogyakarta dengan mudah.'
    ],
    imageUrl: '/images/toyota_innova.webp'
  },
  {
    slug: 'sewa-inova-zenix-jogja',
    type: 'car',
    title: 'Sewa Inova Zenix Jogja',
    carName: 'Toyota Innova Zenix',
    priceWithDriver: 1000000,
    priceAllIn: 1200000,
    benefits: [
      'Generasi terbaru dari Innova dengan teknologi hybrid yang canggih dan senyap.',
      'Interior mewah dengan fitur hiburan lengkap untuk perjalanan jarak jauh.',
      'Harga sewa mulai 1 jutaan untuk fullday dengan kenyamanan setara kelas VIP.'
    ],
    imageUrl: '/images/toyota_innova_zenix.webp'
  },
  {
    slug: 'sewa-alphard-facelift-jogja',
    type: 'car',
    title: 'Sewa Alphard Facelift Jogja',
    carName: 'Toyota Alphard Facelift',
    priceWithDriver: 2000000,
    priceAllIn: 2500000,
    benefits: [
      'Mobil MPV termewah di kelasnya, garansi prestise dan kenyamanan mutlak.',
      'Kursi Captain Seat VIP yang memanjakan penumpang selama di perjalanan.',
      'Harga sewa mulai 2 jutaan, standar pelayanan VVIP dan Pejabat Negara.'
    ],
    imageUrl: '/images/toyota_alphard.webp'
  },
  {
    slug: 'sewa-hiace-commuter-jogja',
    type: 'car',
    title: 'Sewa Hiace Commuter Jogja',
    carName: 'Toyota Hiace Commuter',
    priceWithDriver: 1000000,
    priceAllIn: 1200000,
    benefits: [
      'Kapasitas raksasa hingga 15 penumpang, harga super hemat mulai 1 jutaan.',
      'Plafon kabin tinggi, penumpang bisa berdiri dan bergerak leluasa di dalam mobil.',
      'Sangat cocok untuk rombongan wisata keluarga besar atau ziarah.'
    ],
    imageUrl: '/images/toyota_hiace_premio.webp'
  },
  {
    slug: 'sewa-hiace-premio-jogja',
    type: 'car',
    title: 'Sewa Hiace Premio Jogja',
    carName: 'Toyota Hiace Premio',
    priceAllIn: 1400000,
    benefits: [
      'Sangat ekonomis! Mulai dari 100rb/pack (per penumpang) untuk kapasitas 14 seat.',
      'Harga sudah ALL IN (Termasuk Mobil, Driver Profesional, dan BBM).',
      'Desain kabin mewah dan eksklusif, jauh lebih nyaman untuk perjalanan jauh.'
    ],
    imageUrl: '/images/toyota_hiace_premio.webp'
  },
  {
    slug: 'sewa-alphard-hev-jogja',
    type: 'car',
    title: 'Sewa Alphard HEV Jogja',
    carName: 'Toyota Alphard HEV (Hybrid)',
    priceWithDriver: 3000000,
    priceAllIn: 3500000,
    benefits: [
      'Varian tertinggi Alphard dengan teknologi Hybrid Electric Vehicle (HEV) super senyap.',
      'Harga sewa mulai 3 jutaan dengan fasilitas paling eksklusif di kelasnya.',
      'Sempurna untuk acara kenegaraan, tamu VVIP, atau pernikahan mewah.'
    ],
    imageUrl: '/images/toyota_alphard.webp'
  },
  {
    slug: 'sewa-pajero-jogja',
    type: 'car',
    title: 'Sewa Pajero Jogja',
    carName: 'Mitsubishi Pajero Sport',
    priceWithDriver: 1500000,
    priceAllIn: 1700000,
    benefits: [
      'SUV tangguh yang siap melibas segala medan wisata ekstrem di Yogyakarta.',
      'Desain maskulin dan elegan, memberikan kesan gagah di jalan raya.',
      'Kabin lega dengan fitur keamanan tingkat tinggi untuk petualangan Anda.'
    ],
    imageUrl: '/images/toyota_fortuner.webp'
  },
  {
    slug: 'sewa-fortuner-jogja',
    type: 'car',
    title: 'Sewa Fortuner Jogja',
    carName: 'Toyota Fortuner',
    priceWithDriver: 1500000,
    priceAllIn: 1700000,
    benefits: [
      'Ketangguhan mesin diesel Toyota dipadukan dengan desain SUV mewah yang ikonik.',
      'Sangat nyaman untuk rute pegunungan seperti Gunungkidul dan Merapi.',
      'Ground clearance tinggi memastikan perjalanan aman melintasi segala cuaca.'
    ],
    imageUrl: '/images/toyota_fortuner.webp'
  },
  {
    slug: 'sewa-elf-jogja',
    type: 'car',
    title: 'Sewa Elf Jogja',
    carName: 'Isuzu Elf Long',
    price12: 1000000,
    price24: 1300000,
    priceWithDriver: 1400000,
    priceAllIn: 1600000,
    benefits: [
      'Microbus tangguh dengan kapasitas hingga 19 orang.',
      'Tarikan mesin diesel Isuzu yang kuat menanjak di perbukitan Jogja.',
      'Solusi transportasi massal paling efisien dan ekonomis untuk rombongan wisata.'
    ],
    imageUrl: '/images/tour_city.webp'
  },
  {
    slug: 'sewa-mobil-listrik-jogja',
    type: 'car',
    title: 'Sewa Mobil Listrik Jogja',
    carName: 'Wuling Binguo EV / Air EV',
    price12: 400000,
    price24: 550000,
    priceWithDriver: 650000,
    priceAllIn: 800000,
    benefits: [
      'Bebas polusi dan suara mesin senyap, sensasi berkendara masa depan.',
      'Biaya operasional sangat rendah karena tidak perlu membeli bensin mahal.',
      'Desain futuristik dan unik, pusat perhatian saat keliling kota Yogyakarta.'
    ],
    imageUrl: '/images/wuling_binguo.webp'
  },

  // --- GENERAL KEYWORDS (Samudra Biru / Niche) ---
  {
    slug: 'sewa-mobil-terdekat',
    type: 'general',
    title: 'Sewa Mobil Terdekat',
    benefits: [
      'Aksara Transport siap menjemput Anda di Stasiun Tugu, Bandara YIA, atau Hotel.',
      'Armada siap sedia 24 jam untuk kebutuhan mendesak.',
      'Layanan penjemputan cepat dan tepat waktu tanpa biaya tambahan.'
    ],
  },
  {
    slug: 'sewa-mobil-yogyakarta',
    type: 'general',
    title: 'Sewa Mobil Yogyakarta',
    benefits: [
      'Penyedia layanan transportasi nomor 1 yang paling dipercaya wisatawan Yogyakarta.',
      'Puluhan pilihan armada dari City Car, MPV Keluarga, hingga Minibus Rombongan.',
      'Fasilitas lengkap mulai dari asuransi, kebersihan ekstra, hingga air mineral gratis.'
    ],
  },
  {
    slug: 'sewa-mobil-murah',
    type: 'general',
    title: 'Sewa Mobil Murah',
    benefits: [
      'Jaminan harga terbaik se-Jogja tanpa mengorbankan kualitas dan kebersihan.',
      'Tidak ada biaya tersembunyi, semua transparan di awal transaksi.',
      'Diskon khusus untuk penyewaan di atas 3 hari atau mingguan.'
    ],
  },
  {
    slug: 'sewa-mobil-1-di-yogyakarta',
    type: 'general',
    title: 'Sewa Mobil #1 Di Yogyakarta',
    benefits: [
      'Reputasi bintang 5 dari ribuan pelanggan puas sejak bertahun-tahun.',
      'Armada selalu diregenerasi (usia mobil di bawah 4 tahun) demi kenyamanan.',
      'Tim customer service dan mekanik siaga 24 jam untuk ketenangan Anda.'
    ],
  },
  {
    slug: 'sewa-mobil-lepas-kunci-jogja-24-jam',
    type: 'general',
    title: 'Sewa Mobil Lepas Kunci Jogja 24 Jam',
    benefits: [
      'Fleksibilitas waktu sewa tanpa batasan jam operasional supir.',
      'Privasi penuh bersama keluarga atau teman tanpa campur tangan orang lain.',
      'Syarat mudah dan cepat diverifikasi, khusus untuk wisatawan berdokumen lengkap.'
    ],
  },
  {
    slug: 'rental-mobil-jogja-dekat-stasiun-tugu',
    type: 'general',
    title: 'Rental Mobil Jogja Dekat Stasiun Tugu',
    benefits: [
      'Turun dari kereta, mobil sudah menunggu Anda di pintu keluar Stasiun Tugu.',
      'Bebas ribet mencari transportasi lanjutan. Langsung mulai liburan Anda detik itu juga.',
      'Layanan antar jemput gratis di area stasiun utama Yogyakarta.'
    ],
  },
  {
    slug: 'sewa-mobil-keluarga-jogja-murah',
    type: 'general',
    title: 'Sewa Mobil Keluarga Jogja Murah',
    benefits: [
      'Pilihan MPV lega seperti Avanza, Innova, dan Xpander untuk kenyamanan ekstra keluarga.',
      'Child-friendly. Kabin dibersihkan dari debu dan bakteri sebelum diserahkan.',
      'Kapasitas bagasi yang lapang memastikan barang bawaan keluarga aman terbawa semua.'
    ],
  },
  {
    slug: 'rekomendasi-sewa-mobil-jogja-terbaik',
    type: 'general',
    title: 'Rekomendasi Sewa Mobil Jogja Terbaik',
    benefits: [
      'Di-review positif oleh ribuan wisatawan di Google dan berbagai platform travel.',
      'Pelayanan standar hotel bintang 5: Supir berpakaian rapi, wangi, dan mobil super bersih.',
      'Unit terbaru. Kami menjamin Anda tidak akan mendapat mobil mogok atau AC panas.'
    ],
  },
  {
    slug: 'sewa-mobil-jogja-bisa-keluar-kota',
    type: 'general',
    title: 'Sewa Mobil Jogja Bisa Keluar Kota',
    benefits: [
      'Tidak ada batasan wilayah di dalam provinsi. Bebas jelajah pantai, gunung, dan kota.',
      'Izin resmi untuk perjalanan ke luar provinsi (seperti ke Solo, Semarang, Dieng) dengan syarat tertentu.',
      'Mesin terawat dengan baik, sehingga sangat tangguh dan aman untuk perjalanan jauh antar kota.'
    ],
  },
  {
    slug: 'harga-sewa-mobil-jogja-dengan-supir',
    type: 'general',
    title: 'Harga Sewa Mobil Jogja Dengan Supir',
    benefits: [
      'Supir profesional merangkap *tour guide* lokal yang hafal rute tercepat dan tempat makan enak.',
      'Bebas lelah nyetir dan terhindar dari pusing mencari tempat parkir di area wisata padat.',
      'Harga paket *All-In* yang sangat kompetitif, menghemat budget liburan Anda secara signifikan.'
    ],
  }
];

export function getKeywordData(slug: string): KeywordData | undefined {
  return seoKeywords.find(k => k.slug === slug);
}
