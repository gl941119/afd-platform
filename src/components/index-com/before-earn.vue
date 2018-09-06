<template>
    <div class="earn">
        <div class="earn-title">
            <span>昨日收益</span>
            <img @click="$router.push({name: 'project'})" src="..//../assets/imgs/img/flow.png">
        </div>
        <div class="earn-number">
            <template v-if="num">
                <span class="earn-number-num">66</span>
                <span class="earn-number-symbol">AFDT</span>
            </template>
            <span v-else class="earn-number-num">---</span>
        </div>
        <div class="earn-btn">
            <van-button class="earn-btn-round" type="warning">立即去挖矿</van-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                num: '',
            };
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .earn {
        width: 100%;
        margin: 4px 0;
        background: #fff;
        @include remCalc(padding, 10, 24, 17);

        &-title {
            @include content-flex(space-between, flex-end);

            span {
                color: #666;
                font-size: 18px;
            }
        }

        &-number {
            height: pxTorem(75px);
            text-align: center;
            color: #FF9500;

            &-num {
                font-size: pxTorem(54px);
                line-height: pxTorem(75px);
            }

            &-symbol {
                transform: scale(0.875);
                display: inline-block;
            }
        }

        &-btn {
            text-align: center;

            &-round {
                font-size: pxTorem(18px);
                width: pxTorem(262px);
                height: pxTorem(40px);
                line-height: pxTorem(40px);
                border-radius: 20px;
            }
        }

    }
</style>