<template>
    <div class="input">
        <header-nav linkName="mine" isBlue=true class="input-header" title="找回支付密码"></header-nav>
        <div class="input-info">
            <div class="input-info-item">
                <input v-model="phone" placeholder="请输入邮箱或手机号"/>
            </div>
            <div class="input-info-item">
                <input class="relative" v-model="verifyCode" name="verifyCode" placeholder="请输入验证码">
                <button class="input-info-item-button" :disabled="!code" v-if="!codeShow" :class="{'active':code}" @click="getCode()">获取验证码</button>
                <button class="input-info-item-button" v-else>({{num}}s)后重试</button>
            </div>
        </div>
        <div class="input-confirm">
            <button class="input-confirm-button" @click="confirm()" :disabled="!style" :class="{'active':style}">确定</button>
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
            num: 60,
            codeShow: false,
        };
    },
    computed: {
        style() {
            if (this.phone && this.verifyCode) {
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
                    feedback: false,
                }).then(res => {
                    const timerEmail = setInterval(() => {
                        this.codeShow = true;
                        this.num--;
                        if (this.num < 1) {
                            clearInterval(timerEmail);
                            this.codeShow = false;
                            this.num = 60;
                        }
                    }, 1000);
                });
            }
        },
        confirm() {
            if (this.tradePassword !== this.onceTradePassword) {
                this.$toast.fail('确认支付密码与支付密码不一致');
                return;
            }
            Request({
                url: 'SetTradePassword',
                data: {
                    verificationCode: this.verifyCode,
                    password: validateFun.encrypt(this.tradepassword),
                },
                type: 'post',
                flag: true,
            }).then(res => {
                this.$toast.success('设置成功');
                this.$router.push({
                    name: 'account',
                });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/input.scss';
</style>
