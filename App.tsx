import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardType, Rarity } from './types';
import { CARDS_DATA } from './data/cards';
import { CharacterCard } from './components/CharacterCard';
import { FilterBar } from './components/FilterBar';
import { DetailModal } from './components/DetailModal';
import { DeckBuilder } from './components/DeckBuilder';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
  const [selectedType, setSelectedType] = useState<CardType | 'all'>('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [deck, setDeck] = useState<Card[]>([]);

  const filteredCards = useMemo(() => {
    return CARDS_DATA.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity;
      const matchesType = selectedType === 'all' || card.type === selectedType;
      return matchesSearch && matchesRarity && matchesType;
    });
  }, [searchQuery, selectedRarity, selectedType]);

  const handleAddToDeck = useCallback((card: Card) => {
    if (deck.length < 8 && !deck.some(c => c.id === card.id)) {
      setDeck(prevDeck => [...prevDeck, card]);
    }
  }, [deck]);

  const handleRemoveFromDeck = useCallback((card: Card) => {
    setDeck(prevDeck => prevDeck.filter(c => c.id !== card.id));
  }, []);

  const handleClearDeck = useCallback(() => {
    setDeck([]);
  }, []);

  const handleRandomizeDeck = useCallback(() => {
    const shuffled = [...CARDS_DATA].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 8));
  }, []);

  const handleCardClick = useCallback((card: Card) => {
    setSelectedCard(card);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCard(null);
  }, []);
  
  const deckCardIds = useMemo(() => new Set(deck.map(c => c.id)), [deck]);

  return (
    <>
      <div className="container mx-auto p-4">
        <header className="text-center my-8">
          <h1 className="font-clash text-5xl md:text-7xl font-bold text-yellow-400 tracking-wider" style={{ textShadow: '2px 2px #000, 4px 4px #7f1d1d' }}>
            Clash Royale Deck Builder
          </h1>
          <p className="text-gray-300 mt-2 text-lg">Build your ultimate deck and get strategic advice from Gemini AI!</p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-grow w-full">
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCards.map(card => (
                <CharacterCard
                  key={card.id}
                  card={card}
                  onCardClick={handleCardClick}
                  onAddToDeck={handleAddToDeck}
                  isSelectedInDeck={deckCardIds.has(card.id)}
                />
              ))}
            </div>
          </div>
          <DeckBuilder
            deck={deck}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
            onRandomizeDeck={handleRandomizeDeck}
          />
        </main>
      </div>
      <DetailModal card={selectedCard} onClose={handleCloseModal} />
    </>
  );
};

export default App;
