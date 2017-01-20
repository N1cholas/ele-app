// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 挂载点
import App from './App'
// 组件
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'
// 插件
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

new Vue({
  router,
  ...App
}).$mount('#app')

router.push('/goods')
