<template>
    <div id="app">
        <custom-share></custom-share>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from '@/components/footer';
    import customShareCom from '@/components/index-com/custom-share';
    export default {
        name: 'App',
        components: {
            Footer,
            'custom-share': customShareCom,
        },
        data() {
            return {}
        }
    }
</script>

<style>
    #app {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>