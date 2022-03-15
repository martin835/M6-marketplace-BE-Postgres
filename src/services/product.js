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

//2 POST a product
productsRouter.post("/", async (req, res, next) => {
  try {
    console.log(
      "POST - This is Object.values(req.body): ",
      Object.values(req.body)
    );
    console.log("POST - This is just req.body: ", req.body);

    const data = await pool.query(
      "INSERT INTO product(product_name, price, description) VALUES($1, $2, $3) RETURNING *",
      Object.values(req.body)
    );

    const product = data.rows[0];

    res.status(201).send(product);
  } catch (error) {
    console.log(error);
  }
});
