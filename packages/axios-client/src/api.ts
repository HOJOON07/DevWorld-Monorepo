import axios, { AxiosPromise } from 'axios';
import { setupAuthInterceptors } from './interceptors';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type HTTPHeaders = any;

export type HTTPParams = unknown;

const httpClient = axios.create();
setupAuthInterceptors(httpClient);

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
    return httpClient.request({ ...this });
  }
}

export default API;
