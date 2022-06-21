<template>
    <div class="bg-white shadow">
        <nav class="navbar navbar-expand-sm">
            <div class="col-md-8">
                <h1 class="ps-3 m-0 fw-bolder text-success">XT</h1>
            </div>
            <div class="col-md-2 ps-3">
                <p class="m-0 fw-thin">Email</p>
                <p class="m-0 fs-5 fw-bolder">toilatung52@gmail.com</p>
            </div>
            <div class="col-md-2 ps-5">
                <p class="m-0 fw-n">Điện thoại</p>
                <p class="m-0 fs-5 fw-bolder">(+84) 989842021</p>
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg bg-success">
            <div class="container-fluid">
                <router-link class="navbar-brand text-white" :to="{ name: 'home' }">Trang chủ</router-link>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-white" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Danh mục
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
                            <router-link class="nav-link text-white" :to="{ name: 'teachers' }">Giáo viên</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link text-white" :to="{ name: 'about' }">Giới thiệu</router-link>
                        </li>
                    </ul>
                </div>
                <div class="pe-3" v-if="Object.keys(user).length !== 0">
                    <div class="dropdown">
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ user.email }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'profile' }">Thông tin cá nhân</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'schedule' }">Lịch học</router-link>
                            </li>
                            <li><a class="dropdown-item" type="button" href="#" @click.prevent="logout()">Đăng xuất</a></li>
                        </ul>
                    </div>
                    <a class="text-white text-decoration-none" href="" @click.prevent="logout()"></a>
                </div>
                <div class="pe-3" v-else>
                    <router-link class="text-white text-decoration-none" :to="{ name: 'login' }">Đăng nhập / </router-link>
                    <router-link class="text-white text-decoration-none" :to="{ name: 'register' }">Đăng kí</router-link>
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
        this.checkAuth()
        this.getCategory()
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        ...mapActions(['setUser']),
        async checkAuth() {
            try {
                await authApi.authHealth()
                let login = JSON.parse(localStorage.getItem('login'))
                this.setUser({ email: login.email })
            } catch(err) {
                console.log(err)
            }
        },
        async getCategory() {
            try {
                const res = await categoryApi.getCategory()
                this.categories = res.data.categories
            } catch(err) {
                alert(err)
            }
        },
        async logout() {
            const email = this.user.email
            try {
                this.setUser({})
                await authApi.logout()
                this.$notify({
                    group: 'foo',
                    title: 'Thông báo mới',
                    text: '<h5>Đăng xuất thành công!</h5>'
                })
                const routes = [
                    process.env.VUE_APP_URL + '/schedule',
                    process.env.VUE_APP_URL + '/profile',
                ]
                if (routes.includes(window.location.href)) {
                    this.$router.push('/')
                }
                localStorage.removeItem('login')
            } catch(err) {
                this.setUser({ email: email})
                console.log(err)
            }
        }
    },
}
</script>
