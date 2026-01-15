
import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
    onShowHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowHistory }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V5a1 1 0 00-.553-.894l-4-2A1 1 0 0011 3v14z" />
              <path d="M5 4a1 1 0 00-1.447.894l-4 2A1 1 0 000 8v10a1 1 0 00.553.894l4 2A1 1 0 005 20V4z" />
            </svg>
            <h1 className="text-xl md:text-3xl font-bold text-gray-100 tracking-wider">
              ยืม-คืน บอร์ดเกม
            </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
              onClick={onShowHistory}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
              ข้อมูลการยืมคืน
          </button>
          {user && (
            <>
              <div className="flex items-center">
                  <span className="hidden sm:inline text-gray-300 mr-4">Welcome, {user.name}</span>
                  <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border-2 border-indigo-400"/>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
