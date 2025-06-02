import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface Etapa {
  titulo: string;
  videoUrl: string;
}

const etapas: Etapa[] = [
  {
    titulo: "Etapa 1 - Introdução",
    videoUrl: "https://www.youtube.com/embed/em2CTJYPHl0",
  },
  {
    titulo: "Etapa 2 - Procedimentos",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Exemplo
  },
  {
    titulo: "Etapa 3 - Atendimento",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0", // Exemplo
  },
  {
    titulo: "Etapa 4 - Encerramento",
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY", // Exemplo
  },
];

const Treinamento: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [liberado, setLiberado] = useState(false);
  const [progresso, setProgresso] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      const userRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setLiberado(data.liberado || false);
        setProgresso(data.progresso || {});
      } else {
        await setDoc(userRef, { liberado: false, progresso: {} });
        setLiberado(false);
        setProgresso({});
      }

      setLoading(false);
    };

    fetchData();
  }, [user, db, navigate]);

  const concluirEtapa = async (index: number) => {
    if (!user) return;

    const etapaKey = `etapa${index + 1}`;
    const newProgresso = { ...progresso, [etapaKey]: true };
    setProgresso(newProgresso);

    const userRef = doc(db, "usuarios", user.uid);
    await updateDoc(userRef, { progresso: newProgresso });
  };

  if (loading) return <div className="p-4">Carregando...</div>;

  if (!liberado)
    return (
      <div className="p-4 text-red-600">
        Acesso bloqueado. Aguarde a liberação do gestor.
      </div>
    );

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">Treinamento</h1>
      {etapas.map((etapa, index) => {
        const etapaKey = `etapa${index + 1}`;
        const etapaLiberada =
          index === 0 || progresso[`etapa${index}`] === true;

        return (
          <div
            key={etapaKey}
            className={`border rounded-xl p-4 shadow ${
              etapaLiberada ? "bg-white" : "bg-gray-100 opacity-60"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{etapa.titulo}</h2>

            {etapaLiberada ? (
              <>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-64"
                    src={etapa.videoUrl}
                    title={`Video ${etapa.titulo}`}
                    allowFullScreen
                  ></iframe>
                </div>

                {progresso[etapaKey] ? (
                  <div className="text-green-600 font-semibold">
                    ✅ Etapa concluída
                  </div>
                ) : (
                  <button
                    onClick={() => concluirEtapa(index)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Concluir Etapa
                  </button>
                )}
              </>
            ) : (
              <div className="text-gray-500">
                Etapa bloqueada até conclusão da anterior.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Treinamento;