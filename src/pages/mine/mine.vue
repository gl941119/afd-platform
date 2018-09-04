<template>
    <div class="mine">
        <div class="mine-top">
            <div class="mine-top-info">
                <div class="mine-top-info-img" @click="userInfo()">
                    <img :src="headUrl">
                </div>
                <span class="mine-top-info-nickname" @click="userInfo()">昵称：{{nickname}}</span>
            </div>
            <div class="mine-top-money">
                <div class="mine-top-money-title">总资产（AFDT）</div>
                <div class="mine-top-money-large">{{balance}}</div>
            </div>
            <div class="mine-top-money kind">
                <div>
                    <div class="mine-top-money-title">昨日收益（AFDT）</div>
                    <div class="mine-top-money-large">{{yesterdayBalance}}</div>
                </div>
                <div>
                    <div class="mine-top-money-title">累计收益（AFDT）</div>
                    <div class="mine-top-money-large">{{totalRevenue}}</div>
                </div>
            </div>
            <div class="mine-top-records" @click="goRecords()">
                <i class="custom-vant-icon-jiaoyijilu1"></i><span>交易记录</span>
            </div>
        </div>
        <div class="mine-purse">
            <div class="mine-purse-money">
                <div class="mine-purse-money-commom">账户余额（AFDT）</div>
                <div class="mine-purse-money-commom moneyNumber">{{balance}}</div>
            </div>
            <button class="mine-purse-button" type="primary" @click="withdraw()">提现</button>
        </div>
        <div class="mine-item">
            <van-cell class="mine-item-kind common first" is-link to="/revenue">
                <van-icon slot="icon">
                    <i class="custom-vant-icon-qianbao fonts red"></i>
                </van-icon>
                <template slot="title">
                    <span class="van-cell-text">矿主收益</span>
                </template>
            </van-cell>
            <van-cell class="mine-item-kind common last" is-link to="/mining">
                <van-icon slot="icon">
                    <i class="custom-vant-icon-ziyuan fonts orange"></i>
                </van-icon>
                <template slot="title">
                    <span class="van-cell-text">挖矿收益</span>
                </template>
            </van-cell>
        </div>
        <van-cell class="mine_last" icon="shop" is-link to="/account">
            <van-icon slot="icon">
                <i class="custom-vant-icon-shezhi fonts"></i>
            </van-icon>
            <template slot="title">
                <span class="van-cell-text">账号与安全</span>
            </template>
        </van-cell>
    </div>
</template>
<script>
    import Request from '../../utils/require';
    import Cache from '../../utils/cache.js';
    export default {
        data() {
            return {
                headUrl: this.$store.state.heardUrl || 'https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png',
                nickname: this.$store.state.usernickname || this.$store.state.username,
                accountId: this.$store.state.id,
                balance: '',
                totalRevenue: '',
                yesterdayBalance: '',
            };
        },
        mounted() {
            this.basicInformation();
        },
        methods: {
            withdraw() {
                console.log('withdraw');
            },
            goRecords() {
                this.$router.push({
                    name: 'transaction',
                });
            },
            userInfo() {
                this.$router.push({
                    name: 'information',
                });
            },
            basicInformation() {
                Request({
                    url: 'QueryRevenueBasicInformation',
                    data: { accountId: this.accountId },
                    type: 'get',
                }).then(res => {
                    this.balance = res.data.balance;
                    this.totalRevenue = res.data.totalRevenue;
                    this.yesterdayBalance = res.data.yesterdayBalance;
                    this.$store.commit('setIncomeId', res.data.id);
                    Cache.setSession('bire_incomeId', res.data.id);
                });
            },

        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .mine {
        background: #fafafa;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;

        &-top {
            height: pxTorem(193px);
            background: #0c3c6e;
            @include remCalc(padding, 0, 24px);
            color: #ffffff;
            font-size: 13px;
            margin-bottom: pxTorem(10px);
            &-info {
                margin-bottom: pxTorem(20px);
                position: relative;

                &-img {
                    width: pxTorem(46px);
                    height: pxTorem(46px);
                    margin-top: pxTorem(16px);

                    img {
                        width: pxTorem(46px);
                        height: pxTorem(46px);
                        border-radius: 50%;
                        display: inline-block;
                        margin-right: pxTorem(13px);
                        vertical-align: middle;
                    }
                }

                &-nickname {
                    font-size: 12px;
                    position: absolute;
                    top: 29px;
                    left: 58px;
                }
            }

            &-money {
                &.kind {
                    margin-top: pxTorem(16px);
                    display: flex;
                    justify-content: space-between;

                    >div {
                        width: pxTorem(140px);
                    }
                }

                &-title {
                    height: pxTorem(18px);
                    line-height: 18px;
                }

                &-large {
                    font-size: 18px;
                    height: 25px;
                    line-height: 25px;
                }
            }
            &-records{
                position: absolute;
                top: 16px;
                right: 15px;
                color: #ffffff;
                font-size: 13px;
                i{
                    font-size: 24px;
                    margin-right: 6px;
                    vertical-align: middle;
                }
                span{
                    height: pxTorem(24px);
                    line-height: 24px;
                }
            }
        }
        &-purse{
            height: pxTorem(55px);
            background:rgba(255,255,255,1);
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: pxTorem(10px);
            display: flex;
            justify-content: space-between;
            padding: 12px 16px 0 21px;
            &-money{
                &-commom{
                    height:20px;
                    font-size:14px;
                    color:rgba(169,169,169,1);
                    line-height:20px;
                    &.moneyNumber{
                        color:rgba(255,149,0,1);
                    }
                }
            }
            &-button{
                width:63px;
                height:30px;
                border:1px solid rgba(255,149,0,1);
                background: transparent;
                font-size:16px;
                color:rgba(255,149,0,1);
            }
        }
        &-item {
            margin-bottom: pxTorem(10px);

            &-kind {
                font-size: 17px;
                color: rgba(0, 0, 0, 1);
                border-bottom: 1px solid #e5e5e5;

                &.common {
                    border: 0;
                }

                &.first {
                    border-top: 1px solid #e5e5e5;
                }

                &.last {
                    border-bottom: 1px solid #e5e5e5;
                }

                .fonts {
                    font-size: 22px;
                    margin-right: 8px;
                }

                .blue {
                    color: #3B98FC;
                }

                .red {
                    margin-right: 12px;
                    color: #E8541E;
                }

                .orange {
                    margin-right: 12px;
                    color: #F39C2D;
                }
            }
        }

        &_last {
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            font-size: 17px;

            .fonts {
                color: #3B98FC;
                font-size: 22px;
                margin-right: pxTorem(8px);
            }
        }
    }
</style>