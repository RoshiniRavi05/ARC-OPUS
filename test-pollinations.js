import fs from 'fs';
fetch('https://image.pollinations.ai/prompt/streetwear-crop-top-female?width=400&height=500&nologo=true')
  .then(res => {
    console.log(res.status);
    return res.arrayBuffer();
  })
  .then(buffer => console.log('Size:', buffer.byteLength));
