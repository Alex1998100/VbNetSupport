import { getLinks, parseLinks, extractLinks, getAllLinks, getAllLinksSorted, getAllLinksSortedAndFiltered } from "./linkProcessor.js";
import { connect, disConnect, execMySQLQuery } from "./mysqlasync.js";
import { readWholeFile } from "./readWholeFile.js";


async function checkLink(link) {
  const connection = connect();
  const result = await execMySQLQuery(connection, "SELECT * FROM vbnet.entrance where URL like ? ;", [`%${link}%`]);
  await disConnect(connection);
  return result;
}

async function getWrongLinks(pageArr) {
  let wrongLink = new Set();
  for await (const link of parseLinks(pageArr)) {
    if (link.href.endsWith(".htm")) {
      let result = await checkLink(link.href);
      if (result.length == 0) {
        let clearLink = link.href.replace(/\/+$/, "").replace(/\?.*$/, "").trim();
        if (!wrongLink.has(clearLink)) {
          wrongLink.add(clearLink);
        }
      }
    }
  }
  const wrongLinksArray = Array.from(wrongLink)
    .filter((x) => !x.includes("/VS2015"))
    .sort((a, b) => a.localeCompare(b));
  return wrongLinksArray;
}

async function* getCorrectLinks(pageArr) {
  for await (const link of parseLinks(pageArr)) {
    if (link.href.endsWith(".htm")) {
      let result = await checkLink(link.href);
      if (result.length !== 0) {
        let clearLink = link.href.replace(/\/+$/, "").replace(/\?.*$/, "").trim();
        if (!x.includes("/VS2015")) {
          yield clearLink;
        }
      }
    }
  }
}

async function* getCorrectLinksForPage(pagePath) {
  const pageTxt = await readWholeFile(pagePath); 
  if (pageTxt) {
    const links = extractLinks(pageTxt);
    for (const link of links) {
      if (link.href.endsWith(".htm")) {
        let result = await checkLink(link.href);
        if (result.length !== 0) {
          let clearLink = link.href.replace(/\/+$/, "").replace(/\?.*$/, "").trim();
          if (!clearLink.includes("/VS2015")) {
            yield link;
          }
        }
      }
    }
  }
}

export { getWrongLinks, getCorrectLinks, getCorrectLinksForPage };
