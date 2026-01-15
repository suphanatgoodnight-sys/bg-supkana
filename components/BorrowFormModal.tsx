
import React, { useState } from 'react';
import { BoardGame, BorrowingRecord } from '../types';

interface BorrowFormModalProps {
  game: BoardGame;
  onClose: () => void;
  onConfirm: (formData: Omit<BorrowingRecord, 'id' | 'gameId' | 'gameTitle' | 'userEmail' | 'borrowTimestamp' | 'returnTimestamp'>) => void;
}

const InputField: React.FC<{ id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; }> = 
({ id, label, value, onChange, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 text-left">{label}</label>
        <input
            id={id}
            name={id}
            type="text"
            required={required}
            value={value}
            onChange={onChange}
            className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
);


const BorrowFormModal: React.FC<BorrowFormModalProps> = ({ game, onClose, onConfirm }) => {
    const [players, setPlayers] = useState('');
    const [room, setRoom] = useState('');
    const [borrowerId, setBorrowerId] = useState('');
    const [branch, setBranch] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ players, room, borrowerId, branch });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" aria-modal="true" role="dialog">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full m-4">
                <h2 className="text-2xl font-bold text-white mb-2">ยืมบอร์ดเกม</h2>
                <p className="text-indigo-400 font-semibold mb-6">{game.title}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField id="players" label="จำนวนผู้เล่น" value={players} onChange={e => setPlayers(e.target.value)} />
                    <InputField id="room" label="ห้อง" value={room} onChange={e => setRoom(e.target.value)} />
                    <InputField id="borrowerId" label="เลขประจำตัว" value={borrowerId} onChange={e => setBorrowerId(e.target.value)} />
                    <InputField id="branch" label="สาขา" value={branch} onChange={e => setBranch(e.target.value)} />
                    
                    <div className="pt-4 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">ยกเลิก</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">ยืนยันการยืม</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BorrowFormModal;
