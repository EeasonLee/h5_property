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
  sum_recharge: number;
  add_recharge: number;
  partner_phone: string;
  stock_num: string;
  indirect_account_amount: string;
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
  from_user_grade: string;
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
  partner_phone: string;
}

export interface IGradeList {
  /**
   * 当前会员等级
   */
  grade: string;
  /**
   * 会员权益说明图
   */
  image: string;
  /**
   * 会员等级
   */
  list: {
    /**
     * ID
     */
    id: number;
    /**
     * 等级名称
     */
    name: string;
    /**
     * 价格
     */
    price: number;
  }[];
}

export interface IFromUserList {
  /**
   * 时间
   */
  create_time: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 总计
   */
  total: string;
  mobile: string;
}

export interface IGetGradeList {
  id?: number;
  name: string;
  [Symbol.iterator](): Iterator<any>;
}

export interface ICashLog {
  /**
   * 提现金额
   */
  amount: string;
  /**
   * 开户行
   */
  bank_name: string;
  /**
   * 银行卡号
   */
  bank_no: number;
  /**
   * 提现时间
   */
  create_time: string;
  id: number;
  /**
   * 提现失败备注
   */
  remark: null;
  /**
   * 状态0提现失败 1提现中 2提现失败
   */
  status: 0 | 1 | 2;
  status_val: string;
  uid: number;
  update_time: string;
}

export interface ICashPageData {
  /**
   * 直推账户余额
   */
  amount: string;
  /**
   * 开户行
   */
  bank_name: string;
  /**
   * 用户真实名称
   */
  bank_no: string;
  /**
   * 提现税费
   */
  cash_fee: string;
  /**
   * 间推账户余额
   */
  indirect_account_amount: string;
  /**
   * 最小提现金额
   */
  min_cash_money: string;
  /**
   * 当月最大提现金额
   */
  month_max_cash_money: string;
  /**
   * 真是名称
   */
  name: string;
  /**
   * 提现服务费
   */
  service_fee: string;
  /**
   * 当日单笔提现最大金额
   */
  today_cash_money: string;
}
