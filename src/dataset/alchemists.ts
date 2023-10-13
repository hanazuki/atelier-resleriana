import type { Alchemist, Color } from './types';

const a = (rarity: 1 | 2 | 3, name: string, title: string, color1: Color, color2: Color, effects: string[]): Alchemist => {
  return {
    name,
    title,
    rarity,
    color1,
    color2,
    effects,
  };
}

const alchemists: Alchemist[] = [
  a(3, 'アーシャ', 'MARIA of Dusk', 'B', 'Y', ['大きな回復量', '会心の出来', '回復量上昇']),
  a(3, 'イクセル', '戦う料理人', 'Y', 'P', ['魔防の祝福', '氷の呪詛', '突耐性上昇']),
  a(1, 'ヴァレリア', '過去に夢を求めし者', 'R', 'B', ['剛力の祝福', '火の祝福', '与ダメージ上昇']),
  a(2, 'ヴェイン', '願いを叶える力', 'B', 'G', ['雷の祝福', '雷の盾', '氷耐性上昇']),
  a(2, 'エスティ', '頼れる受付嬢', 'P', 'B', ['斬の呪詛', '火の盾', '物理耐性上昇']),
  a(1, 'クーデリア', '貴族令嬢', 'B', 'P', ['打の呪詛', '氷の盾', '与ダメージ上昇']),
  a(3, 'コルネリア', 'ノーミルクノーライフ', 'G', 'B', ['剛力の呪詛', '破壊力上昇', 'スキル威力上昇']),
  a(2, 'シャリステラ', '族長の娘', 'B', 'Y', ['守護の祝福', '魔力の呪詛', '魔法ブレイクダメージ上昇']),
  a(3, 'ソフィー', '百科繚乱フロネシス', 'G', 'B', ['魔力の呪詛', '魔力の祝福', '物理耐性上昇【D】']),
  a(1, 'タオ', '学者のタマゴ', 'Y', 'B', ['打の祝福', '全体回復ボーナス', '物理ダメージ上昇']),
  a(1, 'テス', '兎耳トラブルメーカー', 'R', 'Y', ['突の盾', '大きな回復量', '単体回復量上昇']),
  a(2, 'トトリ', '強き母に憧れる少女', 'P', 'G', ['大きな回復量', '魔防の祝福', '回復量上昇']),
  a(1, 'マリオン', '開発班の班長', 'P', 'R', ['物防の祝福', '火の祝福', '雷耐性上昇']),
  a(3, 'マリー', 'Lovely Bomber', 'P', 'G', ['魔力の祝福', '剛力の呪詛', 'ブレイクダメージ上昇']),
  a(2, 'メルル', 'パワフルプリンセス', 'G', 'R', ['突の祝福', '風の盾', '魔法ダメージ上昇']),
  a(2, 'モニカ', 'モニカオンステージ', 'R', 'B', ['突の祝福', '物防の祝福', '魔法耐性上昇【D】']),
  a(3, 'ライザ', 'One Summer Story', 'G', 'R', ['魔防の祝福', '風の祝福', '火ダメージ上昇']),
  a(1, 'リンカ', '班長補佐', 'G', 'Y', ['火の祝福', '物防の祝福', '魔法耐性上昇']),
  a(1, 'レスナ', '未来に夢を求めし者', 'Y', 'G', ['魔力の祝福', '単体回復ボーナス', '魔法ダメージ上昇']),
  a(2, 'レント', '剛腕戦士', 'G', 'P', ['打の盾', '雷の祝福', '物理耐性上昇']),
  a(3, 'ロロナ', '五ツ星パイマスター', 'R', 'G', ['魔力の呪詛', '追い打ち強化', '氷ダメージ上昇']),
  //a('', '', '', '', ['', '', '']),
];

export default alchemists;
