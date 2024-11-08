import { bakupFile } from "./Func/bakupFile.js";
import { fileList } from "./Func/fileList.js";

const rootFolder1 = "D:\\JS-VBNET-HTM";
//const ignoreFolders1 = ["D:\\JS-VBNET-HTM\\Dotnet\\Vb\\", "D:\\JS-VBNET-HTM\\AspNet-DocAndSamples-2017\\", "D:\\JS-VBNET-HTM\\VS2010_NET4_TrainingKit\\", "D:\\JS-VBNET-HTM\\Windows\\Installer\\"];
const ignoreFolders1 = []
/**
 * @description make site backup with ignored folders
 */
export const makeBak = () => {
  fileList(rootFolder1, ".htm", ignoreFolders1, (file) => {
    bakupFile(file);
  });
};
