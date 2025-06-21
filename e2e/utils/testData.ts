import { Page } from '@playwright/test'

export const sampleTodoHigh = {
  text: 'Do work',
  priority: 'High',
}

export const sampleTodoMedium = {
  text: 'Play game',
  priority: 'Medium',
}

export const sampleTodoLow = {
  text: 'Sleep',
  priority: 'Low',
}

export const resetDatabase = async (page: Page) => {
  try {
    const resp = await page.request.get('http://localhost:3001/todos')
    const todos: { id: string }[] = await resp.json()
    for (const { id } of todos) {
      await page.request.delete(`http://localhost:3001/todos/${id}`)
    }
  } catch (error) {
    console.log('Database reset error (ignored):', error)
  }
}
