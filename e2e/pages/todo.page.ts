import { Page, Locator } from '@playwright/test'

export class TodoPage {
  readonly baseUrl = '**/todos'
  readonly input: Locator
  readonly prioritySelect: Locator
  readonly addEditButton: Locator
  readonly loadingSpinner: Locator
  readonly emptyMessage: Locator
  readonly todoItems: Locator
  readonly header: Locator
  readonly todoItemText: Locator
  readonly textError: Locator
  readonly priorityError: Locator
  readonly confirmPopupButton: Locator

  constructor(private readonly page: Page) {
    this.input = page.locator('#todo-text')
    this.prioritySelect = page.locator('#todo-priority')
    this.addEditButton = page.locator('#todo-add-edit')
    this.loadingSpinner = page.locator('[data-testid="todo-loading"]')
    this.emptyMessage = page.getByText(/No tasks found|No tasks here yet/i)
    this.todoItems = page.locator('[data-testid="todo-item"]')
    this.todoItemText = page.locator('[data-testid="todo-item-text"]').getByText(/Test todo/i)
    this.header = page.getByTestId('header')
    this.textError = page.locator('#todo-text-error')
    this.priorityError = page.locator('#todo-priority-error')
    this.confirmPopupButton = page
      .locator('#confirm-popup')
      .locator('button', { hasText: 'Delete' })
  }

  async goto() {
    await this.page.goto('/')
  }

  async addTodo(text: string, priority: string) {
    await this.input.fill(text)
    await this.prioritySelect.selectOption(priority)
    await this.addEditButton.click()
  }

  async removeTodo(text: string) {
    const todoItem = this.todoItems.filter({ hasText: text }).first()
    const deleteBtn = todoItem.locator('button', { hasText: 'Delete' })
    await deleteBtn.click()

    await this.confirmPopupButton.waitFor({ state: 'visible' })
    await this.confirmPopupButton.click()

    await this.page.locator('#confirm-popup').waitFor({ state: 'hidden' })
  }
}
