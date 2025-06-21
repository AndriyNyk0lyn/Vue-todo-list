import { describe, it, expect } from 'vitest'
import api from '@/api/axios'

describe('api instance', () => {
  it('has the correct base URL from env', () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_URL)
  })

  it('has the correct default headers', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })
})
