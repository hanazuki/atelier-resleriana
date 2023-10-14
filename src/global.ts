export type AlchemistSettings = {
  unlocked: boolean
  rarityIncrease: number
}

export type GlobalSettings = {
  alchemists: {
    [k: `${string}/${string}`]: AlchemistSettings
  }
}
