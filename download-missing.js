import fs from 'fs';
import path from 'path';

const dir = './public/images';

const images = [
    { name: 'jacket.jpg', url: 'https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=400&q=80' },
    { name: 'skirt.jpg', url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80' }
];

async function download() {
    for (const img of images) {
        console.log('Downloading ' + img.name);
        try {
            const response = await fetch(img.url);
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
