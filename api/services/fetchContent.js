import supabase from "../repositories/connectionSupabase.js";

const fetchContentsById = async (req, res) => {
  if (typeof req.body.id !== "number") {
    res.status(400).send("o id deve ser um numero inteiro");
    return;
  }else{
  const { data, error } = await supabase
    .from("field")
    .select("content")
    .eq("id", req.body.id);
  if (error) {
    res.status("Erro ao buscar dados:").send("erro");
  } else {
    if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(400).send("dado inexistente");
    }
  }
}
};

export default fetchContentsById;
