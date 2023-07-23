<template>
  <view class="page">
    <u-navbar :autoBack="true" bgColor="#5980f9" leftIconColor="#fff" placeholder>
      <template #center>
        <image
          src="@/static/title/提款记录.png"
          style="width: 149rpx; height: 43rpx; display: block"
        />
      </template>
    </u-navbar>

    <view class="flex-y-center" style="margin-top: 44rpx; margin-inline: 30rpx">
      <view class="title">查询：</view>
      <view class="query" @click="show = true"> {{ time || '全部' }} </view>
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
            <view style="font-weight: 400">银行卡：{{ item.bank_name }}</view>
            <view>{{ item.amount }}</view>
          </view>

          <view class="table_item_2">
            <text>卡号：{{ item.bank_no }}</text>
          </view>

          <view class="table_item_2 flex-y-center-x-between">
            <view>{{ item.create_time }}</view>
            <view :style="{ color: color(item.status) }">{{ item.status_val }}</view>
          </view>

          <view class="table_item_2" v-if="item.remark">
            <text style="color: #dd4343">备注：{{ item.remark }}</text>
          </view>
        </view>
      </z-paging>
    </view>
  </view>

  <u-datetime-picker
    :show="show"
    mode="year-month"
    v-model="value"
    @close="show = false"
    @cancel="(show = false), (time = undefined)"
    @confirm="selectTime"
  />
</template>

<script setup lang="ts">
  import { cashLog } from '@/api';
  import { ref, watch } from 'vue';
  import dayjs from 'dayjs';
  import type { ICashLog } from '@/api/types';
  import { computed } from 'vue';

  const show = ref(false);
  const value = ref(Number(new Date()));
  const time = ref();

  const paging = ref();
  const dataList = ref<ICashLog[]>();
  const queryList = (pageNo: number) => {
    cashLog({ time: time.value, page: pageNo })
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

  watch(time, (newValue) => {
    refresh();
  });

  const selectTime = (e: any) => {
    time.value = dayjs(e.value).format('YYYY-MM');
    value.value = e.value;
    show.value = false;
  };

  const color = (status: number) => {
    // 0失败 1提现中 2成功
    switch (status) {
      case 0:
        return '#DD4343';
      case 1:
        return '#0D6FC9';
      case 2:
        return '#0FA200';

      default:
        return '#6c6c6c';
    }
  };
</script>

<style lang="scss" scoped>
  .page {
    min-height: 100vh;
    background: linear-gradient(0deg, #5980f9, #5b7ffb, #5b7ffb);
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 32rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #e5f5ff;
    line-height: 44rpx;
  }

  .query {
    background: #d2ecff;
    font-size: 26rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000101;
    text-align: center;
    width: 260rpx;
    line-height: 44rpx;
    border-radius: 10rpx;
  }

  .table {
    margin-inline: 25rpx;
    border: 3rpx solid #386bb1;
    background: #d2ecff;
    border-radius: 14rpx;
    margin-top: 18rpx;

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
