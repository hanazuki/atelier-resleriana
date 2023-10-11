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

const ingredients: Ingredient[] = [
  i('三つ子トーン', 'R', t.CONSUMABLE, ['鳥特攻', '鳥特防']),
  i('コゲクサ', 'R', t.CONSUMABLE, ['火の呪詛', '守護の祝福']),
  i('貯ミツアリ', 'R', t.CONSUMABLE, ['雷の祝福', '雷の盾']),
  i('きれない水', 'R', t.CONSUMABLE, ['大きな回復量', '魔力の呪詛']),
  i('レピアフィッシュ', 'R', t.CONSUMABLE, ['剛力の祝福', '魔力の祝福']),
  i('激憤の叫び', 'R', t.CONSUMABLE, ['精霊特攻', '使い切り回復強化']),
  i('砂晶石', 'R', t.CONSUMABLE, ['追い打ち強化', '単体回復ボーナス']),
  i('朽ちた樹の枯れ枝', 'R', t.CONSUMABLE, ['風の祝福', '会心の出来']),

  i('スイートリーフ', 'B', t.CONSUMABLE, ['氷の呪詛', '魔防の祝福']),
  i('セイタカトーン', 'B', t.CONSUMABLE, ['魔力の祝福', '魔力の呪詛']),
  i('シロヒメクサ', 'B', t.CONSUMABLE, ['風の祝福', '風の盾']),
  i('赤砂', 'B', t.CONSUMABLE, ['氷の祝福', '氷の盾']),
  i('パルマの実', 'B', t.CONSUMABLE, ['剛力の呪詛', '全体回復ボーナス']),
  i('彗星岩', 'B', t.CONSUMABLE, ['会心の出来', '破壊力上昇']),
  i('ブラストフィッシュ', 'B', t.CONSUMABLE, ['雷の盾', '使い切り攻撃強化']),
  i('古代魚', 'B', t.CONSUMABLE, ['風の呪詛', '突の盾']),
  i('香木のくず', 'B', t.CONSUMABLE, ['火の祝福', '火の盾']),

  i('黒水', 'G', t.CONSUMABLE, ['突の呪詛', '守護の祝福']),
  i('トゲトゲ', 'G', t.CONSUMABLE, ['斬の呪詛', '魔防の祝福']),
  i('うに', 'G', t.CONSUMABLE, ['火の祝福', '火の盾']),
  i('コベリナイト', 'G', t.CONSUMABLE, ['斬の祝福', '斬の盾']),
  i('綿毛草', 'G', t.CONSUMABLE, ['打の祝福', '打の盾']),
  i('甘露の実', 'G', t.CONSUMABLE, ['使い切り攻撃強化', '使い切り回復強化']),
  i('幻惑の木片', 'G', t.CONSUMABLE, ['打の呪詛', '大きな回復量']),

  i('ミネラル液晶', 'Y', t.CONSUMABLE, ['獣特攻', '獣特防']),
  i('モルディナイト', 'Y', t.CONSUMABLE, ['魔力の呪詛', '単体回復ボーナス']),
  i('乾いた木くず', 'Y', t.CONSUMABLE, ['打の呪詛', '物防の祝福']),
  i('フェスト', 'Y', t.CONSUMABLE, ['大きな回復量', '魔力の呪詛']),
  i('ローズビー', 'Y', t.CONSUMABLE, ['風の盾', '雷の呪詛']),
  i('ほたる火草', 'Y', t.CONSUMABLE, ['精霊特攻', '精霊特防']),
  i('ソーンフィッシュ', 'Y', t.CONSUMABLE, ['水棲特攻', '水棲特防']),
  i('ジェムフライ', 'Y', t.CONSUMABLE, ['斬の祝福', '斬の盾']),

  i('うにゾウムシ', 'P', t.CONSUMABLE, ['雷の呪詛', '雷の祝福']),
  i('月イナゴ', 'P', t.CONSUMABLE, ['ぷに特攻', 'ぷに特防']),
  i('チョウチョウウオ', 'P', t.CONSUMABLE, ['風の呪詛', '物防の祝福']),
  i('スカイバブル', 'P', t.CONSUMABLE, ['剛力の祝福', '剛力の呪詛']),
  i('植物エキス', 'P', t.CONSUMABLE, ['突の祝福', '突の盾']),
  i('樹氷石', 'P', t.CONSUMABLE, ['破壊力上昇', '全体回復ボーナス']),
  i('黒陽鉱', 'P', t.CONSUMABLE, ['会心の出来', '追い打ち強化']),
  i('太古の老木', 'P', t.CONSUMABLE, ['鳥特攻', '魔力の呪詛']),
  i('スキマグサ', 'P', t.CONSUMABLE, ['使い切り回復強化', '火の呪詛']),

  i('トーン', 'B', t.EQUIPMENT, ['火ダメージ上昇', '火耐性上昇']),
];

//i('', 'R', t.EQUIPMENT, ['', ''])


export default ingredients;
