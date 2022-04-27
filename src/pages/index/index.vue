<template>
  <view class="index" :style="styleObject">
    <view class="main">
      <view class="main-backdrop">
        <view class="content">
          <Item
            v-for="item in map"
            :key="item.title"
            :title="item.title"
            :icon="item.icon"
            :path="item.path"
          ></Item>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { reactive, toRefs } from 'vue';
import Item from './item.vue';
import Bg from '../../assets/img/bg.jpg';
try {
  const res = Taro.getStorageSync('user');
  if (!res) {
    Taro.navigateTo({
      url: '../login/index',
    });
  }
} catch (e) {
  console.log(e);
}
const styleObject = reactive({
  height: '100vh',
  width: '100vw',
  position: 'absolute',
  background: `url(${Bg})`,
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});
const map = [
  {
    title: '账号管理',
    icon: '',
    path: '../changePassword/index',
  },
  {
    title: '访客登记',
    icon: '',
    path: 'qrCode',
  },
  {
    title: '访客离开',
    icon: '',
    path: 'qrCode',
  },
  {
    title: '疫情信息',
    icon: '',
    path: 'path',
  },
  {
    title: '用户反馈',
    icon: '',
    path: 'path',
  },
  {
    title: '车位管理',
    icon: '',
    path: 'path',
  },
  {
    title: '缴费管理',
    icon: '',
    path: 'path',
  },
  {
    title: '用户申报',
    icon: '',
    path: 'path',
  },
];
</script>

<style lang="scss">
.index {
  .main {
    width: 100vw;
    height: 100vh;
    .main-backdrop {
      width: 100%;
      height: 100%;
      box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(5px);
      .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
