'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function AdminPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            alert('Gagal mengambil data pesanan.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simple client-side protection for demo
        const pass = prompt('Masukkan Password Admin (Hint: ketik "admin")');
        if (pass === 'admin') {
            fetchBookings();
        } else {
            alert('Akses Ditolak.');
        }
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        if (!confirm(`Ubah status pesanan ini menjadi ${newStatus}?`)) return;
        
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', id);
            
            if (error) throw error;
            alert('Status berhasil diubah!');
            fetchBookings(); // refresh
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Gagal mengubah status.');
        }
    };

    const formatRupiah = (angka: number) => {
        if (!angka) return 'Rp 0';
        return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Memuat Data Admin...</div>;

    return (
        <main style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>Dasbor Admin</h1>
                    <button onClick={fetchBookings} className="btn btn-secondary">Refresh Data</button>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f1f5f9' }}>
                            <tr>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Tanggal & ID</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Pelanggan</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Layanan</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Total Tagihan</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Status</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{new Date(b.created_at).toLocaleDateString('id-ID')}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>#{b.id.split('-')[0].toUpperCase()}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{b.nama}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{b.wa_utama}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ color: '#1e293b' }}>{b.tipe_layanan}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{b.mobil}</div>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 600, color: '#1e293b' }}>
                                        {formatRupiah(b.total_biaya)}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ 
                                            display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700,
                                            backgroundColor: b.status === 'LUNAS' ? '#d1fae5' : b.status === 'BATAL' ? '#fee2e2' : '#fef3c7',
                                            color: b.status === 'LUNAS' ? '#059669' : b.status === 'BATAL' ? '#ef4444' : '#d97706'
                                        }}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <a href={`/detail-pesanan/${b.id}`} target="_blank" style={{ padding: '6px 12px', background: '#e2e8f0', color: '#475569', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>Lihat</a>
                                            {b.status !== 'LUNAS' && (
                                                <button onClick={() => updateStatus(b.id, 'LUNAS')} style={{ padding: '6px 12px', background: '#10b981', color: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>ACC Lunas</button>
                                            )}
                                            {b.status !== 'BATAL' && (
                                                <button onClick={() => updateStatus(b.id, 'BATAL')} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Batal</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Belum ada pesanan masuk.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
