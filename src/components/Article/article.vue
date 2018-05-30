<template>
	<div class="article">
		<select-list :targets="tech_type" :params="params" :showFontIcon="showFontIcon" :showSortTab="showSortTab">
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
				],
				showFontIcon: false,
				showSortTab: true
			}
		},
		components: {
			SelectList
		}
	}
</script>

<style lang="stylus" scoped>

</style>