import { getLinks, parseLinks, extractLinks, getAllLinks, getAllLinksSorted, getAllLinksSortedAndFiltered } from "./Func/linkProcessor.js";
import { connect, disConnect, execMySQLQuery } from "./Func/mysqlasync.js";
import { getWrongLinks, getCorrectLinks, getCorrectLinksForPage } from "./Func/checkLinksForDb.js";

const pages = [
  "E:\\VB-NET\\html\\2000\\Index.htm",
  "E:\\VB-NET\\html\\2001\\Index.htm",
  "E:\\VB-NET\\html\\2002\\Index.htm",
  "E:\\VB-NET\\html\\2003\\Index.htm",
  "E:\\VB-NET\\html\\2004\\Index.htm",
  "E:\\VB-NET\\html\\2005\\Index.htm",
  "E:\\VB-NET\\html\\2006\\Index.htm",
  "E:\\VB-NET\\html\\2007\\Index.htm",
  "E:\\VB-NET\\html\\2008\\Index.htm",
  "E:\\VB-NET\\html\\2009\\Index.htm",
  "E:\\VB-NET\\html\\2010\\Index.htm",
  "E:\\VB-NET\\html\\2011\\Index.htm",
  "E:\\VB-NET\\html\\2012\\Projects.htm",
  "E:\\VB-NET\\html\\2013\\Projects.htm",
  "E:\\VB-NET\\html\\2014\\Index.htm",
  "E:\\VB-NET\\html\\2015\\Index.htm",
  "E:\\VB-NET\\html\\2015\\Index.htm",
  "E:\\VB-NET\\html\\2017\\Index.htm",
  "E:\\VB-NET\\html\\2018\\Index.htm",
  "E:\\VB-NET\\html\\2019\\Index.htm",
  "E:\\VB-NET\\html\\2020\\Index.htm",
  "E:\\VB-NET\\html\\2021\\Index.htm",
  "E:\\VB-NET\\html\\2022\\Index.htm",
  "E:\\VB-NET\\html\\2023\\Index.htm",
  "E:\\VB-NET\\html\\2024\\Index.htm",
  "E:\\VB-NET\\html\\Linux\\Index.htm",
  "E:\\VB-NET\\html\\Flex\\Index.htm",
  "E:\\VB-NET\\html\\Core\\Index.htm",
  "E:\\VB-NET\\html\\MVC\\Index.htm",
  "E:\\VB-NET\\html\\Asp2\\Index.htm",
  "E:\\VB-NET\\html\\Dotnet\\Index.htm",
  "E:\\VB-NET\\html\\DataAccessReview\\Index.htm",
  "E:\\VB-NET\\html\\Terminal\\Index.htm",
  "E:\\VB-NET\\html\\Notes\\Index.htm",
  "E:\\VB-NET\\html\\Sql\\Index.htm",
  "E:\\VB-NET\\html\\Software\\Index.htm",
  "E:\\VB-NET\\html\\Documentation\\Index.htm",
  "E:\\VB-NET\\html\\XML\\Index.htm",
  "E:\\VB-NET\\html\\Task\\Index.htm",
  "E:\\VB-NET\\html\\Notes\\Index.htm",
];

async function processingAllFiles(pageArr) {
  let wrongLink = await getWrongLinks(pageArr);
  console.log(wrongLink);
}
await processingAllFiles(pages).catch(console.error);

async function processOnePage(pagePath) {
  for await (const correctLink of getCorrectLinksForPage(pagePath)) {
      console.log(`Found link in ${pagePath}:`, correctLink); 
  }
}
//await processOnePage(pages[0]).catch(console.error);