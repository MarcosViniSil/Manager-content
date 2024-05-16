import supabase from "../repositories/connectionSupabase.js";

const fetchContentsById = async (req, res) => {
  if (typeof req.body.id !== "number") {
    res.status(400).send({message:"o id deve ser um numero inteiro"});
    return;
  }else{
  const { data, error } = await supabase
    .from("field")
    .select("content,title")
    .eq("id", req.body.id);
  if (error) {
    res.status("Erro ao buscar dados:").send({message:"erro"});
  } else {
    if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(400).send({message:"dado inexistente"});
    }
  }
}
};

export default fetchContentsById;
