import { test, expect } from '@playwright/test'
import { TodoPage } from '../pages/todo.page.js'
import { sampleTodoHigh } from '../utils/testData.js'
import { delayApi } from '../utils/delayApi.js'

test.afterEach(async ({ page }) => {
  const todo = new TodoPage(page)
  await todo.goto()
  await todo.removeTodo(sampleTodoHigh.text)
  await expect(page.getByText(sampleTodoHigh.text)).toBeHidden()
})

test.describe('Add Todo', () => {
  test('user can add a todo', async ({ page }) => {
    const todo = new TodoPage(page)
    await todo.goto()
    await todo.addTodo(sampleTodoHigh.text, sampleTodoHigh.priority)
    await expect(page.getByText(sampleTodoHigh.text)).toBeVisible()
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

    await expect(todo.addEditButton).toHaveText('Wait...')
  })
})
