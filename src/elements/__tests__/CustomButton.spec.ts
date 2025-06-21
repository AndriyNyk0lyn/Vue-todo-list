import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomButton from '@/elements/CustomButton.vue'

describe('CustomButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(CustomButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(CustomButton, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.emitted('click')).toBeFalsy()
    expect(wrapper.emitted('click')).toBe(undefined)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('applies primary variant classes by default', () => {
    const wrapper = mount(CustomButton, {
      slots: { default: 'Primary' },
    })

    expect(wrapper.classes()).toContain('bg-indigo-600')
  })

  it('applies secondary variant classes', () => {
    const wrapper = mount(CustomButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Secondary' },
    })

    expect(wrapper.classes()).toContain('bg-white')
  })

  it('disables button when `disabled` is true', async () => {
    const wrapper = mount(CustomButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('disabled:cursor-not-allowed')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
    expect(wrapper.emitted('click')).toBe(undefined)
  })

  it('shows loading text and disables click when loading', async () => {
    const wrapper = mount(CustomButton, {
      props: { loading: true },
      slots: { default: 'Should not show' },
    })

    expect(wrapper.text()).toBe('Wait...')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
