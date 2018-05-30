<template>
	<div>
		<div v-if="images" class="slider">
		  	<el-carousel ref = "carousel"
		  	:height="carousel.height + 'px'"
		  	:interval="carousel.interval" 
		  	:type="carousel.card">

		  		<el-carousel-item v-for="item in images" :key="item">
					<img class="slide-img" :src="item"/>
		  		</el-carousel-item>
		  	</el-carousel>
		</div>
		<!--
			组件
		-->
		<select-list :targets="targets" :params="params" :showFontIcon="showFontIcon">
			
		</select-list>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script type="text/ecmascript-6">
	import SelectList from "base/select-list"

	export default {
		data() {
			return {
				showFontIcon: true,
				params: {
					type:0, 
					sort:"hot",  //排序
					page:1,   //页码 null则为第一页默认页
					index:true
				},
				targets:[
					{text:'热门文章',id:0},
					{text:'html',id:1},
					{text:'php',id:2},
					{text:'java',id:3}
				],
				carousel:{
					height: '300px',
					interval: 5000,
					type: 'card'
				},
				images: [
					'http://oz572skeg.bkt.clouddn.com/%E7%AE%80%E5%8E%86banne-1.jpg',
					'http://oz572skeg.bkt.clouddn.com/%E6%AF%94%E5%8F%AF%E6%80%9D%E8%AE%AEbanne-2.jpg'
				]
			}
		},
	  	mounted () {
		  this.setSize()
		  window.addEventListener('resize', ()=> {
		    this.setSize()
		  }, false)
		},
		methods: {
			setSize: function () {
				this.carousel.height = 384 / 1039 * this.$refs.carousel.$el.clientWidth
	  		}
		},
		components: {
			SelectList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.slider
	position: relative
	overflow-x: hidden
	.el-carousel__item
		.slide-img
			// position: absolute
			// left: 50%
			// top: 50%
			// transform: translate(-50%, -50%)
			width: 100%
			heigth: 100%
</style>