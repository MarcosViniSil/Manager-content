import request from "supertest";
import express from "express";
import router from "../api/controller/manipulationContent.js";
import dotenv from "dotenv";

dotenv.config();

const app = new express();
app.use("/", router);

describe("Integration tests endpoint /validate/adm", function () {

  test("should return id adm and return code 200 ", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: "testeEmail@gmail.com",
      password:
        "3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.statusCode).toBe(200);
  });

  test("should return 'Email inválido' and code 400 because field email was not found ", async () => {
    const res = await request(app).post("/validate/adm").send({
      password:
        "3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:Email inválido}");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'senha inválido' and code 400 because field password was not found ", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: "testeEmail@gmail.com",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:senha inválida}");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'email deve ser uma string' and code 400 because field email isn't an string ", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: 12,
      password:
        "3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:email deve ser uma string}");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'senha deve ser uma string' and code 400 because field password isn't an string ", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: "testeEmail@gmail.com",
      password: 12,
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:senha deve ser uma string}");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'Email inválido' and code 400 because field email is empty", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: "",
      password:
        "3392602c45537ffa84373a4b4f175165:5d54c5382f89b9936ebb0685bb94682a",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:Email inválido}");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'senha nao pode ser vazio' and code 400 because field password is empty", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: "testeEmail@gmail.com",
      password: "",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:senha inválida}");
    expect(res.statusCode).toBe(400);
  });

  test("should return 'Senha inexistente' and code 400 because field password is not valid", async () => {
    const res = await request(app).post("/validate/adm").send({
      email: "testeEmail@gmail.com",
      password: "wrong password",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.type).toBe("application/json");
    expect(res.text).toBe("{message:Senha inexistente}");
    expect(res.statusCode).toBe(400);
  });

}, 40000);
