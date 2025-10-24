import React, { useState } from 'react';
import { Card } from '../types';
import { ElixirIcon } from './Icons';
import { getDeckStrategy } from '../services/geminiService';

interface DeckBuilderProps {
  deck: Card[];
  onRemoveFromDeck: (card: Card) => void;
  onClearDeck: () => void;
  onRandomizeDeck: () => void;
}

const DeckSlot: React.FC<{ card: Card | null, onRemove: (card: Card) => void }> = ({ card, onRemove }) => {
  if (!card) {
    return <div className="aspect-[3/4] bg-gray-700 bg-opacity-50 border-2 border-dashed border-gray-500 rounded-lg"></div>;
  }
  return (
    <div className="relative aspect-[3/4] group">
      <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover rounded-lg" />
      <div
        onClick={() => onRemove(card)}
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center cursor-pointer transition-all duration-300"
      >
        <span className="text-white text-3xl font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">&times;</span>
      </div>
    </div>
  );
};

export const DeckBuilder: React.FC<DeckBuilderProps> = ({ deck, onRemoveFromDeck, onClearDeck, onRandomizeDeck }) => {
  const [strategy, setStrategy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const averageElixir = deck.length > 0
    ? (deck.reduce((sum, card) => sum + card.elixir, 0) / deck.length).toFixed(1)
    : '0.0';

  const handleGetStrategy = async () => {
    setIsLoading(true);
    setStrategy('');
    const result = await getDeckStrategy(deck);
    setStrategy(result);
    setIsLoading(false);
  };

  const filledSlots = Array(8).fill(null).map((_, i) => deck[i] || null);

  return (
    <aside className="w-full lg:w-96 p-4 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl flex-shrink-0 sticky top-4 self-start">
      <h2 className="font-clash text-2xl text-yellow-400 text-center mb-4">Your Deck</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {filledSlots.map((card, index) => (
          <DeckSlot key={index} card={card} onRemove={onRemoveFromDeck} />
        ))}
      </div>
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-900 rounded-lg">
        <span className="text-white font-semibold">Average Elixir:</span>
        <div className="flex items-center">
          <span className="text-white font-bold text-lg">{averageElixir}</span>
          <ElixirIcon className="w-5 h-5 ml-1" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleGetStrategy}
          disabled={deck.length < 8 || isLoading}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-clash tracking-wide"
        >
          {isLoading ? 'Thinking...' : 'AI Strategy'}
        </button>
      </div>
       <div className="flex gap-2 mb-4">
        <button
          onClick={onRandomizeDeck}
          className="w-1/2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors font-clash tracking-wide"
        >
          Randomize
        </button>
        <button
          onClick={onClearDeck}
          className="w-1/2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500 transition-colors font-clash tracking-wide"
        >
          Clear Deck
        </button>
      </div>

      {strategy && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg max-h-96 overflow-y-auto">
          <h3 className="font-clash text-xl text-yellow-400 mb-2">Gemini's Strategy</h3>
          <div className="text-gray-300 whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: strategy.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\*/g, '<br/>• ') }} />
        </div>
      )}
    </aside>
  );
};
