<template>
  <div class="page-container">
    <u-navbar :autoBack="true" bgColor="#5980f9" leftIconColor="#fff" placeholder>
      <template #center>
        <image
          src="@/static/title/woyaotixian.png"
          style="width: 150rpx; height: 42rpx; display: block"
        />
      </template>
    </u-navbar>

    <view class="box">
      <view class="title">
        <text>提现金额</text>
        <text style="color: #a5a5a5; margin-left: 28rpx; font-size: 24rpx">
          可提现金额：{{ walletInfo?.balanceMoney || '0.00' }} 元
        </text>
      </view>

      <u-form :model="form" :rules="rules" ref="formRef1">
        <u-form-item labelWidth="0" prop="withdrawMoney">
          <u-input
            type="digit"
            border="none"
            v-model.number="form.withdrawMoney"
            @blur="formatting"
            :customStyle="{
              padding: 0,
              fontWeight: 500,
              borderBottom: '2rpx solid #FFF2F2F2',
            }"
            fontSize="56rpx"
            color="#333"
            placeholderStyle="color: #c0c4cc;font-size: 30rpx"
            placeholder="请输入提现金额"
          >
            <template #prefix>
              <view class="input-pre">￥</view>
            </template>
            <template #suffix>
              <text class="allWithdraw" @click="form.withdrawMoney = walletInfo?.balanceMoney || 0">
                全部提现
              </text>
            </template>
          </u-input>
        </u-form-item>
      </u-form>

      <view class="explain">
        提现金额不能小于 {{ withdrawInfo.min }}元 、 大于 {{ withdrawInfo.max }}元，服务费比率
        {{ withdrawInfo.serviceFeeRatio }} %
      </view>
      <view class="tip">提现将扣除税费：￥{{ deduct || 0 }}</view>
      <view class="tip">提现实际到账金额：￥{{ reality || 0 }}</view>
    </view>

    <view class="box">
      <view class="title">提现方式</view>
      <view class="choose-list">
        <u-radio-group v-model="radioValue" placement="column">
          <view
            class="list flex-y-center-x-between"
            v-for="(item, index) in radioList"
            :key="index"
            @click="radioChange(item.value)"
          >
            <view class="flex-y-center">
              <image
                :src="item.icon"
                :style="{
                  width: '40rpx',
                  height: '40rpx',
                  marginLeft: '10rpx',
                  display: 'block',
                }"
              />
              <view class="label margin-l-10">{{ item.name }}</view>
            </view>
            <u-radio
              :name="item.value"
              @change="radioChange(item.value)"
              activeColor="#477EEE"
              size="41rpx"
            />
          </view>
        </u-radio-group>
      </view>
    </view>

    <view class="box">
      <view class="title">账户信息</view>

      <view class="form">
        <u-form labelPosition="left" :model="form" :rules="rules" ref="formRef2">
          <u-form-item
            labelWidth="90"
            label="支付宝账号"
            prop="alipayAccount"
            v-if="radioValue == 1"
          >
            <u-input
              v-model="form.alipayAccount"
              placeholder="请填写支付宝账号"
              border="none"
            ></u-input>
          </u-form-item>
          <u-form-item labelWidth="90" label="支付宝姓名" prop="name" v-if="radioValue == 1">
            <u-input v-model="form.name" placeholder="请填写支付宝姓名" border="none"></u-input>
          </u-form-item>
          <u-form-item v-else-if="radioValue == 2" label="手机号" prop="phone" labelWidth="60">
            <u-input v-model="form.phone" placeholder="请填写手机号" border="none" type="number">
            </u-input>
          </u-form-item>
          <u-form-item v-else-if="radioValue == 3" label="银行卡号" prop="cardNo" labelWidth="90">
            <view class="cardNo">
              <view style="margin-right: 10rpx">
                {{ form.cardNo || '请选择' }}
              </view>
              <u-icon name="arrow-right" size="12" color="#333" />
            </view>
          </u-form-item>
        </u-form>
      </view>

      <view class="consent">
        <u-checkbox-group>
          <view class="flex-y-center">
            <u-checkbox @change="checkboxChange" shape="circle" activeColor="#477EEE" size="14" />
            <view class="deal">
              我已同意
              <text style="color: #477eee" @click="goToPage"> 《个人信息使用授权书》 </text>
            </view>
          </view>
        </u-checkbox-group>
      </view>
    </view>

    <view class="box">
      <view class="title">详细说明</view>
      <view class="detail"> 当日单笔提现不超过2万元，每月累计提现不超过10万元 </view>
      <view class="detail"> 提现税费6%+服务费1% </view>
      <view class="detail"> 每周一提现，48小时到账（如遇节假日将延后） </view>
    </view>

    <view class="fixed-bottom-but">
      <image
        @click="submit"
        src="@/static/but/sqtx.png"
        style="width: 426rpx; height: 94rpx; display: block"
      />
    </view>

    <u-modal
      :show="showSuccess"
      title="申请成功"
      content="已成功申请提现！"
      :closeOnClickOverlay="true"
      :confirmColor="'#000'"
      @close="showSuccess = false"
      @cancel="showSuccess = false"
      @confirm="goPage"
      confirmText="提现记录"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { toast } from '@/utils';

  interface Form {
    withdrawMoney: number;
    alipayAccount: string;
    phone: string;
    amount: string;
    cardNo: string;
    name: string;
  }

  const walletInfo = ref();
  const showSuccess = ref(false);
  const isConsent = ref(false);

  const checkboxChange = (e: boolean) => {
    isConsent.value = e;
  };

  const goToPage = () => {};

  const withdrawInfo = ref({
    min: 1,
    max: 20000,
    serviceFeeRatio: 7,
  });

  const formRef1 = ref();
  const formRef2 = ref();
  const form = reactive<Form>({
    withdrawMoney: 0,
    alipayAccount: '',
    name: '',
    phone: '',
    amount: '',
    cardNo: '',
  });

  const rules = {
    withdrawMoney: {
      type: 'number',
      required: true,
      message: '请填写金额',
      trigger: ['blur', 'change'],
    },
    alipayAccount: {
      type: 'string',
      required: true,
      message: '请填写支付宝账号',
      trigger: ['blur', 'change'],
    },
    name: {
      type: 'string',
      required: true,
      message: '请填写支付宝姓名',
      trigger: ['blur', 'change'],
    },
    phone: {
      type: 'string',
      required: true,
      message: '手机号码不正确',
      validator: (_: any, value: string) => {
        return uni.$u.test.mobile(value);
      },
      trigger: ['change', 'blur'],
    },
  };

  const reality = ref();

  const deduct = computed(() => {
    if (form.withdrawMoney > 0) {
      const value = form.withdrawMoney * ((withdrawInfo.value.serviceFeeRatio || 0) * 0.01);
      console.log('deduct', value);
      const realityValue = form.withdrawMoney - value;
      reality.value = realityValue.toFixed(2);
      return value.toFixed(2);
    }
    return 0;
  });

  const submit = async () => {
    try {
      if (!isConsent.value) {
        return toast('请先同意并勾选协议');
      }
      if (
        withdrawInfo.value.max &&
        form.withdrawMoney > withdrawInfo.value.max &&
        form.withdrawMoney > (walletInfo.value?.balanceMoney || 0)
      ) {
        return toast('提现金额超出最大值');
      }
      if (withdrawInfo.value.min && form.withdrawMoney < withdrawInfo.value.min) {
        return toast('提现金额小于最小值');
      }

      await formRef1.value.validate();
      await formRef2.value.validate();

      // await postWithdraw({
      //   withdrawalAmount: form.withdrawMoney,
      //   name: form.name,
      //   account: form.alipayAccount,
      // });
      toast('提现申请成功');
      uni.navigateBack();
    } catch (error) {
      console.log(error);
    }
  };

  // userWallet().then((res) => {
  //   walletInfo.value = res.data;
  // });

  const formatting = (e: string) => {
    if (!e) return;
    const value = Number(e);
    form.withdrawMoney = Number(value.toFixed(2));
  };

  const goPage = () => {};

  const radioList = [
    {
      name: '支付宝',
      value: 1,
      icon: '/static/icon/zhifubao.png',
    },
    {
      name: '微信',
      value: 2,
      icon: '/static/icon/weixin.png',
    },
    {
      name: '银行卡',
      value: 3,
      icon: '/static/icon/yinlian.png',
    },
  ];

  const radioValue = ref<number>(1);
  const radioChange = (v: number) => {
    if (v === radioValue.value) return;
    radioValue.value = v;
  };
</script>

<style scoped lang="scss">
  .page-container {
    width: 750rpx;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f0f2f4;
    background: linear-gradient(to bottom, #5b7ffb, #5a7ffa, #5980f9);
    padding-bottom: 200rpx;
  }

  .box {
    background: #fff;
    padding: 32rpx;
    margin-top: 24rpx;
    margin-inline: 24rpx;
    border-radius: 16rpx;
  }

  .consent {
    display: flex;
    align-items: center;
    justify-content: start;
    .deal {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 34rpx;
    }
  }

  .input-pre {
    font-size: 56rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 80rpx;
  }

  .allWithdraw {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
    line-height: 34rpx;
    margin-left: 24rpx;
  }

  .tip {
    margin-top: 12rpx;
    color: #333;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 34rpx;
  }

  .title {
    margin-bottom: 8rpx;
    // font-size: 32rpx;
    // font-family: PingFangSC-Medium, PingFang SC;
    // font-weight: 500;
    // color: #333333;

    font-size: 26rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
  }

  .choose-list {
    .list {
      margin-top: 20rpx;

      .label {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 34rpx;
      }
    }
  }

  .form {
    .cardNo {
      font-size: 28rpx;
      text-align: right;
      color: #000;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .detail {
    margin-top: 12rpx;
    font-size: 24rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #4473ed;
    line-height: 34rpx;
  }

  .explain {
    font-size: 22rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
    margin-top: 12rpx;
  }

  .fixed-bottom-but {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    box-sizing: border-box;
    background: transparent;
    background: #5980f9;
    display: flex;
    justify-content: center;
    padding: 24rpx 24rpx 48rpx;
  }
</style>
