<template>
    <div style="background-color: white;">
        <h1 
            class="text-center pb-3 pt-3" 
            style="font-weight: 400;"
        >
            Chào mừng tới <span style="color:#00c292">&lt;!--XT--&gt;</span>
        </h1>
        <h3 
            style="font-weight: 400;" 
            class="text-center"
            v-if="isNoti"
        >
            <span 
                class="noti_respond" 
                style="background-color: #80ff00;"
                v-if="notiContent"
            >
                <font-awesome-icon :icon="faCheck" style="color:#00c292;" />
            </span>
            <span 
                class="noti_respond" 
                style="background-color: #ff4d4d;"
                v-else
            >
                <font-awesome-icon :icon="faTimes" style="color:#e60000;" />
            </span>
        </h3>
        <div class="pt-3" style="width:50%;margin:auto;">
            <div class="row"> 
                <div class="col-12 input__custom">
                    <input type="email"  v-model="email" placeholder="Email@gmail.com" required>
                    <template v-if="isTypingEmail">
                        <span 
                            class="status-input"  
                            :style="{ 'color': emailError ? 'red' : 'chartreuse' }"
                        >
                            *
                        </span>
                        <span class="status-input" v-if="false">
                            <font-awesome-icon :icon="faCheck" size="xs" style="color:#00c292;" />
                        </span>
                    </template>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 input__custom">
                    <input type="password" class="input__custom" v-model="password" placeholder="********" required>
                    <template v-if="isTypingPassword">
                        <span 
                            class="status-input"  
                            :style="{ 'color': passwordError ? 'red' : 'chartreuse' }"
                        >
                            *
                        </span>
                    </template>
                </div>
            </div>
            <div class="row mt-5">
                <button 
                    type="button" 
                    class="btn btn_login" 
                    @click="signIn()"
                    :disabled="isRunning"
                >
                    Đăng nhập
                </button>
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
        </div>
        <div class="row" style="height:100px"></div>
    </div>
</template>
  
<script>
import { authApi } from '@/api/auth.js'
import { mapActions } from 'vuex'
import util from '@/util/util.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
    data() {
        return {
            faCheck: faCheck,
            faTimes: faTimes,
            email: '',
            password: '',
            res: {},
            isNoti: false,
            moveTo: '',
            emailError: false,
            passwordError: false,
            timeOut: null,
            isTypingEmail: false,
            isTypingPassword: false,
            notiContent: false,
            isRunning: false
        }     
    },
    components: {
        FontAwesomeIcon
    },
    mounted() {
        if(this.$route.params != {}) {
            this.moveTo = this.$route.params.moveTo;
        }
    },
    methods: {
        ...mapActions(['setUser']),
        signIn() {
            const self = this
            self.isRunning = true

            if(self.emailError && self.passwordError) return

            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                let k = {
                    email: self.email,
                    password: self.password
                }
                authApi.login(k).then(response => { 
                    if(response.status == 200) {
                        let res = response.data

                        const user = JSON.stringify(res.user);
                        localStorage.setItem('user', user);
                        const jwt = JSON.stringify(res.access_token);
                        localStorage.setItem('jwt', jwt);
                        this.setUser(res.user);

                        self.isNoti = true
                        self.notiContent = true
                        setTimeout(() => {
                            if(Object.keys(this.$route.params).length == 0) {
                                this.$router.push('/');
                            } else {
                                this.$router.push(this.$route.params.moveTo);
                            }
                        }, 1000)
                    } 
                }).catch(() => {
                    self.isRunning = false
                    self.isNoti = true
                    self.notiContent = false
                    // self.email = ''
                    self.password = ''
                })
            }, 300);
        }
    },
    watch: {
        email(val) {
            this.isTypingEmail = true
            if(!util.validate.validateEmail(val)) {
                this.emailError = true
            } else {
                this.emailError = false
            }
        },
        password(val) {
            this.isTypingPassword = true
            if(!util.validate.validatePassword(val)) {
                this.passwordError = true
            } else {
                this.passwordError = false
            }
        }
    }
}
</script>

<style scoped>
.input__custom {
    position: relative;
}
.input__custom input {
    font-size: 20px;
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid #00c292;
}
.input__custom .status-input {
    position: absolute;
    right: 0;
    top: 5px;
    font-size: 25px;
}
.btn_login {
    background-color: #00c292;
    color: white;
    margin: auto;
    width: 30%;
    border-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.btn_login:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.link_register {
    color: #00c292;
    text-decoration: none;
}
.link_register:hover {
    text-decoration: underline;
}
.noti_respond {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    font-size: 35px;
    font-weight: 400;
    padding: 5px 10px;
    border-radius: 50%;
}
</style>
  