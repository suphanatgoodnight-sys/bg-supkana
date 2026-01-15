
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginModalProps {
  onClose: () => void;
}

const Login: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email);
      // The parent component will close the modal upon successful login via an effect.
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" aria-modal="true" role="dialog">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-sm w-full m-4 relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
        <div className="flex items-center justify-center mb-6">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mr-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V5a1 1 0 00-.553-.894l-4-2A1 1 0 0011 3v14z" />
            <path d="M5 4a1 1 0 00-1.447.894l-4 2A1 1 0 000 8v10a1 1 0 00.553.894l4 2A1 1 0 005 20V4z" />
          </svg>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">Login Required</h1>
        </div>
        <p className="text-gray-400 mb-8">Please enter your email to continue.</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email Address"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            aria-label="Login"
            disabled={!email.trim()}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
