<template>
    <div class="nav">
        <router-link v-if="linkName" class="nav-link" :to="{name: linkName}">
            <i class="custom-mint-icon-arrowr"></i>
        </router-link>
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
    @import '../../assets/css/global.scss';
    .nav {
        height: 44px;
        padding: 0 14px;
        @include content-flex();
        background: #ffffff;
        margin-bottom: 10px;
        &-link {
            height: 100%;
            padding: 0 10px;
            margin-left: -14px;
            color: #979797;
            @include content-flex(center);
        }
        &-text {
            flex: auto;
            text-align: center;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
        }
    }
</style>