<template>
    <el-form :model="form" size="medium" label-width="80px">
      <el-form-item label="头像">
        <span class="avatar">
          <!-- <img class="photo" :src="form.photosrc"/> -->
          <el-upload class='upload' 
            action='http://www.ftusix.com/static/data/upload.php' 
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{id: userinfo.user_id}">
            <img v-if="form.photosrc" class="photo" :src="form.photosrc">
            <span class="reset-text">更换头像</span>
          </el-upload>

        </span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{ form.phoneNumber}}</span>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"  style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" label="1">男</el-radio>
        <el-radio v-model="form.gender" label="0">女</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
      
      <myimgcut 
      :prewidth="canvas.width"
      :uploadurl = "canvas.uploadUrl"
      >  
      </myimgcut>
    </el-form>
</template>

<script>
import { getUserInfo,setUserInfo} from 'common/js/userinfo'
import { URL,STATUS,updateProfile} from 'api/userCenter'
import myimgcut from 'base/image-cut/avatar-cut'

export default {
  data () {
    return {
      canvas: {
        width: 600,
        uploadUrl: 'http://www.ftusix.com/static/data/upload.php'
      },
      form: {
        nickname: this.userinfo.nick_name,
        gender: this.userinfo.sex,
        phoneNumber: this.userinfo.mobile,
        photosrc: URL + "upload/" + this.userinfo.avatar
      },
      token: this.userinfo.token
      // imgCropperData: {
      //   accept: 'image/gif, image/jpeg, img/png',
      //   imgSrc: ''
      // }
    }
  },
  methods: {
    onSubmit () {
      let params = {
        sex: this.form.gender,
        nick_name : this.form.nickname,
        token: this.token
      }
      updateProfile(params).then(data => {
        let type = 'error'
        if(data.status === STATUS){
          this.form = Object.assign({}, this.form, data.data)
          console.log(data.data)
          setUserInfo(data.data)
          type = 'success'
          }
        this.$message({
          message: data.info,
          showClose: true,
          type: type
          })
        })
    },
    beforeAvatarUpload() {
      alert('hhhhh')
      // https://lelesbox.github.io/demo/cropper.html
      // http://xyxiao.cn/vue-cropper/example/
      // https://github.com/xyxiao001/vue-cropper
    },
    handleAvatarSuccess(res) {
      // console.log(res)
      let type = 'error'
      if(res.status === STATUS) {
        setUserInfo({avatar: res.data})
        this.form.photosrc = URL + "upload/" + res.data
        type = 'success'
      }
      this.$message({
        message: res.info,
        showClose: true,
        type: type
      })
    }
  },
  beforeCreate() {
    this.userinfo = getUserInfo()
    console.log(this.userinfo)
  },
  components: {
    myimgcut
  }

}
</script>

<style lang="stylus">
.avatar
  .upload
    .photo
      width: 62px
      height: 62px
      border: #d9d9d9 dashed 1px
      border-radius: 50%
    .reset-text
      font-size: 12px
      vertical-align: bottom
</style>