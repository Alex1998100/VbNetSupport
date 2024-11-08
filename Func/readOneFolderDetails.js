import { statSync } from "fs";
import { readFolderRecursive } from "./readFolderRecursive.js";

/** 
* @param {string} startFolder - start folder
* @param {string} errCallback - Function, callback to process non readable folder
* @description return folders recursevelly
* @returns tuple of two numeric [okFiles.length, totalSize]
*/
export const readOneFolderDetails = (startFolder, errCallback) => {
  const [okFiles, errFiles] = readFolderRecursive(startFolder);
  let totalSize = 0;
  okFiles.forEach((x) => (totalSize += statSync(x).size));
  errCallback(errFiles);
  return [okFiles.length, totalSize];
};

