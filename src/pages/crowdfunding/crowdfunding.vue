<template>
    <div class="crowd">
        <div class="crowd-header">
            <div class="crowd-input">
                <input v-model="inputValue" class="crowd-input-item" type="text">
                <i class="crowd-input-icon custom-vant-icon-fangdajing"></i>
            </div>
        </div>
        <div class="crowd-content">
            <p class="crowd-content-text">即将上线</p>
            <p>敬请期待</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                inputValue: '',
            };
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .crowd {
        width: 100%;
        background: #FAFAFA;
        padding-bottom: 50px;
        margin-top: 50px;
        &-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: #0C3C6E;
            @include content-flex(center);
        }
        &-input {
            position: relative;
            width: pxTorem(312px);
            &-item {
                width: 100%;
                @extend %custom-input;
                padding-left: 36px;
            }
            &-icon {
                position: absolute;
                top: 0px;
                left: 18px;
                font-size: 24px;
                color: #D8D8D8;
            }
        }
    }

    .crowd-content {
        width: 100%;
        background: #F5F5F5;
        height: calc(100vh - 100px);
        p {
            font-size: 16px;
            text-align: center;
        }
        &-text {
            padding-top: pxTorem(195px);
        }
    }
</style>