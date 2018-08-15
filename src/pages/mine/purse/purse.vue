<template>
    <div class="purse">
        <mt-header title="钱包" class="purse_header">
            <router-link to="/mine" slot="left">
                <mt-button icon="back" class="purse_header_button"></mt-button>
            </router-link>
        </mt-header>
        <div class="purse_balance">
            <div class="purse_balance_box">
                <p class="purse_balance_box_info">余额</p>
                <p>{{balance}}</p>
                <div class="purse_balance_box_button">
                    <mt-button type="primary" size="small" class="purse_balance_box_button_left">充值</mt-button>
                    <mt-button type="primary" size="small" class="purse_balance_box_button_right">提现</mt-button>
                </div>
            </div>
            <div class="purse_balance_notic">
                <p>绑定您的钱包地址，用于提现在平台获得的广告收益、核对作为广告主的充 值记录、检查您的账户余额。这意味着：</p>
                <p>1、ETH钱包地址将可以用于接收基于ERC20协议的平台代币DAFDT；</p>
                <p>2、如果您需要投放广告，则需要从本地址向平台充值以便核对；</p>
                <p>3、不能绑定交易所的钱包地址</p>
            </div>
            <input class="purse_balance_address" placeholder="输入ETH钱包地址" :disabled="disabled" v-model="purseAddress" />
            <div class="purse_balance_bind">
                <mt-button v-if="disabled" @click.native="bind" plain>绑定地址</mt-button>
                <mt-button v-else plain>已绑定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    import Request from '../../../utils/require.js';
    export default {
        data() {
            return {
                purseAddress: '',
                disabled: false,
                balance: '',
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
            }
        },
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
        },
        mounted() {
            this.queryWallet();
        },
        methods: {
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
                            duration: 5000
                        });
                        this.queryWallet();
                    })
                } else {
                    this.$toast({
                        message: this.$t('messageNotice.walltLimit'),
                        position: 'center',
                        duration: 5000
                    });
                }
            },
            queryWallet() {
                Request({
                    url: 'QueryWalletAddress',
                    data: { accountId: this.accountId, },
                    type: 'get',
                    flag: true,
                }).then(res => {
                    this.purseAddress = res.data.walletAddress;
                    if (res.data.walletAddress) {
                        this.disabled = true;
                        this.QueryBalance();
                    }
                }).catch(e => { if (e.data && e.data.islogin) { this.$router.push({ name: 'index' }); } })
            },
            QueryBalance() {
                Request({
                    url: 'QueryBalance',
                    data: { address: this.purseAddress, },
                    type: 'get',
                    flag: true,
                }).then(res => { this.balance = res.data.balance; })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .purse {
        background: #fafafa;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        &_header {
            background: #ffffff;
            color: #333333;
            font-size: 16px;
            margin-bottom: pxTorem(10px);
            &_button {
                color: #F3F3F3;
            }
        }
        &_balance {
            background: #ffffff;
            @include remCalc(padding, 10px, 18px, 0);
            flex: 1;
            &_box {
                border: 1px solid #979797;
                text-align: center;
                font-size: 16px;
                margin-bottom: pxTorem(4px);
                &_info {
                    @include remCalc(margin, 25px, 0, 11px);
                }
                &_button {
                    @include remCalc(margin, 20px, 0, 16px);
                    button {
                        width: pxTorem(78px);
                        height: pxTorem(24px);
                    }
                    &_left {
                        background: rgba(243, 243, 243, 1);
                        color: #333333;
                        margin-right: pxTorem(64px);
                    }
                    &_right {
                        background: rgba(0, 158, 194, 1);
                    }
                }
            }
            &_notic {
                >p {
                    font-size: 10px;
                    color: #009EC2;
                }
                >p:first-child {
                    color: #757575;
                }
            }
            &_address {
                width: 100%;
                height: pxTorem(30px);
                border: 1px solid rgba(151, 151, 151, 1);
                padding-left: pxTorem(10px);
                @include remCalc(margin, 10px, 0, 20px);
            }
            &_bind {
                button {
                    width: pxTorem(88px);
                    height: pxTorem(24px);
                    border: 1px solid rgba(216, 216, 216, 1);
                    font-size: 12px;
                }
                button:last-child {
                    background: rgba(243, 243, 243, 1);
                    border: 0;
                }
            }
        }
    }
</style>