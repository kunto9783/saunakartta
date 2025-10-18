
import React from 'react';
import { Sauna, SaunaType } from '../types';
import { CloseIcon } from './Icons';

interface SaunaDetailsProps {
    sauna: Sauna | null;
    onClose: () => void;
}

const typeColors: Record<SaunaType, string> = {
    wood: 'bg-red-800 text-red-100',
    electric: 'bg-blue-800 text-blue-100',
    smoke: 'bg-gray-800 text-gray-100',
    other: 'bg-green-800 text-green-100',
};

const SaunaDetails: React.FC<SaunaDetailsProps> = ({ sauna, onClose }) => {
    if (!sauna) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative text-gray-800 overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
                <img src={`https://picsum.photos/seed/${sauna.id}/400/200`} alt={sauna.name} className="w-full h-48 object-cover" />
                <button onClick={onClose} className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/80 transition-colors">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <div className="p-6">
                    <span className={`capitalize text-xs font-bold px-2 py-1 rounded-full ${typeColors[sauna.type]}`}>
                        {sauna.type} Sauna
                    </span>
                    <h2 className="text-3xl font-bold mt-2 font-serif">{sauna.name}</h2>
                    <p className="text-gray-600 mt-4 text-lg">{sauna.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SaunaDetails;
