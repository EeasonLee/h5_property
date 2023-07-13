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

    <image
      src="/static/login/login_button.png"
      style="width: 426rpx; height: 94rpx; display: block; margin-top: 169rpx"
    />
  </view>
</template>

<script setup lang="ts"></script>

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
