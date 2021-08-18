<template>
  <div class="product-detail-container" v-show="isLoded">
    <div class="tab-bar wp-100 bc-fff flex jc-sb ai-c fixed">
      <router-link to="/product/list" class="ml-5 flex ai-c">
        <i class="iconfont icon-zuojiantou"></i>
        <span>返回</span>
      </router-link>
      <span class="fg-1 fs-20">商品详情</span>
      <span class="mr-5"></span>
    </div>

    <div class="detail-container wp-100">
      <van-swipe
        class="swipe"
        height="335"
        :autoplay="3000"
        indicator-color="#1989fa"
      >
        <van-swipe-item
          v-for="(item, index) in detailData.banners"
          :key="index"
        >
          <img :src="item" alt="" style="height: 100%; width: 100%" />
        </van-swipe-item>
      </van-swipe>

      <div class="goods-info bc-fff">
        <p class="title">
          <span>直降</span>
          <span>包邮</span>
          <span class="ml-10">{{ detailData.masterName }}</span>
        </p>
        <p class="describe fs-12 mt-5 mb-10">
          {{ detailData.slaveName }}
        </p>
        <p class="price mb-10">
          <span class="fs-18"
            >￥ {{ (detailData.minPrice / 100).toFixed(1) }}
          </span>
          <span class="fs-12"
            >￥{{ ((detailData.minPrice / 100) * 1.3).toFixed(1) }}</span
          >
          <span class="fs-14">3932 人购买</span>
        </p>
        <p class="specs flex jc-sb fs-14 ai-c">
          <span>规格:</span>
          <span class="fg-1 ml-10">X 2</span>
          <i class="iconfont icon-iconfontjiantou4"></i>
        </p>
        <div class="distribution flex jc-sb ai-c">
          <div>
            <span class="fs-14">配送至：</span>
            <p class="fs-13 mt-10">上海黄浦区</p>
          </div>
          <i class="iconfont icon-iconfontjiantou4"></i>
        </div>
        <p class="mt-10 flex ai-c">
          <i class="iconfont icon-wancheng"></i>
          <span class="fs-12">包邮</span>
        </p>
      </div>
      <div class="show-img wp-100 mt-10 bc-fff">
        <div class="divider"></div>
        <img
          v-lazy="img"
          v-for="(img, index) in detailData.descPics"
          :key="index"
          alt=""
        />
        <div class="procedure">
          <div></div>
          <img src="@/assets/images/detail-img-15.png" alt="" />
        </div>
      </div>

      <div class="logistics-info bc-fff">
        <div>
          <p>一、关于发货</p>
          <p>
            个工作日内发出（周末、法定节假日需顺延）个工作日内发出（周末、法定节假日需顺延）；
          </p>
        </div>
        <div>
          <p>二、关于发货</p>
          <p>
            个工作日内发出（周末、法定节假日需顺延）个工作日内发出（周末、法定节假日需顺延）；
          </p>
        </div>
        <div>
          <p>三、关于发货</p>
          <p>
            个工作日内发出（周末、法定节假日需顺延）个工作日内发出（周末、法定节假日需顺延）；
          </p>
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="$store.state.cart.goodsListNum"
        @click="$router.push('/cart')"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="warning"
        @click="addGoods"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { toast } from "@/mixin";
import { getHomeData } from "@/api";
import { addCart } from "@/api";
export default {
  name: "detail",
  mixins: [toast],
  data() {
    return {
      productId: null,
      detailData: {},
      isLoded: false,
    };
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      //  加载弹窗
      this.showLoading();
      getHomeData
        .getDetailData({ productId: this.productId })
        .then((res) => {
          this.detailData = res.result;
          this.$toast.clear();
          this.isLoded = true;
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 添加商品
    addGoods() {
      // 检测是否登录
      if (this.$store.state.isLogin) {
        addCart({
          productId: this.productId,
        })
          .then((res) => {
            if (res.code == 666) {
              this.$toast.success("添加成功");
              this.$store.commit("updataGoodsListNum", 1);
            }
          })
          .catch((err) => this.$toast.fail(err));
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.show {
  display: none !important;
}
.tab-bar {
  height: 45px;
  width: 100%;
  top: 0px;
  z-index: 999;

  a {
    color: #c03131;
  }

  & > span:nth-of-type(1) {
    text-align: center;
  }

  & > span:last-child {
    width: 57px;
  }
}

.detail-container {
  position: relative;
  top: 45px;
  margin-bottom: 100px;

  .swiper {
    height: 335px;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .goods-info {
    height: 290px;
    padding: 15px;
    box-sizing: border-box;

    .title {
      span:not(:last-child) {
        display: inline-block;
        font-size: 14px;
        height: 15px;
        width: 45px;
        line-height: 15px;
        text-align: center;
        background-color: #78d0a1;
        color: #fff;
      }

      span:nth-of-type(2) {
        background-color: #91bc6f;
      }

      span:last-child {
        color: #2c3e50;
        line-height: 25px;
      }
    }

    .describe {
      color: #797d82;
    }

    .price {
      color: #797d82;

      span:nth-of-type(1) {
        color: #c03131;
      }

      span:nth-of-type(2) {
        text-decoration: line-through;
      }

      span:nth-of-type(3) {
        float: right;
      }
    }

    .specs {
      border-bottom: 1px solid #eee;
      padding: 15px;
      color: #797d82;

      i::before {
        font-size: 14px;
      }
    }

    .distribution {
      padding: 15px;
      border-bottom: 1px solid #eee;

      span {
        color: #797d82;
      }

      p:nth-of-type(1) {
        max-width: 300px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      i::before {
        font-size: 14px;
      }
    }

    p:last-child {
      i::before {
        color: #ff7563;
      }

      span {
        color: #797d82;
      }
    }
  }

  .show-img {
    display: block;

    .divider {
      position: relative;
      top: 25px;
      left: calc(50% - 53px);
      width: 105px;
      height: 1px;
      background-color: #797d82;
      margin-bottom: 25px;

      &::after {
        color: gray;
        content: "商品详情";
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        background-color: #fff;
      }
    }

    img {
      width: 100%;
    }

    img:nth-of-type(1) {
      margin-top: 50px;
    }

    .procedure {
      & > div {
        position: relative;
        top: 25px;
        left: calc(50% - 73px);
        width: 145px;
        height: 1px;
        background-color: #797d82;

        &::after {
          content: "预定流程及须知";
          position: absolute;
          top: -6px;
          left: 50%;
          width: fit-content;
          transform: translateX(-50%);
          font-size: 12px;
          color: gray;
          background-color: #fff;
        }
      }
    }
  }

  .logistics-info {
    color: #797d82;
    font-size: 13px;

    div {
      padding: 10px 10px;

      p:first-child {
        font-weight: bold;
      }

      p:last-child {
        line-height: 20px;
      }
    }
  }
}
</style>