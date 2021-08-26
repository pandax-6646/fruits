<template>
  <div class="my-login-container bc-fff">
    <header>
      <div>注册</div>
    </header>

    <div class="logo-img">
      <img src="@/assets/images/login-img.png" alt="" />
    </div>

    <div class="login">
      <div class="user-name flex jc-sb ai-c mt-15 pb-5">
        <input
          id="phone"
          type="number"
          placeholder="手机号"
          autofocus
          v-model="phone"
        />
        <span @click="getSmsCode" class="fs-13 fc-999 get-phone-code">
          {{ time }}</span
        >
      </div>
      <div class="password mt-20 pb-5">
        <input
          type="text"
          placeholder="验证码"
          class="code"
          v-model="smsCode"
        />
      </div>
      <input
        type="submit"
        class="fs-14 submit"
        @click="login"
        value="短信登录"
      />
    </div>
  </div>
</template>

<script>
import { toast } from "@/mixin";
import { loginRequest } from "@/api";
import { cartRequest } from "@/api";
export default {
  name: "login",
  mixins: [toast],
  data() {
    return {
      phone: "",
      loginPhone: "",
      // 验证码字符
      smsCode: "",

      // 验证码倒计时件
      time: "获取验证码",

      // 防止恶意点击请求验证码
      flag: true,
      timer: null,
    };
  },
  methods: {
    // 校验电话号码和获取验证码
    getSmsCode() {
      try {
        if (!this.flag) return;
        // 验证码倒计时
        this.selfDes();

        // 验证号码是否合法
        let reg =
          /^(13[0-9]|14[57]|15[0-9]|166|17[3678]|18[0-9]|19[0-9])[0-9]{8}$/;

        if (!reg.test(this.phone)) {
          this.$toast.fail("请输入正确的号码");
          clearInterval(this.timer);
          this.time = "获取验证码";
        } else {
          this.flag = false;

          // 获取验证码
          loginRequest
            .getSmsCode({ phone: this.phone })
            .then((res) => {
              this.smsCode = res.smsCode;

              // 保存请求验证码的手机号，登录是要做验证
              this.loginPhone = this.phone;
            })
            .catch((err) => this.$toast.fail(err));
        }
      } catch (err) {
        this.$toast.fail(err);
      }
    },

    // 验证码倒计时
    selfDes() {
      this.time = 59;
      this.timer = setInterval(() => {
        if (this.time == 0) {
          this.flag = true;
          clearTimeout(this.timer);
          this.time = "重新获取";
        } else {
          this.time--;
        }
      }, 1000);
    },

    // 登录
    login() {
      // 请求验证码的手机号与登录的手机号相同才去请求
      if (this.loginPhone == this.phone) {
        this.showLoading();
        loginRequest
          .login({ phone: this.loginPhone, smsCode: this.smsCode })
          .then((res) => {
            // 弹出登录成功弹窗
            this.$toast.success(res.msg);

            // 更新 vuex 的数据
            this.$store.commit("updataLoginState", true);
            this.$store.commit("updataPhone", this.loginPhone);
            this.$store.commit("updataToken", res.result.token);

            // 获取购物车里商品总数的请求，必须要在token保存后才可以拿到购物车里的数据
            let cartListNum = 0;
            cartRequest
              .getCartGoodsList()
              .then((res) => {
                res.list.forEach((goods) => (cartListNum += goods.buyNum));

                // 更新购物车里的商品总数
                this.$store.commit("updataGoodsListNum", cartListNum);
              })
              .catch((err) => this.$toast.fail(err));

            // 跳转到原页面
            this.$router.go(-1);
          })
          .catch((err) => {
            this.$toast.fail("小主，登录失败了呢");
          });
      } else {
        this.$toast.fail("手机号码不一致");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.my-login-container {
  height: 100vh;
}
header {
  height: 45px;
  border-bottom: 1px solid #eee;
  line-height: 45px;
  padding: 0 10px;
  box-sizing: border-box;

  div {
    float: right;
    margin-right: 20px;
  }
}

.logo-img {
  img {
    display: block;
    width: 40%;
    margin: 80px auto;
  }
}

.login {
  height: 100px;
  padding: 0 15px;

  box-sizing: border-box;
  border: 1px solid transparent;

  div {
    border-bottom: 1px solid #eee;

    input {
      outline: none;
      border: 0px;
      flex-grow: 1;
    }
  }

  div:nth-of-type(2) input {
    width: 100%;
  }

  & > input {
    display: block;
    height: 40px;
    width: 98%;
    line-height: 33px;
    text-align: center;
    border: 0;
    margin: 30px auto;
    color: #fff;
    background-color: #c03131;
  }
}
</style>