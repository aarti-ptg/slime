// supabase.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://lieaahcixvihrmvlklyf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpZWFhaGNpeHZpaHJtdmxrbHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NzczMjYsImV4cCI6MjAxOTM1MzMyNn0.1foRZdMYCHJFfeeXSKKzaNL99tImlK4Bs-m0kQRhUYo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
