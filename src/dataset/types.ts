export type Color = 'R' | 'B' | 'G' | 'Y' | 'P'

export type Alchemist = {
  name: string;
  title: string;
  color: [Color, Color];
  effects: string[];
}

export const ItemCategory = {
  HEAL: 'HEAL',
  ATTACK: 'ATTACK',
  BUFF: 'BUFF',
  DEBUFF: 'DEBUFF',
  WEAPON: 'WEAPON',
  ARMOUR: 'ARMOUR',
  JEWELRY: 'JEWELRY',
} as const;

export type ItemCategory = typeof ItemCategory[keyof typeof ItemCategory];

export const ItemCategories: ItemCategory[] = [
  ItemCategory.HEAL,
  ItemCategory.ATTACK,
  ItemCategory.BUFF,
  ItemCategory.DEBUFF,
  ItemCategory.WEAPON,
  ItemCategory.ARMOUR,
  ItemCategory.JEWELRY,
]

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
  color: Color,
  effects: string[];
};
