import fs from 'fs';

async function fetchSafeUrls() {
  // We use multiple specific queries to get a diverse set of properly clothed models
  const queries = ['woman standing jeans t-shirt', 'woman jeans sweater full body', 'woman jeans jacket outdoor'];
  let allUrls = [];
  
  for (const q of queries) {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=10`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const photos = data.results.map(p => p.urls.regular);
      allUrls.push(...photos);
    } catch (err) {
      console.log("Error:", err.message);
    }
  }
  
  // Deduplicate and slice
  allUrls = [...new Set(allUrls)].slice(0, 10);
  console.log(JSON.stringify(allUrls, null, 2));
}

fetchSafeUrls();
