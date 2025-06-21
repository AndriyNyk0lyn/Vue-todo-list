import { expect, test } from '@playwright/test'
import { TodoPage } from '../pages/todo.page.js'
import { sampleTodoHigh, resetDatabase } from '../utils/testData.js'

test.beforeEach(async ({ page }) => {
  await resetDatabase(page)
})

test.describe('Delete Todo', () => {
  test('user can delete a todo', async ({ page }) => {
    const todo = new TodoPage(page)
    await todo.goto()

    await todo.addTodo(sampleTodoHigh.text, sampleTodoHigh.priority)
    await expect(page.getByText(sampleTodoHigh.text).first()).toBeVisible()
    await todo.removeTodo(sampleTodoHigh.text)
    await expect(page.getByText(sampleTodoHigh.text).first()).toBeHidden()
  })
})
