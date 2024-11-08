import { insert,insertWithBackup,replace } from "./Func/replaceText.js";
import { createInterface } from "readline";
import { createReadStream } from "fs";



const okLog = "D:\\JS-VBNET-HTM\\Log\\Menu1.txt";
const endTxt = '\r\n'

// const startTxt = '<!--# include virtual="/Menu.htm" -->'
// const replacement = `\r\n<!-- include virtual="/Menu.htm" --><Menu></Menu><script type="text/javascript">fetch("/Menu.htm").then(response => response.text()).then(data => document.querySelector("Menu").innerHTML = data)</script>\r\n`;

const startTxt = '<!--# include virtual="/Years.htm" -->'
const replacement = `\r\n<!-- include virtual="/Years.htm" --><Years></Years><script type="text/javascript">fetch("/Years.htm").then(response => response.text()).then(data => document.querySelector("Years").innerHTML = data)</script>\r\n`;

/**
 * @description processing each file in OK-log what built with  buildLogWhereTextPresent.js
 */
export const modifyFromLog2 = () => {
  //step 2 - modify files
  const read = createReadStream(okLog, "utf-8");
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
