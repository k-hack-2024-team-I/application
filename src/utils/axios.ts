import baseAxios from 'axios'
import { supabase } from '@/supabase/client'

const axiosInstance = baseAxios.create({
  withCredentials: true,
  baseURL: globalThis.window
    ? '/api'
    : `${process.env.API_HOST ?? process.env.VERCEL_URL}/api`,
})

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await supabase.auth
    .getSession()
    .then((response) => response.data.session?.access_token)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data
)

const get = <T>(url: string, params?: unknown): Promise<T> =>
  axiosInstance.get(url, { params })

const post = <T>(url: string, data: unknown): Promise<T> =>
  axiosInstance.post(url, data)

const put = <T>(url: string, data: unknown): Promise<T> =>
  axiosInstance.put(url, data)

const del = <T>(url: string): Promise<T> => axiosInstance.delete(url)

const patch = <T>(url: string, data: unknown): Promise<T> =>
  axiosInstance.patch(url, data)

export const axios = {
  get,
  post,
  put,
  delete: del,
  patch,
}
