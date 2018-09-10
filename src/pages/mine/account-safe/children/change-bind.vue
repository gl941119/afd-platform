<template>
    <div class="input">
        <header-nav linkName="mine" isBlue=true class="input-header" :title="title"></header-nav>
        <div class="input-info">
            <div v-if="!nextShow">
                <div class="input-info-item">
                    <input v-model="account" name="oldPassword" :placeholder="placeholder"/>
                </div>
                <div class="input-info-item">
                    <input class="relative" v-model="verifyCode" name="verifyCode" placeholder="请输入验证码">
                    <button class="input-info-item-button" :disabled="!code" v-if="!codeShow" :class="{'active':code}" @click="getCode()">获取验证码</button>
                    <button class="input-info-item-button" v-else>({{num}}s)后重试</button>
                </div>
            </div>
            <div v-else>
                <div class="input-info-item">
                    <input v-model="newAccount" name="password" :placeholder="newPlaceholder"/>
                </div>
                <div class="input-info-item">
                    <input v-model="newVerifyCode" name="password" placeholder="请输入验证码"/>
                    <button class="input-info-item-button" :disabled="!code" v-if="!codeShow" :class="{'active':codes}" @click="getCodes()">获取验证码</button>
                    <button class="input-info-item-button" v-else>({{num}}s)后重试</button>
                </div>
            </div>
        </div>
        <div class="input-confirm">
            <button v-if="!nextShow" class="input-confirm-button" @click="next()" :class="{'active':style}">下一步</button>
            <button v-else class="input-confirm-button" @click="confirm()" :class="{'active':sure}">确定</button>
        </div>
    </div>
</template>
<script>
import Request from '../../../../utils/require.js';
export default {
    data() {
        return {
            value: '',
            title: '',
            placeholder: '',
            newPlaceholder: '',
            account: '',
            newAccount: '',
            verifyCode: '',
            newVerifyCode: '',
            num: 60,
            codeShow: false,
            nextShow: false,
        };
    },
    mounted() {
        this.kind();
    },
    computed: {
        style() {
            if (this.account && this.verifyCode) {
                return true;
            }
            return false;
        },
        sure() {
            if (this.newAccount && this.newVerifyCode) {
                return true;
            }
            return false;
        },
        code() {
            const reg = (this.value === '1') ? /^((13|14|15|17|18)[0-9]{1}\d{8})$/ : /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
            if (reg.test(this.account)) {
                return true;
            }
            return false;
        },
        codes() {
            const reg = (this.value === '1') ? /^((13|14|15|17|18)[0-9]{1}\d{8})$/ : /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
            if (reg.test(this.newAccount)) {
                return true;
            }
            return false;
        },
    },
    methods: {
        kind() {
            this.value = this.$route.params.value;
            if (this.value === '1') {
                this.title = '手机号';
                this.placeholder = '请输入原手机号';
                this.newPlaceholder = '请输入新手机号';
            } else {
                this.title = '邮箱';
                this.placeholder = '请输入原邮箱';
                this.newPlaceholder = '请输入新邮箱';
            }
        },
        getCode() { // 2: 绑定邮箱验证码 、 8: 绑定手机号
            const type = this.types();
            Request({
                url: 'NoBindGetCode',
                data: {
                    email: this.account,
                    codeType: type,
                },
            }).then(res => {
                this.$toast.success('验证码发送成功');
            });
        },
        types() {
            var type;
            if (this.value === '1') {
                type = 8;
            } else {
                type = 2;
            }
            return type;
        },
        getCodes() { // 2: 绑定邮箱验证码 、 8: 绑定手机号
            const type = this.types();
            Request({
                url: 'GetCode',
                data: {
                    email: this.newAccount,
                    codeType: type,
                },
            }).then(res => {
                this.$toast.success('验证码发送成功');
            });
        },
        next() { // // 2: 绑定邮箱验证码 、 8: 绑定手机号、9: 忘记交易密码 ,
            const type = this.types();
            Request({
                url: 'NoBind',
                data: {
                    email: this.account,
                    validateCode: this.verifyCode,
                    codeType: type,
                },
                flag: true,
            }).then(res => {
                this.nextShow = !this.nextShow;
            });
        },
        confirm() {
            if (this.value === '1') {
                var phone = this.newAccount;
            } else {
                var email = this.newAccount;
            }
            Request({
                url: 'ReBindPhoneEmail',
                data: {
                    email: email,
                    phone: phone,
                    unbindValidateCode: this.verifyCode,
                    validateCode: this.newVerifyCode,
                },
                flag: true,
            }).then(res => {
                this.$toast.success('绑定成功');
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
