import express from "express";
import pool from "../utils/db.js";

const productsRouter = express.Router();

//1 Get all products
productsRouter.get("/", async (req, res, next) => {
  console.log("PING - get products endpoint has been called");
  try {
    const data = await pool.query("SELECT * FROM product;");
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productsRouter;
