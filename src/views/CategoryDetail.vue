<template>
<div class="pb-3">
    <div class="row">
        <h1 class="mt-2">{{ category.name }}</h1>
        <p>{{ category.description }}</p>
    </div>

    <div class="mx-1 mt-3 py-2 row shadow-sm">
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
        <div class="col-md-6"></div>
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

    <ProductList :products="products"/>

    <div class="row mt-5">
        <h2 class="fw-normal">Các khóa học khác:</h2>
        <div class="col-md-4" v-for="item in categories" :key="item.id">
            <router-link
                class="card shadow-sm text-dark text-decoration-none fw-bold"
                :to="{ name: 'category', params: { id: item.id } }"
                id="another-category"
            >
                <img src="" class="card-img-top" alt="...">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-10">
                            <span class="card-title">{{ item.name }}</span>
                        </div>
                        <div class="col-md-2">
                            <font-awesome-icon :icon="arrowRight" size="lg" font-weight="100" />
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import ProductList from '@/components/Product/ProductList.vue'
import { productApi } from '@/api/product.js'
import { categoryApi } from '@/api/category.js'

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            products: {},
            category: {},
            categories: [],
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
            ],
        }
    },
    created() {
        this.getCategoryProducts()
        this.getAnotherCategory()
    },
    mounted() {
        // let filter = {
        //     parent_id: this.$route.params.id,
        //     name: 'id',
        //     order: 'asc',
        // }
        // this.getAnotherCategory(this.$route.params.id);
    },
    methods: {
        getCategoryProducts() {
            productApi
                .getCategoryProducts(this.$route.params.id)
                .then(response => {
                    this.products = response.data.products
                    this.category = response.data.category
                })
                .catch(error => console.log(error))
        },
        getAnotherCategory() {
            categoryApi
                .getAnotherCategory(this.$route.params.id)
                .then(response => {
                    this.categories = response.data.categories
                })
                .catch(error => console.log(error))
        },
        // sortCourse(x, y) {
        //     let filter = {
        //         parent_id: this.$route.params.id,
        //         name: x.toLowerCase(),
        //         order: y.toLowerCase(),
        //     };
        // }
    },
    watch: {
        '$route.params.id'() {
            // let filter = {
            //     parent_id: val,
            //     name: 'id',
            //     order: 'asc',
            // }
            this.getAnotherCategory()
            this.getCategoryProducts()
        }
    }
}
</script>

<style scoped>
#another-category:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}
</style>
