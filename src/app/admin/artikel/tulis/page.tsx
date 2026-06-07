'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function TulisArtikelPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Wisata');
    const [imageUrl, setImageUrl] = useState('/images/tour_merapi.webp'); // Default image
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple client-side protection for demo
        const pass = prompt('Masukkan Password Admin (Hint: ketik "admin")');
        if (pass !== 'admin') {
            alert('Akses Ditolak.');
            return;
        }

        if (!title || !content || !excerpt) {
            alert('Harap isi semua kolom wajib (Judul, Ringkasan, Isi Berita).');
            return;
        }

        if (!supabase) {
            alert('Supabase belum terhubung. Tidak bisa menyimpan.');
            return;
        }

        try {
            setLoading(true);
            const slug = generateSlug(title);
            
            const { error } = await supabase
                .from('articles')
                .insert([
                    {
                        title: title,
                        slug: slug,
                        category: category,
                        image: imageUrl,
                        excerpt: excerpt,
                        content: content
                    }
                ]);

            if (error) throw error;
            
            alert('Artikel Berhasil Dipublikasikan!');
            router.push('/admin/artikel');
            
        } catch (error: any) {
            console.error('Error publishing article:', error);
            if (error.code === '23505') {
                alert('Gagal: Judul artikel ini sudah pernah digunakan (Slug duplikat). Silakan ganti judul Anda.');
            } else {
                alert('Terjadi kesalahan saat mempublikasikan artikel.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {/* BREADCRUMB */}
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#64748b' }}>
                    <Link href="/admin" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Dasbor Admin</Link> &raquo;{' '}
                    <Link href="/admin/artikel" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Manajemen Artikel</Link> &raquo; Tulis Baru
                </div>

                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '30px' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>Tulis Artikel Baru</h1>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Judul Artikel *</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: 5 Destinasi Wisata Wajib di Jogja 2026"
                                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Kategori</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: '#fff' }}
                                >
                                    <option value="Wisata">Wisata</option>
                                    <option value="Kuliner">Kuliner</option>
                                    <option value="Berita Jogja">Berita Jogja</option>
                                    <option value="Tips">Tips Perjalanan</option>
                                    <option value="Promo">Promo & Diskon</option>
                                </select>
                            </div>
                            <div style={{ flex: 2, minWidth: '300px' }}>
                                <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>URL Foto Thumbnail (Opsional)</label>
                                <input 
                                    type="text" 
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="/images/tour_merapi.webp atau https://..."
                                    style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Ringkasan Singkat (Excerpt) *</label>
                            <textarea 
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Tuliskan 1-2 kalimat ringkasan yang akan muncul di daftar berita..."
                                style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical' }}
                                required
                            />
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '5px 0 0 0' }}>Disarankan maksimal 150 karakter untuk tampilan terbaik.</p>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Isi Berita Lengkap *</label>
                            <div style={{ background: '#f8fafc', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px 8px 0 0', display: 'flex', gap: '10px' }}>
                                {/* Fake toolbar to look like a CMS editor */}
                                <span style={{ fontWeight: 'bold', cursor: 'pointer', padding: '2px 8px', background: '#e2e8f0', borderRadius: '4px' }}>B</span>
                                <span style={{ fontStyle: 'italic', cursor: 'pointer', padding: '2px 8px', background: '#e2e8f0', borderRadius: '4px' }}>I</span>
                                <span style={{ cursor: 'pointer', padding: '2px 8px', background: '#e2e8f0', borderRadius: '4px' }}>🔗 Link</span>
                                <span style={{ cursor: 'pointer', padding: '2px 8px', background: '#e2e8f0', borderRadius: '4px' }}>🖼️ Gambar</span>
                            </div>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Tulis isi artikel Anda secara lengkap di sini. Anda bisa menggunakan sintaks HTML sederhana (seperti <br> untuk baris baru, atau <b>tebal</b>)."
                                style={{ width: '100%', padding: '15px', border: '1px solid #cbd5e1', borderTop: 'none', borderRadius: '0 0 8px 8px', fontSize: '1rem', fontFamily: 'inherit', minHeight: '350px', resize: 'vertical', lineHeight: 1.6 }}
                                required
                            />
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                            <Link href="/admin/artikel" className="btn" style={{ padding: '12px 24px', background: '#e2e8f0', color: '#475569', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Batal</Link>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn btn-primary" 
                                style={{ padding: '12px 30px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? 'Memproses...' : '🚀 Publikasikan Artikel'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
