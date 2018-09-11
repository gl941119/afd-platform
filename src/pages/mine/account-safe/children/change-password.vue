<template>
    <div class="input">
        <header-nav linkName="account" isBlue=true class="input-header" :title="title"></header-nav>
        <div class="input-info">
            <div class="input-info-item">
                <input type="password" v-model="oldPassword" name="oldPassword" :placeholder="placeholder"/>
            </div>
            <div class="input-info-item">
                <input type="password" v-model="password" @blur="passwordRule()" name="tradePassword" :placeholder="newPlaceholder"/>
            </div>
            <div class="input-info-item">
                <input type="password" v-model="oncePassword" name="oncePassword" :placeholder="oncePlaceholder">
            </div>
        </div>
        <div class="input-password">
            <div>
                {{notic}}
            </div>
            <div v-if="value==='2'" class="input-password-forget" @click="forget()">
                忘记交易密码
            </div>
        </div>
        <div class="input-confirm">
            <button class="input-confirm-button" v-if="value==='1'" @click="confirm(1)" :class="{'active':style}">确定</button>
            <button class="input-confirm-button" v-else @click="confirm(2)" :class="{'active':style}">确定</button>
        </div>
    </div>
</template>
<script>
import Request from '../../../../utils/require';
import validateFun from '../../../../utils/validate.js';
export default {
    data() {
        return {
            title: '',
            placeholder: '',
            newPlaceholder: '',
            oncePlaceholder: '',
            notic: '',
            oldPassword: '',
            password: '',
            oncePassword: '',
            passwordShow: false,
            accountId: this.$store.state.id,
            token: this.$store.state.token,
            value: '',
        };
    },
    computed: {
        style() {
            if (this.oldPassword && this.password && this.oncePassword && !this.passwordShow) {
                return true;
            }
            return false;
        },
    },
    mounted() {
        this.kind();
    },
    methods: {
        kind() {
            this.value = this.$route.params.value;
            if (this.value === '1') {
                this.title = '修改登录密码';
                this.placeholder = '原密码';
                this.newPlaceholder = '新密码';
                this.oncePlaceholder = '确认新密码';
                this.notic = '密码为8~16位数字、字母组合';
            } else {
                this.title = '修改支付密码';
                this.placeholder = '原支付密码';
                this.newPlaceholder = '新支付密码';
                this.oncePlaceholder = '确认新支付密码';
                this.notic = '请设置6位数字或字母';
            }
        },
        passwordRule() {
            var str = this.password;
            const reg = (this.value === '1') ? /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/ : /^(\d{6}|[a-zA-Z]{6})$/;
            var value = reg.test(str);
            if (!value) {
                this.$toast.fail('密码格式不对');
                this.passwordShow = true;
            } else {
                this.passwordShow = false;
            }
        },
        confirm(value) {
            if (value === 1) {
                this.changeLogin();
            } else {
                this.changeTrade();
            }
        },
        changeLogin() {
            Request({
                url: 'ChangeLogin',
                data: {
                    oldPassword: validateFun.encrypt(this.oldPassword),
                    password: validateFun.encrypt(this.password),
                },
                type: 'post',
                flag: true,
            }).then(res => {
                this.$toast.success('修改成功，请重新登录');
                this.$router.push({
                    name: 'login',
                });
                this.out();
            });
        },
        changeTrade() {
            Request({
                url: 'ChangeTradePassword',
                data: {
                    oldPassword: validateFun.encrypt(this.oldPassword),
                    password: validateFun.encrypt(this.password),
                },
                type: 'post',
                flag: true,
            }).then(res => {
                this.$toast.success('修改成功');
                this.$router.push({
                    name: 'account',
                });
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
