import fs from 'fs';
import path from 'path';

const prompts = [
  "full-body-streetwear-fashion-photo-of-female-wearing-high-rise-vintage-blue-jeans-and-simple-white-crop-top-no-jacket-focus-on-legs-and-jeans-urban-background-streetwear-photography",
  "full-body-photo-of-gen-z-woman-wearing-ultra-baggy-street-wide-leg-jeans-and-fitted-tank-top-no-jacket-focus-on-the-wide-jeans-premium-fashion",
  "waist-to-ankle-photo-of-young-woman-wearing-distressed-slim-straight-jeans-and-minimal-tee-focus-on-the-jeans-streetwear-aesthetic-no-jacket",
  "waist-down-streetwear-photo-of-woman-wearing-light-wash-mom-jeans-with-sneakers-focus-on-denim-jeans-clean-lighting-no-jacket",
  "full-shot-photo-of-gen-z-woman-wearing-wide-leg-cargo-denim-pants-and-basic-crop-top-no-jacket-focus-on-cargo-jeans-fashion-photography",
  "full-body-street-style-photo-of-woman-wearing-dark-wash-straight-fit-jeans-no-jacket-focus-on-jeans-and-sneakers-minimal-top",
  "front-view-full-body-photo-of-woman-wearing-ripped-high-waisted-jeans-and-small-shirt-no-jacket-focus-on-legs-and-denim-streetwear",
  "full-body-photo-waist-to-ankle-of-woman-wearing-vintage-washed-mom-jeans-high-waisted-with-white-tee-no-jacket-focus-on-the-jeans",
  "streetwear-photography-of-woman-wearing-extremely-baggy-oversized-denim-jeans-no-jacket-focus-strictly-on-the-baggy-jeans-and-shoes",
  "full-body-photo-of-woman-wearing-ultra-wide-leg-crop-jeans-fashionable-streetwear-no-jacket-focus-on-bottom-wear-jeans"
];

const images = prompts.map((prompt, i) => ({
  name: `jeans_${i + 1}.png`,
  url: `https://image.pollinations.ai/prompt/${prompt}?width=400&height=500&nologo=true&seed=${100 + i}`
}));

const dir = './public/women-jeans';

async function downloadFast() {
  const pending = images.filter(img => !fs.existsSync(path.join(dir, img.name)));
  console.log(`Downloading ${pending.length} images...`);
  
  await Promise.all(pending.map(async (img) => {
    try {
      console.log('Fetching ' + img.name);
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 60000); // 60s timeout
      const response = await fetch(img.url, { signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(path.join(dir, img.name), Buffer.from(buffer));
      console.log('Done ' + img.name);
    } catch(err) {
      console.log('Failed ' + img.name, err.message);
    }
  }));
}
downloadFast();
