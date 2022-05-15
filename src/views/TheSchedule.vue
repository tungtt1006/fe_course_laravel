<template>
    <div class="pt-3">
        <h1 class="text-success text-center">Lớp đang học</h1>
        <div class="row mt-4">
            <div class="col-4">
                <p>Tên lớp: <b>{{ theClass.class_name}}</b></p>
                <p>Khóa học: <b>{{ theClass.product.name }}</b></p>
            </div>
            <div class="col-4">
                <p>Ngày mở lớp: <b>{{ theClass.start_day }}</b></p>
                <p>Số buổi: <b>{{ theClass.sessions }}</b></p>
            </div>
            <div class="col-4">
                <p>Thứ học: <b>{{ theClass.days_of_week }}</b></p>
                <p>Thời gian học: <b>{{ theClass.time_in }} ~ {{ theClass.time_out }}</b></p>
            </div>
        </div>
        <div class="row mx-3 mt-4">
            <div class="col"></div>
            <div class="col" v-for="(item, index) in days" :key="index">
                <p class="text-center m-0 fw-normal fw-bolder">{{ getFormatedDate(item) }}</p>
            </div>
            <div class="col"></div>
        </div>
        <div class="row mx-3">
            <div class="col text-center">
                <a href="" @click.prevent="prevWeek()" class="text-success fs-2"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
            </div>
            <div class="col border border-primary p-2" v-for="(item, index) in days" :key="index">
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
</template>

<script>
import { classApi } from '@/api/class.js'
import { periodApi } from '@/api/period.js'
import moment from 'moment';

export default {
    data() {
        return {
            theClass: {},
            from: moment().format('YYYY-MM-DD'),
            to: moment().add('days', 6).format('YYYY-MM-DD'),
            periods: [],
            days: []
        }
    },
    created() {
        this.theClass.product = {}
        this.getLearningClass()
        this.setDays()
    },
    methods: {
        async getLearningClass() {
            let res = await classApi.getLearningClass()
            this.theClass = res.data.data
            this.getPeriods()
        },
        async getPeriods() {
            let res = await periodApi.getPeriods(this.theClass.id, this.from, this.to)
            this.periods = res.data.data
            console.log(this.periods)
        },
        getFormatedDate(date) {
            return moment(date).format('DD/MM')
        },
        setDays() {
            this.days.length = 0
            for (let i = 0; i < 7; i++) {
                this.days.push(moment(this.from).add('days', i).format('YYYY-MM-DD'))
            }
        },
        prevWeek() {
            this.to = moment(this.from).subtract(1, "days").format('YYYY-MM-DD')
            this.from = moment(this.to).subtract(6, "days").format('YYYY-MM-DD')
            this.getPeriods()
            this.setDays()
        },
        nextWeek() {
            this.from = moment(this.to).add('days', 1).format('YYYY-MM-DD')
            this.to = moment(this.from).add('days', 6).format('YYYY-MM-DD')
            this.getPeriods()
            this.setDays()
        }
    }
}
</script>
