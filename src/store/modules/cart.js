export default {
  state: {
    goodsListNum: 0,
  },

  mutations: {
    updataGoodsListNum(store, payload) {
      store.goodsListNum = store.goodsListNum + payload;
    }
  },
}