import React from 'react';
import { Card, Rarity } from '../types';
import { ElixirIcon } from './Icons';

interface CharacterCardProps {
  card: Card;
  onCardClick: (card: Card) => void;
  onAddToDeck: (card: Card) => void;
  isSelectedInDeck: boolean;
}

const rarityStyles: { [key in Rarity]: string } = {
  [Rarity.Common]: 'border-gray-400 bg-gray-800',
  [Rarity.Rare]: 'border-orange-400 bg-orange-900 bg-opacity-40',
  [Rarity.Epic]: 'border-purple-500 bg-purple-900 bg-opacity-40',
  [Rarity.Legendary]: 'border-yellow-400 bg-yellow-900 bg-opacity-40',
  [Rarity.Champion]: 'border-indigo-400 bg-indigo-900 bg-opacity-40',
};

export const CharacterCard: React.FC<CharacterCardProps> = ({ card, onCardClick, onAddToDeck, isSelectedInDeck }) => {
  const rarityClass = rarityStyles[card.rarity];

  return (
    <div className={`relative rounded-xl border-2 ${rarityClass} overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer`}>
      <div onClick={() => onCardClick(card)}>
        <div className="absolute top-1 left-1 bg-black bg-opacity-70 rounded-full p-1 flex items-center z-10">
          <span className="text-white font-bold text-sm">{card.elixir}</span>
          <ElixirIcon className="w-4 h-4 ml-1" />
        </div>
        <img src={card.imageUrl} alt={card.name} className="w-full" />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-center">
          <h3 className="text-white font-clash text-lg tracking-wider">{card.name}</h3>
        </div>
      </div>
      
      {card.evolutionImageUrl && (
        <div className="absolute top-2 right-10 bg-purple-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full z-10 shadow-lg animate-pulse" style={{ fontSize: '0.6rem' }}>
          EVO
        </div>
      )}

      <button
        onClick={() => onAddToDeck(card)}
        disabled={isSelectedInDeck}
        className={`absolute top-1 right-1 w-8 h-8 rounded-full flex items-center justify-center z-10 text-white font-bold text-lg transition-colors duration-200
          ${isSelectedInDeck ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} `}
        aria-label={isSelectedInDeck ? 'Added to deck' : 'Add to deck'}
      >
        {isSelectedInDeck ? '✓' : '+'}
      </button>
    </div>
  );
};
