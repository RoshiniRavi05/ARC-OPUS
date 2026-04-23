import fs from 'fs';
import https from 'https';

async function fetchUnsplashUrls() {
  const query = 'women-jeans-full-body';
  const url = `https://unsplash.com/napi/search/photos?query=${query}&per_page=30`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const photos = data.results.map(p => p.urls.regular);
    console.log(JSON.stringify(photos.slice(0, 15), null, 2));
  } catch (err) {
    console.log("Error:", err.message);
  }
}

fetchUnsplashUrls();
