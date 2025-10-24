import React from 'react';
import { CardType, Rarity } from '../types';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRarity: Rarity | 'all';
  setSelectedRarity: (rarity: Rarity | 'all') => void;
  selectedType: CardType | 'all';
  setSelectedType: (type: CardType | 'all') => void;
}

// FIX: Updated component props to resolve type mismatch between `value` and `selectedValue`.
const FilterButton = <T extends string>({ value, label, selectedValue, onClick }: { value: T, label: string, selectedValue: string, onClick: (value: T) => void }) => {
  const isActive = selectedValue === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 font-clash tracking-wide
        ${isActive ? 'bg-yellow-400 text-gray-900 shadow-md' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
    >
      {label}
    </button>
  );
};


export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRarity,
  setSelectedRarity,
  selectedType,
  setSelectedType
}) => {
  return (
    <div className="p-4 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl mb-6 sticky top-4 z-20 shadow-2xl">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a card..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 bg-gray-900 text-white rounded-lg border-2 border-gray-600 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white font-semibold mr-2">Rarity:</span>
          <FilterButton value="all" label="All" selectedValue={selectedRarity} onClick={setSelectedRarity} />
          {Object.values(Rarity).map(rarity => (
            <FilterButton key={rarity} value={rarity} label={rarity} selectedValue={selectedRarity} onClick={setSelectedRarity} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white font-semibold mr-2">Type:</span>
          <FilterButton value="all" label="All" selectedValue={selectedType} onClick={setSelectedType} />
          {Object.values(CardType).map(type => (
            <FilterButton key={type} value={type} label={type} selectedValue={selectedType} onClick={setSelectedType} />
          ))}
        </div>
      </div>
    </div>
  );
};
