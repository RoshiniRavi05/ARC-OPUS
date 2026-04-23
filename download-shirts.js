import fs from 'fs';
import path from 'path';

const urlBase = 'https://image.pollinations.ai/prompt/';

const items = [
    "Heavyweight Boxy Flannel Shirt menswear",
    "Vintage Varsity Jacket menswear hype",
    "Cropped Puffer Jacket menswear streetwear",
    "Camp Collar short sleeve shirt menswear",
    "Satin Souvenir Jacket menswear fashion",
    "Washed Denim Trucker jacket menswear",
    "Heavyweight Boxy Button Down shirt menswear",
    "Streetwear nylon Coach Jacket menswear",
    "Graphic Bowling Shirt menswear fashion",
    "Fleece Zip Up Jacket menswear hype",
    "Y2K Racing Jacket aesthetic menswear",
    "Corduroy Long Sleeve Shirt streetwear menswear",
    "Streetwear Cargo Short Sleeve shirt waist up",
    "Technical Windbreaker jacket techwear menswear",
    "Leather moto Jacket streetwear hypebeast",
    "Plaid Workwear long sleeve Shirt menswear",
    "Silk Blend Cuban Shirt menswear streetstyle",
    "Utility pocket Boxy Vest menswear aesthetic",
    "Sherpa Lined Trucker clothing menswear jacket",
    "Half sleeve streetwear flannel shirt menswear"
];

const dir = './public/shirts';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function downloadBatch(batch, startIndex) {
    const promises = batch.map(async (item, i) => {
        const name = `s${startIndex + i + 1}.jpg`;
        const prompt = `cool hip gen z male fashion model wearing ${item} waist up shot aesthetic clean background`;
        const url = urlBase + encodeURIComponent(prompt) + '?width=400&height=500&nologo=true&seed=' + Math.floor(Math.random() * 1000);
        console.log('Downloading', name);
        try {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(path.join(dir, name), Buffer.from(buffer));
        } catch (e) { console.error('failed', name) }
    });
    return Promise.all(promises);
}

async function run() {
    for (let i = 0; i < items.length; i += 5) {
        await downloadBatch(items.slice(i, i + 5), i);
    }
}
run();
