<template>
<div class="pb-3">
    <div class="row">
        <h1 class="mt-2 text-center fw-normal">News</h1>
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
                        @click="sortNew(item.title, subItem.order)"
                    >
                        {{ subItem.name }}
                    </button>
                </li>
            </ul>
        </div>
    </div>

    <div class="row mt-3">
        <News
                v-for="item in newList"
                :key="item.id" 
                :item="item" 
        />
    </div>

    <div class="row mt-3">
        <div class="col-md-5"></div>
        <div class="col-md-2">
            <nav aria-label="Page navigation example">
                <ul class="pagination m-0">
                    <li v-for="(item, index) in links" :key="index" class="page-item">
                        <a 
                            v-if="index > 0 && index < links.length-1"  
                            class="page-link"
                            :style="(item.active == false) ? 'color:#00c292;' : 'color:white;background-color:#00c292;'"
                            @click="getNews(item.label, type, order)"
                        >
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
</template>
    
<script>
import axios from 'axios'
import News from '@/components/News.vue'

export default {
    components: {
        News
    },
    data() {
        return {
            newList: [],
            listFilter: [
                { 
                    title: 'Name',
                    type: [
                        { name: 'A-Z', order: 'asc' }, 
                        { name: 'Z-A', order: 'desc' }
                    ] 
                },
                {
                    title: 'Time',
                    type: [
                        { name: 'Oldest', order: 'asc' },
                        { name: 'Newest', order: 'desc' }
                    ]
                },
            ],
            links: [],
            currentPage: 1,
            type: '',
            order: '',
        }
    },
    mounted() {
       this.type = 'created_at';
       this.order = 'desc';
       this.getNews(1, this.type, this.order); 
    },
    methods: {
        getNews(page, type, order) {
            axios
            .get('http://localhost/course_laravel/public/api/newslist?page=' + page + '&type=' + type + '&order=' + order)
            .then(response => { 
                this.newList     = response.data.data; 
                this.links       = response.data.links;
                this.currentPage = response.data.current_page;
            });
        },
        sortNew(type, order) {
            if(type == 'Name') {
                this.type = 'name';
            } else if(type == 'Time') {
                this.type = 'created_at';
            }
            this.order = order;
            this.getNews(this.currentPage, this.type, this.order);
        }
    },
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
    font-size: 15px;
    font-weight: 500;
    color: black;
    text-decoration: none;
}
</style>
        