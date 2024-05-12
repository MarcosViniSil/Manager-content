import supabase from "../repositories/connectionSupabase.js";
import encryptpwd from "encrypt-with-password";
import dotenv from "dotenv";

dotenv.config();

const projectsUser = async (req, res) => {
  if(!req.body.email) return res.status(400).send("Email inválido")
  if(!req.body.password) return res.status(400).send("senha inválida")
  if(typeof req.body.email !== "string") return res.status(400).send("email deve ser uma string")
  if(typeof req.body.password !== "string") return res.status(400).send("senha deve ser uma string")
  if(req.body.email === "") return res.status(400).send("Email nao pode ser vazio")
  if(req.body.password === "") return res.status(400).send("senha nao pode ser vazia")
  try {
    const passwordAdm = getPassword(req.body.password)
    if(passwordAdm === "") return res.status(400).send("Senha inexistente")
    const { data: userData, error: userError } = await supabase
      .from("adm")
      .select("id")
      .eq("email", req.body.email)
      .eq("senha", passwordAdm);

    if (userError) {
      throw new Error("Erro ao buscar dados do usuário");
    }
    if (userData && userData.length > 0) {
      const userId = parseInt(userData[0].id.toString());

      const { data: userContents, error: contentError } = await supabase
        .from("field")
        .select("id,content")
        .eq("id_adm", userId);

      if (contentError) {
        throw new Error("Erro ao buscar dados de conteúdo do usuário");
      }

      if (userContents && userContents.length > 0) {
        const sortedContents = userContents.sort((a, b) => a.id - b.id);
        res.send(sortedContents);
      } else {
        res.send("Nenhum conteúdo encontrado para este usuário");
      }
    } else {
      res.send("Usuário não encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao processar a solicitação");
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


export default projectsUser;
