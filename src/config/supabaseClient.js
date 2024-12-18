//importere  funktion createClient fra supabase bibloteket. Opretter en instans af supabase og autentificere brugere via API'er
import { createClient } from '@supabase/supabase-js'

// henter vores variable.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

//process.env er et globalet ojekt i Nodejs
export default supabase