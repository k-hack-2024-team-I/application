import baseAxios from 'axios'

export const axios = baseAxios.create({
  baseURL: globalThis.window ? '/api' : `${process.env.API_HOST}/api`,
})
