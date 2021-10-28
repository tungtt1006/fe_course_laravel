<template>
<div class="row text-center mt-2">
    <h1 class="mb-0">{{ item.name }}</h1>
    <span class="mb-0">
        <router-link 
            class="seemore-text" 
            :to="{ name: 'category', params: { id: item.id, name: item.name } }"
        >
            See more 
            <font-awesome-icon :icon="arrowRight" size="xs" font-weight="500" />
        </router-link>
    </span>
    <div class="row">
        <CourseItem v-for="item in courseList"
            :key="item.id"
            :item="item"    
        >
        </CourseItem>
    </div>
</div>
</template>
  
<script>
import CourseItem from '@/components/CourseItem.vue'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default {
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    components: {
        CourseItem,
        FontAwesomeIcon
    },
    data() {
      return {
          arrowRight: faArrowRight,
          courseList: []
      }
    },
    mounted() {
        axios
          .get('http://localhost/course_laravel/public/api/categories/show/' + this.item.id)
          .then(response => { this.courseList = response.data });
    },
    methods: {
    },
}
</script>
  
<style>
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
  