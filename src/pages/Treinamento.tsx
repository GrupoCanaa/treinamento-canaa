import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const etapas = [
  {
    id: 1,
    titulo: 'Etapa 1',
    videos: [
      { titulo: 'Seu Vídeo', url: 'https://www.youtube.com/embed/em2CTJYPHl0' },
      { titulo: 'Vídeo Exemplo 2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { titulo: 'Vídeo Exemplo 3', url: 'https://www.youtube.com/embed/tgbNymZ7vqY' },
    ],
  },
  {
    id: 2,
    titulo: 'Etapa 2',
    videos: [
      { titulo: 'Introdução à Etapa 2', url: 'https://www.youtube.com/embed/ZbZSe6N_BXs' },
      { titulo: 'Exemplo Etapa 2.2', url: 'https://www.youtube.com/embed/oHg5SJYRHA0' },
      { titulo: 'Exemplo Etapa 2.3', url: 'https://www.youtube.com/embed/kJQP7kiw5Fk' },
    ],
  },
  {
    id: 3,
    titulo: 'Etapa 3',
    videos: [
      { titulo: 'Aula 1 Etapa 3', url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ' },
      { titulo: 'Aula 2 Etapa 3', url: 'https://www.youtube.com/embed/L_jWHffIx5E' },
      { titulo: 'Aula 3 Etapa 3', url: 'https://www.youtube.com/embed/JGwWNGJdvx8' },
    ],
  },
  {
    id: 4,
    titulo: 'Etapa 4',
    videos: [
      { titulo: 'Finalização', url: 'https://www.youtube.com/embed/2Vv-BfVoq4g' },
      { titulo: 'Avaliação Final', url: 'https://www.youtube.com/embed/0KSOMA3QBU0' },
      { titulo: 'Encerramento', url: 'https://www.youtube.com/embed/CevxZvSJLk8' },
    ],
  },
];

const Treinamento = () => {
  const [user] = useAuthState(auth);
  const [etapaLiberada, setEtapaLiberada] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');

    const unsubscribe = onSnapshot(doc(db, 'usuarios', user.email!), (docSnapshot) => {
      const data = docSnapshot.data();
      setEtapaLiberada(data?.etapaLiberada || 0);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  if (etapaLiberada === null) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Treinamento</h1>
      {etapas.map((etapa) => (
        <div key={etapa.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {etapa.titulo} {etapa.id > etapaLiberada && <span className="text-red-500">(Bloqueada)</span>}
          </h2>

          {etapa.id <= etapaLiberada ? (
            <div className="grid md:grid-cols-3 gap-4">
              {etapa.videos.map((video, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-2">
                  <h3 className="text-sm font-medium mb-1">{video.titulo}</h3>
                  <iframe
                    width="100%"
                    height="200"
                    src={video.url}
                    title={video.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Acesso bloqueado. Aguarde a liberação do gestor.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Treinamento;