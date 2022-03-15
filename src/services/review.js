import express from "express";
import pool from "../utils/db.js";

const reviewsRouter = express.Router();

//1 Get all reviews
reviewsRouter.get("/", async (req, res, next) => {
  console.log("PING - get reviews endpoint has been called");
  try {
    const data = await pool.query("SELECT * FROM review;");
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//2 POST a review
reviewsRouter.post("/", async (req, res, next) => {
  try {
    console.log(
      "POST - This is Object.values(req.body): ",
      Object.values(req.body)
    );
    console.log("POST - This is just req.body: ", req.body);

    const data = await pool.query(
      "INSERT INTO review(review_comment, rate) VALUES($1, $2) RETURNING *",
      Object.values(req.body)
    );

    const review = data.rows[0];

    res.status(201).send(review);
  } catch (error) {
    console.log(error);
  }
});

//3 PUT - EDIT review
reviewsRouter.put("/:id", async (req, res, next) => {
  console.log("PING - This is a request to edit a review");
  try {
    const data = await pool.query(
      "UPDATE review SET review_comment=$1, rate=$2 WHERE review_id=$3 RETURNING *;",
      [req.body.review_comment, req.body.rate, req.params.id]
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

//4 DELETE a review

reviewsRouter.delete("/:id", async (req, res, next) => {
  console.log("PING - this is a request to delete a product");
  try {
    const data = await pool.query("DELETE FROM review WHERE review_id=$1;", [
      req.params.id,
    ]);

    const isDeleted = data.rowCount > 0;

    if (isDeleted) res.status(204).send({ message: "Review deleted" });
    else res.status(404).send({ message: "Review not found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewsRouter;
