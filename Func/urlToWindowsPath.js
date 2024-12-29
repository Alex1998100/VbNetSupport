export function urlToWindowsPath(url) {
    url = url.replace(/^(https?:\/\/)?(\/\/)?[^\/]+\//, ""); 
  const parts = url.split("/");
  let windowsPath = "E:\\VB-NET\\html";
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part) {  
      windowsPath += "\\" + part;
    }
  }
  if (!windowsPath.endsWith(".htm")) {
    windowsPath += ".htm";
  }
  return windowsPath;
}
