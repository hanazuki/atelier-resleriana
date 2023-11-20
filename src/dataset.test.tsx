import '../test/setup.d'
import { test, describe, expect } from 'vitest'

import * as ds from './dataset'

describe('dataset', () => {
  describe('recipes', () => {
    test('ingredients', async () => {
      for (const recipe of ds.recipes) {
        for (const { material, count } of recipe.ingredients) {
          expect(ds.materials).toPartiallyContain({ name: material })
          expect(count).toBePositive()
        }
      }
    })
  })

  describe('materials', () => {
    test('effects', async () => {
      for (const material of ds.materials) {
        for (const effect of material.effects) {
          expect(ds.effects).toPartiallyContain({ name: effect, itemType: material.effectType })
        }
      }
    })
  })
})
