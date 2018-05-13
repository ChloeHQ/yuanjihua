<template>
  <el-container>
    <el-main>
      <el-table :data="postsData">
        <el-table-column prop="topic_id" label="主题" width="300">
        </el-table-column>
        <el-table-column prop="type" label="分类">
        </el-table-column>
        <el-table-column prop="comment_num" label="评论">
        </el-table-column>
        <el-table-column prop="browser_num" label="浏览">
        </el-table-column>
        <el-table-column prop="modify_time" label="发布时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editPost(scope.row)" type="text"><i class="el-icon-edit-outline icon"></i></el-button>
            <el-button @click="delete(scope.row)" type="text"><i class="el-icon-delete icon"></i></el-button>
          </template>
        </el-table-column>
    </el-table>
        <!-- <el-table-column prop="operation" label="操作">
          <span><i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete"></i></span>
        </el-table-column> -->
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getUserInfo } from 'common/js/userinfo'
import {STATUS, getMyPosts } from 'api/userCenter'

export default {
  data () {
    return {
      userinfo: null,
      /*
      comment_num:"0"  //评论数
      browser_num:"0"  //浏览数
      like_num：‘0’  //点赞数
      modify_time:"1524560772"  //发布时间
      title:"5657567aa"
      topic_id:"2"  //文章id
      type:"1"  //技术分类
      */
      postsData: [],
      commentList: [] //总文章条数
    }
  },
  methods: {
    _fetchPostsData() {
      let params = {
        user_id: this.userinfo.user_id,
        page: 1
      }
      getMyPosts(params).then(data => {
        if(data.status === STATUS) {
          this.postsData = data.data
          this.commentList = data.commentList
          console.log(this.postsData)
        }else {
          this.$message({
            message: data.info,
            showClose: true,
            type: 'error'
            })
          }
      })
    }
  },
  created() {
    this.userinfo = getUserInfo()
  },
  mounted () {
    console.log('posts mounted')
    this._fetchPostsData()
  }
}
</script>

<style lang="stylus" scoped>
  .icon
    font-size: 18px
    font-color: red
    font-weight: 500
</style>
