
/* eslint-disable no-unused-vars */
import scss from 'scss'
/* eslint-enable no-unused-vars */
import VueRouter from 'vue-router'
import { proxy_mock } from './config/index'
import components from './components/index'
import routers from './routers'
Object.keys(components).forEach(k => {
    Vue.component(k, components[k])
})

window.Vue = Vue

Vue.use(VueResource)
Vue.use(VueRouter)


// *** 实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
})
routers(Vue, router)

let app = Vue.extend({})
router.start(app,'#app')



// 调用后台接口，在此执行
proxy_mock(Vue).then(()=>{
    // XMLHttpRequest
})



import lib from './lib/index'


