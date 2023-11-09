// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react'

import { useLocalStorage } from './localstorage'

describe('useLocalStorage', () => {
  const key = 'testtesttest'

  afterEach(() => {
    window.localStorage.clear()
  })

  test('fallback value', async () => {
    const { result } = renderHook(() => useLocalStorage<string>(key, 'foo', JSON.parse, JSON.stringify));

    expect(result.current[0]).toEqual('foo')
  })

  test('initial value', async () => {
    window.localStorage[key] = '"bar"'

    const { result } = renderHook(() => useLocalStorage<string>(key, 'foo', JSON.parse, JSON.stringify));

    expect(result.current[0]).toEqual('bar')
  })

  test('set then load', async () => {
    const { result } = renderHook(() => useLocalStorage<string>(key, 'foo', JSON.parse, JSON.stringify));

    expect(result.current[0]).toEqual('foo')

    act(() => {
      result.current[1]('bar')
    })

    expect(result.current[0]).toEqual('bar')

    expect(window.localStorage[key]).toEqual('"bar"')
  })

  // TODO: How can we test that StorageEvent triggers rerender?
})
