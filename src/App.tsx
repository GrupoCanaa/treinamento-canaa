import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Treinamento from './pages/Treinamento';
import Prova from './pages/Prova';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/treinamento" element={<Treinamento />} />
        <Route path="/prova" element={<Prova />} />
        {/* Se você não tiver uma rota para a página inicial, pode adicionar */}
        <Route path="/" element={<Login />} />  {/* Página inicial (login) */}
      </Routes>
    </Router>
  );
};

export default App;