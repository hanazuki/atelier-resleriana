import { test, expect } from '@playwright/test'

test.describe('Recipe', () => {
  test('title', async ({ page }) => {
    await page.goto('#/recipes/うに袋')

    await expect(page).toHaveTitle(/うに袋/)
    await expect(page.getByRole('heading', { name: 'うに袋' })).toBeVisible()
  })
})
