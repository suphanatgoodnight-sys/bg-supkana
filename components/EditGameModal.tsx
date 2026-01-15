
import React, { useState, useEffect } from 'react';
import { BoardGame } from '../types';

interface EditGameModalProps {
  game: BoardGame;
  onClose: () => void;
  onConfirm: (updatedGame: BoardGame) => void;
}

const InputField: React.FC<{ id: keyof BoardGame; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: 'text' | 'textarea'; required?: boolean; }> = 
({ id, label, value, onChange, type = 'text', required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 text-left">{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={id}
                name={id}
                required={required}
                value={value}
                onChange={onChange}
                rows={3}
                className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        ) : (
            <input
                id={id}
                name={id}
                type="text"
                required={required}
                value={value}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        )}
    </div>
);


const EditGameModal: React.FC<EditGameModalProps> = ({ game, onClose, onConfirm }) => {
    const [formData, setFormData] = useState(game);

    useEffect(() => {
        setFormData(game);
    }, [game]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" aria-modal="true" role="dialog">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full m-4">
                <h2 className="text-2xl font-bold text-white mb-6">แก้ไขข้อมูลบอร์ดเกม</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField id="title" label="ชื่อบอร์ดเกม" value={formData.title} onChange={handleChange} />
                    <InputField id="description" label="คำอธิบาย" value={formData.description} onChange={handleChange} type="textarea" />
                    <InputField id="players" label="จำนวนผู้เล่น" value={formData.players} onChange={handleChange} />
                    <InputField id="playTime" label="เวลาที่ใช้เล่น" value={formData.playTime} onChange={handleChange} />
                    <InputField id="imageUrl" label="URL รูปภาพ" value={formData.imageUrl} onChange={handleChange} />
                    
                    <div className="pt-4 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">ยกเลิก</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">บันทึกการเปลี่ยนแปลง</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGameModal;
