<template>
    <div class="register">
        <header-nav title="忘记密码"></header-nav>
        <div v-if="!success" class="register_info forget-password">
            <input style="display:none">
            <div class="register_info_box">
                <input type="text" v-validate="'required'" name="email" v-model="register.email" class="register_info_box_kind" placeholder="请输入邮箱或手机号" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('email')">{{errors.first('email')}}</span>
            </div>
            <div class="register_info_box verify">
                <input type="text" v-validate="'required'" name="verifyCode" v-model="register.verifyCode" class="register_info_box_kind" placeholder="请输入验证码" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('verifyCode')">{{errors.first('verifyCode')}}</span>
                <van-button v-if="disabled" @click="sendVerifyCode" :disabled="!isValid" size="small" type="warning" :class="{'lost-active': !isValid}" class="register_info_box_buttonbox_button">获取验证码</van-button>
                <van-button v-else  size="small" class="register_info_box_buttonbox_button">(
                    <span>{{num}}</span>s)重试</van-button>
            </div>
            <div class="register_info_box">
                <input type="password" name="password" v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/}" v-model="register.password" class="register_info_box_kind" ref="password" placeholder="请输入新密码" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
            </div>
            <div class="register_info_box">
                <input type="password" name="passwordAgain" v-validate="'required|confirmed:password'" v-model="register.passwordAgain" class="register_info_box_kind" placeholder="请确认密码" autocomplete="off" />
                <span class="is-danger" v-show="errors.has('passwordAgain')">{{errors.first('passwordAgain')}}</span>
            </div>
            <div class="register-bottom">
                <van-button @click="registerBtn" type="warning"
                :disabled="!isSelected" :class="{'blue_button':isSelected }"
                class="register-bottom-btn">完成</van-button>
            </div>
        </div>
        <div v-else class="register-success">
            <i class="custom-vant-icon-chenggong1"></i>
            <p class="first">密码修改成功</p>
            <p class="last">{{skip}}s后自动跳转</p>
            <van-button @click="toLogin" class="register-success-btn">重新登录</van-button>
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
                skip: 3,
                utils: new Utils(),
                register: {
                    email: '',
                    verifyCode: '',
                    password: '',
                    passwordAgain: '',
                    disclaimerChecked: true,
                },
                success: false,
            };
        },
        computed: {
            language() {
                return this.$store.state.slangChange;
            },
            isSelected() {
                const { email, verifyCode, password, passwordAgain } = this.register;
                if (email && verifyCode && password && passwordAgain) {
                    return true;
                }
                return false;
            },
            isValid() {
                const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                const phoneReg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                // console.log('res->', reg.test(this.register.email), phoneReg.test(this.register.email));
                if (reg.test(this.register.email) || phoneReg.test(this.register.email)) {
                    return true;
                }
                return false;
            },
        },
        methods: {
            sendVerifyCode() {
                if (this.register.email) {
                    const val = this.register.email.indexOf('@');
                    const type = val > -1 ? 1 : 0;
                    Request({
                        url: 'JudgeEmail',
                        data: {
                            email: this.register.email,
                            registerType: type,
                        },
                    }).then(res => {
                        // console.log('res->', res);
                        return Request({
                            url: 'SendForgetPwdCode',
                            data: {
                                email: this.register.email,
                                registerType: type,
                            },
                        });
                    })
                        .then(res => {
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
                    this.$toast('email is empty');
                }
            },
            registerBtn() {
                const {
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
                            flag: true,
                        }).then(res => {
                            this.success = true;
                            const timer = setInterval(() => {
                                this.skip--;
                                if (this.skip < 1) {
                                    clearInterval(timer);
                                    this.toLogin();
                                    this.skip = 3;
                                }
                            }, 1000);
                        });
                    } else {
                        this.$toast('表单格式不匹配');
                    }
                });
            },
            toLogin() {
                this.$router.push({ name: 'login' });
            },
        },
    };
</script>
<style lang="scss" scoped>
@import '../../assets/css/global.scss';
@import './user.scss';
.forget-password {
    margin-top: pxTorem(102px);
}
.register-success {
    @include content-flex(center);
    margin-top: pxTorem(160px);
    flex-direction: column;
    i {
        font-size: 48px;
        color: #FF9500;
    }
    p {
        color: #666;
        font-size: pxTorem(18px);
        &.first {
            margin-top: 12px;
        }
        &.last {
            margin-bottom: 43px;
        }
    }
    &-btn {
        font-size: pxTorem(18px);
        width: pxTorem(260px);
        background: #FF9500;
        color: #fff;
    }
}
</style>