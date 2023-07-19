export interface Response<T> {
  code: number; //	状态码	integer(int32)	integer(int32)
  data: T; //	结果集	CosCredentialVo	CosCredentialVo
  msg: string; //	状态文本	string
}

export interface ResponsePage<T> {
  code: number; //	状态码	integer(int32)	integer(int32)
  data: {
    /**
     * 当前页
     */
    current_page: number;
    /**
     * 列表数据
     */
    data: [];
    /**
     * 最后一页
     */
    last_page: number;
    /**
     * 每页显示多少
     */
    per_page: number;
    /**
     * 总条数
     */
    total: number;
  }; //	结果集	CosCredentialVo	CosCredentialVo
  msg: string; //	状态文本	string
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

export interface IPromotionLog {
  /**
   * 订单金额
   */
  amount: string;
  /**
   * 时间
   */
  create_time: string;
  /**
   * 下线会员等级
   */
  grade: string;
  id: number;
  /**
   * 下线昵称
   */
  nickname: string;
  /**
   * 分佣金额
   */
  profit: string;
  /**
   * 分佣比例
   */
  ratio: string;
  /**
   * 类型
   */
  type: number;
  update_time: string;
}
