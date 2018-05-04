<template>
  <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-submenu class="submenu" index="1">
      <template slot="title">
        <div class="avatar-box">
          <img class="avatar" src="./data@3x.png"/>
        </div>
      </template>
      <el-menu-item index="1-1">个人中心</el-menu-item>
      <el-menu-item index="1-2">修改密码</el-menu-item>
      <el-menu-item index="1-3">我的帖子</el-menu-item>
      <el-menu-item index="1-3">我的收藏</el-menu-item>
      <el-menu-item index="1-3">我的任务</el-menu-item>
      <el-menu-item index="1-4" @click="iclick">退出</el-menu-item>
    </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      iclick() {
        this.$emit('logout')
      }
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
      .el-menu-item
        height: 28px;
        line-height: 30px;
      &.is-active 
        .el-submenu__title
          border-bottom: none
      
</style>