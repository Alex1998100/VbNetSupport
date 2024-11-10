import fs from "fs";
import { bakupFile } from "./bakupFile.js";
import { guid} from "./newGuid.js"

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

export function replace(fileName, startTxt, endTxt, replacement) {
  const data = fs.readFileSync(fileName, "utf-8");
  let startPos = data.indexOf(startTxt);
  let stoptPos = data.indexOf(endTxt);
  if (startPos > 0  && stoptPos > 0) {
    const out = fs.createWriteStream(fileName);
    out.write(`${data.substring(0, startPos)}${replacement}${data.substring(startPos + startTxt.length)}`);
    out.end;
    out.close;
  }
  else {
    console.log("********* " + fileName)
  }
}

export function addFooter(fileName, startTxt, endTxt, replacement) {
  const data = fs.readFileSync(fileName, "utf-8");
  let fileNameSections = fileName.replace('.htm','').split('\\');
  fileNameSections.shift();
  fileNameSections.shift();
  replacement = replacement.replaceAll('@@@', guid())
  replacement = replacement.replace('#!#', '/'+fileNameSections.join('/')+'.htm')
  replacement = replacement.replace('#*#', fileNameSections.join('/')+'.htm')
  let startPos = data.indexOf(startTxt);
  if (startPos > 0 ) {
    const out = fs.createWriteStream(fileName);
    out.write(`${data.substring(0, startPos)}${replacement}${data.substring(startPos + startTxt.length)}`);
    out.end;
    out.close;
  }
  else {
    console.log("********* " + fileName)
    out.end;
    out.close;
  }
}

export function moveText(fileName, moveTag, beforeTxt) {
  const data = fs.readFileSync(fileName, "utf-8");
  let movePos = data.indexOf(moveTag);
  let beforePos = data.indexOf(beforeTxt);
  if (movePos > 0 && beforePos > 0) {
    const out = fs.createWriteStream(fileName);
    out.write(`${data.substring(0, movePos)}${data.substring(movePos+movePos.length, beforeTxt-movePos-movePos.length-1)}${moveTag}${data.substring(beforePos)}`);
    out.end;
    out.close;
  }
}