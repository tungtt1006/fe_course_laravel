<template>
<div class="pt-4 pb-5">
    <div class="row">
        <h1 class="mt-2 display-4 text-success text-center">Khóa học mới nhất</h1>
    </div>

    <div class="w-100 mt-3 d-flex align-items-end">
        <div class="flex-grow-1">
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

    <ProductList :products="products" />
</div>
</template>

<script>
import ProductList from '@/components/Product/ProductList.vue'
import { productApi } from '@/api/product.js'
import axios from 'axios'

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            products: {},
            nextUrl: '',
            prevUrl: '',
        }
    },
    created() {
        this.getNewestProducts()
    },
    methods: {
        async getNewestProducts() {
            try {
                const res = await productApi.getNewestProducts(8)
                this.handleData(res.data.data)
            } catch(err) {
                console.log(err)
            }
        },
        handleData(res) {
            this.products = res
            this.nextUrl = this.products.next_page_url ?? ''
            this.prevUrl = this.products.prev_page_url ?? ''
        },
        async nextPage() {
            const res = await axios.get(this.nextUrl + '&page_size=8')
            this.handleData(res.data.data)
        },
        async prevPage() {
            const res = await axios.get(this.prevUrl + '&page_size=8')
            this.handleData(res.data.data)
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
