import encryptpwd  from "encrypt-with-password"
import dotenv from "dotenv";

dotenv.config();

const fetchContents = async (req, res) => {
    const encrypted = encryptpwd.encrypt(req.body.password.toString(), process.env.PASSWORDCRYPTO); 
    res.send(encrypted)
};

export default fetchContents;
