import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should redirect to sign in page when not authenticated', async ({ page }) => {
    await page.goto('/')
    
    // Should redirect to sign in page
    await expect(page).toHaveURL('/auth/signin')
    await expect(page.getByText('Welcome to Todo App')).toBeVisible()
  })

  test('should show Google sign in button', async ({ page }) => {
    await page.goto('/auth/signin')
    
    await expect(page.getByText('Continue with Google')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
  })

  test('should display app features on sign in page', async ({ page }) => {
    await page.goto('/auth/signin')
    
    await expect(page.getByText('Smart task management')).toBeVisible()
    await expect(page.getByText('Google Calendar sync')).toBeVisible()
    await expect(page.getByText('Productivity analytics')).toBeVisible()
    await expect(page.getByText('Customizable workflows')).toBeVisible()
  })
})
