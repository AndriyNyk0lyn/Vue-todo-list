import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/formatDate'

describe('formatDate', () => {
  it('formats a valid ISO date string correctly', () => {
    const result = formatDate('2025-03-31T10:00:00Z')
    expect(result).toMatch(/\w{3} \d{1,2}, 2025/) // Mar 31, 2025
  })

  it('returns original Invalid Date if date is invalid', () => {
    const result = formatDate('not-a-valid-date')
    console.log(result)
    expect(result).toBe('Invalid Date')
  })
})
