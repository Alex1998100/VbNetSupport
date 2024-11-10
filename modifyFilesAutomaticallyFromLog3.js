import { insert,insertWithBackup,replace,addFooter } from "./Func/replaceText.js";
import { createInterface } from "readline";
import { createReadStream } from "fs";



const okLog = "D:\\JS-VBNET-HTM\\Log\\ok.txt";
const endTxt = '\r\n'

// const startTxt = '<!--# include virtual="/Menu.htm" -->'
// const replacement = `\r\n<!-- include virtual="/Menu.htm" --><Menu></Menu><script type="text/javascript">fetch("/Menu.htm").then(response => response.text()).then(data => document.querySelector("Menu").innerHTML = data)</script>\r\n`;

const startTxt = '</div></div></body>'

const replacement = `\r\n'
<br><br>
<!--#include virtual="/Donate.htm" -->
<div  style="text-align:left; display:inline;float:left">
<a onclick="window.open('','Forum','resizable=no,menubar=no,scrollbars=no,width=600,height=700');"  name='Forum' target='Forum' title='forum.vb-net.com' 
href="//forum.vb-net.com/Forum.aspx?id=@@@">
    Comments</a> ( 
<a onclick="window.open('','Forum','resizable=no,menubar=no,scrollbars=no,width=600,height=700');"  name='Forum' target='Forum' title='forum.vb-net.com' 
href="//forum.vb-net.com/Forum.aspx?id=@@@">
<img border="0"
src="//forum.vb-net.com/GetTopicCount.png?id=@@@" 
/></a> )
</div>


<!-- include virtual="/Years.htm" --><Years></Years><script type="text/javascript">fetch("/Years.htm").then(response => response.text()).then(data => document.querySelector("Years").innerHTML = data)</script>

<div style="display:inline; float:right; text-align:right;">Link to this page: <font color="#0000EE">
<a href="#!#" target="_blank">//www.vb-net.com/#*#</a>
</font></div>


<table width=100%  FRAME="above" border=2 cellpadding=1 cellspacing=0 class="LNK" ><tr><td>
<!--#include virtual="/HotLink.htm" -->
&lt;<a onclick="window.open('','donate','resizable=no,menubar=no,scrollbars=no,width=400,height=300');"  name='donate' target='donate' title='donate.vb-net.com'
href="http://donate.vb-net.com/default.aspx?id=@@@">
THANKS ME</a>&gt;
</td></tr></table>


<div style="text-align:right; display:inline; float:right">


<div class="sharethis-inline-share-buttons"></div>
<script type="text/javascript" src="//platform-api.sharethis.com/js/sharethis.js#property=59b9a33c24814000110af34b&product=inline-share-buttons"></script>

<script src="http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>`;


/**
 * @description processing each file in OK-log what built with  buildLogWhereTextPresent.js
 */
export const modifyFromLog3 = () => {
  //step 2 - modify files
  const read = createReadStream(okLog, "utf-8");
  read.on("error", (err)=>console.log("**********" + err))
  const rl = createInterface(read);
   rl.on("line", (l) => {
    let fileName = l.split("\t");
    console.log(fileName[0] ,fileName[1]);
    if (fileName[1]) {
      addFooter(fileName[1], startTxt, endTxt, replacement);
    }
    else console.log('***********' + l)
  });
  rl.on("close", () => {
    console.log("done.");
  });
};
