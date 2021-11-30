<template>
    <div class="container-fluid pt-4">
        <div v-if="isLoading" class="text-center" style="height: 400px;padding-top: 150px;">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            <h1 class="fw-light" style="color:#00c292">Waiting a second</h1>
        </div>
        <div class="row" v-show="!isLoading">
            <div class="col-md-8">
                <div class="alert alert-success" role="alert" v-show="isSuccess">
                    Register Successfully - Check your mail now!!!!
                </div>
                <h1>
                    {{ course.name }} 
                </h1>
                <div style="width: 90%;word-wrap:break-word;">
                    {{ course.description }}
                </div>
                <div style="width: 100%;" v-html="course.content">
                </div>
            </div>
            <div class="col-md-4 text-center">
                <img 
                    :src="require(`@/assets/images/${course.photo}`)" 
                    class="img-fluid mb-3" 
                    alt="Ảnh detail course"
                    style="border: 1px solid lightgray"
                >
                <span class="fs-3 fw-normal" v-if="isShow">
                    {{ new Intl.NumberFormat().format(course.price * (100-course.discount) /100) }} VND
                </span>
                <span class="fs-3 fw-normal" v-else>
                    {{ new Intl.NumberFormat().format(newPrice) }} VND
                </span>
                <span
                    class="fs-5 fw-light"
                    style="color: darkgray;text-decoration: line-through;"
                >
                    {{ new Intl.NumberFormat().format(course.price) }} VND
                </span>
                <template v-if="Object.keys(user).length != 0" >
                    <btn 
                        type="button" 
                        class="btn px-5 mt-3 btn__register"
                        @click="registerCourse()"
                    >
                        <span>Register</span>
                    </btn>
                    <div class="row mt-3">
                        <div class="col-md-9 p-0">
                            <input 
                                type="text" 
                                class="form-control"  
                                :placeholder="placeholder"
                                v-model="code"
                                :disabled="isDisableCode"
                            >
                        </div>
                        <div class="col-md-3 p-0">
                            <button type="button" class="btn btn-outline-success" @click="sendCode()">
                                <font-awesome-icon :icon="tags" font-weight="500" />
                            </button>
                        </div>
                    </div>
                </template>
                <router-link 
                    v-else 
                    class="btn px-5 mt-3 btn__register" 
                    :to="{ 
                        name: 'login', 
                        params: { moveTo: '/detailcourse/' + $route.params.id } 
                    }"
                >
                    Sign in
                </router-link>  
                <ul 
                    style="list-style-type: none;font-size: 20px;margin-left: 65px;" 
                    class="text-start mt-4"
                >
                    <li> Level: <span class="fw-normal">Basic</span>
                    </li>
                    <li>Days: <span class="fw-normal">2 & 4 & 6</span></li>
                    <li>Time: <span class="fw-normal">6 p.m</span></li>
                    <li>Teacher: <span class="fw-normal">Nam</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
      
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { mapGetters } from 'vuex'

export default {
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            tags: faTags,
            course: {},
            isSuccess: false,
            code: '',
            placeholder: 'Enter your code here',
            discountNumber: '',
            isShow: true,
            newPrice: 0,
            discountId: 0,
            timeOut: null,
            isDisableCode: false,
            isLoading: false
        }
    },
    created() {
        axios
          .get('http://localhost/course_laravel/public/api/product/' + this.$route.params.id)
          .then(response => { this.course = response.data });
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        registerCourse() {
            clearTimeout(this.timeOut);
            this.isLoading = true;
            this.timeOut = setTimeout(() => {
                axios
                .post('http://localhost/course_laravel/public/api/order/store', {
                    product_id: this.course.id,
                    customer_id: this.user.id,
                    discount_id: this.discountId,
                    price: this.isShow == true ? (this.course.price * (100-this.course.discount) /100) : this.newPrice
                })
                .then(response => { 
                    let res = response.data;
                    if(res.status == "200") { 
                        this.isShow = true;
                        this.isSuccess = true;
                        this.isDisableCode = false;
                        this.isLoading = false;
                    }
               });
            }, 300);
        },
        sendCode() {
            if(this.code != '') {
                clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    axios
                    .get('http://localhost/course_laravel/public/api/discount/'+ this.user.id + '/' + this.code)
                    .then(response => { 
                        let res = response.data;
                        if(res.status == 200) {
                            if(res.price == null) {
                                alert("Your code has been used");
                                this.code = '';
                                return;
                            } else {
                                this.newPrice = this.course.price * (100-this.course.discount) /100;
                                this.discountId = res.price.id; 

                                if(res.price.condition == 2) {
                                    this.newPrice = this.newPrice - res.price.number;
                                } else if(res.price.condition == 1) {
                                    this.newPrice = this.newPrice * (100 - res.price.number) /100;
                                }

                                this.isShow = false;
                                this.isDisableCode = true;
                                this.code = '';
                            }
                        } else {
                            this.placeholder = "Your code is wrong";
                            this.code = "";
                        }
                    });
                }, 300)
            } else {
                return;
            }
        }
    }
}
</script>
      
<style scoped>
.table td h4 {
    font-size: 10px !important;
}
.btn__register {
    background-color: #00c292;
    color: white;
}
</style>
      