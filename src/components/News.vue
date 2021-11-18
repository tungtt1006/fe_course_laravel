<template>
<div 
    class="row mt-5 py-5"
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
                    <img :src="require(`@/assets/images/${item.photo}`)" class="img-fluid rounded-start" alt="...">
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
    <router-link class="seemore-text text-center" 
        :to="{ name: 'news' }">
        More news here
        <font-awesome-icon :icon="arrowRight" size="xs" font-weight="500" />
    </router-link>
</div>
</template>

<script>
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default {
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            arrowRight: faArrowRight,
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
.seemore-text {
    font-size: 22px;
    color: black;
    text-decoration: none;
}
.seemore-text:hover {
    text-decoration: underline;
    color:black;
}
</style>