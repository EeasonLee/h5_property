<template>
  <view class="content">
    <u-navbar :autoBack="false" :leftIcon="''" bgColor="#5980f9" leftIconColor="#fff" placeholder>
      <template #center>
        <image src="@/static/title/tgzx.png" style="width: 149rpx; height: 43rpx; display: block" />
      </template>
      <template #right>
        <image
          @click="flushed"
          src="@/static/icon/sx.png"
          style="width: 36rpx; height: 30rpx; display: block"
        />
      </template>
    </u-navbar>

    <view class="infoBox">
      <view class="info">
        <view class="info_item">
          <text> 会员等级：{{ userData?.grade_name }} </text>
          <image
            @click="goPage('/pages/Upgrade/index')"
            src="@/static/home/shengji.png"
            style="width: 86rpx; height: 52rpx; display: block"
          />
        </view>
        <view class="info_item">
          <text> 会员数：{{ userData?.below }} </text>
          <image
            @click="goPage('/pages/Subordinate/index')"
            src="@/static/home/chakan.png"
            style="width: 86rpx; height: 52rpx; display: block"
          />
        </view>
      </view>

      <view style="background: #fff; height: 1rpx; margin: 19rpx 0rpx 30rpx" />

      <view style="display: flex; justify-content: space-around; text-align: center">
        <view class="field">
          <view>今日收益</view>
          <view>{{ userData?.today_income }}</view>
        </view>
        <view class="field">
          <view>今日推广人数</view>
          <view>{{ userData?.today_promotion }}</view>
        </view>
        <view class="field">
          <view>我的服务商号</view>
          <view>{{ userData?.partner_phone }}</view>
        </view>
      </view>

      <view
        style="display: flex; justify-content: space-around; text-align: center; margin-top: 20rpx"
      >
        <view class="field">
          <view>我的累计充值</view>
          <view>{{ userData?.sum_recharge }}</view>
        </view>
        <view class="field">
          <view>会员累计充值</view>
          <view>{{ userData?.add_recharge }}</view>
        </view>
        <view class="field">
          <view>我的股权份数</view>
          <view>{{ userData?.stock_num }}</view>
        </view>
      </view>

      <view style="background: #fff; height: 1rpx; margin: 31rpx 0rpx 39rpx" />

      <view style="display: flex; justify-content: space-between">
        <view>
          <text
            style="font-size: 32rpx; font-family: Microsoft YaHei; font-weight: 400; color: #ffffff"
          >
            直推钱包：
          </text>
          <text style="color: #ffeb7f">{{ userData?.amount }}</text>
        </view>

        <view>
          <image
            @click="goPage('/pages/Withdraw/index?type=1')"
            src="@/static/home/woyaotixian.png"
            style="width: 156rpx; height: 52rpx; display: block"
          />
        </view>

        <view>
          <image
            @click="goPage('/pages/CashLog/index')"
            src="@/static/home/tikuanjilu.png"
            style="width: 156rpx; height: 52rpx; display: block; margin-left: 4rpx"
          />
        </view>
      </view>

      <view style="display: flex; justify-content: space-between; margin-top: 25rpx">
        <view>
          <text
            style="font-size: 32rpx; font-family: Microsoft YaHei; font-weight: 400; color: #ffffff"
          >
            积分钱包：
          </text>
          <text style="color: #ffeb7f">{{ userData?.indirect_account_amount }}</text>
        </view>

        <view>
          <image
            @click="goPage('/pages/Withdraw/index?type=2')"
            src="@/static/home/woyaotixian.png"
            style="width: 156rpx; height: 52rpx; display: block"
          />
        </view>

        <view>
          <image
            @click="goPage('/pages/CashLog/index')"
            src="@/static/home/tikuanjilu.png"
            style="width: 156rpx; height: 52rpx; display: block; margin-left: 4rpx"
          />
        </view>
      </view>

      <view style="background: #fff; height: 1rpx; margin: 39rpx 0rpx 30rpx" />
    </view>

    <view style="display: flex; align-items: center; margin-left: 43rpx">
      <view
        class="tabs"
        :class="promotionLogType == 1 && 'tabs_active'"
        @click="promotionLogType = 1"
      >
        直推奖励
      </view>

      <view
        class="tabs"
        :class="promotionLogType == 2 && 'tabs_active'"
        @click="promotionLogType = 2"
      >
        积分奖励
      </view>

      <view
        class="tabs"
        :class="promotionLogType == 3 && 'tabs_active'"
        @click="promotionLogType = 3"
      >
        服务费
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
            <view style="font-weight: 400">会员手机号：{{ item.partner_phone }}</view>
            <view v-if="promotionLogType != 3">
              <text
                style="
                  font-size: 30rpx;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #000001;
                "
              >
                充值:
              </text>
              {{ item.amount || 0 }}
            </view>
          </view>

          <view class="table_item_2">
            <view>等级：{{ item.from_user_grade }}</view>
            <view>
              <text v-if="promotionLogType != 3">分成金额：</text>
              <text v-else>团队管理奖：</text>
              {{ item.profit }}
            </view>
            <view>分成比例：{{ Number(item.ratio) * 100 + '%' }}</view>
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
  import { onShow } from '@dcloudio/uni-app';

  const userData = ref<IUserInfo>();
  const promotionLogType = ref<1 | 2 | 3>(1);

  const getUserInfo = () => {
    userInfo().then((res) => {
      userData.value = res.data;
    });
  };

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

  const flushed = () => {
    getUserInfo();
    refresh();
  };

  onShow(() => {
    flushed();
  });
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

    .field {
      flex: 1;
      :first-child {
        font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
      :last-child {
        font-size: 22rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }
    }

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
    font-size: 24rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 48rpx;
    padding-inline: 14rpx;
    background: #678afb;
    border-radius: 12rpx;
    z-index: 99;

    &_active {
      font-size: 28rpx;
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
    // flex-grow: 1; //自适应屏幕剩下的高度
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
        justify-content: space-between;
        // grid-gap: 49rpx;
        margin-top: 20rpx;
        font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #6c6c6c;
      }
    }
  }
</style>
