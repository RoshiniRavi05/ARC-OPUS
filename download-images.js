import fs from 'fs';
import path from 'path';

const images = [
  { name: 'tee.jpg', url: 'https://image.pollinations.ai/prompt/black%20streetwear%20t-shirt%20model?width=400&height=500&nologo=true' },
  { name: 'hoodie.jpg', url: 'https://image.pollinations.ai/prompt/black%20streetwear%20zip-up%20hoodie%20model?width=400&height=500&nologo=true' },
  { name: 'pants.jpg', url: 'https://image.pollinations.ai/prompt/baggy%20streetwear%20parachute%20cargo%20pants%20model?width=400&height=500&nologo=true' },
  { name: 'bag.jpg', url: 'https://image.pollinations.ai/prompt/tactical%20streetwear%20crossbody%20bag%20model?width=400&height=500&nologo=true' },
  { name: 'skirt.jpg', url: 'https://image.pollinations.ai/prompt/black%20streetwear%20cargo%20skirt%20model?width=400&height=500&nologo=true' },
  { name: 'jacket.jpg', url: 'https://image.pollinations.ai/prompt/oversized%20streetwear%20leather%20blazer%20model?width=400&height=500&nologo=true' }
];

const dir = './public/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function download() {
  for (const img of images) {
    if (fs.existsSync(path.join(dir, img.name))) {
      console.log('Skipping ' + img.name);
      continue;
    }
    console.log('Downloading ' + img.name);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(img.url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(path.join(dir, img.name), Buffer.from(buffer));
      console.log('Done ' + img.name);
    } catch (e) {
      console.error('Failed ' + img.name, e.message);
    }
  }
}
download();
