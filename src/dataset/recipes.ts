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
  // Main

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
  r(c.ARMOUR, '旅人のベスト', ['Y', 'R', 'G'], [
    ['うに', 5],
    ['トーン', 5],
  ]),
  r(c.JEWELRY, 'うに型チャーム', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r(c.ATTACK, 'フラム', ['B', 'R', 'G'], [
    // TODO
  ]),
  r(c.HEAL, 'ドライビスク', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r(c.BUFF, '魔女の秘薬', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r(c.WEAPON, 'お手製の杖', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r(c.JEWELRY, 'ウサギのシッポ', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r(c.ARMOUR, '混合毛のシャツ', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r(c.WEAPON, '蒼穹の弓', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r(c.ARMOUR, 'ノーブルチュニック', ['B', 'R', 'G'], [
    // TODO
  ]),
  r(c.JEWELRY, 'エナジーペンダント', ['B', 'R', 'G'], [
    // TODO
  ]),
  r(c.BUFF, 'ナントカの秘薬', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r(c.ATTACK, 'ドナーストーン', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r(c.HEAL, 'ヒーリングベル', ['Y', 'R', 'G'], [
    ['セイタカトーン', 3],
    ['マジックグラス', 3],
    ['銀のハチの巣', 3],
  ]),
  r(c.WEAPON, '軽い鉄の杖', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r(c.ARMOUR, 'レザープロテクター', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r(c.JEWELRY, 'モノクログラス', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r(c.DEBUFF, '暗黒水', ['B', 'R', 'G'], [
    ['雲海の隠れ家', 1],
    ['闇の雫', 2],
    ['風船魚', 1],
  ]),
  r(c.BUFF, '素朴な焼き菓子', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r(c.WEAPON, '鉄鉤', ['B', 'P', 'G'], [
    // TODO
  ]),
  r(c.ARMOUR, '風来人のシャツ', ['B', 'P', 'R'], [
    // TODO
  ]),
  r(c.JEWELRY, '精霊の首飾り', ['B', 'P', 'G'], [
    // TODO
  ]),
  r(c.ATTACK, 'クラフト', ['B', 'R', 'G'], [
    // TODO
  ]),
  r(c.WEAPON, 'バトルアクス', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r(c.ARMOUR, 'ハードコート', ['B', 'P', 'G'], [
    // TODO
  ]),
  r(c.JEWELRY, 'ルーンストーン', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r(c.BUFF, 'ウォーパウダー', ['B', 'R', 'G'], [
    // TODO
  ]),
  r(c.BUFF, '神秘の羽衣', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r(c.WEAPON, '癒しの杖', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r(c.ARMOUR, 'ボルダースケイル', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r(c.JEWELRY, 'クォーツネックレス', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r(c.ATTACK, '戦う魔剣', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r(c.WEAPON, '白銀の双剣', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r(c.ARMOUR, 'ナイトシェイド', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r(c.JEWELRY, 'グナーデリング・物', ['B', 'P', 'G'], [
    // TODO
  ]),
  r(c.JEWELRY, 'グナーデリング・魔', ['B', 'P', 'Y'], [
    ['聖樹の大枝', 2],
    ['丈夫なつる', 4],
    ['魔石の欠片', 4],
  ]),

  r(c.BUFF, '錬金キャンディ', ['B', 'P', 'Y'], [
    ['セリヨル', 15],
    ['黒水', 10],
  ]),
  r(c.WEAPON, '精霊の杖・火', ['B', 'P', 'R'], [
    ['赤砂', 5],
    ['スイートリーフ', 15],
  ]),
  r(c.WEAPON, '精霊の杖・雷', ['B', 'P', 'Y'], [
    ['赤砂', 5],
    ['星テントウ', 15],
  ]),
  r(c.WEAPON, '精霊の杖・風', ['P', 'R', 'G'], [
    ['赤砂', 5],
    ['スティム鋼石', 15],
  ]),
  r(c.WEAPON, 'クレアエンパシー', ['B', 'Y', 'G'], [
    ['赤い花', 10],
    ['樹氷石', 10],
    ['アイヒェ', 10],
  ]),

  r(c.JEWELRY, 'ハッスルベルト', ['B', 'Y', 'R'], [
    ['クスリゴケ', 10],
    ['アイヒェ', 10],
    ['きれいな水', 10],
  ]),


  // Extra
];

export default recipes;
