<template>
  <div id="app">
    <section class="view">
      <s-header></s-header>
    </section>
    <div class="replaceHeader"></div>
    <section  class="content">
      <keep-alive>
		    <router-view class="view"></router-view>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import SHeader from '@/components/header/header'
import 'common/style/media.styl'
import 'common/style/reset.styl'
import 'common/style/icon-fonts.styl'

export default {
  name: 'App',
  components: { 
    SHeader 
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .replaceHeader
      width: 100%;
      height: 64px;
      background-color: #fff;
  .content
    .view
      position: static  
      padding-bottom: 100px
      margin: 0 auto
      margin-top: 40px   
    
</style>

