<template>
    <div class="col product-item mt-2">
        <router-link class="card text-black text-decoration-none shadow-sm position-relative" :to="{ name: 'product', params: { id: item.id } }">
            <span
                class="badge bg-danger position-absolute shadow p-2"
                v-if="item.discount > 0"
                style="top: 5px; left: 5px;"
            >
                -{{ item.discount }}%
            </span>
            <img :src="item.photo_url" class="card-img-top border-bottom" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text product-item-description">{{ item.description }}</p>
                <div v-if="item.discount">
                    <p class="mt-5 mb-0 text-decoration-line-through text-muted">{{ formatNumber(item.price) }} VND</p>
                    <p class="mt-0 fs-5 fw-bolder text-success">{{ discountPrice }} VND</p>
                </div>
                <div v-else>
                    <p class="mt-5 fs-4 pt-3 fw-bolder text-success">{{ formatNumber(item.price) }} VND</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    props: {
        item: {
            type: Object,
            default: null
        },
    },
    computed: {
        discountPrice() {
            let discountPrice = this.item.price * ((100 - this.item.discount) / 100)
            return this.formatNumber(discountPrice)
        }
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat().format(number)
        }
    },
}
</script>

<style scoped>
a:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}
.product-item .product-item-description {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>
