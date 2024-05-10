import encryptpwd  from "encrypt-with-password"
import dotenv from "dotenv";

dotenv.config();

const decryptPassword = async (req, res) => {
    const decrypted = encryptpwd.decrypt(req.body.code.toString(), process.env.PASSWORDCRYPTO)
    const response = {
        passwordDecrypted: decrypted
    }
    res.send(JSON.stringify(response))
};

export default decryptPassword;
