<template>
    <div class="bg-white">
        <nav class="navbar navbar-expand-sm">
            <div class="col-md-8">
                <h1 class="ps-3 m-0 fw-bolder text-success">&lt;!--XT--&gt;</h1>
            </div>
            <div class="col-md-2 ps-3">
                <p class="m-0 fw-thin">Email</p>
                <p class="m-0 fs-5 fw-normal">team13@gmail.com</p>
            </div>
            <div class="col-md-2 ps-5">
                <p class="m-0 fw-thin">Điện thoại</p>
                <p class="m-0 fs-5 fw-normal">0968.68.68.68</p>
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg bg-success">
            <div class="container-fluid">
                <a class="navbar-brand text-white" href="">Trang chủ</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-white" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Khóa học
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li v-for="item in categories" :key="item.id">
                                    <router-link class="dropdown-item" :to="{ name: 'category', params: { id: item.id } }">
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="">Tin tức</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="">Giới thiệu</a>
                        </li>
                    </ul>
                </div>
                <div class="pe-3" v-if="Object.keys(user).length !== 0">
                    <a class="text-white text-decoration-none" href="">{{ user.email }} / </a>
                    <a class="text-white text-decoration-none" href="" @click.prevent="logout()">Đăng xuất</a>
                </div>
                <div class="pe-3" v-else>
                    <router-link class="text-white text-decoration-none" :to="{ name: 'login' }">Đăng nhập / </router-link>
                    <a class="text-white text-decoration-none" href="">Đăng kí</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { categoryApi } from '@/api/category.js'
import { authApi } from '@/api/auth.js'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            categories: [],
        }
    },
    created() {
        let login = JSON.parse(localStorage.getItem('login'))
        if (login) {
            this.setUser({ email: login.email })
        }
        categoryApi
            .getCategory()
            .then(response => {
                this.categories = response.data.categories
            })
            .catch(error => alert(error))
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        ...mapActions(['setUser']),
        logout() {
            if (Object.keys(this.user).length !== 0) {
                authApi
                    .logout()
                    .then(response => {
                        console.log(response.data)
                        localStorage.removeItem('login')
                        this.setUser({})
                    })
                    .catch(() => {

                    })
            }
        }
    },
}
</script>