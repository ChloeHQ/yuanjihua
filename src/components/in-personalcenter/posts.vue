<template>
  <el-container>
    <el-header>我的帖子</el-header>
    <el-main>
      <el-table :data="postsData">
        <el-table-column prop="topic" label="主题" width="400">
        </el-table-column>
        <el-table-column prop="category" label="分类">
        </el-table-column>
        <el-table-column prop="replies" label="回复">
        </el-table-column>
        <el-table-column prop="reads" label="浏览">
        </el-table-column>
        <el-table-column prop="address" label="发布时间">
        </el-table-column>
        <el-table-column prop="operation" label="操作">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import { getUserInfo } from 'common/js/userinfo'

export default {
  data () {
    return {
      postsData: []
    }
  },
  methods: {
    async fetchPostsData () {
      const rawRes = await axios.post('http://yjhapi.agxx.club/iweb/topic/myTopicList', {
        user_id: getUserInfo().user_id,
        page: 1,
        token: this.$cookie.get('token')
      })
      if (rawRes.status === 1) {
        return rawRes.data.list.data
      }
      return []
    }
  },
  mounted () {
    console.log('mounted')
    this.fetchPostsData().then((data) => {
      this.postsData = data
    })
  }
}
</script>
