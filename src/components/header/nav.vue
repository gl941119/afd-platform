<template>
    <div class="nav" :class="{'blue-background': isBlue}">
        <router-link v-if="linkName" class="nav-link" :to="{name: linkName}">
            <i class="nav-text custom-vant-icon-fanhui2"></i>
        </router-link>
        <a v-else @click="$router.go(-1)" class="nav-link" href="javascript:;">
            <i class="nav-text custom-vant-icon-fanhui2"></i>
        </a>
        <div class="nav-text">{{title}}</div>
        <router-link v-if="skipName" class="nav-skip" :to="{name: skipName, query: {redirect: query}}">
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
            'query',
        ],
        data() {
            return {};
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .nav {
        height: pxTorem(45px);
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
            i {
                font-size: pxTorem(26px);
            }
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