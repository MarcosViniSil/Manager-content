import express from "express";
import projectsUser from "../services/addContentADM.js";
import fetchContents from "../services/fetchContentsAdm.js";

const router = express.Router();

router.use(express.json());

router.post('/validate/adm', projectsUser);
router.post('/contents', fetchContents);

export default router;