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
                <p>88888AFDT</p>
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
            <input class="purse_balance_address" placeholder="输入ETH钱包地址" />
            <div class="purse_balance_bind">
                <mt-button plain>绑定状态</mt-button>
                <mt-button plain>已绑定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    export default {
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
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
            /*no*/
            margin-bottom: 10px;
            /*no*/
            &_button {
                color: #F3F3F3;
            }
        }
        &_balance {
            background: #ffffff;
            padding: 10px 18px 0;
            /*no*/
            flex: 1;
            &_box {
                border: 1px solid #979797;
                /*no*/
                text-align: center;
                font-size: 16px;
                /*no*/
                margin-bottom: 4px;
                /*no*/
                &_info {
                    margin: 25px 0 11px;
                    /*no*/
                }
                &_button {
                    margin: 20px 0 16px;
                    /*no*/
                    button {
                        width: 78px;
                        height: 24px;
                    }
                    &_left {
                        background: rgba(243, 243, 243, 1);
                        color: #333333;
                        margin-right: 64px;
                        /*no*/
                    }
                    &_right {
                        background: rgba(0, 158, 194, 1);
                    }
                }
            }
            &_notic {
                >p {
                    font-size: 10px;
                    /*no*/
                    color: #009EC2;
                }
                >p:first-child {
                    color: #757575;
                }
            }
            &_address {
                width: 100%;
                height: 30px;
                border: 1px solid rgba(151, 151, 151, 1);
                /*no*/
                padding-left: 10px;
                /*no*/
                margin: 10px 0 20px;
                /*no*/
            }
            &_bind {
                button {
                    width: 88px;
                    height: 24px;
                    border: 1px solid rgba(216, 216, 216, 1);
                    /*no*/
                    font-size: 12px;
                    /*no*/
                }
                button:last-child {
                    background: rgba(243, 243, 243, 1);
                    border: 0;
                }
            }
        }
    }
</style>