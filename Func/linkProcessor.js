import { readWholeFile } from "./readWholeFile.js"; 
export function extractLinks(text) {
  //const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g; extract only link content
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/g;
  let links = [];
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    links.push({
      href: match[1],
      content: match[2],
      start: match.index, // Start position of the match
      end: match.index + match[0].length, // End position of the match
    });
  }

  return links;
}

export async function* parseLinks(pageArr) {
  for (const onePage of pageArr) {
    const pageTxt = await readWholeFile(onePage);
    if (pageTxt) {
      const links = extractLinks(pageTxt);
      for (const link of links) {
        yield link;
      }
    }
  }
}

export async function getLinks(pageArr) {
  for await (const link of parseLinks(pageArr)) {
    console.log(link); // Process each link individually
  }
}
export async function getAllLinks(pageArr) {
  //collecting all links into an array
  const allLinks = [];
  for await (const link of parseLinks(pageArr)) {
    allLinks.push(link.href);
  }
  return allLinks;
}

export async function getAllLinksSorted(pageArr) {
  //collecting all links into an array
  const allLinks = [];
  for await (const link of parseLinks(pageArr)) {
    allLinks.push(link.href);
  }
  allLinks.sort((a, b) => a.localeCompare(b));
  return allLinks;
}

export async function getAllLinksSortedAndFiltered(pageArr, StartsWith) {
  //collecting all links into an array
  const allLinks = [];
  for await (const link of parseLinks(pageArr)) {
    allLinks.push(link.href);
  }
  //filter() does not modify the original array
  return allLinks.filter((x) => x.startsWith(StartsWith)).sort((a, b) => a.localeCompare(b));
}

/* example

const pages = [
  "E:\\VB-NET\\html\\2000\\Index.htm",
  "E:\\VB-NET\\html\\2001\\Index.htm",
  "E:\\VB-NET\\html\\2002\\Index.htm",]

   let res = await getAllLinksSortedAndFiltered(pages, "//www.vb-net.com")
 console.log(res)           */