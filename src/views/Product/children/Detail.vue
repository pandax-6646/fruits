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

    <div class="footer flex fs-12 wp-100 jc-sb ai-c fixed bc-fff">
      <div class="left-btn flex ai-c jc-sa">
        <div class="fd-c flex">
          <i class="iconfont icon-kefu"></i>
          <span>客服</span>
        </div>
        <div class="fd-c flex">
          <svg
            t="1626696870048"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1199"
            width="30"
            height="25"
          >
            <path
              d="M509.606998 143.114488c9.082866 0 17.327644 4.840238 20.996197 12.331863l97.262184 197.441814c5.613858 11.403724 16.663518 19.358907 29.438473 21.216207l223.738737 32.552393c8.420787 1.215688 15.604396 6.851035 18.23327 14.254655 2.520403 7.18361 0.595564 15.062044-5.084808 20.586874L730.253304 601.611947c-8.949836 8.751315-12.994965 21.171182-10.916631 33.370015l38.011732 222.060515c1.325182 7.737218-2.165316 15.426341-8.905834 19.978007-4.088108 2.741437-8.861832 4.155646-13.812587 4.155646-4.022617 0-7.999185-0.972141-11.425214-2.740414L528.149307 775.671215c-5.768377-3.006474-12.155854-4.552689-18.542308-4.552689-6.364965 0-12.727882 1.547239-18.518772 4.552689L296.254819 878.348736c-3.559059 1.855254-7.602142 2.828418-11.668761 2.828418-4.861728 0-9.723455-1.459235-13.546527-4.022617-6.961552-4.684696-10.475586-12.419867-9.127891-20.155039l38.011732-222.016513c2.078335-12.198833-1.988284-24.619724-10.939143-33.370015L125.02397 441.443038c-5.635347-5.492084-7.55814-13.348006-5.061272-20.453844 2.63092-7.481392 9.812483-13.116739 18.298761-14.332427l223.674269-32.552393c12.839423-1.857301 23.867594-9.813506 29.481452-21.216207l97.194646-197.396789C492.325403 147.965983 500.590648 143.114488 509.606998 143.114488M509.606998 104.904235c-24.043602 0-45.922912 13.226233-56.177464 33.95637L356.189863 336.302419l-223.674269 32.54216c-22.983457 3.304256-42.100864 18.718317-49.481971 39.659255-7.381108 21.048385-1.812275 44.23241 14.431687 60.033281l163.916257 160.125931-38.011732 222.016513c-3.868097 22.408359 6.03239 44.819788 25.458835 57.94676 10.69662 7.116071 23.204491 10.784624 35.757388 10.784624 10.298554 0 20.663622-2.475378 30.055526-7.337105l194.987926-102.7205L704.662463 912.072815c9.369392 4.861728 19.712971 7.337105 29.990035 7.337105 12.57541 0 25.082258-3.668553 35.778878-10.784624 19.426445-13.126972 29.305443-35.538401 25.460882-57.94676l-38.012755-222.016513 163.937746-160.125931c16.22145-15.812127 21.810748-38.984896 14.408151-60.033281-7.402597-20.940938-26.51898-36.353976-49.503461-39.659255L663.04767 336.302419l-97.240695-197.441814C555.619962 118.131491 533.695626 104.904235 509.606998 104.904235L509.606998 104.904235z"
              p-id="1200"
              fill="#323232"
            ></path>
          </svg>
          <span>收藏</span>
        </div>
        <router-link to="/cart">
          <div class="fd-c flex">
            <i class="iconfont icon-gouwuche"></i>
            <span>购物车</span>
            <span :class="{ show: $store.state.cart.goodsListNum == 0 }">{{
              $store.state.cart.goodsListNum
            }}</span>
          </div>
        </router-link>
      </div>
      <div class="right-btn fs-13 flex jc-sb ai-c">
        <span @click="addGoods">加入购物车</span>
        <span>立即购买</span>
      </div>
    </div>
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

.footer {
  height: 50px;
  bottom: 0px;

  .left-btn {
    width: 50%;
    text-align: center;

    i::before {
      font-size: 25px;
    }
    div:last-child {
      position: relative;
      span:last-child {
        position: absolute;
        display: block;
        height: 16px;
        width: 16px;
        line-height: 16px;
        text-align: center;
        background-color: red;
        border-radius: 50%;
        right: 0px;
        color: #fff;
        top: -5px;
        font-size: 12px;
      }
    }
  }

  .right-btn {
    width: 50%;
    color: #fff;
    height: 100%;
    text-align: center;
    line-height: 50px;

    span {
      height: 100%;
      width: 50%;
    }

    span:first-child {
      border-top-left-radius: 20px;
      background: linear-gradient(90deg, #ffd01e, #ff8917);
    }

    span:last-child {
      background: linear-gradient(90deg, #ff6034, #ee0a24);
    }
  }
}
</style>