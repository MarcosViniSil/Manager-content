import supabase from "../repositories/connectionSupabase.js";

const fetchContentsById = async (req, res) => {
  const { data, error } = await supabase
    .from("field")
    .select("content")
    .eq("id", req.body.id)
  if (error) {
    res.status("Erro ao buscar dados:").send("erro");
  } else {
    if (data && data.length > 0) {
      res.send(data);
    } else {
      res.send("vazio");
    }
  }
};

export default fetchContentsById;
