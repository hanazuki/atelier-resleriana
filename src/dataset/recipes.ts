import { Recipe, Color, ItemCategory } from './types';

const c = ItemCategory;

const r = (category: ItemCategory, name: string, colors: [Color, Color, Color], ingredients: [string, number][]): Recipe => {
  return {
    category,
    name,
    colors,
    ingredients: ingredients.map(([name, count]) => ({ name, count })),
  };
}

const recipes = [
  r(c.HEAL, 'うに袋', ['B', 'Y', 'R'], [
    ['うに', 5],
  ]),
  r(c.HEAL, 'ヒーリングサルヴ', ['B', 'P', 'Y'], [
    ['トーン', 5],
  ]),
  r(c.WEAPON, 'フランベルジュ', ['B', 'Y', 'R'], [
    ['うに', 5],
    ['トーン', 5],
  ]),
];

export default recipes;
