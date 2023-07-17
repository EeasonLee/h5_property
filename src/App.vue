<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  onLaunch(() => {
    console.log('App Launch');
  });
  onShow(() => {
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
</script>

<style lang="scss">
  @import 'uview-plus/index.scss';

  // 布局
  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }
  // 水平排列
  .flex-y-center-x-between {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .flex-y-center-x-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .flex-y-center {
    display: flex;
    align-items: center;
  }
  .flex-y-baseline {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }
  // 垂直排列
  .flex-column-y-center-x-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .flex-column-y-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // 布局

  // 外边距
  @for $i from 1 through 30 {
    .margin-l-#{$i} {
      margin-left: $i + rpx;
    }

    .margin-r-#{$i} {
      margin-right: $i + rpx;
    }

    .margin-t-#{$i} {
      margin-top: $i + rpx;
    }

    .margin-b-#{$i} {
      margin-bottom: $i + rpx;
    }

    $i: $i + 1;
  }
</style>
