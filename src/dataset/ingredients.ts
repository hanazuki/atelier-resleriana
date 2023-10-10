import { Ingredient, Color } from './types';

const i = (name: string, color: Color, effects: string[]): Ingredient => {
  return {
    name,
    color,
    effects,
  }
};

const ingredients = [
  i('うに', 'G', ['火の祝福', '火の盾']),
  i('トーン', 'B', ['火ダメージ上昇', '火耐性上昇']),
];

export default ingredients;
