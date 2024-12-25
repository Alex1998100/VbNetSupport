import { readFolderRecursive } from "./Func/readFolderRecursive.js";
import { replace } from "./Func/replaceText.js";
import { connect, disConnect, execMySQLQuery } from "./Func/mysqlasync.js";
import Path from "path";

//working asynchronously without pool
async function getTopics2(DbTags) {
  if (!DbTags || DbTags.trim() === "") {
    console.warn("Empty DbTags provided. Returning empty array.");
    return [];
  }
  const connection = connect();
  const topics = await execMySQLQuery(connection, "SELECT * FROM vbnet.entrance WHERE Tags LIKE ?", [`%${DbTags}%`]);
  await disConnect(connection);
  return topics;
}

async function getTopicWithTags(DbTags) {
  const topics = await getTopics2(DbTags);
  return topics;
}

async function main() {
  const result = await getTopicWithTags("Access");
  console.log(result);
}

main().catch((error) => {
  console.error("Main error:", error);
});
