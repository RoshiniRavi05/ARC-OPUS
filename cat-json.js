import fs from 'fs';
const data = fs.readFileSync('safe-urls.json', 'utf16le');
console.log(data);
