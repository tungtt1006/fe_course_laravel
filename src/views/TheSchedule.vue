<template>
    <div>
        <h1>Lớp đang học</h1>
        <div class="row">
            <div class="col-5">
                <p>Tên lớp: <b>{{ theClass.class_name}}</b></p>
                <p>Khóa học: <b>{{ theClass.product.name }}</b></p>
                <p>Thứ học: <b>{{ theClass.days_of_week }}</b></p>
            </div>
            <div class="col-5">
                <p>Ngày mở lớp: <b>{{ theClass.start_day }}</b></p>
                <p>Số buổi: <b>{{ theClass.sessions }}</b></p>
                <p>Thời gian học: <b>{{ theClass.time_in }} ~ {{ theClass.time_out }}</b></p>
            </div>
        </div>
    </div>
</template>

<script>
import { classApi } from '@/api/class.js'

export default {
    data() {
        return {
            theClass: null
        }
    },
    created() {
        const self = this
        classApi
            .getLearningClass()
            .then(res => {
                self.theClass = res.data.class
            })
    }
}
</script>
