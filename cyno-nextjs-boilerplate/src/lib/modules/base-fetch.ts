import {
  type NextApiRequestCookies
} from 'next/dist/server/api-utils'

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  baseURL?: string;
}

interface BaseFetchResponse<T = unknown> extends Response {
  data: T;
}

type InterceptorFn<T> = (value: T) => T | Promise<T>;

class InterceptorFactory<T> {
  private handlers: InterceptorFn<T>[] = []

  use(fn: InterceptorFn<T>): number {
    this.handlers.push(fn)
    return this.handlers.length - 1
  }

  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = (value: T) => value
    }
  }

  async run(value: T): Promise<T> {
    let result = value
    // eslint-disable-next-line no-restricted-syntax
    for (const handler of this.handlers) {
      // eslint-disable-next-line no-await-in-loop
      result = await handler(result)
    }
    return result
  }
}

class BaseFetch {
  private baseURL: string
  public interceptors: {
    request: InterceptorFactory<RequestConfig>;
    response: InterceptorFactory<BaseFetchResponse>;
  }

  constructor(baseURL = '') {
    this.baseURL = baseURL
    this.interceptors = {
      request: new InterceptorFactory<RequestConfig>(),
      response: new InterceptorFactory<BaseFetchResponse>(),
    }
  }

  private createUrl(url: string, params?: Record<string, string>): string {
    const fullUrl = new URL(url, this.baseURL)

    if (params) {
      Object.entries(params).forEach(([
        key,
        value
      ]) =>
        fullUrl.searchParams.append(key, value))
    }

    return fullUrl.toString()
  }

  private async request<T>(url: string, config: RequestConfig = {}): Promise<BaseFetchResponse<T>> {
    const {
      params, ...fetchOptions
    } = config

    // Run request interceptors
    const interceptedConfig = await this.interceptors.request.run({
      ...fetchOptions,
      params
    })

    const fullUrl = this.createUrl(url, interceptedConfig.params)

    try {
      const response: BaseFetchResponse<T> = await fetch(fullUrl, interceptedConfig) as BaseFetchResponse<T>

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      response.data = await response.json() as T

      // Run response interceptors
      return await this.interceptors.response.run(response) as BaseFetchResponse<T>
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('There was a problem with the fetch operation:', error)

      throw error
    }
  }

  public async get<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...config,
      method: 'GET'
    })

    return response.data
  }

  public async post<T>(url: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    })

    return response.data
  }

  public async put<T>(url: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    })

    return response.data
  }

  public async delete<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const response = await this.request<T>(url, {
      ...config,
      method: 'DELETE'
    })

    return response.data
  }

  public getCookies(): NextApiRequestCookies {
    if (typeof document === 'undefined') {
      return {}
    }

    return document.cookie.split('; ').reduce<NextApiRequestCookies>((prev, current) => {
      const [
        name,
        ...value
      ] = current.split('=')

      prev[name!] = value.join('=')

      return prev
    }, {})
  }
}

export default BaseFetch
