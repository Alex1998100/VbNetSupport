import fs from "fs";
import { readFolderRecursive,readFolderRecursiveFiltered } from "./readFolderRecursive.js";
import path from "path";
import { text } from "stream/consumers";

/**
 * @param {string} rootFolder - The root folder to search.
 * @param {string} fileExt - The file extension to search for (e.g., ".htm").
 * @param {string[]} ignoreFolders - An array of folders to ignore.
 * @param {string} startTxt - The starting text marker.
 * @param {string} endTxt - The ending text marker.
 * @returns {Promise<Array<object>>} A Promise that resolves with an array of objects,
 * each containing the file path and an array of start/end positions.
 */
export async function findTextInFiles(rootFolder, fileExt, ignoreFolders, startTxt, endTxt) {
  const fileList = readFolderRecursiveFiltered(rootFolder, fileExt,ignoreFolders); 
  const results = [];
    for (const file of fileList) {
      if (file.endsWith(fileExt)) {
          try { 
              const data = fs.readFileSync(file, "utf-8");
              const positions = [];
              let startPos = data.indexOf(startTxt);
              while (startPos > -1) {
                  const endPos = data.indexOf(endTxt, startPos + startTxt.length);
                  if (endPos > -1) {
                      positions.push({ start: startPos, end: endPos + endTxt.length, text: data.substring(startPos, endPos + endTxt.length)  });
                      startPos = data.indexOf(startTxt, endPos + endTxt.length); 
                  } else {
                      console.error(`No endTxt "${endTxt}" found in ${file} after startTxt at position ${startPos}`);
                      startPos = -1; 
                  }
              }
              if (positions.length > 0) {
                  results.push({ filePath: file, positions });
              }
          } catch (err) {
              console.error(`Error reading file ${file}:`, err);
          }
     }
  }
  return results;
}
