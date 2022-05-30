<template>
    <div class="row mt-5">
        <h1 class="fw-normal fs-2 mb-3">Danh mục khóa học</h1>
        <router-link
            :to="{ name: 'category', params: { id: item.id } }"
            class="col-3 text-decoration-none"
            v-for="(item, index) in categories"
            :key="item.id"
        >
            <div class="card l-bg-cherry text-white border" :class="backgroundColorName[index]">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fa fa-graduation-cap" aria-hidden="true"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">{{ item.name }}</h5>
                    </div>
                    <div class="row align-items-center d-flex p-2">
                        <div class="col">
                            <h4 class="category-description fw-bolder">{{ item.description }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { categoryApi } from '@/api/category.js'

export default {
    data() {
        return {
            categories: [],
            backgroundColorName: [
                'l-bg-cherry',
                'l-bg-blue-dark',
                'l-bg-green-dark',
                'l-bg-orange-dark',
                'l-bg-cyan',
                'l-bg-green',
                'l-bg-orange',
            ],
        }
    },
    created() {
        this.getCategory()
    },
    methods: {
        async getCategory() {
            try {
                const res = await categoryApi.getCategory()
                this.categories = res.data.categories
            } catch(err) {
                alert(err)
            }
        },
    }
}
</script>

<style scoped>
.category-description {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.card {
    border-radius: 10px;
    border: none;
    position: relative;
    margin-bottom: 30px;
}
.card:hover {
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-cherry {
    background: linear-gradient(to right, #493240, #f09) !important;
}

.l-bg-blue-dark {
    background: linear-gradient(to right, #373b44, #4286f4) !important;
}

.l-bg-green-dark {
    background: linear-gradient(to right, #0a504a, #38ef7d) !important;
}

.l-bg-orange-dark {
    background: linear-gradient(to right, #a86008, #ffba56) !important;
}

.card .card-statistic-3 .card-icon-large .fa {
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
}

.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
}

.l-bg-orange {
    background: linear-gradient(to right, #f9900e, #ffba56) !important;
}
</style>
