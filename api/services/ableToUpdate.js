import supabase from "../repositories/connectionSupabase.js";
import encryptpwd from "encrypt-with-password";
import dotenv from "dotenv";

dotenv.config();

const admAble = async (req, res) => {
  if(!req.body.email) return res.status(400).send("Email inválido")
  if(!req.body.password) return res.status(400).send("senha inválida")
  if(typeof req.body.email !== "string") return res.status(400).send("email deve ser uma string")
  if(typeof req.body.password !== "string") return res.status(400).send("senha deve ser uma string")
  if(req.body.email === "") return res.status(400).send("Email nao pode ser vazio")
  if(req.body.password === "") return res.status(400).send("senha nao pode ser vazia")
  
    try {

    const { data: userData, error: userError } = await supabase
      .from("adm")
      .select("id")
      .eq("email", req.body.email)
      .eq("senha", req.body.password );

    if (userError) {
      throw new Error("Erro ao buscar dados do usuário");
    }
    if (userData && userData.length > 0) {
      const userId = parseInt(userData[0].id.toString());

      const { data: userContents, error: contentError } = await supabase
        .from("field")
        .select("id")
        .eq("id_adm", userId)
        .eq("id",req.body.id)

      if (contentError) {
        throw new Error("Erro ao buscar dados de conteúdo do usuário");
      }

      if (userContents && userContents.length > 0) {
       
        res.status(200).send({message:"autorizado"});
      } else {
        res.status(400).send({message:"negado"});
      }
    } else {
        res.status(400).send({message:"usuario invalido"});
    }
  } catch (error) {
    res.status(400).send({message:"erro"});
  }

};





export default admAble;
