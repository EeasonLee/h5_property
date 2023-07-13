import axios, { type AxiosRequestConfig } from 'uni-axios-ts';

const instance = axios.create({
  baseURL: 'https://carewashing.api.nodewebapp.com/',
});

instance.interceptors.request.use((config) => {
  config.header = {
    ...config.header,
    token: uni.getStorageSync('token'),
  };
  if (config.method === 'POST') config.header['Content-Type'] = 'application/json';
  return {
    ...config,
    params: { ...config.params },
  };
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      uni.showToast({
        title: '用户未登录或已过期',
        icon: 'none',
      });
      throw Error('用户未登录或已过期');
    } else if (response.data.code !== 0) {
      uni.showToast({
        title: response.data.message,
        icon: 'none',
      });
      return Promise.reject(response.data);
    } else {
      return {
        ...response.data,
      };
    }
  },
  (err) => {
    if (err.statusCode === 1001) {
      uni.showToast({
        title: '连接服务器异常',
        icon: 'none',
      });
    } else {
      uni.showToast({
        title: JSON.stringify(err),
        icon: 'none',
      });
    }
  },
);

const request = {
  get: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return instance.get<T>(url, data, config) as Promise<T>;
  },
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return instance.post<T>(url, data, config) as Promise<T>;
  },
};

export default request;
