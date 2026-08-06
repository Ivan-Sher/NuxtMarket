import { useRuntimeConfig } from '#app'
import { $fetch, FetchError } from 'ofetch'

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const useAuthApi = () => {
  const config = useRuntimeConfig()

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      return await $fetch<LoginResponse>('/auth/login', {
        baseURL: config.public.apiBaseUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.public.apiToken,
        },
        body: credentials,
      })
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.statusCode === 401) {
          throw new Error('Неверное имя пользователя или пароль')
        } else if (error.statusCode === 403) {
          throw new Error('Доступ запрещён')
        } else if (error.message?.includes('fetch')) {
          throw new Error('Ошибка сети: не удалось подключиться к серверу')
        } else {
          throw new Error(error.data?.message || error.message || 'Ошибка авторизации')
        }
      }
      throw error
    }
  }

  return { login }
}
