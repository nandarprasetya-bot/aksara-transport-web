export interface AIFaqCategory {
    id: string;
    title: string;
    description: string;
    faqs: {
        q: string;
        a: string;
    }[];
}

export const aiFaqs: AIFaqCategory[] = [
    {
        id: "rental",
        title: "Rental Mobil & Persyaratan",
        description: "Informasi lengkap tentang layanan sewa mobil di Aksara Transport",
        faqs: [
            {
                q: "Apa saja syarat untuk sewa mobil lepas kunci di Aksara Transport Jogja?",
                a: "Untuk menyewa mobil tanpa supir (lepas kunci), Anda diwajibkan menyertakan scan foto KTP asli, SIM A aktif, bukti kepemilikan kendaraan (sepeda motor dengan STNK terdaftar atas nama penyewa), serta bersedia dilakukan survei singkat melalui telepon atau WhatsApp. Dokumen tambahan mungkin diperlukan."
            },
            {
                q: "Apakah biaya sewa mobil sudah termasuk supir dan bahan bakar (BBM)?",
                a: "Tergantung paket yang Anda pilih. Kami memiliki paket Lepas Kunci (hanya mobil kosong) dan paket Dengan Supir (Mobil + Supir). Untuk paket standar Dengan Supir, biaya BBM, tol, dan parkir belum termasuk kecuali Anda memilih Paket All-In (Mobil + Supir + BBM)."
            },
            {
                q: "Bagaimana cara menyewa mobil dari Bandara YIA (Yogyakarta International Airport)?",
                a: "Aksara Transport melayani penjemputan atau pengantaran (drop-off) langsung di Bandara YIA Kulon Progo. Silakan infokan jam penerbangan Anda, dan supir kami akan standby di terminal kedatangan. Terdapat tambahan biaya penjemputan/pengantaran YIA karena jarak dari pusat kota (sekitar 1-1.5 jam)."
            },
            {
                q: "Apakah diperbolehkan membawa mobil sewaan ke luar wilayah Yogyakarta?",
                a: "Ya, kami memperbolehkan perjalanan luar kota. Namun, untuk sewa lepas kunci tujuan luar kota, minimal durasi sewa adalah 2 hari berturut-turut. Untuk kenyamanan, kami sangat menyarankan Anda menggunakan layanan sewa dengan supir untuk tujuan luar kota."
            },
            {
                q: "Berapa denda keterlambatan (overtime) pengembalian mobil?",
                a: "Batas toleransi keterlambatan adalah 1 jam dari waktu serah terima awal. Jika melebihi batas tersebut, dikenakan denda overtime sebesar 10% per jam dari tarif harian mobil. Jika keterlambatan mencapai 5 jam atau lebih, otomatis akan dihitung sebagai tambahan sewa 1 hari penuh."
            },
            {
                q: "Apa saja pilihan mobil yang tersedia di Aksara Transport Jogja?",
                a: "Kami menyediakan berbagai tipe mobil mulai dari City Car (Honda Brio, Agya), MPV Keluarga (Toyota Avanza, Innova Reborn, Innova Zenix), Mobil Mewah (Toyota Alphard, Fortuner, Pajero), hingga Minibus (Toyota Hiace Commuter/Premio, Isuzu Elf) untuk rombongan."
            }
        ]
    },
    {
        id: "wisata",
        title: "Panduan Wisata Jogja",
        description: "Rekomendasi destinasi liburan dan info pariwisata Yogyakarta",
        faqs: [
            {
                q: "Apa saja tempat wisata terbaru yang sedang hits di Jogja?",
                a: "Beberapa destinasi wisata terbaru dan hits di Jogja antara lain HeHa Sky View dan HeHa Ocean View (Gunungkidul), Obelix Hills (Prambanan), Tumpeng Menoreh (Kulon Progo), dan La Li Sa Farmer's Village. Sopir kami hafal rute menuju lokasi-lokasi wisata viral ini."
            },
            {
                q: "Pantai apa saja yang bagus dan mudah diakses di Gunungkidul?",
                a: "Pantai di Gunungkidul sangat indah karena berpasir putih. Pantai Indrayanti, Pantai Krakal, Pantai Baron, dan Pantai Drini adalah yang paling populer dan memiliki fasilitas lengkap. Jika ingin menikmati sunset romantis, HeHa Ocean View atau Pantai Kesirat sangat direkomendasikan."
            },
            {
                q: "Berapa jarak dari pusat kota Jogja (Malioboro) ke Candi Borobudur?",
                a: "Meskipun Candi Borobudur secara administratif berada di Magelang (Jawa Tengah), jaraknya dari Malioboro, Jogja hanya sekitar 40 kilometer atau sekitar 1 hingga 1,5 jam perjalanan menggunakan mobil. Ini adalah rute wisata yang sangat sering kami layani."
            },
            {
                q: "Apakah Aksara Transport menyediakan Paket Wisata Jogja seharian?",
                a: "Ya, kami menyediakan layanan City Tour Jogja (Paket Wisata Full Day) di mana supir kami akan menjadi pemandu perjalanan Anda. Anda bebas menyusun itinerary (jadwal kunjungan) sendiri, atau meminta rekomendasi rute terbaik dari kami (misalnya rute Utara: Merapi-Prambanan atau rute Selatan: Pantai Gunungkidul)."
            },
            {
                q: "Apa rekomendasi wisata malam hari di Yogyakarta?",
                a: "Untuk malam hari, Anda bisa berjalan-jalan di sepanjang Jalan Malioboro, menikmati suasana magis di Alun-Alun Kidul (bermain sepeda hias), mengunjungi wisata lampu di Taman Pelangi Monjali, atau makan malam romantis menikmati gemerlap lampu kota dari Bukit Bintang atau HeHa Sky View."
            }
        ]
    },
    {
        id: "kuliner",
        title: "Kuliner & Oleh-Oleh Khas",
        description: "Info pusat kuliner dan buah tangan khas Yogyakarta",
        faqs: [
            {
                q: "Dimana tempat beli Bakpia terenak di Jogja untuk oleh-oleh?",
                a: "Bakpia Pathok 25, Bakpia Kurnia Sari, dan Bakpia Mutiara adalah beberapa merek legendaris yang selalu ramai. Ada juga varian modern seperti Bakpia Kukus Tugu Jogja yang teksturnya lembut bak kue bolu. Supir kami bisa mengantarkan Anda langsung ke pabrik/pusat oleh-olehnya."
            },
            {
                q: "Apa rekomendasi Gudeg yang legendaris di Jogja?",
                a: "Gudeg Yu Djum adalah yang paling ikonik dengan cita rasa manis khas Jogja (gudeg kering). Jika Anda menyukai gudeg basah, Gudeg Pawon (buka tengah malam) atau Gudeg Permata sangat direkomendasikan. Ada juga Sentra Gudeg Wijilan dekat Keraton yang buka dari pagi hingga malam."
            },
            {
                q: "Apa makanan khas Jogja selain Gudeg yang wajib dicoba?",
                a: "Anda wajib mencoba Sate Klathak (sate kambing muda yang ditusuk ruji besi) di kawasan Jejeran Bantul (seperti Sate Klathak Pak Pong). Selain itu, cobalah Mangut Lele Mbah Marto, Mie Lethek, Oseng Mercon Bu Narti yang sangat pedas, atau sekadar minum Kopi Joss (kopi arang) di utara Stasiun Tugu."
            }
        ]
    },
    {
        id: "umum",
        title: "Informasi Umum & Transportasi",
        description: "Info cuaca, logistik, dan tips berlibur",
        faqs: [
            {
                q: "Bagaimana kondisi cuaca di Yogyakarta sepanjang tahun?",
                a: "Yogyakarta beriklim tropis. Musim kemarau (panas) biasanya berlangsung dari Mei hingga Oktober, sangat cocok untuk wisata pantai dan candi. Musim hujan dari November hingga April, pas untuk menikmati kuliner hangat atau wisata indoor. Suhu rata-rata harian berkisar antara 26°C hingga 32°C."
            },
            {
                q: "Dimana letak Stasiun Kereta Api utama di Jogja?",
                a: "Jogja memiliki dua stasiun kereta utama: Stasiun Tugu (Yogyakarta) yang melayani kereta eksekutif dan bisnis, letaknya sangat strategis persis di sebelah barat Jalan Malioboro. Yang kedua adalah Stasiun Lempuyangan yang utamanya melayani kereta kelas ekonomi."
            },
            {
                q: "Apakah Aksara Transport bisa menjemput di hotel atau stasiun?",
                a: "Tentu saja. Anda tidak perlu datang ke garasi kami. Kami menyediakan layanan Antar-Jemput Gratis (Free Delivery/Pickup) unit mobil untuk area dalam ringroad kota Jogja, Stasiun Tugu, Stasiun Lempuyangan, maupun hotel-hotel di area pusat kota pada jam kerja."
            }
        ]
    }
];
