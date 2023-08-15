<template>
  <view class="page">
    <view class="content">
      <u-navbar :autoBack="true" bgColor="#5980f9" leftIconColor="#fff" placeholder>
        <template #center>
          <image
            src="@/static/title/bangding.png"
            style="width: 150rpx; height: 42rpx; display: block"
          />
        </template>
      </u-navbar>

      <view class="flex-y-center" style="margin-top: 100rpx">
        <view class="text table">真实姓名：</view>
        <view>
          <u-input
            placeholder="请输入您的真实姓名"
            border="none"
            :customStyle="customStyle"
            :placeholderStyle="placeholderStyle"
            v-model="name"
          />
        </view>
      </view>

      <view class="flex-y-center" style="margin-top: 40rpx">
        <view class="text table">银行卡号：</view>
        <view>
          <u-input
            placeholder="请输入您的银行卡号"
            border="none"
            :customStyle="customStyle"
            :placeholderStyle="placeholderStyle"
            type="number"
            v-model="bank_no"
          />
        </view>
      </view>

      <view style="font-size: 26rpx; color: #dd4343; margin: 8rpx 62rpx 0 230rpx">
        注: 新卡将默认设置为提现卡
      </view>

      <view class="flex-y-center" style="margin-top: 40rpx">
        <view class="text table">手机号：</view>
        <view>
          <u-input
            placeholder="请输入您的手机号"
            border="none"
            :customStyle="customStyle"
            :placeholderStyle="placeholderStyle"
            type="number"
            v-model="phone"
          />
        </view>
      </view>

      <view class="flex-y-center" style="margin-top: 40rpx">
        <view class="text table">身份证号：</view>
        <view>
          <u-input
            placeholder="请输入您的身份证号"
            border="none"
            :customStyle="customStyle"
            :placeholderStyle="placeholderStyle"
            type="idcard"
            v-model="id_card"
          />
        </view>
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
          src="/static/login/login_button.png"
          style="width: 426rpx; height: 94rpx; display: block"
        />
      </u-button>
    </view>
    <image
      src="@/static/cash/yinhangka.png"
      style="width: 700rpx; height: 436rpx; display: block; position: absolute; bottom: 0; right: 0"
    />
  </view>
</template>

<script setup lang="ts">
  import { bindCard } from '@/api';
  import { ref } from 'vue';

  const bank_no = ref();
  const name = ref();
  const phone = ref();
  const id_card = ref();

  const confirm = () => {
    if (!name.value) {
      showToast('请输入真实姓名');
      return;
    }
    if (!bank_no.value) {
      showToast('请输入银行卡号');
      return;
    }
    if (!phone.value) {
      showToast('请输入手机号');
      return;
    }
    if (!id_card.value) {
      showToast('请输入身份证号');
      return;
    }

    uni.showLoading({
      title: '提交中',
      mask: true,
    });

    bindCard({
      bank_no: bank_no.value,
      id_card: id_card.value,
      name: name.value,
      phone: phone.value,
    })
      .then(() => {
        uni.hideLoading();
        showToast('添加成功');
        uni.navigateBack();
      })
      .catch(() => {
        uni.hideLoading();
      });
  };

  const showToast = (text: string) => {
    uni.showToast({
      title: text,
      icon: 'none',
    });
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
