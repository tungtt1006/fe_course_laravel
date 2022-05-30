<template>
  <div id="app" class="container-fluid p-0">
        <notifications group="foo" width="350" position="bottom left" class="noti" />
        <notifications group="error" width="350" position="bottom left" class="error-noti" />
        <TheHeader />
        <div class="container mt-3 shadow bg-white px-4 rounded-3">
            <router-view/>
        </div>
        <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
    name: 'App',
    components: {
        TheHeader,
        TheFooter
    },
    created() {
        this.notifyMe()
    },
    methods: {
        notifyMe() {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification")
            } else if (Notification.permission === "denied") {
                alert("Hãy cho phép mở thông báo")
            }
        }
    }
}
</script>

<style scoped>
#app .noti >>> .vue-notification {
    margin: 20px 5px;
    border-left: 5px solid black;
    border-radius: 3px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
#app .noti >>> .vue-notification {
    background: #0dcaf0;
}
#app .error-noti >>> .vue-notification {
    background: red;
}
</style>
