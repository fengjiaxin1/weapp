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
            :url="item.url"
          ></Item>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup scoped>
import { reactive, toRefs } from 'vue';
import Item from './item.vue';
import Bg from '../../assets/img/bg.jpg';
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
    url: 'url',
  },
  {
    title: '访客登录',
    icon: '',
    url: 'url',
  },
  {
    title: '疫情信息',
    icon: '',
    url: 'url',
  },
  {
    title: '用户反馈',
    icon: '',
    url: 'url',
  },
  {
    title: '车位管理',
    icon: '',
    url: 'url',
  },
  {
    title: '缴费管理',
    icon: '',
    url: 'url',
  },
  {
    title: '用户申报',
    icon: '',
    url: 'url',
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
