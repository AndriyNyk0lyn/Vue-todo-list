import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApi } from '@/composables/useApi'
import { flushPromises } from '@vue/test-utils'
import api from '@/api/__mocks__/axios'

vi.mock('@/api/axios')

describe('useApi composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch data successfully', async () => {
    const mockResponse = { id: 1, name: 'John' }
    api.request.mockResolvedValueOnce({ data: mockResponse })

    const { data, loading, error, request } = useApi<typeof mockResponse>()

    const result = await request({ url: '/todo', method: 'GET' })
    await flushPromises()

    expect(api.request).toHaveBeenCalledOnce()
    expect(result).toEqual(mockResponse)
    expect(data.value).toEqual(mockResponse)
    expect(error.value).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('should handle request error', async () => {
    api.request.mockRejectedValueOnce(new Error('Request failed'))

    const { data, loading, error, request } = useApi()

    const result = await request({ url: '/fail', method: 'GET' })
    await flushPromises()

    expect(result).toBeNull()
    expect(error.value).toBe('Request failed')
    expect(data.value).toBeNull()
    expect(loading.value).toBe(false)
  })
})
