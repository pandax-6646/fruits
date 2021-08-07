<template>
  <!-- 页面优化， 防止重复请求重复数据 -->
  <keep-alive include="list">
    <Router-view />
  </keep-alive>
</template>
<script>
export default {
  name: "product",
};
</script>

