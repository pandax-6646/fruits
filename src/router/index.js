import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [

    // 默认跳转到产品页
    {
      path: '/',
      redirect: 'product',
    },

    // 产品页
    {
      name: 'product',
      path: '/product',
      component: () => import('@/views/Product/index'),
      redirect: 'product/list',
      children: [{
          name: 'detail',
          path: 'detail/:productId',
          meta: {
            title: '商品详情'
          },
          component: () => import('@/views/Product/children/Detail')
        },
        {
          path: 'list',
          meta: {
            title: '商品列表'
          },
          component: () => import('@/views/Product/children/List')
        }
      ]
    },

    // 分类页
    {
      path: '/classify',
      meta: {
        title: '分类列表'
      },
      component: () => import('@/views/Classify/index')
    },

    // 购物车页
    {
      path: '/cart',
      meta: {
        title: '购物车'
      },
      component: () => import('@/views/Cart/index')
    },

    // 我的页
    {
      name: 'my',
      path: '/my',
      component: () => import('@/views/My/index'),
      redirect: 'my/list',
      children: [{
          path: 'list',
          meta: {
            title: '我的'
          },
          component: () => import('@/views/My/children/List')
        },
        {
          path: 'setting',
          meta: {
            title: '设置'
          },
          component: () => import('@/views/My/children/Setting')
        },
        {
          path: 'order',
          meta: {
            title: '订单'
          },
          component: () => import("@/views/My/children/Order")
        },
        {
          path: 'orderDetail/:orderId',
          meta: {
            title: '订单详情'
          },
          component: () => import('@/views/My/children/OrderDetail')
        }
      ]
    },

    // 登录页
    {
      path: '/login',
      meta: {
        title: '立即登录'
      },
      component: () => import('@/views/Login/index')
    },

    // 订单页
    {
      path: '/booking',
      component: () => import('@/views/Booking/index'),

      redirect: 'booking/detail',
      children: [{
          name: 'preOrderDatail',
          path: 'detail',
          meta: {
            title: '订单详情'
          },
          component: () => import("@/views/Booking/children/PreOrderDetail"),
        },
        {
          path: 'address',
          meta: {
            title: '地址列表'
          },
          component: () => import('@/views/Booking/children/AddressList')
        }, {
          name: 'editAddress',
          path: 'editAddress',
          meta: {
            title: '修改地址'
          },
          component: () => import('@/views/Booking/children/EditAddress')
        },
        {
          path: 'pushAddress',
          meta: {
            title: '添加地址'
          },
          component: () => import('@/views/Booking/children/PushAddress')
        }
      ]
    },

    // 支付页面
    {
      name: 'pay',
      path: '/pay',
      meta: {
        title: '支付订单'
      },
      component: () => import('@/views/Pay/index')
    },

    // 测试组件
    {
      path: '/demo',
      component: () => import('@/components/testSetinerval')
    }
  ],
  // mode: 'history',
})