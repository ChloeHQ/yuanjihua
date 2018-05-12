<template>
	<div class="write-wrraper">
		<el-form ref="form" :model="form" label-width="80px">
			<section class="write-top">
				<div class="content">
					<el-form-item class="top-item top-title" label="文章标题">
				   	 	<el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
				  	</el-form-item>
					<el-form-item class="top-item top-cate" label="所属分类">
					    <el-select v-model="type" placeholder="请选择文章分类">
						      <el-option v-for="item in cate" :key="item.id" :label="item.desc" :value="item.id"></el-option>
					    </el-select>
			  	</el-form-item>
			  	<el-form-item class="top-item top-tech" label="技术分类">
					    <el-select v-model="tech_type" placeholder="请选择技术分类">
						      <el-option v-for="item in tech_cate" :key="item.id" :label="item.desc" :value="item.id"></el-option>
					    </el-select>
			  	</el-form-item>
			  </div>
			</section>

			<div class="write-body">
				<mavon-editor class="mavon-md" @change="onEditChange"></mavon-editor>
			</div>

			<div class="publish">
				<el-form-item class="p-button">
			    <el-button type="primary" @click="publish">立即发布</el-button>
  			</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mavonEditor} from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import {STATUS, postArticle} from 'api/article.js'
	import {getUserInfo} from 'common/js/userinfo'

	export default {
		data() {
			return {
				form: {
					title: '',
					cate: null,
					tech_cate: null
				},
				cate: [
					{id: 1, desc: '经验分享'},
					{id: 2, desc: '入门学习'},
					{id: 3, desc: '成果分享'}
				],
				tech_cate: [
					{id: 1, desc: 'html'},
					{id: 2, desc: 'php'},
					{id: 3, desc: 'java'}
				],
				type: 0,
				tech_type: 0,
				md_text: '',
				html_text: '',
				userinfo: null
			}
		},
		created() {
			this.userinfo = getUserInfo()
		},
		methods: {
			onEditChange(value, render) {
				// console.log(value,'\n', render)
				this.md_text = value
				this.html_text = render
			},
			publish() {
				let post_data={
					content: this.html_text,
					md_content: this.md_text,     //  话题内容md
	        user_id: this.userinfo.user_id, //  用户id
	        nickname: this.userinfo.nick_name,  //  昵称,
	        type: this.type, //一级分类 1.经验分享 2.入门学习 3.成果分享,
	        tech_type: this.tech_type,  // 技术分类 1.html 2.php 3.java
	        title: this.title,          //  标题
	        isEdit: false,     //是否为编辑状态
	        topic_id:null
				}
				postArticle(post_data).then(data => {
					console.log(data)
				})
			}
		},
		components: {
			mavonEditor
		}
	}
</script>

<style lang="stylus">
	.write-wrraper
		margin: 0 auto
		.write-top	
			&:after
				display: block
				content: "clear"
				height: 0
				clear: both
				overflow: hidden
				visibility: hidden
			.content
				width: 100%
				.top-item
					box-sizing: border-box
					float: left
					margin-bottom: 40px
					&.top-title
						width: 50%
						padding-right: 40px
					&.top-cate,&.top-tech
						width: 25%
		.write-body
			box-sizing: border-box
			// z-index: -1
			width: 100%
			height: 500px
			.mavon-md
				height: 100%
		.publish
			margin-top: 20px
			width: 100%
			.p-button
				float: right
</style>