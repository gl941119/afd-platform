<template>
    <div class="nav" :class="{'blue-background': isBlue}">
        <router-link v-if="linkName" class="nav-link" :to="{name: linkName}">
            <img v-if="!isBlue" src="../../assets/imgs/img/return.png">
            <img v-else src="../../assets/imgs/img/return-white.png">
        </router-link>
        <a v-else @click="$router.go(-1)" class="nav-link" href="javascript:;">
            <img v-if="!isBlue" src="../../assets/imgs/img/return.png">
            <img v-else src="../../assets/imgs/img/return-white.png">
        </a>
        <div class="nav-text">{{title}}</div>
        <router-link v-if="skipName" class="nav-skip" :to="{name: skipName}">
            {{skipTitle}}
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'HeaderNav',
        props: [
            'linkName',
            'title',
            'skipName',
            'skipTitle',
            'isBlue',
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
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;

        &-link {
            height: 100%;
            @include remCalc(padding, 0, 10px);
            margin-left: pxTorem(-14px);
            @include content-flex(center);
        }

        &-text {
            flex: auto;
            text-align: center;
            font-size: 16px;
            color: #303030;
            font-weight: bold;
        }
        &-skip {
            font-size: 14px;
            color: #3B98FC;
        }
        &.blue-background {
            background:rgba(12,60,110,1);
            .nav-text {
                color: #FFF;
            }
        }
    }
</style>