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

/**
 * Recursively reads a folder, filtering by file extension and ignoring specified folders.
 *
 * @param {string} dirPath - The path to the directory to read.
 * @param {string} fileExt - The file extension to filter by (e.g., ".htm").
 * @param {string[]} ignoreFolders - An array of folder paths to ignore.  These should be  absolute paths for reliable comparison.
 * @returns {string[]} An array of file paths that match the extension and are not in ignored folders.
 */
export function readFolderRecursiveFiltered(dirPath, fileExt, ignoreFolders) {
  const fileList = [];
  try {
    const files = readdirSync(dirPath);
    for (const file of files) {
      const filePath = join(dirPath, file);
      if (ignoreFolders.some((folder) => filePath.startsWith(folder))) {
        continue;
      }
      try {
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
          fileList.push(...readFolderRecursiveFiltered(filePath, fileExt, ignoreFolders));
        } else if (file.endsWith(fileExt)) {
          fileList.push(filePath);
        }
      } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dirPath}: `, err);
  }
  return fileList;
}
