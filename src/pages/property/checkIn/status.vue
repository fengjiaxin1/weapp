<template>
  <view class="status">
    <view class="status-icon" v-if="status === 'loading'">
      <nut-icon class="icon" name="loading" size="60"></nut-icon>
      <view class="status-text">等待中</view>
    </view>
    <view class="status-icon" v-if="status === 'success'">
      <nut-icon name="Check" size="60" color="#64b578"></nut-icon>
      <view class="status-text">登记成功</view>
    </view>
    <view class="status-icon" v-if="status === 'repeat'">
      <nut-icon name="failure" size="60" color="#FFB90F"></nut-icon>
      <view class="status-text">请勿重复登记</view>
    </view>
    <view class="status-icon" v-if="status === 'leave'">
      <nut-icon name="Check" size="60" color="#64b578"></nut-icon>
      <view class="status-text">离开成功</view>
    </view>
    <view class="status-icon" v-if="status === 'noCheck'">
      <nut-icon name="Check" size="60" color="#64b578"></nut-icon>
      <view class="status-text">请先登记</view>
    </view>
  </view>
</template>

<script setup>
// 扫离开码提示请先登记 noCheck
// 离开成功 leave

import Taro from '@tarojs/taro';
import { ref, onMounted } from 'vue';

const pages = getCurrentPages();
const current = pages[pages.length - 1];
const eventChannel = current.getOpenerEventChannel();
const status = ref('loading');
const event = () => {
  eventChannel.on('statusIcon', (res) => {
    status.value = res.data;
  });
};
onMounted(() => {
  event();
});
</script>

<style lang="scss">
.status {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  .icon {
    text-align: center;
  }
  .status-text {
    padding-top: 20px;
    font-size: 20px;
  }
}
</style>
