import express from "express";
import dotenv from "dotenv";
import cors  from 'cors'
import userController from './controller/manipulationContent.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.use('/', userController);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
