<template>
    <div class="nav">
        <i class="custom-mint-icon-arrowr"></i>
        <div class="nav-text">{{title}}</div>
    </div>
</template>
<script>
    export default {
        name: 'HeaderNav',
        props: ['linkName', 'title'],
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .nav {
        height: 54px;
        &-text {
            text-align: center;
        }
    }
</style>