import pg from "pg";

const { Pool } = pg;

const pool = new Pool();

export const testDbConnection = async (query) => {
  try {
    const result = await pool.query(query);
    console.log("Result of a test from db.js is: ", result.rows);
  } catch (error) {
    console.log(error);
  }
};

export default pool;
