<template>
  <div>
    <el-card class="box-card">
      <div class="title">
        <h3>注册</h3>
      </div>
      <el-form class="form" ref="form" :rules="registrationRules"
      :model="form" label-width="80px">
        <el-form-item label="电话号码" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号来注册" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="6-16位密码，区分大小写，不能使用空格"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入确认"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="form.verificationCode" placeholder="" class="vcode-input"></el-input>
          <el-button @click="sendVCode" class="vcode-btn" size="mini" type="success" round>发送验证码</el-button>
        </el-form-item>
        <el-form-item label-width="125px">
          <el-button type="primary" class='sub-btn' @click="registration">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { registe,getVcode,STATUS } from 'api/registe.js'
import { Message } from 'element-ui';

export default {
  data () {
    let validatePassword = (rule, value, callback) => {
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
        verificationCode: ''
      },
      vCode: "",
      message_conf: {
        showClose: true,
        message: '',
        type: '',
        duration: 2000,
        center: true
      },
      registrationRules: {
        phoneNumber: [
          { required: true, trigger: 'blur', pattern: /^1[0-9]{10}$/, message: 'Invalid phone number' }
        ],
        password: [
          { required: true, trigger: 'blur', pattern: /^[^\s]{6,16}$/, message: 'Invalid password' }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  methods: {
    // 注册
    registration() {
      const params = {
        mobile: this.form.phoneNumber,
        pwd: this.form.password,
        sms_code: this.form.verificationCode
      }
      registe(params).then((res) => {
        if(this.vCode === this.form.verificationCode){
          if(res.status === 1){
            console.log('success')
            this.message_conf.type='success'
            }else{
              this.message_conf.type='error'
            }
          this.message_conf.message = res.info
        }else{
          this.message_conf.type='error'
          this.message_conf.message = '验证码错误'
        }
        this.message_conf.closed = false
        Message(this.message_conf)
      })
    },
    // 发送验证码，见控制台
    sendVCode () {
      if (/^1[0-9]{10}$/.test(this.form.phoneNumber) === false) {
        return
      }
      let param = {
        mobile: this.form.phoneNumber
      }
      getVcode(param).then((res)=> {
        // console.log('res',res)
        if(res.status === STATUS){
          this.vCode = res.data.code
          console.log(res.info,this.vCode)
          this.message_conf.type = 'success'
        }else{
          this.message_conf.type = 'error'
        }
        this.message_conf.message = res.info
        this.message_conf.closed = false
        Message(this.message_conf)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box-card
    margin-left: 50%
    transform: translateX(-50%)
    width: 360px
    padding: 30px 60px
    background: #fff
    box-shadow: 1px 1px 6px 0 rgba(0,0,0,.2)
    border: 1px solid #ddd
  .title
    text-align: center
    color: #000
    line-height: 36px
    font-size: 16px
    font-weight: 400
    margin-bottom: 20px
    border-bottom: 1px solid rgba(0, 0, 0, 0.5)
  .form
    .vcode-input
      display: inline-block
      width: 140px
    .vcode-btn
      display: inline-block
    .sub-btn
      text-align: center
      margin: 0 auto

</style>
