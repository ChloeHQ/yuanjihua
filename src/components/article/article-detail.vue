<template>
	<transition name="slide">
		<div class="article-detail">
			<article class="text">具体文章</article>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import { STATUS,getArticleDetail} from 'api/article'
import {getUserInfo} from 'common/js/userinfo'


export default{
	data() {
		return {
			isColl: false,
			isZan: false,

		}
	},
	computed: {
		...mapGetters([
			'article'
		])
	},
	created() {
		this.userinfo = getUserInfo()
		this._getDetail()
		// console.log(this.article)
	},
	methods: {
		_getDetail() {
			if(!this.article.topic_id){
				this.$router.push('/index')
			}
			let payload = {
				user_id: this.userinfo.user_id,
				topic_id: this.article.topic_id
			}
			getArticleDetail(payload).then(data => {
				console.log(data)
				if(data.status === STATUS){
					this.isColl = data.iscoll
					this.isZan = data.iszan
				}
			})
		}
	}
}
</script>

<style lang="stylus">
.article-detail
	position: fixed
	z-index: 100
	top: 60px
	left: 5%
	right: 5%
	bottom: 0
	background-color:#F1A6A6
	.text
		padding-top: 200px

.slide-enter-active,.slide-leave-active
	transition: all 0.3s
.slide-enter,.slide-leave-to
	transform: translate3d(100%, 0, 0)
</style>