<template>
	<div>
		<div v-if="images" class="slider">
		  	<el-carousel 
		  	:height="carousel.height" 
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
		<div  v-if="listCount" class="hot-section">
			<my-list class="hot-nav" :articleList="articleList" :targets="targets">
			</my-list>
		</div>
		
		<div class="block">
			<el-pagination  class="el-pagination"
				background
  			layout="prev, pager, next">
			</el-pagination>
		</div>

		
	</div>
</template>

<script type="text/ecmascript-6">
	import { STATUS,getTopicList } from 'api/article.js'
	import List from 'base/list1'
	import MyList from 'base/list'

	export default {
		data() {
			return {
				// data: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
				// info:"查询成功"
				// listCount:["44"]
				articleList: [],
				listCount: 0,
				loaded: false,
				// activeName: '热门文章',
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
					// 'http://oz572skeg.bkt.clouddn.com/%E7%AE%80%E5%8E%86banne-1.jpg',
					'http://oz572skeg.bkt.clouddn.com/%E6%AF%94%E5%8F%AF%E6%80%9D%E8%AE%AEbanne-2.jpg'
				]
			}
		},
		created() {
	    	//请求默认加载资源
	    	this._getIndexList()
	  	},
		methods: {
			_getIndexList() {
				let params = {
					type:0, 
					sort:"hot",  //排序
					page:null,   //页码 null则为第一页默认页
					index:true
					}
				getTopicList(params).then((ret) => {
					if(ret.status === STATUS){
						// this.articleList = JSON.parse(JSON.stringify(ret));
						this.articleList = ret.data;
						this.listCount = ret.listCount[0];
						console.log(ret);
					}
				})
			}
		},
		components: {
			List,
			MyList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.slider
	position: relative
	overflow-x: hidden
	.slide-img
		width: 100%
		heigth: 100%
.hot-section
	.hot-nav
		padding: 20px 0
		overflow: hidden
		.el-tab-pane
			.el-tabs__item
				&.is-active
					color: red
	.hot-post
		padding: 14px 0;
		border-bottom: 1px solid #ddd
.block
	.el-pagination
		text-align: center
.el-loading-mask
	display: none
</style>