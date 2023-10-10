import type { Alchemist, Color } from './types';

const a = (name: string, title: string, color: [Color, Color], effects: string[]): Alchemist => {
  return {
    name,
    title,
    color,
    effects,
  };
}

const alchemists: Alchemist[] = [
  a('ライザ', 'One Summer Story', ['G', 'R'], ['魔防の祝福', '風の祝福', '火ダメージ上昇']),
  a('ヴァレリア', '過去に夢を求めし者', ['R', 'B'], ['剛力の祝福', '火の祝福', '与ダメージ上昇']),
  a('ソフィー', '百科繚乱フロネシス', ['G', 'B'], ['魔力の呪詛', '魔力の祝福', '物理耐性上昇【D】']),
  a('コルネリア', 'ノーミルクノーライフ', ['G', 'B'], ['剛力の呪詛', '破壊力上昇', 'スキル威力上昇']),
  //a('', '', ['', ''], ['', '', '']),
];

export default alchemists;
