import request  from "supertest"
import express from "express"
import router from "../api/controller/manipulationContent.js"
import dotenv from "dotenv";

dotenv.config();

const app = new express();
app.use('/', router);

describe('Integration tests endpoints /decrypt/password and /encrypt/password', function () {

  test('should encrypt password, return an text and code 200', async () => {
    const res = await request(app).post('/encrypt/password').send({password:"senha"});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.type).toBe("text/html")
    expect(res.statusCode).toBe(200);
  });

  test("password was not sent so, should return the message 'senha inválida' and code 400", async () => {
    const res = await request(app).post('/encrypt/password').send({});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.type).toBe("text/html")
    expect(res.text).toBe("senha inválida")
    expect(res.statusCode).toBe(400);
  });

  test("an string empty sent so, should return the message 'senha inválida' and the code 400", async () => {
    const res = await request(app).post('/encrypt/password').send({password:""});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.type).toBe("text/html")
    expect(res.text).toBe("senha inválida")
    expect(res.statusCode).toBe(400);
  });

  test("should return 'example password' based on 77a42f6815a58334d7bf7f5dd25d2026:11e2067c84622db14568067c8a6a7f51d412627e517c118eefdad80150965867 ", async () => {
    const res = await request(app).post('/decrypt/password').send({code:"77a42f6815a58334d7bf7f5dd25d2026:11e2067c84622db14568067c8a6a7f51d412627e517c118eefdad80150965867"});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.type).toBe("text/html")
    expect(res.text).toBe('{\"passwordDecrypted\":\"example password\"}');
    expect(res.statusCode).toBe(200);
  });
  test("should return 'código inválido' and code 400 because code was not passed ", async () => {
    const res = await request(app).post('/decrypt/password').send({});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.type).toBe("text/html")
    expect(res.text).toBe('código inválido');
    expect(res.statusCode).toBe(400);
  });

  test("should return 'código inválido' and code 400 because code is invalid ", async () => {
    const res = await request(app).post('/decrypt/password').send({code:"not valid"});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.type).toBe("text/html")
    expect(res.text).toBe('código inválido');
    expect(res.statusCode).toBe(400);
  });

});