<template>
  <div class="classify-container">
    <div class="search-nav wp-100 bc-fff fixed">
      <div class="flex jc-sb ai-c">
        <a href="#" class="ml-10 mr-5">
          <i class="iconfont icon-sousuo"></i>
        </a>
        <input
          type="text"
          class="wp-100"
          placeholder="请输入搜索关键字"
          @input="search"
          v-model="keyword"
          key="?"
        />
      </div>
    </div>

    <!-- 中间的分类商品 -->
    <div class="goods-list flex wp-100">
      <ul class="list-title fs-14">
        <li
          @click="getCategoryGoodsList(index, item.categoryId)"
          v-for="(item, index) in categoryIdTitles"
          :key="item.categoryId"
          :class="{ active: currIndex == index }"
        >
          {{ item.name }}
        </li>
      </ul>

      <ul class="list-goods fg-1 flex jc-sa fw-w bc-fff fs-12">
        <router-link
          class="item"
          :to="`/product/detail/${item.productId}`"
          v-for="item in list"
          :key="item.productId"
        >
          <img :src="item.imgUrl" alt="" />
          <p>{{ item.masterName }}</p>
        </router-link>
      </ul>
    </div>
    <Tabber />
  </div>
</template>

<script>
import Tabber from "@/components/Tabber";
import { getHomeData } from "@/api";
import { getCategorySearchData } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "calssify",
  mixins: [toast],
  data() {
    return {
      categoryIdTitles: [],
      currIndex: null,
      list: [],
      newList: [],
      keyword: "",
      timer: null,
    };
  },
  components: {
    Tabber,
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

          // 获取分类的图片数据
          this.getCategoryGoodsList(0, res.list[0].categoryId);
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 获取分类的右边的数据
    getCategoryGoodsList(index, id) {
      // 按钮不可重复点击
      if (this.currIndex != index) {
        // 加载弹窗
        this.showLoading();

        this.currIndex = index;
        getHomeData
          .getListPage({ categoryId: id })
          .then((res) => {
            this.list = res.list;
            this.newList = res.list;
            this.$toast.clear();
          })
          .catch((err) => this.$toast.fail(err));
      }
    },

    // 搜索框
    search() {
      try {
        // 防抖
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          // 最后一次执行延迟的请求，在延迟时间内将 keyword 修改为空时，还是会去发送一个请求
          // 所以需要在发送请求的前一刻去判断 keyword 的值是否为空
          if (this.keyword == "") return;
          getCategorySearchData({ keyword: this.keyword })
            .then((res) => {
              if (res.list.length != 0) {
                this.list = res.list;
              } else {
                this.$toast.fail("未查询到");
              }
            })
            .catch((err) => this.$toast.fail(err));
        }, 1000);
      } catch (err) {
        this.$toast.fail(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 顶部搜索框
.search-nav {
  top: 0;
  height: 55px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  div {
    height: 100%;
    background-color: #f7f8fa;
    input {
      height: 100%;
      outline: none;
      border: 0;
      padding: 0;
      color: #222;
      font-size: 13px;
      background-color: transparent;
    }
    a {
      line-height: 35px;
      i {
        font-size: 15px;
      }
    }
  }
}

// 中间的分类商品
.goods-list {
  margin-top: 50px;
  .list-title {
    min-width: 125px;
    height: 300px;
    overflow-y: auto;
    background-color: #f4f4f4;
    color: #323233;
    li {
      height: 45px;
      width: 100%;
      line-height: 45px;
      border-left: 4px solid transparent;
      padding-left: 10px;
      background-color: #fafafa;
      box-sizing: border-box;
      &.active {
        border-left-color: #d51e1f;
        background-color: #fff;
      }
    }
  }

  .list-goods {
    height: calc(100vh - 100px);
    overflow: auto;
    .item {
      width: 100px;
      margin-bottom: 5px;
      img {
        width: 100%;
      }
    }
  }
}
</style>