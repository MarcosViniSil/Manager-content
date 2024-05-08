import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";


dotenv.config();

const supabaseUrl = process.env.URL;
const supabaseAnonKey = process.env.TOKEN;
console.log(supabaseUrl)
console.log(supabaseAnonKey)

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase