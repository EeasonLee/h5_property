import axios, { type AxiosRequestConfig } from 'uni-axios-ts';
// #ifdef H5
import axiosH5 from 'axios';
// #endif

export const baseURL = 'https://cannon.kuwanxingqiu.com'; // 域名正式环境

let instance = axios.create({
  baseURL: baseURL,
});

// #ifdef H5
// @ts-ignore
instance = axiosH5.create({
  baseURL: baseURL,
});
// #endif

instance.interceptors.request.use((config) => {
  config.header = {
    ...config.header,
    token: uni.getStorageSync('token'),
  };

  // #ifdef H5
  config.headers = {
    ...config.headers,
    token: uni.getStorageSync('token'),
  };
  // #endif

  if (config.method === 'POST') config.header['Content-Type'] = 'application/json';
  return {
    ...config,
    params: { ...config.params },
  };
});

instance.interceptors.response.use(
  (response) => {
    // #ifdef H5
    // @ts-ignore
    if (response.headers?.token) {
      // @ts-ignore
      uni.setStorageSync('token', response.headers.token);
    }
    // #endif

    if (response.data.code === 1002) {
      uni.showToast({
        title: response.data.msg || '未登录或登录已过期 ',
        icon: 'none',
      });
      uni.removeStorageSync('token');
      uni.reLaunch({ url: '/pages/Login/index' });
      throw Error(response.data.msg || '未登录或登录已过期 ');
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
