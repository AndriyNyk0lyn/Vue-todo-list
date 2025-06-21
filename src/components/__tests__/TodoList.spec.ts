import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '@/components/TodoList.vue'
import type { Todo } from '@/types/Todo'
import TodoItem from '../TodoItem.vue'
import TodoItemPlaceholder from '../placeholders/TodoItemPlaceholder.vue'

const todos: Todo[] = [
  { id: '1', text: 'First task', isDone: false, date: new Date().toISOString(), priority: 'Low' },
  { id: '2', text: 'Second task', isDone: true, date: new Date().toISOString(), priority: 'High' },
]

describe('TodoList.vue', () => {
  it('renders title and todo items', () => {
    const wrapper = mount(TodoList, {
      props: {
        title: 'My Todos',
        todos,
        loading: false,
      },
    })

    expect(wrapper.find('h2').text()).toBe('My Todos')
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(2)
  })

  it('renders placeholders when loading', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [],
        loading: true,
      },
    })

    expect(wrapper.findAllComponents(TodoItemPlaceholder)).toHaveLength(5)
  })

  it('renders empty message when no todos and not loading', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [],
        loading: false,
        emptyMessage: 'Nothing here!',
      },
    })

    expect(wrapper.text()).toContain('Nothing here!')
  })

  it('emits update:todo when toggle event from item is triggered', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos,
        loading: false,
      },
    })

    const todoItem = wrapper.findComponent(TodoItem)
    todoItem.vm.$emit('toggle-complete', '1')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:todo')).toBeTruthy()
    expect(wrapper.emitted('update:todo')?.[0]).toEqual(['1'])
  })

  it('emits remove:todo and edit:todo when events are triggered', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos,
        loading: false,
      },
    })

    const todoItem = wrapper.findComponent(TodoItem)
    todoItem.vm.$emit('delete-todo', '2')
    todoItem.vm.$emit('update-todo', todos[1])

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('remove:todo')?.[0]).toEqual(['2'])
    expect(wrapper.emitted('edit:todo')?.[0]).toEqual([todos[1]])
  })
})
