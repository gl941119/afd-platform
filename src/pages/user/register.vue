<template>
    <div class="register">
        <header-nav></header-nav>
        <div class="register_info">
            <input style="display:none">
            <div class="register_info_box">
                <label class="register_info_box_label">账号：</label>
                <input type="text" v-validate="'required|email'"  name="email" v-model="register.email" class="register_info_box_kind" placeholder="请输入邮箱" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            <div class="register_info_box verify">
                <label class="register_info_box_label">验证码：</label>
                <input type="text" v-validate="'required'" name="verifyCode" v-model="register.verifyCode" class="register_info_box_kind" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('verifyCode')">{{errors.first('verifyCode')}}</span>
                <div class="register_info_box_buttonbox">
                    <mt-button v-if="disabled" @click.native="sendVerifyCode" plain size="small" class="register_info_box_buttonbox_button">获取验证码</mt-button>
                    <mt-button v-else @click.native="sendVerifyCode" plain size="small" class="register_info_box_buttonbox_button">(<span>{{num}}</span>s)重试</mt-button>
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
                <a href="javascript:;">AFDCHAIN用户协议</a>
            </div>
            <div class="register-bottom">
                <mt-button @click.native="registerBtn" size="small" class="register-bottom-btn btn-active">注册</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import Request from '../../utils/require.js';
import Utils from '../../utils/util.js'
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
                }
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
                    this.$validator.validateAll().then( valid => {
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
            toLogin(){
                this.$router.push({name: 'login'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .register {
        width: 100vw;
        &_info {
            width: pxTorem(260px);
            margin: 0 auto;
            margin-top: pxTorem(120px);
            &_box {
                @include remCalc(margin, 20px, 0);
                border-bottom: 1px solid #d8d8d8;
                width: 100%;
                font-size: 13px;
                color: rgba(174, 174, 174, 1);
                position: relative;
                @include content-flex;
                &_kind {
                    height: pxTorem(35px);
                    width: pxTorem(190px);
                    color: rgba(174, 174, 174, 1);
                    @include remCalc(padding, 0, 10px);
                }
                span.is-danger {
                    position: absolute;
                    bottom: -50%;
                    color: #ff3860;
                }
                &_buttonbox {
                    position: absolute;
                    right: 0;
                    top: 0;
                    &_button {
                        padding: 2px;
                        color: #AEAEAE;
                        height: 24px;
                        border-color: #979797;
                        font-size: 13px;
                    }
                }
                &.verify {
                    input {
                        padding-right: 45px;
                    }
                }
                &.invite {
                    position: relative;
                    span {
                        color: #CFCFCF;
                        position: absolute;
                        right: 5px;
                    }
                    input {
                        padding-right: 20px;
                    }
                }
            }
        }
        &-checkbox {
            @include content-flex;
            margin-bottom: pxTorem(20px);
            label {
                color: #CFCFCF;
                margin-left: 5px;
            }
            a {
                color: #469DBD;
            }
        }
        &-bottom {
            &-btn {
                display: block;
                width: 100%;
                font-size: pxTorem(16px);
                color: #333333;
                &.btn-active {
                    background: #009EC2;
                    color: #fff;
                }
            }
        }
    }
</style>