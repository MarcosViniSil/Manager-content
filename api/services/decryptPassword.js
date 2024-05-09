import encryptpwd  from "encrypt-with-password"
import dotenv from "dotenv";

dotenv.config();

const decryptPassword = async (req, res) => {
    const decrypted = encryptpwd.decrypt(req.body.code.toString(), process.env.PASSWORDCRYPTO)
    res.send(decrypted)
};

export default decryptPassword;
