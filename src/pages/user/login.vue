<template>
    <div class="login">
        <header-nav :skip-name="'pwd'" skip-title="密码登录"></header-nav>
        <img class="login-img" src="../../assets/imgs/img/login-logo.png">
        <div class="login_info">
            <input style="display:none">
            <div class="login_info_box">
                <input class="login_info_box_kind" v-validate="{required: true, regex: /^((13|14|15|17|18)[0-9]{1}\d{8})$/}" name="phone" placeholder="请输入手机号" autocomplete="off" v-model="phone" />
                <span class="is-danger" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
            </div>
            <div class="login_info_box">
                <input class="login_info_box_kind" autocomplete="off" placeholder="请输入验证码" v-model="verify" />
                <van-button v-if="disabled" @click="sendVerify" size="small" :class="{'lost-active': !isPhoneCorrect}" type="warning">获取验证码</van-button>
                <van-button v-else size="small" class="lost-active">({{num}}s)后重试</van-button>
            </div>
            <div class="login_buttonBox">
                <van-button type="warning" :class="{'blue_button':isSelected }" @click="login()" :disabled="!isSelected" class="login_buttonBox_button">快速登录</van-button>
            </div>
            <div class="login_notic">
                <a href="javascript:;" @click="$router.push({name: 'register'})">新用户注册</a>
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
                phone: '',
                verify: '',
                id: this.$store.state.id,
                num: 60,
                disabled: true,
            };
        },
        computed: {
            isSelected() {
                if (this.phone && this.verify) {
                    return true;
                }
                return false;
            },
            isPhoneCorrect() {
                return this.fieldBags['phone'] && this.fieldBags['phone'].valid;
            },
        },
        methods: {
            login() {
                Request({
                    url: 'QuickSmsLogin',
                    data: {
                        phone: validateFun.encrypt(this.phone),
                        validateCode: this.verify,
                    },
                    type: 'post',
                    flag: true,
                }).then(res => {
                    this.handleLoginSucc(res.data);
                }).catch(e => {
                    console.log('err', e);
                });
            },
            sendVerify() {
                if (this.phone) {
                    Request({
                        url: 'SendSmsVerify',
                        data: {
                            phone: this.phone,
                        },
                    }).then((result) => {
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
                    }).catch((err) => {
                        console.error(err);
                    });
                } else {
                    this.$toast('手机号不能为空');
                }
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
                this.$router.push({
                    name: 'mine',
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .login {
        &-img {
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
                color: rgba(51, 51, 51, 1);
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