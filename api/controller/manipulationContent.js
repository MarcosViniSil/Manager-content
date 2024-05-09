import express from "express";
import projectsUser from "../services/getIdAdm.js";
import fetchContents from "../services/fetchContentsAdm.js";
import updateContent from "../services/updateContent.js";
import fetchContent from "../services/fetchContent.js";
import crypt from "../services/encryptPassword.js"
import decrypt from "../services/decryptPassword.js"
const router = express.Router();

router.use(express.json());

router.post('/validate/adm', projectsUser);
router.post('/contents/adm', fetchContents);
router.post('/update/content', updateContent);
router.post('/content/id', fetchContent);
router.post('/encrypt/password', crypt);
router.post('/decrypt/password', decrypt);
export default router;