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
              <input type="email" class="form-control" v-model="email" required>
            </div>
            <div class="col-md-2">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="name">
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
                <button type="button" class="btn btn_register" @click="signUp()">Sign up</button>
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
            name: '',
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
        validateEmail(mail) {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line 
            if (pattern.test(mail)) {
                return true;
            } else {
                return false;
            }
        },
        validatePassword(password) {
            const pattern = /^-?[\d.]+(?:e-?\d+)?$/; //eslint-disable-line 
            if (pattern.test(password) && password.length >= 8 && password.length < 11) {
                return true;
            } else {
                return false;
            }
        },
        signUp() { 
            const self = this;
            if(self.validatePassword(self.phoneNumber) && self.validateEmail(self.email) && self.name != '' && self.username != ''&& self.email != ''&& self.phoneNumber != ''&& self.password != ''&& self.gender != ''&& self.address) {
                let k = {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    phonenumber: this.phoneNumber,
                    password: this.password,
                    gender: this.gender,
                    address: this.address
                }
                if(this.password === this.rePassword && self.password.length >=8) {
                    axios
                    .post("http://localhost/course_laravel/public/api/register", {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        phonenumber: this.phoneNumber,
                        password: this.password,
                        gender: this.gender,
                        address: this.address
                    })
                    .then(() => { 
                            this.isSuccess = true;
                            const user = JSON.stringify(k);
                            localStorage.setItem('user', user);
                            self.setUser(k);
                            setTimeout(() => {
                                this.isSuccess = false;
                            }, 1000);
                            if(Object.keys(self.$route.params).length == 0) {
                                self.$router.push('/');
                            } else {
                                self.$router.push(self.$route.params.moveTo);
                            }
                    });
                } else {
                    alert("Enter password is wrong");
                    this.rePassword = "";
                    this.password = "";
                }
            } else {
                alert("Fill in the black please");
            }
        }
    }
}
</script>

<style scoped>
.btn_register {
    background-color: #00c292;
    color: white;
    padding: 5px 35px;
}
</style>
  