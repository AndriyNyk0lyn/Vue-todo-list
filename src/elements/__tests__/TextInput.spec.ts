import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextInput from '@/elements/TextInput.vue'

describe('TextInput.vue', () => {
  it('renders with label and placeholder', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'todo-text',
        modelValue: '',
        label: 'Todo Text',
        placeholder: 'Enter your task',
      },
    })

    expect(wrapper.find('label').text()).toContain('Todo Text')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your task')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'todo-text',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('input value test')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['input value test'])
  })

  it('shows required asterisk when required is true', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'todo-text',
        modelValue: '',
        label: 'Task',
        required: true,
      },
    })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders error message and sets aria attributes', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'todo-text',
        modelValue: '',
        errorMessage: 'This field is required.',
      },
    })

    const input = wrapper.find('input')
    expect(wrapper.find('p').text()).toBe('This field is required.')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe('todo-text-error')
  })
})
