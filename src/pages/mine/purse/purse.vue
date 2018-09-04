<template>
    <div class="purse">
        <header-nav linkName="mine" title="钱包"></header-nav>
        <div class="purse_balance">
            <div class="purse_balance_box">
                <p class="purse_balance_box_info">余额</p>
                <p>{{balance}}</p>
                <div class="purse_balance_box_button">
                    <van-button type="primary" :disabled="!style" :class="{'orange':style}" @click="withdraw()">提现</van-button>
                </div>
                <div class="purse_balance_box_records" @click="goRecords()">
                    <i class="custom-vant-icon-chenggong2"></i><span>交易记录</span>
                </div>
            </div>
            <div class="purse_balance_notic">
                <div class="purse_balance_notic-title">提现须知：</div>
                <div class="purse_balance_notic-info">
                    1、必须完成<span>实名认证</span>
                    <p>我的-账户与安全-实名认证</p>
                </div>
                <div class="purse_balance_notic-info">
                    2、设置<span>交易密码</span>
                    <p>我的-账户与安全-交易密码</p>
                </div>
                <div class="purse_balance_notic-info">
                    3、绑定<span>钱包地址</span>
                    <p>我的-账户与安全-钱包地址</p>
                </div>
                <div class="purse_balance_notic-info">
                    4、查看<span>提现记录</span>
                    <p>我的-钱包-交易记录</p>
                </div>
            </div>
            <!-- <input class="purse_balance_address" placeholder="输入ETH钱包地址" :disabled="disabled" v-model="purseAddress" />
            <div class="purse_balance_bind">
                <mt-button v-if="!disabled" @click.native="bind" plain>绑定地址</mt-button>
                <mt-button v-else plain>已绑定</mt-button>
            </div> -->
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    export default {
        data() {
            return {
                purseAddress: '',
                disabled: false,
                balance: '0',
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                style: false,
            };
        },
        mounted() {
            this.queryWallet();
        },
        methods: {
            goRecords() {
                this.$router.push({
                    name: 'transaction',
                });
            },
            withdraw() {
                console.log('withdraw');
            },
            bind() {
                var str = this.purseAddress;
                var value = /^0x.{40}$/.test(str);
                if (value) {
                    Request({
                        url: 'QueryBindWalletAddress',
                        data: { id: this.accountId, walletAddress: this.purseAddress },
                        type: 'post',
                        flag: true,
                    }).then(res => {
                        this.$toast({
                            message: this.$t('messageNotice.bindSuccess'),
                            position: 'center',
                            duration: 5000,
                        });
                        this.queryWallet();
                    });
                } else {
                    this.$toast({
                        message: this.$t('messageNotice.walltLimit'),
                        position: 'center',
                        duration: 5000,
                    });
                }
            },
            queryWallet() {
                Request({
                    url: 'QueryWalletAddress',
                    data: { accountId: this.accountId },
                    type: 'get',
                    flag: true,
                }).then(res => {
                    this.purseAddress = res.data.walletAddress;
                    if (res.data.walletAddress) {
                        this.disabled = true;
                        this.QueryBalance();
                    }
                }).catch(e => { if (e.data && e.data.islogin) { this.$router.push({ name: 'index' }); } });
            },
            QueryBalance() {
                Request({
                    url: 'QueryBalance',
                    data: { address: this.purseAddress },
                    type: 'get',
                    flag: true,
                }).then(res => {
                    this.balance = res.data.balance;
                    if (res.data.balance >= 10000) {
                        this.style = true;
                    }
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';

    .purse {
        height: 100%;
        background: #fafafa;

        &_balance {
            margin-top: pxTorem(44px);
            &_box {
                text-align: center;
                font-size: 16px;
                font-size:16px;
                color:rgba(51,51,51,1);
                margin-bottom: pxTorem(15px);
                border-bottom: 1px solid #e5e5e5;
                background: #ffffff;
                position: relative;
                &_info {
                    @include remCalc(padding, 25px, 0, 11px);
                }

                &_button {
                    @include remCalc(margin, 14px, 0, 11px);
                    button {
                        width: pxTorem(78px);
                        height: pxTorem(36px);
                        line-height: 36px;
                        border: 0;
                        background: #CCCCCC;
                        color: #ffffff;
                    }
                    .orange{
                        background: rgba(255,149,0,1);
                    }
                }
                &_records{
                    position: absolute;
                    top: 20px;
                    right: 15px;
                    color: #3B98FC;
                    i{
                        font-size: 25px;
                        margin-right: 6px;
                        vertical-align: middle;
                    }
                }
            }

            &_notic {
                border-top: 1px solid #e5e5e5;
                border-bottom: 1px solid #e5e5e5;
                background: #ffffff;
                @include remCalc(padding, 13px, 15px);

                &-title {
                    font-size: 14px;
                    color: rgba(96, 98, 102, 1);
                }

                &-info {
                    font-size: 12px;
                    color: rgba(174, 174, 174, 1);
                    line-height: 18px;
                    span{
                        color: #3B98FC;
                    }
                    p{
                        text-indent: 18px;
                    }
                }
            }

            // &_address {
            //     width: 100%;
            //     height: pxTorem(30px);
            //     border: 1px solid rgba(151, 151, 151, 1);
            //     padding-left: pxTorem(10px);
            //     @include remCalc(margin, 10px, 0, 20px);
            // }
            // &_bind {
            //     button {
            //         width: pxTorem(88px);
            //         height: pxTorem(24px);
            //         border: 1px solid rgba(216, 216, 216, 1);
            //         font-size: 12px;
            //     }
            //     button:last-child {
            //         background: rgba(243, 243, 243, 1);
            //         border: 0;
            //     }
            // }
        }
    }
</style>