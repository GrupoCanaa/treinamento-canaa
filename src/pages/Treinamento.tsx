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
  1: [{ id: 1, titulo: "Introdução ao Treinamento", url: "https://www.youtube.com/embed/em2CTJYPHl0" }],
  2: [{ id: 2, titulo: "Exemplo Etapa 2 - Vídeo 1", url: "https://www.youtube.com/embed/video_exemplo2_1" }],
  3: [{ id: 3, titulo: "Exemplo Etapa 3 - Vídeo 1", url: "https://www.youtube.com/embed/video_exemplo3_1" }],
  4: [{ id: 4, titulo: "Exemplo Etapa 4 - Vídeo 1", url: "https://www.youtube.com/embed/video_exemplo4_1" }],
};

const Treinamento = () => {
  const [user] = useAuthState(auth);
  const [liberacoes, setLiberacoes] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return navigate('/login');

    const ref = doc(db, 'liberacoes', user.email.toLowerCase());
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
    <div className="flex justify-center py-8 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Treinamento</h1>

          {Object.entries(etapas).map(([etapaNum, videos]) => {
            const etapa = parseInt(etapaNum);
            const liberada = liberacoes[etapa];

            return (
              <div key={etapa} className="mb-10 border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Etapa {etapa}{" "}
                  {!liberada && <span className="text-red-500 text-sm">(Bloqueada)</span>}
                </h2>

                {liberada ? (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <div key={video.id} className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
                        <h3 className="text-sm font-medium mb-2 text-center">{video.titulo}</h3>
                        <iframe
                          width="100%"
                          height="200"
                          src={video.url}
                          title={video.titulo}
                          className="rounded-lg"
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
      </div>
    </div>
  );
};

export default Treinamento;