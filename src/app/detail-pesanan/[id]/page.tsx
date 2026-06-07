'use client';
import { useEffect, useState, use } from 'react';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) throw error;
                setBooking(data);
            } catch (err) {
                console.error('Error fetching booking:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBooking();
        }
    }, [id]);

    const formatRupiah = (angka: number) => {
        if (!angka) return 'Rp 0';
        return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Memuat Data Pesanan...</p>
            </div>
        );
    }

    if (!booking) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <h1 style={{ color: '#ef4444', marginBottom: '16px' }}>Pesanan Tidak Ditemukan</h1>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>Mohon periksa kembali link detail pesanan Anda.</p>
                    <Link href="/" className="btn btn-primary">Kembali ke Beranda</Link>
                </div>
            </div>
        );
    }

    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '60px 20px' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                <div style={{ position: 'relative', background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                    
                    {/* Watermark Lunas */}
                    {booking.status === 'LUNAS' && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-30deg)', fontSize: '8rem', fontWeight: 900, color: 'rgba(16, 185, 129, 0.05)', pointerEvents: 'none', zIndex: 0 }}>
                            LUNAS
                        </div>
                    )}
                    
                    {/* Header */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px dashed #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                                {booking.status === 'LUNAS' ? 'INVOICE RESMI' : 'DETAIL PEMESANAN'}
                            </h1>
                            <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Booking ID: #{booking.id.split('-')[0].toUpperCase()}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ 
                                display: 'inline-block', 
                                padding: '6px 12px', 
                                borderRadius: '20px', 
                                fontSize: '0.85rem', 
                                fontWeight: 700,
                                backgroundColor: booking.status === 'LUNAS' ? '#d1fae5' : booking.status === 'BATAL' ? '#fee2e2' : '#fef3c7',
                                color: booking.status === 'LUNAS' ? '#059669' : booking.status === 'BATAL' ? '#ef4444' : '#d97706'
                            }}>
                                {booking.status.toUpperCase()}
                            </span>
                            <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '0.9rem' }}>
                                Tanggal Pesan: {new Date(booking.created_at).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Informasi Pelanggan</h3>
                            <p style={{ fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>{booking.nama}</p>
                            <p style={{ color: '#64748b', margin: '0 0 4px 0', fontSize: '0.9rem' }}>WA Utama: {booking.wa_utama}</p>
                            {booking.wa_cadangan && <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>WA Darurat: {booking.wa_cadangan}</p>}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Layanan</h3>
                            <p style={{ fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>{booking.tipe_layanan}</p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Detail Sewa</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.95rem' }}>
                            <div>
                                <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Mobil / Armada:</span>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{booking.mobil}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Paket Sewa:</span>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{booking.paket || '-'}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Tanggal & Jam Mulai:</span>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{booking.tgl_mulai ? new Date(booking.tgl_mulai).toLocaleDateString('id-ID') : '-'} {booking.jam_mulai || ''}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Durasi:</span>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{booking.durasi_hari ? `${booking.durasi_hari} Hari` : '-'}</span>
                            </div>
                            {booking.alamat_jemput && (
                                <div style={{ gridColumn: 'span 2' }}>
                                    <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Lokasi Penjemputan:</span>
                                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{booking.alamat_jemput}</span>
                                </div>
                            )}
                            {booking.rute_destinasi && (
                                <div style={{ gridColumn: 'span 2' }}>
                                    <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Rute / Destinasi:</span>
                                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{booking.rute_destinasi}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div style={{ position: 'relative', zIndex: 1, marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Rincian Biaya</h3>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#64748b' }}>
                            <span>Biaya Sewa Mobil / Paket</span>
                            <span style={{ fontWeight: 500, color: '#1e293b' }}>{formatRupiah(booking.harga_mobil)}</span>
                        </div>
                        {booking.biaya_ekstra > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#64748b' }}>
                                <span>Layanan Tambahan / Ekstra</span>
                                <span style={{ fontWeight: 500, color: '#1e293b' }}>{formatRupiah(booking.biaya_ekstra)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #e2e8f0', fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>
                            <span>Total Tagihan</span>
                            <span style={{ color: 'var(--primary)' }}>{formatRupiah(booking.total_biaya)}</span>
                        </div>
                        {booking.dp_biaya > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: '#64748b' }}>
                                <span>Estimasi DP (30%)</span>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatRupiah(booking.dp_biaya)}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            Cetak / Simpan PDF
                        </button>
                        <a href="https://wa.me/628386000740" target="_blank" className="btn btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            Hubungi Admin
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
