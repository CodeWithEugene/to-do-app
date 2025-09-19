import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication by setting a session cookie
    await page.context().addCookies([{
      name: 'next-auth.session-token',
      value: 'mock-session-token',
      domain: 'localhost',
      path: '/',
    }])
  })

  test('should show dashboard when authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Should show dashboard elements
    await expect(page.getByText('Tasks')).toBeVisible()
    await expect(page.getByText('Manage your tasks and stay organized')).toBeVisible()
  })

  test('should display navigation sidebar', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.getByText('Todo App')).toBeVisible()
    await expect(page.getByText('Tasks')).toBeVisible()
    await expect(page.getByText('Calendar')).toBeVisible()
    await expect(page.getByText('Projects')).toBeVisible()
    await expect(page.getByText('Analytics')).toBeVisible()
    await expect(page.getByText('Settings')).toBeVisible()
  })

  test('should show task tabs', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.getByText('Active Tasks')).toBeVisible()
    await expect(page.getByText('Completed')).toBeVisible()
    await expect(page.getByText('Overdue')).toBeVisible()
  })

  test('should have add task button', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.getByRole('button', { name: 'Add Task' })).toBeVisible()
  })

  test('should have search functionality', async ({ page }) => {
    await page.goto('/dashboard')
    
    const searchInput = page.getByPlaceholder('Search tasks...')
    await expect(searchInput).toBeVisible()
    
    await searchInput.fill('test task')
    await expect(searchInput).toHaveValue('test task')
  })
})
