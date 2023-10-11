import { Ingredient, Color, ItemType } from './types';

const i = (name: string, color: Color, effectType: ItemType, effects: string[]): Ingredient => {
  return {
    name,
    color,
    effectType,
    effects,
  }
}

const t = ItemType

const ingredients = [
  i('うに', 'G', t.CONSUMABLE, ['火の祝福', '火の盾']),
  i('トーン', 'B', t.EQUIPMENT, ['火ダメージ上昇', '火耐性上昇']),
];

export default ingredients;
