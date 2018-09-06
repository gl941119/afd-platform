<template>
    <div class="input">
        <header-nav linkName="mine" isBlue=true class="input-header" title="修改登录密码"></header-nav>
        <div class="input-info">
            <div class="input-info-item">
                <input type="password" v-model="oldPassword" name="oldPassword" placeholder="原密码"/>
            </div>
            <div class="input-info-item">
                <input type="password" v-model="password" @blur="passwordRule()" name="tradePassword" placeholder="新密码"/>
            </div>
            <div class="input-info-item">
                <input type="password" v-model="oncePassword" name="oncePassword" placeholder="确认新密码">
            </div>
        </div>
        <div class="input-password">
            密码为8~16位数字、字母组合
        </div>
        <div class="input-confirm">
            <button class="input-confirm-button" @click="confirm()" :class="{'active':style}">确定</button>
        </div>
    </div>
</template>
<script>
import Request from '../../../../utils/require';
import validateFun from '../../../../utils/validate.js';
export default {
    data() {
        return {
            oldPassword: '',
            password: '',
            oncePassword: '',
            passwordShow: false,
            accountId: this.$store.state.id,
        };
    },
    computed: {
        style() {
            if (this.oldTradePassword && this.tradePassword && this.onceNewTradePassword && !this.passwordShow) {
                return true;
            }
            return false;
        },
    },
    methods: {
        passwordRule() {
            var str = this.password;
            var value = /^[a-zA-Z]{6}|[0-9]{6}$/.test(str);
            if (!value) {
                this.$toast.fail('支付密码格式不对');
                this.passwordShow = true;
            } else {
                this.passwordShow = false;
            }
        },
        confirm() {
            Request({
                url: 'QueryAccountSettings',
                data: {
                    id: this.accountId,
                    oldPassword: validateFun.encrypt(this.oldPassword),
                    password: validateFun.encrypt(this.password),
                    verificationCode: this.codePassword,
                },
                type: 'post',
                flag: true,
            }).then(res => {
                this.out();
            });
        },
        out() {
            Request({
                url: 'SignOut',
                type: 'get',
                data: {
                    token: this.token,
                },
            }).then(res => {
                this.handleSignOut();
                this.$router.push({
                    name: 'index',
                });
            });
        },
        handleSignOut() {
            this.$store.commit('setUserId', undefined);
            this.$store.commit('setUserName', undefined);
            this.$store.commit('setUserNickName', undefined);
            this.$store.commit('setToken', undefined);
            this.$store.commit('setHeardUrl', undefined);
            this.$store.commit('setInviteCode', '');
            Cache.removeCookie('login_identify');
            Cache.removeCookie('login_token');
            Cache.removeSession('bier_username');
            Cache.removeSession('bier_token');
            Cache.removeSession('bier_userid');
            Cache.removeSession('bier_userid');
            Cache.removeSession('bier_inviteCode');
            Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
        },
        forget() {
            this.$router.push({
                name: 'forgetTrade',
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/input.scss';
</style>
