import encryptpwd from "encrypt-with-password";
import dotenv from "dotenv";

dotenv.config();

const fetchContents = async (req, res) => {
  if (!req.body.password || req.body.password === "") {
     res.status(400).send("senha inválida");
  } else {
    const encrypted = encryptpwd.encrypt(
      req.body.password.toString(),
      process.env.PASSWORDCRYPTO
    );
    const response = {
      passwordCrypted: encrypted,
    };
    res.send(JSON.stringify(response));
  }
};

export default fetchContents;
