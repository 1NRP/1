const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// CORS options
const corsOptions = {
  origin: ['https://1msg.vercel.app', 'https://1nrp.github.io', 'https://1nrp.pages.dev'],
  optionsSuccessStatus: 200,
  exposedHeaders: ['Content-Type']
};
// Enable CORS for specific domains
app.use(cors(corsOptions));

// Endpoint to handle the process
app.post('/getM3U8', async (req, res) => {
  try {
    const { shortURL } = req.body;
    // Step 2 and 3: Fetching data from Terabox API and extracting necessary data
    // Direct fetch isn't working. So using allorigins api. The JSON extraction for Direct fetch is commented out below.
    //const getInfoUrl = `https://www.terabox.com/api/shorturlinfo?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=1&dp-logid=1&shorturl=${shortURL}&root=1`;
    const getInfoUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.terabox.com/api/shorturlinfo?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=1&dp-logid=1&shorturl=${shortURL}&root=1`)}`;
    const response = await fetch(getInfoUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${getInfoUrl}`);
    }
    const infoData = await response.json();
    console.log(infoData);
    // Extract required values.
    //const { shareid, uk } = infoData;
    //const { fs_id, size, server_filename, thumbs: { url2 } } = infoData.list[0];
    const allOrigins = JSON.parse(infoData.contents);
    const { shareid, uk } = allOrigins;
    const { fs_id, size, server_filename, thumbs: { url2 } } = allOrigins.list[0];
    // Log the extracted constant values
    console.log('shareid:', shareid);
    console.log('uk:', uk);
    console.log('size:', size);
    console.log('fs_id:', fs_id);
    console.log('server_filename:', server_filename);
    console.log('url2:', url2);
    // Step 4: Constructing URL for fetching .m3u8 file.
    const m3u8Url = `https://www.terabox1024.com/share/extstreaming.m3u8?uk=${uk}&shareid=${shareid}&type=M3U8_AUTO_360&fid=${fs_id}&sign=1&timestamp=1&clienttype=1&channel=1`;
    const m3u8Response = await fetch(m3u8Url);
    if (!m3u8Response.ok) {
      throw new Error(`Failed to fetch .m3u8 file from URL: ${m3u8Url}`);
    }
    const m3u8Content = await m3u8Response.text();
    // Step 5: Saving .m3u8 file to Vercel blob storage.
    const blobFileName = `${shortURL}.m3u8`;
    const blobResponse = await fetch(`https://1msg.vercel.app/api/Play/save-To-Blob?filename=M3U8-HTML/${blobFileName}`, {
      method: 'POST',
      body: m3u8Content,
      headers: {
        'Content-Type': 'text/plain'
      },
    });
    if (!blobResponse.ok) {
      throw new Error(`Failed to save .m3u8 file to blob storage`);
    }
    const blobData = await blobResponse.json();
    // Send the blob data as response
    res.json(blobData);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error occurred.' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
