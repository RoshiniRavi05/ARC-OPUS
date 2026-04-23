const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('tops-output.txt', 'utf8');
const lines = content.split('\n').filter(l => l.includes('image:'));

const outDir = './public/tops-unsplash';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/image:\s*"([^"]+)"/);
    if (!match) continue;
    const url = match[1];
    try {
      const res = await fetch(url);
      if (!res.ok) { console.log('Failed ' + i, res.status); continue; }
      const buf = await res.arrayBuffer();
      fs.writeFileSync(path.join(outDir, 'top-' + (i+1) + '.jpg'), Buffer.from(buf));
      console.log('Saved top-' + (i+1));
    } catch(err) {
      console.log('Error top-' + (i+1), err.message);
    }
  }
}
run();
