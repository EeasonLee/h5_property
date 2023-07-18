<template>
  <view class="page">
    <u-navbar :autoBack="true" bgColor="#5980f9" leftIconColor="#fff" placeholder>
      <template #center>
        <image
          src="@/static/title/我的下线.png"
          style="width: 149rpx; height: 43rpx; display: block"
        />
      </template>
    </u-navbar>

    <view class="flex-y-center" style="margin-top: 44rpx; margin-inline: 30rpx">
      <view class="title">查询：</view>
      <view class="query" @click="show = true"> {{ currentLevel.label }} </view>
    </view>

    <view class="table">
      <view
        class="table_item"
        v-for="(item, index) in 5"
        :key="index"
        :style="{ border: index === 4 ? 'none' : '' }"
      >
        <view class="flex-y-center-x-between table_item_1">
          <view>下线昵称：土豆</view>
          <view>20</view>
        </view>

        <view class="table_item_2">
          <text>会员等级：无</text>
          <text>税收：100</text>
          <text>分成比例：20%</text>
        </view>

        <view class="table_item_2">
          <text>2023-10-22 23:25:56</text>
        </view>
      </view>
    </view>
  </view>

  <u-picker
    :show="show"
    :columns="columns"
    keyName="label"
    closeOnClickOverlay
    @close="show = false"
    @cancel="show = false"
    @confirm="selectLevel"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const show = ref(false);
  const currentLevel = ref({ label: '雪月夜', id: 2021 });
  const columns = [
    [
      {
        label: '雪月夜',
        id: 2021,
      },
      {
        label: '冷夜雨',
        id: 804,
      },
    ],
  ];

  const selectLevel = (e: any) => {
    console.log(e.value[0]);
    currentLevel.value = e.value[0];
    show.value = false;
  };
</script>

<style lang="scss" scoped>
  .page {
    min-height: 100vh;
    padding-bottom: 25rpx;
    background: linear-gradient(0deg, #5980f9, #5b7ffb, #5b7ffb);
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
