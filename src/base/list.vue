<template>
	<nav>
		<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="(item,index) in targets" :key="item.id" :label="item.text" :name="item.text">
					<div class="hot_post" v-for="item in newList" :key="item.topic_id">
						<div class="hot_author">
							<span class="user">
								{{item.nick_name}}
							</span>
							<span class="time">
								{{unixTime(item.modify_time)}}
							</span>
						</div>

						<a>
							<div class="hot_title">
								<div class="topic-title" @click="toDetail(item.topic_id)">{{item.title}}</div>
								<div class='comment-wrapper'>
									<div>
										<i class="iconfont">&#xe61d;</i>
										<span class='comment' >{{item.comment_num}}</span>
									</div>
									<div>
										<i class='iconfont'>&#xe717;</i>
										<span class='like'>{{item.like_num}}</span>
									</div>
								</div>
							</div>
					</a>
					</div>
				</el-tab-pane>
			</el-tabs>
		</nav>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				activeName: this.targets[0].text,
				newList: this.articleList
			}
		},
		props: {
			targets:{
				type: Array,
				default: function() {
					return [];
				}
			},
			articleList:{
				type: Array,
				default: function() {
					return [];
				}
			}
		}, 
		computed: {
				listLen() {
					return this.newList.length;
				}
			},
		methods: {
			handleClick(tab, event) {
					let categorie = tab.name;
					let index = 0;
					// console.log(categorie);
					for(let item of this.targets){
						if(item.text === categorie){
							index =item.id
						}
					}
					// console.log(index)
					if(index) {
						this.newList = this.articleList.filter(item => {
							return item.type === index.toString()
						})
					}else{
						this.newList = this.articleList
					}
			},
			unixTime(timestamp) {
				let unixTimestamp = new Date(timestamp * 1000);
				return unixTimestamp.toLocaleString();
			},
			toDetail(item) {
				alert(item);
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-tabs__header
	.el-tabs__nav
		.el-tabs__item
			font-size: 16px
			font-weight: 700
.el-tabs__content
	.hot_post
		padding: 14px 0
		border-bottom: 1px solid #ddd
		.hot_author
			color: #909090
			margin-bottom: 10px
			font-size: 12px
			.time
				margin-left: 15px
				&:before
					content: '·'
				&:after
					content: '·'
		.hot_title
			display: flex
			justify-content: space-between
			margin-top: 15px
			.topic-title
				color: #2e3135
				font-weight: 500
				font-size: 18px
				cursor: pointer
			.comment-wrapper
				.iconfont
					color: red
					font-weight: 500
					font-size: 18px
				.comment,.like
					font-size: 16px
				&>div
					display: inline-block  
</style>