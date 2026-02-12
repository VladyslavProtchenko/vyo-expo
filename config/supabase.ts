import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mtdxajnzoabnozlhzbyc.supabase.co'
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZHhham56b2Fibm96bGh6YnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMTYxNzksImV4cCI6MjA4Mzg5MjE3OX0.aa3D8PbcM8BtEaKW3ctWKdFkHl4Ij8dWyUvDJej2FXE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
