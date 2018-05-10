<template>
	<div>
		this is article page!
		<!-- <list :articleList="articleList" :targets="tech_type">
			<slot></slot> //利用插槽，将最热|最新放到组件里
		</list> -->
	</div>
</template>

<script type="text/ecmascript-6">
	import List from 'base/list'
	import {STATUS,getTopicList} from 'api/article'

	export default {
		data() {
			return {
				articleList: [],
				tech_type: []
			}
		},
		components: {
			List
		}
	}
</script>

<style lang="stylus"></style>