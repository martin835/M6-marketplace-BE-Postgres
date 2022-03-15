import express from "express";
import { testDbConnection } from "./utils/db.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import productsRouter from "./services/product.js";
import reviewsRouter from "./services/review.js";
// *********************************** GLOBAL VARs ***********************************
const server = express();
const port = process.env.PORT;

// *********************************** MIDDLEWARES ***********************************
server.use(cors());
server.use(express.json());
// *********************************** ENDPOINTS *************************************
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

// ********************************** ERROR HANDLERS *********************************

//********************************** SERVER RUNNING *********************************
console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Server listening at: " + port);
  testDbConnection("SELECT 3+10 as result; ");
});

server.on("error", (error) => {
  console.log("Server not listening due to error: " + error);
});
