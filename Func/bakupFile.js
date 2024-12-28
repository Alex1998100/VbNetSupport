import fs from "fs";
/**
 * @param {string} fileName
 * @description Create fail backup up to 9 depth
 */
export function bakupFile(fileName) {
  if (fs.existsSync(fileName)) {
    let bak = [];
    for (let i = 0; i < 10; i++) {
      bak.push(fs.existsSync(`${fileName}.bak${i + 1}`));
    }
    if (fs.existsSync(`${fileName}.bak9`)) {
      fs.unlinkSync(`${fileName}.bak9`);
      console.log(`${fileName}.bak9`, "=>", "delete");
    }
    for (let i = 8; i > 0; i--) {
      if (bak[i - 1]) {
        console.log(`${fileName}.bak${i}`, "=>", `${fileName}.bak${i + 1}`);
        fs.renameSync(`${fileName}.bak${i}`, `${fileName}.bak${i + 1}`);
      }
    }
    if (fs.existsSync(fileName)) {
      fs.renameSync(fileName, `${fileName}.bak1`);
      console.log(`${fileName}     `, "=>", `${fileName}.bak1`);
    }
  }
};


export function copyWithRenameFile(sourcePath, destinationPath) {

  fs.copyFile(sourcePath, destinationPath, (err) => {  // Callback provided
      if (err) {
          console.error(`Error copying or renaming file:`, err);
          // Handle the error as needed
      } else {
          console.log(`File copied and renamed from ${sourcePath} to ${destinationPath}`);
      }
  });
}
