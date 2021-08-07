import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, {
  Toast
} from 'vant';
import 'vant/lib/index.css';
import store from './store'
import VueImgLazyLoad from 'vue-lazyload'



// 导入模拟数据,
// import './mock'


Vue.config.productionTip = false

Vue.use(VueImgLazyLoad)
Vue.use(Vant);
Vue.use(Toast);



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')