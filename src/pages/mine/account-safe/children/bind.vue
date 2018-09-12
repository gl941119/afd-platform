<template>
    <div class="input">
        <header-nav linkName="account" isBlue=true class="input-header" :title="title"></header-nav>
        <div class="input-info">
            <div class="input-info-item">
                <input v-model="account" name="oldPassword" :placeholder="placeholder"/>
            </div>
            <div class="input-info-item">
                <input class="relative" v-model="verifyCode" name="verifyCode" placeholder="请输入验证码">
                <button class="input-info-item-button" :disabled="!code" v-if="!codeShow" :class="{'active':code}" @click="getCode()">获取验证码</button>
                <button class="input-info-item-button" v-else>({{num}}s)后重试</button>
            </div>
        </div>
        <div class="input-confirm">
            <button class="input-confirm-button" @click="confirm()" :class="{'active':style}">确定</button>
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
            account: '',
            verifyCode: '',
            num: 60,
            codeShow: false,
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
        code() {
            const reg = (this.value === '1') ? /^((13|14|15|17|18)[0-9]{1}\d{8})$/ : /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
            if (reg.test(this.account)) {
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
                this.placeholder = '请输入手机号';
            } else {
                this.title = '邮箱';
                this.placeholder = '请输入邮箱';
            }
        },
        getCode() { // 2: 绑定邮箱验证码 、 8: 绑定手机号、7: 绑定钱包地址
            var type;
            if (this.value === '1') {
                type = 8;
            } else {
                type = 2;
            }
            Request({
                url: 'GetCode',
                data: {
                    email: this.account,
                    codeType: type,
                },
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
                this.$toast.success('验证码发送成功');
            });
        },
        confirm() {
            if (this.value === '1') {
                var phone = this.account;
            } else {
                var email = this.account;
            }
            Request({
                url: 'BindPhoneOrEmail',
                data: {
                    email: email,
                    phone: phone,
                    validateCode: this.verifyCode,
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
