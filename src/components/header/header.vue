<template>
  <div class="header">
    <div class="view">
      <div class="logo-box">
        <router-link tag="div" class="index" to="/">
          <img class="logo" src="./logo.png" />
          <h2 class="m-title">猿计划</h2>
        </router-link>
      </div>
      <div class="nav">
        <tab></tab>
      </div>
    </div>
  </div>
</template>

<script>
// import { deleteUserInfo } from '../utils/userinfo'
import Tab from 'components/tab/tab'

export default {
  components: {
    Tab
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  position: fixed
  z-index: 999
  border-top: 1px solid #333
  height: 65px
  width: 100%
  background: #fafafa
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.1), 0 1px rgba(0,0,0,.1)
  &:after
    display: block
    clear: both
    content: ""
    height: 0
  .view
    width: 1100px
    margin: 0 auto
    .logo-box
      float: left
      .logo
        float: left
        height: 60px
      .m-title
        float: left
        line-height: 65px
        font-size: 26px
        font-weight: bold
        vertical-align: baseline

      
    
</style>
