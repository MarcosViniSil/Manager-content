import supabase from "../repositories/connectionSupabase.js";
import email from "nodemailer"
import dotenv from "dotenv";
import sendEmail from "./sendEmail.js";

dotenv.config();

const updateContent = async (req, res) => {
  const { data, error } = await supabase
    .from("field")
    .update({ content: req.body.content })
    .eq("id", req.body.id)
  if (error) {
    res.status("Erro ao buscar dados:").send("erro");
  } else {
    await sendEmail(req,res,req.body.id,req.body.content)
    res.send("ok");
  }
};


export default updateContent;
