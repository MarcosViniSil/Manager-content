import supabase from "../repositories/connectionSupabase.js";
import email from "nodemailer"
import dotenv from "dotenv";


dotenv.config();

const updateContent = async (req, res) => {
  const { data, error } = await supabase
    .from("field")
    .update({ content: req.body.content })
    .eq("id", req.body.id)
  if (error) {
    res.status("Erro ao buscar dados:").send("erro");
  } else {
   sendEmail(req.body.id,req.body.content)
    res.send("ok");
  }
};


 function sendEmail(id,content){
    var transporter = email.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.PASSWORDSENDER
        }
      });
      const currentDate = new Date().toLocaleDateString('en-GB')
      var mailOptions = {
        from: process.env.EMAILSENDER,
        to: process.env.EMAILRECIVE,
    
        subject: `Alteração conteúdo dia ${currentDate}`,
        text:  `O id ${id} foi alterado para: ${content}`
      };
 
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });

}

export default updateContent;
