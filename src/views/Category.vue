<template>
<div>
    <div class="row">
        <h1 class="mt-2 text-center">{{ category.name }}</h1>
        <!-- <div class="col-md-3" style="over-flow:hidden">
            <span style="font-size: 10px;">{{ category.description }}</span>
        </div> -->
    </div>
    <div class="mx-1 py-2 row filter-row">
            <div 
                class="btn-group btn-group-sm col-md-2"
                v-for="(item, index) in listFilter"
                :key="index"
            >
                <button 
                    class="btn btn-outline-success dropdown-toggle btn-filter" 
                    type="button" 
                    :id="index" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    {{ item.title }}
                </button>
                <ul class="dropdown-menu" :aria-labelledby="index">
                    <li v-for="(subItem, subIndex) in item.type" :key="subIndex + 'h'">
                        <button class="dropdown-item" type="button">{{ subItem }}</button>
                    </li>
                </ul>
            </div>
    </div>
    <div class="row mt-3">
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
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    components: {
        CourseItem,
    },
    data() {
        return {
            category: {},
            listFilter: [
                { 
                    title: 'Name',
                    type: ['A-Z', 'Z-A'] 
                },
                {
                    title: 'Price',
                    type: ['ASC', 'DESC']
                },
                {
                    title: 'Discount',
                    type: ['ASC', 'DESC']
                }
            ]
        }
    },
    mounted() {
        this.getCourselist(this.$route.params.id);
        axios
            .get('http://localhost/course_laravel/public/api/categories/' + this.$route.params.id)
            .then(response => { this.category = response.data });
        },
    methods: {
        ...mapActions(['getCourselist'])
    },
    computed: {
        ...mapGetters(['courseList'])
    }
}
</script>

<style scoped>
.filter-row {
    background-color: #f2f2f2;
}
.btn-filter {
    border-radius: 0px;
}
</style>
    