import { test, describe, expect } from 'vitest'

import * as ds from './dataset'

describe('dataset', () => {
  test('alchemists', async () => {
    expect(ds.alchemists).toBeInstanceOf(Array)
  })
})
