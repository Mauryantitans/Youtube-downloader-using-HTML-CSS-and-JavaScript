# app.py (Python Backend using Flask)
from flask import Flask, request, send_file
import youtube_dl

app = Flask(__name__)

@app.route('/download', methods=['GET'])
def download_video():
    video_url = request.args.get('url')
    resolution = request.args.get('resolution', 'best')

    ydl_opts = {
        'format': 'mp4',
        'outtmpl': 'downloads/%(title)s.%(ext)s',  # Save the video in the "downloads" folder
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(video_url, download=True)

    # Get the downloaded video file path
    video_file_path = ydl.prepare_filename(info_dict)

    return send_file(video_file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
