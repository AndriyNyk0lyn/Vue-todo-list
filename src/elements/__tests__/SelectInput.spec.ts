import { priorityOptions } from './../../constants/options'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectInput from '@/elements/SelectInput.vue'

function mountSelect(extraProps = {}) {
  return mount(SelectInput, {
    props: {
      id: 'priority',
      modelValue: '',
      label: 'Priority',
      options: priorityOptions,
      placeholder: 'Select priority',
      ...extraProps,
    },
  })
}

describe('SelectInput.vue', () => {
  it('renders label and placeholder', () => {
    const wrapper = mountSelect()

    const label = wrapper.find('label')
    const select = wrapper.find('select')
    const placeholderOption = wrapper.find('option:disabled')

    expect(label.text()).toContain('Priority')
    expect(placeholderOption.exists()).toBe(true)
    expect(placeholderOption.text()).toBe('Select priority')
    expect(select.element.value).toBe('')
  })

  it('renders all options correctly', () => {
    const wrapper = mountSelect()

    const renderedOptions = wrapper.findAll('option')
    expect(renderedOptions).toHaveLength(4)

    expect(renderedOptions[1].text()).toBe('Low')
    expect(renderedOptions[2].text()).toBe('Medium')
    expect(renderedOptions[3].text()).toBe('High')
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mountSelect()

    const select = wrapper.find('select')
    await select.setValue('Medium')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Medium'])
  })

  it('renders error message and sets aria attributes', () => {
    const wrapper = mountSelect({ errorMessage: 'This field is required.' })

    const select = wrapper.find('select')
    const error = wrapper.find('p')

    expect(select.attributes('aria-invalid')).toBe('true')
    expect(select.attributes('aria-describedby')).toBe('priority-error')
    expect(error.text()).toBe('This field is required.')
  })
})
