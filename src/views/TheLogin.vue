<template>
    <div class="container w-50 pt-4 pb-5">
        <h1 class="text-center mb-4 text-success">Đăng nhập</h1>
        <div class="row d-flex justify-content-center">
            <div class="col-10 alert alert-success shadow-sm" role="alert" v-if="isSuccess">Đăng nhập thành công!</div>
            <div class="col-10 alert alert-danger shadow-sm" role="alert" v-if="isFail">Đăng nhập thất bại!</div>
        </div>
        <form class="row d-flex justify-content-center">
            <div class="col-10 text-center">
                <input
                    type="email"
                    class="w-100 p-2 border-0 border-bottom border-success"
                    v-model="email"
                    placeholder="Email"
                    required
                >
                <p class="text-start text-danger fw-bolder mt-2 mb-0" v-if="emailError">Email is invalid</p>
                <p class="text-white mt-2 mb-0" v-else>.</p>
                <input
                    type="password"
                    class="mt-4 w-100 p-2 border-0 border-bottom border-success"
                    v-model="password"
                    placeholder="Password"
                    autocomplete
                    required
                >
                <p class="text-start text-danger fw-bolder mt-2 mb-0" v-if="passwordError">Password is invalid</p>
                <p class="text-white mt-2 mb-0" v-else>.</p>
                <button
                    type="button"
                    class="mt-4 btn btn-success shadow-sm px-5"
                    @click="login()"
                    :disabled="isRunning"
                >
                    <div class="spinner-border text-light" role="status" v-if="isRunning">
                        <span class="visually-hidden" style="height: 10px;">Loading...</span>
                    </div>
                    <span v-else>Đăng nhập</span>
                </button>
            </div>
        </form>

        <div class="row text-center mt-5 fs-6">
            <span>Bạn chưa có tài khoản?</span>
            <router-link class="link_register text-success" :to="{ name: 'register' }">
                Bấm vào đây để đăng ký
            </router-link>
        </div>
    </div>
</template>

<script>
import { authApi } from '@/api/auth.js'
import { mapActions } from 'vuex'
import { validate, common } from '@/util/util.js'

export default {
    data() {
        return {
            isSuccess: false,
            isFail:false,
            email: 'smraz@example.com',
            password: '12345678',
            res: {},
            isNoti: false,
            moveTo: '',
            emailError: false,
            passwordError: false,
            timeOut: null,
            notiContent: false,
            isRunning: false
        }
    },
    mounted() {
        if(this.$route.params != {}) {
            this.moveTo = this.$route.params.moveTo;
        }
    },
    methods: {
        ...mapActions(['setUser']),
        login() {
            const self = this
            if (self.emailError && self.passwordError) {
                return
            }
            self.isRunning = true
            authApi
                .login({
                    email: self.email,
                    password: self.password
                })
                .then(response => {
                    let res = response.data
                    self.isFail = false
                    self.isSuccess = true
                    common.notify('Đăng nhập thành công!')
                    if (localStorage.getItem('login')) {
                        localStorage.removeItem('login')
                    }
                    localStorage.setItem('login', JSON.stringify({
                        email: self.email,
                        token: res.access_token
                    }))
                    this.setUser({ email: self.email })
                    this.$router.push('/')
                })
                .catch(() => {
                    self.isFail = true
                    self.isRunning = false
                })
        }
    },
    watch: {
        email(val) {
            this.emailError = !validate.isEmail(val)
        },
        password(val) {
            this.passwordError = !validate.isPassword(val)
        }
    }
}
</script>

<style scoped>
input {
    outline: none;
}
</style>
