import * as fs from 'node:fs';
import { cloudflareCache } from "./cloudflareCache.js"
import path from 'node:path';

let clear = arr => arr.map(x => x.slice(0, -4))

let htm = fs.createWriteStream("./cache/htmCache.js");
htm.write('export const htmCache=')
htm.write(JSON.stringify(clear(cloudflareCache.filter((v) => path.extname(v) === '.htm'))))
htm.close
let css = fs.createWriteStream("./cache/cssCache.js");
css.write('export const cssCache=')
css.write(JSON.stringify(clear(cloudflareCache.filter((v) => path.extname(v) === '.css'))))
css.close
let gif = fs.createWriteStream("./cache/gifCache.js");
gif.write('export const gifCache=')
gif.write(JSON.stringify(clear(cloudflareCache.filter((v) => path.extname(v) === '.gif'))))
gif.close
let png = fs.createWriteStream("./cache/pngCache.js");
png.write('export const pngCache=')
png.write(JSON.stringify(clear(cloudflareCache.filter((v) => path.extname(v) === '.png'))))
png.close
let jpg = fs.createWriteStream("./cache/jpgCache.js");
jpg.write('export const jpgCache=')
jpg.write(JSON.stringify(clear(cloudflareCache.filter((v) => path.extname(v) === '.jpg'))))
jpg.close

