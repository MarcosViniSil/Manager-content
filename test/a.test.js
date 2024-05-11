import request  from "supertest"
import express from "express"
import router from "../api/controller/manipulationContent.js"
import dotenv from "dotenv";

dotenv.config();

const app = new express();
app.use('/', router);

describe('Good Home Routes', function () {

  test('responds to /', async () => {
    const res = await request(app).post('/encrypt/password').send({password:"senha"});
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});