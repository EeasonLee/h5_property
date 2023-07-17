import request from './request';
import type { ILogin } from './types';

export const login = (data: ILogin) => {
  return request.post('/api/login', data);
};

export const getSmsCode = (data: IGetSmsCode) => {
  return request.post('/api/getSmsCode', data);
};
