<template>
    <div class="container-fluid pt-4">
        <div class="row">
            <div class="col-md-8">
                <h1>{{ $route.params.detailCourse.name }}</h1>
                <div 
                    style="width: 90%;word-wrap:break-word;"
                >
                    {{ $route.params.detailCourse.description }}
                </div>
                <h3 class="mt-4">What will you achieve</h3>
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
                <ul style="background-color: blue;list-style-type: none;" class="text-start">
                    <li>Level: Basic</li>
                    <li>Time: Monday & Friday Night</li>
                    <li>Hello</li>
                    <li>Hello</li>
                </ul>
            </div>
        </div>
    </div>
</template>
      
<script>
// import axios from 'axios'

export default {
  data() {
      return {
          
      }
    },
    mounted() {
        
    },
}
</script>
      
<style scoped>
.btn__register {
    background-color: #00c292;
    color: white;
}
</style>
      