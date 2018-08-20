<template>
    <div class="register">
        <header-nav></header-nav>
        <div class="register_info">
            <input style="display:none">
            <div class="register_info_box">
                <label class="register_info_box_label">账号：</label>
                <input type="text" v-validate="'required|email'" name="email" v-model="register.email" class="register_info_box_kind" placeholder="请输入邮箱" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            <div class="register_info_box verify">
                <label class="register_info_box_label">验证码：</label>
                <input type="text" v-validate="'required'" name="verifyCode" v-model="register.verifyCode" class="register_info_box_kind" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('verifyCode')">{{errors.first('verifyCode')}}</span>
                <div class="register_info_box_buttonbox">
                    <mt-button v-if="disabled" @click.native="sendVerifyCode" plain size="small" class="register_info_box_buttonbox_button">获取验证码</mt-button>
                    <mt-button v-else @click.native="sendVerifyCode" plain size="small" class="register_info_box_buttonbox_button">(
                        <span>{{num}}</span>s)重试</mt-button>
                </div>
            </div>
            <div class="register_info_box">
                <label class="register_info_box_label">密码：</label>
                <input type="password" name="password" v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/}" v-model="register.password" class="register_info_box_kind" ref="password" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
            </div>
            <div class="register_info_box">
                <label class="register_info_box_label">确认密码：</label>
                <input type="password" name="passwordAgain" v-validate="'required|confirmed:password'" v-model="register.passwordAgain" class="register_info_box_kind" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('passwordAgain')">{{errors.first('passwordAgain')}}</span>
            </div>
            <div class="register_info_box invite">
                <label class="register_info_box_label">邀请码：</label>
                <input name="inviteCode" v-model="register.inviteCode" class="register_info_box_kind" autocomplete="off" />
                <span>(选填)</span>
            </div>
            <div class="register-checkbox">
                <input v-model="register.disclaimerChecked" type="checkbox" name="userTerm" id="userTerm">
                <label for="userTerm">我已同意</label>
                <a @click="showUserTerm(true)" href="javascript:;">AFDCHAIN用户协议</a>
            </div>
            <div class="register-bottom">
                <mt-button @click.native="registerBtn" size="small" class="register-bottom-btn btn-active">注册</mt-button>
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
    import Utils from '../../utils/util.js'
    import userRegEn from './user-register-en.js';
    import userRegZh from './user-register-ch.js';
    export default {
        data() {
            return {
                num: 60,
                disabled: true,
                utils: new Utils(),
                register: {
                    email: '',
                    verifyCode: '',
                    password: '',
                    passwordAgain: '',
                    inviteCode: '',
                    disclaimerChecked: true,
                },
                registerTerm: false,
            }
        },
        computed: {
            language() {
                return this.$store.state.slangChange;
            },
            content() {
                return this.language.toUpperCase() === 'EN' ? userRegEn : userRegZh;
            }
        },
        methods: {
            sendVerifyCode() {
                if (this.register.email) {
                    Request({
                        url: 'SendVerifyCode',
                        data: {
                            email: this.register.email,
                        }
                    }).then(res => {
                        this.disabled = false;
                        let timer = setInterval(() => {
                            this.num--;
                            if (this.num < 1) {
                                clearInterval(timer);
                                this.disabled = true;
                                this.num = 60;
                            }
                        }, 1000);
                        this.$toast(this.utils.judgeLanguage(this.language, res.message));
                    }).catch(console.error)
                } else {
                    this.$toast('email is empty');
                }
            },
            registerBtn() {
                let {
                    email,
                    verifyCode,
                    password,
                    inviteCode
                } = this.register;
                if (this.register.disclaimerChecked) {
                    this.$validator.validateAll().then(valid => {
                        if (valid) {
                            Request({
                                url: 'Register',
                                data: {
                                    authCode: verifyCode,
                                    email,
                                    password,
                                    inviteCode
                                },
                                flag: true
                            }).then(res => {
                                this.toLogin();
                                this.$toast(this.utils.judgeLanguage(this.language, res.message))
                            });
                        } else {
                            this.$toast('表单格式不匹配')
                        }
                    });
                } else {
                    this.$toast('请阅读用户协议')
                }
            },
            toLogin() {
                this.$router.push({ name: 'login' })
            },
            showUserTerm(value) {
                this.registerTerm = value;
            },
        }
    }
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