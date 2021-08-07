<template>
  <div>
    <!-- 普通插槽
    <h2>子组件</h2>
    <slot></slot> -->

    <h2>子组件</h2>
    <slot name="header" class="header"></slot>
    <slot name="default" class="default"></slot>
    <slot name="footer" class="footer"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>