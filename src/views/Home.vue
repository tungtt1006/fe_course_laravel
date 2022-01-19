<template>
    <div 
        class="container-fluid"
        style="background-color: white;"
    >
        <Banners />
        
        <h1 class="mt-3 title_category">Khóa học nổi bật</h1>
        <div class="pb-2" style="margin:auto;overflow-x:auto;width: 95%;">
            <div style="width: 1850px;">
                <CourseList :course-array="hightlightCourses" />
            </div>
        </div>

        <h1 class="mt-5 title_category">Khóa học mới nhất</h1>
        <div class="pb-2" style="margin:auto;overflow-x:auto;width: 95%;">
            <div style="width: 1850px;">
                <CourseList :course-array="newestCourses" />
            </div>
        </div>
        
        <div 
            class="row mt-5 py-5"
            style="padding-left: 80px;"
        >
            <News
                v-for="item in newList"
                :key="item.id" 
                :item="item" 
            />
            <router-link class="seemore-text text-center" 
                :to="{ name: 'newslist' }">
                More news here
                <font-awesome-icon :icon="arrowRight" size="xs" font-weight="500" />
            </router-link>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'
import CourseList from '@/components/CourseList.vue'
import Banners from '@/components/Banners.vue'
import News from '@/components/News.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { courseApi } from '@/api/course.js'
import { newsApi } from '@/api/news.js'

export default {
    components: {
        CourseList,
        Banners,
        News,
        FontAwesomeIcon
    },
    data() {
        return {
            newList: [],
            arrowRight: faArrowRight,
            hightlightCourses: [],
            newestCourses: []
        }
    },
    created() {
        courseApi.getHightlightCourse(6).then(response => { 
            this.hightlightCourses = response.data
        })
        courseApi.getNewestCourse(6).then(response => { 
            this.newestCourses = response.data
        })
        newsApi.getNewsHome(4).then(response => { 
            this.newList = response.data 
        })
    },
    mounted() {
        this.getCategorylist();
    },
    methods: {
        ...mapActions(['getCategorylist'])
    },
    computed: {
        ...mapGetters(['categoryList'])
    }
}
</script>

<style scoped>
.seemore-text {
    font-size: 22px;
    color: black;
    text-decoration: none;
}
.seemore-text:hover {
    text-decoration: underline;
    color:black;
}
.title_category {
    font-weight: 500;
    font-size: 35px;
    margin-left: 25px;
}
::-webkit-scrollbar {
    height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
    background: white; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
</style>
  