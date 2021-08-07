export let toast = {
  methods: {
    showLoading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
    },
  }
}