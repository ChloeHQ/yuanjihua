<template>
  <el-row  class="tac">
    <el-col :span="4">
      <el-menu
        router
        :default-active="activeIndex"
        class="el-menu-vertical-demo">
        <el-menu-item index="/personalcenter/profile">我的信息</el-menu-item>
        <el-menu-item index="/personalcenter/resetpwd">修改密码</el-menu-item>
        <el-menu-item index="/personalcenter/posts">我的帖子</el-menu-item>
        <el-menu-item index="/personalcenter/favorites">我的收藏</el-menu-item>
        <el-menu-item index="/personalcenter/messages">我的消息</el-menu-item>
        <el-menu-item index="/personalcenter/tasks">我的任务</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :offset="1" :span="19">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import { getUserInfo } from 'common/js/userinfo'

export default {
  data(){
    return {
      activeIndex:'/personalcenter/profile'
    }
  },
  created() {
    this.$bus.$on('centerPageTo', (eventData) => {
      this.activeIndex = eventData
    }),
    console.log(this.$route)
  }

}
</script>

<style lang="stylus">
</style>
