import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () =>
                import(/* webpackChunkName: "home" */ "../views/Home.vue")
        },
        {
            path: '/category/:id',
            name: 'category',
            component: () =>
                import(/* webpackChunkName: "category" */ "../views/Category.vue")
        },
        {
            path: '/news',
            name: 'news',
            component: () =>
                import(/* webpackChunkName: "news" */ "../views/News.vue")
        },
        {
            path: '/detailcourse/:id',
            name: 'detailcourse',
            component: () =>
                import(/* webpackChunkName: "detailcourse" */ "../views/DetailCourse.vue")
        },
    ]
})