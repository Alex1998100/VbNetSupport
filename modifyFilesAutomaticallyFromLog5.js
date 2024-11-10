import { insert,insertWithBackup,replace,addFooter,moveText } from "./Func/replaceText.js";
import { createInterface } from "readline";
import { createReadStream } from "fs";

const okLog = "D:\\JS-VBNET-HTM\\Log\\ok.txt";
const moveTag = '<!-- include virtual="/Donate.htm" --><Donate></Donate><script type="text/javascript">fetch("/Donate.htm").then(response => response.text()).then(data => document.querySelector("Donate").innerHTML = data)</script>\r\n'
const beforeTxt = '<div  style="text-align:left; display:inline;float:left">\r\n'


/**
 * @description processing each file in OK-log what built with  buildLogWhereTextPresent.js
 */
export const modifyFromLog5 = () => {
  //step 2 - modify files
  const read = createReadStream(okLog, "utf-8");
  read.on("error", (err)=>console.log("**********" + err))
  const rl = createInterface(read);
   rl.on("line", (l) => {
    let fileName = l.split("\t");
    console.log(fileName[0] ,fileName[1]);
    if (fileName[1]) {
      moveText(fileName[1], moveTag, beforeTxt);
    }
    else console.log('***********' + l)
  });
  rl.on("close", () => {
    console.log("done.");
  });
};
