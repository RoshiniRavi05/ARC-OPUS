import fs from 'fs';
import path from 'path';

const outDir = './public/tops-gemini';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const prompts = [
    "waist-up-photo-single-female-model-wearing-oversized-graphic-black-t-shirt-modern-streetwear-plain-background-fashion-photography",
    "waist-up-single-female-model-wearing-minimal-white-ribbed-crop-top-fashion-editorial-clean-lighting",
    "upper-body-portrait-single-female-wearing-beige-baby-tee-casual-streetwear-aesthetic-focus-on-top",
    "waist-up-fashion-single-woman-wearing-washed-grey-graphic-t-shirt-plain-studio-background",
    "lookbook-photo-single-female-model-sleek-black-sleeveless-top-minimalist-streetwear-sharp-clear",
    "waist-up-shot-single-young-woman-pastel-pink-fitted-crop-tee-casual-street-style-clean",
    "streetwear-waist-up-single-female-vintage-oversized-dark-grey-t-shirt-studio-setting",
    "fashion-layout-waist-up-single-female-model-minimal-white-tank-top-modern-aesthetic",
    "waist-up-photography-single-female-cropped-long-sleeve-black-top-edgy-streetwear-premium",
    "lookbook-shot-single-woman-oversized-cream-graphic-t-shirt-minimalist-plain-backdrop",
    "urban-fashion-photo-single-female-model-waist-up-ribbed-neutral-beige-top-bright-clean",
    "streetwear-photo-waist-up-single-female-relaxed-fit-basic-white-t-shirt-high-end-fashion",
    "fashion-photo-upper-body-single-female-edgy-modern-black-asymmetric-top-minimal-styling",
    "waist-up-photo-single-young-woman-fitted-baby-blue-baby-tee-aesthetic-plain-background",
    "lookbook-waist-up-single-female-model-washed-brown-oversized-graphic-tee-clean-photography"
].map(p => p + "-one-person-only-high-quality-solo-focus");

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function download() {
    for (let i = 0; i < prompts.length; i++) {
        const name = `top-${i+1}.jpg`;
        const filePath = path.join(outDir, name);
        
        // Skip existing valid files
        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 10000) {
           console.log(`Already have ${name}`);
           continue;
        }

        let success = false;
        let attempts = 0;
        
        while (!success && attempts < 3) {
            attempts++;
            const seed = Math.floor(Math.random() * 10000);
            const url = `https://image.pollinations.ai/prompt/${prompts[i]}?width=400&height=500&nologo=true&seed=${seed}`;
            console.log(`Fetching ${name} (attempt ${attempts})...`);
            
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const buf = await res.arrayBuffer();
                
                if (buf.byteLength > 10000) { 
                    fs.writeFileSync(filePath, Buffer.from(buf));
                    console.log(`Saved ${name} Size: ${buf.byteLength}`);
                    success = true;
                } else {
                    console.log(`Failed size check for ${name} Size: ${buf.byteLength}. Retrying...`);
                }
            } catch (e) {
                console.error('error', name, e.message);
            }
            if(!success) await sleep(2000); 
        }
    }
    console.log('Done downloading proper single-subject tops!');
}
download();
