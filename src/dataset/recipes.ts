import { Recipe, Color, ItemCategory } from './types';

const c = ItemCategory;

const r = (series: string, category: ItemCategory, name: string, colors: [Color, Color, Color], ingredients: [string, number][]): Recipe => {
  return {
    series,
    category,
    name,
    colors,
    ingredients: ingredients.map(([name, count]) => ({ name, count })),
  };
}

const recipes = [
  r('1', c.HEAL, 'うに袋', ['B', 'Y', 'R'], [
    ['うに', 5],
  ]),
  r('1', c.HEAL, 'ヒーリングサルヴ', ['B', 'P', 'Y'], [
    ['トーン', 5],
  ]),
  r('1', c.WEAPON, 'フランベルジュ', ['B', 'Y', 'R'], [
    ['うに', 5],
    ['トーン', 5],
  ]),
  r('1', c.ARMOUR, '旅人のベスト', ['Y', 'R', 'G'], [
    ['うに', 5],
    ['トーン', 5],
  ]),
  r('1', c.JEWELRY, 'うに型チャーム', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r('1', c.ATTACK, 'フラム', ['B', 'R', 'G'], [
    // TODO
  ]),
  r('1', c.HEAL, 'ドライビスク', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r('1', c.BUFF, '魔女の秘薬', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r('1', c.WEAPON, 'お手製の杖', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r('1', c.JEWELRY, 'ウサギのシッポ', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r('1', c.ARMOUR, '混合毛のシャツ', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r('1', c.WEAPON, '蒼穹の弓', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r('1', c.ARMOUR, 'ノーブルチュニック', ['B', 'R', 'G'], [
    // TODO
  ]),
  r('1', c.JEWELRY, 'エナジーペンダント', ['B', 'R', 'G'], [
    // TODO
  ]),
  r('1', c.BUFF, 'ナントカの秘薬', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r('2', c.ATTACK, 'ドナーストーン', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r('2', c.HEAL, 'ヒーリングベル', ['Y', 'R', 'G'], [
    ['セイタカトーン', 3],
    ['マジックグラス', 3],
    ['銀のハチの巣', 3],
  ]),
  r('2', c.WEAPON, '軽い鉄の杖', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('2', c.ARMOUR, 'レザープロテクター', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('2', c.JEWELRY, 'モノクログラス', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r('2', c.DEBUFF, '暗黒水', ['B', 'R', 'G'], [
    ['雲海の隠れ家', 1],
    ['闇の雫', 2],
    ['風船魚', 1],
  ]),
  r('2', c.BUFF, '素朴な焼き菓子', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r('2', c.WEAPON, '鉄鉤', ['B', 'P', 'G'], [
    // TODO
  ]),
  r('2', c.ARMOUR, '風来人のシャツ', ['B', 'P', 'R'], [
    // TODO
  ]),
  r('2', c.JEWELRY, '精霊の首飾り', ['B', 'P', 'G'], [
    // TODO
  ]),
  r('2', c.ATTACK, 'クラフト', ['B', 'R', 'G'], [
    // TODO
  ]),
  r('2', c.WEAPON, 'バトルアクス', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r('2', c.ARMOUR, 'ハードコート', ['B', 'P', 'G'], [
    // TODO
  ]),
  r('2', c.JEWELRY, 'ルーンストーン', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r('2', c.BUFF, 'ウォーパウダー', ['B', 'R', 'G'], [
    // TODO
  ]),
  r('2', c.BUFF, '神秘の羽衣', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r('2', c.WEAPON, '癒しの杖', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r('2', c.ARMOUR, 'ボルダースケイル', ['P', 'Y', 'R'], [
    // TODO
  ]),
  r('2', c.JEWELRY, 'クォーツネックレス', ['P', 'Y', 'R'], [
    // TODO
  ]),

  r('3', c.ATTACK, 'たたかう魔剣', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r('3', c.WEAPON, '白銀の双剣', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r('3', c.ARMOUR, 'ナイトシェイド', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r('3', c.JEWELRY, 'グナーデリング・物', ['B', 'P', 'G'], [
    // TODO
  ]),
  r('3', c.JEWELRY, 'グナーデリング・魔', ['B', 'P', 'Y'], [
    ['聖樹の大枝', 2],
    ['丈夫なつる', 4],
    ['魔石の欠片', 4],
  ]),
  r('3', c.JEWELRY, '闘志のマフラー', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.BUFF, 'スモークミート', ['B', 'P', 'R'], [
    // TODO
  ]),
  r('3', c.DEBUFF, '不幸の瓶詰め', ['B', 'P', 'B'], [
    // TODO
  ]),
  r('3', c.WEAPON, 'クレアエンパシー', ['B', 'Y', 'G'], [
    ['赤い花', 10],
    ['樹氷石', 10],
    ['アイヒェ', 10],
  ]),
  r('3', c.ARMOUR, '極彩色のローブ', ['B', 'P', 'Y'], [
    // TODO
  ]),
  r('3', c.ARMOUR, 'コンバットシャツ', ['B', 'P', 'R'], [
    // TODO
  ]),
  r('3', c.WEAPON, 'シュペーヴァイス', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.BUFF, 'エネルジアニカ', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r('3', c.ATTACK, 'ローゼフラム', ['B', 'Y', 'R'], [
    // TODO
  ]),
  r('3', c.BUFF, '妙薬ドラッヘン', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.WEAPON, '精霊の杖・火', ['B', 'P', 'R'], [
    ['赤砂', 5],
    ['スイートリーフ', 15],
  ]),
  r('3', c.WEAPON, '精霊の杖・氷', ['B', 'P', 'Y'], [
    ['赤砂', 5],
    ['星テントウ', 15],
  ]),
  r('3', c.WEAPON, '精霊の杖・雷', ['B', 'P', 'Y'], [
    ['赤砂', 5],
    ['星テントウ', 15],
  ]),
  r('3', c.WEAPON, '精霊の杖・風', ['P', 'R', 'G'], [
    ['赤砂', 5],
    ['スティム鋼石', 15],
  ]),
  r('3', c.DEBUFF, '燃える水', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.BUFF, '錬金キャンディ', ['B', 'P', 'Y'], [
    ['セリヨル', 15],
    ['黒水', 10],
  ]),
  r('3', c.JEWELRY, '熱血はちまき', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r('3', c.ARMOUR, '無重力シャツ', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.JEWELRY, 'エンゼルチャーム', ['B', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.ARMOUR, '冒険者の服', ['P', 'Y', 'G'], [
    // TODO
  ]),
  r('3', c.ARMOUR, '鋲打ちの皮鎧', ['B', 'Y', 'G'], [
    // TODO
  ]),
  r('3', c.JEWELRY, 'ハッスルベルト', ['B', 'Y', 'R'], [
    ['クスリゴケ', 10],
    ['アイヒェ', 10],
    ['きれいな水', 10],
  ]),
  r('3', c.JEWELRY, 'エンゼルリボン', ['B', 'P', 'R'], [
    // TODO
  ]),
  r('3', c.ARMOUR, '魔獣の革鎧', ['B', 'P', 'R'], [
    // TODO
  ]),
  r('3', c.BUFF, '黄金エキススープ', ['Y', 'R', 'G'], [
    // TODO
  ]),
  r('3', c.HEAL, 'エリキシル剤', ['B', 'Y', 'R'], [
    // TODO
  ]),

  r('4', c.HEAL, '妙薬エボニアル', ['B', 'Y', 'G'], [
    ['ローズビー', 40],
    ['輝く水晶のカケラ', 5],
  ]),
  r('4', c.WEAPON, '波打つ刺剣', ['R', 'B', 'P'], [
    ['ローズビー', 40],
    ['砂晶石', 5],
  ]),
];

export default recipes;
