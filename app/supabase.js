// supabase.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://cidqlffaivqamvhqsetk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZHFsZmZhaXZxYW12aHFzZXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NDk4OTcsImV4cCI6MjAxOTUyNTg5N30.LcFMKQyqn864bKoAu8EKu1m1bAuMjGmomWySzIwr7u8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
