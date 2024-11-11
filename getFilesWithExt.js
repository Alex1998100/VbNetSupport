import { fileList } from "./Func/fileList.js";
import fs from "fs";
import {convertBytes} from "./Func/convertBytes.js"

/**
 * @description site files list with certain extension
 */
export const siteFileListForExt = () => {
  
  const rootFolder = "D:\\JS-VBNET";
  const ignoreFolders = [];
  const ext = ".avi";   
  const okLog = "D:\\JS-VBNET-HTM\\Log\\avi.txt";


  let okStream = fs.createWriteStream(okLog);
  okStream.write(new Date().toUTCString() + "\r\n");
  let i = 0;
  let total = 0;
  fileList(rootFolder, ext, ignoreFolders, (file) => {
    let stat = fs.statSync(file)
    total += stat.size
    console.log(`${i++}$${file}$${convertBytes(stat.size)}$${convertBytes(total)}`);
    okStream.write(`${i++}$${file}$${convertBytes(stat.size)}$${convertBytes(total)}\r\n`);
  });
  okStream.end;
  okStream.close;
};

siteFileListForExt();
    