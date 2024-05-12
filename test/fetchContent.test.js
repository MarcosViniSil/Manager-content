import request  from "supertest"
import express from "express"
import router from "../api/controller/manipulationContent.js"
import dotenv from "dotenv";

dotenv.config();

const app = new express();
app.use('/', router);

describe('Integration tests endpoint /content/id', function () {
  
    test("should fetch content based on id and return should be an json and code 200 ", async () => {
        const res = await request(app).post('/content/id').send({id:1});
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.type).toBe("application/json")
        expect(res.statusCode).toBe(200);
      });

      test("id doesn't exists so, should return the message 'dado inexistente' and code 400 ", async () => {
        const res = await request(app).post('/content/id').send({id:-1});
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.type).toBe("text/html")
        expect(res.text).toBe("dado inexistente")
        expect(res.statusCode).toBe(400);
      });

      test("it's passed an string to id so should return the message 'o id deve ser um numero inteiro' and code 400", async () => {
        const res = await request(app).post('/content/id').send({id:"string"});
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.type).toBe("text/html")
        expect(res.text).toBe("o id deve ser um numero inteiro")
        expect(res.statusCode).toBe(400);
      });
  
  });