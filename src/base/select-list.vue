<template>
	<div class="select-list">
		<div  v-if="listCount" class="hot-section">
			<my-list @select="selectArticle" @typeChanged="changeType" class="hot-nav" :articleList="articleList" :targets="targets" :showFontIcon="showFontIcon">

				<slot></slot>
			</my-list>
		</div>
		
		<div v-if="listCount"  class="block">
			<el-pagination class="el-pagination"
				background
  			layout="prev, pager, next"
  			:total="listCount"
  			pager-count="10"
  			:current-page="params.page"
  			@prev-click="clickPrev"
  			@current-change="handleCurrentChange"
  			@next-click="clickNext">
			</el-pagination>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { STATUS,getTopicList } from 'api/article.js'
	import MyList from 'base/list'
	import {mapMutations} from 'vuex'

	export default{
		data(){
			return{
				articleList: [],
				listCount: 0

			}
		},
		props: {
			params: {
					type: Object,
					default: function() {
						return {}
					}
			},
			targets:{
				type: Array,
				default: function() {
					return [];
				}
			},
			showFontIcon: {
				type: Boolean,
				default: function(){
					return true;
				}
			}
		},
		created() {
	    	//请求默认加载资源
	    	this._getIndexList(this.params)
	  	},
	  	watch: {
			page(val, oldVal){
				console.log('newpage: %s, oldpage: %s', val, oldVal)
				this._getIndexList(this.params)
			}
		},
		computed: {
			type(){
				return this.params.type;
			},
			page(){
				return this.params.page;
			}
		},
		methods: {
	  		changeType(index){
	  			this.params.type = index;
	  			if(this.params.page == 1){
	  				this._getIndexList(this.params)
	  			}else{
	  				this.params.page = 1;
	  			}
	  		},
			selectArticle(article) {
				this.$router.push({
					path:`/article/${article.topic_id}`
				})
				this.setArticle(article)
			},
			handleCurrentChange(val) {
				this.params.page = val;
			},
			clickPrev(){
				if(this.params.page >=2 ){
					this.params.page--;
				}
			},
			clickNext(){
				if(this.params.page < this.listCount){
					this.params.page++;
				}
			},
			_getIndexList(params) {
				getTopicList(params).then((ret) => {
					console.log(ret);
					if(ret.status === STATUS){
						// this.articleList = JSON.parse(JSON.stringify(ret));
						this.articleList = ret.data
						this.listCount = parseInt(ret.listCount[0])
					}
				})
			},
			...mapMutations({
				setArticle: 'SET_ARTICLE'
			})
		},
		components: {
			MyList
		}
	}
</script>


<style lang="stylus" scoped>
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
</style>