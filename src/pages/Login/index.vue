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
          width: 358rpx;
          height: 384rpx;
          display: block;
          position: absolute;
          left: -28rpx;
          top: -70rpx;
        "
      />
    </view>

    <image
      src="/static/login/welcome.png"
      style="width: 142rpx; height: 34rpx; display: block; margin-top: 18rpx"
    />

    <u-form labelPosition="left" :model="form" :rules="rules" ref="form">
      <u-form-item labelWidth="80" label="手机号" prop="phone" borderBottom ref="item1">
        <u-input v-model="form.phone" maxlength="11" placeholder="请填写手机号" border="none" />
      </u-form-item>
      <u-form-item label="验证码" prop="verificationCode" borderBottom labelWidth="80" ref="item1">
        <u-input v-model="form.verificationCode" placeholder="请填写验证码" border="none">
          <template slot="suffix">
            <u-button
              @click="getCode"
              :text="tips"
              type="success"
              size="mini"
              :disabled="disabled"
              :hairline="false"
              :customStyle="{
                background: '#5ac725 !important',
                padding: '0 8px !important',
              }"
            />
          </template>
        </u-input>
      </u-form-item>
    </u-form>

    <image
      src="/static/login/login_button.png"
      style="width: 426rpx; height: 94rpx; display: block; margin-top: 169rpx"
    />
  </view>
</template>

<script setup lang="ts">
  import ref from 'vue';

  const form = ref();
  const disabled = ref(true);
  const tips = ref(true);

  const getCode = () => {};

  const rules = {
    phone: [
      {
        required: true,
        message: '请输入手机号',
        trigger: ['change', 'blur'],
      },
      {
        validator: (_rule: any, value: any, _callback: any) => {
          const isOk = uni.$u.test.mobile(value);
          return isOk;
        },
        message: '手机号码不正确',
        trigger: ['change', 'blur'],
      },
    ],
    verificationCode: {
      type: 'string',
      required: true,
      len: 6,
      message: '请填写6位验证码',
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
  }
</style>
