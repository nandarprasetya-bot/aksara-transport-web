const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://igqccmqvwmbkmxgjxmqe.supabase.co';
const supabaseAnonKey = 'sb_publishable_9tG8Ppef0ZXnfwL2onsuqQ_OsAYJdPD';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('bookings').insert([{
        nama: 'Test',
        wa_utama: '08123',
        tipe_layanan: 'Test',
        mobil: 'Test',
        status: 'Pending'
    }]).select('id').single();

    if (error) {
        console.error('ERROR:', error);
    } else {
        console.log('SUCCESS:', data);
    }
}

test();
