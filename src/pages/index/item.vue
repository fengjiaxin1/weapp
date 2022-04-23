<template>
  <view class="icon-index" @click="go(url)">
    <view class="icon"> </view>
    <view class="title">{{ title }}</view>
  </view>
</template>

<script setup scoped>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'hahaha',
  },
  url: String,
});
const go = (url) => {
  console.log('url', url);
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
