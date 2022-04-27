<template>
  <view class="icon-index" @click="go(path)">
    <view class="icon"> </view>
    <view class="title">{{ title }}</view>
  </view>
</template>

<script setup scoped>
import Taro from '@tarojs/taro';
const scanCode = () => {
  Taro.scanCode({
    onlyFromCamera: true,
    scanType: 'qrCode',
  })
    .then((res) => {
      console.log('res', res.result);
      Taro.navigateTo({
        url: res.result,
        success: (res) => {
          res.eventChannel.emit('statusIcon', { data: 'leave' });
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  path: String,
});
const goPath = (path) => {
  Taro.navigateTo({
    url: path,
  });
};
const go = (path) => {
  switch (path) {
    case 'qrCode':
      console.log('qrCode');
      scanCode();
      break;
    default:
      goPath(path);
      break;
  }
};
</script>

<style lang="scss">
.icon-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  height: 70px;
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: aqua;
  }
  .title {
    margin-top: 5px;
  }
}
</style>
