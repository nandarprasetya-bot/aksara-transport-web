-- 1. Create Owners Table
CREATE TABLE public.owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    profit_share_percentage INTEGER DEFAULT 70, -- Contoh: 70% owner, 30% Aksara
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Cars Table
CREATE TABLE public.cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.owners(id),
    name VARCHAR(255) NOT NULL,
    plate_number VARCHAR(50) UNIQUE NOT NULL,
    monthly_installment DECIMAL(12, 2) DEFAULT 0,
    is_sub_rental BOOLEAN DEFAULT FALSE,
    sub_rental_cost DECIMAL(12, 2) DEFAULT 0, -- Harga dasar sewa dari rekanan jika is_sub_rental = true
    status VARCHAR(50) DEFAULT 'available', -- available, rented, maintenance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Drivers Table
CREATE TABLE public.drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'available', -- available, on_duty
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Update Bookings Table (Menambahkan kolom baru ke tabel yang sudah ada)
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS car_id UUID REFERENCES public.cars(id),
ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES public.drivers(id),
ADD COLUMN IF NOT EXISTS barcode VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS actual_return_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS overtime_hours INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_blacklist BOOLEAN DEFAULT FALSE;

-- 5. Create Car Handovers Table (Serah Terima)
CREATE TABLE public.car_handovers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES public.drivers(id),
    car_id UUID REFERENCES public.cars(id),
    handover_type VARCHAR(50) NOT NULL, -- 'OUT' (Serah ke Tamu) atau 'IN' (Kembali dari Tamu)
    fuel_level_percent INTEGER,
    fuel_image_url TEXT,
    body_annotated_image_url TEXT, -- Gambar 4 sisi mobil yang sudah dicoret-coret
    ktp_image_url TEXT,
    signature_url TEXT,
    checklist_stnk BOOLEAN DEFAULT FALSE,
    checklist_ban_serep BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Ledgers Table (Buku Keuangan & Profit Sharing)
CREATE TABLE public.ledgers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    car_id UUID REFERENCES public.cars(id),
    owner_id UUID REFERENCES public.owners(id),
    transaction_date DATE DEFAULT CURRENT_DATE,
    transaction_type VARCHAR(50) NOT NULL, -- 'INCOME' (Uang masuk tamu), 'EXPENSE' (Bensin/Supir), 'PROFIT_SHARE' (Uang bersih ke Owner)
    description TEXT,
    amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Disable RLS (Row Level Security) sementara untuk mempermudah pengembangan Admin
ALTER TABLE public.owners DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_handovers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ledgers DISABLE ROW LEVEL SECURITY;
