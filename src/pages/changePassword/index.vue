<template>
  <view class="changeIndex">
    <nut-form :model-value="info" ref="ruleForm">
      <nut-form-item
        label="原密码"
        required
        prop="oldPassword"
        :rules="[{ required: true, message: '请填写原密码' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.oldPassword"
          placeholder="请输入原密码"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="新密码"
        required
        prop="oldPassword"
        :rules="[{ required: true, message: '请填写新密码' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.oldPassword"
          placeholder="请输入新密码"
          type="text"
        />
      </nut-form-item>
      <nut-cell>
        <nut-button type="primary" @click="submit">提交</nut-button>
      </nut-cell>
    </nut-form>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { reactive, ref } from 'vue';
let user = ref<any>(null);
try {
  const res = Taro.getStorageSync('user');
  user.value = JSON.parse(res);
} catch (e) {
  console.log(e);
}
const ruleForm = ref<any>(null);
const info = reactive({
  oldPassword: '',
  newPassword: '',
});
const submit = async () => {
  if (info.oldPassword !== user.value.password) {
    await Taro.showToast({
      title: '原密码错误',
      icon: 'error',
      duration: 1500,
    });
    return;
  }
};
</script>

<style lang="scss">
.changeIndex {
}
</style>
