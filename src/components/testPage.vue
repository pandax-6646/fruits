<template>
  <div class="test-page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="loadMore"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <div>{{ item.masterName }}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getHomeData } from "@/api";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
    };
  },

  created() {
    this.loadMore();
  },
  methods: {
    loadMore() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      getHomeData
        .getListPage({ pageNum: this.pageNum })
        .then((res) => {
          this.list = this.list.concat(res.list);
          console.log(res.list, this.pageNum);
          // 加载状态结束

          this.pageNum++;
          this.loading = false;
          if (res.list.length === 0) {
            this.finished = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
.test-page {
  margin-bottom: 50px;
  .van-cell {
    margin-top: 50px;
  }
}
</style>