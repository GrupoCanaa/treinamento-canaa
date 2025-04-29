import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [equipe, setEquipe] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        email,
        nome,
        equipe,
        aprovado: false,
      });

      alert('Cadastro realizado com sucesso! Aguarde aprovação.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErro('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0000b3' }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16 object-contain" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastro</h2>

        <form onSubmit={handleCadastro} className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full p-3 rounded border"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome da Equipe"
            className="w-full p-3 rounded border"
            value={equipe}
            onChange={(e) => setEquipe(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 rounded border"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded"
          >
            Voltar para Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;