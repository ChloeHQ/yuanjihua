<template>
    <el-form>
      <el-form-item label="头像">
        <span></span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{ form.phoneNumber}}</span>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="form.gender" label="1">男</el-radio>
        <el-radio v-model="form.gender" label="0">女</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import { getUserInfo } from 'common/js/userinfo'
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        nickname: this.userInfo().nickname,
        gender: this.userInfo().gender,
        phoneNumber: this.userInfo().phoneNumber
      }
    }
  },
  methods: {
    async onSubmit () {
      const rawRes = await axios.post('http://yjh.li-shang-bin.com/iweb/Userinfo/update', {
        sex: this.form.gender,
        nick_name: this.form.nickname,
        token: this.$cookie.get('token')
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(rawRes.data)
    },
    userInfo () {
      const data = getUserInfo()
      return {
        nickname: data.nick_name,
        phoneNumber: data.mobile,
        gender: data.sex
      }
    }
  }

}
</script>
