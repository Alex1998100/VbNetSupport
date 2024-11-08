import { convertBytes } from "./convertBytes.js";
import { readSiteRootFolder } from "./readSiteRootFolder.js";
import { readOneFolderDetails } from "./readOneFolderDetails.js";

/**
 * @param {Array<string>} errFiles - array of wrong not readable files
 */
export let wrongFileProcessing = (errFiles) => {
  if (errFiles.length > 0) {
    console.log("Wrong files:");
    errFiles.forEach((x) => console.log(x));
  }
};

/**
 * @param {string} startFolder - start folder
 * @description print to console all site root folder staticstic
 */
export let readSiteStatistic = (startFolder) => {
  let limit = 0;
  let [topFolder] = readSiteRootFolder(startFolder);
  topFolder.sort().forEach((x) => {
    let [dirSize, totalSize] = readOneFolderDetails(x, wrongFileProcessing);
    limit += totalSize;
    console.log(`${x}$${dirSize} files$${totalSize}$${convertBytes(limit)}`);
  });
};
