import axios, { type AxiosRequestConfig } from 'axios'
import { BACKEND_BASE_URL } from '@/const/global'
import { useAuthStore } from '@/store/authStore'

const testApi = () => {
  const testInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
    timeout: 5000
  })

  testInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return {
    /**
     * Sends a GET request to the specified URL.
     * @param url The URL to send the request to.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */

    get: async <T>(url: string, config?: AxiosRequestConfig) =>
      await testInstance.get<T>(url, config),

    /**
     * Sends a POST request to the specified URL with the given body.
     * @param url The URL to send the request to.
     * @param body The data to send in the request body.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    post: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await testInstance.post<T>(url, body, config)
  }
}

export default testApi
