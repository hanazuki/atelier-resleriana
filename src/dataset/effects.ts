import { Effect, EffectCategory, ItemType } from './types'

const e = (name: string, itemType: ItemType, category: EffectCategory): Effect => {
  return {
    name,
    itemType,
    category,
  }
}

const t = ItemType
const c = EffectCategory

const effects: Effect[] = [
  e('与ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('スキル威力上昇', t.EQUIPMENT, c.ATTACK),
  e('斬ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('打ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('突ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('火ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('氷ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('風ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('雷ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('物理ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('魔法ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('ブレイク中ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('ブレイクダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('物理ブレイクダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('魔法ブレイクダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('ブレイクダメージ上昇【背水】', t.EQUIPMENT, c.ATTACK),
  e('ブレイクダメージ上昇【渾身】', t.EQUIPMENT, c.ATTACK),
  e('単体攻撃威力上昇', t.EQUIPMENT, c.ATTACK),
  e('全体攻撃威力上昇', t.EQUIPMENT, c.ATTACK),
  e('物理ダメージ上昇【背水】', t.EQUIPMENT, c.ATTACK),
  e('物理ダメージ上昇【渾身】', t.EQUIPMENT, c.ATTACK),
  e('魔法ダメージ上昇【背水】', t.EQUIPMENT, c.ATTACK),
  e('魔法ダメージ上昇【渾身】', t.EQUIPMENT, c.ATTACK),
  e('ぷにダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('獣ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('精霊ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('水棲ダメージ上昇', t.EQUIPMENT, c.ATTACK),
  e('鳥ダメージ上昇', t.EQUIPMENT, c.ATTACK),

  e('斬耐性上昇', t.EQUIPMENT, c.BUFF),
  e('打耐性上昇', t.EQUIPMENT, c.BUFF),
  e('突耐性上昇', t.EQUIPMENT, c.BUFF),
  e('火耐性上昇', t.EQUIPMENT, c.BUFF),
  e('氷耐性上昇', t.EQUIPMENT, c.BUFF),
  e('風耐性上昇', t.EQUIPMENT, c.BUFF),
  e('雷耐性上昇', t.EQUIPMENT, c.BUFF),
  e('物理耐性上昇', t.EQUIPMENT, c.BUFF),
  e('魔法耐性上昇', t.EQUIPMENT, c.BUFF),
  e('全体攻撃耐性上昇', t.EQUIPMENT, c.BUFF),
  e('全体攻撃耐性上昇【背水】', t.EQUIPMENT, c.BUFF),
  e('全耐性上昇【背水】', t.EQUIPMENT, c.BUFF),
  e('魔法耐性上昇【渾身】', t.EQUIPMENT, c.BUFF),
  e('物理耐性上昇【渾身】', t.EQUIPMENT, c.BUFF),
  e('魔法耐性上昇【D】', t.EQUIPMENT, c.BUFF),
  e('物理耐性上昇【D】', t.EQUIPMENT, c.BUFF),
  e('物理/魔法耐性アップ強化【D】', t.EQUIPMENT, c.BUFF),
  e('ダメージバフ強化【A】', t.EQUIPMENT, c.BUFF),
  e('ダメージバフ強化【B】', t.EQUIPMENT, c.BUFF),
  e('物理/魔法耐性アップ強化', t.EQUIPMENT, c.BUFF),
  e('ぷにダメージ軽減', t.EQUIPMENT, c.BUFF),
  e('獣ダメージ軽減', t.EQUIPMENT, c.BUFF),
  e('精霊ダメージ軽減', t.EQUIPMENT, c.BUFF),
  e('水棲ダメージ軽減', t.EQUIPMENT, c.BUFF),
  e('鳥ダメージ軽減', t.EQUIPMENT, c.BUFF),

  e('物理/魔法耐性ダウン強化', t.EQUIPMENT, c.DEBUFF),

  e('回復量上昇【渾身】', t.EQUIPMENT, c.HEAL),
  e('回復量上昇【背水】', t.EQUIPMENT, c.HEAL),
  e('回復量上昇', t.EQUIPMENT, c.HEAL),
  e('単体回復量上昇', t.EQUIPMENT, c.HEAL),
  e('全体回復量上昇', t.EQUIPMENT, c.HEAL),
  e('回復量上昇【D】', t.EQUIPMENT, c.HEAL),

  e('剛力の祝福', t.CONSUMABLE, c.ATTACK),
  e('斬の祝福', t.CONSUMABLE, c.ATTACK),
  e('打の祝福', t.CONSUMABLE, c.ATTACK),
  e('突の祝福', t.CONSUMABLE, c.ATTACK),
  e('魔力の祝福', t.CONSUMABLE, c.ATTACK),
  e('火の祝福', t.CONSUMABLE, c.ATTACK),
  e('氷の祝福', t.CONSUMABLE, c.ATTACK),
  e('風の祝福', t.CONSUMABLE, c.ATTACK),
  e('雷の祝福', t.CONSUMABLE, c.ATTACK),
  e('ぷに特攻', t.CONSUMABLE, c.ATTACK),
  e('精霊特攻', t.CONSUMABLE, c.ATTACK),
  e('獣特攻', t.CONSUMABLE, c.ATTACK),
  e('鳥特攻', t.CONSUMABLE, c.ATTACK),
  e('水棲特攻', t.CONSUMABLE, c.ATTACK),
  e('使い切り攻撃強化', t.CONSUMABLE, c.ATTACK),
  e('追い打ち強化', t.CONSUMABLE, c.ATTACK),
  e('破壊力上昇', t.CONSUMABLE, c.ATTACK),

  e('守護の祝福', t.CONSUMABLE, c.BUFF),
  e('魔防の祝福', t.CONSUMABLE, c.BUFF),
  e('物防の祝福', t.CONSUMABLE, c.BUFF),
  e('斬の盾', t.CONSUMABLE, c.BUFF),
  e('打の盾', t.CONSUMABLE, c.BUFF),
  e('突の盾', t.CONSUMABLE, c.BUFF),
  e('火の盾', t.CONSUMABLE, c.BUFF),
  e('氷の盾', t.CONSUMABLE, c.BUFF),
  e('風の盾', t.CONSUMABLE, c.BUFF),
  e('雷の盾', t.CONSUMABLE, c.BUFF),
  e('ぷに特防', t.CONSUMABLE, c.BUFF),
  e('精霊特防', t.CONSUMABLE, c.BUFF),
  e('獣特防', t.CONSUMABLE, c.BUFF),
  e('鳥特防', t.CONSUMABLE, c.BUFF),
  e('水棲特防', t.CONSUMABLE, c.BUFF),
  e('会心の出来', t.CONSUMABLE, c.BUFF),

  e('剛力の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('斬の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('打の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('突の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('魔力の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('火の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('氷の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('風の呪詛', t.CONSUMABLE, c.DEBUFF),
  e('雷の呪詛', t.CONSUMABLE, c.DEBUFF),

  e('大きな回復量', t.CONSUMABLE, c.HEAL),
  e('単体回復ボーナス', t.CONSUMABLE, c.HEAL),
  e('全体回復ボーナス', t.CONSUMABLE, c.HEAL),
  e('使い切り回復強化', t.CONSUMABLE, c.HEAL),
]

export default effects
