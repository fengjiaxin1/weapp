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
          <nut-cell
            title="请选择身份"
            :desc="desc"
            @click="
              () => {
                show = true;
              }
            "
          ></nut-cell>
          <nut-picker
            v-model:visible="show"
            :columns="columns"
            title="身份选择"
            @confirm="confirm"
          >
          </nut-picker>
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
import { reactive, ref } from 'vue';
import Bg from '../../assets/img/bg.jpg';
import Taro from '@tarojs/taro';

const info = reactive({
  user: '',
  password: '',
  status: '',
});
const show = ref(false);
const desc = ref('');
const columns = ref([
  { text: '用户', value: 'user' },
  { text: '物业', value: 'property' },
  { text: '临时访客', value: 'temporary' },
]);

const confirm = ({ selectedValue, selectedOptions }) => {
  desc.value = selectedOptions[0].text;
  info.status = selectedOptions[0].value;
};
const visit = () => {
  if (!info.user) {
    Taro.showToast({
      title: '请输入账号',
      icon: 'error',
      duration: 1500,
    });
    return false;
  }
  if (!info.password) {
    Taro.showToast({
      title: '请输入密码',
      icon: 'error',
      duration: 1500,
    });
    return false;
  }
  if (!info.status) {
    Taro.showToast({
      title: '请选择身份',
      icon: 'error',
      duration: 1500,
    });
    return false;
  }
  return true;
};
const loginClick = async () => {
  if (!visit()) {
    return;
  }
  try {
    const res = await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'login',
      // 传递给云函数的event参数
      data: {
        user: info.user,
        password: info.password,
        status: info.status,
      },
    });
    if (res.result === 'success') {
      await Taro.showToast({
        title: res.result,
        icon: 'success',
        duration: 2000,
      });
      await Taro.setStorage({
        key: 'user',
        data: info,
      });
      await Taro.navigateBack({
        url: '../index/index',
      });
    } else {
      await Taro.showToast({
        title: res.result,
        icon: 'error',
        duration: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const registerClick = () => {
  Taro.cloud
    .callFunction({
      // 要调用的云函数名称
      name: 'register',
      // 传递给云函数的event参数
      data: {
        user: info.user,
        password: info.password,
        status: info.status,
      },
    })
    .then((res) => {
      if (res.result === 'success') {
        Taro.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000,
        });
      }
      if (res.result === 'hasRegister') {
        Taro.showToast({
          title: '账号已注册',
          icon: 'error',
          duration: 2000,
        });
      }
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
