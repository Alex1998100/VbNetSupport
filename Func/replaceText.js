import fs from "fs";
import { bakupFile } from "./bakupFile.js";

/**
 * @param {string} fileName file we handles
 * @param {string} startTxt start text marker
 * @param {string} endTxt end text marker
 * @param {string} insertTxt text need to replace between end of start marker and start of end marker
 */
export function insertWithBackup(fileName, startTxt, endTxt, insertTxt) {
  const data = fs.readFileSync(fileName, "utf-8");
  let startPos = data.indexOf(startTxt);
  let stoptPos = data.indexOf(endTxt);
  if (startPos > 0 && stoptPos > 0) {
    bakupFile(fileName);
    const out = fs.createWriteStream(fileName);
    out.write(`${data.substring(0, startPos + startTxt.length)}${insertTxt}${data.substring(stoptPos)}`);
    out.end;
    out.close;
  }
}

export function insert(fileName, startTxt, endTxt, insertTxt) {
  const data = fs.readFileSync(fileName, "utf-8");
  let startPos = data.indexOf(startTxt);
  let stoptPos = data.indexOf(endTxt);
  if (startPos > 0 && stoptPos > 0) {
    //bakupFile(fileName);
    const out = fs.createWriteStream(fileName);
    out.write(`${data.substring(0, startPos + startTxt.length)}${insertTxt}${data.substring(stoptPos)}`);
    out.end;
    out.close;
  }
}

export function replace(fileName, startTxt, endTxt, insertTxt) {
  const data = fs.readFileSync(fileName, "utf-8");
  let startPos = data.indexOf(startTxt);
  if (startPos > 0 ) {
    const out = fs.createWriteStream(fileName);
    out.write(`${data.substring(0, startPos)}${insertTxt}${data.substring(startPos + startTxt.length)}`);
    out.end;
    out.close;
  }
  else {
    console.log("********* " + fileName)
    out.end;
    out.close;
  }
}

