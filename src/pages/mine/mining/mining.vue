<template>
    <div class="mining">
        <header-nav linkName="mine" class="mining-header" title="挖矿收益明细"></header-nav>
        <div class="mining-totalRenvue">
            <div class="mining-totalRenvue-money">{{balance}}</div>
            <div class="mining-totalRenvue-text">挖矿总收益（AFDT）</div>
        </div>
        <div class="mining-titleBox">
            <div class="mining-titleBox-title">
                <div class="mining-titleBox-title-info">时间</div>
                <div class="mining-titleBox-title-info">描述</div>
                <div class="mining-titleBox-title-info">AFDT</div>
            </div>
        </div>
        <div class="mining-notic" v-if="revenueData.length===0">
            <div>暂无数据</div>
        </div>
        <div class="infoBox" >
            <div class="mining-titleBox-title" v-for="(item, index) in revenueData" :key="index">
                <div class="mining-titleBox-title-info">{{item.createTime}}</div>
                <div class="mining-titleBox-title-info">{{item.desc}}</div>
                <div class="mining-titleBox-title-info">{{item.money}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require';
    import Config from '../../../utils/config.js';
    export default {
        data() {
            return {
                accountId: this.$store.state.id,
                incomeId: this.$store.state.incomeId || Cache.getSession('bire_incomeId'),
                revenueData: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                balance: 0,
            };
        },
        filters: {
            emails: function(value) {
                var reg = /(.{3}).+(@.+)/g;
                if (value) return value.replace(reg, '$1****$2');
            },
        },
        mounted() {
            this.queryRevenue();
            this.queryRevenueBalance();
        },
        methods: {
            queryRevenue(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryRevenue',
                        data: {
                            dataType: 1,
                            page,
                            pageSize,
                            incomeId: this.incomeId,
                        },
                        type: 'get',
                    }).then(res => {
                        this.revenueData = res.data;
                    });
                });
            },
            queryRevenueBalance() {
                Request({
                    url: 'QueryRevenueBalance',
                    data: {
                        dataType: 1,
                    },
                    type: 'get',
                }).then(res => {
                    this.balance = res.data.balance;
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .mining {
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &-totalRenvue{
            margin-top: pxTorem(45px);
            background:rgba(12,60,110,1);
            color: #ffffff;
            font-size: 12px;
            text-align: center;
            &-money{
                font-size: 36px;
                height: pxTorem(50px);
                line-height: pxTorem(50px);
                padding-top: pxTorem(6px);
            }
            &-text{
                height: pxTorem(44px);
            }
        }
        &-titleBox {
            &-title {
                height: pxTorem(40px);
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #D8D8D8;
                background: #ffffff;
                text-align: center;
                &-info {
                    width: 100%;
                }
            }
        }
        .infoBox {
            overflow: hidden;
            overflow-y: scroll;
        }
        &-notic {
            height: calc(100vh - 50px - 40px);
            @include content-flex(center);
        }
        &-bottom {
            padding-top: 10px;
            @extend %load-more;
        }
    }
</style>