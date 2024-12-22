import pg from "pg";
import {} from "dotenv/config";
////localPostgresCN="postgres://xxxxxx:yyyyyyy@localhost:5432/VbNetOnGoogleDisk"
// Create a PostgreSQL connection pool
export const pool = new pg.Pool({
  connectionString: process.env.localPostgresCN,
  max: 20, // Maximum number of clients in the pool (optional)
  // ... other pool configuration options ...
});

export async function pgPoolQuery(query, values = []) {
  try {
    const client = await pool.connect(); 
    try {
      const result = await client.query(query, values);
      return result; 
    } finally {
      client.release(); 
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export async function pgPoolProcedure(procedureName, parameters = []) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(`CALL ${procedureName}(?)`, [parameters]); // Parameterized query
      return result;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error calling procedure:", error);
    throw error;
  }
}


//example to use
//import { pgPoolProcedure, pgPoolQuery, pool as pgPool } from "./Func/postgrespool.js";
async function pgPoolOperation() {
  try {
    const result = await new Promise((resolve, reject) => {
      pgPoolQuery("SELECT * FROM public.entry WHERE i > 164608 ORDER BY i", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    console.log(result);
  } finally {
    await pgPool.end();
    console.log("PostgreSQL pool closed");
  }
}

// Call the functions and handle any errors
Promise.all([
  //main2().catch(console.error), // all MySQL operations
  //pgOperations().catch(console.error), // all PostgreSQL operations
  pgPoolOperation().catch(console.error),
]).then(() => {
  console.log("All database operations completed."); // Optional logging
});

// alternative way to close pgpool
//process.on("exit", () => {
//  pool.end();
//});

