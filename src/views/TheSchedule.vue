<template>
    <div class="pt-3 pb-5">
        <h2 class="mt-3 fw-normal">Lớp đã đăng ký</h2>
        <div class="rounded-3 overflow-hidden shadow-sm mt-3">
            <table class="table table-hover m-0 border">
                <thead class="bg-primary bg-opacity-75 text-white text-center">
                    <tr>
                        <th scope="col">Tên lớp</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Giáo viên</th>
                        <th scope="col">Thời gian học</th>
                        <th scope="col">Trạng thái đơn</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="border-top-0">
                    <tr class="text-center" v-for="item in registerClass" :key="item.id">
                        <th>{{ item.class_name }}</th>
                        <td>{{ item.product.name }}</td>
                        <td>{{ item.teacher.name }}</td>
                        <td>{{ item.start_day + ' ~ ' + item.end_day }}</td>
                        <td>
                            <span class="badge rounded-pill bg-success" v-if="item.pivot.status">Đã duyệt</span>
                            <span class="badge rounded-pill bg-danger" v-else>Chưa duyệt</span>
                        </td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="confirmCancel(item.id)"
                                v-if="isCancel(item.end_day)"
                            >
                                Hủy
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2 class="mt-5 fw-normal">Lớp đang học</h2>
        <div v-if="theClass">
            <div class="row mt-4">
                <div class="col-9">
                    <div class="row">
                        <div class="col"></div>
                        <div class="col" v-for="(item, index) in days" :key="index">
                            <p class="text-center m-0 fw-normal fw-bolder">{{ getFormatedDate(item) }}</p>
                        </div>
                        <div class="col"></div>
                    </div>
                    <div class="row mt-2">
                        <div class="col text-center">
                            <a href="" @click.prevent="prevWeek()" class="text-success fs-2"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                        </div>
                        <div class="col border border-success p-2 shadow-sm" v-for="(item, index) in days" :key="index">
                            <p class="text-center m-0 fw-bolder" v-if="periods[item]">Buổi {{ periods[item].number }}</p>
                            <p class="text-center m-0 fw-bolder text-secondary" v-if="periods[item]">
                                {{ periods[item].time_in.slice(0, 5) + ' - ' + periods[item].time_out.slice(0, 5) }}
                            </p>
                        </div>
                        <div class="col text-center">
                            <a href="" @click.prevent="nextWeek()" class="text-success fs-2"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-3 p-0">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            Tên lớp: <span>{{ theClass.class_name}}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            Khóa học: <span>{{ theClass.product.name }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            Ngày mở lớp: <span>{{ theClass.start_day }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            Số buổi: <span>{{ theClass.sessions }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            Thứ học: <span>{{ theClass.days_of_week }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            Thời gian học: <span>{{ theClass.time_in }} ~ {{ theClass.time_out }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="fw-bolder mt-4">- Hiện tại bạn chưa trong lớp học nào</p>
        </div>
    </div>
</template>

<script>
import { classApi } from '@/api/class.js'
import { periodApi } from '@/api/period.js'
import moment from 'moment';

export default {
    data() {
        return {
            theClass: null,
            registerClass: [],
            from: moment().format('YYYY-MM-DD'),
            to: moment().add(6, 'days').format('YYYY-MM-DD'),
            periods: [],
            days: []
        }
    },
    created() {
        this.getLearningClass()
        this.getRegisterClass()
        this.setDays()
    },
    methods: {
        async getRegisterClass() {
            try {
                let res = await classApi.getRegisterClass()
                this.registerClass = res.data.data
            } catch(err) {
                console.log(err)
            }
        },
        async getLearningClass() {
            let res = await classApi.getLearningClass()
            this.theClass = res.data.data
            if (this.theClass) {
                this.getPeriods()
            }
        },
        async getPeriods() {
            let res = await periodApi.getPeriods(this.theClass.id, this.from, this.to)
            this.periods = res.data.data
        },
        getFormatedDate(date) {
            return moment(date).format('DD/MM')
        },
        setDays() {
            this.days.length = 0
            for (let i = 0; i < 7; i++) {
                this.days.push(moment(this.from).add(i, 'days').format('YYYY-MM-DD'))
            }
        },
        prevWeek() {
            this.to = moment(this.from).subtract(1, "days").format('YYYY-MM-DD')
            this.from = moment(this.to).subtract(6, "days").format('YYYY-MM-DD')
            this.getPeriods()
            this.setDays()
        },
        nextWeek() {
            this.from = moment(this.to).add(1, 'days').format('YYYY-MM-DD')
            this.to = moment(this.from).add(6, 'days').format('YYYY-MM-DD')
            this.getPeriods()
            this.setDays()
        },
        confirmCancel(id) {
            if (!confirm('Bạn chắc chắn muốn hủy lớp?')) {
                return
            }
            this.cancelClass(id)
        },
        isCancel(date) {
            if (date == null) {
                return true
            }
            const today = moment().format('L')
            return moment(date).isAfter(today)
        },
        async cancelClass(id) {
            try {
                await classApi.cancelClass(id)
                this.registerClass = this.registerClass.filter(theClass => theClass.id != id)
                if (this.theClass && this.theClass.id === id) {
                    this.theClass = null
                }
                this.$notify({
                    group: 'foo',
                    title: 'Thông báo mới',
                    text: '<h5>Bạn đă hủy lớp thành công. Xác nhận đã được gửi vào hòm thư.</h5>'
                })
            } catch(err) {
                alert(err.response.data.message)
            }
        }
    }
}
</script>
