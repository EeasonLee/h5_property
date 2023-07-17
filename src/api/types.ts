export interface Response<T> {
  code: number; //	状态码	integer(int32)	integer(int32)
  data: T; //	结果集	CosCredentialVo	CosCredentialVo
  msg: string; //	状态文本	string
}

export interface ResponsePage<T> {
  code: number; //	状态码	integer(int32)	integer(int32)
  data: {
    pages: number; //		integer(int64)
    size: number; //		integer(int64)
    total: number; //		integer(int64)
    records: T[];
  }; //	结果集	CosCredentialVo	CosCredentialVo
  message: string; //	状态文本	string
  requestNo: string; //	请求流水号	string
}

export interface RequestPage {
  pageSize: number;
  pageNo: number;
}

export interface ILogin {
  /**
   * 手机号码
   */
  mobile: string;
  /**
   * 短信验证码
   */
  sms_code: string;
}

export interface IGetSmsCode {
  /**
   * 手机号码
   */
  mobile: string;
}

export interface IUserInfo {
  /**
   * 账户余额
   */
  amount: string;
  /**
   * 我的下线数量
   */
  below: number;
  /**
   * 等级名称
   */
  grade_name: null;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 今日收益
   */
  today_income: number;
  /**
   * 今日推广人数
   */
  today_promotion: number;
}
