<template>
    <div class="container-fluid pt-4">
        <div class="row">
            <div class="col-md-8">
                <h1>
                    {{ $route.params.detailCourse.name }} 
                </h1>
                <div style="width: 90%;word-wrap:break-word;">
                    {{ $route.params.detailCourse.description }}
                </div>
                <div style="width: 100%;" v-html="$route.params.detailCourse.content">
                </div>
            </div>
            <div class="col-md-4 text-center">
                <img 
                    src="@/assets/images/htmlcss.png" 
                    class="img-fluid mb-3" 
                    alt="Ảnh detail course"
                >
                <span class="fs-3 fw-normal">
                    {{ new Intl.NumberFormat().format($route.params.detailCourse.price) }} VND
                </span>
                <span
                    class="fs-5 fw-light"
                    style="color: darkgray;text-decoration: line-through;"
                >
                    {{ new Intl.NumberFormat().format($route.params.detailCourse.price) }} VND
                </span>
                <btn type="button" class="btn px-5 mt-3 btn__register">
                    Register
                </btn>
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

export default {
    components: {
        // FontAwesomeIcon
    },
    data() {
        return {
            // check: faCheck,
        }
    },
    mounted() {
        
    },
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
      