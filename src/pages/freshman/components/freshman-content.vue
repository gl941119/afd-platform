<template>
    <div class="freshman-content">
        <van-collapse v-model="activeNames">
                <van-collapse-item v-for="data of problemData" :key="data.id" :border="false" :is-link="false" icon="arrow" :title="data.title" :name="data.id">
                    <span v-html="data.content"></span>
                </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>
    import problemData from './problem.js';
    export default {
        name: 'FreshmanContent',
        data() {
            return {
                activeNames: [],
                problemData,
            };
        },
    };
</script>
<style lang="scss">
    @import '~@/assets/css/global.scss';

    // freshman collpase
    .freshman-content {
        .van-collapse-item {
            margin-bottom: pxTorem(15px);
        }
        .van-cell__left-icon {
            line-height: 20px;
            font-size: 12px;
        }
        .van-cell {
            background-color: #F2E5BB;
            line-height: 20px;
            color: #666;
            padding: 0;
            padding-left: pxTorem(25px);
            padding-right: pxTorem(16px);
            margin-bottom: pxTorem(10px);
        }

        .van-collapse-item__content {
            padding: 0;
            background-color: #F2E5BB;
            color: #333;
            font-size: 14px;
            line-height: 20px;
            padding-left: pxTorem(41px);
            padding-right: pxTorem(16px);
        }
    }
</style>