<template>
    <div class="information">
        <mt-cell class="information_kind" @click.native="active" title="头像" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="openInfo(1)" title="昵称" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="openInfo(2)" title="登录密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="openInfo(3)" title="交易密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="绑定Telegram" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="实名认证" to="/authentication" is-link>
        </mt-cell>
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
        <div class="popup" v-if="proup" @click="openInfo">
            <div class="popup_box">
                <div class="popup_box_nickname" v-if="nicknameShow">
                    <p class="popup_box_nickname_title">新的昵称</p>
                    <mt-field class="popup_box_nickname_input" v-model="nicknameValue"></mt-field>
                    <mt-button class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
                <div class="popup_box_nickname passwordBox" v-if="loginPasswordShow">
                    <p class="popup_box_nickname_title">重设登录密码</p>
                    <mt-field class="popup_box_nickname_input" placeholder="原密码" v-model="oldPassword"></mt-field>
                    <mt-field class="popup_box_nickname_input" placeholder="新密码" v-model="password"></mt-field>
                    <mt-field class="popup_box_nickname_input" placeholder="重新输入新密码" v-model="oncePassword"></mt-field>
                    <mt-field class="popup_box_nickname_input" placeholder="邮箱验证码" v-model="emailCode"></mt-field>
                    <p class="popup_box_nickname_code">获取邮箱验证码</p>
                    <mt-button class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
                <div class="popup_box_nickname passwordBox" v-if="tradePasswordShow">
                    <p class="popup_box_nickname_title">重设交易密码</p>
                    <mt-field class="popup_box_nickname_input" placeholder="原密码" v-model="oldTradepassword"></mt-field>
                    <mt-field class="popup_box_nickname_input" placeholder="新密码" v-model="tradepassword"></mt-field>
                    <mt-field class="popup_box_nickname_input" placeholder="重新输入新密码" v-model="onceTradepassword"></mt-field>
                    <mt-field class="popup_box_nickname_input" placeholder="邮箱验证码" v-model="emailCode"></mt-field>
                    <p class="popup_box_nickname_code">获取邮箱验证码</p>
                    <mt-button class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    export default {
        data() {
            return {
                actions: [{ name: '从相册中选择', method: this.album }],
                sheetVisible: false,
                proup: false,
                nicknameShow: false, //昵称
                nicknameValue: '',
                loginPasswordShow: false, //登录密码
                oldPassword: '',
                password: '',
                oncePassword: '',
                emailCode: '',
                tradePasswordShow: false, //交易密码
                oldTradepassword: '',
                tradepassword: '',
                onceTradepassword: '',
            }
        },
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
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
            openInfo(value) {
                this.proupShow();
                this.kinds(value);
            },
            kinds(value) {
                switch (value) {
                case 1:
                    this.nicknameShow = !this.nicknameShow; //nickname-show
                    break;
                case 2:
                    this.loginPasswordShow = !this.loginPasswordShow; //loginPassword-show
                    break;
                case 3:
                    this.tradePasswordShow = !this.tradePasswordShow; //tradepassword-show
                    break;
                default:
                    this.nicknameShow = false; //nickname-show
                    this.loginPasswordShow = false; //loginPassword-show
                    this.tradePasswordShow = false; //tradepassword-show
                    break;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .information {
        background: #fafafa;
        overflow-y: scroll;
        &_kind {
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #e6e6e6;
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
                width: pxTorem(298px);
                @include remCalc(padding, 15px, 20px, 0);
                &_nickname {
                    height: pxTorem(150px);
                    &_title {
                        font-size: 16px;
                        color: rgba(51, 51, 51, 1);
                        margin-bottom: pxTorem(20px);
                    }
                    &_button {
                        width: pxTorem(150px);
                        height: pxTorem(30px);
                        background: rgba(0, 158, 194, 1);
                        border-radius: 4px;
                        color: #ffffff;
                        font-size: 16px;
                        margin: 0 auto;
                    }
                    &_code {
                        color: #009ec2;
                        font-size: 12px;
                        text-align: right;
                        margin-bottom: pxTorem(20px);
                    }
                }
            }
            .passwordBox {
                height: pxTorem(328px);
            }
        }
    }
</style>