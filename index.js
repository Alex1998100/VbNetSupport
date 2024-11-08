import { siteStatistic } from "./getSiteStatistic.js";
import { buildLogForfindText2 } from "./buildLogWhereTextPresent2.js";
import { modifyFromLog2 } from "./modifyFilesAutomaticallyFromLog2.js";
import { makeBak } from "./makeSiteBackup.js";

// ******** calculate site size **********
//siteStatistic("D:\\JS-VBNET-HTM");

//******** build OK-file list where text present **********
//buildLogForfindText2();

//******** make site backup **********
//makeBak()

//******** modify files follow OK-log **********
modifyFromLog2()
