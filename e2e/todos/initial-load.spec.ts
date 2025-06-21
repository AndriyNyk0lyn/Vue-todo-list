import { test, expect } from '@playwright/test'
import { TodoPage } from '../pages/todo.page.js'
import { delayApi } from '../utils/delayApi.js'

test.describe('Initial load', () => {
  test('should load page and show empty state or todo list', async ({ page }) => {
    const todo = new TodoPage(page)
    await todo.goto()

    const isEmptyVisible = await todo.emptyMessage.isVisible().catch(() => false)
    const hasTodos = await todo.todoItems.count()

    expect(isEmptyVisible || hasTodos > 0).toBeTruthy()
  })

  test('should render header, form and todo list container', async ({ page }) => {
    const todo = new TodoPage(page)
    await todo.goto()
    await expect(todo.header).toBeVisible()
    await expect(todo.input).toBeVisible()
    await expect(todo.prioritySelect).toBeVisible()
    await expect(todo.addEditButton).toBeVisible()
  })

  test('should show loading state while fetching todos', async ({ page }) => {
    const todo = new TodoPage(page)
    await delayApi(page, todo.baseUrl, 300)
    await todo.goto()
    await expect(todo.loadingSpinner.first()).toBeVisible()
  })
})
