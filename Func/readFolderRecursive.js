import { readdirSync, statSync } from "fs";
import { join } from "path";
import * as path from "path";

/** 
* @description return folders recursevelly
* @param {string} dirPath - start folder
* @param {Array<string>} fileList - current array with files
* @param {Array<string>} errFiles - current array with files what can not read
* @returns tuple of two array [fileList, errFiles]
*/

export const readFolderRecursive = (dirPath, fileList, errFiles) => {
  let okFiles = [];
  fileList = fileList || [];
  errFiles = errFiles || [];
  try {
    okFiles = readdirSync(dirPath);
  } catch (error) {
    errFiles.push(dirPath);
  }

  okFiles.forEach((file) => {
    try {
      if (statSync(path.join(dirPath, file)).isDirectory()) [fileList, errFiles] = readFolderRecursive(path.join(dirPath, file), fileList, errFiles);
      else fileList.push(join(dirPath, file));
    } catch {
      errFiles.push(join(dirPath, file));
    }
  });
  return [fileList, errFiles];
};
