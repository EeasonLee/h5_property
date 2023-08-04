<template>
  <view class="page">
    <u-navbar :autoBack="true" bgColor="#5980f9" leftIconColor="#fff" placeholder>
      <template #center>
        <image
          src="@/static/upgrade/huiyuanshengji.png"
          style="width: 150rpx; height: 42rpx; display: block"
        />
      </template>
    </u-navbar>

    <view class="title" style="margin-top: 44rpx">当前会员等级：{{ data?.grade }}</view>

    <view class="tableBox">
      <table class="table">
        <tr>
          <td>等级名称</td>
          <td>充值金额</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item, index) in data?.list" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <view class="flex-y-center-x-center">
              <!-- <image
                v-if="index < 3"
                src="@/static/upgrade/quchongzhi.png"
                style="width: 156rpx; height: 52rpx; display: block"
              /> -->
              <image
                v-if="index >= 3"
                src="@/static/upgrade/shangwu.png"
                style="width: 156rpx; height: 52rpx; display: block"
              />
            </view>
          </td>
        </tr>
      </table>
    </view>

    <view class="title" style="margin-top: 44rpx">会员权益的图片说明</view>

    <image
      src="@/static/upgrade/haibao.png"
      mode="widthFix"
      style="width: 700rpx; display: block; margin-inline: 25rpx; margin-top: 14rpx"
    />
  </view>
</template>

<script setup lang="ts">
  import { gradeList } from '@/api';
  import type { IGradeList } from '@/api/types';
  import { ref } from 'vue';

  const data = ref<IGradeList>();
  gradeList().then((res) => {
    data.value = res.data;
  });
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
    margin-inline: 30rpx;
  }

  .tableBox {
    margin: 18rpx 23rpx 38rpx;
    border-radius: 20rpx;
    border: 2px solid #386bb1;

    .table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      background: #d2ecff;
      border-radius: 20rpx;

      td {
        border: 1rpx solid #94aec2;
        height: 82rpx;
        font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }

      tr:first-child td {
        border-top: 0;
        font-size: 30rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
      }

      tr:last-child td {
        border-bottom: 0;
      }

      tr td:first-child {
        border-left: 0;
        width: calc(156rpx + 44rpx);
      }

      tr td:last-child {
        border-right: 0;
        width: calc(156rpx + 44rpx);
      }
    }
  }
</style>
