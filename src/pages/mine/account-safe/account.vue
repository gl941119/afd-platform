<template>
    <div class="account">
        <header-nav linkName="mine" isBlue=true class="account-header" title="账户与安全"></header-nav>
        <div class="account-item">
            <van-cell title="手机号" class="account-item-kind" @click="bind(1)" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text" v-if="!isBindPhone">未绑定</span>
                    <span class="account-item-kind-text" v-else>{{phone}}</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="邮箱" class="account-item-kind" @click="bind(2)" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text" v-if="!existEmail">未绑定</span>
                    <span class="account-item-kind-text" v-else>{{email}}</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="实名认证" class="account-item-kind" @click="authentication()" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text" v-if="authStatus===0">未认证</span>
                    <span class="account-item-kind-text" v-if="authStatus===1">已认证</span>
                    <span class="account-item-kind-text" v-if="authStatus===2">已提交认证申请</span>
                    <span class="account-item-kind-text" v-if="authStatus===3">认证失败</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="登录密码" class="account-item-kind" @click="changePassword()" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text">修改</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="支付密码" class="account-item-kind" @click="trade()" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text" v-if="!existTradePassword">未设置</span>
                    <span class="account-item-kind-text" v-else>修改</span>
                    <div class="account-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
            <van-cell title="钱包地址" class="account-item-kind" to="/walletAddress" is-link>
                <van-icon slot="right-icon">
                    <span class="account-item-kind-text" v-if="!isBindtWalletAddress">未绑定</span>
                    <span class="account-item-kind-text" v-else>已绑定</span>
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
                // info
                authStatus: 0,
                existEmail: false,
                existTradePassword: false,
                existPassword: false,
                isBindPhone: false,
                isBindtWalletAddress: false,
                email: '',
                phone: '',
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
                    const {
                        Email,
                        phone,
                        authStatus,
                        existEmail,
                        existTradePassword,
                        existPassword,
                        isBindPhone,
                        isBindtWalletAddress,
                    } = res.data;
                    if (phone) {
                        this.phone = phone.substr(0, 3) + '****' + phone.substr(7);
                    }
                    if (Email) {
                        this.email = Email.substr(0, 2) + '****' + '@' + Email.split('@')[1];
                    }
                    this.authStatus = authStatus;
                    this.existEmail = existEmail;
                    this.existTradePassword = existTradePassword;
                    this.existPassword = existPassword;
                    this.isBindPhone = isBindPhone;
                    this.isBindtWalletAddress = isBindtWalletAddress;
                });
            },
            bind(value) {
                this.bindKind(!this.existEmail, value);
                this.bindKind(!this.isBindPhone, value);
            },
            bindKind(kinds, value) {
                if (kinds) {
                    this.$router.push({
                        path: '/bind/' + value,
                        params: {
                            value: value,
                        },
                    });
                } else {
                    this.$router.push({
                        path: '/changeBind/' + value,
                        params: {
                            value: value,
                        },
                    });
                }
            },
            changePassword() {
                this.$router.push({
                    path: '/changePassword/' + 1,
                    params: {
                        value: 1,
                    },
                });
            },
            trade() {
                if (this.existTradePassword) {
                    this.$router.push({
                        path: '/changePassword/' + 2,
                        params: {
                            value: 2,
                        },
                    });
                } else {
                    this.$router.push({
                        name: 'setTrade',
                    });
                }
            },
            authentication() {
                if (this.authStatus === 0) {
                    this.$router.push({
                        name: 'authentication',
                    });
                } else {
                    this.$router.push({
                        name: 'authImg',
                    });
                }
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
            // height: 100%;
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