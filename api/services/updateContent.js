import supabase from "../repositories/connectionSupabase.js";
import email from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const updateContent = async (req, res) => {
  if(req.body.content === "" || !req.body.content){
    res.status(400).send("O conteudo nao poder ser vazio");
    return
  }
  if(typeof req.body.id !== "number" || req.body.id === "" || !req.body.id){
    res.status(400).send("O id deve ser um numero inteiro");
    return
  }
  if(req.body.id <=0){
    res.status(400).send("O id deve ser maior que 0");
    return
  }

  if(typeof req.body.admId !== "number" || req.body.admId === "" || !req.body.admId){
    res.status(400).send("O id do adm deve ser um numero inteiro");
    return
  }
  if(req.body.admId <=0){
    res.status(400).send("O id do adm deve ser maior que 0");
    return
  }

  const { data, error } = await supabase
    .from("field")
    .update({ content: req.body.content })
    .eq("id", req.body.id);
  if (error) {
    console.log("aaaa");
    res.send("erro");
  } else {
    let dateA = generateDate();
    const { data: userContents, error: contentError } = await supabase
      .from("adm")
      .update({ update: dateA })
      .eq("id", req.body.admId);

    if (contentError) {
      res.send("Algum erro aconteceu, faça o login novamente");
    }else{
      res.send("sucesso");
    }
   
  }

};
function generateDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().padStart(4, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const formattedDateISO = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateISO;
}
export default updateContent;
