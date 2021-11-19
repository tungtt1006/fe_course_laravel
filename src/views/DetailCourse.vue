<template>
    <div class="container-fluid pt-4">
        <div class="row">
            <div class="col-md-8">
                <div class="alert alert-success" role="alert" v-show="isSuccess">
                    Register Successfully - HELLO !!!!
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
                        Register
                    </btn>
                    <div class="row mt-3">
                        <div class="col-md-9 p-0">
                            <input 
                                type="text" 
                                class="form-control"  
                                :placeholder="placeholder"
                                v-model="code"
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
            newPrice: 0
        }
    },
    mounted() {
        axios
          .get('http://localhost/course_laravel/public/api/product/' + this.$route.params.id)
          .then(response => { this.course = response.data });
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        registerCourse() {
            axios
              .post('http://localhost/course_laravel/public/api/order/store', {
                product_id: this.course.id,
                customer_id: this.user.id,
                discount_id: "1",
                price: this.isShow == true ? this.course.price : this.newPrice
              })
              .then(response => { 
                  let res = response.data;
                  if(res.status == "200") { 
                      this.isShow = true;
                      this.isSuccess = true;
                  }
               });
        },
        sendCode() {
            axios
              .get('http://localhost/course_laravel/public/api/discount/' + this.code)
              .then(response => { 
                  let res = response.data;
                  if(res.status == 200) {
                    this.newPrice = this.course.price * (100-this.course.discount) /100;
                    if(res.price.condition == 1) {
                        this.newPrice = this.newPrice - res.price.number;
                    } else {
                        this.newPrice = this.newPrice * (100 - res.price.number) /100;
                    }
                    this.isShow = false;
                  } else {
                      this.placeholder = "Your code is wrong";
                      this.code = "";
                  }
               });
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
      