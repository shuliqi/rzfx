import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
// import myPopUp from '@/components/public/dialog'
import { getCookie } from '../common/js/unit.js'
Vue.use(Router)
const router = new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                requireAuth: true,
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    let rzfx = JSON.parse(getCookie('rzfx'))
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (rzfx === null || rzfx === undefined || rzfx.name === undefined || rzfx.name === null) {
            console.log("不存在cooki")
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router