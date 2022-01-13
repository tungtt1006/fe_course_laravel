<template>
    <div
        class="container"
        style="background-color:white;width: 60%;"
    >
        <h1 
            class="text-center pb-3 pt-3" 
            style="font-weight: 400;"
        >
            Chào mừng tới <span style="color:#00c292">&lt;!--XT--&gt;</span>
        </h1>
        <div class="row ps-5" style="height:55px;">
            <div 
                class="alert alert-success mh-100 alert_custom" 
                role="alert" 
                v-if="isSuccess"
            >
                Đăng nhập thành công
            </div>
            <div 
                class="alert alert-danger alert_custom" 
                role="alert"
                v-if="isFail"
            >
                Đăng nhập thất bại
            </div>
        </div>
        <div class="mt-1" style="width:50%;margin:auto;">
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
                    <div class="spinner-border text-light" role="status" v-if="isRunning">
                        <span class="visually-hidden" style="height: 10px;">Loading...</span>
                    </div>
                    <span v-else>Đăng nhập</span>
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

export default {
    data() {
        return {
            isSuccess: false,
            isFail: false,
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
        // FontAwesomeIcon
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

            if(self.emailError && self.passwordError) return
            
            self.isRunning = true
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                let k = {
                    email: self.email,
                    password: self.password
                }
                authApi.login(k).then(response => { 
                    if(response.status == 200) {
                        let res = response.data

                        // const user = JSON.stringify(res.user);
                        // localStorage.setItem('user', user);
                        // const jwt = JSON.stringify(res.access_token);
                        // localStorage.setItem('jwt', jwt);
                        // this.setUser(res.user);
                        console.log(res);
                        self.isSuccess = true
                        self.isFail = false
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
                    self.isFail = true
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
.alert_custom {
    width: 90%;
}
</style>
  