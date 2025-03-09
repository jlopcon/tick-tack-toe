import React, { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/config';
import { RankingData } from '../types';

const Ranking: React.FC = () => {
  const [ranking, setRanking] = useState<RankingData[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const response = await fetch(API_ROUTES.GET_RANKING);
      const data: RankingData[] = await response.json();
      setRanking(data);
    };

    fetchRanking();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Ranking</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Jugador</th>
            <th className="px-4 py-2">Victorias</th>
            <th className="px-4 py-2">Derrotas</th>
            <th className="px-4 py-2">Empates</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((entry) => (
            <tr key={entry.player}>
              <td className="border px-4 py-2">{entry.player}</td>
              <td className="border px-4 py-2">{entry.wins}</td>
              <td className="border px-4 py-2">{entry.losses}</td>
              <td className="border px-4 py-2">{entry.draws}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;