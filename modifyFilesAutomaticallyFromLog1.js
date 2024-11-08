
import { insert,insertWithBackup,replace } from "./Func/replaceText.js";
import { createInterface } from "readline";
import { createReadStream } from "fs";

const hotLink = `\r\n<!--#include virtual="/Donate.htm" -->\r\n`;

/**
 * @description processing each file in OK-log what built with  buildLogWhereTextPresent.js
 */
export const modifyFromLog1 = () => {
  //step 2 - modify files
  const read = createReadStream(okLog, "utf-8");
  const rl = createInterface(read);
  rl.on("line", (l) => {
    let fileName = l.split("\t");
    console.log(fileName[0], fileName[1]);
    if (fileName[1]) {
      insertWithBackup(fileName[1], startTxt, endTxt, hotLink);
    }
  });
  rl.on("close", () => {
    console.log("done.");
  });
};
