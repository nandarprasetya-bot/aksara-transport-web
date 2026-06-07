-- Buat tabel 'bookings' untuk menyimpan data pesanan
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nama TEXT NOT NULL,
    wa_utama TEXT NOT NULL,
    wa_cadangan TEXT,
    tipe_layanan TEXT NOT NULL, -- (contoh: "Lepas Kunci", "1-Day Tour", "Event", dll)
    mobil TEXT NOT NULL,
    paket TEXT,
    durasi_hari INTEGER,
    tgl_mulai DATE,
    jam_mulai TIME,
    tgl_selesai DATE,
    jam_selesai TIME,
    alamat_jemput TEXT,
    alamat_kembali TEXT,
    rute_destinasi TEXT,
    catatan TEXT,
    harga_mobil NUMERIC,
    biaya_ekstra NUMERIC,
    total_biaya NUMERIC,
    dp_biaya NUMERIC,
    status TEXT DEFAULT 'Pending'
);

-- Mengizinkan pengguna publik untuk memasukkan data pesanan (Insert)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Mengizinkan pengguna publik untuk membaca pesanan berdasarkan ID (untuk invoice)
CREATE POLICY "Allow public read by id" ON public.bookings
    FOR SELECT USING (true);
