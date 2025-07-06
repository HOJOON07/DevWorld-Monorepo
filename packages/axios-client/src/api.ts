import axios, { AxiosPromise } from 'axios';
import { setupAuthInterceptors } from './interceptors';

// 임시 타이핑
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type HTTPHeaders = any;

export type HTTPParams = unknown;

//
class API {
  readonly method: HTTPMethod;

  readonly url: string;

  baseURL?: string;

  headers?: HTTPHeaders;

  params?: HTTPParams;

  data?: unknown;

  timeout?: number;

  withCredentials?: boolean;

  constructor(method: HTTPMethod, url: string) {
    this.method = method;
    this.url = url;
  }

  call<T>(): AxiosPromise<T> {
    const http = axios.create();
    if (this.withCredentials) {
      setupAuthInterceptors(http);
    }

    return http.request({ ...this });
  }
}

export default API;
