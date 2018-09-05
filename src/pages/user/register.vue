<template>
    <div class="register">
        <header-nav></header-nav>
        <img class="register-img" src="../../assets/imgs/img/login-logo.png">
        <div class="register_info">
            <div class="register_info_number">
                <span>+86 中国大陆</span>
                <i class="custom-vant-icon-xialaanniu1"></i>
            </div>
            <input style="display:none">
            <div class="register_info_box">
                <input class="register_info_box_kind" v-validate="{required: true, regex: /^((13|14|15|17|18)[0-9]{1}\d{8})$/}" name="phone" placeholder="请输入手机号" autocomplete="off" v-model="register.phone" />
                <span class="is-danger" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
            </div>
            <div class="register_info_box verify">
                <input class="register_info_box_kind" autocomplete="off" placeholder="请输入验证码" v-validate="'required'" name="verifyCode" v-model="register.verify" />
                <span class="is-danger" v-show="errors.has('verifyCode')">{{errors.first('verifyCode')}}</span>
                <van-button v-if="disabled" @click="sendVerify" size="small" :class="{'lost-active': !isPhoneCorrect}" :disabled="!isPhoneCorrect" type="warning">获取验证码</van-button>
                <van-button v-else size="small" class="lost-active" >({{num}}s)后重试</van-button>
            </div>
            <div class="register_info_box">
                <input type="password" name="password" v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/}" v-model="register.password" class="register_info_box_kind" ref="password" autocomplete="off" placeholder="请输入密码" />
                <span class="is-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
            </div>
            <div class="register_info_box">
                <input type="password" name="passwordAgain" v-validate="'required|confirmed:password'" v-model="register.passwordAgain" class="register_info_box_kind" autocomplete="off" placeholder="请再次输入密码" />
                <span class="is-danger" v-show="errors.has('passwordAgain')">{{errors.first('passwordAgain')}}</span>
            </div>
            <div class="register_info_box invite">
                <input name="inviteCode" v-model="register.inviteCode" class="register_info_box_kind" autocomplete="off" placeholder="请输入邀请码（选填）" />
            </div>
            <div class="register-checkbox">
                <input v-model="register.disclaimerChecked" type="checkbox" name="userTerm" id="userTerm">
                <label for="userTerm">我已同意</label>
                <a @click="showUserTerm(true)" href="javascript:;">AFDCHAIN用户协议</a>
                <a @click="toLogin" class="go-to-login" href="javascript:;">已有账号,去登录</a>
            </div>
            <div class="register-bottom">
                <van-button type="warning" @click="registerBtn" :disabled="!isSelected" class="register-bottom-btn" :class="{'blue_button':isSelected }">注册</van-button>
            </div>
        </div>
        <div class="register-fixed" v-if="registerTerm">
            <div class="register-fixed_font" @click.stop="showUserTerm(false)">
                <i class="custom-mint-icon-cuo"></i>
            </div>
            <div class="register-fixed_content" v-html="content"></div>
        </div>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Utils from '../../utils/util.js';
    import userRegEn from './user-register-en.js';
    import userRegZh from './user-register-ch.js';
    export default {
        data() {
            return {
                num: 60,
                disabled: true,
                utils: new Utils(),
                register: {
                    phone: '',
                    verify: '',
                    password: '',
                    passwordAgain: '',
                    inviteCode: this.$store.state.registerCode,
                    disclaimerChecked: true,
                },
                registerTerm: false,
            };
        },
        computed: {
            isSelected() {
                const { phone, verify, password, passwordAgain } = this.register;
                if (phone && verify && password && passwordAgain) {
                    return true;
                }
                return false;
            },
            isPhoneCorrect() {
                return this.fieldBags['phone'] && this.fieldBags['phone'].valid;
            },
            language() {
                return this.$store.state.slangChange;
            },
            content() {
                return this.language.toUpperCase() === 'EN' ? userRegEn : userRegZh;
            },
        },
        methods: {
            sendVerify() {
                if (this.register.phone) {
                    Request({
                        url: 'SendVerifyCode',
                        data: {
                            email: this.register.phone,
                            registerType: 0,
                        },
                    }).then(res => {
                        this.disabled = false;
                        const timer = setInterval(() => {
                            this.num--;
                            if (this.num < 1) {
                                clearInterval(timer);
                                this.disabled = true;
                                this.num = 60;
                            }
                        }, 1000);
                        this.$toast(this.utils.judgeLanguage(this.language, res.message));
                    }).catch(console.error);
                } else {
                    this.$toast('phone is empty');
                }
            },
            registerBtn() {
                const {
                    phone,
                    verify,
                    password,
                    inviteCode,
                } = this.register;
                if (this.register.disclaimerChecked) {
                    this.$validator.validateAll().then(valid => {
                        if (valid) {
                            Request({
                                url: 'Register',
                                data: {
                                    authCode: verify,
                                    email: phone,
                                    password,
                                    inviteCode,
                                    registerType: 0,
                                },
                                flag: true,
                            }).then(res => {
                                this.toLogin();
                                this.$toast(this.utils.judgeLanguage(this.language, res.message));
                            });
                        } else {
                            this.$toast('表单尚未正确填写');
                        }
                    });
                } else {
                    this.$toast('请阅读用户协议');
                }
            },
            toLogin() {
                this.$router.push({ name: 'login' });
            },
            showUserTerm(value) {
                this.registerTerm = value;
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import './user.scss';
    .register-fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 9999;
        height: 100%; // position: relative;
        &_font {
            position: relative;
            i {
                position: absolute;
                right: 42px;
                top: 48px;
            }
        }
    }
</style>