'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

export default function AdminArtikelPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = async () => {
        if (!supabase) {
            alert('Supabase belum terhubung.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('id, title, category, created_at, slug')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setArticles(data || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
            alert('Gagal mengambil data artikel. Pastikan tabel "articles" sudah dibuat di Supabase.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simple client-side protection for demo
        const pass = prompt('Masukkan Password Admin (Hint: ketik "admin")');
        if (pass === 'admin') {
            fetchArticles();
        } else {
            alert('Akses Ditolak.');
        }
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Yakin ingin menghapus artikel "${title}"?`)) return;
        
        try {
            const { error } = await supabase!
                .from('articles')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            alert('Artikel berhasil dihapus!');
            fetchArticles(); // refresh
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Gagal menghapus artikel.');
        }
    };

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Memuat Data Artikel...</div>;

    return (
        <main style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* BREADCRUMB */}
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#64748b' }}>
                    <Link href="/admin" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Dasbor Admin</Link> &raquo; Manajemen Artikel
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '5px' }}>Portal Berita / Blog</h1>
                        <p style={{ color: '#64748b', margin: 0 }}>Kelola konten berita, tips wisata, dan promosi Anda di sini.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={fetchArticles} className="btn" style={{ background: '#e2e8f0', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Refresh Data</button>
                        <Link href="/admin/artikel/tulis" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem' }}>+</span> Tulis Artikel Baru
                        </Link>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f1f5f9' }}>
                            <tr>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Tanggal Publish</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Judul Artikel</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Kategori</th>
                                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((a) => (
                                <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px', color: '#64748b', fontSize: '0.9rem' }}>
                                        {new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{a.title}</div>
                                        <Link href={`/artikel/${a.slug}`} target="_blank" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}>/artikel/{a.slug}</Link>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>
                                            {a.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            {/* Note: Edit feature can be added later, for now we have View and Delete */}
                                            <Link href={`/artikel/${a.slug}`} target="_blank" style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>Lihat</Link>
                                            <button onClick={() => handleDelete(a.id, a.title)} style={{ padding: '6px 12px', background: '#fee2e2', color: '#ef4444', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {articles.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ padding: '50px 30px', textAlign: 'center', color: '#64748b' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📝</div>
                                        <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Belum ada artikel</h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>Mulai tulis artikel berita, tips wisata, atau promo pertama Anda.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
