<template>
    <div class="mine">
        <mt-cell is-link class="mine_top" to="/information">
            <div class="mine_info" slot="title">
                <div class="mine_info_img">
                    <img slot="icon" :src="headUrl">
                </div>
                <span class="mine_info_nickname">昵称：{{nickname}}</span>
            </div>
        </mt-cell>
        <div>
            <mt-cell class="mine_kind" title="钱包" to="/purse" is-link>
            </mt-cell>
            <mt-cell class="mine_kind" title="广告收益" to="/revenue" is-link>
            </mt-cell>
            <mt-cell class="mine_kind" title="邀请用户" to="/invite" is-link>
            </mt-cell>
        </div>
        <mt-cell class="mine_last" title="我的众筹" @click.native="inDevelopment()" is-link>
        </mt-cell>
        <div class="mine_buttonBox">
            <mt-button class="mine_buttonBox_button" @click.native="logOut" type="primary" size="large">退出登录</mt-button>
        </div>
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
            inDevelopment() {
                this.$toast({
                    message: '开发中',
                    position: 'top',
                    duration: 5000,
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
        &_info {
            height: pxTorem(106px);
            line-height: pxTorem(106px);
            margin-left: pxTorem(10px);
            position: relative;
            &_img {
                width: pxTorem(44px);
                height: pxTorem(44px);
                img {
                    width: pxTorem(44px);
                    height: pxTorem(44px);
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: pxTorem(13px);
                    vertical-align: middle;
                }
            }
            &_nickname {
                font-size: 12px;
                color: #333333;
                position: absolute;
                top: 0;
                left: 58px;
            }
        }
        &_top {
            height: pxTorem(106px);
            margin-bottom: pxTorem(10px);
        }
        &_kind {
            font-size: 12px !important;
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #e6e6e6;
        }
        .mine_kind:last-child {
            border: 0;
        }
        &_last {
            @include remCalc(margin, 10px, 0);
        }
        &_buttonBox {
            background: #ffffff;
            @include remCalc(padding, 20px, 30px, 0);
            flex: 1;
            &_button {
                background: #f3f3f3;
                margin: 0 auto;
                color: #333333;
                font-size: 12px;
            }
        }
    }
</style>