<template>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
            <h1 class="text-center mt-3 text-success">Đăng nhập</h1>
            <div class="row" style="height:55px">
                <div class="col-1"></div>
                <div class="col-10 alert alert-success shadow-sm" role="alert" v-if="isSuccess">Đăng nhập thành công!</div>
                <div class="col-10 alert alert-danger shadow-sm" role="alert" v-if="isFail">Đăng nhập thất bại!</div>
            </div>
            <div class="row">
                <div class="col-1"></div>
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
                        required
                    >
                    <p class="text-start text-danger fw-bolder mt-2 mb-0" v-if="passwordError">Password is invalid</p>
                    <p class="text-white mt-2 mb-0" v-else>.</p>
                    <button
                        type="button"
                        class="mt-4 btn btn-success shadow-sm"
                        @click="login()"
                        :disabled="isRunning"
                    >
                        <div class="spinner-border text-light" role="status" v-if="isRunning">
                            <span class="visually-hidden" style="height: 10px;">Loading...</span>
                        </div>
                        <span v-else>Đăng nhập</span>
                    </button>
                </div>

            </div>
                <div class="row text-center mt-5" style="font-size: 17px;">
                    <span>Bạn chưa có tài khoản?</span>
                    <router-link
                        class="link_register"
                        :to="{
                            name: 'register',
                            params: { moveTo: moveTo }
                        }"
                    >
                        Bấm vào đây để đăng ký
                    </router-link>
                </div>
            <div class="row" style="height:100px"></div>
        </div>
    </div>
</template>

<script>
import { authApi } from '@/api/auth.js'
import { mapActions } from 'vuex'
import util from '@/util/util.js'

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
    components: {
        // FontAwesomeIcon
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
                    if (localStorage.getItem('login')) {
                        localStorage.removeItem('login')
                    }
                    localStorage.setItem('login', JSON.stringify({
                        email: self.email,
                        token: res.access_token
                    }))
                    this.setUser({ email: self.email })
                    // setTimeout(() => {
                    //     if(Object.keys(this.$route.params).length == 0) {
                            this.$router.push('/');
                    //     } else {
                    //         this.$router.push(this.$route.params.moveTo);
                    //     }
                    // }, 1000)
                })
                .catch(() => {
                    self.isFail = true
                    self.isRunning = false
                })
        }
    },
    watch: {
        email(val) {
            this.emailError = !util.validate.isEmail(val)
        },
        password(val) {
            this.passwordError = !util.validate.isPassword(val)
        }
    }
}
</script>

<style scoped>
input {
    outline: none;
}
</style>
