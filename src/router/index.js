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
            path: '/products/newest',
            name: 'products_newest',
            component: () =>
                import(/* webpackChunkName: "detailcourse" */ "../views/NewestProducts.vue")
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ "../views/TheLogin.vue")
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import(/* webpackChunkName: "register" */ "../views/TheRegister.vue")
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
        {
            path: '/teachers',
            name: 'teachers',
            component: () =>
                import(/* webpackChunkName: "teachers" */ "../views/TeacherList.vue")
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import(/* webpackChunkName: "about" */ "../views/AboutUs.vue")
        }
    ]
})
