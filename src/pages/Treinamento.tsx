import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface Video {
  id: number;
  titulo: string;
  url: string;
}

const etapas: Record<number, Video[]> = {
  1: [ { id: 1, titulo: "Introdução ao Treinamento", url: "https://www.youtube.com/embed/em2CTJYPHl0" } ],
  2: [ { id: 2, titulo: "Exemplo Etapa 2 - Vídeo 1", url: "https://www.youtube.com/embed/video_exemplo2_1" } ],
  3: [ { id: 3, titulo: "Exemplo Etapa 3 - Vídeo 1", url: "https://www.youtube.com/embed/video_exemplo3_1" } ],
  4: [ { id: 4, titulo: "Exemplo Etapa 4 - Vídeo 1", url: "https://www.youtube.com/embed/video_exemplo4_1" } ],
};

const Treinamento = () => {
  const [user] = useAuthState(auth);
  const [liberacoes, setLiberacoes] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

useEffect(() => {
  if (!user?.email) return navigate('/login');

  const email = user.email.toLowerCase(); // <- aqui
  const ref = doc(db, 'liberacoes', email); // <- aqui
  const unsubscribe = onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      setLiberacoes({
        1: data.etapa1 === true,
        2: data.etapa2 === true,
        3: data.etapa3 === true,
        4: data.etapa4 === true,
      });
    } else {
      setLiberacoes({});
    }
  });

  return () => unsubscribe();
}, [user, navigate]);

  if (!user || Object.keys(liberacoes).length === 0) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Treinamento</h1>
      {Object.entries(etapas).map(([etapaNum, videos]) => {
        const etapa = parseInt(etapaNum);
        const liberada = liberacoes[etapa];

        return (
          <div key={etapa} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Etapa {etapa} {liberada ? '' : <span className="text-red-500">(Bloqueada)</span>}
            </h2>

            {liberada ? (
              <div className="grid md:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg shadow p-2">
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
        );
      })}
    </div>
  );
};

export default Treinamento;