import { readSiteStatistic } from "./Func/readSiteStatistic.js";
import fs from "fs";

const okLog = "D:\\JS-VBNET-HTM\\Log\\ok.txt"



/**
 * @description build site statistic
 */
let okStream = fs.createWriteStream(okLog);
okStream.write(new Date().toUTCString() + "\r\n");
export const siteStatistic = (rootFolder) => {
  readSiteStatistic(rootFolder);
};
