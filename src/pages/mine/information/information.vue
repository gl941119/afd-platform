<template>
    <div class="information">
        <mt-cell class="information_kind" @click.native="active" title="头像" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="nickname" title="昵称" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="loginPassword" title="登录密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="交易密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="绑定Telegram" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="实名认证" to="/authentication" is-link>
        </mt-cell>
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
        <div class="popup" v-if="proup">
            <div class="popup_box">
                <div class="popup_box_nickname" v-if="nicknameShow">
                    <p class="popup_box_nickname_title">新的昵称</p>
                    <mt-field class="popup_box_nickname_input" v-model="nicknameValue"></mt-field>
                    <mt-button class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
                <div class="popup_box_nickname" v-if="loginPasswordShow">
                    <p class="popup_box_nickname_title">新的昵称</p>
                    <mt-field class="popup_box_nickname_input" v-model="nicknameValue"></mt-field>
                    <mt-button class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                actions: [{ name: '从相册中选择', method: this.album }],
                sheetVisible: false,
                proup: false,
                nicknameShow: false,
                nicknameValue: '',
                loginPasswordShow: false
            }
        },
        methods: {
            active() { //选择相册-show
                this.sheetVisible = !this.sheetVisible;
            },
            album() {
                console.log('打开相册');
            },
            proupShow() { //蒙版
                this.proup = !this.proup;
            },
            nickname() { //nickname-show
                this.proupShow();
                this.nicknameShow = !this.nicknameShow;
            },
            loginPassword() {
                this.proupShow();
                this.loginPasswordShow = !this.loginPasswordShow;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .information {
        background: #fafafa;
        overflow-y: scroll;
        &_kind {
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #e6e6e6;
            /*no*/
        }
        .popup {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 111;
            &_box {
                background: #ffffff;
                width: 298px;
                height: 150px;
                padding: 15px 20px 0;
                &_nickname {
                    &_title {
                        font-size: 16px;
                        color: rgba(51, 51, 51, 1);
                        margin-bottom: 20px;
                    }
                    &_button {
                        width: 150px;
                        height: 30px;
                        background: rgba(0, 158, 194, 1);
                        border-radius: 4px;
                        color: #ffffff;
                        font-size: 16px;
                        margin: 0 auto;
                    }
                }
            }
        }
    }

    .confirm {
        width: 50px;
        background: #f66;
    }
</style>