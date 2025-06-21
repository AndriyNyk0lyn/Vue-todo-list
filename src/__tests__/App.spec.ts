import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TodoPage from '@/App.vue'
import api from '@/api/__mocks__/axios'
import { priorityOptions } from '@/constants/options'

vi.mock('@/api/axios')

const mockTodo = {
  id: '1',
  text: 'Test todo',
  priority: 'High',
  isDone: false,
  date: new Date().toISOString(),
}

describe('TodoPage.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads todos on mount', async () => {
    api.request.mockResolvedValueOnce({ data: [mockTodo] })

    const wrapper = mount(TodoPage)
    await flushPromises()

    expect(api.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET' }))
    expect(wrapper.text()).toContain('Test todo')
  })

  it('adds new todo and updates list', async () => {
    api.request.mockResolvedValueOnce({ data: [] }).mockResolvedValueOnce({ data: mockTodo })

    const wrapper = mount(TodoPage)
    await flushPromises()

    await wrapper.find('input[type="text"]').setValue('Test todo')
    await wrapper.find('select').setValue(priorityOptions[2].value)
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text()).toContain('Test todo')
    expect(api.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST', url: '/todos' }),
    )
  })

  it('edits todo and updates state', async () => {
    const updatedTodo = { ...mockTodo, text: 'Updated' }
    api.request
      .mockResolvedValueOnce({ data: [mockTodo] })
      .mockResolvedValueOnce({ data: updatedTodo })

    const wrapper = mount(TodoPage)
    await flushPromises()

    const editButton = wrapper.findAll('button').find((btn) => btn.text() === 'Edit')
    await editButton?.trigger('click')

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Updated')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text()).toContain('Updated')
    expect(api.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'PUT', url: `/todos/${mockTodo.id}` }),
    )
  })
})
