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
                <div class="mine-top-money-large">99.00</div>
            </div>
            <div class="mine-top-money kind">
                <div>
                    <div class="mine-top-money-title">昨日收益（AFDT）</div>
                    <div class="mine-top-money-large">99.00</div>
                </div>
                <div>
                    <div class="mine-top-money-title">累计收益（AFDT）</div>
                    <div class="mine-top-money-large">99.00</div>
                </div>
            </div>
        </div>
        <div class="mine-item">
            <van-cell class="mine-item-kind" is-link to="/purse">
                <van-icon slot="icon">
                    <i class="custom-vant-icon-wallet fonts blue"></i>
                </van-icon>
                <template slot="title">
                    <span class="van-cell-text">钱包</span>
                </template>
            </van-cell>
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
    import Cache from '../../utils/cache.js';
    import Request from '../../utils/require';
    export default {
        data() {
            return {
                token: this.$store.state.token || Cache.getSession('bier_token'),
                headUrl: this.$store.state.heardUrl || 'https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png',
                nickname: this.$store.state.usernickname || this.$store.state.username,
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
            };
        },
        mounted() {
            this.basicInformation();
        },
        methods: {
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
                    this.$store.commit('setIncomeId', res.data.id);
                    Cache.setSession('bire_incomeId', res.data.id);
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
                    margin-top: 16px;
                    display: flex;
                    justify-content: space-between;

                    >div {
                        width: pxTorem(140px);
                    }
                }

                &-title {
                    height: 18px;
                    line-height: 18px;
                }

                &-large {
                    font-size: 18px;
                    height: 25px;
                    line-height: 25px;
                }
            }
        }

        &-item {
            margin-bottom: 10px;

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
                margin-right: 8px;
            }
        }
    }
</style>