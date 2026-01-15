
import React from 'react';
import BoardGameCard from './BoardGameCard';
import { BoardGame } from '../types';

interface GameListProps {
  games: BoardGame[];
  onBorrow: (game: BoardGame) => void;
  onReturn: (id: number) => void;
  onEdit: (game: BoardGame) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onBorrow, onReturn, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {games.map(game => (
        <BoardGameCard 
            key={game.id} 
            game={game} 
            onBorrow={onBorrow}
            onReturn={onReturn}
            onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default GameList;
