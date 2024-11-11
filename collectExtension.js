import { readFolderRecursive } from "./Func/readFolderRecursive.js";
import { fileList } from "./Func/fileList.js";
import { extname } from "path";

/**
 * @param {string} startFolder - start folder
 * @param {string} errCallback - Function, callback to process non readable folder
 * @description return folders recursevelly
 * @returns tuple of two numeric [okFiles.length, totalSize]
 */
export const collectExtension = (startFolder) => {
  const [okFiles, errFiles] = readFolderRecursive(startFolder);
  let ext = new Set();
  okFiles.forEach((x) => ext.add(extname(x)));
  let arr = Array.from(ext).sort();
    arr.forEach((x) => console.log(x));
  };

collectExtension("D:\\JS-VBNET");
