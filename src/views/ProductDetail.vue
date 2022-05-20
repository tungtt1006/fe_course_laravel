<template>
    <div id="product-detail">
        <div v-if="isLoading" class="text-center" style="height: 400px;padding-top: 150px;">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            <h1 class="fw-light text-success">Waiting a second</h1>
        </div>
        <div class="row pb-4" v-show="!isLoading">
            <div class="col-8">
                <div class="alert alert-success" role="alert" v-show="isSuccess">
                    Register Successfully - Check your mail now!!!!
                </div>

                <h1 class="mt-4 fw-bolder text-success">{{ product.name }}</h1>
                <div class="w-100 text-break">{{ product.description }}</div>

                <h2 class="mt-5 fw-normal">Nội dung khóa học</h2>
                <div class="w-100">
                    <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample" v-if="product.content.length > 0">
                        <div
                            class="accordion-item"
                            v-for="(item, index) in product.content"
                            :key="item.id"
                        >
                            <h2 class="accordion-header">
                                <button
                                    class="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    :data-bs-target="'#panelsStayOpen-collapse' + index"
                                    aria-expanded="true"
                                    :aria-controls="'panelsStayOpen-collapse' + index"
                                >
                                    <span class="badge rounded-pill bg-success fs-6 me-2">Chương {{ index + 1 }}</span>
                                    <b class="text-dark">{{ item.title }}</b>
                                </button>
                            </h2>
                            <div :id="'panelsStayOpen-collapse' + index" class="accordion-collapse collapse ps-5" :aria-labelledby="'panelsStayOpen-heading' + index">
                                <div class="accordion-body border-start border-success">
                                    <ul class="list-group">
                                        <li
                                            class="list-group-item border-0"
                                            v-for="(subItem, subIndex) in item.content"
                                            :key="subIndex"
                                        >
                                            &#9989; {{ subItem }}
                                        </li>
                                      </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-else><b>- Sẽ được cập nhật trong thời gian tới ...</b></p>
                </div>

                <h2 class="mt-5 fw-normal">Chứng chỉ sau khóa học</h2>
                <div class="row mt-3" v-if="certificate">
                    <div class="col-4">
                        <img :src="certificate.photo" class="card-img-top shadow-sm border border-success" alt="...">
                    </div>
                    <div class="col-8 text-center">
                    <h3 class="mt-3">{{ certificate.name }}</h3>
                    <p class="text-start">{{ certificate.description }}</p>
                    </div>
                </div>
                <p v-else><b>- Sẽ được cập nhật trong thời gian tới ...</b></p>
            </div>

            <div class="col-4 p-4">
                <div class="card border-0" v-if="theClass">
                    <img :src="product.photo_url" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <p class="card-text fs-4 text-muted text-decoration-line-through m-0">{{ new Intl.NumberFormat().format(product.price) }} VND</p>
                        <h3 class="card-title m-0">{{ new Intl.NumberFormat().format(product.price) }} VND</h3>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item border-0">Số buổi: <b class="fs-5">{{ theClass.sessions }}</b></li>
                        <li class="list-group-item border-0">Giáo viên: <b class="fs-5">{{ teacher.name }}</b></li>
                        <li class="list-group-item border-0">Thứ học: <b class="fs-5">{{ theClass.days_of_week }}</b></li>
                        <li class="list-group-item border-0">Giờ học: <b class="fs-5">{{ theClass.time_in }} ~ {{ theClass.time_out }}</b></li>
                        <li class="list-group-item border-0">Dự kiến bắt đầu: <b class="fs-5">{{ theClass.start_day }}</b></li>
                    </ul>
                    <div class="card-body text-center">
                        <button type="button" class="btn btn-success w-100" @click="registerProduct()">Đăng kí học</button>
                    </div>
                </div>
                <div class="card border-0" v-else>
                    <img :src="product.photo_url" class="card-img-top shadow-sm" alt="...">
                    <div class="card-body text-center mt-3">
                        <button type="button" class="btn btn-warning w-100 shadow-sm" @click="setNotify()">Nhận thông báo khi có lớp mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { productApi } from '@/api/product.js'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            product: {
                content: []
            },
            isSuccess: false,
            theClass: null,
            teacher: {},
            certificate: {},
            code: '',
            placeholder: 'Enter your code here',
            discountNumber: '',
            isShow: true,
            newPrice: 0,
            discountId: 0,
            timeOut: null,
            isDisableCode: false,
            isLoading: false
        }
    },
    created() {
        this.getProduct()
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        async getProduct() {
            try {
                const res = await productApi.getProduct(this.$route.params.id)
                this.product = res.data.data.product
                this.theClass = res.data.data.class
                this.teacher = this.theClass?.teacher
                this.certificate = this.product?.certificate

                if (this.product.content && typeof this.product.content  == "string") {
                    this.product.content = JSON.parse(this.product.content)
                }

            } catch(err) {
                console.log(err)
            }
        },
        registerProduct() {
            if (Object.keys(this.user).length === 0) {
                alert("Bạn chưa đăng nhập")
                this.$router.push('/login')
                return
            }
            clearTimeout(this.timeOut)
            this.isLoading = true
            this.timeOut = setTimeout(() => {
                productApi
                    .registerProduct({
                        class_id: this.theClass.id,
                    })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        alert(error.response.data.message)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            }, 300)
        },
        setNotify() {
            alert("Tạo thông báo")
        }
    }
}
</script>

<style scoped>
#product-detail >>> .accordion-button:not(.collapsed) {
    background-color: white;
}
#product-detail >>> .accordion-button:focus {
    box-shadow: none;
}
</style>
