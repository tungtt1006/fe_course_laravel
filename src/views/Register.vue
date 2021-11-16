<template>
    <div class="container-fluid pb-5">
        <h1 
            class="text-center pb-3" 
            style="font-weight: 400;"
        >
            -- Welcome to our website --
        </h1>
        <div class="alert alert-success" role="alert" v-show="isSuccess">
            Register Successfully - HELLO !!!!
        </div>
        <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="col-md-6">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" v-model="username">
            </div>
            <div class="col-md-4">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="col-md-4">
                <label class="form-label">Re-enter the password</label>
                <input type="password" class="form-control" v-model="rePassword">
            </div>
            <div class="col-10">
                <label class="form-label">Address</label>
                <input type="text" class="form-control" v-model="address">
            </div>
            <div class="col-6">
                <label class="form-label">Phone Number</label>
                <input type="text" class="form-control" v-model="phoneNumber">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Gender</label>
                <select id="inputState" class="form-select" v-model="gender">
                    <option selected>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                </select>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="signUp()">Sign up</button>
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
            username: '',
            password: '',
            rePassword: '',
            address: '',
            phoneNumber: '',
            gender: '',
            res: {},
            isSuccess: false
        }     
    },
    methods: {
        ...mapActions(['setUser']),
        signUp() {
            if(this.password === this.rePassword) {
                axios
                .post("http://localhost/course_laravel/public/api/register", {
                    username: this.username,
                    email: this.email,
                    phonenumber: this.phoneNumber,
                    password: this.password,
                    gender: this.gender,
                    address: this.address
                })
                .then(response => { 
                    this.res = response.data;
                    if(this.res.status == "200") {
                        this.isSuccess = true;
                        this.setUser(this.username);
                    }
                });
            } else {
                alert("Re-enter password is wrong");
                this.rePassword = "";
                this.password = "";
            }
        }
    }
}
</script>

<style>

</style>
  