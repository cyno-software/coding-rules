import {
  env
} from '~/env'

import BaseFetch from './base-fetch'

export const api = new BaseFetch(env.NEXT_PUBLIC_API_ENDPOINT_URL)

api.interceptors.request.use((config) => config)

api.interceptors.response.use((response) => response)
