import fs from 'fs';
import path from 'path';

const outDir = './public/skirts';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const skirts = [
    { name: 'sk1.jpg', prompt: 'Gen Z female model wearing a trendy high-waisted vintage blue denim mini-skirt streetwear white background aesthetic' },
    { name: 'sk2.jpg', prompt: 'Gen Z female model wearing a Y2K distressed ripped denim skirt streetwear aesthetic studio' },
    { name: 'sk3.jpg', prompt: 'female model wearing a long A-line denim maxi skirt with a front slit trendy streetwear white background' },
    { name: 'sk4.jpg', prompt: 'teenage female model wearing an edgy asymmetrical black denim skirt streetwear studio shot' },
    { name: 'sk5.jpg', prompt: 'Gen Z female model wearing a stylish cargo pocket utility denim skirt faded wash aesthetic' },
    { name: 'sk6.jpg', prompt: 'female model wearing a button-front retro denim skirt light wash clean studio lighting focus on skirt' },
    { name: 'sk7.jpg', prompt: 'Gen Z model wearing a grunge dark grey distressed denim mini skirt aesthetic street style' },
    { name: 'sk8.jpg', prompt: 'female model wearing a trendy patchwork denim skirt two-tone blue streetwear aesthetic' },
    { name: 'sk9.jpg', prompt: 'fashion model wearing a classic light blue washed denim short skirt casual setting' },
    { name: 'sk10.jpg', prompt: 'Gen Z female model wearing a denim midi skirt dark indigo premium streetwear' },
    { name: 'sk11.jpg', prompt: 'female model wearing a raw hem raw indigo denim long skirt Y2K style' },
    { name: 'sk12.jpg', prompt: 'aesthetic female model wearing a high-waisted flared denim skirt vintage 90s streetwear' },
    { name: 'sk13.jpg', prompt: 'female model wearing an acid wash denim mini skirt edgy Gen Z style clean background' },
    { name: 'sk14.jpg', prompt: 'female model wearing a chic belted denim skirt mid-thigh length streetwear fashion' },
    { name: 'sk15.jpg', prompt: 'Gen Z girl wearing a raw hem frayed denim maxi skirt bleached aesthetic streetwear' }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    for (let i = 0; i < skirts.length; i++) {
        const u = skirts[i];
        const filePath = path.join(outDir, u.name);
        
        // Skip if already a valid large file
        if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            if (stat.size > 2000) {
                console.log('Skipping existing valid file', u.name);
                continue;
            }
        }

        const promptStr = u.prompt.split(' ').join('-');
        const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(promptStr) + '?width=400&height=500&nologo=true&seed=' + (500+i);
        console.log('Fetching', u.name);
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const buf = await res.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(buf));
            console.log('Saved', u.name, 'Size:', buf.byteLength);
        } catch (e) {
            console.error('error', u.name, e.message);
        }
        await sleep(2000); // Prevent rate limits!
    }
    console.log('Done!');
}
run();
