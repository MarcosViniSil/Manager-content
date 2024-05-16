import request from "supertest";
import express from "express";
import router from "../api/controller/manipulationContent.js";
import dotenv from "dotenv";

dotenv.config();

const app = new express();
app.use("/", router);

describe("Integration tests endpoint /contents/adm", function () {

  test("should return contents adm and return code 200 ", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":"testeEmail@gmail.com",
        "password":"3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
  });

  test("should return 'Email inválido' because email is not present and code 400", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "password":"3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("Email inválido")
    expect(res.statusCode).toBe(400);
  });

 test("should return 'senha inválida' because password is not present and code 400", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":"testeEmail@gmail.com",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("senha inválida")
    expect(res.statusCode).toBe(400);
  });

  test("should return 'senha deve ser uma string' because password is not an string and code 400 ", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":"testeEmail@gmail.com",
        "password":1,
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("senha deve ser uma string")
    expect(res.statusCode).toBe(400);
  });

  test("should return 'email deve ser uma string' because email is not an string and code 400 ", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":1,
        "password":"3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("email deve ser uma string")
    expect(res.statusCode).toBe(400);
  });

  test("should return 'Email inválido' because email is an string empty and code 400 ", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":"",
        "password":"3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("Email inválido")
    expect(res.statusCode).toBe(400);
  });

  test("should return 'senha inválida' because password is an string empty and code 400 ", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":"testeEmail@gmail.com",
        "password":"",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("senha inválida")
    expect(res.statusCode).toBe(400);
  });

  test("should return 'Senha inexistente' because password not exists and code 400", async () => {
    const res = await request(app)
      .post("/contents/adm")
      .send({ 
        "email":"testeEmail@gmail.com",
        "password":"33",
        "userId":1
       });
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.type).toBe("text/html")
    expect(res.text.message).toBe("Senha inexistente")
    expect(res.statusCode).toBe(400);
  });

},30000);
