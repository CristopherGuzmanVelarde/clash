export enum Rarity {
  Common = 'Common',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
  Champion = 'Champion',
}

export enum CardType {
  Troop = 'Troop',
  Building = 'Building',
  Spell = 'Spell',
}

export interface Card {
  id: string;
  name: string;
  elixir: number;
  rarity: Rarity;
  type: CardType;
  description: string;
  stats: {
    [key: string]: string | number;
  };
  imageUrl: string;
  evolutionImageUrl?: string;
}
