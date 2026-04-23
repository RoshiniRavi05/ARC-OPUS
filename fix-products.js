const fs = require('fs');
const content = fs.readFileSync('./src/App.jsx', 'utf8');

const regex = /const ALL_PRODUCTS = \[([\s\S]*?)\n\];/;
const match = content.match(regex);
if (!match) throw new Error("Could not find ALL_PRODUCTS");

let products = match[1];

// Remove ALL existing hoodies
products = products.split('\n').filter(line => {
    return !line.includes("subcat: 'hoodies'") && line.trim().length > 0;
}).join('\n');

// Insert exactly 10 new hoodies at the top or bottom of men section
const newHoodies = `
  { id: 9, category: 'men', subcat: 'hoodies', name: "Technical Fleece Zip-Up", price: "$90", image: "/shirts/s10.jpg" },
  { id: 10, category: 'men', subcat: 'hoodies', name: "Y2K Corduroy Overshirt", price: "$70", image: "/shirts/s12.jpg" },
  { id: 60, category: 'men', subcat: 'hoodies', name: "Utility Boxy Vest", price: "$105", image: "/shirts/s18.jpg" },
  { id: 61, category: 'men', subcat: 'hoodies', name: "Vintage Varsity Jacket", price: "$130", image: "/shirts/s2.jpg" },
  { id: 62, category: 'men', subcat: 'hoodies', name: "Cropped Puffer Jacket", price: "$140", image: "/shirts/s3.jpg" },
  { id: 63, category: 'men', subcat: 'hoodies', name: "Vintage Coach Jacket", price: "$65", image: "/shirts/s5.jpg" },
  { id: 64, category: 'men', subcat: 'hoodies', name: "Minimalist Windbreaker", price: "$125", image: "/shirts/s6.jpg" },
  { id: 65, category: 'men', subcat: 'hoodies', name: "Oversized Denim Trucker", price: "$110", image: "/shirts/s7.jpg" },
  { id: 66, category: 'men', subcat: 'hoodies', name: "Retro Short Sleeve Oxford", price: "$55", image: "/genz_shirt.png" },
  { id: 67, category: 'men', subcat: 'hoodies', name: "Clean Leather Moto Jacket", price: "$140", image: "/images/jacket.jpg" },`;

products = products.replace(/(?=\{ id: 11, category: 'women')/g, newHoodies.trim() + '\n  ');

const newContent = content.replace(regex, `const ALL_PRODUCTS = [\n${products}\n];`);
fs.writeFileSync('./src/App.jsx', newContent);
console.log("App.jsx cleaned and exactly 10 flawless GenZ jackets inserted.");
