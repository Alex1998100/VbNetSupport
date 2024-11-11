import { siteStatistic } from "./getSiteStatistic.js";
import { buildLogForfindText2 } from "./buildLogWhereTextPresent2.js";
import { modifyFromLog2 } from "./modifyFilesAutomaticallyFromLog2.js";
import { modifyFromLog3 } from "./modifyFilesAutomaticallyFromLog3.js";
import { modifyFromLog4 } from "./modifyFilesAutomaticallyFromLog4.js";
import { modifyFromLog5 } from "./modifyFilesAutomaticallyFromLog5.js";
import { makeBak } from "./makeSiteBackup.js";
//import { siteFileListForExt } from "./getFilesWithExt.js";
//import { collectExtension } from "./collectExtension.js";

// ******** calculate site size **********
siteStatistic("D:\\JS-VBNET");

//******** collect extensions **********
//collectExtension()    

//******** get site extension size **********
//siteFileListForExt()    

//******** build OK-file list where text present **********
//buildLogForfindText2();

//******** make site backup **********
//makeBak()

//******** modify files follow OK-log **********
//modifyFromLog2()
//modifyFromLog3() 
//modifyFromLog4() 
//modifyFromLog5()

