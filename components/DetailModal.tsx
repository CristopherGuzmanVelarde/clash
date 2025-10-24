import React from 'react';
import { Card, Rarity } from '../types';
import { ElixirIcon } from './Icons';

interface DetailModalProps {
  card: Card | null;
  onClose: () => void;
}

const rarityStyles: { [key in Rarity]: string } = {
    [Rarity.Common]: 'from-gray-700 to-gray-800 text-white',
    [Rarity.Rare]: 'from-orange-500 to-orange-700 text-white',
    [Rarity.Epic]: 'from-purple-600 to-purple-800 text-white',
    [Rarity.Legendary]: 'from-yellow-400 to-yellow-600 text-black',
    [Rarity.Champion]: 'from-indigo-500 to-indigo-700 text-white',
};

export const DetailModal: React.FC<DetailModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  const rarityClass = rarityStyles[card.rarity];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className={`relative w-full max-w-md bg-gray-900 rounded-2xl border-4 border-yellow-400 shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 animate-modal-enter`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 bg-gradient-to-br ${rarityClass}`}>
          <div className="flex justify-between items-start">
            <h2 className="font-clash text-4xl tracking-wider">{card.name}</h2>
            <div className="flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1">
              <span className="font-bold text-2xl text-white">{card.elixir}</span>
              <ElixirIcon className="w-7 h-7 ml-2" />
            </div>
          </div>
          <p className="font-bold text-lg">{card.rarity} {card.type}</p>
        </div>

        <div className="p-6 flex flex-col items-center max-h-[70vh] overflow-y-auto">
            <img src={card.imageUrl} alt={card.name} className="w-48 h-auto -mt-24 mb-4 drop-shadow-2xl" />
            <p className="text-gray-300 italic text-center mb-6">"{card.description}"</p>

            <div className="w-full bg-gray-800 p-4 rounded-lg">
                <h3 className="font-clash text-xl text-yellow-400 mb-2 text-center">Stats</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-white">
                    {Object.entries(card.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-700 py-1">
                            <span className="font-semibold text-gray-400">{key}:</span>
                            <span className="font-bold">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {card.evolutionImageUrl && (
                <div className="w-full bg-gray-800 p-4 rounded-lg mt-4">
                    <h3 className="font-clash text-xl text-purple-400 mb-2 text-center">Evolution</h3>
                    <img src={card.evolutionImageUrl} alt={`${card.name} Evolution`} className="w-48 h-auto mx-auto drop-shadow-2xl" />
                </div>
            )}
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl z-10">
          &times;
        </button>
      </div>
      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
