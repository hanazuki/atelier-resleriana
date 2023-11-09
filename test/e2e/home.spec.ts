import { test, expect } from '@playwright/test'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('#/')
  })

  test('title', async ({ page }) => {
    await expect(page).toHaveTitle(/どれをつくろう？/)
  })

  test('recipes', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'うに袋' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'うに型チャーム' })).not.toBeVisible()
  })
})
