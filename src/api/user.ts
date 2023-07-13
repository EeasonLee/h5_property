import request from './request';

export const getUserInfo = () => {
  return request.post('/api/user/getUserInfo');
};
