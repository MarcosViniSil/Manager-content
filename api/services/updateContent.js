import supabase from "../repositories/connectionSupabase.js";
import email from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const updateContent = async (req, res) => {
  const { data, error } = await supabase
    .from("field")
    .update({ content: req.body.content })
    .eq("id", req.body.id);
  if (error) {
    res.status("Erro ao buscar dados:").send("erro");
  } else {
    try{
      await sendEmail(req.body.id, req.body.content);
    }catch (error) {
      console.log(error);
    }
    res.send("ok");
  }
};
async function sendEmail(id, content) {
  const transporter = email.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAILSENDER,
      pass: process.env.PASSWORDSENDER,
    },
    secure: false,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  const currentDate = new Date().toLocaleDateString("en-GB");
  const mailData = {
    from: process.env.EMAILSENDER,
    to: process.env.EMAILRECIVE,
    subject: `Alteração conteúdo dia ${currentDate}`,
    text: `O id ${id} foi alterado para: ${content}`,
  };

  await new Promise((resolve, reject) => {

    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

export default updateContent;
