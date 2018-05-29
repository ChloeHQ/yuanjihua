<template>
	<div class="article">
		<!-- 小方格样式 -->
		<!-- <list :articleList="articleList" :targets="tech_type">
			<div>
				<ul class="label-list">
					<li v-for="item in tech_type"><span> </span><a>{{ item.text }}</a></li>
				</ul>
			</div>
		</list> -->
		<select-list :targets="tech_type" :params="params" :showFontIcon="showFontIcon">
		</select-list>

		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">

	import SelectList from "base/select-list"

	export default {
		data() {
			return {
				params: {
					type:0, 
					sort:"hot",  //排序
					page:1,   //页码 null则为第一页默认页
					index:false //不是首页
				},
				tech_type: [
					{text:'全部',id:0},
					{text:'经验分享',id:1},
					{text:'入门学习',id:2},
					{text:'成果分享',id:3}
				]
			}
		},
		components: {
			SelectList
		}
	}
</script>

<style lang="stylus" scoped>
	.label-list
		display: flex
		list-style: none
		margin: 10px auto
		li
			padding: 10px
			cursor: pointer
			margin-right: 20px
			span
				display: inline-block
				width: 10px
				height: 10px
				margin-right: 10px
			a:active
				color: red
			&:first-of-type span
				background: #259a25
			&:nth-of-type(2) span
				background: #259d94
			&:nth-of-type(3) span
				background: #26719b
			&:last-of-type span
				background: #9c2698
			
</style>