<template>
  <view class="login-index" :style="styleObject">
    <view class="login-main">
      <view class="main-bg">
        <view>
          <nut-input
            v-model="info.user"
            placeholder="请输入账号"
            label="账号"
          ></nut-input>
          <nut-input
            v-model="info.password"
            placeholder="请输入密码"
            label="密码"
          ></nut-input>
          <view class="btn">
            <nut-button type="primary" @click="loginClick()">登录</nut-button>
            <nut-button type="primary" @click="registerClick()"
              >注册</nut-button
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import Bg from '../../assets/img/bg.jpg';
import Taro from '@tarojs/taro';
const info = reactive({
  user: '',
  password: '',
  status: '',
});
const status = ['user', 'property'];
// TODO:1.加登录校验 2.加status
const loginClick = () => {
  Taro.cloud
    .callFunction({
      // 要调用的云函数名称
      name: 'login',
      // 传递给云函数的event参数
      data: {
        user: '123456',
        password: '123456',
        status: status[0],
      },
    })
    .then((res) => {
      console.log('res', res);
      Taro.showToast({
        title: res.result,
        icon: res.result !== 'success' ? 'error' : 'success',
        duration: 2000,
      });
      if (res.result === 'success') {
        Taro.navigateTo({
          url: '../index/index',
        });
      }
    });
};
const registerClick = () => {
  Taro.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000,
  });
};

const styleObject = reactive({
  height: '100vh',
  width: '100vw',
  position: 'absolute',
  background: `url(${Bg})`,
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
  zIndex: -1,
});
</script>

<style lang="scss">
.nut-input {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
}
.login-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-bg {
    width: 200px;
    height: 250px;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    overflow: hidden;
    .btn {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
