import type { Priority } from './Priority'

export interface BaseTodo {
  text: string
  priority: Priority
}

export interface Todo extends BaseTodo {
  id?: string
  date: string
  isDone: boolean
}
