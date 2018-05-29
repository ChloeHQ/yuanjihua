<template>
  <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-submenu class="submenu" index="1">
      <template slot="title">
        <div class="avatar-box">
          <img class="avatar" :src="avatarsrc"/>
        </div>
      </template>
      <div class="link-box">
        <el-menu-item index="/personalcenter/profile">个人中心</el-menu-item>
        <el-menu-item index="/personalcenter/resetpwd" >修改密码</el-menu-item>
        <el-menu-item index="/personalcenter/posts" >我的帖子</el-menu-item>
        <el-menu-item index="/personalcenter/favorites" >我的收藏</el-menu-item>
        <el-menu-item index="/personalcenter/messages">我的任务</el-menu-item>
        <el-menu-item index="1-4" @click="iclick">退出</el-menu-item>
      </div>
    </el-submenu>
    </el-menu>
</template>

<script>
import { getUserInfo } from 'common/js/userinfo'
  export default {
    data() {
      return {
        avatarsrc: "http://www.ftusix.com/static/data/upload/" + this.userinfo.avatar,
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(keyPath) {
        this.$emit('link-to', keyPath)
      },
      iclick() {
        this.$emit('logout')
      }
    },
    beforeCreate() {
      this.userinfo = getUserInfo()
    }
  }
</script>

<style lang="stylus" rel="stylesheet.stylus">
  .el-menu-demo
    background-color: transparent
    &.el-menu--horizontal
      border: none
    .el-submenu
      .avatar-box
        display: inline-block
        .avatar
          height: 37px
          width: 37px
          border-radius: 50%
          border: 1px solid #ccc
      &.is-active 
        .el-submenu__title
          border-bottom: none
  .el-menu
    &.el-menu--popup
      min-width: 120px
    .link-box
      .el-menu-item
        height: 28px
        line-height: 30px
        font-weight: 500
        &.is-active
          color:#ea0f2d
</style>