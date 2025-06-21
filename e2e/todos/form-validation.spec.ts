import { test, expect } from '@playwright/test'
import { TodoPage } from '../pages/todo.page.js'

test('should show validation errors if form is empty', async ({ page }) => {
  const todo = new TodoPage(page)
  await todo.goto()

  await todo.addEditButton.click()

  await expect(todo.textError).toHaveText('Task description is required.')
  await expect(todo.priorityError).toHaveText('Please select a priority.')
})
