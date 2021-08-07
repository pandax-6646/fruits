<template>
  <div>
    <button @click="funcToMy">函数跳转传参并到我的页面</button>
    <br />
    <button @click="pathToMy">query 跳转传参并到我的页面</button>
    <br />
    <button @click="dynamicToMy">函数式动态跳转传参并到我的页面</button>
    <br />
    <router-link to="home/eeee">标签式动态跳转传参并到我的页面</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    // 函数式路由传参
    funcToMy() {
      this.$router.push({
        name: "home",
        params: {
          userName: "xxxxx",
          age: 18,
        },
      });
    },

    // query 跳转路由传参
    pathToMy() {
      this.$router.push({
        path: "home",
        query: {
          userName: "xxxx",
          age: 20,
        },
      });
    },
    
    // 函数式动态跳转传参
    dynamicToMy() {
      this.$router.push("home/" + 123);
    },
  },
};
</script>

<style>
</style>