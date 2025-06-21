import { ref } from 'vue'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import api from '@/api/axios'

export function useApi<TResponse, TRequest = unknown>() {
  const data = ref<TResponse | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const request = async (config: AxiosRequestConfig<TRequest>): Promise<TResponse | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.request<TResponse, AxiosResponse<TResponse>, TRequest>(config)
      data.value = response.data
      return response.data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Request failed'
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, request }
}
