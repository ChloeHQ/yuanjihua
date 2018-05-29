<template>
  <div>
    <el-card class="box-card">
      <div class="title">
        <h3>欢迎回到猿计划</h3>
      </div>
      <el-form class="form" ref="form" :rules="loginRules" :model="form" >
        <el-form-item label="" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入登录手机号" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="form.password" placeholder="6-16位密码，区分大小写，不能使用空格" ></el-input>
        </el-form-item>
        <el-form-item class="check">
          <el-checkbox class="check-box" v-model="form.checked">下次自动登录</el-checkbox>
          <router-link class="regist" to="/register"><span>立即注册</span></router-link>
        </el-form-item>
        <el-form-item class='sub-btn'>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import { setUserInfo } from 'common/js/userinfo'
import { STATUS,logIn } from 'api/login.js'
import { Message } from 'element-ui'

export default {
  data () {
    return {
      form: {
        phoneNumber: '',
        password: '',
        checked: false
      },
      loginRules: {
        phoneNumber: [{ required: true, trigger: 'blur', pattern: /^1[0-9]{10}$/, message: 'Invalid phone number' }],
        password: [{ required: true, trigger: 'blur', pattern: /^[^\s]{6,16}$/, message: 'Invalid password' }]
      }
    }
  },
  methods: {
    submit() {
      let params = {
        'mobile': this.form.phoneNumber,
        'pwd': this.form.password
      }
      logIn(params).then((result) => {
        console.log(result)

        if(result.status === STATUS){
          let data = result.data[0]
          /*data数据内容
            avatar:"DC8B19B5BD6447A56146B8BB09E85BCC.jpg"
            length: 8
            mobile:"18271907823"
            nick_name:"默认"
            pwd:"123456"
            reg_time:"1525345388"
            sex:"1"
            token:"6D0D287F3049901222103C6FD1DB0D0F"
            user_id:"30"
          */
          this.$cookie.set('token', data.token, 30) 
          setUserInfo(data)
          this.$bus.$emit('userLogin', 'ok')
          this.$router.push('/')
        }

        Message({
          showClose: true,
          message: result.info,
          type: result.status === STATUS ? 'success' : 'error',
          duration: 2000,
          center: true
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box-card
    // position: absolute
    top: 100px
    // left: 50%
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
    margin-bottom: 20px
    line-height: 36px
    font-size: 16px
    font-weight: 400
    border-bottom: 1px solid rgba(0, 0, 0, 0.5)
  .form
    .check
      .check-box
        display: inline-block
        float: left
      .regist
        float: right
        color: #ea0f2d
    .sub-btn
      text-align: center
      margin: 0 auto

</style>
