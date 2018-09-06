<template>
    <div class="trade">
        <header-nav linkName="mine" isBlue=true class="trade-header" title="设置支付密码"></header-nav>
        <div class="trade-info">
            <div class="trade-info-item">
                <input v-model="phone" placeholder="请输入邮箱或手机号"/>
            </div>
            <div class="trade-info-item">
                <input class="relative" v-model="verifyCode" v-validate="'required|confirmed:tradePassword'" name="verifyCode" placeholder="请输入验证码">
                <button class="trade-info-item-button" :disabled="!code" :class="{'active':code}" @click="getCode()">获取验证码</button>
            </div>
            <div class="trade-info-item">
                <input type="password" v-model="tradePassword" name="tradePassword" placeholder="请设置支付密码"/>
            </div>
            <div class="trade-info-item">
                <input type="password" class="relative" v-model="onceTradePassword"  name="onceTradePassword" placeholder="请确认支付密码">
            </div>
        </div>
        <div class="trade-confirm">
            <button class="trade-confirm-button" @click="confirm()" :disabled="!style" :class="{'active':style}">确定</button>
        </div>
    </div>
</template>
<script>
import Request from '../../../../utils/require';
import validateFun from '../../../../utils/validate.js';
export default {
    data() {
        return {
            phone: '',
            verifyCode: '',
            tradePassword: '',
            onceTradePassword: '',
            num: 300,
            codeShow: false,
        };
    },
    computed: {
        style() {
            if (this.onceTradePassword && this.tradePassword && this.phone && this.verifyCode) {
                return true;
            }
            return false;
        },
        code() {
            if (this.phone) {
                return true;
            }
            return false;
        },
    },
    methods: {
        getCode() { // 3 修改密码，4修改交易密码 接受验证码类型：0: 手机号， 1：邮箱
            if (this.phone) {
                const val = this.phone.indexOf('@');
                const type = val > -1 ? 1 : 0;
                Request({
                    url: 'QueryPasswordCodes',
                    data: {
                        email: this.phone,
                        codeType: 4,
                        registerType: type,
                    },
                    type: 'post',
                    flag: true,
                    feedback: false,
                }).then(res => {
                    console.log(res);
                });
            }
        },
        confirm() {
            Request({
                url: 'SetTradePassword',
                data: {
                    verificationCode: this.tradepasswordCode,
                    password: validateFun.encrypt(this.tradepassword),
                },
                type: 'post',
                flag: true,
            }).then(res => {
                this.$toast({
                    message: '修改成功',
                    position: 'top',
                    duration: 5000,
                });
                this.info();
                this.cancle();
                this.openTradepassword();
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/tradePassword.scss';
</style>
