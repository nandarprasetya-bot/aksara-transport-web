'use client';
import { useEffect, useState, use } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function AdminAccPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const params = use(searchParams);
    const id = params.id;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleAcc = async (e: React.FormEvent) => {
        e.preventDefault();
        const pass = (e.target as any).password.value;
        if (pass !== 'admin') {
            alert('Password salah!');
            return;
        }

        if (!id) {
            alert('ID Pesanan tidak ditemukan.');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: 'LUNAS' })
                .eq('id', id);
            
            if (error) throw error;
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert('Gagal meng-ACC pesanan. Periksa koneksi internet Anda.');
        } finally {
            setLoading(false);
        }
    };

    if (!id) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Error: ID Pesanan tidak valid.</div>;
    }

    if (success) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
                    <h1 style={{ color: '#059669', marginBottom: '8px', fontSize: '1.5rem', fontWeight: 800 }}>Sukses ACC!</h1>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>Pesanan dengan ID #{id.split('-')[0].toUpperCase()} telah berhasil diubah menjadi LUNAS.</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Anda bisa menutup halaman ini dan membalas WA pelanggan.</p>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                <h1 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '1.5rem', fontWeight: 800 }}>Konfirmasi ACC</h1>
                <p style={{ color: '#64748b', marginBottom: '24px' }}>Masukkan password admin untuk mengubah status pesanan #{id.split('-')[0].toUpperCase()} menjadi <strong>LUNAS</strong>.</p>
                
                <form onSubmit={handleAcc} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password Admin" 
                        required 
                        style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '1rem', textAlign: 'center' }}
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ padding: '12px', background: '#10b981', color: 'white', borderRadius: '6px', fontSize: '1rem', fontWeight: 800, border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading ? 'Memproses...' : 'Tandai Lunas'}
                    </button>
                </form>
            </div>
        </main>
    );
}
