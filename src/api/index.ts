import request from './request';
import type {
  Response,
  IGetSmsCode,
  ILogin,
  IUserInfo,
  ResponsePage,
  IPromotionLog,
} from './types';

export const login = (data: ILogin) => {
  return request.post<Response<any>>('/api/login', data);
};

export const getSmsCode = (data: IGetSmsCode) => {
  return request.post<Response<any>>('/api/getSmsCode', data);
};

export const userInfo = () => {
  return request.get<Response<IUserInfo>>('/api/user/userinfo');
};

/**
 * 分佣记录
 * 记录类型1税收奖励 2推广奖励
 */
export const promotionLog = (data: { type: 1 | 2; page: number }) => {
  return request.get<ResponsePage<IPromotionLog[]>>('/api/user/promotionLog', data);
};
