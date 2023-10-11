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
  r(c.HEAL, 'ヒーリングベル', ['Y', 'R', 'G'], [
    ['セイタカトーン', 3],
    ['マジックグラス', 3],
    ['銀のハチの巣', 3],
  ]),
  r(c.DEBUFF, '暗黒水', ['B', 'R', 'G'], [
    ['雲海の隠れ家', 1],
    ['闇の雫', 2],
    ['風船魚', 1],
  ]),
  r(c.BUFF, '錬金キャンディ', ['B', 'P', 'Y'], [
    ['セリヨル', 15],
    ['黒水', 10],
  ]),
  r(c.WEAPON, 'フランベルジュ', ['B', 'Y', 'R'], [
    ['うに', 5],
    ['トーン', 5],
  ]),
  r(c.WEAPON, '精霊の杖・火', ['B', 'P', 'R'], [
    ['赤砂', 5],
    ['スイートリーフ', 15],
  ]),
];

export default recipes;
