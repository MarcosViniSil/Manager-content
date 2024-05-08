import express from "express";
import projectsUser from "../services/addContentADM.js";
import fetchContents from "../services/fetchContentsAdm.js";
import updateContent from "../services/updateContent.js";
import fetchContent from "../services/fetchContent.js";

const router = express.Router();

router.use(express.json());

router.post('/validate/adm', projectsUser);
router.post('/contents/adm', fetchContents);
router.post('/update/content', updateContent);
router.post('/content/id', fetchContent);
export default router;