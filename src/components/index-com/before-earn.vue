<template>
    <div class="earn">
        <div class="earn-title">
            <span>昨日收益</span>
            <img @click="$router.push({name: 'project'})" src="..//../assets/imgs/img/flow.png">
        </div>
        <div class="earn-number">
            <template v-if="num">
                <span class="earn-number-num">{{num}}</span>
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
    import Request from '../../utils/require.js';
    export default {
        data() {
            return {
                num: null,
            };
        },
        computed: {
            token() {
                return this.$store.state.token;
            },
        },
        mounted() {
            if (this.token) {
                this.getEarn();
            }
        },
        methods: {
            getEarn() {
                Request({
                    url: 'QueryBeforeEarn',
                    type: 'get',
                    data: {
                        dataType: 0,
                    },
                }).then(res => {
                    this.num = this.toDecimal2(res.data.balance);
                });
            },
            toDecimal2(x) {
                const f = parseFloat(x);
                if (isNaN(f)) {
                    return x;
                }
                const s = f.toString();
                const rs = s.indexOf('.');
                if (rs < 0) {
                    return s;
                }
                return s.substring(0, rs + 3);
            },
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