<template>
    <div class="nav">
        <router-link v-if="linkName" class="nav-link" :to="{name: linkName}">
            <i class="custom-vant-icon-arrowr"></i>
        </router-link>
        <a v-else @click="$router.go(-1)" class="nav-link" href="javacript:;">
            <i class="custom-vant-icon-arrowr"></i>
        </a>
        <div class="nav-text">{{title}}</div>
    </div>
</template>
<script>
    export default {
        name: 'HeaderNav',
        props: [
            'linkName', 'title',
        ],
        data() {
            return {};
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .nav {
        height: pxTorem(44px);
        @include remCalc(padding, 0, 14px);
        @include content-flex();
        background:rgba(12,60,110,1);
        color: #FFFFFF;
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        &-link {
            height: 100%;
            @include remCalc(padding, 0, 10px);
            margin-left: pxTorem(-14px);
            color: #FFFFFF;
            @include content-flex(center);
        }
        &-text {
            flex: auto;
            text-align: center;
            font-size: 16px;
        }
    }
</style>