let presentTags = [
  '<!-- include virtual="/Nativescript.htm" -->',
  '<!-- include virtual="/Android.htm" -->',
  '<!-- include virtual="/JavascriptProjects.htm" -->',
  '<!-- include virtual="/Front.htm" -->',
  '<!-- include virtual="/Electron.htm" -->',
  '<!-- include virtual="/AngularElectron.htm" -->',
  '<!-- include virtual="/Cloudflare.htm" -->',
  '<!-- include virtual="/Crypto.htm" -->',
  '<!-- include virtual="/Device.htm" -->',
  '<!-- include virtual="/EfCodeFirst.htm" -->'
];

let checkTagPresentExist = (sourceText) => {
  let presentTagsArr = [];
  for (const tag of presentTags) {
    if (sourceText.includes(tag)) {
      const match = /<!-- include virtual="\/([^.]+)\.htm" -->/.exec(tag);
      const tagName = match ? match[1] : null;
      if (tagName) {
        presentTagsArr.push(tagName);
      }
    }
  }
  return presentTagsArr;
};

let tags = [
  "Access",
  "Android",
  "Angular",
  "AspClassic",
  "AspNetClassic",
  "AspNetMvc",
  "Authentication",
  "Binary",
  "Blazor",
  "Bot",
  "Browser",
  "Cloud",
  "Cloudflare",
  "ComObject",
  "ContactMe",
  "Crypto",
  "Css",
  "Delegate",
  "DevEnvironment",
  "Device",
  "Doc",
  "Docker",
  "EfCodeFirst",
  "Electron",
  "English",
  "Excel",
  "Flex",
  "Front",
  "FrontLearning",
  "FuckRussia",
  "Git",
  "Google",
  "Installer",
  "Java",
  "JavascriptProjects",
  "Job",
  "Kiosk",
  "Kvm",
  "Linux",
  "Mailing",
  "Microsoft",
  "Nativescript",
  "NetCoreBackend",
  "NetCommon",
  "NetLearning",
  "NetStart",
  "NodeBackend",
  "PaymentGateway",
  "Pdf",
  "Php",
  "Privacy",
  "Servers",
  "Sql",
  "SqlClr",
  "Ssl",
  "Supabase",
  "Task",
  "Telegram",
  "Testing",
  "Theory",
  "TimeSchedule",
  "Trash",
  "Travel",
  "Vb6",
  "Video",
  "VmWare",
  "Voip",
  "Vpn",
  "WebApiServer",
  "WebServer",
  "WebServiceClient",
  "WinDesktop",
  "WindowsApi",
  "Wsh",
  "Xml",
  "Yield",
];

let tagText = (tag) => {
  let html = "";
  tags.forEach((x) => {
    if (x === tag) {
      html = `
<br><hr><br>
<p style="color: grey">${x} context:</p>
<!-- include virtual="/${x}.htm" --><${x}></${x}><script type="text/javascript">fetch("/${x}.htm").then(response => response.text()).then(data => document.querySelector("${x}").innerHTML = data)</script>

`;
    }
  });
  return html;
};

export { presentTags, tagText, tags, checkTagPresentExist };
