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
})
