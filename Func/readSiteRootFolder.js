import { readdirSync, statSync } from "fs";
import * as path from "path";

/** 
* @param {string} dirPath
* @returns tuple of two arrays [retFiles, errFiles]
*/
export const readSiteRootFolder = (dirPath) => {
  let okFiles = [],
    errFiles = [],
    retFiles = [];
  try {
    okFiles = readdirSync(dirPath);
  } catch (error) {
    errFiles.push(dirPath);
  }
  okFiles.forEach((file) => {
    if (statSync(path.join(dirPath, file)).isDirectory()) retFiles.push(path.join(dirPath, file));
  });
  return [retFiles, errFiles];
};
