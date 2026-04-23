import fs from 'fs';

async function fixAppJsx() {
  const queries = ['woman wearing jeans and t-shirt', 'woman wearing jeans sweater', 'woman wearing jeans modest top'];
  let allUrls = [];
  
  for (const q of queries) {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=10`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const photos = data.results.map(p => p.urls.regular.replace('&w=1080', '&w=600'));
      allUrls.push(...photos);
    } catch (err) {
      console.log("Error:", err.message);
    }
  }
  
  allUrls = [...new Set(allUrls)].slice(0, 10);
  
  const appPath = './src/App.jsx';
  let appCode = fs.readFileSync(appPath, 'utf8');
  
  let i = 0;
  appCode = appCode.replace(/image: "https:\/\/[^"]+"/g, (match, offset, fullString) => {
    // Only replace items in the wide-jeans category section which we know are there
    // To be safe we look around or just replace specific strings...
    return match;
  });
  
  // A much safer regex target: only replace within the specific subcat
  const idsToReplace = [15, 20, 100, 101, 102, 103, 104, 105, 106, 107];
  
  idsToReplace.forEach((id, idx) => {
    const regex = new RegExp(`(\\{ id: ${id},.*?image: )"[^"]+"( \\},?)`, 'g');
    appCode = appCode.replace(regex, `$1"${allUrls[idx]}"$2`);
  });
  
  fs.writeFileSync(appPath, appCode);
  console.log("App.jsx updated with safe images!");
}

fixAppJsx();
