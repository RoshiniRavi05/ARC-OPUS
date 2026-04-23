import fs from 'fs';

const urls = [
    { name: 's5.jpg', prompt: 'cool Gen Z male model wearing an aesthetic vintage green streetwear coach jacket waist up shop clean background' },
    { name: 's6.jpg', prompt: 'cool Gen Z male model wearing a minimalist black zip up streetwear windbreaker jacket waist up shot' },
    { name: 's7.jpg', prompt: 'cool Gen Z male model wearing an oversized blue denim trucker jacket streetwear aesthetic waist up shot' }
];

async function run() {
    for (const u of urls) {
        const url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(u.prompt) + '?width=400&height=500&nologo=true&seed=999';
        console.log('Fetching', u.name);
        try {
            const res = await fetch(url);
            const buf = await res.arrayBuffer();
            fs.writeFileSync('./public/shirts/' + u.name, Buffer.from(buf));
            console.log('Saved', u.name);
        } catch (e) { console.error('error', e) }
        await new Promise(r => setTimeout(r, 2500));
    }
}
run();
