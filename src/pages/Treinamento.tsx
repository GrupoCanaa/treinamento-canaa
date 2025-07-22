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
  1: [
    { id: 1, titulo: "Apresentação do Grupo Canaã", url: "https://www.youtube.com/embed/yYnm2hxGUeA" },
    { id: 2, titulo: "Boas-vindas", url: "https://www.youtube.com/embed/em2CTJYPHl0" },
    { id: 3, titulo: "Depoimentos", url: "https://www.youtube.com/embed/f0Yp5DbT-Gw" },
    { id: 4, titulo: "Ganhos de Consultor", url: "https://www.youtube.com/embed/pbVJY25LYzI" },
    { id: 5, titulo: "Plano de Valorização", url: "https://www.youtube.com/embed/HcKysP-3D50" },
    { id: 6, titulo: "Regras", url: "https://www.youtube.com/embed/qZDBLUUgpmk" }
  ],
  2: [
    { id: 7, titulo: "Ferramentas de Trabalho", url: "https://www.youtube.com/embed/exemplo1" },
    { id: 8, titulo: "Como abordar o cliente", url: "https://www.youtube.com/embed/exemplo2" }
  ],
  3: [
    { id: 9, titulo: "Processo de Venda", url: "https://www.youtube.com/embed/exemplo3" }
  ],
  4: [
    { id: 10, titulo: "Acompanhamento e Pós-venda", url: "https://www.youtube.com/embed/exemplo4" }
  ]
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