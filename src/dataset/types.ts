export type Color = 'R' | 'B' | 'G' | 'Y' | 'P'

export type Alchemist = {
  name: string;
  title: string;
  colors: [Color, Color];
  effects: string[];
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
  category: ItemCategory;
  name: string;
  colors: Color[],
  ingredients: {
    name: string;
    count: number;
  }[],
}

export type Ingredient = {
  name: string;
  color: Color;
  effectType: ItemType;
  effects: string[];
};
