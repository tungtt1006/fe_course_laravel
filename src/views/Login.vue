<template>
    <div class="container-fluid pb-5">
        <h1 
            class="text-center pb-3" 
            style="font-weight: 400;"
        >
            -- Welcome back bro --
        </h1>
        <div class="pt-3" style="width: 60%;margin-left: 350px;height: 380px;">
            <div class="row g-3">
                <div class="col-md-7">
                    <input type="email" class="form-control form-control-lg" v-model="email" placeholder="Enter your email">
                </div>
                <div class="col-md-7">
                    <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Enter your password">
                </div>
                <div class="col-md-7">
                    <button type="button" class="btn btn_login" @click="signIn()">Sign in</button>
                </div>
            </div>
        </div>
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
            isSuccess: false
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
                        this.setUser(this.res.customer.username);
                        this.$router.push('/');
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
</style>
  