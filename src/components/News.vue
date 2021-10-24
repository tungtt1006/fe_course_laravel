<template>
<div 
    class="row mt-5"
    style="padding-left: 80px;"
>
    <div class="col-md-11">
        <div 
            class="card mb-3 p-0"
            v-for="item in newList"
            :key="item.id"
        >
            <div 
                class="row g-0"
            >
                <div class="col-md-4">
                    <img src="../assets/images/htmlcss.png" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text custom__description">{{ item.description }}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            newList: []
        }
    },
    mounted() {
        axios
          .get('http://localhost/course_laravel/public/api/news/4')
          .then(response => { this.newList = response.data });
    }   
}
</script>

<style scoped>
.custom__description {
    display: -webkit-box;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>