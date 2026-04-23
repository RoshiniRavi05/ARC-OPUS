import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = './public/skirts-new';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const prompts = [
    "full-body-streetwear-photo-of-young-adult-female-model-wearing-a-modern-blue-denim-skirt-and-white-top-urban-clothing-fashion-focus-on-skirt",
    "streetwear-photography-of-young-adult-female-wearing-a-long-blue-denim-maxi-skirt-and-simple-shirt-urban-aesthetic",
    "full-body-shot-of-female-streetwear-model-wearing-a-high-waisted-denim-skirt-clean-urban-background-fashion-apparel",
    "street-style-photo-of-woman-wearing-a-black-denim-skirt-with-cargo-pockets-streetwear-clothing-focus-on-skirt",
    "fashion-photography-of-woman-wearing-a-retro-button-front-denim-skirt-urban-streetwear-aesthetic-clear-lighting",
    "urban-fashion-photo-of-female-model-wearing-a-modern-denim-midi-skirt-plain-background-streetwear-apparel",
    "full-body-streetwear-photo-woman-wearing-a-two-tone-patchwork-denim-skirt-trendy-urban-fashion",
    "streetwear-editorial-photo-of-female-wearing-a-light-blue-washed-denim-skirt-casual-modern-style",
    "full-body-shot-of-female-model-wearing-a-wide-leg-inspired-long-denim-skirt-premium-streetwear",
    "modern-urban-fashion-photo-of-woman-wearing-a-baggy-long-denim-skirt-street-style-aesthetic",
    "fashion-photo-of-young-adult-woman-wearing-a-flared-denim-skirt-vintage-90s-streetwear-look",
    "urban-street-style-photo-of-female-model-wearing-a-dark-indigo-denim-skirt-modern-apparel",
    "full-body-streetwear-photo-of-woman-wearing-a-classic-belted-denim-skirt-high-quality-fashion",
    "streetwear-photography-of-female-model-wearing-a-pleated-denim-skirt-street-style-clothing",
    "fashion-editorial-photo-of-woman-in-a-trendy-denim-skirt-urban-casual-apparel-focus-on-skirt"
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function download() {
    for (let i = 0; i < prompts.length; i++) {
        const name = `street-skirt-${i+1}.jpg`;
        const filePath = path.join(outDir, name);
        
        let success = false;
        let attempts = 0;
        
        while (!success && attempts < 3) {
            attempts++;
            const seed = Math.floor(Math.random() * 10000);
            const url = `https://image.pollinations.ai/prompt/${prompts[i]}?width=400&height=500&nologo=true&seed=${seed}`;
            console.log(`Fetching ${name} (attempt ${attempts})`);
            
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const buf = await res.arrayBuffer();
                
                if (buf.byteLength > 5000) { // Valid image size check
                    fs.writeFileSync(filePath, Buffer.from(buf));
                    console.log(`Saved ${name} Size: ${buf.byteLength}`);
                    success = true;
                } else {
                    console.log(`Failed size check for ${name} Size: ${buf.byteLength}. Retrying...`);
                }
            } catch (e) {
                console.error('error', name, e.message);
            }
            await sleep(2500); // 2.5 second delay to avoid rate limit
        }
    }
    console.log('Done downloading safe streetwear skirts!');
}
download();
