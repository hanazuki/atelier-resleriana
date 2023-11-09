import { test, expect } from '@playwright/test'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('#/')
  })

  test('title', async ({ page }) => {
    await expect(page).toHaveTitle(/どれをつくろう？/)
  })

  test('recipe', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'うに袋' })).toBeVisible()
    await page.getByRole('link', { name: 'うに袋' }).click()

    await expect(page).toHaveURL('#/recipes/うに袋')
    await expect(page).toHaveTitle(/うに袋/)
  })

  test('tab', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'うに型チャーム' })).not.toBeVisible()

    await page.getByText('装飾品').click()

    await expect(page.getByRole('link', { name: 'うに型チャーム' })).toBeVisible()
  })
})
