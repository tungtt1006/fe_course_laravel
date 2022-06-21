<template>
<div class="py-3">
    <div class="container pb-4">
        <div class="row text-center">
            <div class="col-lg-8 mx-auto">
                <h1 class="display-4 text-success">Giáo viên</h1>
                <p class="lead mb-0">Đội ngũ giáo viên chất lượng cao, trình độ đỉnh của chóp, có nhiều năm kinh nghiệm.</p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-6" v-for="item in teachers" :key="item.id">
                <div class="card mb-3 shadow-sm card-teacher">
                    <div class="row g-0">
                        <div class="col-4 d-flex align-items-center ps-3">
                            <img
                                :src="item.photo_url"
                                class="rounded-circle img-thumbnail w-75 h-75"
                                alt="Fail avatar"
                            >
                        </div>
                        <div class="col-8">
                            <div class="card-body pb-1">
                                <h5 class="card-title">{{ item.name }}</h5>
                                <div
                                    class="w-100 overflow-auto mt-3"
                                    v-html="item.description"
                                    style="height: 120px;"
                                >
                                </div>
                                <ul class="list-inline mt-2">
                                    <li class="list-inline-item">
                                        <a href="#" target="_blank" title="twitter"><i class="fs-4 fa fa-twitter text-success"></i></a>
                                    </li>
                                    <li class="list-inline-item ms-2">
                                        <a href="#" target="_blank" title="facebook"><i class="fs-4 fa fa-facebook text-success"></i></a>
                                    </li>
                                    <li class="list-inline-item ms-2">
                                        <a href="#" target="_blank" title="instagram"><i class="fs-4 fa fa-instagram text-success"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { teacherApi } from '@/api/teacher.js'

export default {
    data() {
        return {
            teachers: []
        }
    },
    created() {
        this.getTeachers()
    },
    methods: {
        async getTeachers() {
            const res = await teacherApi.getTeachers()
            this.teachers = res.data.data.data
        }
    }
}
</script>

<style scoped>
.card-teacher p.description {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 20px;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
</style>
