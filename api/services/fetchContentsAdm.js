import supabase from "../repositories/connectionSupabase.js";

const projectsUser = async (req, res) => {
  try {

    const { data: userData, error: userError } = await supabase
      .from("adm")
      .select("id")
      .eq("email", req.body.email)
      .eq("senha", req.body.password);

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

export default projectsUser;
