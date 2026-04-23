import fs from 'fs';

async function fetchUnsplashUrls() {
  const query = 'denim-skirt-woman';
  const url = `https://unsplash.com/napi/search/photos?query=${query}&per_page=30`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const photos = data.results.map(p => p.urls.regular + "&w=400&h=500&fit=crop");
    
    const skirtsData = [
        { name: "High-Waist Vintage Denim Mini Skirt", price: "$55" },
        { name: "Y2K Distressed Mini Skirt", price: "$65" },
        { name: "A-Line Denim Maxi Skirt with Slit", price: "$90" },
        { name: "Asymmetrical Edgy Denim Skirt", price: "$75" },
        { name: "Cargo Pocket Utility Denim Skirt", price: "$85" },
        { name: "Button-Front Retro Midi Skirt", price: "$80" },
        { name: "Grunge Grey Distressed Skirt", price: "$60" },
        { name: "Trendy Two-Tone Patchwork Skirt", price: "$95" },
        { name: "Classic Light Wash Short Skirt", price: "$50" },
        { name: "Wide-Leg Inspired Denim Midi", price: "$110" },
        { name: "Oversized Baggy Long Skirt", price: "$120" },
        { name: "High-Waisted Flared Studio Skirt", price: "$85" },
        { name: "Acid Wash Streetwear Mini Skirt", price: "$70" },
        { name: "Chic Belted Mid-Thigh Skirt", price: "$100" },
        { name: "Raw Hem Bleached Maxi Skirt", price: "$130" }
    ];

    let out = "  // ─── DENIM SKIRTS (15) ───\n";
    for(let i=0; i<15; i++) {
        out += `  { id: ${201+i}, category: 'women', subcat: 'skirts', name: "${skirtsData[i].name}", price: "${skirtsData[i].price}", image: "${photos[i] || 'https://loremflickr.com/400/500/denim,skirt,woman?lock='+i}" },\n`;
    }
    fs.writeFileSync('skirts-output.txt', out);
    console.log("Success! Wrote to skirts-output.txt");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

fetchUnsplashUrls();
