<template>
  <div class="my-list-container">
    <header class="header wp-100 flex ai-c">
      <router-link to="/login" class="fc-fff login" v-if="!$store.state.isLogin"
        >立即登录</router-link
      >
      <span class="fc-fff login" v-else>{{ getUserName }}</span>
    </header>

    <div class="container wp-100 bc-fff mt-10">
      <ul class="">
        <li class="ml-10 flex">
          <router-link to="/my/order" class="flex jc-sb ai-c wp-100">
            <span>我的订单</span>
            <i class="iconfont icon-iconfontjiantou4"></i>
          </router-link>
        </li>
        <li class="ml-10 flex jc-sb ai-c">
          <span>收藏</span>
          <i class="iconfont icon-iconfontjiantou4"></i>
        </li>
        <li class="ml-10 flex jc-sb ai-c">
          <span>足迹</span>
          <i class="iconfont icon-iconfontjiantou4"></i>
        </li>
        <li class="ml-10 flex jc-sb ai-c">
          <span>优惠券</span>
          <i class="iconfont icon-iconfontjiantou4"></i>
        </li>
        <li class="ml-10 flex jc-sb ai-c">
          <span>我的地址</span>
          <i class="iconfont icon-iconfontjiantou4"></i>
        </li>
        <li class="ml-10 flex ai-c">
          <router-link to="/my/setting" class="flex jc-sb ai-c">
            <span>设置</span>
            <i class="iconfont icon-iconfontjiantou4"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <Tabber />
  </div>
</template>

<script>
import Tabber from "@/components/Tabber";
export default {
  name: "my-list",
  data() {
    return {
      userName: "",
    };
  },
  components: {
    Tabber,
  },
  created() {
    if (!this.$store.state.isLogin) {
      if (window.confirm("小主是否登录？")) {
        this.$router.push("/login");
      } else {
        this.$toast.fail("小主没有登录哦~~");
      }
    } else {
      this.userName = this.$store.state.phone;
    }
  },
  computed: {
    getUserName() {
      return this.userName.replace(/(\d{4})(\d{4})(\d{3})/, "$1****$3");
    },
  },
};
</script>

<style lang='less' scoped>
// 头部
.header {
  position: relative;
  height: 155px;
  background: url("~assets/images/my-bg.png") no-repeat;
  background-size: cover;

  .login {
    position: absolute;
    left: 30px;
    top: 25px;
  }
}

// 中间内容区
.container {
  li {
    height: 45px;
    padding: 0 20px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;

    i {
      color: #aa8a95;

      &::before {
        font-size: 14px;
      }
    }

    div {
      span {
        color: #787d82;
      }
    }
  }

  li:last-child a {
    height: 100%;
    width: 100%;
  }
}

// 底部导航栏
.nav-bottom-bar {
  height: 50px;
  bottom: 0px;
  border-top: 1px solid #ebebeb;
  box-sizing: border-box;

  ul {
    height: 100%;

    a {
      display: block;
      width: 100%;
      height: 100%;
      color: #787d82;
      text-align: center;

      i {
        display: block;
        margin-bottom: 5px;
      }
    }

    li:not(li:nth-of-type(2)) {
      a {
        i {
          font-weight: bold;
        }
      }
    }

    li:nth-child(2n + 1) {
      a {
        i::before {
          font-size: 25px;
        }
      }
    }

    li:nth-of-type(4) {
      a {
        color: #d51e1f;
      }
    }
  }
}
</style>