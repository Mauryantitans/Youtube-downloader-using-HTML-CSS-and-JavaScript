// Frontend JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-btn');
  downloadBtn.addEventListener('click', () => {
    const videoUrl = document.getElementById('video-url').value;
    if (videoUrl.trim() !== '') {
      downloadVideo(videoUrl);
    }
  });

  function downloadVideo(url) {
    fetch(`/download?url=${encodeURIComponent(url)}`)
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
