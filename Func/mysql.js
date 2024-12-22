import mysql from "mysql";
import {} from "dotenv/config";
//localMySqlCN="mysql://xxxxxxxx:yyyyyyy@127.0.0.1:3306/vbnet"
const connection = mysql.createConnection(process.env.localMySqlCN);

//connect immediately in one CN without pool
export const connect = () =>
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("MySQL Connected.");
  });

export async function execMySQLQuery(query, values = []) {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export const disConnect = () =>
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
    } else {
      console.log("MySQL connection closed.");
    }
  });

// example to use
async function getTopics2() {
  const topics = await execMySQLQuery("SELECT * FROM vbnet.entrance order by i desc;");
  console.log(topics);
  return topics;
}
async function main2() {
  try {
    connect();
    const topics = await getTopics2();
  } finally {
    disConnect();
  }
}
//main2().catch(console.error);  // Handle any errors in the main function
