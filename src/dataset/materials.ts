import { Material, Color, ItemType } from './types';

const i = (name: string, color: Color, effectType: ItemType, effects: string[]): Material => {
  return {
    name,
    color,
    effectType,
    effects,
  }
}

const t = ItemType

const materials: Material[] = [
  i('三つ子トーン', 'R', t.CONSUMABLE, ['鳥特攻', '鳥特防']),
  i('コゲクサ', 'R', t.CONSUMABLE, ['火の呪詛', '守護の祝福']),
  i('貯ミツアリ', 'R', t.CONSUMABLE, ['雷の祝福', '雷の盾']),
  i('きれいな水', 'R', t.CONSUMABLE, ['大きな回復量', '魔力の呪詛']),
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

  i('エスプラント', 'R', t.EQUIPMENT, ['獣ダメージ上昇', '獣ダメージ軽減']),
  i('インゴットバグ', 'R', t.EQUIPMENT, ['雷ダメージ上昇', '全体回復量上昇']),
  i('闇の雫', 'R', t.EQUIPMENT, ['物理ダメージ上昇', '耐性ダウン強化']),
  i('ワームフィッシュ', 'R', t.EQUIPMENT, ['ブレイクダメージ上昇【渾身】', '物理耐性上昇【D】']),
  i('ゴルディナイト', 'R', t.EQUIPMENT, ['回復量上昇【背水】', '火ダメージ上昇']),
  i('大木のツタ', 'R', t.EQUIPMENT, ['ブレイク中ダメージ上昇', '回復量上昇【渾身】']),
  i('ビリビリ水', 'R', t.EQUIPMENT, ['スキル威力上昇', '回復量上昇']),
  i('パルマ', 'R', t.EQUIPMENT, ['物理ブレイクダメージ上昇', '雷耐性上昇']),
  i('エメラルドグラス', 'R', t.EQUIPMENT, ['魔法ブレイクダメージ上昇', '打耐性上昇']),
  i('スティム鋼石', 'R', t.EQUIPMENT, ['突耐性上昇', '単体回復量上昇']),
  i('銀のハチの巣', 'R', t.EQUIPMENT, ['魔法ダメージ上昇', '魔法耐性上昇【D】']),
  i('ナナシ草', 'R', t.EQUIPMENT, ['与ダメージ上昇', '物理耐性上昇']),
  i('ハチの巣', 'R', t.EQUIPMENT, ['斬ダメージ上昇', '斬耐性上昇']),
  i('ベントナイト', 'R', t.EQUIPMENT, ['氷ダメージ上昇', '氷耐性上昇']),
  i('オレンジグラス', 'R', t.EQUIPMENT, ['打ダメージ上昇', '火耐性上昇']),
  i('エヴィヒブラウ', 'R', t.EQUIPMENT, ['全体攻撃威力上昇', '全体攻撃耐性上昇']),
  i('派手な石材', 'R', t.EQUIPMENT, ['精霊ダメージ上昇', '回復量上昇【D】']),
  i('太古の聖魚', 'R', t.EQUIPMENT, ['物理ダメージ上昇【背水】', '物理/魔法耐性アップ強化【D】']),

  i('風船魚', 'B', t.EQUIPMENT, ['ブレイクダメージ上昇【背水】', '魔法耐性上昇【D】']),
  i('聖樹の大枝', 'B', t.EQUIPMENT, ['魔法ダメージ上昇', '単体回復量上昇']),
  i('霊魂宝珠', 'B', t.EQUIPMENT, ['回復量上昇【背水】', '獣ダメージ軽減']),
  i('食毒草', 'B', t.EQUIPMENT, ['ブレイクダメージ上昇', '打耐性上昇']),
  i('パチパチ水', 'B', t.EQUIPMENT, ['物理耐性上昇', '魔法耐性上昇']),
  i('震える結晶', 'B', t.EQUIPMENT, ['スキル威力上昇', '全体回復量上昇']),
  i('丈夫なつる', 'B', t.EQUIPMENT, ['物理ダメージ上昇', '物理耐性上昇【D】']),
  i('ルインストン', 'B', t.EQUIPMENT, ['雷耐性上昇', '回復量上昇【D】']),
  i('サルディン', 'B', t.EQUIPMENT, ['氷ダメージ上昇', '氷耐性上昇']),
  i('セリヨル', 'B', t.EQUIPMENT, ['突ダメージ上昇', '突耐性上昇']),
  i('アイヒェ', 'B', t.EQUIPMENT, ['風ダメージ上昇', '風耐性上昇']),
  i('トーン', 'B', t.EQUIPMENT, ['火ダメージ上昇', '火耐性上昇']),
  i('クスリゴケ', 'B', t.EQUIPMENT, ['回復量上昇', '与ダメージ上昇']),
  i('永遠結晶', 'B', t.EQUIPMENT, ['物理ダメージ上昇【渾身】', '物理耐性上昇【渾身】']),
  i('ツドイグサ', 'B', t.EQUIPMENT, ['鳥ダメージ上昇', 'ブレイク中ダメージ上昇']),
  i('正体不明の輝石', 'B', t.EQUIPMENT, ['ダメージバフ強化【A】', '物理/魔法耐性アップ強化']),
  i('導きの花', 'B', t.EQUIPMENT, ['魔法ダメージ上昇【渾身】', '水棲ダメージ軽減']),

  i('雲海の隠れ家', 'G', t.EQUIPMENT, ['ブレイクダメージ上昇【背水】', '物理耐性上昇【D】']),
  i('ベビーヴルム', 'G', t.EQUIPMENT, ['打ダメージ上昇', '全体回復量上昇']),
  i('湖底の主', 'G', t.EQUIPMENT, ['ダメージバフ強化【A】', '風ダメージ上昇']),
  i('キラービー', 'G', t.EQUIPMENT, ['物理ブレイクダメージ上昇', '雷耐性上昇']),
  i('苦ミミズ', 'G', t.EQUIPMENT, ['魔法ブレイクダメージ上昇', '斬耐性上昇']),
  i('エグゾフィッシュ', 'G', t.EQUIPMENT, ['ブレイクダメージ上昇', '火耐性上昇']),
  i('輝く水晶のカケラ', 'G', t.EQUIPMENT, ['与ダメージ上昇', '氷耐性上昇']),
  i('若木の枝葉', 'G', t.EQUIPMENT, ['スキル威力上昇', '魔法耐性上昇']),
  i('自然油', 'G', t.EQUIPMENT, ['突ダメージ上昇', '突耐性上昇']),
  i('赤い花', 'G', t.EQUIPMENT, ['物理ダメージ上昇', '回復量上昇']),
  i('甘露の湧水', 'G', t.EQUIPMENT, ['魔法ダメージ上昇', '耐性ダウン強化']),
  i('メイスフィッシュ', 'G', t.EQUIPMENT, ['回復量上昇【渾身】', '氷ダメージ上昇']),
  i('聖樹結晶', 'G', t.EQUIPMENT, ['物理ダメージ上昇【背水】', '全耐性上昇【背水】']),
  i('リュウソウラン', 'G', t.EQUIPMENT, ['物理/魔法耐性アップ強化【D】', '斬ダメージ上昇']),
  i('邪なるねじれ樹', 'G', t.EQUIPMENT, ['ダメージバフ強化【B】', '魔法耐性上昇【渾身】']),
  i('チョウロウウオ', 'G', t.EQUIPMENT, ['単体攻撃威力上昇', '精霊ダメージ軽減']),
  i('スーメック', 'G', t.EQUIPMENT, ['ブレイクダメージ上昇', '全体攻撃耐性上昇']),
  i('紫紺の雫', 'G', t.EQUIPMENT, ['ブレイク中ダメージ上昇', '風耐性上昇']),

  i('蓮', 'Y', t.EQUIPMENT, ['ブレイクダメージ上昇【渾身】', '魔法耐性上昇【D】']),
  i('千日草', 'Y', t.EQUIPMENT, ['ぷにダメージ上昇', 'ぷにダメージ軽減']),
  i('剛鉄鉱', 'Y', t.EQUIPMENT, ['打ダメージ上昇', '物理/魔法耐性アップ強化']),
  i('金のハチの巣', 'Y', t.EQUIPMENT, ['ダメージバフ強化【B】', '突ダメージ上昇']),
  i('星テントウ', 'Y', t.EQUIPMENT, ['ブレイクダメージ上昇', '打耐性上昇']),
  i('蒼剛石', 'Y', t.EQUIPMENT, ['風耐性上昇', '与ダメージ上昇']),
  i('白灰砂', 'Y', t.EQUIPMENT, ['斬ダメージ上昇', '斬耐性上昇']),
  i('怨嗟の叫び', 'Y', t.EQUIPMENT, ['雷ダメージ上昇', '雷耐性上昇']),
  i('灯火草', 'Y', t.EQUIPMENT, ['魔法ダメージ上昇', '回復量上昇']),
  i('アンバーフライ', 'Y', t.EQUIPMENT, ['魔法ダメージ上昇【背水】', '全耐性上昇【背水】']),
  i('太古の蒼水', 'Y', t.EQUIPMENT, ['水棲ダメージ上昇', '水棲ダメージ軽減']),
  i('パルマ樹皮', 'Y', t.EQUIPMENT, ['物理ダメージ上昇', '単体回復量上昇']),
  i('太陽の花', 'Y', t.EQUIPMENT, ['魔法ダメージ上昇【渾身】', '魔法耐性上昇【渾身】']),
  i('ブランチトランク', 'Y', t.EQUIPMENT, ['全体攻撃耐性上昇', '回復量上昇【渾身】']),
  i('朽ちた樹の大枝', 'Y', t.EQUIPMENT, ['回復量上昇【背水】', '魔法耐性上昇']),
  i('灯篭ホタル', 'Y', t.EQUIPMENT, ['物理ブレイクダメージ上昇', '全体回復量上昇']),
  i('砕けた石材', 'Y', t.EQUIPMENT, ['氷ダメージ上昇', '氷耐性上昇']),
  i('首垂れ草', 'Y', t.EQUIPMENT, ['風ダメージ上昇', '突耐性上昇']),

  i('幸せクローバー', 'P', t.EQUIPMENT, ['単体回復量上昇', '全体回復量上昇']),
  i('誘惑の溶樹液', 'P', t.EQUIPMENT, ['回復量上昇【D】', '魔法耐性上昇']),
  i('安らぎの花', 'P', t.EQUIPMENT, ['鳥ダメージ上昇', '鳥ダメージ軽減']),
  i('水底の水', 'P', t.EQUIPMENT, ['回復量上昇', '与ダメージ上昇']),
  i('マジックグラス', 'P', t.EQUIPMENT, ['物理ダメージ上昇', '魔法耐性上昇【D】']),
  i('魔石の欠片', 'P', t.EQUIPMENT, ['魔法ダメージ上昇', '物理耐性上昇【D】']),
  i('アオツメクサ', 'P', t.EQUIPMENT, ['火ダメージ上昇', '火耐性上昇']),
  i('カブトバッタ', 'P', t.EQUIPMENT, ['風ダメージ上昇', '風耐性上昇']),
  i('正体不明の原石', 'P', t.EQUIPMENT, ['打ダメージ上昇', '打耐性上昇']),
  i('ラピス・パピヨン', 'P', t.EQUIPMENT, ['精霊ダメージ上昇', '精霊ダメージ軽減']),
  i('琥珀水晶', 'P', t.EQUIPMENT, ['物理耐性上昇', '物理/魔法耐性アップ強化']),
  i('光る砂', 'P', t.EQUIPMENT, ['単体攻撃威力上昇', '雷ダメージ上昇']),
  i('ルインフィッシュ', 'P', t.EQUIPMENT, ['全体攻撃威力上昇', '物理耐性上昇【渾身】']),
  i('聖なるねじれ樹', 'P', t.EQUIPMENT, ['魔法ブレイクダメージ上昇', '斬ダメージ上昇']),
  i('ラプチャー', 'P', t.EQUIPMENT, ['回復量上昇【渾身】', '斬耐性上昇']),

  // ザールブルグの錬金術師
  i('オニワライタケ', 'Y', t.EQUIPMENT, ['全体攻撃威力上昇', '物理耐性上昇']),
  i('こじょのこしかけ', 'P', t.EQUIPMENT, ['全体攻撃耐性上昇', '回復量上昇【背水】']),
  i('レジエン石', 'B', t.EQUIPMENT, ['魔法ブレイクダメージ上昇', 'ダメージバフ強化【B】']),
  i('日影石', 'B', t.CONSUMABLE, ['精霊特防', '剛力の祝福']),
  i('宝石草のタネ', 'G', t.CONSUMABLE, ['物防の祝福', '魔力の呪詛']),
  i('月のしずく', 'R', t.CONSUMABLE, ['風の呪詛', '使い切り攻撃強化']),

  // 300万DL記念
  i('黄金うにの枝', 'G', t.EQUIPMENT, ['物理耐性上昇', '魔法ダメージ上昇【背水】']),
  i('聖銀石', 'P', t.EQUIPMENT, ['スキル威力上昇', '雷耐性上昇']),

  // 決戦！ハロウィンぷに
  i('ハロウィンパンプキン', 'R', t.EQUIPMENT, ['物理/魔法耐性アップ強化', '魔法ダメージ上昇【渾身】']),
  i('ハロウィンツリー', 'P', t.CONSUMABLE, ['ぷに特防', '大きな回復量']),
  i('ハロウィンバグ', 'Y', t.CONSUMABLE, ['ぷに特攻', '斬の呪詛']),

  //i('', 'P', t.EQUIPMENT, ['', '']),
];

export default materials;
