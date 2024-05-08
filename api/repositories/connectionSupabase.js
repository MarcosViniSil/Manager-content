import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";


dotenv.config();

const supabaseUrl = process.env.URL;
const supabaseAnonKey = process.env.TOKEN;


const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase