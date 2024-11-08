import { checkText } from "./Func/checkText.js";

const rootFolder = "D:\\JS-VBNET-HTM\\";
//const ignoreFolders = ["D:\\JS-VBNET-HTM\\Sql\\", "D:\\JS-VBNET-HTM\\Dotnet\\Vb\\", "D:\\JS-VBNET-HTM\\AspNet-DocAndSamples-2017\\", "D:\\JS-VBNET-HTM\\VS2010_NET4_TrainingKit\\", "D:\\JS-VBNET-HTM\\Windows\\Installer\\"];
const okLog = "D:\\JS-VBNET-HTM\\Log\\ok.txt";
const errLogs = ["D:\\JS-VBNET-HTM\\Log\\err1.txt", "D:\\JS-VBNET-HTM\\Log\\err2.txt", "D:\\JS-VBNET-HTM\\Log\\err3.txt"];
const ignoreFolders = []
// const startTxt = `<br><br>\r\n`;
// const endTxt = `<div  style="text-align:left; display:inline;float:left">\r\n`;

const startTxt = '<!--#'
const endTxt = '-->'

/**
 * @description build correct filelist from files ready to modification automatically (usually step 1 prepare to automatic changing)
 * @description allow find multiline text in site *.htm files (with ignore some folders)
 */
export const buildLogForfindText1 = () => {
    checkText(rootFolder, ".htm", ignoreFolders, startTxt, endTxt, okLog, errLogs);
};
