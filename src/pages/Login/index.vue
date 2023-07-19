<template>
  <view class="page">
    <view style="margin-top: 176rpx; position: relative">
      <image
        src="/static/login/logo_bg.png"
        style="width: 300rpx; height: 300rpx; display: block"
      />
      <image
        src="/static/login/logo.png"
        style="
          width: 346rpx;
          height: 384rpx;
          display: block;
          position: absolute;
          left: -22rpx;
          top: -74rpx;
        "
      />
    </view>

    <image
      src="/static/login/welcome.png"
      style="width: 142rpx; height: 40rpx; display: block; margin-top: 18rpx; margin-bottom: 138rpx"
    />

    <u-form labelPosition="left" :model="form" :rules="rules" ref="formRef">
      <u-form-item labelWidth="0" label="" prop="phone" :borderBottom="false" ref="item1">
        <u-input
          v-model="form.phone"
          maxlength="11"
          placeholder="手机号"
          border="none"
          :customStyle="customStyle"
          :placeholderStyle="placeholderStyle"
        />
      </u-form-item>

      <u-form-item
        labelWidth="0"
        label=""
        prop="verificationCode"
        :borderBottom="false"
        orderBottom
        ref="item1"
        style="margin-top: 10rpx"
      >
        <u-input
          v-model="form.verificationCode"
          maxlength="4"
          placeholder="验证码"
          border="none"
          :customStyle="customStyle"
          :placeholderStyle="placeholderStyle"
        >
          <template #suffix>
            <u-button
              @click="getCode"
              :text="tips"
              type="success"
              size="mini"
              :disabled="disabled"
              :hairline="false"
              :customStyle="{
                background: 'transparent !important',
                padding: '4rpx 8rpx !important',
                color: '#0D6FC9',
                fontSize: '32rpx',
                border: 'none',
              }"
            />
          </template>
        </u-input>
      </u-form-item>
    </u-form>

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

    <u-code
      ref="uCodeRef"
      @change="codeChange"
      seconds="60"
      @start="disabled = true"
      @end="disabled = false"
    />
  </view>
</template>

<script setup lang="ts">
  import { getSmsCode, login } from '@/api/index';
  import { ref } from 'vue';

  const form = ref({
    phone: '',
    verificationCode: '',
  });

  const confirm = () => {
    formRef.value.validate().then(() => {
      console.log(form.value);
      login({
        mobile: form.value.phone,
        sms_code: form.value.verificationCode,
      }).then((res) => {
        console.log(res);
      });
    });
  };

  const disabled = ref(false);
  const tips = ref('发送验证码');
  const uCodeRef = ref();
  const formRef = ref();
  const getCode = async () => {
    if (form.value.phone.length < 11) {
      formRef.value.validateField('phone');
      return;
    }
    getSmsCode({ mobile: form.value.phone }).then((res) => {
      console.log(res);
      uCodeRef.value.start();
    });
  };
  const codeChange = (text: string) => {
    tips.value = text;
  };

  const customStyle = {
    background: '#D2ECFF',
    width: '640rpx',
    height: '88rpx',
    boxSizing: 'border-box',
    borderRadius: '18rpx',
    paddingInline: '30rpx',
    marginBottom: '10rpx',
  };

  const placeholderStyle = {
    color: '#6C6C6C',
    fontSize: '32rpx',
  };

  const rules = {
    phone: [
      {
        required: true,
        message: '请输入手机号',
      },
      {
        validator: (_rule: any, value: any, _callback: any) => {
          const isMobile = uni.$u.test.mobile(value);
          return isMobile;
        },
        message: '手机号码不正确',
        trigger: ['change', 'blur'],
      },
    ],
    verificationCode: {
      type: 'string',
      required: true,
      len: 4,
      message: '请填写4位验证码',
      trigger: ['change', 'blur'],
    },
  };
</script>

<style lang="scss" scoped>
  .page {
    background-image: url('/static/login/login_bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    :deep(.u-form-item__body) {
      padding: 0;
    }

    :deep(.u-button__text) {
      font-size: 32rpx !important;
    }
  }
</style>
