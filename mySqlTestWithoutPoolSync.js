import {} from "dotenv/config";
import { connect, disConnect, execMySQLQuery } from "./Func/mysql.js";



//working asynchronously without pool
async function getTopics2() {
  const topics = await execMySQLQuery("SELECT * FROM vbnet.entrance order by i desc;");
  console.log(topics);
  return topics;
}

let topics;
let mysqlConnectionEstablished = false; // Flag to track MySQL connection status  or we receive multiple times 'Error closing MySQL connection: Error: Cannot enqueue Quit after invoking quit."
async function main2() {
  try {
    if (!mysqlConnectionEstablished) {
      connect();
      mysqlConnectionEstablished = true;
    }
    topics = await getTopics2();
  } finally {
    if (mysqlConnectionEstablished) {
      disConnect();
      mysqlConnectionEstablished = false;
    }
  }
}

main2().catch(console.error); 