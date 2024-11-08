import { dirExplorer} from "./dirExplorer.js";
/**
 *
 * @param {string} rootFolder - root folder, for example "D:\\JS-VBNET-HTM"
 * @param {string} fileExt  - extension ".htm"
 * @param {string[]} ignoreSubfolder - for example ["D:\\JS-VBNET-HTM\\Sql\\",""D:\\JS-VBNET-HTM\\Dotnet\\Vb\\""]
 * @param {function(string):void} processingFileCalback - frunction for processing each file
 */
export function fileList(rootFolder, fileExt, ignoreSubfolder, processingFileCalback) {
    dirExplorer.setExt(fileExt)
    dirExplorer.start(rootFolder, (err, result) => {
    console.log(`found ${result.length} files`);
    if (err) throw err;
    result.sort().forEach((file) => {
      for (let i = 0; i < ignoreSubfolder.length; i++) {
        if (file.indexOf(ignoreSubfolder[i]) > -1) {
          return;
        }
      }
      processingFileCalback(file);
    });
  });
}
