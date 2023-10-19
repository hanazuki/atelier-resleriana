import type { Alchemist, Color } from './types';

const a = (name: string, title: string, rarity: 1 | 2 | 3, color1: Color, color2: Color, effects: string[]): Alchemist => {
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
  a('アーシャ', 'MARIA of Dusk', 3, 'B', 'Y', ['大きな回復量', '会心の出来', '回復量上昇']),
  a('イクセル', '戦う料理人', 3, 'Y', 'P', ['魔防の祝福', '氷の呪詛', '突耐性上昇']),
  a('ヴァレリア', 'Secret Amnesia', 3, 'B', 'G', ['斬の祝福', '斬の呪詛', '斬ダメージ上昇']),
  a('ヴァレリア', '過去に夢を求めし者', 1, 'R', 'B', ['剛力の祝福', '火の祝福', '与ダメージ上昇']),
  a('ヴィオラート', 'カロッテ・キャロット', 2, 'Y', 'P', ['雷の祝福', '火の呪詛', '雷ダメージ上昇']),
  a('ヴェイン', '願いを叶える力', 2, 'B', 'G', ['雷の祝福', '雷の盾', '氷耐性上昇']),
  a('エスカ', 'エンドレスタルト', 2, 'R', 'Y', ['斬の盾', '打の祝福', '打耐性上昇']),
  a('エスティ', '頼れる受付嬢', 2, 'P', 'B', ['斬の呪詛', '火の盾', '物理耐性上昇']),
  a('エリー', 'チーズケーキの申し子', 3, 'G', 'R', ['打の呪詛', '全体回復ボーナス', '回復量上昇']),
  a('オスカー', '植物は友達', 3, 'P', 'B', ['守護の祝福', '氷の祝福', '物理耐性上昇【D】']),
  a('オディーリア', '古の機械人形', 3, 'B', 'G', ['魔力の祝福', '剛力の呪詛', '魔法ダメージ上昇']),
  a('キースグリフ', '知識の探究者', 3, 'P', 'R', ['会心の出来', '魔力の呪詛', '風耐性上昇']),
  a('クラウディア', 'One Summer Melody', 3, 'P', 'R', ['氷の呪詛', '氷の盾', '氷ダメージ上昇']),
  a('クーデリア', '貴族令嬢', 1, 'B', 'P', ['打の呪詛', '氷の盾', '与ダメージ上昇']),
  a('コルネリア', 'ノーミルクノーライフ', 3, 'G', 'B', ['剛力の呪詛', '破壊力上昇', 'スキル威力上昇']),
  a('シャリステラ', '族長の娘', 2, 'B', 'Y', ['守護の祝福', '魔力の呪詛', '魔法ブレイクダメージ上昇']),
  a('ソフィー', '百科繚乱フロネシス', 3, 'G', 'B', ['魔力の呪詛', '魔力の祝福', '物理耐性上昇【D】']),
  a('タオ', '学者のタマゴ', 1, 'Y', 'B', ['打の祝福', '全体回復ボーナス', '物理ダメージ上昇']),
  a('テス', '兎耳トラブルメーカー', 1, 'R', 'Y', ['突の盾', '大きな回復量', '単体回復量上昇']),
  a('トトリ', '強き母に憧れる少女', 2, 'P', 'G', ['大きな回復量', '魔防の祝福', '回復量上昇']),
  a('フィリス', 'Crystal Master', 3, 'Y', 'R', ['魔力の呪詛', '突の祝福', '火耐性上昇']),
  a('プラフタ', 'ミステリアスドール', 3, 'Y', 'P', ['打の呪詛', '打の盾', '打ダメージ上昇']),
  a('マリオン', '開発班の班長', 1, 'P', 'R', ['物防の祝福', '火の祝福', '雷耐性上昇']),
  a('マリー', 'Lovely Bomber', 3, 'P', 'G', ['魔力の祝福', '剛力の呪詛', 'ブレイクダメージ上昇']),
  a('ミュー', '南国の冒険者', 3, 'R', 'Y', ['会心の出来', '氷の祝福', '突ダメージ上昇']),
  a('メルル', 'パワフルプリンセス', 2, 'G', 'R', ['突の祝福', '風の盾', '魔法ダメージ上昇']),
  a('モニカ', 'モニカオンステージ', 2, 'R', 'B', ['突の祝福', '物防の祝福', '魔法耐性上昇【D】']),
  a('ユーディー', 'Hero of Tempest', 3, 'B', 'P', ['全体回復ボーナス', '風の呪詛', '魔法耐性上昇']),
  a('ライザ', 'One Summer Story', 3, 'G', 'R', ['魔防の祝福', '風の祝福', '火ダメージ上昇']),
  a('リリー', 'Birth of The Legend', 3, 'B', 'Y', ['風の祝福', '追い打ち強化', '風ダメージ上昇']),
  a('リンカ', '班長補佐', 1, 'G', 'Y', ['火の祝福', '物防の祝福', '魔法耐性上昇']),
  a('ルーウェン', '熱血の冒険者', 2, 'Y', 'R', ['斬の祝福', '突の呪詛', 'スキル威力上昇']),
  a('レスナ', 'Innocent Dreamer', 3, 'G', 'P', ['会心の出来', '雷の祝福', '斬耐性上昇']),
  a('レスナ', '未来に夢を求めし者', 1, 'Y', 'G', ['魔力の祝福', '単体回復ボーナス', '魔法ダメージ上昇']),
  a('レント', '剛腕戦士', 2, 'G', 'P', ['打の盾', '雷の祝福', '物理耐性上昇']),
  a('ロジー', '黄昏の錬金剣', 3, 'Y', 'B', ['会心の出来', '物防の祝福', '斬ダメージ上昇']),
  a('ロゼ', '光の剣', 3, 'R', 'Y', ['剛力の呪詛', '魔防の祝福', '物理ブレイクダメージ上昇']),
  a('ロロナ', '五ツ星パイマスター', 3, 'R', 'G', ['魔力の呪詛', '追い打ち強化', '氷ダメージ上昇']),
  //a('', '', , '', '', ['', '', '']),
];

export default alchemists;
