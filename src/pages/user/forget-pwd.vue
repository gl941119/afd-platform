<template>
    <div class="register">
        <header-nav></header-nav>
        <div v-if="!success" class="register_info">
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
            <div class="register-bottom">
                <mt-button @click.native="registerBtn" size="small" class="register-bottom-btn btn-active">完成</mt-button>
            </div>
        </div>
        <div v-else class="register-success">
            <i class="custom-mint-icon-duihao"></i>
            <span>密码修改成功</span>
            <mt-button @click.native="toLogin" size="small" class="register-success-btn">完成</mt-button>
        </div>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Utils from '../../utils/util.js';
    import validateFun from '../../utils/validate.js';
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
                    disclaimerChecked: true,
                },
                success: false,
            }
        },
        computed: {
            language(){
                return this.$store.state.slangChange;
            }
        },
        methods: {
            sendVerifyCode() {
                if (this.register.email) {
                    Request({
                            url: 'JudgeEmail',
                            data: { email: this.register.email },
                        }).then(res => {
                            console.log('res->', res);
                            return Request({
                                url: 'SendForgetPwdCode',
                                data: {
                                    email: this.register.email,
                                }
                            })
                        })
                        .then(res => {
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
                } = this.register;
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        Request({
                            url: 'SetNewPassword',
                            data: {
                                authCode: verifyCode,
                                email,
                                newPassword: validateFun.encrypt(password),
                            },
                            flag: true
                        }).then(res => {
                            this.success = true;
                        });
                    } else {
                        this.$toast('表单格式不匹配')
                    }
                });
            },
            toLogin() {
                this.$router.push({ name: 'login' })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    @import './user.scss';
    .register-success {
        @include content-flex(center);
        margin-top: pxTorem(160px);
        flex-direction: column;
        i {
            font-size: 48px;
            color: #009EC2;
        }
        span {
            color: #AEAEAE;
            font-size: pxTorem(14px);
            @include remCalc(margin, 30, 0, 60);
        }
        &-btn {
            width: pxTorem(260px);
            background: #009EC2;
                color: #fff;
        }
    }
</style>