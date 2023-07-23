<template>
  <view class="page">
    <view class="content">
      <u-navbar :autoBack="true" bgColor="#5980f9" leftIconColor="#fff" placeholder>
        <template #center>
          <image
            src="@/static/title/我要提现.png"
            style="width: 150rpx; height: 42rpx; display: block"
          />
        </template>
      </u-navbar>

      <view class="flex-y-center" style="margin-top: 100rpx">
        <view class="text table">提款金额：</view>

        <!-- type="digit" -->
        <view>
          <u-input
            placeholder="请输入您的提款金额"
            border="none"
            :customStyle="customStyle"
            :placeholderStyle="placeholderStyle"
            type="number"
            @blur="formatting"
            v-model.number="money"
          />
        </view>
      </view>

      <view style="font-size: 26rpx; color: #000; margin: 8rpx 230rpx">
        当前余额为：{{ data?.amount }}
      </view>

      <view class="flex-y-center" style="margin-top: 27rpx">
        <view class="text table">姓名：</view>
        <view class="text">{{ data?.name }}</view>
      </view>

      <view class="flex-y-center" style="margin-top: 60rpx">
        <view class="text table"> 提现银行卡： </view>
        <view class="text">{{ data?.bank_no }}</view>
      </view>

      <view
        style="font-size: 26rpx; color: #30c5fe; margin: 8rpx 230rpx; text-decoration: underline"
        @click="goPage('/pages/BindCard/index')"
      >
        更换银行卡
      </view>

      <u-button
        class="u-reset-button"
        style="margin-top: 169rpx"
        hover-class="none"
        :customStyle="{
          background: 'transparent !important',
          padding: '0 !important',
          border: 'none',
          height: 'auto',
        }"
        @click="confirm"
        :throttleTime="2000"
      >
        <image
          src="@/static/cash/确认提现.png"
          style="width: 426rpx; height: 94rpx; display: block"
        />
      </u-button>

      <view
        style="
          margin-left: 62rpx;
          margin-top: 45rpx;
          display: flex;
          flex-direction: column;
          grid-gap: 30rpx;
        "
      >
        <view class="text">1、 每天只能提现一次</view>
        <view class="text">2、 提现金额不能低于100元</view>
        <view class="text">3、 提现金额只能为整数</view>
      </view>
    </view>
    <image
      src="@/static/cash/银行卡.png"
      style="width: 700rpx; height: 436rpx; display: block; position: absolute; bottom: 0; right: 0"
    />
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getCashPageData } from '@/api';
  import type { ICashPageData } from '@/api/types';
  import { onShow } from '@dcloudio/uni-app';

  onShow(() => {
    getData();
  });

  const money = ref();
  const data = ref<ICashPageData>();
  const confirm = () => {
    console.log(money.value);
  };

  const getData = () => {
    getCashPageData()
      .then((res) => {
        if (!res.data.bank_no) {
          uni.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
          });
        }
        data.value = res.data;
      })
      .catch(() => {
        goPage('/pages/BindCard/index');
      });
  };

  const formatting = (e: string) => {
    if (!e) return;
    const value = Number(e);
    money.value = Number(value.toFixed(0));
  };

  const goPage = (url: string) => {
    if (!url) return;
    uni.navigateTo({ url });
  };

  const customStyle = {
    background: '#D2ECFF',
    width: '430rpx',
    height: '68rpx',
    boxSizing: 'border-box',
    borderRadius: '18rpx',
    paddingInline: '30rpx',
  };

  const placeholderStyle = {
    color: '#6C6C6C',
    fontSize: '32rpx',
  };
</script>

<style lang="scss" scoped>
  .page {
    position: relative;
    width: 750rpx;
    height: 100vh;
    background: linear-gradient(to bottom, #5b7ffb, #5a7ffa, #5980f9);
  }
  .content {
    position: absolute;
    top: 0;
    width: 750rpx;
    display: flex;
    flex-direction: column;
    z-index: 99;
  }
  .text {
    font-size: 32rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #e5f5ff;
  }
  .table {
    width: 230rpx;
    text-align: right;
  }
</style>
