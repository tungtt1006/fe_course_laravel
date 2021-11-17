<template>
    <div class="container-fluid pb-5">
        <h1 
            class="text-center pb-3 pt-3" 
            style="font-weight: 400;"
        >
            -- Welcome to <span style="color:#00c292">KOURSES</span> --
        </h1>
        <div class="pt-3" style="width: 60%;margin-left: 350px;">
            <div class="row g-3">
                <div class="col-md-7">
                    <input type="email" class="form-control form-control-lg" v-model="email" placeholder="Enter your email">
                </div>
                <div class="col-md-7">
                    <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Enter your password">
                </div>
                <div class="col-md-7 mt-4">
                    <button type="button" class="btn btn_login" @click="signIn()">Sign in</button>
                </div>
            </div>
        </div>
        <div class="row text-center mt-4">
            <span>Don't have an account? </span>
            <router-link 
                class="text-center link_register"
                :to="{ 
                    name: 'register',
                    params: { moveTo: moveTo } 
                }"
            >
                Register here
            </router-link>
        </div>
        <div class="row" style="height:100px"></div>
    </div>
</template>
  
<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            email: '',
            password: '',
            res: {},
            isSuccess: false,
            moveTo: ''
        }     
    },
    mounted() {
        if(this.$route.params != {}) {
            this.moveTo = this.$route.params.moveTo;
        }
    },
    methods: {
        ...mapActions(['setUser']),
        signIn() {
            if(this.password != '') {
                axios
                .post("http://localhost/course_laravel/public/api/login", {
                    email: this.email,
                    password: this.password
                })
                .then(response => { 
                    this.res = response.data;
                    if(this.res.status == "200") {
                        this.isSuccess = true;
                        this.setUser(this.res.customer);
                        if(Object.keys(this.$route.params).length == 0) {
                            this.$router.push('/');
                        } else {
                            this.$router.push(this.$route.params.moveTo);
                        }
                    }
                });
            } else {
                alert("Enter your password");
            }
        }
    }
}
</script>

<style scoped>
.btn_login {
    background-color: #00c292;
    color: white;
    padding: 5px 35px;
    margin-left: 130px;
}
.link_register {
    color: #00c292;
    text-decoration: none;
}
</style>
  