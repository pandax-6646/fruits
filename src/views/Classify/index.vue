<template>
  <div class="classify-container">
    <!-- 顶部搜索框 -->
    <Search @search="search" />

    <!-- 中间的分类商品 -->
    <div class="goods-list flex wp-100">
      <!-- 侧边导航栏 -->
      <SliderBar
        :categoryIdTitles="categoryIdTitles"
        @getCategoryGoodsList="getCategoryGoodsList"
      />

      <GoodsList :list="list" />
    </div>
    <Tabber />
  </div>
</template>

<script>
import Tabber from "@/components/Tabber";
import Search from "./children/Search";
import SliderBar from "./children/SliderBar";
import GoodsList from "./children/GoodsList";
import { getHomeData } from "@/api";
import { getCategorySearchData } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "calssify",
  mixins: [toast],
  data() {
    return {
      categoryIdTitles: [],
      list: [],
      newList: [],
    };
  },
  components: {
    Tabber,
    Search,
    SliderBar,
    GoodsList,
  },
  created() {
    this.getCategoryTitle();
  },
  methods: {
    // 获取分类的左边列表
    getCategoryTitle() {
      getHomeData
        .getTabBarData()
        .then((res) => {
          this.categoryIdTitles = res.list;

          // 获取分类初始状态的右边商品图片数据
          this.getCategoryGoodsList(0, res.list[0].categoryId);
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 获取分类的右边的数据
    getCategoryGoodsList(id) {
      // 加载弹窗
      this.showLoading();

      getHomeData
        .getListPage({ categoryId: id })
        .then((res) => {
          this.list = res.list;
          this.newList = res.list;
          this.$toast.clear();
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 搜索框
    search(keyword) {
      // 最后一次执行延迟的请求，在延迟时间内将 keyword 修改为空时，还是会去发送一个请求
      // 所以需要在发送请求的前一刻去判断 keyword 的值是否为空
      if (keyword == "") return;
      getCategorySearchData({ keyword })
        .then((res) => {
          if (res.list.length != 0) {
            this.list = res.list;
          } else {
            this.$toast.fail("未查询到");
          }
        })
        .catch((err) => this.$toast.fail(err));
    },
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  margin-top: 50px;
}
</style>