<template>
    <div class="purse">
        <header-nav linkName="mine" isBlue=true title="钱包"></header-nav>
        <div class="purse-notic" v-if="show">
            <div>您暂未绑定钱包地址哦</div>
            <div class="purse-notic-go" @click="goBind()">去绑定</div>
        </div>
        <div v-else class="purse-info">
            <div class="purse-info-item">
                <span class="purse-info-item-title">钱包地址</span>
                <div class="purse-info-item-content">{{purseAddress}}</div>
            </div>
            <div class="purse-info-item">
                <span class="purse-info-item-title">钱包余额</span>
                <div class="purse-info-item-content">{{balance}}AFDT</div>
            </div>
        </div>
    </div>
</template>
<script>
import Request from '../../../utils/require.js';
export default {
    data() {
        return {
            accountId: this.$store.state.id,
            purseAddress: '',
            balance: 0,
            show: false,
        };
    },
    mounted() {
        this.queryWallet();
    },
    methods: {
        goBind() {
            this.$router.push({
                name: 'walletAddress',
            });
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
                    this.queryBalance();
                } else {
                    this.show = !this.show;
                }
            }).catch(e => { if (e.data && e.data.islogin) { this.$router.push({ name: 'index' }); } });
        },
        queryBalance() {
            Request({
                url: 'QueryBalance',
                data: {
                    address: this.purseAddress,
                },
                type: 'get',
                flag: true,
            }).then(res => {
                this.balance = res.data;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
.purse{
    background: #fafafa;
    height: 100%;
    width: 100%;
    &-notic{
        margin-top: pxTorem(195px);
        text-align: center;
        font-size:16px;
        color:rgba(51,51,51,1);
        >div{
            height: pxTorem(22px);
            line-height: pxTorem(22px);
        }
        &-go{
            color: #108ee9;
        }
    }
    &-info{
        margin-top: pxTorem(44px);
        background:rgba(255,255,255,1);
        @include remCalc(padding, 13px, 0, 13px, 21px);
        &-item{
            height: pxTorem(20px);
            line-height: pxTorem(20px);
            display: flex;
            font-size:14px;
            &-title{
                width: pxTorem(65px);
                color:rgba(0,0,0,1);
            }
            &-content{
                font-size:12px;
                color:rgba(102,102,102,1);
            }
        }
        &-item:first-child{
            margin-bottom: pxTorem(14px);
        }
    }
}
</style>
