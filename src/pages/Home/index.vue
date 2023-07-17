<template>
  <view class="content">
    <!-- 轮播 -->
    <view style="width: 750rpx">
      <u-swiper
        :list="banner"
        indicator
        height="200rpx"
        radius="0"
        :autoplay="false"
        indicatorStyle="bottom: 9rpx"
        @change="(e: any) => (current = e.current)"
        @click="goLogin"
      >
        <template #indicator>
          <view class="indicator">
            <view
              class="indicator__dot"
              v-for="(_, index) in banner"
              :key="index"
              :class="[index === current && 'indicator__dot--active']"
            >
            </view>
          </view>
        </template>
      </u-swiper>
    </view>
    <!-- 轮播 -->
    <view class="box"> </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const current = ref(0);
  const banner = ['/src/static/home/banner.png', '/src/static/home/banner.png'];

  const goLogin = () => {
    uni.navigateTo({ url: '/pages/Login/index' });
  };
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
      height: 18rpx;
      width: 18rpx;
      border-radius: 50%;
      background-color: #cfe6ff;
      margin: 0 6rpx;
      transition: background-color 0.3s;

      &--active {
        background-color: #60abff;
      }
    }
  }

  .box {
    flex: 1;
    width: 750rpx;
    background: linear-gradient(to bottom, #5b7ffb, #5a7ffa, #5980f9);
  }
</style>
