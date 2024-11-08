import { fs } from "fs";
import {readline} from "readline"

const read = fs.createReadStream("F:\\TMP\\fl.txt", "utf-8");
const rl = readline.createInterface(read);
console.log(`<html>\r\n<body>\r\n<ol>`);
rl.on("line", (x) => {
  console.log(`<li><a href="${x}">${x}</a></li>`);
});
rl.on("close", () => {
  console.log("</ol></body></html>");
});
