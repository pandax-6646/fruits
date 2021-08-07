<template>
  <div class="tabber-container bc-fff flex wp-100 fixed jc-sa ai-c fs-14">
    <router-link
      class="flex jc-c fd-c ai-c"
      active-class="active"
      to="/product"
    >
      <van-icon name="wap-home-o" size="22" />
      <span>首页</span>
    </router-link>
    <router-link
      class="flex jc-c fd-c ai-c"
      active-class="active"
      to="/classify"
    >
      <van-icon name="qr" size="22" />
      <span>分类</span>
    </router-link>
    <router-link class="flex jc-c fd-c ai-c" active-class="active" to="/cart">
      <van-icon name="shopping-cart-o" size="22" />
      <span>购物车</span>
    </router-link>
    <router-link class="flex jc-c fd-c ai-c" active-class="active" to="/my">
      <van-icon name="contact" size="22" />
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.tabber-container {
  height: 45px;
  box-sizing: border-box;
  bottom: 0px;
}
.active {
  color: #f40;
}
</style>