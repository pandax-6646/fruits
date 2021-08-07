<template>
  <div>
    <!-- 普通插槽
    <div>父组件</div>
    <TestSlotS><span>普通插槽</span></TestSlotS> -->

    <!-- 具名插槽 -->
    <div>父组件</div>
    <TestSlotS>
      <header slot="header">头部</header>
      <div>主体</div>
      <span>主体</span>
      <footer slot="footer">尾部</footer>
    </TestSlotS>
  </div>
</template>

<script>
import TestSlotS from "./testSoltS";
export default {
  name: "test-solt-f",
  components: {
    TestSlotS,
  },
};
</script>

<style>
</style>