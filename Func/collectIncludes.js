import { findTextInFiles } from "./Func/findTextInFiles.js";
async function processFiles() {
  const rootFolder = "E:\\VB-NET\\html";
  const fileExt = ".htm";
  const ignoreFolders = ["E:\\VB-NET\\html\\.git", "E:\\VB-NET\\html\\Sql\\", "E:\\VB-NET\\html\\Dotnet\\Vb\\", "E:\\VB-NET\\html\\AspNet-DocAndSamples-2017\\", "E:\\VB-NET\\html\\VS2010_NET4_TrainingKit\\", "E:\\VB-NET\\html\\Windows\\Installer\\"];
  const startTxt = '<!-- include virtual="';
  const endTxt = "-->";

  try {
    const filesWithText = await findTextInFiles(rootFolder, fileExt, ignoreFolders, startTxt, endTxt);
    let ind=0;
    let colellctedIncludes = new Set();
    filesWithText.forEach((fileData) => {
      let printFile = false;
      fileData.positions.forEach((position) => {
        if (position.text !== '<!-- include virtual="/Menu.htm" -->' &&
            position.text !== '<!-- include virtual="/Donate.htm" -->' &&
            position.text !== '<!-- include virtual="/Years.htm" -->' &&
            position.text !== '<!-- include virtual="/HotLink.htm" -->') {
                if(!printFile){ 
                    console.log(`File: ${ind++} ${fileData.filePath}`);
                    printFile = true; 
                    colellctedIncludes.add(position.text);
                }
                console.log(`  Text: ${position.text}`); // Print this position's text
        }
      });

   });
   console.log(colellctedIncludes);
  } catch (error) {
    console.error("Error processing files:", error);
  }
}
processFiles();
