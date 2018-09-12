<template>
    <div class="login">
        <header-nav :skip-name="'login'" :query="redirect" skip-title="快速登录"></header-nav>
        <img class="login-img" src="../../assets/imgs/img/login-logo.png">
        <div class="login_info">
            <input style="display:none">
            <div class="login_info_box">
                <input class="login_info_box_kind" name="phone" placeholder="请输入邮箱或手机号" autocomplete="off" v-model="account" />
            </div>
            <div class="login_info_box">
                <input class="login_info_box_kind" autocomplete="off" type="password" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="login_info_box verify-code">
                <input class="login_info_box_kind" autocomplete="off" placeholder="请输入验证码" v-model="verify" />
                <img v-if="base64Str" class="verify-code-img" width="84" height="40" :src="'data:image/png;base64, ' + base64Str">
                <div class="verify-code-text" @click="getCode"><span>看不清,换一张</span></div>
            </div>
            <div class="login_buttonBox">
                <van-button type="warning" :class="{'blue_button':isSelected }" @click.native="login()" :disabled="!isSelected" class="login_buttonBox_button">登录</van-button>
            </div>
            <div class="login_notic">
                <a href="javascript:;" @click="goToRegister">新用户注册</a>
                <a href="javascript:;" @click="goToForget">忘记密码？</a>
            </div>
        </div>
    </div>
</template>
<script>
    import validateFun from '../../utils/validate.js';
    import Request from '../../utils/require';
    import Cache from '../../utils/cache';
    export default {
        name: 'QuickLogin',
        data() {
            return {
                redirect: this.$route.query.redirect,
                account: '',
                password: '',
                verify: '',
                id: this.$store.state.id,
                validateKey: '  ',
                base64Str: '',
            };
        },
        mounted() {
            this.getCode();
        },
        computed: {
            isSelected() {
                if (this.account && this.verify && this.password) {
                    return true;
                }
                return false;
            },
        },
        methods: {
            login() {
                const {
                    account,
                    password,
                } = this;
                if (account) {
                    const val = account.indexOf('@');
                    const type = val > -1 ? 1 : 0;
                    Request({
                        url: 'Login',
                        data: {
                            email: validateFun.encrypt(account),
                            password: validateFun.encrypt(password),
                            validateCode: this.verify,
                            validateKey: this.validateKey,
                            loginType: type,
                        },
                        type: 'post',
                        flag: true,
                    }).then(res => {
                        this.handleLoginSucc(res.data);
                    }).catch(e => {
                        if (e.message === '1004') {
                            this.$dialog.confirm({
                                title: '提示',
                                message: '该账户不存在，请先注册',
                            }).then(() => {
                                this.goToRegister();
                            }).catch(console.log);
                        }
                        if (e.message === '1035') {
                            this.getCode();
                            this.verify = '';
                        }
                    });
                }
            },
            getCode() {
                Request({
                    url: 'GetVerifyFromSer',
                    type: 'get',
                }).then(res => {
                    this.base64Str = res.data.base64Str;
                    this.validateKey = res.data.validateKey;
                });
            },
            handleLoginSucc(data) {
                const { id, email, nickname, token, heardUrl } = data;
                this.$store.commit('setUserId', id);
                this.$store.commit('setUserName', email);
                this.$store.commit('setUserNickName', nickname); // cookie 中不保存 token
                token && this.$store.commit('setToken', token);
                this.$store.commit('setHeardUrl', heardUrl);
                var exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 10); // 这里表示保存10分钟
                document.cookie = 'login_identify=' + id + ';expires=' + exp.toGMTString();
                token && (document.cookie = 'login_token=' + token + ';expires=' + exp.toGMTString());
                Cache.setSession('bier_userid', id);
                Cache.setSession('bier_username', email);
                nickname && Cache.setSession('bier_usernickname', nickname);
                token && Cache.setSession('bier_token', token);
                heardUrl && Cache.setSession('bier_heardUrl', heardUrl);
                if (this.redirect) {
                    this.$router.push({
                        name: this.redirect,
                    });
                } else {
                    this.$router.push({
                        name: 'mine',
                    });
                }
            },
            goToRegister() {
                this.$router.push({ name: 'register', query: { redirect: this.redirect }});
            },
            goToForget() {
                this.$router.push({ name: 'forget', query: { redirect: this.redirect }});
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .login {
        &-img {
            width: pxTorem(231px);
            margin: pxTorem(50px) auto 0;
            display: block;
        }

        &_info {
            @include remCalc(padding, 40px, 58px);

            &_box {
                @include remCalc(margin, 12px, 0);
                @include content-flex(flex-start, flex-start);
                border-bottom: 1px solid #d8d8d8;
                width: 100%;
                font-size: 14px;
                position: relative;

                &_kind {
                    height: pxTorem(40px);
                    flex: 1;
                    background: transparent;
                }
                &.verify-code {
                    border: none;
                    .login_info_box_kind {
                        width: 85px;
                        border-bottom: 1px solid #d8d8d8;
                    }
                    .verify-code-img {
                        border: 1px solid #d8d8d8;
                        margin: 0 pxTorem(5px);
                    }
                    .verify-code-text {
                        height: 40px;
                        color: #666666;
                        @include content-flex(flex-start, flex-end);
                        font-size: 12px;
                    }
                }

                span.is-danger {
                    position: absolute;
                    bottom: -16px;
                    color: #ff3860;
                    font-size: 12px;
                }
            }
        }

        &_buttonBox {
            @include remCalc(margin, 20px, 0, 13px);

            &_button {
                width: pxTorem(260px);
                background: #ccc;
                border-radius: 4px;
                font-size: 16px;
                color: #fff;
            }

            .blue_button {
                background: #FF9500;
                color: rgba(255, 255, 255, 1);
            }
        }

        &_notic {
            font-size: 11px;
            display: flex;
            justify-content: space-between;

            a {
                color: #3B98FC;
                text-decoration: underline;
            }
            }

        .lost-active {
            background: #ccc;
            color: #fff;
            border-color: #ccc;
        }
    }
</style>