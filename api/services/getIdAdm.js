import supabase from "../repositories/connectionSupabase.js";
import encryptpwd from "encrypt-with-password";
import dotenv from "dotenv";

dotenv.config();

const fetchContents = async (req, res) => {
  if(!req.body.email) return res.status(400).send("Email inválido")
  if(!req.body.password) return res.status(400).send("senha inválida")
  if(typeof req.body.email !== "string") return res.status(400).send("email deve ser uma string")
  if(typeof req.body.password !== "string") return res.status(400).send("senha deve ser uma string")
  if(req.body.email === "") return res.status(400).send("Email nao pode ser vazio")
  if(req.body.password === "") return res.status(400).send("senha nao pode ser vazia")

  const passwordAdm = getPassword(req.body.password)
  if(passwordAdm === "") return res.status(400).send({message:"Senha inexistente"})
  const { data, error } = await supabase
    .from("adm")
    .select("id")
    .eq("email", req.body.email)
    .eq("senha", passwordAdm);
  if (error) {
    res.status("Erro ao buscar dados:").send({message:"erro"});
  } else {
    if (data && data.length > 0) {
      res.send({message:data[0].id.toString()});
    } else {
      res.send({message:"erro"});
    }
  }
};

function getPassword(password){
  try {
    const decrypted = encryptpwd.decrypt(
      password,
      process.env.PASSWORDCRYPTO
    );
    return decrypted
  } catch (e) {
    return ""
  }
}

export default fetchContents;
