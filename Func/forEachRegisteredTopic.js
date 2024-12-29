import {} from "dotenv/config";
import { connect, disConnect, execMySQLQuery } from "./mysql.js";

async function getTopics2() {
  const topics = await execMySQLQuery("SELECT * FROM vbnet.entrance order by i desc;");
  //console.log(topics);
  return topics;
}

let topics;
let mysqlConnectionEstablished = false;
export async function forEachRegisteredTopic(processOneTopic) {
  try {
    if (!mysqlConnectionEstablished) {
      connect();
      mysqlConnectionEstablished = true;
    }
    topics = await getTopics2();
    topics.forEach((oneTopic) => {
      processOneTopic(oneTopic);
    });
  } finally {
    if (mysqlConnectionEstablished) {
      disConnect();
      mysqlConnectionEstablished = false;
    }
  }
}
