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
