import mysql from "mysql";
import {} from "dotenv/config";
//localMySqlCN="mysql://xxxxxxxx:yyyyyyy@127.0.0.1:3306/vbnet"
// Create a connection pool
export const pool = mysql.createPool(process.env.localMySqlCN);



// Query with parameters and with Connection Pool
export async function executeMySQLQuery(query, values = []) {
  try {
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });

    const results = await new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    connection.release();
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

// Get a connection from the pool and Release the connection back to the pool
export async function callMySQLProcedure(procedureName, parameters) {
  try {
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });
    const result = await new Promise((resolve, reject) => {
      connection.query(`CALL ${procedureName}(?)`, [parameters], (err, results) => {
        // Use placeholders '?' even if no parameters
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    connection.release();
    return result;
  } catch (error) {
    console.error("Error calling procedure:", error);
    throw error;
  }
}

// Example Usages wth pool and handle any errors in the example1 function
async function example1() {
  try {
    const topics = await getTopics(); // Call your database function
  } finally {
    // Ensure the pool is closed even if there's an error
    pool.end((err) => {
      if (err) {
        console.error("Error closing MySQL pool:", err);
      } else {
        console.log("MySQL pool closed successfully.");
      }
    });
  }
}
//example1().catch(console.error); 

async function example2() {
  try {
    // Example 1:  SELECT query with parameters
    const users = await executeMySQLQuery("SELECT * FROM users WHERE id = ? AND status = ?", [1, "active"]);
    console.log(users);

    // Example 2: INSERT query
    const insertResult = await executeMySQLQuery("INSERT INTO products (name, price) VALUES (?, ?)", ["New Product", 9.99]);
    console.log("Insert ID:", insertResult.insertId); // Get the auto-incremented ID

    // Example 3:  Query with no parameters
    const allProducts = await executeMySQLQuery("SELECT * FROM products");
    console.log(allProducts);
  } catch (err) {
    console.error("An error occurred in the example:", err);
  }
}

async function example3() {
  // Case 1: Procedure with parameters (e.g., an IN parameter)
  const results1 = await callMySQLProcedure("your_procedure_name", [123]); // Pass parameter value(s) as an array
  console.log("Results with parameters:", results1);

  // Case 2: Procedure without parameters:
  const results2 = await callMySQLProcedure("another_procedure", []); // Empty array for no parameters
  console.log("Results no parameters:", results2);
}
// Good practice to end the pool when your application closes
process.on("exit", () => {
  pool.end();
});
