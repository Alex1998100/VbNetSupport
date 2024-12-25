import { readFolderRecursive } from "./Func/readFolderRecursive.js";
import { replace } from "./Func/replaceText.js";
import { connect, disConnect, execMySQLQuery } from "./Func/mysqlasync.js";
import Path from "path";
import { all } from "axios";
import { allowedNodeEnvironmentFlags } from "process";

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
  let num = 0;
  const [okFiles, errFiles] = readFolderRecursive("E:\\VB-NET\\html\\Tags");
  for (const fileName of okFiles) {
    num = num + 1;
    if (fileName !== "Index.htm" && fileName.endsWith(".htm")) {
      //console.log(num, fileName);
      let TagName = Path.parse(fileName).name;
      const topics = await getTopicWithTags(TagName).catch((err) => {
        console.error(`Error fetching topics for ${TagName}:`, err);
        return [];
      });
      topics.sort((a, b) => {
        const yearA = new Date(a.CrDate).getFullYear();
        const yearB = new Date(b.CrDate).getFullYear();
        return yearB - yearA; 
      });
      console.log("Topics for", TagName, topics);
      let txt = "<ul>\n";
      topics.forEach((one) => {
        let allTags = one.Tags.split(" ")
        let tagTxt = " "
        allTags.sort((a, b) => {
            return a > b; 
          });
        allTags.forEach(onetag=>{
            tagTxt +=`<a href="/Tags/${onetag}.htm"><span style="color:gray;">#${onetag}</span></a>&nbsp;`
        })
        tagTxt += ""
        const date = new Date(one.CrDate);
        const year = date.getFullYear();
        txt += `<li> (${year}) <a href="${one.URL}">${one.TXT.replaceAll("<br>", " ")}"</a> ${tagTxt}</li>\n`;
      });
      txt += "</ul>\n";
      console.log(txt);

       replace(fileName,"@@@","\n",txt)
    }
  }
}

main().catch((error) => {
  console.error("Main error:", error);
});
