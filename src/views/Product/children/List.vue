<template>
  <div class="product-container">
    <van-swipe
      class="my-swipe"
      height="210"
      :autoplay="3000"
      indicator-color="#1989fas "
    >
      <van-swipe-item v-for="(item, index) in swipers" :key="index">
        <img :src="item" alt="" style="height: 100%; width: 100%" />
      </van-swipe-item>
    </van-swipe>

    <div class="nav-top wp-100 mt-20 bc-fff">
      <ul class="wp-100 flex jc-sa ac-sa fw-w">
        <li v-for="item in tabBarList" :key="item.categoryId">
          <img :src="item.iconUrl" alt="" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <div class="miaosha-pintuan wp-100 bc-fff flex jc-sa fs-12">
      <div class="miaosha">
        <div>
          <p class="fs-14">秒杀</p>
          <p class="fc-999">超值惊喜</p>
          <span class="fc-fff">立即砍价</span>
        </div>
        <img src="@/assets/images/miaosha-icon.png" alt="" />
        <span class="fc-fff">秒杀</span>
      </div>
      <div class="pintuan">
        <div>
          <p class="fs-14">拼团</p>
          <p class="fc-999">限时拼团</p>
          <span class="fc-fff">一键拼团</span>
        </div>
        <img src="@/assets/images/pintuan-icon.png" alt="" />
        <span class="fc-fff">拼团</span>
      </div>
    </div>

    <div class="collect-coupons flex jc-sb ai-c fs-14 fc-fff">
      <div class="collect-coupons-left flex ai-c">
        <van-icon name="coupon-o" size="20" class="mr-5 ml-5" />
        <span class="mr-5">超值福利</span> |
        <span class="ml-5"> 全场满减</span>
      </div>

      <div class="collect-coupons-right flex jc-sa ai-c">
        <span>立即领取</span>
        <van-icon
          name="arrow"
          size="16"
          class="mr-5 ml-5"
          style="line-height: 12px"
        />
      </div>
    </div>

    <van-sticky>
      <div class="nav-menu wp-100 bc-fff flex jc-sa ai-c">
        <div>推荐</div>
        <div class="flex">
          <span>销量</span>
          <span class="flex fw-w ac-c">
            <van-icon name="arrow-up" />
            <van-icon name="arrow-down" />
          </span>
        </div>
        <div class="flex">
          <span>价格</span>
          <span class="flex fw-w ac-c">
            <van-icon name="arrow-up" />
            <van-icon name="arrow-down" />
          </span>
        </div>
      </div>
    </van-sticky>

    <van-list
      class="fruits bc-fff flex jc-sa fw-w fs-14 wp-100"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="loadMore"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <router-link :to="`/product/detail/${item.productId}`">
          <img v-lazy="item.imgUrl" alt="" />
          <p class="mt-15">{{ item.masterName }}</p>
          <p class="mt-5 mb-10">{{ item.slaveName }}</p>
          <div class="flex jc-sb">
            <span>￥ {{ (item.minPrice / 1000).toFixed(2) }}</span>
            <p class="fc-999 mr-5">
              <span class="fs-12">销量:</span>
              <span>{{
                item.inventory > 10000
                  ? `${(item.inventory / 10000).toFixed(1)} 万`
                  : item.inventory
              }}</span>
            </p>
          </div>
        </router-link>
      </van-cell>
    </van-list>

    <Tabber class="fixed tabber wp-100" />
  </div>
</template>      

<script>
import { toast } from "@/mixin";
import { getHomeData } from "@/api";
import Tabber from "@/components/Tabber";

export default {
  name: "list",
  mixins: [toast],
  data() {
    return {
      swipers: [],
      list: [],
      tabBarList: [],
      pageNum: 1,
      loading: false,
      finished: false,
    };
  },
  components: {
    Tabber,
  },
  created() {
    // 如果进入页面时已经有数据就不去重新请求数据，而 keep-alive 就能起作用了
    if (this.swipers.length == 0) {
      this.getHomeInitData();
    }

    // // 获取函数式路由传参
    // let { userName, age } = this.$route.params;
    // console.log("userName", userName);
    // console.log("age", age);

    // // 获取query 路由跳转传参
    // let query = this.$route.query;
    // console.log(query);

    // // 获取 标签式动态路由参数
    // let id = this.$route.params.productId;
    // console.log(id);
  },
  methods: {
    getHomeInitData() {
      // 添加loading
      this.showLoading();

      Promise.all([
        // 轮播图数据
        getHomeData
          .getSwiperData()
          .then((res) => (this.swipers = res.banners))
          .catch((err) => err),

        // 导航栏图片数据
        getHomeData
          .getTabBarData()
          .then((res) => (this.tabBarList = res.list))
          .catch((err) => err),
        this.loadMore(),
      ]).then((errs) => {
        // 判断 promise.all 返回的信息来显示弹出框
        errs.forEach((val) => {
          if (val.length == 0 || !val) {
            // 关闭loading，并提示错误信息，2秒后关闭提示错误信息
            this.$toast.clear();
            this.$toast.fail("请求失败，请稍后重试");
          } else {
            // 关闭loading
            this.$toast.clear();
          }
        });
      });
    },

    // 下拉加载更多
    async loadMore() {
      // 加载分页数据，并监听异步请求失败的错误信息，然后返回给 promise.all 监听，弹出提示信息
      let info = true;
      await getHomeData
        .getListPage({ pageNum: this.pageNum })
        .then((res) => {
          this.list = this.list.concat(res.list);

          // 加载状态结束
          this.pageNum++;
          this.loading = false;
          if (res.list.length === 0) {
            this.finished = true;
          }
        })
        .catch((err) => {
          if (!err) {
            info = false;
          }
          info = err;
        });
      return info;
    },
  },
};
</script>

<style lang='less' scoped>
.nav-top {
  height: 200px;

  ul {
    height: 100%;

    li {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      width: 25%;
      height: 50%;

      img {
        height: 40px;
        width: 40px;
      }

      p {
        display: block;
        width: 100%;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
}

.miaosha-pintuan {
  height: 95px;
  border-bottom: 10px solid transparent;

  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 180px;
    border-radius: 10px;
    background: url("~assets/images/miaosha-bg.png") no-repeat;
    background-size: cover;

    div {
      margin-left: 20px;

      p {
        margin-bottom: 5px;
      }

      span {
        display: block;
        height: 20px;
        width: 60px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        background-color: #f10300;
      }
    }

    img {
      height: 65px;
      width: 65px;
    }

    span {
      height: 100%;
      margin-top: 3px;
    }
  }

  .pintuan {
    background-image: url("~assets/images/pintuan-bg.png");
  }
}

.collect-coupons {
  height: 40px;
  width: 355px;
  margin: 10px auto;
  background: url("~assets/images/lingquan-bg.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 0px;
}

.nav-menu {
  height: 45px;
  color: #787d82;
  line-height: 45px;
  border-bottom: 1px solid #ebebeb;

  div span:last-child {
    width: 12px;
    margin-left: 5px;

    i {
      display: block;
      color: #b0b4b6;
      line-height: 5px;
      text-align: center;
      margin: 2px 0;
      &::before {
        font-size: 12px;
      }
    }
  }
}

.fruits {
  margin-bottom: 50px;
  padding-top: 15px;

  & > div:not(div:last-child) {
    width: 165px;

    img {
      width: 100%;
      background-color: #ebebeb;
    }

    p {
      max-width: 165px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    div > span:first-child {
      color: #d51e1f;
    }
  }

  & > div:last-child {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #969799;
    margin-bottom: 10px;
  }
}
</style>

<style lang='less' >
.fruits {
  .van-list__finished-text,
  .van-list__placeholder {
    width: 100%;
  }
}
</style>