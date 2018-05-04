<template>
	<div class="tab">
		<router-link tag="div" class="tag-item" to="/message">
			<span class="tab-link">未读消息</span>
		</router-link>
		<router-link tag="div" class="tag-item" to="/index" exact>
			<span class="tab-link">首页</span>
		</router-link>
		<router-link tag="div" class="tag-item" to="/knowledge">
			<span class="tab-link">知识体系</span>
		</router-link>
		<router-link tag="div" class="tag-item" to="/activity">
			<span class="tab-link">活动中心</span>
		</router-link>
		<router-link tag="div" class="tag-item" to="/article">
			<span class="tab-link">文章</span>
		</router-link>
		<router-link tag="div" v-if="hasLogged" class="tag-item" to="/write">
			<span class="tab-link">写文章</span>
		</router-link>
		<router-link tag="div" v-else class="tag-item" to="/login">
			<span class="tab-link">登录</span>
		</router-link>
		
		<div class="tag-icon" v-if="hasLogged">
			<!-- <div class="avatar"> -->
				<my-center @logout="logOut()"></my-center>
      <!-- </div> -->
		</div>
	<!-- 	<router-link tag="div" v-if="hasLogged" @click="logOut()" class="tag-item">
			<span class="tab-link">退出</span>
		</router-link> -->
		<router-link tag="div" v-else class="tag-item" to="/register">
			<span class="tab-link">注册</span>
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
	import { deleteUserInfo } from 'common/js/userinfo.js'
	import MyCenter from 'components/tab/my-center'

	export default {
		data() {
			return {
				hasLogged: this._checkToken()
			}
		},
		created() {
			this.$bus.$on('userLogin', (eventData) => {
				this._handleLoginEvent(eventData)
			})
		},
		beforeDestroy () {
   	 this.$bus.$off('userLogin', this._handleLoginEvent)
  	},
		methods: {
			logOut () {
	      this.$cookie.delete('token')
	      deleteUserInfo()
	      this._handleLoginEvent()
	      this.$router.push('/')
	    },
			_handleLoginEvent(eventData) {
				this.hasLogged = this._checkToken()	
			},
			_checkToken(){
				const token = this.$cookie.get('token')
      	return token ? true: false
			}
		},
		components: {
			MyCenter
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.tab
	display: flex
	float: right
	height: 60px
	line-height: 60px
	.tag-item
		float: left
		flex: 1
		padding: 0 5px!important
		margin-right: 30px!important
		&.router-link-active
			.tab-link
				color: #ea0f2d
		.tab-link
			white-space: nowrap
			color: #48576a
		&:hover
			border-bottom: 2px solid #ea0f2d
	.tag-icon
		float: left
		flex: 1
		padding: 0 5px!important
		margin-right: 30px!important	
		// .avatar
		// 	display: inline-block
		// 	height: 37px
		// 	width: 37px
		// 	border-radius: 50%
		// 	border: 1px solid #ccc
		// 	background-image: url('./data@3x.png')
		
		
				
</style>