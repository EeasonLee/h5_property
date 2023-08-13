import request from './request';
import type {
  Response,
  IGetSmsCode,
  ILogin,
  IUserInfo,
  ResponsePage,
  IPromotionLog,
  IGradeList,
  IFromUserList,
  IGetGradeList,
  ICashLog,
  ICashPageData,
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
export const promotionLog = (data: { type: number; page: number }) => {
  return request.get<ResponsePage<IPromotionLog[]>>('/api/user/promotionLog', data);
};

/**
 * 我的下线
 */
export const fromUserList = (data: { grade_id?: number; page: number }) => {
  return request.get<ResponsePage<IFromUserList[]>>('/api/user/fromUserList', data);
};

/**
 * 会员升级
 */
export const gradeList = () => {
  return request.get<Response<IGradeList>>('/api/user/gradeList');
};

/**
 * 下线会员等级数量
 */
export const getGradeList = () => {
  return request.get<Response<IGetGradeList[]>>('/api/user/getGradeList');
};

/**
 * 提现记录
 */
export const cashLog = (data: { time?: string; page: number }) => {
  return request.get<ResponsePage<ICashLog>>('/api/user/cashLog', data);
};

/**
 * 提现页面数据
 */
export const getCashPageData = () => {
  return request.get<Response<ICashPageData>>('/api/user/cashPageData');
};

/**
 * 绑定银行卡
 */
export const bindCard = (data: any) => {
  return request.post<Response<any>>('/api/user/bindCard', data);
};

/**
 * 提现
 */
export const cash = (data: any) => {
  return request.post<Response<any>>('/api/user/cash', data);
};
