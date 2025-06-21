import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem.vue'
import type { Todo } from '@/types/Todo'

const baseTodo: Todo = {
  id: '1',
  text: 'Write unit tests',
  isDone: false,
  date: new Date().toISOString(),
  priority: 'High',
}

describe('TodoItem.vue', () => {
  it('renders todo text and formatted date', () => {
    const wrapper = mount(TodoItem, {
      props: { todo: baseTodo },
    })

    expect(wrapper.text()).toContain('Write unit tests')
    expect(wrapper.text()).toContain('Added:')
  })

  it('shows line-through and opacity when todo is done', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { ...baseTodo, isDone: true },
      },
    })

    const text = wrapper.find('p.font-medium')
    expect(text.classes()).toContain('line-through')
    expect(wrapper.classes()).toContain('opacity-60')
  })

  it('emits toggle-complete when checkbox is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: baseTodo },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('toggle-complete')).toBeTruthy()
    expect(wrapper.emitted('toggle-complete')?.[0]).toEqual(['1'])
  })

  it('emits delete-todo when delete button clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: baseTodo },
    })

    const deleteBtn = wrapper.findAll('button').at(1)
    await deleteBtn?.trigger('click')

    expect(wrapper.emitted('delete-todo')).toBeTruthy()
    expect(wrapper.emitted('delete-todo')?.[0]).toEqual(['1'])
  })

  it('emits update-todo when edit button clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: baseTodo },
    })

    const editBtn = wrapper.findAll('button').at(0)
    await editBtn?.trigger('click')

    expect(wrapper.emitted('update-todo')).toBeTruthy()
    expect(wrapper.emitted('update-todo')?.[0]).toEqual([baseTodo])
  })

  it('renders correct priority class', () => {
    const wrapper = mount(TodoItem, {
      props: { todo: { ...baseTodo, priority: 'High' } },
    })

    const badge = wrapper.find('span.px-2')
    expect(badge.classes()).toContain('bg-red-100')
    expect(badge.text()).toBe('High')
  })
})
