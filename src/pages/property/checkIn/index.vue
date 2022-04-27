<template>
  <view class="index">
    <nut-form :model-value="info" ref="ruleForm">
      <nut-form-item
        label="姓名"
        required
        prop="name"
        :rules="[{ required: true, message: '请填写姓名' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.name"
          placeholder="请输入姓名"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="身份证号"
        required
        prop="idCard"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.idCard"
          placeholder="请输入身份证号"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="联系电话"
        required
        prop="telNumber"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.telNumber"
          placeholder="请输入联系电话"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="登记时间"
        required
        prop="time"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      >
        <nut-cell :desc="desc" @click="show = true"></nut-cell>
        <nut-datepicker
          v-model="currentDate"
          v-model:visible="show"
          :is-show-chinese="true"
          @confirm="confirm"
        ></nut-datepicker>
      </nut-form-item>
      <nut-form-item
        label="受访人姓名"
        required
        prop="visitName"
        :rules="[{ required: true, message: '请填写受访人姓名' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.visitName"
          placeholder="请输入受访人姓名"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="受访人电话"
        required
        prop="visitTelNumber"
        :rules="[{ required: true, message: '请填写受访人电话' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.visitTelNumber"
          placeholder="请输入受访人电话"
          type="text"
        />
      </nut-form-item>
      <nut-form-item
        label="受访人住址"
        required
        prop="visitAddress"
        :rules="[{ required: true, message: '请填写受访人住址' }]"
      >
        <input
          class="nut-input-text"
          v-model="info.visitAddress"
          placeholder="请输入受访人住址"
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
const show = ref(false);
const desc = ref('2022年05月10日');
const ruleForm = ref<any>(null);
const currentDate = new Date(2022, 4, 10, 10, 10);
const confirm = ({ selectedValue, selectedOptions }) => {
  desc.value = selectedOptions.map((option) => option.text).join('');
};
const info = reactive({
  name: '',
  idCard: '',
  telNumber: '',
  time: desc.value,
  visitName: '',
  visitTelNumber: '',
  visitAddress: '',
  status: true,
});
const submit = async () => {
  console.log(ruleForm);
  const rule = await ruleForm.value.validate();
  console.log(rule);
  if (!rule.valid) {
    rule.errors.forEach((item) => {
      Taro.showToast({
        title: item.message,
        icon: 'error',
        duration: 2000,
      });
    });
    return;
  }
  Taro.cloud
    .callFunction({
      // 要调用的云函数名称
      name: 'temporaryRegister',
      // 传递给云函数的event参数
      data: {
        ...info,
      },
    })
    .then((r) => {
      Taro.navigateTo({
        url: '../../property/checkIn/status',
        success: (res) => {
          res.eventChannel.emit('statusIcon', { data: r.result });
        },
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>

<style lang="scss" scoped></style>
