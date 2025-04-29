import React from 'react';

interface ProgressoProps {
  total: number;
  concluídos: number;
}

const Progresso: React.FC<ProgressoProps> = ({ total, concluídos }) => {
  const percentual = Math.round((concluídos / total) * 100);

  return (
    <div className="w-full bg-gray-200 h-3 rounded-lg mt-4">
      <div
        className="bg-blue-600 h-3 rounded-lg"
        style={{ width: `${percentual}%` }}
      ></div>
    </div>
  );
};

export default Progresso;