import { useEffect, useState } from "react";
import config from '../../config/config.json';
import FormField from '../components/inputs/FormField.jsx';
import ModalSpinner from "../components/spinners/modal-spinners/ModalSpinner.jsx";

const Modal = ({ video, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Descargar Video</h2>
        <p className="mb-4 text-gray-600">¿Deseas descargar el siguiente video?</p>
        <p className="mb-4 font-semibold text-gray-700">{video.titulo}</p>
        <p className="mb-4 text-gray-600">{video.autor}</p>
        <img src={video.thumbnail} alt="Imagen video" className="w-full h-auto mb-6 rounded-md shadow-sm" />
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Tipo de video</h2>
        <div className="mb-6 flex items-center">
          <div className="flex items-center mr-4">
            <input type="radio" id="video" name="mediaType" value="video" className="hidden" />
            <label htmlFor="video" className="flex items-center cursor-pointer">
              <span className="radio"></span>
              <span className="text-gray-700">Video</span>
            </label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="audio" name="mediaType" value="audio" className="hidden" />
            <label htmlFor="audio" className="flex items-center cursor-pointer">
              <span className="radio"></span>
              <span className="text-gray-700">Audio</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button 
            onClick={onDownload} 
            className="btn-download"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const [videoToDownload, setVideoToDownload] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const downloadVideo = () => {
    let ruta = ''
    let ext = 'mp4'
    if(document.getElementById('video').checked) {
      ruta = `${config["back-ip"]}/api/video`
    } else {
      ruta = `${config["back-ip"]}/api/audio`
      ext = 'mp3'
    }
    setShowModal(false);
    setIsLoading(true);
    fetch(ruta, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({video: videoToDownload})
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Error al descargar el video');
      }
      return response.blob();  // Convertir la respuesta en un blob
    })
    .then(blob => {
        setIsLoading(false);
        // Crear una URL para el blob
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${videoToDownload['titulo']}.${ext}`;  // Nombre del archivo de descarga
        document.body.appendChild(a);
        a.click();  // Simula el clic en el enlace para iniciar la descarga
        window.URL.revokeObjectURL(url);  // Liberar la URL del blob
    })
    .catch(error => {
        console.error('Error al descargar el video:', error);
    });
  };

  const searchVideo = () => {
    let videoDownload = document.getElementById('url-video').value;
    fetch(`${config["back-ip"]}/api/infovideo`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({video: videoDownload})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setVideoToDownload(data);
        setShowModal(true);
    });
  };

  useEffect(() => {
    fetch(`${config["back-ip"]}/api`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
  }, []);

  return (
    <div className="h-[100dvh] w-full relative bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-2xl flex flex-col items-center max-w-md w-full">
            <img src="/img/youtube.png" alt="YouTube Logo" className="w-40 mb-8" />
            <FormField 
                generalClass={'place mb-5'} 
                htmlFor={'url-video'} 
                classNameLabel={'font-inter text-xl text-gray-700'} 
                textLabel={'Introduce la URL del video'} 
                type={'text'} 
                id={'url-video'} 
                placeholder={'URL de Youtube'} 
                classNameInput={'appearance-none border border-gray-300 h-14 mt-2 rounded-md shadow-sm pl-5 font-inter w-full'} 
            />
            <button 
                type="button" 
                onClick={searchVideo} 
                className="mt-5 bg-red-600 text-white py-3 px-6 rounded-full font-inter hover:bg-red-700 transition-all duration-300"
            >
                Buscar video
            </button>
            {isLoading && (<ModalSpinner />)}
            {showModal && (
                <Modal 
                    video={videoToDownload} 
                    onClose={() => setShowModal(false)} 
                    onDownload={downloadVideo} 
                />
            )}
        </div>
    </div>
);
}

export default Home;