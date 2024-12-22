import { cssCache } from "./cssCache.js"
import { htmCache } from "./htmCache.js"
import { gifCache } from "./gifCache.js"
import { jpgCache } from "./jpgCache.js"
import { pngCache } from "./pngCache.js"
import path from 'node:path';

let checkCache = (key) => {
    switch (path.extname(key)) {
        case '.htm':
            return htmCache.includes(key.slice(0, -4))
        case '.css':
            return cssCache.includes(key.slice(0, -4))
        case '.gif':
            return gifCache.includes(key.slice(0, -4))
        case '.png':
            return pngCache.includes(key.slice(0, -4))
        case '.jpg':
            return jpgCache.includes(key.slice(0, -4))
        default:
            return false
    }
}

console.log(checkCache('Index.htm'))
console.log(checkCache('2012/History/History.css'))
console.log(checkCache('1c/1C_SERVER_1.gif'))
console.log(checkCache('3CX/WebRTC-04162017_002705_1.png'))
console.log(checkCache('Aliexpress/DSCN0202_1.jpg'))
