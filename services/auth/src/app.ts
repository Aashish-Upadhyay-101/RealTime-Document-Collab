import express, { Express } from "express";

const app: Express = express();

app.get("/home", (req, res) => {
  res.send({
    message: "home page !",
  });
});

app.get("/haha", (req, res) => {
  res.send({
    message: "Hello folks from Restrictify!",
    text: process.env.POSTGRES_USER,
    status: "success",
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "index page",
  });
});

export default app;
