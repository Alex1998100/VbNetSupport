import { presentTags, tagText, tags, checkTagPresentExist } from "./contextTags.js";
import { readWholeFile, writeWholeFile } from "./Func/readWholeFile.js";
import { urlToWindowsPath } from "./Func/urlToWindowsPath.js";
import { forEachRegisteredTopic } from "./Func/forEachRegisteredTopic.js";

async function writeModifiedText(sourceText, addTags, oneTopic) {
  const regex = /<br><br>[\s]*<!-- include virtual="\/Donate\.htm" -->/;
  const match = regex.exec(sourceText);
  if (match) {
    let pos1 = match.index;
    let tagsToInsert = "";
    addTags.forEach((tag) => {
      tagsToInsert += tagText(tag);
    });
    console.log(`tag ${addTags} will be add`);
    const newSourceText = sourceText.slice(0, pos1) + tagsToInsert + sourceText.slice(pos1);
    await writeWholeFile(urlToWindowsPath(oneTopic.URL), newSourceText);
  }
}
async function processOneTopic(oneTopic) {
  console.log(oneTopic);
  let dbTags = oneTopic.Tags.split(" ").sort();
  let sourceText = await readWholeFile(urlToWindowsPath(oneTopic.URL));
  if (!sourceText) {
    console.error("File not found:", urlToWindowsPath(oneTopic.URL));
    return;
  }
  let tagPresent = checkTagPresentExist(sourceText);
  if (tagPresent.length > 0) {
    console.log(oneTopic.i, tagPresent, dbTags);
    let tagsToAdd = dbTags.filter((tag) => !tagPresent.includes(tag));
    writeModifiedText(sourceText, tagsToAdd, oneTopic);
  } else {
    writeModifiedText(sourceText, dbTags, oneTopic);
  }
}

forEachRegisteredTopic(processOneTopic).catch((err) => console.error("Error during forEach:", err));
