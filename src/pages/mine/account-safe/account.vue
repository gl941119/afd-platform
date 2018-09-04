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
            <van-button class="account-out-button" @click="logOut()" type="primary">退出登录</van-button>
        </div>
    </div>
</template>
<script>
    import Request from '../../../utils/require.js';
    import Cache from '../../../utils/cache.js';
    export default {
        data() {
            return {
                token: this.$store.state.token || Cache.getSession('bier_token'),
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
            logOut() {
                Request({
                    url: 'SignOut',
                    type: 'get',
                    data: { token: this.token },
                }).then(res => {
                    this.handleSignOut();
                    this.$router.push({ name: 'index' });
                });
            },
            handleSignOut() {
                this.$store.commit('setUserId', undefined);
                this.$store.commit('setUserName', undefined);
                this.$store.commit('setUserNickName', undefined);
                this.$store.commit('setToken', undefined);
                this.$store.commit('setHeardUrl', undefined);
                this.$store.commit('setInviteCode', '');
                this.$store.commit('setIncomeId', '');
                Cache.removeCookie('login_identify');
                Cache.removeCookie('login_token');
                Cache.removeSession('bier_username');
                Cache.removeSession('bier_token');
                Cache.removeSession('bire_incomeId');
                Cache.removeSession('bier_heardUrl');
                Cache.removeSession('bier_userid');
                Cache.removeSession('bier_inviteCode');
                Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
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
                    color: rgba(136, 136, 136, 1);
                }

                &-fontBox {
                    display: inline-block;

                    i {
                        color: #999;
                        font-size: 16px;
                    }
                }
            }

            &-kind:first-child {
                border-top: 0;
            }
        }
        &-out{
            background: #ffffff;
            height: 100%;
            text-align: center;
            @include remCalc(padding, 32px, 40px, 0, 40px);
            &-button{
                width: 100%;
                height:44px;
                background:rgba(255,149,0,1);
                border: 0;
                font-size:18px;
                color: #ffffff;
            }
        }
    }
</style>