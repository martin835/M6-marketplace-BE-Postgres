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

//3 PUT - EDIT product
productsRouter.put("/:id", async (req, res, next) => {
  console.log("PING - This is a request to edit a product");
  try {
    const data = await pool.query(
      "UPDATE product SET product_name=$1, image=$2, description=$3, price=$4 WHERE product_id=$5 RETURNING *;",
      [
        req.body.product_name,
        req.body.image,
        req.body.description,
        req.body.price,
        req.params.id,
      ]
    );

    const isUpdated = data.rowCount > 0;

    if (isUpdated) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(404).send({ message: "Cannot be edited - Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//4 DELETE a product

productsRouter.delete("/:id", async (req, res, next) => {
  console.log("PING - this is a request to delete a product");
  try {
    const data = await pool.query("DELETE FROM product WHERE product_id=$1;", [
      req.params.id,
    ]);

    const isDeleted = data.rowCount > 0;

    if (isDeleted) res.status(204).send({ message: "Product deleted" });
    else res.status(404).send({ message: "Product not found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productsRouter;
