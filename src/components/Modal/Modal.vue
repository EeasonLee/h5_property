<template>
  <div class="modal-wrapper" v-if="showModal">
    <div class="modal-background"></div>
    <div class="modal-content" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <image
        src="@/static/cash/tikuan.png"
        style="width: 78rpx; height: 43rpx; display: block; margin-top: 10rpx"
      />

      <image
        @click="closeModal"
        src="@/static/cash/guanbianniu.png"
        style="
          width: 40rpx;
          height: 40rpx;
          display: block;
          position: absolute;
          top: 8rpx;
          right: 12rpx;
        "
      />

      <view style="font-size: 32rpx; color: #000; margin-top: 73rpx; margin-bottom: 119rpx">
        您确定提款
        <text style="color: #f55959">
          {{ money || 0 }}
        </text>
        元吗？
      </view>

      <div class="modal-buttons">
        <u-button
          class="u-reset-button"
          hover-class="none"
          :customStyle="{
            background: 'transparent !important',
            padding: '0 !important',
            border: 'none',
            height: 'auto',
          }"
          @click="confirm"
          :throttleTime="2000"
        >
          <image
            src="@/static/cash/queren.png"
            style="width: 186rpx; height: 66rpx; display: block"
          />
        </u-button>

        <u-button
          class="u-reset-button"
          hover-class="none"
          :customStyle="{
            background: 'transparent !important',
            padding: '0 !important',
            border: 'none',
            height: 'auto',
          }"
          @click="cancel"
        >
          <image
            src="@/static/cash/quxiao.png"
            style="width: 186rpx; height: 66rpx; display: block"
          />
        </u-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue';

  const props = defineProps<{
    showModal: boolean;
    backgroundImage: string;
    money: number;
  }>();

  const { showModal, backgroundImage } = toRefs(props);

  const emit = defineEmits<{
    (event: 'cancel'): void;
    (event: 'closeModal'): void;
    (event: 'confirm'): void;
  }>();

  const cancel = () => {
    emit('cancel');
  };
  const closeModal = () => {
    emit('closeModal');
  };
  const confirm = () => {
    emit('confirm');
  };
</script>

<style lang="scss" scoped>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal-content {
    width: 600rpx;
    height: 380rpx;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .modal-buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .modal-buttons button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
