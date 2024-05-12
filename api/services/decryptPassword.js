import encryptpwd from "encrypt-with-password";
import dotenv from "dotenv";

dotenv.config();

const decryptPassword = async (req, res) => {
  if (!req.body.code || req.body.code === "") {
    res.status(400).send("código inválido");
  } else {
    try {
      const decrypted = encryptpwd.decrypt(
        req.body.code.toString(),
        process.env.PASSWORDCRYPTO
      );
      const response = {
        passwordDecrypted: decrypted,
      };
      res.send(JSON.stringify(response));
    } catch (e) {
      res.status(400).send("código inválido");
    }
  }
};

export default decryptPassword;
