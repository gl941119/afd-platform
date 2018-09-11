<template>
    <div class="purse">
        <header-nav linkName="account" isBlue=true title="钱包地址"></header-nav>
        <div class="purse-info">
            <p class="purse-info-title">ETH钱包地址：</p>
            <input class="purse-info-input" :disabled="show" v-model="purseAddress"/>
            <van-button class="purse-info-button" :disabled="show" @click="bind()" v-if="!show" :class="{'active':disabled}" type="primary">绑定</van-button>
            <van-button class="purse-info-button" v-if="show" disabled type="primary">已绑定</van-button>
        </div>
        <div class="purse-notic">
            <div class="purse-notic-title">温馨提示：</div>
            <div class="purse-notic-info">
                <p>绑定您的钱包地址，用于提现在平台获得的广告收益、核对作为广告主的充值记录、检查您的账户余额。这意味着：</p>
                <div class="purse-notic-info-items">
                    <span>></span><span>ETH钱包地址将可以用于接收基于ERC20协议的平台代币AFDT。</span>
                </div>
                <div class="purse-notic-info-items">
                    <span>></span><span>如果您需要投放广告，则需要从本地址向平台充值以便核对</span>
                </div>
                <div class="purse-notic-info-items">
                    <span>></span><span>不能绑定交易所的钱包地址</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Cache from '../../../../utils/cache.js';
import Request from '../../../../utils/require.js';
export default {
    data() {
        return {
            accountId: this.$store.state.id || Cache.getSession('bier_userid'),
            purseAddress: '',
            show: false,
        };
    },
    computed: {
        disabled: {
            get() {
                if (this.purseAddress) {
                    return true;
                }
                return false;
            },
            set() {

            },
        },
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
                    this.show = true;
                }
            }).catch(e => { if (e.data && e.data.islogin) { this.$router.push({ name: 'index' }); } });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/global.scss';
.purse{
    &-info{
        margin-top: pxTorem(45px);
        display: flex;
        flex-direction: column;
        align-items: center;
        @include remCalc(padding, 31px, 38px, 28px);
        &-title{
            width: 100%;
            height:pxTorem(18px);
            font-size:13px;
            color:rgba(102,102,102,1);
            line-height:18px;
            text-align: left;
            text-indent: pxTorem(6px);
        }
        &-input{
            width: 100%;
            height:pxTorem(33px);
            border:1px solid rgba(221,221,221,1);
            @include remCalc(margin, 21px, 0, 32px ,0);
            @include remCalc(padding, 0, 10px);
            background: transparent;
        }
        &-button{
            width: pxTorem(278px);
            height:pxTorem(44px);
            background:rgba(255,149,0,0.5);
            color:rgba(255,255,255,1);
            font-size: 18px;
            border: 0;
            &.active{
                background:rgba(255,149,0,1);
                color:rgba(255,255,255,1);
            }
        }
    }
    &-notic{
        @include remCalc(padding, 0, 15px);
        &-title{
            height:pxTorem(20px);
            font-size:14px;
            font-weight:500;
            color:rgba(96,98,102,1);
            line-height:pxTorem(20px);
            margin-bottom: pxTorem(10px);
        }
        &-info{
            font-size:12px;
            font-weight:500;
            color:rgba(174,174,174,1);
            line-height:18px;
            &-items{
                span:last-child{
                    text-indent: 6px;
                    margin-left: 6px;
                }
            }
        }
    }
}
</style>
