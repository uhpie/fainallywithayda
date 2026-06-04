-- Jadual untuk RSVP
CREATE TABLE public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    pax INTEGER NOT NULL DEFAULT 1,
    attendance TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jadual untuk Ucapan (Wishes)
CREATE TABLE public.wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tetapkan Row Level Security (RLS) supaya client boleh Insert / Select

-- Untuk RSVP
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to rsvps" ON public.rsvps
    FOR INSERT WITH CHECK (true);

-- (Pilihan) Jika anda mahu memaparkan senarai RSVP di dashboard admin nanti:
CREATE POLICY "Allow public select from rsvps" ON public.rsvps
    FOR SELECT USING (true);


-- Untuk Wishes
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to wishes" ON public.wishes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select from wishes" ON public.wishes
    FOR SELECT USING (true);
