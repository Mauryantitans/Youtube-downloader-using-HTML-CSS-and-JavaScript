// Node.js server using Express.js
const express = require('express');
const app = express();
const youtubedl = require('youtube-dl');

app.use(express.static('public'));

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  const resolution = req.query.resolution || 'best';

  // Download video using youtube-dl with the specified resolution
  const video = youtubedl(videoUrl, ['--format=mp4', `--format=${resolution}`]);

  video.on('info', (info) => {
    // Get the video format content type and set the appropriate file extension
    const contentType = info.format.split(';')[0];
    const fileExtension = contentType.split('/')[1];
    const videoTitle = `${info._filename}.${fileExtension}`;

    res.setHeader('Content-disposition', `attachment; filename=${videoTitle}`);
    video.pipe(res);
  });

  video.on('error', (err) => {
    console.error('Error downloading video:', err.message);
    res.status(500).send('Error downloading video');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
