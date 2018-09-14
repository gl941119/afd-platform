<template>
    <div class="list">
        <div class="list-title">
            <span>第二轮</span>
            <span>1AFDT=0.0001ETH</span>
        </div>
        <div class="list-content">
            <div>
                发行总量</br>
                2000000000000
            </div>
            <div>
                剩余</br>
                1500
            </div>

        </div>
        <van-circle
        v-model="currentRate"
        :rate="70"
        :speed="100"
        :text="text"
        color="red"
        stroke-width="7"
        class="list-circle"
        ></van-circle>
        <div class="list-btn">
            <van-button size="normal" type="danger">参与投资</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "com-list",
        data() {
            return {
                currentRate: 0
            }
        },
        computed: {
            text() {
                return this.currentRate.toFixed(0) + '%'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../assets/css/global.scss';

    .list {
        margin-top: pxTorem(4px);
        width: 100%;
        height: pxTorem(168px);
        position: relative;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-around;*/
        background: white;
        &-title{
            padding-top: pxTorem(14px);
            padding-left: pxTorem(12px);
            span:first-child{
                font-size: 18px;
                color: #333333;
            }
            span:last-child{
                margin-left: pxTorem(12px);
                font-size: 12px;
                color: rgba(0, 0, 0, 0.24);
            }
        }
        &-content {
            margin-top: pxTorem(13px);
            margin-left: pxTorem(32px);
            width: pxTorem(230px);
            font-size: 14px;
            color: #666666;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        &-circle{
            position: absolute;
            top: pxTorem(23px);
            right: pxTorem(23px);
            width: 62px !important;
            height: 62px !important;
        }
        &-btn {
            margin-top: pxTorem(16px);
            text-align: center;
            .van-button {
                width: pxTorem(328px);
                height: pxTorem(44px);
                background: #FF9500;
            }

        }
    }

</style>
