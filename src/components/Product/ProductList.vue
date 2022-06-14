<template>
    <div class="mt-3">
        <div class="row">
            <div class="col-10">
                <h1 v-if="products.title" class="fw-normal fs-2">{{ products.title }}</h1>
            </div>
            <div class="col-2 mt-3 fs-5"  v-if="products.seeAll">
                <router-link
                    :to="{name:'products_newest'}"
                    class="text-decoration-none text-dark"
                >
                    Xem tất cả <i class="fa fa-angle-right ms-3" aria-hidden="true"></i>
                </router-link>
            </div>
        </div>
        <div class="row row-cols-4">
            <ProductItem v-for="item in products.data" :key="item.name" :item="item"/>
        </div>
    </div>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
    props: {
        products: {
            type: Object,
            default: () => []
        },
    },
    components: {
        ProductItem
    },
}
</script>
