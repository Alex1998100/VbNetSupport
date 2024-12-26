import { readFolderRecursive } from "./Func/readFolderRecursive.js";
import { replace } from "./Func/replaceText.js";
import { connect, disConnect, execMySQLQuery } from "./Func/mysqlasync.js";
import Path from "path";
import { all } from "axios";
import { allowedNodeEnvironmentFlags } from "process";

async function getTopics2(DbI) {
  if (!DbI) {
    console.warn("Empty DbTags provided. Returning empty array.");
    return [];
  }
  const connection = connect();
  const topics = await execMySQLQuery(connection, "SELECT * FROM vbnet.entrance where i = ?;", [DbI]);
  await disConnect(connection);
  return topics;
}


async function getTopicWithTags(DbI) {
  const topics = await getTopics2(DbI);
  return topics;
}

async function saveTopicTagTxt(DbI, Txt) {
    const connection = connect();
    const topics = await execMySQLQuery(connection, "Update vbnet.entrance set TagText = ? where i = ?;", [Txt,DbI]);
    await disConnect(connection);
  }


async function main() {
    for (let i = 1; i < 959; i++) {
        const oneTopic = await getTopicWithTags(i).catch((err) => {
            console.error(`Error fetching topics for ${i}:`, err);
            return [];
          });
          if (oneTopic[0] === undefined) {
            console.log(`Error fetching topics for ${i}:`)
            break;
          }
          console.log(oneTopic);
          let allTags = oneTopic[0].Tags.split(" ")
          allTags.sort((a, b) => {
            return a > b; 
          });
          let tagTxt = " "
          allTags.forEach(onetag=>{
              tagTxt +=`<a href="/Tags/${onetag}.htm"><span style="color:gray;">#${onetag}</span></a>&nbsp;`
          })
          console.log(i,allTags);
          saveTopicTagTxt(i,tagTxt)
    }
}

main().catch((error) => {
  console.error("Main error:", error);
});
