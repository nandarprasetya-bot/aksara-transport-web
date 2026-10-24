export type KeywordData = {
  slug: string;
  type: 'car' | 'general';
  title: string;
  carName?: string;
  price12?: number;
  price24?: number;
  fullday?: number;
  priceWithDriver?: number;
  priceAllIn?: number;
  benefits?: string[];
  imageUrl?: string;
  descriptionContent?: string[];
};

export const seoKeywords: KeywordData[] = [
  {
    slug: 'sewa-mobil-brio-jogja',
    type: 'car',
    title: 'Sewa Brio Jogja',
    carName: 'Honda Brio',
    price12: 275000,
    price24: 325000,
    fullday: 325000,
    priceAllIn: 550000,
    benefits: [
      'Sangat irit bahan bakar, cocok untuk keliling kota Jogja.',
      'Bentuk compact dan lincah, mudah parkir di area Malioboro atau jalanan sempit.',
      'AC dingin maksimal dengan kabin yang cukup lega untuk 4-5 penumpang.'
    ],
    imageUrl: '/images/honda_brio.webp',
    descriptionContent: [
      'Layanan <strong>sewa brio jogja</strong> adalah pilihan terfavorit bagi mahasiswa, pasangan, atau keluarga kecil yang menginginkan kendaraan lincah dan hemat bahan bakar. Jalanan Yogyakarta yang padat, terutama di sekitar kawasan wisata Malioboro dan gang-gang sempit perkotaan, akan lebih mudah ditaklukkan menggunakan Honda Brio yang memiliki ukuran kompak.',
      'Meskipun ukurannya mini, kabin Honda Brio cukup lega untuk menampung hingga 4-5 orang penumpang dengan barang bawaan ringan. Di Aksara Transport, seluruh armada Brio kami pastikan selalu dalam kondisi prima, wangi, bersih, dan AC dingin maksimal demi menunjang kenyamanan liburan Anda di Jogja.',
      'Pilihan rental lepas kunci 24 jam sangat fleksibel bagi Anda yang menginginkan privasi tinggi. Kami juga menawarkan opsi sewa dengan supir profesional yang siap memandu perjalanan wisata Anda dengan ramah.'
    ]
  },
  {
    slug: 'sewa-mobil-avanza-jogja',
    type: 'car',
    title: 'Sewa Avanza Jogja',
    carName: 'Toyota Avanza',
    price12: 300000,
    price24: 350000,
    fullday: 350000,
    priceAllIn: 600000,
    benefits: [
      'Kapasitas 7 penumpang, pilihan terbaik untuk liburan rombongan keluarga kecil.',
      'Suspensi tangguh dan mesin handal untuk rute menanjak seperti ke Gunungkidul.',
      'Ruang bagasi luas untuk menaruh koper atau barang belanjaan oleh-oleh.'
    ],
    imageUrl: '/images/toyota_avanza.webp',
    descriptionContent: [
      'Bagi Anda yang merencanakan liburan keluarga, memilih paket <strong>sewa avanza jogja</strong> adalah keputusan paling bijak dan ekonomis. Toyota Avanza dikenal sebagai "mobil sejuta umat" karena ketangguhan mesin dan kenyamanan suspensinya dalam melibas berbagai medan menanjak, seperti rute menuju kawasan wisata Gunungkidul, Kaliurang, atau Candi Borobudur.',
      'Armada Avanza kami memiliki kapasitas hingga 7 orang penumpang dengan bagasi belakang yang cukup luas untuk menaruh koper maupun oleh-oleh khas Yogyakarta. Aksara Transport menyediakan unit keluaran terbaru yang dirawat berkala di bengkel resmi guna menghindari risiko mogok atau masalah teknis di jalan.',
      'Tersedia tarif hemat harian baik lepas kunci maupun paket all-in dengan driver dan bbm yang akan membuat budget traveling keluarga Anda tetap aman dan efisien.'
    ]
  },
  {
    slug: 'sewa-mobil-inova-reborn-jogja',
    type: 'car',
    title: 'Sewa Inova Reborn Jogja',
    carName: 'Toyota Innova Reborn',
    fullday: 550000,
    priceWithDriver: 600000,
    priceAllIn: 800000,
    benefits: [
      'Kenyamanan kelas premium dengan suspensi empuk dan kabin super kedap.',
      'Cocok untuk tamu VIP, perjalanan dinas, atau keluarga yang mencari kenyamanan ekstra.',
      'Mesin bertenaga besar, melibas semua medan wisata di Yogyakarta dengan mudah.'
    ],
    imageUrl: '/images/innova_reborn.webp',
    descriptionContent: [
      'Dapatkan kenyamanan berkendara kelas premium untuk perjalanan bisnis maupun liburan keluarga dengan layanan <strong>sewa inova reborn jogja</strong>. Toyota Innova Reborn menawarkan ruang kabin yang sangat senyap, suspensi empuk kelas atas, serta performa mesin diesel yang bertenaga besar namun tetap hemat bahan bakar.',
      'Mobil MPV premium ini sangat direkomendasikan untuk menjamu tamu VIP, pejabat, atau keluarga besar yang mengutamakan kenyamanan selama menempuh rute jarak jauh di Yogyakarta. Aksara Transport menjamin kebersihan unit 100% steril sebelum diserahkan kepada penyewa.',
      'Kami menyediakan pilihan sewa Innova Reborn lengkap dengan driver profesional berpengalaman yang bersikap sopan, rapi, dan siap merangkap sebagai pemandu lokal perjalanan Anda.'
    ]
  },
  {
    slug: 'sewa-mobil-inova-zenix-jogja',
    type: 'car',
    title: 'Sewa Inova Zenix Jogja',
    carName: 'Toyota Innova Zenix',
    priceWithDriver: 1100000,
    benefits: [
      'Generasi terbaru dari Innova dengan teknologi hybrid yang canggih dan senyap.',
      'Interior mewah dengan fitur hiburan lengkap untuk perjalanan jarak jauh.',
      'Harga sewa mulai 1 jutaan untuk fullday dengan kenyamanan setara kelas VIP.'
    ],
    imageUrl: '/images/toyota_innova_zenix.webp',
    descriptionContent: [
      'Nikmati sensasi berkendara masa depan bersama keluarga dengan paket <strong>sewa inova zenix jogja</strong> dari Aksara Transport. Sebagai generasi penerus Innova, Zenix menghadirkan teknologi sasis modern yang memberikan kenyamanan berkendara layaknya sedan mewah dengan kabin yang sangat lapang.',
      'Dilengkapi fitur keselamatan canggih dan sistem hiburan termutakhir, Toyota Innova Zenix sangat cocok untuk perjalanan dinas kantoran, tamu VIP, maupun liburan keluarga eksklusif di Yogyakarta. Unit kami selalu dijaga kebersihannya dan diservis berkala agar performanya tetap optimal.',
      'Sewa Innova Zenix sekarang juga dengan pelayanan driver premium kami yang ramah, profesional, dan selalu siap mengantar Anda ke berbagai destinasi wisata Jogja dengan aman.'
    ]
  },
  {
    slug: 'sewa-mobil-alphard-jogja',
    type: 'car',
    title: 'Sewa Alphard Jogja',
    carName: 'Toyota Alphard',
    priceWithDriver: 2800000,
    benefits: [
      'Mobil MPV termewah di kelasnya, garansi prestise dan kenyamanan mutlak.',
      'Kursi Captain Seat VIP yang memanjakan penumpang selama di perjalanan.',
      'Harga sewa mulai 2 jutaan, standar pelayanan VVIP dan Pejabat Negara.'
    ],
    imageUrl: '/images/toyota_alphard.webp',
    descriptionContent: [
      'Untuk kebutuhan prestise tinggi, acara kenegaraan, pernikahan mewah, atau kunjungan tamu VIP di Yogyakarta, layanan <strong>sewa alphard jogja</strong> dari Aksara Transport adalah solusi terbaik. Toyota Alphard menjamin kenyamanan mutlak dengan jok Captain Seat baris kedua yang mewah dan legroom yang sangat lega.',
      'Didukung oleh suspensi canggih yang meredam guncangan jalanan dengan sempurna serta fitur double sunroof, perjalanan keliling Jogja akan terasa sangat eksklusif dan menyenangkan. Kebersihan dan keharuman kabin senantiasa menjadi prioritas utama pelayanan kami.',
      'Sewa Alphard kami sudah termasuk supir VVIP profesional berpakaian rapi dan terlatih yang siap memberikan standar pelayanan bintang lima sepanjang perjalanan Anda.'
    ]
  },
  {
    slug: 'sewa-mobil-alphard-facelift-jogja',
    type: 'car',
    title: 'Sewa Alphard Facelift Jogja',
    carName: 'Toyota Alphard Facelift',
    priceAllIn: 2999999,
    benefits: [
      'Mobil MPV termewah di kelasnya, garansi prestise dan kenyamanan mutlak.',
      'Kursi Captain Seat VIP yang memanjakan penumpang selama di perjalanan.',
      'Harga sewa mulai 2 jutaan, standar pelayanan VVIP dan Pejabat Negara.'
    ],
    imageUrl: '/images/toyota_alphard.webp',
    descriptionContent: [
      'Tingkatkan standar kenyamanan perjalanan VIP Anda dengan memilih <strong>sewa alphard facelift jogja</strong>. Tampilan eksterior yang lebih modern dan megah dipadukan dengan interior super mewah menjadikan armada ini pilihan utama bagi kalangan eksekutif, pejabat, dan pengantin baru di Yogyakarta.',
      'Kabin belakang dilengkapi dengan kursi pijat elektrik (power seat), AC double blower super dingin, dan pencahayaan kabin yang menenang. Kami menggaransi kebersihan unit dan kesiapan mekanis sebelum mobil menjemput Anda di bandara atau hotel.',
      'Nikmati perjalanan tanpa stres dengan sopir andalan Aksara Transport yang mengutamakan keselamatan berkendara dan kenyamanan eksklusif Anda.'
    ]
  },
  {
    slug: 'sewa-mobil-hiace-commuter-jogja',
    type: 'car',
    title: 'Sewa Hiace Commuter Jogja',
    carName: 'Toyota Hiace Commuter',
    priceAllIn: 1200000,
    benefits: [
      'Kapasitas raksasa hingga 15 penumpang, harga super hemat mulai 1 jutaan.',
      'Plafon kabin tinggi, penumpang bisa berdiri dan bergerak leluasa di dalam mobil.',
      'Sangat cocok untuk rombongan wisata keluarga besar atau ziarah.'
    ],
    imageUrl: '/images/toyota_hiace_commuter.webp',
    descriptionContent: [
      'Membawa rombongan keluarga besar atau rekan sekantor liburan di Jogja kini lebih hemat dan praktis dengan <strong>sewa hiace commuter jogja</strong>. Minibus andalan Toyota ini mampu menampung hingga 15 orang penumpang sekaligus tanpa mengorbankan kenyamanan legroom.',
      'Plafon kabin yang tinggi memudahkan penumpang untuk berdiri dan bergerak di dalam mobil. Aksara Transport menyediakan unit Hiace Commuter yang terawat, AC ducting dingin hingga baris belakang, serta suspensi yang stabil untuk rute jarak jauh seperti wisata pantai Gunungkidul.',
      'Dapatkan penawaran harga terbaik sewa Hiace Jogja all-in (mobil, supir, dan bbm) untuk kemudahan liburan rombongan Anda tanpa lelah menyetir.'
    ]
  },
  {
    slug: 'sewa-mobil-hiace-premio-jogja',
    type: 'car',
    title: 'Sewa Hiace Premio Jogja',
    carName: 'Toyota Hiace Premio',
    priceAllIn: 1400000,
    benefits: [
      'Sangat ekonomis! Mulai dari 100rb/pack (per penumpang) untuk kapasitas 14 seat.',
      'Harga sudah ALL IN (Termasuk Mobil, Driver Profesional, dan BBM).',
      'Desain kabin mewah dan eksklusif, jauh lebih nyaman untuk perjalanan jauh.'
    ],
    imageUrl: '/images/toyota_hiace_premio.webp',
    descriptionContent: [
      'Bagi rombongan yang menginginkan kenyamanan dan tampilan minibus yang lebih elegan, paket <strong>sewa hiace premio jogja</strong> adalah jawaban terbaik. Dengan desain semi-bonnet yang modern, Hiace Premio menawarkan tingkat keamanan lebih tinggi serta kesenyapan kabin yang jauh lebih baik dibanding versi commuter.',
      'Minibus kelas eksekutif ini sangat cocok untuk rombongan keluarga VIP, perjalanan dinas luar kota, maupun pariwisata Jogja premium berkapasitas hingga 14 kursi penumpang. Kabin didesain mewah dengan kursi ergonomis yang nyaman diduduki berjam-jam.',
      'Kami menyediakan sewa Hiace Premio Jogja lengkap dengan supir ramah yang paham rute wisata terbaik dan restoran kuliner terpopuler di Yogyakarta.'
    ]
  },
  {
    slug: 'sewa-mobil-alphard-hev-jogja',
    type: 'car',
    title: 'Sewa Alphard HEV Jogja',
    carName: 'Toyota Alphard HEV (Hybrid)',
    priceAllIn: 4000000,
    benefits: [
      'Varian tertinggi Alphard dengan teknologi Hybrid Electric Vehicle (HEV) super senyap.',
      'Harga sewa mulai 3 jutaan dengan fasilitas paling eksklusif di kelasnya.',
      'Sempurna untuk acara kenegaraan, tamu VVIP, atau pernikahan mewah.'
    ],
    imageUrl: '/images/toyota_alphard_hev.webp',
    descriptionContent: [
      'Rasakan kemewahan ramah lingkungan dengan paket <strong>sewa alphard hev jogja</strong>. Varian terbaru Toyota Alphard Hybrid Electric Vehicle (HEV) ini menawarkan kesenyapan kabin luar biasa saat motor listrik bekerja, memberikan sensasi berkendara kelas VVIP yang tiada duanya.',
      'Sempurna untuk melayani delegasi bisnis internasional, pejabat tinggi negara, atau pernikahan mewah di Yogyakarta yang mengusung konsep modern dan eco-friendly. Unit kami terawat dengan standar servis dealer resmi demi menjaga performa premiumnya.',
      'Pelayanan sewa Alphard Hybrid kami hadir lengkap dengan pengemudi profesional khusus yang ramah, disiplin waktu, dan berpengalaman luas di area jalan raya Yogyakarta.'
    ]
  },
  {
    slug: 'sewa-mobil-pajero-jogja',
    type: 'car',
    title: 'Sewa Pajero Jogja',
    carName: 'Mitsubishi Pajero Sport',
    priceAllIn: 1500000,
    benefits: [
      'SUV tangguh yang siap melibas segala medan wisata ekstrem di Yogyakarta.',
      'Desain maskulin dan elegan, memberikan kesan gagah di jalan raya.',
      'Kabin lega dengan fitur keamanan tingkat tinggi untuk petualangan Anda.'
    ],
    imageUrl: '/images/mitsubishi_pajero.webp',
    descriptionContent: [
      'Taklukkan medan menantang dan nikmati petualangan wisata alam di Yogyakarta dengan layanan <strong>sewa pajero jogja</strong>. Mitsubishi Pajero Sport merupakan SUV tangguh berdesain sporty dan maskulin yang sangat stabil melibas jalanan menanjak maupun berlubang di kawasan Merapi dan perbukitan Jogja.',
      'Kabin SUV premium ini sangat nyaman untuk kapasitas hingga 7 orang, dengan bagasi yang fleksibel untuk barang bawaan petualangan Anda. Aksara Transport menjamin unit Pajero Sport kami selalu dalam performa mesin optimal dan bersih berkilau.',
      'Sewa Pajero Jogja tersedia dengan sistem sewa lepas kunci untuk petualangan mandiri Anda atau lengkap dengan driver handal kami untuk perjalanan yang santai.'
    ]
  },
  {
    slug: 'sewa-mobil-fortuner-jogja',
    type: 'car',
    title: 'Sewa Fortuner Jogja',
    carName: 'Toyota Fortuner',
    priceWithDriver: 1500000,
    benefits: [
      'Ketangguhan mesin diesel Toyota dipadukan dengan desain SUV mewah yang ikonik.',
      'Sangat nyaman untuk rute pegunungan seperti Gunungkidul dan Merapi.',
      'Ground clearance tinggi memastikan perjalanan aman melintasi segala cuaca.'
    ],
    imageUrl: '/images/toyota_fortuner.webp',
    descriptionContent: [
      'Pilihan SUV premium berkarakter gagah lainnya untuk menemani perjalanan dinas atau wisata Anda adalah <strong>sewa fortuner jogja</strong>. Toyota Fortuner menawarkan kenyamanan suspensi yang kokoh dengan ground clearance tinggi, menjadikannya pilihan sempurna melintasi rute perbukitan Yogyakarta.',
      'Tampilan luar yang elegan memberikan prestise tersendiri bagi Anda yang menghadiri pertemuan bisnis atau acara keluarga besar di Jogja. Kebersihan kabin dan performa AC dingin selalu kami periksa sebelum penyerahan unit.',
      'Aksara Transport menawarkan paket rental Fortuner Jogja harga kompetitif dengan driver profesional yang terlatih berkendara aman di segala medan.'
    ]
  },
  {
    slug: 'sewa-mobil-elf-jogja',
    type: 'car',
    title: 'Sewa Elf Jogja',
    carName: 'Isuzu Elf Long',
    priceAllIn: 1600000,
    benefits: [
      'Microbus tangguh dengan kapasitas hingga 19 orang.',
      'Tarikan mesin diesel Isuzu yang kuat menanjak di perbukitan Jogja.',
      'Solusi transportasi massal paling efisien dan ekonomis untuk rombongan wisata.'
    ],
    imageUrl: '/images/elf_long.webp',
    descriptionContent: [
      'Untuk kapasitas rombongan super besar hingga 19 orang, layanan <strong>sewa elf jogja</strong> (Isuzu Elf Long) dari Aksara Transport adalah solusi transportasi massal paling efisien. Sangat ideal untuk rombongan study tour sekolah, ziarah keagamaan, atau acara arisan keluarga besar di Yogyakarta.',
      'Dilengkapi mesin diesel Isuzu yang terkenal sangat bertenaga dan tangguh menanjak di perbukitan, perjalanan Anda bersama rombongan besar akan tetap lancar. Fasilitas AC dingin merata dan ruang bagasi luas menjadi standar kenyamanan unit kami.',
      'Kami menyediakan paket sewa Isuzu Elf Jogja all-in lengkap dengan driver berpengalaman khusus minibus yang ramah dan siap membantu kenyamanan seluruh anggota rombongan.'
    ]
  },
  {
    slug: 'sewa-mobil-listrik-jogja',
    type: 'car',
    title: 'Sewa Mobil Listrik Jogja',
    carName: 'Wuling Binguo EV / Air EV',
    fullday: 450000,
    benefits: [
      'Bebas polusi dan suara mesin senyap, sensasi berkendara masa depan.',
      'Biaya operasional sangat rendah karena tidak perlu membeli bensin mahal.',
      'Desain futuristik dan unik, pusat perhatian saat keliling kota Yogyakarta.'
    ],
    imageUrl: '/images/wuling_binguo.webp',
    descriptionContent: [
      'Dukung gerakan ramah lingkungan dan rasakan pengalaman berkendara masa kini dengan <strong>sewa mobil listrik jogja</strong>. Aksara Transport menyediakan pilihan mobil listrik kompak seperti Wuling Air EV atau Binguo EV yang sangat lincah menyusuri kepadatan jalanan kota Yogyakarta.',
      'Selain bebas polusi dan suara mesin yang senyap, menggunakan mobil listrik memberikan efisiensi biaya operasional yang sangat tinggi karena terbebas dari pembelian bensin mahal. Unit kami selalu diserahkan dalam kondisi baterai terisi penuh.',
      'Opsi rental mobil listrik lepas kunci ini sangat digemari oleh anak muda dan wisatawan modern yang menyukai kepraktisan serta teknologi otomotif terbaru.'
    ]
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
    descriptionContent: [
      'Mencari jasa <strong>sewa mobil terdekat</strong> di Yogyakarta? Aksara Transport adalah pilihan paling tepat yang siap memberikan kemudahan layanan penjemputan armada langsung di depan pintu kedatangan Stasiun Tugu, Bandara YIA (Yogyakarta International Airport), terminal, maupun lobi hotel tempat Anda menginap.',
      'Kami memahami bahwa efisiensi waktu sangat berharga selama perjalanan liburan atau bisnis. Oleh karena itu, tim pengantaran armada kami selalu siaga dan memastikan kendaraan tiba tepat waktu dalam kondisi bersih, wangi, dan tangki bahan bakar terisi sesuai kesepakatan.',
      'Dengan cakupan layanan yang luas di seluruh penjuru kota Jogja, Anda tidak perlu lagi repot mendatangi garasi kami untuk serah terima unit.'
    ]
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
    descriptionContent: [
      'Aksara Transport adalah penyedia jasa <strong>sewa mobil yogyakarta</strong> terpercaya yang menghadirkan solusi transportasi terlengkap baik untuk keperluan liburan keluarga, perjalanan dinas kantor, pernikahan, hingga kunjungan kenegaraan di wilayah DIY dan sekitarnya.',
      'Kami menawarkan beragam pilihan armada terbaru mulai dari city car yang lincah seperti Honda Brio, MPV keluarga legendaris Toyota Avanza dan Innova Reborn/Zenix, SUV premium Mitsubishi Pajero dan Toyota Fortuner, hingga minibus rombongan Toyota Hiace dan Isuzu Elf.',
      'Semua kendaraan kami selalu melalui pengecekan kebersihan dan servis berkala secara ketat demi menjamin keamanan dan kenyamanan bintang lima bagi setiap pelanggan kami.'
    ]
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
    descriptionContent: [
      'Dapatkan pengalaman liburan hemat tanpa mengorbankan kenyamanan dengan memilih layanan <strong>sewa mobil murah</strong> dari Aksara Transport Jogja. Kami menawarkan paket rental kendaraan dengan jaminan harga sewa terbaik dan transparan di awal tanpa ada biaya tersembunyi (*hidden fees*).',
      'Meskipun menawarkan harga yang sangat bersaing, kami tidak pernah menurunkan standar pelayanan. Seluruh armada kami dipastikan bersih dari debu dan bau tak sedap, AC dingin maksimal, serta mesin terawat dengan prima agar perjalanan Anda tetap lancar.',
      'Nikmati diskon harga khusus untuk durasi penyewaan jangka panjang di atas 3 hari serta berbagai promo menarik lainnya sepanjang tahun.'
    ]
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
    descriptionContent: [
      'Selamat datang di Aksara Transport, penyedia jasa <strong>sewa mobil #1 di yogyakarta</strong> yang telah dipercaya oleh ribuan wisatawan domestik maupun mancanegara selama bertahun-tahun untuk memenuhi kebutuhan mobilitas mereka selama di Jogja.',
      'Reputasi bintang lima yang kami dapatkan merupakan buah konsistensi dalam menjaga kenyamanan pelanggan melalui peremajaan armada secara rutin (usia mobil di bawah 4 tahun), kebersihan kabin yang maksimal, serta pelayanan customer service yang responsif 24 jam.',
      'Baik Anda memilih sistem sewa lepas kunci maupun dengan menggunakan jasa driver profesional kami, kami menjamin perjalanan Anda di Yogyakarta akan berjalan dengan menyenangkan.'
    ]
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
    descriptionContent: [
      'Bagi Anda yang menginginkan kebebasan rute perjalanan dan privasi penuh selama liburan, layanan <strong>sewa mobil lepas kunci jogja 24 jam</strong> dari Aksara Transport adalah pilihan ideal yang dapat diandalkan setiap saat.',
      'Anda bebas berkendara keliling tempat wisata hits Jogja kapan pun tanpa batasan jam kerja supir. Kami juga mempermudah proses verifikasi dokumen jaminan sewa Anda secara cepat dan ramah agar serah terima unit dapat berjalan dengan lancar saat Anda tiba di Yogyakarta.',
      'Seluruh unit lepas kunci kami dilengkapi asuransi kendaraan guna memberikan ketenangan ekstra bagi Anda selama menjelajah keindahan pariwisata Jogja.'
    ]
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
    descriptionContent: [
      'Membutuhkan layanan transportasi instan begitu Anda turun dari kereta? Aksara Transport menyediakan jasa <strong>rental mobil jogja dekat stasiun tugu</strong> yang sangat praktis dan memudahkan awal perjalanan Anda di kota Yogyakarta.',
      'Petugas kami siap menunggu dan menyerahkan unit mobil pilihan Anda langsung di area drop-off Stasiun Tugu Lempuyangan secara gratis tanpa biaya antar-jemput tambahan. Anda bisa langsung memulai aktivitas wisata atau bisnis tanpa perlu membuang waktu mengantri taksi online.',
      'Kami menyediakan armada city car hingga MPV keluarga yang lincah dan siap digunakan kapan saja untuk menyusuri jalanan utama Yogyakarta.'
    ]
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
    descriptionContent: [
      'Wujudkan liburan keluarga impian di Yogyakarta yang nyaman dan berkesan dengan memilih paket <strong>sewa mobil keluarga jogja murah</strong> bersama Aksara Transport. Kami menyediakan pilihan MPV handal seperti Toyota Avanza, Mitsubishi Xpander, dan Toyota Innova.',
      'Kabin mobil kami dipastikan selalu bersih dari debu, disemprot cairan disinfektan, serta memiliki AC dingin guna memastikan kenyamanan maksimal bagi anak-anak dan orang tua selama perjalanan menuju lokasi wisata alam Jogja.',
      'Dengan harga sewa harian yang sangat terjangkau, Anda dapat menghemat pengeluaran transportasi keluarga dan mengalokasikannya untuk kuliner khas Jogja serta oleh-oleh.'
    ]
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
    descriptionContent: [
      'Mencari <strong>rekomendasi sewa mobil jogja terbaik</strong> dengan reputasi terpercaya dan ribuan ulasan positif dari para pelanggan? Aksara Transport adalah jawabannya sebagai penyedia rental terdepan di Yogyakarta.',
      'Kami mengutamakan kualitas pelayanan setara hotel berbintang: mobil yang selalu prima, wangi, bersih, pengantaran tepat waktu, serta dukungan tim mekanik dan layanan darurat 24 jam di jalan untuk menjamin keamanan Anda.',
      'Hubungi tim customer service kami untuk mendapatkan rekomendasi unit kendaraan terbaik yang paling sesuai dengan rencana rute perjalanan liburan Anda di Yogyakarta.'
    ]
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
    descriptionContent: [
      'Ingin memperluas rute liburan Anda hingga ke luar wilayah Yogyakarta? Aksara Transport menyediakan layanan <strong>sewa mobil jogja bisa keluar kota</strong> dengan perizinan resmi dan kondisi armada prima untuk perjalanan jarak jauh antar-provinsi.',
      'Anda bebas berkendara mengunjungi destinasi indah di sekitar Jogja seperti kawasan Dieng Plateau Wonosobo, Candi Borobudur Magelang, Kota Solo, hingga Kota Semarang dengan aman dan nyaman tanpa rasa cemas.',
      'Seluruh mesin kendaraan kami diservis rutin di bengkel resmi serta didukung ban yang tebal agar tangguh melewati jalan tanjakan perbukitan di luar kota.'
    ]
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
    descriptionContent: [
      'Nikmati liburan santai dan bebas lelah dengan mengetahui rincian <strong>harga sewa mobil jogja dengan supir</strong> yang sangat kompetitif dari Aksara Transport. Opsi ini sangat cocok bagi Anda yang membawa rombongan keluarga besar.',
      'Supir profesional kami tidak hanya terlatih mengemudi dengan aman, tetapi juga merangkap sebagai pemandu wisata lokal yang ramah. Mereka siap menunjukkan jalan tikus bebas macet serta merekomendasikan destinasi kuliner tersembunyi yang lezat khas Yogyakarta.',
      'Dapatkan paket harga sewa All-In (Mobil, Driver, BBM) untuk mengontrol anggaran pengeluaran liburan Anda sejak awal dengan sangat mudah.'
    ]
  },
  {
    slug: 'sewa-hiace-jogja',
    type: 'car',
    title: 'Sewa Hiace di Jogja Murah',
    carName: 'Toyota Hiace Commuter & Hiace Premio',
    priceAllIn: 1100000,
    benefits: [
      'Tersedia Toyota Hiace Commuter (15 Kursi) & Hiace Premio Luxury (14 Kursi) terbaru.',
      'Paket All-In super hemat: Mobil + Driver Pariwisata Ramah + BBM Operasional.',
      'AC ducting dingin ke setiap baris kursi, legroom longgar, dan suspensi empuk.',
      'Free penjemputan di Stasiun Tugu, Lempuyangan, Bandara YIA, maupun Hotel.'
    ],
    imageUrl: '/images/toyota_hiace_premio.webp',
    descriptionContent: [
      'Mencari layanan <strong>sewa hiace di jogja</strong> dengan harga murah, unit bersih wangi, dan driver pariwisata berpengalaman? Aksara Transport adalah solusi terbaik untuk perjalanan rombongan keluarga besar, instansi kantor, study tour, hingga gathering komunitas di Yogyakarta.',
      'Kami menyediakan dua varian minibus terbaik: <strong>Toyota Hiace Commuter</strong> berkapasitas 15 kursi yang sangat ekonomis, serta <strong>Toyota Hiace Premio</strong> berkapasitas 14 kursi dengan kabin semi-bonnet mewah yang super senyap dan berkelas.',
      'Semua paket sewa Hiace Jogja kami sudah mencakup unit kendaraan prima, sopir ramah yang merangkap pemandu rute lokal, dan bahan bakar (BBM). Nikmati perjalanan wisata tanpa rasa lelah mengemudi ke destinasi populer seperti Candi Borobudur, Tebing Breksi, Lava Tour Merapi, hingga pantai-pantai eksotis Gunungkidul.'
    ]
  },
  {
    slug: 'sewa-mobil-jogja-dengan-sopir-murah',
    type: 'general',
    title: 'Sewa Mobil di Jogja dengan Sopir Murah',
    carName: 'Avanza, Innova Reborn, Zenix & Hiace',
    priceWithDriver: 550000,
    priceAllIn: 600000,
    benefits: [
      'Driver ramah, sopan, berpakaian rapi, dan berpengalaman rute dalam & luar kota Jogja.',
      'Harga paket All-In transparan: sudah termasuk mobil, jasa sopir profesional, dan BBM.',
      'Pilihan armada lengkap: Avanza, Xpander, Innova Reborn Diesel, Zenix Hybrid, hingga Hiace.',
      'Layanan antar jemput tepat waktu di Stasiun Tugu, Lempuyangan, Bandara YIA, atau Hotel.'
    ],
    imageUrl: '/images/toyota_avanza_facelift.webp',
    descriptionContent: [
      'Layanan <strong>sewa mobil di jogja dengan sopir murah</strong> dari Aksara Transport dirancang khusus bagi Anda yang ingin menikmati liburan atau perjalanan bisnis di Yogyakarta tanpa rasa lelah menghadapi kemacetan dan sulitnya mencari tempat parkir.',
      'Driver kami bukan sekadar pengemudi biasa, melainkan tenaga profesional yang ramah, sopan, mengutamakan keselamatan penumpang, serta hafal jalan-jalan tikus tercepat dan rekomendasi kuliner legendaris khas Jogja yang otentik.',
      'Tersedia beragam pilihan armada prima yang wangi dan bersih, mulai dari Toyota Avanza untuk keluarga kecil, Innova Reborn Diesel dan Innova Zenix Hybrid untuk kenyamanan kelas eksekutif, hingga minibus Toyota Hiace untuk rombongan wisata. Semua tarif sewa mobil dengan sopir kami dijamin transparan tanpa ada pungutan biaya tersembunyi.'
    ]
  }
];

export function getKeywordData(slug: string): KeywordData | undefined {
  return seoKeywords.find(k => k.slug === slug);
}
