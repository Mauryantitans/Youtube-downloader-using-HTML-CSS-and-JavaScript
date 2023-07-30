// Frontend JavaScript (script.js)
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-btn');
  const resolutionSelect = document.getElementById('resolution-select');
  const videoUrlInput = document.getElementById('video-url');

  downloadBtn.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value;
    const selectedResolution = resolutionSelect.value;

    if (videoUrl.trim() !== '') {
      downloadVideo(videoUrl, selectedResolution);
    }
  });

  function downloadVideo(url, resolution) {
    const downloadUrl = `/download?url=${encodeURIComponent(url)}&resolution=${encodeURIComponent(resolution)}`;

    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading video:', error);
      });
  }
});
