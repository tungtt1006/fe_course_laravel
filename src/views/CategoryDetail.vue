<template>
<div class="py-3">
    <div class="row">
        <h1 class="mt-2 display-4 text-success">{{ category.name }}</h1>
        <p>{{ category.description }}</p>
    </div>

    <div class="w-100 mt-3 d-flex align-items-end">
        <div class="flex-grow-1">
            <button
                v-for="(item, index) in listFilter"
                :key="index"
                class="btn rounded-pill bg-opacity-50 shadow-sm me-3"
                :class="[(active == index) ? 'btn-success' : 'btn-outline-success']"
                type="button"
                @click="getCategoryProducts(item.type, item.order, index)"
            >
                {{ item.title }}
            </button>
        </div>
        <button
            class="btn btn-lg p-0 me-2"
            type="button"
            v-if="prevUrl !== ''"
            @click="prevPage()"
        >
            <i class="fa fa-arrow-circle-left fs-1 text-success" aria-hidden="true"></i>
        </button>
        <button
            class="btn btn-lg p-0 me-2"
            type="button"
            v-if="nextUrl !== ''"
            @click="nextPage()"
        >
            <i class="fa fa-arrow-circle-right fs-1 text-success" aria-hidden="true"></i>
        </button>
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
                <img :src="item.photoUrl" class="card-img-top border" alt="...">
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <span class="card-title fs-5">{{ item.name }}</span>
                        </div>
                        <div class="col-md-2">
                            <i class="fa fa-arrow-right fs-5" aria-hidden="true"></i>
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
import axios from 'axios'

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            products: {},
            category: {},
            categories: [],
            active: -1,
            nextUrl: '',
            prevUrl: '',
            listFilter: [
                { title: 'Giá thấp nhất', type: 'price', order: 'asc' },
                { title: 'Mới nhất', type: 'created_at', order: 'desc' },
                { title: 'Nổi bật nhất', type: 'hot', order: 'desc' },
            ],
        }
    },
    created() {
        this.getCategoryProducts()
        this.getAnotherCategory()
    },
    methods: {
        async getCategoryProducts(type = this.listFilter[0].type, order = this.listFilter[0].order, index = 0) {
            try {
                const res = await productApi.getCategoryProducts(this.$route.params.id, type, order)
                this.handleData(res.data)
                this.active = index
            } catch(err) {
                console.log(err)
            }
        },
        async getAnotherCategory() {
            try {
                const res = await categoryApi.getAnotherCategory(this.$route.params.id)
                this.categories = res.data.categories
            } catch(err) {
                console.log(err)
            }
        },
        handleData(res) {
            this.products = res.products
            this.category = res.category
            this.nextUrl = this.products.next_page_url ?? ''
            this.prevUrl = this.products.prev_page_url ?? ''
        },
        getOrder() {
            const filter = this.listFilter.filter((filter, index) => this.active === index)
            return '&type=' + filter[0].type + '&order=' + filter[0].order
        },
        async nextPage() {
            const res = await axios.get(this.nextUrl + this.getOrder())
            this.handleData(res.data)
        },
        async prevPage() {
            const res = await axios.get(this.prevUrl + this.getOrder())
            this.handleData(res.data)
        }
    },
    watch: {
        '$route.params.id'() {
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
