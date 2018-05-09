<template>
  <div class="content-wrapper">
    <div class="tags">
      <el-tabs type="border-card">
        <el-tab-pane v-for="item in targetsTech" :key="item.id" :label="item.text">
          <!-- 点击后显示文章内容 -->
          <div v-if="listLen" class="list-wrapper">
            <ul>
              <li v-for="item in list" :key="item.topic_id">
                <div class="user-wrapper">
                  <span class="user">
                    {{item.nick_name}}
                  </span>
                  <span class="time">
                    {{unixTime(item.modify_time)}}
                  </span>
                </div>
                <div class="topic-wrapper">
                  <div class="topic-title" @click="toDetail(item.topic_id)">{{item.title}}</div>
                  <div class='comment-wrapper'>
                    <div>
                      <span class='el-icon-success'></span>
                      <span class='comment' >{{item.comment_num}}</span>
                    </div>
                    <div>
                      <span class='el-icon-tickets'></span>
                      <span class='like'>{{item.like_num}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="no-list">
            <span>没有更多的数据</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    targetsTech: {
      type: Array,
      default: function() {
        return [];
      }
    },
    list: {
      type: Array,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    listLen() {
      return this.list.length;
    }
  },
  methods: {
    unixTime(timestamp) {
      let unixTimestamp = new Date(timestamp * 1000);
      return unixTimestamp.toLocaleString();
    },
    toDetail(item) {
      alert(item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.content-wrapper {
  margin-bottom: 50px;
  .tags {
    .list-wrapper {
      li {
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
        .user-wrapper {
          font-size: 12px;
          color: #909090;
          .time {
            margin-left: 15px;
            &:before {
              content: '·';
            }
            &:after {
              content: '·';
            }
          }
        }
        .topic-wrapper {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          .topic-title {
            cursor: pointer;
          }
          .comment-wrapper {
            &>div {
              display: inline-block;
            }     
          }
        }
      }
    }
    .no-list {
      text-align: center;
    }
  }
}
</style>