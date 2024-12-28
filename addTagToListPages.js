import { getLinks, parseLinks, extractLinks, getAllLinks, getAllLinksSorted, getAllLinksSortedAndFiltered } from "./Func/linkProcessor.js";
import { connect, disConnect, execMySQLQuery } from "./Func/mysqlasync.js";
import { getWrongLinks, getCorrectLinks, getCorrectLinksForPage, getAllLinksForPage } from "./Func/checkLinksForDb.js";
import { readWholeFile, writeWholeFile } from "./Func/readWholeFile.js";
import { checkLink } from "./Func/checkLinksForDb.js";
import { bakupFile, copyWithRenameFile } from "./Func/bakupFile.js";

const pages = [
    "E:\\VB-NET\\html\\2016\\Index.htm",/*
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
  "E:\\VB-NET\\html\\Notes\\Index.htm",*/
];
const pagesRelative = pages.map((page) => page.replace("E:\\VB-NET\\html", "").replace(/\\/g, "/"));
pagesRelative.push(...["/Wanted/Index.htm", "/map.htm"]);

async function processOnePage1(pagePath) {
  for await (const Link of getAllLinksForPage(pagePath)) {
    const pageTxt = await readWholeFile(pagePath);
    const pagePresent = pagesRelative.find((x) => x === Link.link.href);
    if (!pagePresent) {
      console.log(`Found link in ${pagePath}:`, Link.link.href, pagePresent);
      if (Link.result[0]) {
        writeWholeFile(pagePath, pageTxt.substring(0, Link.link.start) + `<a href="${Link.link.href}">${Link.link.content}</a> &nbsp; ${Link.result[0].TagText}` + pageTxt.substring(Link.link.end));
        //console.log(pageTxt.substring(0, Link.link.start) + `<a href="${Link.link.href}">${Link.link.content}</a>&nbsp; ${Link.result[0].TagText}` + pageTxt.substring(Link.link.end));
      }
    }
  }
}

async function processOnePage(pagePath) {
  let processedLinks = new Set();
  processing: while (true) {
    let pageTxt = await readWholeFile(pagePath);
    if (!pageTxt) return;
    let allLinks = await extractLinks(pageTxt);
    for (const link of allLinks) {
      if (processedLinks.has(link.href)) {
        continue;
      }
      if (link.href.endsWith(".htm")) {
        let result = await checkLink(link.href);
        const pagePresent = pagesRelative.find((x) => x === link.href);
        if (!pagePresent && result.length > 0) {
          const newLink = `<a href="${link.href}">${link.content}</a> &nbsp; ${result[0].TagText}`;
          pageTxt = pageTxt.substring(0, link.start) + newLink + pageTxt.substring(link.end);
          await writeWholeFile(pagePath, pageTxt);
          processedLinks.add(link.href);
          continue processing;
        }
      }
    }
    break;
  }
}

pages.forEach(async (page) => {
  //bakupFile(page);
  await processOnePage(page).catch(console.error);
});

/*
pages.forEach(async (page) => {
  await copyWithRenameFile(page + ".bak1", page);
});
*/