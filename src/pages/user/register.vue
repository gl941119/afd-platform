<template>
    <div class="register">
        <header-nav></header-nav>
        <div class="register_info">
            <input style="display:none">
            <div class="register_info_box">
                <label class="register_info_box_label">账号：</label>
                <input name="email" v-model="register.email" class="register_info_box_kind" autocomplete="off" />
            </div>
            <div class="register_info_box verify">
                <label class="register_info_box_label">验证码：</label>
                <input name="verifyCode" v-model="register.verifyCode" class="register_info_box_kind" autocomplete="off" />
                <div class="register_info_box_buttonbox">
                    <mt-button plain size="small" class="register_info_box_buttonbox_button">获取验证码</mt-button>
                </div>
            </div>
            <div class="register_info_box">
                <label class="register_info_box_label">密码：</label>
                <input name="password" v-model="register.password" class="register_info_box_kind" autocomplete="off" />
            </div>
            <div class="register_info_box">
                <label class="register_info_box_label">确认密码：</label>
                <input name="passwordAgain" v-model="register.passwordAgain" class="register_info_box_kind" autocomplete="off" />
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
                <mt-button :disabled="!btnActive" :class="{'btn-active': btnActive}" size="small" class="register-bottom-btn">注册</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                btnActive: false,
                register: {
                    email: '',
                    verifyCode: '',
                    password: '',
                    passwordAgain: '',
                    inviteCode: '',
                    disclaimerChecked: true,
                }
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
                    width: pxTorem(180px);
                    color: rgba(174, 174, 174, 1);
                    @include remCalc(padding, 0, 10px);
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