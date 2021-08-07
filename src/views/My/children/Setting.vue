<template>
  <div class="setting-container">
    <div class="nav-top wp-100 bc-fff flex jc-sb ai-c fixed">
      <router-link to="/my" class="back flex ai-c">
        <i class="iconfont icon-zuojiantou ml-10"></i>
        <span>返回</span>
      </router-link>
      <span>设置</span>
      <i class="mr-10"></i>
    </div>

    <div class="container wp-100 fs-14">
      <ul class="bc-fff">
        <li class="flex jc-sb ai-c">
          <span>账号id</span>
          <span class="account-id">{{ $store.state.phone }}</span>
        </li>
        <li class="flex jc-sb ai-c">
          <span>登录密码</span>
          <div>
            <span>未设置</span>
            <i class="iconfont icon-iconfontjiantou4"></i>
          </div>
        </li>
        <li class="flex jc-sb ai-c">
          <span>安全密码</span>
          <div>
            <span>未设置</span>
            <i class="iconfont icon-iconfontjiantou4"></i>
          </div>
        </li>
      </ul>
    </div>

    <div class="footer-log-out wp-100 fixed bc-fff" @click="logout">
      退出登录
    </div>
  </div>
</template>

<script>
import { loginRequest } from "@/api";
export default {
  name: "my-setting",
  methods: {
    logout() {
      loginRequest
        .logout()
        .then((res) => {
          if (res.code == 666) {
            this.$store.commit("updataLoginState", false);
            this.$store.commit("updataPhone", "");
            this.$store.commit("updataToken", "");
            this.$toast.success("退出登录成功");
            setTimeout(() => {
              this.$router.push("/product");
            }, 500);
          }
        })
        .catch((err) => this.$toast.fail(err));
    },
  },
};
</script>

<style lang='less' scoped>
.nav-top {
  height: 45px;
  border-bottom: 1px solid #f5f5f5;
  top: 0px;

  a {
    color: #c03131;
  }
}

// 中间内容区
.container {
  height: 305px;
  margin-top: 55px;
  color: #222;

  ul {
    li {
      height: 50px;
      border-bottom: 1px solid #f5f5f5;
      box-sizing: border-box;
      padding: 0 20px;

      i {
        color: #aa8a95;

        &::before {
          font-size: 14px;
        }
      }

      & > span:last-child {
        color: #787d82;
      }

      div {
        span {
          color: #787d82;
        }
      }
    }
  }
}

.footer-log-out {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #c03131;
  bottom: 0px;
}
</style>