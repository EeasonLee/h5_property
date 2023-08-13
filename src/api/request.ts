import axios, { type AxiosRequestConfig } from 'axios';

const baseURL = 'https://cannon.kuwanxingqiu.com/';

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  config.headers.token = uni.getStorageSync('token');
  // config.headers.token =
  // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Nhbm5vbi5rdXdhbnhpbmdxaXUuY29tLyIsImF1ZCI6Imh0dHBzOi8vY2Fubm9uLmt1d2FueGluZ3FpdS5jb20vIiwiaWF0IjoxNjkxOTQxMDUwLCJuYmYiOjE2OTE5NDEwNTAsImV4cCI6MTY5MjU0NTg1MCwidXNlcl9pZCI6NjV9.OZQiChHRS-rltPgLWuIstwl163prWt-N090d8NBE6UU';
  // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Nhbm5vbi5rdXdhbnhpbmdxaXUuY29tLyIsImF1ZCI6Imh0dHBzOi8vY2Fubm9uLmt1d2FueGluZ3FpdS5jb20vIiwiaWF0IjoxNjkxOTQwNTA4LCJuYmYiOjE2OTE5NDA1MDgsImV4cCI6MTY5MjU0NTMwOCwidXNlcl9pZCI6MjR9.BfkrV9Eo-FWjRQNG8aK0Fj1DaQHOoZtVCrqg7K2ubQg';
  // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Nhbm5vbi5rdXdhbnhpbmdxaXUuY29tLyIsImF1ZCI6Imh0dHBzOi8vY2Fubm9uLmt1d2FueGluZ3FpdS5jb20vIiwiaWF0IjoxNjkxNTczMDM1LCJuYmYiOjE2OTE1NzMwMzUsImV4cCI6MTY5MjE3NzgzNSwidXNlcl9pZCI6MjF9.L7yzxGN5yS8HZJ2g-xOe2o-Lrq43cXuvDkpRmdgrO3M';

  if (config.method === 'POST') config.headers['Content-Type'] = 'application/json';

  return {
    ...config,
    params: { ...config.params },
  };
});

instance.interceptors.response.use(
  (response) => {
    // #ifdef H5
    // @ts-ignore
    if (response?.headers?.token) {
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
    uni.showToast({
      title: err.message || '连接服务器异常',
      icon: 'none',
    });
  },
);

function buildURLWithParams(url: string, params: any) {
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] || '')}`)
    .join('&');

  return `${url}?${queryString}`;
}

const request = {
  get: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    let newUrl = url;
    if (data) {
      newUrl = buildURLWithParams(url, data);
    }
    return instance.get<T>(newUrl, config) as Promise<T>;
  },
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return instance.post<T>(url, data, config) as Promise<T>;
  },
};

export default request;
