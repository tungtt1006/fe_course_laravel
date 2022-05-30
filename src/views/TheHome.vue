<template>
    <div class="pb-4">
        <Banner />
        <ProductList :products="hightlightProducts" class="mt-5" />
        <ProductList :products="newestProducts" class="mt-5" />

        <CategoryList />

        <FounderList />
    </div>
</template>

<script>
import Banner from '@/components/TheBanner.vue'
import FounderList from '@/components/FounderList.vue'
import ProductList from '@/components/Product/ProductList.vue'
import CategoryList from '@/components/CategoryList.vue'
import { productApi } from '@/api/product.js'

export default {
    components: {
        Banner,
        ProductList,
        FounderList,
        CategoryList,
    },
    data() {
        return {
            categories: [],
            hightlightProducts: {},
            newestProducts: {},
            data: [
                {
                    name: 'Phạm Xuân Tùng',
                    photo_url: 'https://i.imgur.com/lE89Aey.jpg',
                    content: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for beginners that I've ever seen."
                },
                {
                    name: 'Phạm Minh Tuấn',
                    photo_url: 'https://i.imgur.com/QptVdsp.jpg',
                    content: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for beginners that I've ever seen."
                },
                {
                    name: 'Phạm Văn Lộc',
                    photo_url: 'https://i.imgur.com/jQWThIn.jpg',
                    content: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for beginners that I've ever seen."
                },
            ]
        }
    },
    created() {
        productApi
            .getProducts('hightlight')
            .then(response => {
                this.hightlightProducts = response.data
                this.hightlightProducts.title = "Khóa học nổi bật"
            })
            .catch(error => console.log(error))
        productApi
            .getProducts('newest')
            .then(response => {
                this.newestProducts = response.data
                this.newestProducts.title = "Khóa học mới nhất"
            })
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
.card {
    background-color: #fff;
    border-radius: 10px;
    border: none;
    position: relative;
    margin-bottom: 30px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-cherry {
    background: linear-gradient(to right, #493240, #f09) !important;
    color: #fff;
}

.l-bg-blue-dark {
    background: linear-gradient(to right, #373b44, #4286f4) !important;
    color: #fff;
}

.l-bg-green-dark {
    background: linear-gradient(to right, #0a504a, #38ef7d) !important;
    color: #fff;
}

.l-bg-orange-dark {
    background: linear-gradient(to right, #a86008, #ffba56) !important;
    color: #fff;
}

.card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal {
    font-size: 110px;
}

.card .card-statistic-3 .card-icon {
    text-align: center;
    line-height: 50px;
    margin-left: 15px;
    color: #000;
    position: absolute;
    right: -5px;
    top: 20px;
    opacity: 0.1;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
    color: #fff;
}

.l-bg-orange {
    background: linear-gradient(to right, #f9900e, #ffba56) !important;
    color: #fff;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}
</style>
