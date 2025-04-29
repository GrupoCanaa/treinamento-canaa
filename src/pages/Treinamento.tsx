import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Treinamento = () => {
  const navigate = useNavigate();

  const [progresso, setProgresso] = useState<{ [key: string]: boolean }>({});

  const modulos = [
    {
      id: 1,
      nome: 'Módulo 1',
      videos: [
        { id: '1-1', titulo: 'Vídeo 1 do Módulo 1', url: 'https://link-do-video-1' },
        { id: '1-2', titulo: 'Vídeo 2 do Módulo 1', url: 'https://link-do-video-2' },
        { id: '1-3', titulo: 'Vídeo 3 do Módulo 1', url: 'https://link-do-video-3' },
        { id: '1-4', titulo: 'Vídeo 4 do Módulo 1', url: 'https://link-do-video-4' },
        { id: '1-5', titulo: 'Vídeo 5 do Módulo 1', url: 'https://link-do-video-5' },
      ],
    },
    {
      id: 2,
      nome: 'Módulo 2',
      videos: [
        { id: '2-1', titulo: 'Vídeo 1 do Módulo 2', url: 'https://link-do-video-6' },
        { id: '2-2', titulo: 'Vídeo 2 do Módulo 2', url: 'https://link-do-video-7' },
        { id: '2-3', titulo: 'Vídeo 3 do Módulo 2', url: 'https://link-do-video-8' },
        { id: '2-4', titulo: 'Vídeo 4 do Módulo 2', url: 'https://link-do-video-9' },
        { id: '2-5', titulo: 'Vídeo 5 do Módulo 2', url: 'https://link-do-video-10' },
      ],
    },
    {
      id: 3,
      nome: 'Módulo 3',
      videos: [
        { id: '3-1', titulo: 'Vídeo 1 do Módulo 3', url: 'https://link-do-video-11' },
        { id: '3-2', titulo: 'Vídeo 2 do Módulo 3', url: 'https://link-do-video-12' },
        { id: '3-3', titulo: 'Vídeo 3 do Módulo 3', url: 'https://link-do-video-13' },
        { id: '3-4', titulo: 'Vídeo 4 do Módulo 3', url: 'https://link-do-video-14' },
        { id: '3-5', titulo: 'Vídeo 5 do Módulo 3', url: 'https://link-do-video-15' },
      ],
    },
    {
      id: 4,
      nome: 'Módulo 4',
      videos: [
        { id: '4-1', titulo: 'Vídeo 1 do Módulo 4', url: 'https://link-do-video-16' },
        { id: '4-2', titulo: 'Vídeo 2 do Módulo 4', url: 'https://link-do-video-17' },
        { id: '4-3', titulo: 'Vídeo 3 do Módulo 4', url: 'https://link-do-video-18' },
        { id: '4-4', titulo: 'Vídeo 4 do Módulo 4', url: 'https://link-do-video-19' },
        { id: '4-5', titulo: 'Vídeo 5 do Módulo 4', url: 'https://link-do-video-20' },
      ],
    },
  ];

  useEffect(() => {
    const progressoSalvo = localStorage.getItem('progresso');
    if (progressoSalvo) {
      setProgresso(JSON.parse(progressoSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('progresso', JSON.stringify(progresso));
  }, [progresso]);

  const marcarComoConcluido = (videoId: string) => {
    setProgresso((prev) => ({
      ...prev,
      [videoId]: true,
    }));
  };

  const verificarSeModuloConcluido = (videos: { id: string }[]) => {
    return videos.every((video) => progresso[video.id]);
  };

  const concluirTreinamento = () => {
    const todosVideos = modulos.flatMap((modulo) => modulo.videos);
    const todosConcluidos = todosVideos.every((video) => progresso[video.id]);

    if (todosConcluidos) {
      navigate('/prova');
    } else {
      alert('Conclua todos os vídeos antes de prosseguir para a prova.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0000b3' }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16 object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Treinamento</h1>

        {modulos.map((modulo) => (
          <div key={modulo.id} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{modulo.nome}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modulo.videos.map((video) => (
                <div key={video.id} className="border p-4 rounded-xl shadow-md bg-gray-50">
                  <h3 className="font-medium mb-2">{video.titulo}</h3>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      src={video.url}
                      title={video.titulo}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-48 rounded-md"
                    ></iframe>
                  </div>
                  <button
                    onClick={() => marcarComoConcluido(video.id)}
                    className={`w-full py-2 rounded font-semibold ${
                      progresso[video.id] ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {progresso[video.id] ? 'Concluído' : 'Marcar como Concluído'}
                  </button>
                </div>
              ))}
            </div>

            {verificarSeModuloConcluido(modulo.videos) && (
              <div className="mt-4 text-green-600 font-bold text-center">✅ Módulo Concluído!</div>
            )}
          </div>
        ))}

        <div className="text-center mt-12">
          <button
            onClick={concluirTreinamento}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-2xl"
          >
            Finalizar Treinamento
          </button>
        </div>

      </div>
    </div>
  );
};

export default Treinamento;