<template>
    <div class="account">
        <header-nav linkName="mine" class="account-header" title="账户与安全"></header-nav>
        <div class="account-item">
            <van-cell title="实名认证" class="account-item-kind" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text">未认证</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="登录密码" class="account-item-kind" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text">修改</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="支付密码" class="account-item-kind" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text">未设置</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="钱包地址" class="account-item-kind" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text">未绑定</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
        </div>
        <div class="account-out">
            <van-button type="primary">退出登录</van-button>
        </div>
    </div>
</template>
<script>
import Request from '../../../utils/require.js';
export default {
    data() {
        return {
            authStatus: '',
            existTradePassword: false,
            existPassword: false,
        };
    },
    mounted() {
        this.info();
    },
    methods: {
        info() {
            Request({
                url: 'QuerySettings',
                type: 'get',
            }).then(res => {
                // console.log(res.data);
                this.authStatus = res.data.authStatus;
                this.existTradePassword = res.data.existTradePassword;
                this.existPassword = res.data.existPassword;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
.account {
    height: 100%;
    background: #fafafa;
    &-item {
        margin-top: pxTorem(44px);
        &-kind {
            font-size: 17px;
            border-bottom: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
            margin-bottom: pxTorem(10px);
            &-text {
                font-size: 16px;
            }
            &-fontBox {
                display: inline-block;

                i {
                    color: #999;
                    font-size: 16px;
                }
            }
        }
        &-kind:first-child{
            border-top: 0;
        }
    }
}
</style>


