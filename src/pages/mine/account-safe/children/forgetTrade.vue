<template>
    <div class="input">
        <header-nav isBlue=true class="input-header" :title="title"></header-nav>
        <div class="input-info">
            <div v-if="!forgetShow">
                <div class="input-info-item">
                    <input v-model="phone" placeholder="请输入邮箱或手机号"/>
                </div>
                <div class="input-info-item">
                    <input class="relative" v-model="verifyCode" name="verifyCode" placeholder="请输入验证码">
                    <button class="input-info-item-button" :disabled="!code" v-if="!codeShow" :class="{'active':code}" @click="getCode()">获取验证码</button>
                    <button class="input-info-item-button" v-else>({{num}}s)后重试</button>
                </div>
            </div>
            <div v-else>
                <div class="input-info-item">
                    <input type="password" v-model="password" placeholder="支付密码"/>
                </div>
                <div class="input-info-item">
                    <input type="password" v-model="oncePassword" placeholder="确认支付密码"/>
                </div>
            </div>
        </div>
        <div class="input-confirm">
            <button v-if="!forgetShow" class="input-confirm-button" @click="next()" :disabled="!nextShow" :class="{'active':nextShow}">下一步</button>
            <button v-else class="input-confirm-button" @click="confirm()" :disabled="!style" :class="{'active':style}">确定</button>
        </div>
    </div>
</template>
<script>
import Request from '../../../../utils/require';
import validateFun from '../../../../utils/validate.js';
export default {
    data() {
        return {
            title: '找回支付密码',
            phone: '',
            verifyCode: '',
            num: 60,
            codeShow: false,
            password: '',
            oncePassword: '',
            forgetShow: false,
        };
    },
    computed: {
        nextShow() {
            if (this.phone && this.verifyCode) {
                return true;
            }
            return false;
        },
        style() {
            if (this.password && this.oncePassword) {
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
        getCode() { // 接受验证码类型：0: 手机号， 1：邮箱
            if (this.phone) {
                const val = this.phone.indexOf('@');
                const type = val > -1 ? 1 : 0;
                Request({
                    url: 'SendForgetTradeCode',
                    data: {
                        email: this.phone,
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
        next() { // // 2: 绑定邮箱验证码 、 8: 绑定手机号、9: 忘记交易密码 ,
            Request({
                url: 'NoBind',
                data: {
                    email: this.phone,
                    validateCode: this.verifyCode,
                    codeType: 9,
                },
                flag: true,
            }).then(res => {
                this.forgetShow = !this.forgetShow;
            });
        },
        confirm() {
            if (this.password !== this.oncePassword) {
                this.$toast.fail('确认支付密码与支付密码不一致');
                return;
            }
            const val = this.phone.indexOf('@');
            const type = val > -1 ? 1 : 0;

            Request({
                url: 'SendNewTradeCode',
                data: {
                    authCode: this.verifyCode,
                    email: this.phone,
                    newPassword: validateFun.encrypt(this.password),
                    registerType: type,
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
