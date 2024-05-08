import supabase from "../repositories/connectionSupabase.js";

const fetchContents = async (req, res) => {
  const { data, error } = await supabase
    .from("adm")
    .select("id")
    .eq("email", req.body.email)
    .eq("senha", req.body.password);
  if (error) {
    res.status("Erro ao buscar dados:").send("erro");
  } else {
    if (data && data.length > 0) {
      res.send(data[0].id.toString());
    } else {
      console.log(data);
      res.send("erro");
    }
  }
};

export default fetchContents;
