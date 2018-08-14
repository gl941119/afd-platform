<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from './pages/footer';
    import Header from './pages/header';
    export default {
        name: 'App',
        components: {
            Footer,
            Header
        },
        data() {
            return {

            }
        },
        methods: {

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