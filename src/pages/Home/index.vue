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

    <view class="infoBox">
      <view class="info">
        <view class="info_item">
          <text> 会员等级：{{ userData?.grade_name }} </text>
          <image
            @click="goPage('/pages/Upgrade/index')"
            src="@/static/home/升级.png"
            style="width: 86rpx; height: 52rpx; display: block"
          />
        </view>
        <view class="info_item">
          <text> 下线数：{{ userData?.below }} </text>
          <image
            @click="goPage('/pages/Subordinate/index')"
            src="@/static/home/查看.png"
            style="width: 86rpx; height: 52rpx; display: block"
          />
        </view>
      </view>

      <view class="info">
        <view class="info_item">
          <text> 上级代理昵称：{{ userData?.nickname }} </text>
        </view>
      </view>

      <view class="info" style="justify-content: left">
        <view class="info_item">
          <text> 今日收益： </text>
          <text style="color: #ff8484">{{ userData?.today_income }} </text>
        </view>
        <view class="info_item" style="margin-left: 66rpx">
          <text> 今日推广人数： </text>
          <text style="color: #6dff74">{{ userData?.today_promotion }} </text>
        </view>
      </view>

      <view class="info">
        <view class="info_item">
          <text> 可提款： </text>
          <text style="color: #ffeb7f">{{ userData?.amount }}</text>
          <image
            @click="goPage('/pages/Cash/index')"
            src="@/static/home/我要提现.png"
            style="width: 156rpx; height: 52rpx; display: block"
          />

          <image
            @click="goPage('/pages/CashLog/index')"
            src="@/static/home/提款记录.png"
            style="width: 156rpx; height: 52rpx; display: block; margin-left: 4rpx"
          />
        </view>
      </view>
    </view>

    <view style="display: flex; align-items: center; margin-left: 43rpx; margin-top: 39rpx">
      <view
        class="tabs"
        :class="promotionLogType == 1 && 'tabs_active'"
        @click="promotionLogType = 1"
        >税收奖励
      </view>
      <view
        class="tabs"
        :class="promotionLogType == 2 && 'tabs_active'"
        @click="promotionLogType = 2"
      >
        推广奖励
      </view>
    </view>

    <view class="table">
      <z-paging
        ref="paging"
        v-model="dataList"
        @query="queryList"
        :refresher-enabled="false"
        :default-page-size="10"
        :fixed="false"
      >
        <view class="table_item" v-for="(item, index) in dataList" :key="index">
          <view class="flex-y-center-x-between table_item_1">
            <view style="font-weight: 400">下线昵称：{{ item.nickname }}</view>
            <view>{{ item.amount }}</view>
          </view>

          <view class="table_item_2">
            <text>会员等级：{{ item.from_user_grade }}</text>
            <text>税收：{{ item.profit }}</text>
            <text>分成比例：{{ Number(item.ratio) * 100 + '%' }}</text>
          </view>

          <view class="table_item_2">
            <text>{{ item.create_time }}</text>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { userInfo, promotionLog } from '@/api';
  import { ref, watch } from 'vue';
  import type { IUserInfo, IPromotionLog } from '@/api/types';

  const current = ref(0);
  const banner = ['/src/static/home/banner.png', '/src/static/home/banner.png'];
  const userData = ref<IUserInfo>();
  const promotionLogType = ref<1 | 2>(1);

  userInfo().then((res) => {
    userData.value = res.data;
  });

  const paging = ref();
  const dataList = ref<IPromotionLog[]>();
  const queryList = (pageNo: number, pageSize: number) => {
    promotionLog({ type: promotionLogType.value, page: pageNo })
      .then((res) => {
        paging.value.complete(res.data.data);
      })
      .catch(() => {
        paging.value.complete(false);
      });
  };

  // 刷新列表
  const refresh = () => {
    paging.value.reload();
  };

  watch(promotionLogType, (newValue) => {
    refresh();
  });

  const goPage = (url: string) => {
    if (!url) return;
    uni.navigateTo({ url });
  };
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to bottom, #5b7ffb, #5a7ffa, #5980f9);
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

  .infoBox {
    padding: 0rpx 40rpx;
    display: flex;
    flex-direction: column;

    .info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;

      .info_item {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        margin-top: 40rpx;
        text:last-of-type {
          margin-right: 7rpx;
          white-space: nowrap;
        }
      }
    }
  }

  .tabs {
    font-size: 28rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 48rpx;
    padding-inline: 14rpx;
    background: #678afb;
    border-radius: 12rpx;
    z-index: 99;

    &_active {
      font-size: 32rpx;
      line-height: 52rpx;
      border-radius: 14rpx 14rpx 0 0;
      border: 3rpx solid #386bb1;
      border-bottom: none;
      color: #307eff;
      font-weight: bold;
      background: #d2ecff;
    }
  }

  .table {
    margin-inline: 25rpx;
    border: 3rpx solid #386bb1;
    background: #d2ecff;
    border-radius: 14rpx;
    margin-top: -3rpx;
    margin-bottom: 25rpx;
    flex-grow: 1; //自适应屏幕剩下的高度
    height: 731rpx;
    // 如果你没有设置height: 0px;
    // 而且div元素的内容高度不超过默认的高度，那么它可能会继续占据默认的高度，从而导致其他具有flex-grow属性的元素无法显示。
    // 通过设置height: 0px;
    // 你可以确保div元素在flexbox布局中正确地分配和填充剩余的空间。

    :last-child {
      border-bottom: 0;
    }

    &_item {
      padding: 30rpx;
      border-bottom: 1rpx solid #94aec2;

      &_1 {
        font-size: 32rpx;
        font-family: Alte Haas Grotesk;
        font-weight: bold;
        color: #000001;
      }

      &_2 {
        display: flex;
        grid-gap: 49rpx;
        margin-top: 20rpx;
        font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #6c6c6c;
      }
    }
  }
</style>
