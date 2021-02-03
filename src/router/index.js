import Vue from 'vue'
import VueRouter from 'vue-router'
import cinemaRouter from './cinema'
import movieRouter from './movie'
import mineRouter from './mine'

Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  cinemaRouter,
  movieRouter,
  mineRouter,
  {
    path: '/*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
