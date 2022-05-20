import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () =>
                import(/* webpackChunkName: "home" */ "../views/TheHome.vue")
        },
        {
            path: '/category/:id',
            name: 'category',
            component: () =>
                import(/* webpackChunkName: "category" */ "../views/CategoryDetail.vue")
        },
        {
            path: '/product/:id',
            name: 'product',
            component: () =>
                import(/* webpackChunkName: "detailcourse" */ "../views/ProductDetail.vue")
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ "../views/TheLogin.vue")
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: () =>
                import(/* webpackChunkName: "schedule" */ "../views/TheSchedule.vue")
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import(/* webpackChunkName: "profile" */ "../views/TheProfile.vue")
        },
    ]
})
