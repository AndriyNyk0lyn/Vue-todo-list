import { test, expect } from '@playwright/test'
import { TodoPage } from '../pages/todo.page.js'
import { sampleTodoHigh, resetDatabase } from '../utils/testData.js'
import { delayApi } from '../utils/delayApi.js'

test.beforeEach(async ({ page }) => {
  await resetDatabase(page)
})

test.afterEach(async ({ page }) => {
  const todo = new TodoPage(page)
  await todo.goto()

  await page.waitForLoadState('domcontentloaded')

  try {
    const todoElements = page
      .locator('[data-testid="todo-item"]')
      .filter({ hasText: sampleTodoHigh.text })
    const count = await todoElements.count()

    for (let i = 0; i < count; i++) {
      const todoItem = todoElements.first()
      const deleteBtn = todoItem.locator('button', { hasText: 'Delete' })
      await deleteBtn.click()
      await todo.confirmPopupButton.click()
      await page.waitForTimeout(500)
    }
  } catch (error: unknown) {
    console.log('Cleanup error (ignored):', error instanceof Error ? error.message : String(error))
  }
})

test.describe('Add Todo', () => {
  test('user can add a todo', async ({ page }) => {
    const todo = new TodoPage(page)
    await todo.goto()
    await todo.addTodo(sampleTodoHigh.text, sampleTodoHigh.priority)
    await expect(page.getByText(sampleTodoHigh.text).first()).toBeVisible()
  })

  test('should clear form after adding todo', async ({ page }) => {
    const todo = new TodoPage(page)
    await todo.goto()

    await todo.addTodo(sampleTodoHigh.text, sampleTodoHigh.priority)

    await expect(todo.input).toHaveValue('')
    await expect(todo.prioritySelect).toHaveValue('')
  })

  test('should show loading state while adding', async ({ page }) => {
    const todo = new TodoPage(page)
    await delayApi(page, todo.baseUrl, 1000)

    await todo.goto()

    await todo.addTodo(sampleTodoHigh.text, sampleTodoHigh.priority)

    await expect(todo.addEditButton).toHaveText(/Wait\.\.\./)
  })
})
