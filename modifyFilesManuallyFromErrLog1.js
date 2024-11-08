import { createInterface } from "readline";
import { replaceWithBackup, replace } from "./Func/replaceText.js";


const startTxt = `<br><br>\r\n`;
const endTxt = `<div  style="text-align:left; display:inline;float:left">\r\n`;
const hotLink = `\r\n<!--#include virtual="/Donate.htm" -->\r\n`;

/**
 * @description modify files on simple error filelist
 */
export const modifyManually = () => {
  const read = createReadStream("D:\\JS-VBNET-HTM\\Log\\err4.txt", "utf-8");
  const rl = createInterface(read);
  let n = 0;
  rl.on("line", (fileName) => {
    console.log(n++, fileName);
    if (fileName) {
      replaceWithBackup(fileName, startTxt, endTxt, hotLink);
    }
  });
  rl.on("close", () => {
    console.log("done.");
  });
};
