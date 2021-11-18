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
                    src="@/assets/images/htmlcss.png" 
                    class="img-fluid mb-3" 
                    alt="Ảnh detail course"
                >
                <span class="fs-3 fw-normal">
                    {{ new Intl.NumberFormat().format(course.price * (100-course.discount) /100) }} VND
                </span>
                <span
                    class="fs-5 fw-light"
                    style="color: darkgray;text-decoration: line-through;"
                >
                    {{ new Intl.NumberFormat().format(course.price) }} VND
                </span>
                <btn 
                    v-if="Object.keys(user).length != 0" 
                    type="button" 
                    class="btn px-5 mt-3 btn__register"
                    @click="registerCourse()"
                >
                    Register
                </btn>
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
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { mapGetters } from 'vuex'

export default {
    components: {
        // FontAwesomeIcon
    },
    data() {
        return {
            // check: faCheck,
            course: {},
            isSuccess: false,
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
                price: this.course.price
              })
              .then(response => { 
                  this.isSuccess = response.data 
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
      