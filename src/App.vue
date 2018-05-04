<template>
  <div id="app">
    <s-header></s-header>
    <div class="content">
  		<router-view></router-view>
  	</div>
  </div>
</template>

<script>
import SHeader from '@/components/header/header'
export default {
  name: 'App',
  components: { 
    SHeader 
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content
	position: relative
	width: 1100px
	top: 80px
	margin: 0 auto
</style>

