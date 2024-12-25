import mysql from "mysql";
import {} from "dotenv/config";

export const connect = () => {
  const connection = mysql.createConnection(process.env.localMySqlCN);
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("MySQL Connected.");
    }
  });
  return connection; // Return the connection object
};

export const disConnect = (connection) => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
    } else {
      console.log("MySQL connection closed.");
    }
  });
};

export const execMySQLQuery = (connection, query, values = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

