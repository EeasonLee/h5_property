import axios, { type AxiosRequestConfig } from 'uni-axios-ts';

const instance = axios.create({
  baseURL: 'http://cannon.kuwanxingqiu.com',
});

instance.interceptors.request.use((config) => {
  config.header = {
    ...config.header,
    // token: uni.getStorageSync('token'),
    token:
      'cTdCU2lSaEdyQ0Z2RHh1RGRLWVo3OHRXNU8yS2k5bzB0ZTlOa2tIeUxKUlAzQjg3WlFZMjJVOVFiUFBTZUpZOE12RWdTWnNrNW5naVFzUnRUYThnL2c9PQ',
  };
  if (config.method === 'POST') config.header['Content-Type'] = 'application/json';
  return {
    ...config,
    params: { ...config.params },
  };
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 1002) {
      uni.showToast({
        title: '用户未登录或已过期',
        icon: 'none',
      });
      throw Error('用户未登录或已过期');
    } else if (response.data.code !== 1) {
      uni.showToast({
        title: response.data.msg,
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
