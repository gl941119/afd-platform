<template>
    <div class="login">
        <header-nav link-name="index"></header-nav>
        <div class="login_info">
            <input style="display:none">
            <div class="login_info_box">
                <label class="login_info_box_label">账号：</label>
                <input class="login_info_box_kind" autocomplete="off" v-model="username" />
            </div>
            <div class="login_info_box">
                <label class="login_info_box_label">密码：</label>
                <input class="login_info_box_kind" autocomplete="off" type="password" v-model="password" />
            </div>
            <div class="login_buttonBox">
                <mt-button :class="{'blue_button':isSelected }" @click.native="login()" :disabled="!isSelected" class="login_buttonBox_button" type="primary" size="large">登录</mt-button>
            </div>
            <div class="login_notic">
                <span>忘记密码？</span>
                <span>新用户注册</span>
            </div>
        </div>
    </div>
</template>
<script>
    import validateFun from '../../utils/validate.js';
    import Request from '../../utils/require';
    export default {
        data() {
            return {
                username: '',
                password: '',
                validateKey: undefined,
            }
        },
        computed: {
            isSelected() {
                if (this.username && this.password) {
                    var value = true;
                }
                return value;
            }
        },
        methods: {
            login() {
                Request({
                    url: 'Login',
                    data: {
                        email: validateFun.encrypt(this.username),
                        password: validateFun.encrypt(this.password),
                        validateKey: this.validateKey,
                    },
                    type: 'post',
                    flag: true,
                }).then(res => {
                    this.handleLoginSucc(res.data);
                }).catch(e => {
                    // console.log('err',e); if (e.message === '1035') { this.createCode(); } })
                })
            },
            handleLoginSucc(data) {
                let { id, email, nickname, token, phone, heardUrl, } = data;
                this.$store.commit('setUserId', id);
                this.$store.commit('setUserName', email);
                this.$store.commit('setUserNickName', nickname);
                this.$store.commit('setToken', token);
                this.$store.commit('setHeardUrl', heardUrl);
                Cache.setSession('bier_userid', id);
                Cache.setSession('bier_username', email);
                Cache.setSession('bier_usernickname', nickname);
                Cache.setSession('bier_token', token);
                Cache.setSession('bier_heardUrl', heardUrl);
                this.$router.push({ name: 'index' });
            },
        }
    }
</script>
<style lang="scss" scfoped>
    @import '../../assets/css/global.scss';
    .login {
        &_info {
            @include remCalc(padding, 100px, 58px);
            &_box {
                border-bottom: 1px solid #d8d8d8;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 13px;
                color: rgba(174, 174, 174, 1);
                &_kind {
                    height: pxTorem(35px);
                    flex: 1;
                    color: rgba(174, 174, 174, 1);
                    @include remCalc(padding, 0, 10px);
                }
            }
        }
        &_buttonBox {
            @include remCalc(margin, 20px, 0, 13px);
            &_button {
                width: pxTorem(260px);
                height: pxTorem(30px);
                background: rgba(243, 243, 243, 1);
                border-radius: 4px;
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
            }
            .blue_button {
                background: rgba(0, 158, 194, 1);
                color: rgba(255, 255, 255, 1);
            }
        }
        &_notic {
            font-size: 11px;
            color: rgba(0, 158, 194, 1);
            display: flex;
            justify-content: space-between;
        }
    }
</style>