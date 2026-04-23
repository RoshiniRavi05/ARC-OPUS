import fs from 'fs';

async function fetchUnsplashUrls() {
  const queries = [
    'women crop top streetwear', 
    'teenage girl graphic tee', 
    'woman oversized t-shirt aesthetic',
    'minimalist baby tee fashion'
  ];
  let photos = [];
  
  for (const query of queries) {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=15`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      photos.push(...data.results.map(p => p.urls.regular + "&w=400&h=500&fit=crop"));
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

  // Deduplicate
  photos = [...new Set(photos)];
  
  const namesAndPrices = [
      { name: "Oversized Graphic Black Tee", price: "$40" },
      { name: "Minimal White Ribbed Crop", price: "$35" },
      { name: "Trendy Beige Baby Tee", price: "$30" },
      { name: "Washed Grey Graphic Tee", price: "$45" },
      { name: "Sleek Black Sleeveless Top", price: "$38" },
      { name: "Pastel Pink Fitted Crop", price: "$32" },
      { name: "Vintage Oversized T-Shirt", price: "$42" },
      { name: "Minimal White Tank Top", price: "$30" },
      { name: "Cropped Long-Sleeve Black Top", price: "$50" },
      { name: "Oversized Cream Graphic Tee", price: "$45" },
      { name: "Ribbed Neutral Beige Top", price: "$35" },
      { name: "Relaxed Fit Basic White Tee", price: "$30" },
      { name: "Edgy Modern Asymmetric Top", price: "$48" },
      { name: "Cute Baby Blue Baby Tee", price: "$32" },
      { name: "Washed Brown Graphic Tee", price: "$40" }
  ];

  let out = "  // ─── TEES & TOPS (15) ───\n";
  for(let i=0; i<15; i++) {
      out += `  { id: ${301+i}, category: 'women', subcat: 'crops', name: "${namesAndPrices[i].name}", price: "${namesAndPrices[i].price}", image: "${photos[i] || 'https://loremflickr.com/400/500/fashion,top?lock='+i}" },\n`;
  }
  fs.writeFileSync('tops-output.txt', out);
  console.log("Success! Wrote to tops-output.txt");
}

fetchUnsplashUrls();
