import { insert,insertWithBackup,replace,addFooter } from "./Func/replaceText.js";
import { createInterface } from "readline";
import { createReadStream } from "fs";

const okLog = "D:\\JS-VBNET-HTM\\Log\\ok.txt";
const startTxt = '<br><br>\r\n'
const endTxt = '<div  style="text-align:left; display:inline;float:left">\r\n'


const replacement = `\r\n<br><br>\r\n<!--#include virtual="/Donate.htm" -->\r\n`;


/**
 * @description processing each file in OK-log what built with  buildLogWhereTextPresent.js
 */
export const modifyFromLog4 = () => {
  //step 2 - modify files
  const read = createReadStream(okLog, "utf-8");
  read.on("error", (err)=>console.log("**********" + err))
  const rl = createInterface(read);
   rl.on("line", (l) => {
    let fileName = l.split("\t");
    console.log(fileName[0] ,fileName[1]);
    if (fileName[1]) {
      replace(fileName[1], startTxt, endTxt, replacement);
    }
    else console.log('***********' + l)
  });
  rl.on("close", () => {
    console.log("done.");
  });
};
