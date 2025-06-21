import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomCheckbox from '@/elements/CustomCheckbox.vue'

describe('CustomCheckbox.vue', () => {
  it('renders with label when provided', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'checkbox-1',
        modelValue: false,
        label: 'Accept terms',
      },
    })

    expect(wrapper.text()).toContain('Accept terms')
  })

  it('checkbox is checked when modelValue is true', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'checkbox-2',
        modelValue: true,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'checkbox-3',
        modelValue: false,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('renders check icon when checked', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'checkbox-4',
        modelValue: true,
      },
    })

    const checkIcon = wrapper.findComponent({ name: 'CheckIcon' })
    expect(checkIcon.exists()).toBe(true)
  })

  it('does not render check icon when unchecked', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'checkbox-5',
        modelValue: false,
      },
    })

    const checkIcon = wrapper.findComponent({ name: 'CheckIcon' })
    expect(checkIcon.exists()).toBe(false)
  })
})
