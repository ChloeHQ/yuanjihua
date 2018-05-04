<template>
  <el-row class="tac">
    <el-col :span="6">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo">
        <el-menu-item index="/personalcenter/profile">我的信息</el-menu-item>
        <el-menu-item index="/personalcenter/resetpwd">修改密码</el-menu-item>
        <el-menu-item index="/personalcenter/posts">我的帖子</el-menu-item>
        <el-menu-item index="/personalcenter/favorites">我的收藏</el-menu-item>
        <el-menu-item index="/personalcenter/messages">我的消息</el-menu-item>
        <el-menu-item index="/personalcenter/tasks">我的任务</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <!-- <router-view></router-view> -->
    </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>
