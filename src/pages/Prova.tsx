import React from 'react';
import { useNavigate } from 'react-router-dom';

const Prova: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('progressoTreinamento');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0000b3] flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">Parabéns! Você chegou na Prova 🎉</h1>
      <p className="text-lg mb-8">Aqui futuramente vamos adicionar as questões.</p>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-2xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Prova;