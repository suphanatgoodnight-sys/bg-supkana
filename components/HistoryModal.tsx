
import React from 'react';
import { BorrowingRecord } from '../types';

interface HistoryModalProps {
  history: BorrowingRecord[];
  onClose: () => void;
}

const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const HistoryModal: React.FC<HistoryModalProps> = ({ history, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">ประวัติการยืม-คืน</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="overflow-auto custom-scrollbar">
                {history.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">ไม่มีประวัติการยืม</p>
                ) : (
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-indigo-300 uppercase bg-gray-700 sticky top-0">
                        <tr>
                            <th scope="col" className="px-4 py-3">บอร์ดเกม</th>
                            <th scope="col" className="px-4 py-3">ผู้เล่น</th>
                            <th scope="col" className="px-4 py-3">ห้อง</th>
                            <th scope="col" className="px-4 py-3">เลขประจำตัว</th>
                            <th scope="col" className="px-4 py-3">สาขา</th>
                            <th scope="col" className="px-4 py-3">เวลายืม</th>
                            <th scope="col" className="px-4 py-3">เวลาคืน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map(record => (
                            <tr key={record.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                                <th scope="row" className="px-4 py-4 font-medium text-white whitespace-nowrap">{record.gameTitle}</th>
                                <td className="px-4 py-4">{record.players}</td>
                                <td className="px-4 py-4">{record.room}</td>
                                <td className="px-4 py-4">{record.borrowerId}</td>
                                <td className="px-4 py-4">{record.branch}</td>
                                <td className="px-4 py-4">{formatDate(record.borrowTimestamp)}</td>
                                <td className="px-4 py-4">{formatDate(record.returnTimestamp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    </div>
  );
};

export default HistoryModal;
