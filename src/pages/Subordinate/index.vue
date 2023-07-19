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
      <view class="query" @click="show = true"> {{ gradeList[currentGradeListIndex].name }} </view>
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
            <view style="font-weight: 400">{{ item.nickname }}</view>
            <view>{{ item.total }}</view>
          </view>

          <view class="table_item_2">
            <text>{{ item.create_time }}</text>
          </view>
        </view>
      </z-paging>
    </view>
  </view>

  <u-picker
    :show="show"
    :columns="[gradeList]"
    keyName="name"
    closeOnClickOverlay
    @close="show = false"
    @cancel="show = false"
    @confirm="selectLevel"
    :defaultIndex="[currentGradeListIndex]"
  />
</template>

<script setup lang="ts">
  import { fromUserList, getGradeList } from '@/api';
  import type { IFromUserList, IGetGradeList } from '@/api/types';
  import { ref, watch } from 'vue';

  const show = ref(false);
  const currentGradeListIndex = ref(0);
  const gradeList = ref<IGetGradeList[]>([{ id: undefined, name: '全部' }] as IGetGradeList[]);

  getGradeList().then((res) => {
    gradeList.value.push(...res.data);
  });

  const paging = ref();
  const dataList = ref<IFromUserList[]>();
  const queryList = (pageNo: number) => {
    fromUserList({ grade_id: gradeList.value[currentGradeListIndex.value].id, page: pageNo })
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

  watch(currentGradeListIndex, (newValue) => {
    refresh();
  });

  const selectLevel = (e: any) => {
    currentGradeListIndex.value = e.indexs[0];
    show.value = false;
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
