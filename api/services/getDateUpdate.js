import supabase from "../repositories/connectionSupabase.js";
import encryptpwd from "encrypt-with-password";
import dotenv from "dotenv";

dotenv.config();

const getDateUpdate = async (req, res) => {

  const { data, error } = await supabase
    .from("adm")
    .select("update")
    .eq("id", req.params.id)
  if (error) {
    res.status("Erro ao buscar dados:").send({message:"erro"});
  } else {
    if (data && data.length > 0) {
      res.send(data[0]);
    } else {
      res.send({message:"erro"});
    }
  }
};

export default getDateUpdate;