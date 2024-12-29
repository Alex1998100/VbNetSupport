import { findTextInFiles } from "./Func/findTextInFiles.js";
async function processFiles() {
    const rootFolder = "E:\\VB-NET\\html";
    const fileExt = ".htm";
    const ignoreFolders = ["E:\\VB-NET\\html\\.git", "E:\\VB-NET\\html\\Sql\\", "E:\\VB-NET\\html\\Dotnet\\Vb\\", "E:\\VB-NET\\html\\AspNet-DocAndSamples-2017\\", "E:\\VB-NET\\html\\VS2010_NET4_TrainingKit\\", "E:\\VB-NET\\html\\Windows\\Installer\\"];
    const startTxt = '<!-- #include virtual="/Nativescript.htm"';  
    const endTxt = "-->";

    try {
        const filesWithText = await findTextInFiles(rootFolder, fileExt, ignoreFolders, startTxt, endTxt);
        console.log(filesWithText); 
    } catch (error) {
        console.error("Error processing files:", error);
    }
}
processFiles();