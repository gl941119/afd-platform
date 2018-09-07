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
        <van-popup class="mine-poup" v-model="show">
            <div class="mine-poup-title">提现须知</div>
            <div class="mine-poup-info">
                <div class="mine-poup-info-item">
                    1、必须完成<span @click="goAccount()">实名认证</span>
                    <p>我的-账户与安全-实名认证</p>
                </div>
                <div class="mine-poup-info-item">
                    2、设置<span @click="goAccount()">交易密码</span>
                    <p>我的-账户与安全-交易密码</p>
                </div>
                <div class="mine-poup-info-item">
                    3、绑定<span @click="goAccount()">钱包地址</span>
                    <p>我的-账户与安全-钱包地址</p>
                </div>
                <div class="mine-poup-info-item last">
                    4、查看提现记录
                    <p>我的-钱包-交易记录</p>
                </div>
            </div>
            <div class="mine-poup-perfect">
                <button @click="goperfect()">去完善</button>
            </div>
        </van-popup>
        <van-popup class="mine-poup" v-model="balanceShow">
            <div class="mine-poup-title">提现提示</div>
            <div class="mine-poup-info">
                <div class="mine-poup-info-item last">
                    最小提现金额为10000AFDT，您当前还不能提现
                </div>
            </div>
            <div class="mine-poup-perfect">
                <button @click="confirm()">确定</button>
            </div>
        </van-popup>
        <van-popup class="mine-withdraw" v-model="withdrawShow">
            <div class="mine-withdraw-info">
                <label class="mine-withdraw-info-label">可用金额</label>
                <span class="mine-withdraw-info-span">{{balance}}</span>
            </div>
            <div class="mine-withdraw-info">
                <label class="mine-withdraw-info-label">手续费</label>
                <input class="mine-withdraw-info-span" disabled v-model="handlingFee"/>
            </div>
            <div class="mine-withdraw-info">
                <label class="mine-withdraw-info-label">到账金额</label>
                <input class="mine-withdraw-info-span" disabled v-model="arrival"/>
            </div>
            <div class="mine-withdraw-info">
                <label class="mine-withdraw-info-label heighter">提现金额</label>
                <input class="mine-withdraw-info-input" name="money" placeholder="提现金额" v-validate="'required|numeric'" autoComplete="off">
                <span class="is-danger" v-show="errors.has('money')">{{errors.first('money')}}</span>
            </div>
            <div class="mine-withdraw-info">
                <label class="mine-withdraw-info-label heighter">交易密码</label>
                <input style="position:absolute;left:99999999999999px;"/>
                <input class="mine-withdraw-info-input" name="tradePassword" v-validate="'required'" autoComplete="off" type="password" v-model="withdraws.tradePassword" placeholder="交易密码" >
                <span class="is-danger" v-show="errors.has('tradePassword')">{{errors.first('tradePassword')}}</span>
            </div>
            <div class="mine-withdraw-buttonBox">
                <button class="mine-withdraw-buttonBox-button" :class="{'active':style}" @click="rightNow()">立即提现</button>
            </div>
        </van-popup>
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
    import validateFun from '../../utils/validate.js';
    export default {
        data() {
            return {
                headUrl: this.$store.state.heardUrl || 'https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png',
                nickname: this.$store.state.usernickname || this.$store.state.username,
                accountId: this.$store.state.id,
                // balance
                balance: '',
                totalRevenue: '',
                yesterdayBalance: '',
                // info
                authStatus: 0,
                existTradePassword: false,
                existPassword: false,
                isBindPhone: false,
                isBindtWalletAddress: false,
                // withdraw
                show: false,
                balanceShow: false,
                withdrawShow: false,
                withdraws: {
                    money: '',
                    tradePassword: '',
                },
            };
        },
        mounted() {
            this.basicInformation();
            this.info();
        },
        computed: {
            style() {
                const { money, tradePassword } = this.withdraws;
                if (money && tradePassword) {
                    return true;
                }
                return false;
            },
            handlingFee: {// 手续费
                get() {
                    return this.withdraws.money * 2 / 1000;
                },
                set() {
                    return 0;
                },
            },
            arrival: {// 到账金额
                get() {
                    const arrival = this.withdraws.money - this.handlingFee;
                    return arrival;
                },
            },
        },
        methods: {
            withdraw() {
                if (this.balance < 10000) {
                    this.balanceShow = !this.balanceShow;
                    return;
                }
                if (this.authStatus === 0 || this.existTradePassword || this.existPassword || this.isBindPhone || this.isBindtWalletAddress) {
                    this.show = !this.show;
                    return;
                }
                this.withdrawShow = !this.withdrawShow;
            },
            rightNow() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        const { money, tradePassword } = this.withdraws;
                        Request({
                            url: 'PostWithdraw',
                            data: {
                                accountId: this.accountId,
                                amount: money,
                                cost: this.handlingFee,
                                password: validateFun.encrypt(tradePassword),
                            },
                            flag: true,
                        }).then(res => {
                            this.withdraws.money = '';
                            this.withdraws.tradePassword = '';
                            this.withdrawShow = false;
                            this.$toast.success('已提交提现申请');
                        });
                    }
                });
            },
            confirm() {
                this.balanceShow = !this.balanceShow;
            },
            goRecords() {
                this.$router.push({
                    name: 'transaction',
                });
            },
            goperfect() {
                this.$router.push({
                    name: 'account',
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
                    type: 'get',
                }).then(res => {
                    this.balance = res.data.balance;
                    this.totalRevenue = res.data.totalRevenue;
                    this.yesterdayBalance = res.data.yesterdayBalance;
                    this.$store.commit('setIncomeId', res.data.id);
                    Cache.setSession('bire_incomeId', res.data.id);
                });
            },
            info() {
                Request({
                    url: 'QuerySettings',
                    type: 'get',
                }).then(res => {
                    this.authStatus = res.data.authStatus;
                    this.existTradePassword = res.data.existTradePassword;
                    this.existPassword = res.data.existPassword;
                    this.isBindPhone = res.data.isBindPhone;
                    this.isBindtWalletAddress = res.data.isBindtWalletAddress;
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
            @include remCalc(padding, 12px, 16px, 0, 21px);
            &-money{
                &-commom{
                    height:pxTorem(20px);
                    font-size:14px;
                    color:rgba(169,169,169,1);
                    line-height:20px;
                    &.moneyNumber{
                        color:rgba(255,149,0,1);
                    }
                }
            }
            &-button{
                width:pxTorem(63px);
                height:pxTorem(30px);
                border:1px solid rgba(255,149,0,1);
                background: transparent;
                font-size:16px;
                color:rgba(255,149,0,1);
            }
        }
        &-poup {
            width:pxTorem(270px);
            background:rgba(255,255,255,1);
            border-radius:7px;

            &-title {
                font-size: 18px;
                color:rgba(0,0,0,1);
                text-align: center;
                height: pxTorem(21px);
                line-height: pxTorem(21px);
                margin-top: pxTorem(21px);
            }
            &-info {
                @include remCalc(padding, 9px, 15px, 0);
                &-item{
                    font-size: 15px;
                    color: #888888;
                    span{
                        line-height: pxTorem(26px);
                        color: #FF9500;
                    }
                    p{
                        text-indent: 18px;
                        line-height: pxTorem(26px);
                    }
                    &.last{
                        margin-bottom: pxTorem(13px);
                    }
                }
            }
            &-perfect{
                height: pxTorem(50px);
                line-height: pxTorem(50px);
                box-sizing: border-box;
                text-align: center;
                border-top: 1px solid rgba(242,242,242,1);
                button{
                    font-size:18px;
                    color:rgba(16,142,233,1);
                    border: 0;
                    background: transparent;
                }
            }
        }
        &-withdraw{
            @include remCalc(padding, 24px, 30px);
            font-size: 14px;
            color:rgba(144,147,153,1);
            border-radius:7px;
            width:pxTorem(274px);
            &-info{
                &-label{
                    width:pxTorem(56px);
                    margin-right: 25px;
                    height: pxTorem(36px);
                    line-height: pxTorem(36px);
                    display: inline-block;
                    &.heighter{
                        height: pxTorem(42px);
                        line-height: pxTorem(42px);
                    }
                }
                &-span{
                    height: pxTorem(36px);
                    line-height: pxTorem(36px);
                    vertical-align: middle;
                    width: pxTorem(128px);
                    @include remCalc(padding, 0, 10px);
                    background: transparent;
                }
                &-input{
                    width: pxTorem(128px);
                    height: pxTorem(36px);
                    line-height: pxTorem(36px);
                    border-radius:4px;
                    border:1px solid rgba(255,149,0,1);
                    @include remCalc(padding, 0, 10px);
                }
                .is-danger{
                    color: #FF9500;
                }
            }
            &-buttonBox{
                text-align: center;
                margin-top: pxTorem(36px);
                &-button{
                    width:pxTorem(116px);
                    height:pxTorem(44px);
                    background:rgba(255,149,0,0.5);
                    border-radius:4px;
                    color: #ffffff;
                    font-size:18px;
                    &.active{
                        background:rgba(255,149,0,1);
                    }
                }
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