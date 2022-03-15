import express from "express";
import { testDbConnection } from "./utils/db.js";

const server = express();

const port = process.env.PORT;

server.listen(port, () => {
  console.log("Server listening at: " + port);
  testDbConnection("SELECT 3+10 as result; ");
});

server.on("error", (error) => {
  console.log("Server not listening due to error: " + error);
});
