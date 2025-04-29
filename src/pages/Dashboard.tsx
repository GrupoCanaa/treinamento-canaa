import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#0000b3] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo ao Dashboard!</h1>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/treinamento')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow"
          >
            Iniciar Treinamento
          </button>

      
        </div>
      </div>
    </div>
  );
};

export default Dashboard;