import request from './request'


// // 设置程序运行的环境
// let env = 'production';
// let baseUrl = '';
// // window.confirm('后台数据是否完成') &&
// if (env == 'devlopment') {
//   baseUrl = '';
// } else {
//   baseUrl = "http://localhost:8080/api"
// }


let baseUrl = process.env.VUE_APP_URL;

// 首页的请求
export let getHomeData = {
  // 首页轮播图数据
  getSwiperData() {
    return request.get(baseUrl + 'product/getBanners');
  },
  // 首页中部的数据
  getTabBarData: function () {
    return request.get(baseUrl + 'category/all');
  },
  // 首页的分类数据
  getListPage(params) {
    return request.get(baseUrl + 'product/list', params);
  },
  // 首页详情数据
  getDetailData(params) {
    return request.get(baseUrl + 'product/detail', params);
  },
}





// 分类页的请求
export let getCategorySearchData = (params) => {
  return request.get(baseUrl + 'product/search', params);
}





// 详情页的请求
export let addCart = (params) => {
  return request.get(baseUrl + 'cart/add', params);
}





// 购物车页的请求
export let cartRequest = {

  // 获取购物车商品列表
  getCartGoodsList() {
    return request.get(baseUrl + 'cart/all');
  },

  // 修改购物车里商品数量
  changeCartGoods(params) {
    return request.get(baseUrl + 'cart/updateNum', params);
  },

  // 删除商品
  delCartGoods(params) {
    return request.post(baseUrl + 'cart/del', params);
  }
}





// 登录页的请求
export let loginRequest = {
  // 获取验证码
  getSmsCode(params) {
    return request.get(baseUrl + 'user/getSmsCode', params);
  },
  // 登录
  login(params) {
    return request.post(baseUrl + 'user/login', params);
  },
  // 登出
  logout() {
    return request.get(baseUrl + 'user/logout');
  }
}





// 预订单页面的请求
export let preOrderRequest = {

  // 添加预订单
  addPreOrder(params) {
    return request.post(baseUrl + 'preOrder/add', params);
  },

  // 获取预订单详情
  preOrderList(params) {
    return request.get(baseUrl + 'preOrder/detail', params);
  },

  // 获取地址列表信息
  getAddressList() {
    return request.get(baseUrl + 'address/all');
  },

  // 添加地址信息
  pushAddressInfo(params) {
    return request.get(baseUrl + 'address/add', params);
  },

  // 修改地址信息
  editAddressInfo(params) {
    return request.get(baseUrl + 'address/edit', params)
  },

  // 删除地址信息
  delAddressInfo(params) {
    return request.get(baseUrl + 'address/del', params)
  }
}




// 订单页面的请求
export let orderRequest = {

  // 添加订单
  addOrder(params) {
    return request.post(baseUrl + 'order/add', params);
  },

  // 订单支付
  payOrder(params) {
    return request.post(baseUrl + 'order/pay', params);
  },

  // 获取订单详情
  orderDetail(params) {
    return request.post(baseUrl + 'order/detail', params)
  },

  // 获取所有订单
  getOrderAll() {
    return request.get(baseUrl + 'order/all')
  },

  // 删除订单
  delOrder(params) {
    return request.get(baseUrl + 'order/del', params)
  }
}