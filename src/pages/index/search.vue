<template>
    <div class="search-page">
        <div class="search-page-header">
            <div class="search-page-input">
                <input autofocus class="search-page-input-item" type="text">
                <i class="search-page-input-icon custom-mint-icon-sousuo"></i>
            </div>
            <router-link class="search-page-link" :to="{name: 'index'}">取消</router-link>
        </div>
        <div>
            <p>项目概念</p>
            <div>
                <mt-badge size="normal">10</mt-badge>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'IndexSearch',
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .search-page {
        width: 100%;
        &-header {
            height: 44px;
            @include content-flex(space-around);
        }
        &-input {
            position: relative;
            width: pxTorem(310px);
            &-item {
                width: 100%;
                @extend %custom-input;
                padding-left: 36px;
            }
            &-icon {
                position: absolute;
                top: 4px;
                left: 8px;
                color: #8E8E93;
            }
        }
        &-link {
            padding: 6px;
            color: #333;
            font-size: 12px;
        }
    }
</style>