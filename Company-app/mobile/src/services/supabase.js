import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration
export const SUPABASE_URL = 'YOUR_SUPABASE_URL';
export const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
export const IS_DEMO = !SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL';

let supabaseClient = null;

if (!IS_DEMO) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    });
}

export const supabase = supabaseClient;
