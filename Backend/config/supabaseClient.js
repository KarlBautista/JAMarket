const {createClient} = require("@supabase/supabase-js")



const SUPABASE_URL = process.env.SUPABASE_DB_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
 const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

 module.exports = supabase;