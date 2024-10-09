from flask import Flask, request, jsonify, send_file
import os
import yt_dlp as youtube_dl
from pytube import YouTube
from flask_cors import CORS
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, APIC, TPE1, error
import requests
import platform
import time

app = Flask(__name__)
CORS(app)
    

if (platform.system() == 'Windows'):
    FFMPEG_PATH = 'C:/ffmpeg/bin/ffmpeg.exe'
else:
    FFMPEG_PATH = '/usr/bin/ffmpeg'

@app.route('/api')
def index():
    return {'respuesta':'Hola Mundo'}, 200

@app.route('/api/infovideo', methods=['POST'])
def infovideo():
    try:
        url = request.json.get('video')
        yt = YouTube(url)
        return {
            'titulo': yt.title,
            'thumbnail': yt.thumbnail_url,
            'url_video': url,
            'autor': yt.author
        }, 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/api/video', methods=['POST'])
def video():
    try:
        video = request.json.get('video')
        if not video:
            return jsonify({'error': 'No se proporcionó una URL de video'}), 400

        print(f"URL del video: {video}")
        print(video['titulo'])

        # Descargar el video en formato mp4
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
            'outtmpl': f"{video['titulo']}.mp4",
            'ffmpeg_location': FFMPEG_PATH,
        }
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video['url_video']])

        # Verificar si el archivo se descargó correctamente
        if not os.path.exists(f"{video['titulo']}.mp4") or os.path.getsize(f"{video['titulo']}.mp4") == 0:
            print("El archivo descargado está vacío o no existe")
            return jsonify({'error': 'El archivo descargado está vacío o no existe'}), 500

        print('Video descargado correctamente')
        return send_file(f"{video['titulo']}.mp4", as_attachment=True, download_name=f"{video['titulo']}.mp4")
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        # Eliminar el archivo temporal después de enviarlo
        mp4_file_path = f"{video['titulo']}.mp4"
        if os.path.exists(mp4_file_path):
            try:
                os.remove(mp4_file_path)
                print(f"Archivo temporal eliminado: {mp4_file_path}")
            except PermissionError:
                print(f"No se pudo eliminar el archivo {mp4_file_path} porque está en uso.")
                time.sleep(1)  # Esperar un segundo antes de intentar eliminar de nuevo
                try:
                    os.remove(mp4_file_path)
                    print(f"Archivo temporal eliminado después de la espera: {mp4_file_path}")
                except Exception as e:
                    print(f"Error al intentar eliminar el archivo: {str(e)}") 

@app.route('/api/audio', methods=['POST'])
def audio():
    thumbnail_path = None  # Inicializar la variable

    try:
        video = request.json.get('video')
        if not video:
            return jsonify({'error': 'No se proporcionó una URL de video'}), 400

        print(f"URL del audio: {video}")
        print(video['titulo'])

        # Descargar el video en formato mp3
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': f"{video['titulo']}.%(ext)s",
            'ffmpeg_location': FFMPEG_PATH,
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video['url_video']])

        audio_file_path = f"{video['titulo']}.mp3"
        # Verificar si el archivo se descargó correctamente
        if not os.path.exists(audio_file_path) or os.path.getsize(audio_file_path) == 0:
            print("El archivo descargado está vacío o no existe")
            return jsonify({'error': 'El archivo descargado está vacío o no existe'}), 500

        # Descargar la imagen del thumbnail
        thumbnail_url = video['thumbnail']
        if not thumbnail_url:
            print("No se proporcionó una URL de thumbnail")
            return jsonify({'error': 'No se proporcionó una URL de thumbnail'}), 400

        thumbnail_response = requests.get(thumbnail_url)
        if thumbnail_response.status_code != 200:
            print("No se pudo descargar la imagen del thumbnail")
            return jsonify({'error': 'No se pudo descargar la imagen del thumbnail'}), 500

        thumbnail_path = f"{video['titulo']}.jpg"
        with open(thumbnail_path, 'wb') as f:
            f.write(thumbnail_response.content)

        # Asignar la imagen como carátula del archivo de audio
        audio_file = MP3(audio_file_path, ID3=ID3)
        try:
            audio_file.add_tags()
        except error:
            pass

        # Añadir la imagen del thumbnail como carátula
        with open(thumbnail_path, 'rb') as img:
            audio_file.tags.add(
                APIC(
                    encoding=3,  # 3 es para utf-8
                    mime='image/jpeg',  # image/jpeg o image/png
                    type=3,  # 3 es para la imagen de portada
                    desc=u'Cover',
                    data=img.read()
                )
            )

        # Añadir el autor al archivo de audio
        if 'autor' in video:
            audio_file.tags.add(
                TPE1(
                    encoding=3,  # 3 es para utf-8
                    text=video['autor']
                )
            )

        audio_file.save()

        print('Video descargado correctamente con imagen y autor asignados')
        return send_file(audio_file_path, as_attachment=True, download_name=f"{video['titulo']}.mp3")
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        # Eliminar los archivos temporales después de enviarlos
        if os.path.exists(audio_file_path):
            try:
                os.remove(audio_file_path)
                print(f"Archivo temporal eliminado: {audio_file_path}")
            except PermissionError:
                print(f"No se pudo eliminar el archivo {audio_file_path} porque está en uso.")
                time.sleep(1)  # Esperar un segundo antes de intentar eliminar de nuevo
                try:
                    os.remove(audio_file_path)
                    print(f"Archivo temporal eliminado después de la espera: {audio_file_path}")
                except Exception as e:
                    print(f"Error al intentar eliminar el archivo: {str(e)}")
        if thumbnail_path and os.path.exists(thumbnail_path):
            try:
                os.remove(thumbnail_path)
                print(f"Archivo temporal eliminado: {thumbnail_path}")
            except Exception as e:
                print(f"Error al intentar eliminar el thumbnail: {str(e)}")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)

