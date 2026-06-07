"use client";

import React from 'react';
import Link from 'next/navigation';

export default function TentangKamiPage() {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="hero" style={{ padding: '120px 0 60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Tentang Aksara Transport</h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Pahami profil bisnis kami serta aturan dan syarat penyewaan armada demi keselamatan bersama.</p>
                </div>
            </section>

            {/* PROFILE SECTION */}
            <section className="section-padding" style={{ backgroundColor: '#fff' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>Siapa Kami?</h2>
                    <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
                        Didirikan dengan semangat memberikan layanan transportasi berstandar premium, <strong>Aksara Transport</strong> telah tumbuh menjadi salah satu agensi rental mobil terpercaya. Kami melayani kebutuhan sewa mobil harian, korporat bulanan, hingga sewa mobil VIP untuk rombongan maupun pengantin.
                    </p>
                    <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>
                        Komitmen utama kami adalah menyajikan kendaraan yang selalu berada dalam performa prima melalui servis berkala yang ketat. Di samping itu, kebersihan eksterior dan interior mobil merupakan standar operasional mutlak sebelum unit diserahterimakan kepada pelanggan.
                    </p>

                    <div style={{ backgroundColor: 'var(--bg-light)', borderLeft: '4px solid var(--accent)', padding: '24px', borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0', marginBottom: '50px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--primary)' }}>Visi &amp; Misi Kami</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                            <strong>Visi:</strong> Menjadi penyedia solusi transportasi nomor satu yang dikenal dengan kejujuran harga, kebersihan armada, dan keramahan pelayanan pelanggan.
                        </p>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                            <strong>Misi:</strong> Menyediakan unit armada terbaru yang aman, membina pengemudi handal yang mengutamakan keselamatan penumpang, serta mempermudah akses pemesanan melalui digitalisasi layanan.
                        </p>
                    </div>
                </div>
            </section>

            {/* TERMS & CONDITIONS SECTION */}
            <section className="section-padding" id="syarat" style={{ backgroundColor: '#f1f5f9' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="text-center" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '40px' }}>Syarat &amp; Ketentuan Sewa</h2>
                    
                    {/* Lepas Kunci */}
                    {/* Lepas Kunci */}
                    <div style={{ backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', padding: '35px', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            Layanan Lepas Kunci (Tanpa Supir)
                        </h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                            Dengan melakukan pemesanan dan menggunakan layanan sewa mobil lepas kunci kami, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan di bawah ini:
                        </p>
                        
                        <div className="terms-content" style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                            <h4 style={{ color: 'var(--primary)', marginTop: '20px', fontWeight: 700 }}>PERSYARATAN DOKUMEN</h4>
                            <p><em>(Harap Kirimkan Foto Dokumen Berikut)</em></p>
                            <p>Sebelum melakukan pembayaran uang muka (DP), Anda wajib melengkapi dan mengirimkan persyaratan dokumen. Pembayaran DP hanya dapat dilanjutkan setelah data diri Anda kami verifikasi dan setujui.</p>
                            
                            <strong>Identitas Diri:</strong>
                            <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                <li>2 E-KTP</li>
                                <li>SIM A (Wajib) &amp; SIM C</li>
                                <li>BPJS</li>
                                <li>ID Card (Kartu Pegawai / Mahasiswa)</li>
                            </ul>
                            
                            <strong>Dokumen Pendukung Tambahan:</strong>
                            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                                <li>Untuk Wisatawan: Tiket Perjalanan Datang/Pulang Yogyakarta.</li>
                                <li>Untuk Domisili Yogyakarta &amp; Sekitarnya: Kartu Keluarga (KK).</li>
                            </ul>

                            <h4 style={{ color: 'var(--primary)', marginTop: '20px', fontWeight: 700 }}>KETENTUAN BOOKING</h4>
                            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                                <li><strong>Uang Muka (DP):</strong> Tanda jadi booking adalah transfer 30% dari total harga sewa.</li>
                                <li><strong>Bukti Transfer:</strong> Setelah transfer, WAJIB mengirimkan bukti transfer (foto/screenshot) dan mencantumkan nama pemilik rekening pengirim.</li>
                            </ul>

                            <h4 style={{ color: 'var(--primary)', marginTop: '20px', fontWeight: 700 }}>TANGGUNG JAWAB PENYEWA</h4>
                            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                                <li><strong>Kondisi Mobil:</strong> Penyewa wajib memeriksa dan menvideo kondisi mobil (fisik, interior, fungsi) sebelum serah terima. Jika terdapat kerusakan menjadi sepenuhnya tanggung jawab penyewa.</li>
                                <li><strong>Perawatan Ringan:</strong> Penyewa wajib menjaga kebersihan dan melakukan perawatan ringan selama masa sewa (contoh: menjaga tekanan ban, tidak memaksakan mobil jika ada indikasi masalah).</li>
                                <li><strong>Kerusakan &amp; Kehilangan:</strong> Penyewa bertanggung jawab penuh atas segala kerusakan (kecuali kerusakan akibat pemakaian normal), kehilangan bagian mobil, atau kehilangan mobil selama masa sewa, baik akibat kelalaian penyewa maupun pihak ketiga. Biaya perbaikan atau penggantian akan ditanggung penyewa.</li>
                                <li><strong>Pelanggaran Lalu Lintas:</strong> Segala denda atau sanksi akibat pelanggaran lalu lintas (tilang, parkir liar, dll.) selama masa sewa sepenuhnya menjadi tanggung jawab penyewa.</li>
                            </ul>

                            <h4 style={{ color: '#ef4444', marginTop: '20px', fontWeight: 700 }}>LARANGAN KERAS:</h4>
                            <ul style={{ marginLeft: '20px', marginBottom: '20px', color: '#ef4444' }}>
                                <li><strong>DILARANG</strong> menggunakan mobil untuk kegiatan ilegal, balapan, membawa muatan melebihi kapasitas, atau menarik kendaraan lain.</li>
                                <li><strong>DILARANG</strong> merokok di dalam mobil atau membawa hewan peliharaan.</li>
                                <li><strong>DILARANG</strong> memindahtangankan sewa kepada pihak lain.</li>
                                <li><strong>DILARANG</strong> membawa hasil laut atau benda berbau menyengat di dalam mobil untuk menjaga kenyamanan dan kebersihan.</li>
                            </ul>

                            <h4 style={{ color: 'var(--primary)', marginTop: '20px', fontWeight: 700 }}>PENGEMBALIAN KENDARAAN</h4>
                            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                                <li><strong>Waktu Pengembalian:</strong> Mobil harus dikembalikan tepat waktu sesuai durasi sewa yang disepakati. Keterlambatan akan dikenakan biaya overtime.</li>
                                <li><strong>Kondisi Pengembalian:</strong> Mobil harus dikembalikan dalam kondisi yang sama seperti saat serah terima (bahan bakar kembali semula sesuai awal serah terima, tidak ada kerusakan baru).</li>
                                <li><strong>Pemeriksaan:</strong> Pihak kami akan melakukan pemeriksaan menyeluruh saat mobil dikembalikan.</li>
                            </ul>

                            <h4 style={{ color: 'var(--primary)', marginTop: '20px', fontWeight: 700 }}>PEMBATALAN</h4>
                            <strong>Pembatalan oleh Penyewa:</strong>
                            <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                <li>Pembatalan kurang dari 24 jam sebelum waktu sewa dapat dikenakan biaya penuh.</li>
                                <li>Kebijakan pengembalian uang muka untuk pembatalan lebih awal akan diatur terpisah.</li>
                            </ul>
                            <strong>Perubahan Jadwal:</strong> Perubahan jadwal harus diinformasikan sesegera mungkin dan disesuaikan dengan ketersediaan.<br/><br/>

                            <h4 style={{ color: 'var(--primary)', marginTop: '20px', fontWeight: 700 }}>CATATAN PENTING LAINNYA</h4>
                            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                                <li><strong>Jaminan Dokumen Asli:</strong> Rental wajib membawa dokumen asli yang dijaminkan saat serah terima mobil.</li>
                                <li><strong>Jaminan Sepeda Motor:</strong> Khusus penyewa berdomisili Yogyakarta &amp; sekitarnya, wajib menjaminkan sepeda motor saat sewa.</li>
                                <li><strong>Perhitungan Sewa:</strong> Untuk sewa pada akhir pekan dan hari libur, perhitungan sewa berdasarkan tanggal (per hari), bukan 24 jam.</li>
                                <li><strong>Sewa Keluar Kota:</strong> Untuk sewa mobil keluar kota (misalnya Solo, Semarang, Dieng) akan dikenakan biaya tambahan. Mohon informasikan tujuan Anda saat pemesanan.</li>
                                <li><strong>Pengantaran Bandara YIA:</strong> Akan dikenakan biaya tambahan Rp 150.000. Jika terjadi keterlambatan (delay) penerbangan hingga melebihi pukul 19.00 WIB, biaya kepulangan kru ditanggung oleh penyewa.</li>
                            </ul>

                            <p style={{ fontWeight: 700, color: 'var(--primary)', marginTop: '30px' }}>TERIMA KASIH atas kepercayaan Anda menggunakan layanan kami. 😊🙏</p>
                        </div>
                    </div>

                    {/* Dengan Supir */}
                    <div style={{ backgroundColor: '#fff', borderRadius: 'var(--border-radius-md)', padding: '35px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            Layanan Dengan Supir (Driver)
                        </h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                            Berikut adalah ketentuan khusus untuk penyewaan mobil dengan supir:
                        </p>
                        <ul style={{ marginLeft: '20px', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                            <li>Paket <strong>12 Jam</strong> terhitung 12 jam dari waktu awal mulai sewa. Jika terjadi kelebihan waktu (overtime), akan dikenakan biaya tambahan sebesar 10% dari harga sewa per jam.</li>
                            <li>Paket <strong>Fullday</strong> maksimal penggunaan adalah sampai dengan pukul 23.00 WIB.</li>
                            <li>Harga sewa <strong>belum termasuk uang makan supir</strong>.</li>
                            <li>Jika rute mengharuskan supir menginap di luar kota, akan dikenakan tambahan <em>charge</em> sebesar Rp 150.000 / kamar.</li>
                            <li>Biaya-biaya lain yang timbul di luar program utama (misal: tiket masuk wisata tak terduga, dll) <strong>bukanlah tanggung jawab</strong> pihak penyedia jasa atau rental.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
