
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameList from './components/GameList';
import Footer from './components/Footer';
import Login from './components/Login';
import BorrowFormModal from './components/BorrowFormModal';
import HistoryModal from './components/HistoryModal';
import EditGameModal from './components/EditGameModal';
import { initialGames } from './data/games';
import { BoardGame, GameStatus, BorrowingRecord } from './types';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const [games, setGames] = useState<BoardGame[]>(initialGames);
  const { user } = useAuth();
  
  const [history, setHistory] = useState<BorrowingRecord[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [gameToBorrow, setGameToBorrow] = useState<BoardGame | null>(null);
  const [gameToEdit, setGameToEdit] = useState<BoardGame | null>(null);
  const [postLoginAction, setPostLoginAction] = useState<'borrow' | 'viewHistory' | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('borrowingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
        localStorage.setItem('borrowingHistory', JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    if (user && postLoginAction) {
      setIsLoginModalOpen(false);
      if (postLoginAction === 'borrow' && gameToBorrow) {
        setIsBorrowModalOpen(true);
      } else if (postLoginAction === 'viewHistory') {
        setIsHistoryModalOpen(true);
      }
      setPostLoginAction(null);
    }
  }, [user, postLoginAction, gameToBorrow]);

  const handleBorrowAttempt = (game: BoardGame) => {
    if (user) {
      setGameToBorrow(game);
      setIsBorrowModalOpen(true);
    } else {
      setGameToBorrow(game);
      setPostLoginAction('borrow');
      setIsLoginModalOpen(true);
    }
  };
  
  const handleHistoryAttempt = () => {
    if (user) {
        setIsHistoryModalOpen(true);
    } else {
        setPostLoginAction('viewHistory');
        setIsLoginModalOpen(true);
    }
  };

  const handleEditAttempt = (game: BoardGame) => {
    setGameToEdit(game);
    setIsEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsBorrowModalOpen(false);
    setIsHistoryModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditModalOpen(false);
    setGameToBorrow(null);
    setGameToEdit(null);
    setPostLoginAction(null);
  };

  const handleConfirmBorrow = (formData: Omit<BorrowingRecord, 'id' | 'gameId' | 'gameTitle' | 'userEmail' | 'borrowTimestamp' | 'returnTimestamp'>) => {
    if (!gameToBorrow || !user) return;

    const newRecord: BorrowingRecord = {
      ...formData,
      id: `${Date.now()}-${gameToBorrow.id}`,
      gameId: gameToBorrow.id,
      gameTitle: gameToBorrow.title,
      userEmail: user.email,
      borrowTimestamp: new Date().toISOString(),
    };
    
    setHistory(prev => [newRecord, ...prev]);
    
    setGames(prevGames => prevGames.map(g => 
      g.id === gameToBorrow.id ? { ...g, status: GameStatus.Borrowed } : g
    ));
    
    handleCloseModals();
  };

  const handleReturnGame = (gameId: number) => {
    setHistory(prev => 
      prev.map(r => 
        (r.gameId === gameId && !r.returnTimestamp) ? { ...r, returnTimestamp: new Date().toISOString() } : r
      )
    );

    setGames(prevGames => prevGames.map(g => 
      g.id === gameId ? { ...g, status: GameStatus.Available } : g
    ));
  };

  const handleUpdateGame = (updatedGame: BoardGame) => {
    setGames(prevGames => prevGames.map(g => g.id === updatedGame.id ? updatedGame : g));
    handleCloseModals();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header onShowHistory={handleHistoryAttempt} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <GameList 
            games={games} 
            onBorrow={handleBorrowAttempt}
            onReturn={handleReturnGame}
            onEdit={handleEditAttempt}
        />
      </main>
      <Footer />
      
      {isLoginModalOpen && <Login onClose={handleCloseModals} />}

      {isBorrowModalOpen && gameToBorrow && (
        <BorrowFormModal 
          game={gameToBorrow}
          onClose={handleCloseModals}
          onConfirm={handleConfirmBorrow}
        />
      )}

      {isEditModalOpen && gameToEdit && (
        <EditGameModal
          game={gameToEdit}
          onClose={handleCloseModals}
          onConfirm={handleUpdateGame}
        />
      )}

      {user && isHistoryModalOpen && (
        <HistoryModal
          history={history.filter(record => record.userEmail === user.email)}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
};

export default App;
