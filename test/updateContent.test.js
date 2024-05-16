import request from "supertest";
import express from "express";
import router from "../api/controller/manipulationContent.js";
import dotenv from "dotenv";

dotenv.config();

const app = new express();
app.use("/", router);

describe("Integration tests endpoint /update/content", function () {
  test("should update content based on adm and return the message 'sucesso!' and return the code 200 ", async () => {
    const res = await request(app)
      .post("/update/content")
      .send({ id: 1, content: "exemplo conteudo", admId: 1 });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.type).toBe("text/html");
    expect(res.text.message).toBe("sucesso");
    expect(res.statusCode).toBe(200);
  });
  
  test("should return 'O conteudo nao poder ser vazio' and code 400 because the field content is empty ", async () => {
    const res = await request(app)
      .post("/update/content")
      .send({ id: 1, admId: 1 });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.type).toBe("text/html");
    expect(res.text.message).toBe("O conteudo nao poder ser vazio");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'O id deve ser um numero inteiro' and code 400 because the field id is an string ", async () => {
    const res = await request(app)
      .post("/update/content")
      .send({ id: "string", content: "test", admId: 1 });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.type).toBe("text/html");
    expect(res.text.message).toBe("O id deve ser um numero inteiro");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'O id deve ser maior que 0' and code 400 because the field id is an number less or equals 0 ", async () => {
    const res = await request(app)
      .post("/update/content")
      .send({ id: -1, content: "test", admId: 1 });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.type).toBe("text/html");
    expect(res.text.message).toBe("O id deve ser maior que 0");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'O id do adm deve ser um numero inteiro' and code 400 because the field admId is an string ", async () => {
    const res = await request(app)
      .post("/update/content")
      .send({ id: 1, content: "test", admId: "string" });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.type).toBe("text/html");
    expect(res.text.message).toBe("O id do adm deve ser um numero inteiro");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'O id deve ser maior que 0' and code 400 because the field admId is an number less or equals 0 ", async () => {
    const res = await request(app)
      .post("/update/content")
      .send({ id: 1, content: "test", admId: -1 });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.type).toBe("text/html");
    expect(res.text.message).toBe("O id do adm deve ser maior que 0");
    expect(res.statusCode).toBe(400);
  });
});
