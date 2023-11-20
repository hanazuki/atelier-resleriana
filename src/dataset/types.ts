export type Color = 'R' | 'B' | 'G' | 'Y' | 'P'

export type AlchemistRarity = 1 | 2 | 3

export type Alchemist = {
  name: string;
  title: string;
  rarity: AlchemistRarity
  color1: Color;
  color2: Color;
  effects: [string, string, string];
}

export const ItemType = {
  CONSUMABLE: 'C',
  EQUIPMENT: 'E',
} as const

export type ItemType = typeof ItemType[keyof typeof ItemType]

export const ItemCategory = {
  HEAL: 'C|HEAL',
  ATTACK: 'C|ATTACK',
  BUFF: 'C|BUFF',
  DEBUFF: 'C|DEBUFF',
  WEAPON: 'E|WEAPON',
  ARMOUR: 'E|ARMOUR',
  JEWELRY: 'E|JEWELRY',
} as const

export type ItemCategory = typeof ItemCategory[keyof typeof ItemCategory]

export type Recipe = {
  series: string
  category: ItemCategory;
  name: string;
  colors: Color[];
  ingredients: {
    material: string;
    count: number;
  }[];
}

export type Material = {
  name: string;
  color: Color;
  effectType: ItemType;
  effects: [string, string];
};
