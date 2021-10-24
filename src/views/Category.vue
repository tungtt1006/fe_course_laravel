<template>
<div class="pb-3">
    <div class="row">
        <h1 class="mt-2 text-center fw-normal">{{ category.name }}</h1>
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
                class="btn dropdown-toggle btn-filter" 
                type="button" 
                :id="index" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
            >
                {{ item.title }}
            </button>
            <ul class="dropdown-menu" :aria-labelledby="index">
                <li v-for="(subItem, subIndex) in item.type" :key="subIndex + 'h'">
                    <button 
                        class="dropdown-item" 
                        type="button" 
                        @click="sortCourse(item.title, subItem.order)"
                    >
                        {{ subItem.name }}
                    </button>
                </li>
            </ul>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2">
            <nav aria-label="Page navigation example">
                <ul class="pagination m-0 pagination-sm">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
            </nav>
        </div>
    </div>

    <div class="row mt-3 text-center">
        <CourseItem v-for="item in courseList"
            :key="item.id"
            :item="item"    
        >
        </CourseItem>
    </div>

    <div class="row mt-4">
        <h2 class="fw-light">Another Course:</h2>
        <div class="col-md-4" v-for="item in category" :key="item.id">
            <div class="card">
                <img src="@/assets/images/htmlcss.png" class="card-img-top" alt="...">
                <router-link 
                    class="card-body" 
                    :to="{ name: 'category', params: { id: item.id } }"
                >
                <!-- <div class="card-body"> -->
                    <div class="row">
                        <div class="col-md-10">
                            <span class="card-title card__category_title">{{ item.name }}</span>
                        </div>
                        <div class="col-md-2">
                            <font-awesome-icon :icon="arrowRight" size="lg" font-weight="200" />
                        </div>      
                    </div>
                <!-- </div> -->
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CourseItem from '@/components/CourseItem.vue'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default {
    components: {
        CourseItem,
        FontAwesomeIcon
    },
    data() {
        return {
            arrowRight: faArrowRight,
            category: [],
            listFilter: [
                { 
                    title: 'Name',
                    type: [
                        { name: 'A-Z', order: 'asc' }, 
                        { name: 'Z-A', order: 'desc' }
                    ] 
                },
                {
                    title: 'Price',
                    type: [
                        { name: 'ASC', order: 'asc' },
                        { name: 'DESC', order: 'desc' }
                    ]
                },
                {
                    title: 'Discount',
                    type: [
                        { name: 'ASC', order: 'asc' },
                        { name: 'DESC', order: 'desc' }
                    ]
                }
            ],
        }
    },
    mounted() {
        let filter = {
            parent_id: this.$route.params.id,
            name: 'id',
            order: 'asc',
        }
        this.getCourselist(filter);
        axios
            .get('http://localhost/course_laravel/public/api/categories?exceptId=' + this.$route.params.id)
            .then(response => { this.category = response.data });
        },
    methods: {
        ...mapActions(['getCourselist']),
        sortCourse(x, y) {
            let filter = {
                parent_id: this.$route.params.id,
                name: x.toLowerCase(),
                order: y.toLowerCase(),
            };
            this.getCourselist(filter);
        }
    },
    computed: {
        ...mapGetters(['courseList'])
    }
}
</script>

<style scoped>
.btn:focus {
    box-shadow: none;
}
.filter-row {
    background-color: #f2f2f2;
}
.btn-filter {
    background-color: white;
    border: 1px solid #00c292;
}
.card__category_title {
    font-size: 20px;
    font-weight: 600;
    color: black;
    text-decoration: none;
}
</style>
    