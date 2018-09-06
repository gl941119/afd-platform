<template>
    <div class="input">
        <header-nav linkName="mine" isBlue=true class="input-header" title="修改支付密码"></header-nav>
        <div class="input-info">
            <div class="input-info-item">
                <input type="password" v-model="oldTradePassword" name="oldTradePassword" placeholder="原支付密码"/>
            </div>
            <div class="input-info-item">
                <input type="password" v-model="tradePassword" @blur="password()" name="tradePassword" placeholder="新支付密码"/>
            </div>
            <div class="input-info-item">
                <input type="password" v-model="onceNewTradePassword" name="onceNewTradePassword" placeholder="确认新支付密码">
            </div>
        </div>
        <div class="input-password">
            <div>
                请设置6位数字或字母
            </div>
            <div class="input-password-forget" @click="forget()">
                忘记交易密码
            </div>
        </div>
        <div class="input-confirm">
            <button class="input-confirm-button" @click="confirm()" :class="{'active':style}">确定</button>
        </div>
    </div>
</template>
<script>
// import Request from '../../../../utils/require';
// import validateFun from '../../../../utils/validate.js';
export default {
    data() {
        return {
            oldTradePassword: '',
            tradePassword: '',
            onceNewTradePassword: '',
            passwordShow: false,
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
        password() {
            var str = this.tradePassword;
            var value = /^[a-zA-Z]{6}|[0-9]{6}$/.test(str);
            if (!value) {
                this.$toast.fail('支付密码格式不对');
                this.passwordShow = true;
            } else {
                this.passwordShow = false;
            }
        },
        confirm() {
            console.log('1');
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
