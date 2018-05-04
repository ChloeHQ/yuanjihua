<template>
  <el-form
    :rules="resetPwdRules"
    :model="form"
    >
    <el-form-item label="手机号">
      <span>{{ form.phoneNumber}}</span>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" v-model="form.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item label="验证码">
      <el-input v-model="form.verificationCode"></el-input>
      <el-button @click="sendCode">发送验证码</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        phoneNumber: '',
        password: '',
        confirmPasswrod: '',
        verificationCode: ''
      },
      resetPwdRules: {
        password: [{ required: true, trigger: 'blur', pattern: /^[^\s]{6,16}$/, message: 'Invalid password' }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  methods: {
    async onSubmit () {
      const rawRes = await axios.post('http://yjhapi.agxx.club/iweb/Forgetpwd/reset', {
        mobile: this.form.phoneNumber,
        pwd: this.form.password,
        pwd2: this.form.confirmPasswrod,
        sms_code: this.form.verificationCode
      })
      console.log(rawRes.data)
      console.log('success')
    },
    sendCode () {
      console.log('Verification code sent.')
    }
  }
}
</script>
