
import React from 'react';
import { BoardGame, GameStatus } from '../types';
import { useAuth } from '../hooks/useAuth';

interface BoardGameCardProps {
  game: BoardGame;
  onBorrow: (game: BoardGame) => void;
  onReturn: (id: number) => void;
  onEdit: (game: BoardGame) => void;
}

const StatusBadge: React.FC<{ status: GameStatus }> = ({ status }) => {
  const isAvailable = status === GameStatus.Available;
  const bgColor = isAvailable ? 'bg-green-500' : 'bg-yellow-500';
  const textColor = isAvailable ? 'text-green-900' : 'text-yellow-900';

  return (
    <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${bgColor} ${textColor}`}>
      {isAvailable ? 'ว่าง' : 'ถูกยืม'}
    </span>
  );
};

const InfoItem: React.FC<{ icon: React.ReactElement; text: string }> = ({ icon, text }) => (
  <div className="flex items-center text-gray-400">
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const BoardGameCard: React.FC<BoardGameCardProps> = ({ game, onBorrow, onReturn, onEdit }) => {
  const { id, title, description, imageUrl, players, playTime, status } = game;
  const { user } = useAuth();
  const isAvailable = status === GameStatus.Available;

  const buttonClasses = `w-full mt-4 py-2 px-4 rounded-md font-bold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
    isAvailable
      ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
      : 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900 focus:ring-yellow-400'
  }`;

  const playersIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0110 9c-1.55 0-2.958.5-4.07 1.33A6.97 6.97 0 004 16c0 .34.024.673.07 1h8.86z" />
    </svg>
  );

  const timeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
    </svg>
  );

  const handleActionClick = () => {
      if (isAvailable) {
          onBorrow(game);
      } else {
          onReturn(id);
      }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-1 transition-transform duration-300 relative flex flex-col">
      {user && (
        <button
          onClick={() => onEdit(game)}
          className="absolute top-4 left-4 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors z-10"
          aria-label="Edit Game"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <StatusBadge status={status} />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">{title}</h2>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex justify-between items-center text-sm mb-4 border-t border-b border-gray-700 py-3">
          <InfoItem icon={playersIcon} text={`${players} players`} />
          <InfoItem icon={timeIcon} text={playTime} />
        </div>
        <button onClick={handleActionClick} className={buttonClasses}>
          {isAvailable ? 'ยืมเกม' : 'คืนเกม'}
        </button>
      </div>
    </div>
  );
};

export default BoardGameCard;
