<template>
  <el-container>
    <el-main>
      <el-table :data="favoritesData">
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
import { STATUS, getMyCollection } from 'api/userCenter'
import { getUserInfo } from 'common/js/userinfo'

export default {
  data () {
    return {
      userinfo: null,
      page: 1,
      favoritesData: []
    }
  },
  methods: {
    _fetchFavoritesData () {
      let params = {
        page: this.page,
        user_id: this.userinfo.user_id
      }
      getMyCollection(params).then(data => {
        console.log(data)
        if(data.status === STATUS){
          this.favoritesData = data.data
          // console.log(this.favoritesData)
        }else{
          // console.log(data)
        }
      })
      // const rawRes = await axios.post('http://yjh.li-shang-bin.com/iweb/collect/myCollect', {
      //   page: 1,
      //   user_id: getUserInfo().user_id,
      //   token: this.$cookie.get('token')
      // }, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      // if (rawRes.status === 1) {
      //   return rawRes.data.list.data
      // }
      // return []
    }
  },
  created() {
    this.userinfo = getUserInfo()
  },
  mounted () {
    console.log('favorites mounted')
    this._fetchFavoritesData()
  }
}
</script>
