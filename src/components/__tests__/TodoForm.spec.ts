import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoForm from '@/components/TodoForm.vue'
import type { Todo } from '@/types/Todo'
import { priorityOptions } from '@/constants/options'
import type { Priority } from '@/types/Priority'

const defaultProps = {
  loading: false,
}

describe('TodoForm.vue', () => {
  it('renders inputs and button', () => {
    const wrapper = mount(TodoForm, {
      props: defaultProps,
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Add Todo')
  })

  it('shows validation errors if fields are empty on submit', async () => {
    const wrapper = mount(TodoForm, {
      props: defaultProps,
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Task description is required.')
    expect(wrapper.text()).toContain('Please select a priority.')
    expect(wrapper.emitted()).not.toHaveProperty('add-todo')
  })

  it('emits add-todo with correct data when form is valid', async () => {
    const wrapper = mount(TodoForm, {
      props: defaultProps,
    })

    await wrapper.find('input[type="text"]').setValue('New task')
    await wrapper.find('select').setValue(priorityOptions[0].value)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-todo')).toBeTruthy()
    expect(wrapper.emitted('add-todo')?.[0][0]).toEqual({
      text: 'New task',
      priority: priorityOptions[0].value,
    })
  })

  it('emits update-todo if todoToEdit is passed', async () => {
    const todoToEdit: Todo = {
      id: '1',
      text: 'Edit me',
      priority: 'Low',
      date: new Date().toISOString(),
      isDone: false,
    }

    const wrapper = mount(TodoForm, {
      props: {
        ...defaultProps,
        todoToEdit,
      },
    })

    await wrapper.find('input[type="text"]').setValue('Edited task')
    await wrapper.find('select').setValue(priorityOptions[1].value)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('update-todo')).toBeTruthy()
    expect(wrapper.emitted('update-todo')?.[0][0]).toEqual({
      ...todoToEdit,
      text: 'Edited task',
      priority: priorityOptions[1].value,
    })
  })

  it('reactively updates fields when todoToEdit changes', async () => {
    const wrapper = mount(TodoForm, {
      props: {
        ...defaultProps,
        todoToEdit: null,
      },
    })

    const newTodo: Todo = {
      id: '2',
      text: 'Updated from watch',
      priority: priorityOptions[0].value as Priority,
      date: new Date().toISOString(),
      isDone: false,
    }

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('')

    await wrapper.setProps({ todoToEdit: newTodo })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Updated from watch')
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe(
      priorityOptions[0].value,
    )
  })
})
