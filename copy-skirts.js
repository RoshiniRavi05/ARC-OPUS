import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\Roshini\\.gemini\\antigravity\\brain\\c553524f-6b86-4ad5-9dd0-54ee78fef940';
const destDir = 'C:\\Users\\Roshini\\Desktop\\clothingBrand\\public\\skirts-gemini';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);
for (const file of files) {
    if (file.startsWith('skirt_') && file.endsWith('.png')) {
        // e.g. skirt_1_1776659520644.png
        const match = file.match(/^skirt_(\d+)_/);
        if (match) {
            const num = match[1];
            const src = path.join(sourceDir, file);
            const dest = path.join(destDir, `skirt_${num}.png`);
            fs.copyFileSync(src, dest);
            console.log(`Copied ${file} to skirt_${num}.png`);
        }
    }
}
