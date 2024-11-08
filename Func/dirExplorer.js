import fs from "fs";
import * as path from "path";

export let dirExplorer = {
  count: 0,
  result: [],
  ext: "*.htm",
  setExt(fileExtension) {
    this.ext = fileExtension;
  },
  start: function exproreDirRecursive(dir, doneCallback) {
    let folders = [];
    fs.readdir(dir, (err, list) => {
      if (err) return doneCallback(err);
      var i = 0;
      //recursive IIFE
      (function next() {
        var file = list[i++];
        if (!file) return doneCallback(null, dirExplorer.result);
        file = path.resolve(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            exproreDirRecursive(file, function (err, res) {
              folders = folders.concat(res);
              next();
            });
          } else {
            if (file.endsWith(dirExplorer.ext)) {
              dirExplorer.count++;
              //console.log(dirExplorer.count, file);
              dirExplorer.result.push(file);
            }
            next();
          }
        });
      })();
    });
  },
};
