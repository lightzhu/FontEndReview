<template>
  <div>
    <p>自定义表单</p>
    <div>
      <span>{{ model.user }}</span>
      <LFormBox :model="model" :rules="rules" ref="loginForm">
        <LFormItem label="用户名" prop="user">
          <LInput v-model="model.user"></LInput>
        </LFormItem>
        <LFormItem label="密码" prop="pwd">
          <LInput type="password" v-model="model.pwd"></LInput>
        </LFormItem>
      </LFormBox>
    </div>
    <button @click="submitForm">提交</button>
  </div>
</template>

<script>
// import LInput from './LInput'
import { LFormBox, LFormItem, LInput } from './index.js'
export default {
  name: 'LForm',
  components: {
    LInput,
    LFormItem,
    LFormBox,
  },
  data() {
    return {
      model: { user: 'pick', pwd: '123' },
      rules: {
        user: [{ required: true, message: '请输入用户名' }],
        pwd: [{ required: true, message: '请输入密码' }],
      },
    }
  },
  methods: {
    ssinput(val) {
      console.log(val)
    },
    submitForm() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          alert('请求登录!')
        } else {
          alert('校验失败！')
        }
      })
    },
  },
}
</script>

<style>
</style>