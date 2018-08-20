<template>
    <div class="information">
        <header-nav linkName="mine" title="个人信息"></header-nav>
        <mt-cell class="information_kind" @click.native="active" title="头像" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="openInfo(1)" title="昵称" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="openInfo(2)" title="登录密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="openTradepassword()" title="交易密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="绑定Telegram" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="authentication()" title="实名认证" is-link>
        </mt-cell>
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
        <div class="popup" v-if="proup" @click="openInfo">
            <div class="popup_box" @click.stop>
                <div class="popup_box_nickname" v-if="nicknameShow">
                    <p class="popup_box_nickname_title">新的昵称</p>
                    <mt-field :disableClear=true class="popup_box_nickname_input" v-model="nicknameValue"></mt-field>
                    <mt-button @click.native="changeNickName" class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
                <div class="popup_box_nickname passwordBox" v-if="loginPasswordShow">
                    <p class="popup_box_nickname_title">重设登录密码</p>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="原密码" v-model="oldPassword"></mt-field>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="新密码" v-model="password"></mt-field>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="重新输入新密码" v-model="oncePassword"></mt-field>
                    <mt-field :disableClear=true class="popup_box_nickname_input" placeholder="邮箱验证码" v-model="passwordCode"></mt-field>
                    <div class="popup_box_nickname_codebox">
                        <button class="popup_box_nickname_codebox_code" :class="{'gray':emailCode}" :disabled="emailCode" @click="getCode(3)">获取邮箱验证码</button>
                    </div>
                    <mt-button @click.native="changePassword" class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible">
            <div class="information_popupVisible">
                <div class="information_popupVisible_title">提示</div>
                <div>
                    <p>(1）密码长度必须介于8到16个字符之间。</p>
                    <p>(2）密码只能包含英文字母（A-Z）、数字字符（0-9）以及标点符号。</p>
                    <p>(3）密码至少包含1个英文字母和1个数字字符。</p>
                    <p>(4）密码不能与账号相同。</p>
                </div>
                <div class="information_popupVisible_buttonbox">
                    <mt-button class="information_popupVisible_buttonbox_button" type="primary" @click.native="popupVisible = false">确认</mt-button>
                </div>
            </div>
        </mt-popup>
        <div class="popup" v-if="proups" @click="openTradepassword">
            <div class="popup_box" @click.stop>
                <div class="popup_box_nickname passwordBox" v-if="!existTradePassword">
                    <p class="popup_box_nickname_title">设置交易密码</p>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="输入交易密码" v-model="tradepassword"></mt-field>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="重新输入交易密码" v-model="onceTradepassword"></mt-field>
                    <mt-field :disableClear=true class="popup_box_nickname_input" placeholder="邮箱验证码" v-model="tradepasswordCode"></mt-field>
                    <div class="popup_box_nickname_codebox">
                        <button class="popup_box_nickname_codebox_code" :class="{'gray':emailCodes}" :disabled="emailCodes" @click="getCode(4)">获取邮箱验证码</button>
                    </div>
                    <mt-button @click.native="setTradePassword" class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
                <div class="popup_box_nickname passwordBox" v-if="existTradePassword">
                    <p class="popup_box_nickname_title">重设交易密码</p>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="原密码" v-model="oldTradepassword"></mt-field>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="新密码" v-model="tradepassword"></mt-field>
                    <mt-field :disableClear=true type="password" class="popup_box_nickname_input" placeholder="重新输入新密码" v-model="onceTradepassword"></mt-field>
                    <mt-field :disableClear=true class="popup_box_nickname_input" placeholder="邮箱验证码" v-model="tradepasswordCode"></mt-field>
                    <div class="popup_box_nickname_codebox">
                        <button class="popup_box_nickname_codebox_code" :class="{'gray':emailCodes}" :disabled="emailCodes" @click="getCode(4)">获取邮箱验证码</button>
                    </div>
                    <mt-button @click.native="changeTradePassword" class="popup_box_nickname_button" type="primary" popup_box_nickname_input size="large">确认</mt-button>
                </div>
            </div>
        </div>

        <div class="avatar">
            <file-upload style="visibility: hidden;" extensions="gif,jpg,jpeg,png,webp" accept="image/png,image/gif,image/jpeg,image/webp" name="avatar" class="btn btn-primary"  :drop="!edit" v-model="files" @input-filter="inputFilter" @input-file="inputFile"
                ref="upload">
            </file-upload>
            <div class="avatar-edit" v-show="files.length && edit">
                <div class="avatar-edit-image" v-if="files.length">
                    <img ref="editImage" :src="files[0].url" />
                </div>
                <div class="avatar-edit-btn">
                    <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">取消</button>
                    <button type="submit" class="btn btn-primary" @click.prevent="editSave">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    import validateFun from '../../../utils/validate.js';
    import Utils from '../../../utils/util';
    import Config from '../../../utils/config';
    import Cropper from 'cropperjs';
    import axios from 'axios'
    export default {
        data() {
            return {
                utils: new Utils(),
                actions: [{ name: '从相册中选择', method: this.album }],
                sheetVisible: false,
                proup: false, //昵称-登录密码蒙版
                proups: false, //交易密码蒙版
                nicknameShow: false, //昵称
                nicknameValue: this.$store.state.usernickname || Cache.getSession('bier_usernickname'),
                username: this.$store.state.username || Cache.getSession('bier_username'),
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                token: this.$store.state.token || Cache.getSession('bier_token'),
                loginPasswordShow: false, //登录密码
                oldPassword: '',
                password: '',
                oncePassword: '',
                passwordCode: '',
                emailCode: false,
                existTradePassword: false, //交易密码
                oldTradepassword: '',
                tradepassword: '',
                onceTradepassword: '',
                tradepasswordCode: '',
                emailCodes: false,
                popupVisible: false, //密码规则
                authStatus: '',
                // avatar
                uploadImg: Config.UploadImg,
                files: [],
                edit: false,
                cropper: false,
            }
        },
        mounted() {
            this.info();
        },
        watch: {
            edit(value) {
                // console.log('edit->', value);
                if (value) {
                    this.$nextTick(function () {
                        console.log('value watch edit->', this.$refs.editImage);
                        if (!this.$refs.editImage) {
                            return
                        }

                        let cropper = new Cropper(this.$refs.editImage, {
                            aspectRatio: 1 / 1,
                            viewMode: 1,
                        })
                        this.cropper = cropper
                    })
                } else {
                    if (this.cropper) {
                        this.cropper.destroy()
                        this.cropper = false
                    }
                }
            }
        },
        methods: {
            info() {
                Request({
                    url: 'QuerySettings',
                    type: 'get',
                }).then(res => {
                    this.authStatus = res.data.authStatus;
                    this.existTradePassword = res.data.existTradePassword;
                    // this.bindEmail = res.data.Email;
                    // this.existEmail = res.data.existEmail;
                    // this.existPassword = res.data.existPassword;
                    // this.isBindTelegram = res.data.isBindTelegram;
                    // this.existImg = res.data.nickname;
                    // this.existNickname = res.data.heardUrl;
                })
            },
            authentication() {
                if (this.authStatus == 0) {
                    this.$router.push({
                        name: 'authentication'
                    })
                } else {
                    this.$router.push({
                        name: 'authImg'
                    })
                }
            },
            cancle() {
                this.oldPassword = '';
                this.password = '';
                this.oncePassword = '';
                this.tradepassword = '';
                this.oldTradepassword = '';
                this.onceTradepassword = '';
                this.passwordCode = "";
                this.tradepasswordCode = "";
            },
            active() { //选择相册-show
                this.sheetVisible = !this.sheetVisible;
            },
            album() { //相册的回调
                // console.log('click->', this.$refs.upload.$children[0].$el);
                this.$refs.upload.$children[0].$el.click();
            },
            mask() { //昵称-登录密码蒙版
                this.proup = !this.proup;
            },
            openInfo(value) {
                this.mask();
                this.kinds(value);
            },
            openTradepassword() { //交易密码蒙版
                this.proups = !this.proups;
            },
            kinds(value) { //根据value打开-昵称、登录密码
                switch (value) {
                case 1:
                    this.nicknameShow = !this.nicknameShow; //nickname-show
                    break;
                case 2:
                    this.loginPasswordShow = !this.loginPasswordShow; //loginPassword-show
                    break;
                default:
                    this.nicknameShow = false; //nickname-show
                    this.loginPasswordShow = false; //loginPassword-show
                    break;
                }
            },
            changeNickName() { //修改昵称
                if (this.nicknameValue.length <= 8) {
                    Request({
                        url: 'QueryAccountSettings',
                        data: { id: this.accountId, nickname: this.nicknameValue, },
                        type: 'post',
                        flag: true
                    }).then(res => {
                        this.$store.commit('setUserNickName', this.nicknameValue);
                        Cache.setSession('bier_usernickname', this.nicknameValue);
                        this.$toast({
                            message: '修改成功',
                            position: 'top',
                            duration: 5000
                        });
                        this.mask();
                    }).catch(e => {
                        console.error('changenickname error_ > ', e);
                    })
                } else {
                    this.$toast({
                        message: '请输入8位以内昵称',
                        position: 'top',
                        duration: 5000
                    });
                }

            },
            getCode(value) { //获取邮箱验证码 4-交易密码 3-登录密码
                Request({
                    url: 'QueryPasswordCode',
                    data: { codeType: value, },
                }).then(res => {
                    this.$toast({
                        message: this.utils.judgeLanguage(this.$store.state.slangChange || this.$i18n.locale, res.message),
                        position: 'top',
                        duration: 5000
                    });
                    let timerEmail = setInterval(() => {
                        let num = 300;
                        if (value == 3) {
                            this.emailCode = true;
                        } else {
                            this.emailCodes = true;
                        }
                        num--;
                        if (num < 1) {
                            clearInterval(timerEmail);
                            if (value == 3) {
                                this.emailCode = false;
                            } else {
                                this.emailCodes = false;
                            }
                            num = 300;
                        }
                    }, 1000);

                })
            },
            setTradePassword() { //设置交易密码
                var str = this.tradepassword;
                var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username;
                if (value) {
                    if (this.tradepassword === this.onceTradepassword)
                    {
                        Request({
                            url: 'SetTradePassword',
                            data: {
                                verificationCode: this.tradepasswordCode,
                                password: validateFun.encrypt(this.tradepassword),
                            },
                            type: 'post',
                            flag: true
                        }).then(res => {
                            this.$toast({
                                message: '修改成功',
                                position: 'top',
                                duration: 5000
                            });
                            this.info();
                            this.cancle();
                            this.openTradepassword();
                        })
                    } else {
                        this.$toast({
                            message: '两次输入密码不一致',
                            position: 'top',
                            duration: 5000
                        });
                    }
                } else {
                    this.popupVisible = true;
                }
            },
            changeTradePassword() { //修改交易密码
                var str = this.tradepassword;
                var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username;
                if (value) {
                    if (this.tradepassword === this.onceTradepassword) {
                        Request({
                            url: 'QueryAccountSettings',
                            data: {
                                id: this.accountId,
                                tradePassword: validateFun.encrypt(this.tradepassword),
                                oldTradePassword: validateFun.encrypt(this.oldTradepassword),
                                verificationCode: this.tradepasswordCode,
                            },
                            type: 'post',
                            flag: true
                        }).then(res => {
                            this.$toast({
                                message: '修改成功',
                                position: 'top',
                                duration: 5000
                            });
                            this.info();
                            this.cancle();
                            this.openTradepassword();
                        })
                    } else {
                        this.$toast({
                            message: '两次输入密码不一致',
                            position: 'top',
                            duration: 5000
                        });
                    }
                } else {
                    this.popupVisible = true;
                }
            },
            changePassword() {
                var str = this.password;
                var value = /^.*?[\d]+.*$/.test(str) && /^.*?[A-Za-z]/.test(str) && /^.{8,16}$/.test(str) && str !== this.username && str === this.oncePassword;
                if (value) {
                    Request({
                        url: 'QueryAccountSettings',
                        data: {
                            id: this.accountId,
                            oldPassword: validateFun.encrypt(this.oldPassword),
                            password: validateFun.encrypt(this.password),
                            verificationCode: this.passwordCode,
                        },
                        type: 'post',
                        flag: true
                    }).then(res => {
                        this.out();
                    })
                } else {
                    this.popupVisible = true;
                }
            },
            out() {
                Request({
                    url: 'SignOut',
                    type: 'get',
                    data: { token: this.token }
                }).then(res => {
                    this.handleSignOut();
                    this.$router.push({ name: 'index' });
                })
            },
            handleSignOut() {
                this.$store.commit('setUserId', undefined);
                this.$store.commit('setUserName', undefined);
                this.$store.commit('setUserNickName', undefined);
                this.$store.commit('setToken', undefined);
                this.$store.commit('setHeardUrl', undefined);
                this.$store.commit('setInviteCode', '');
                Cache.removeCookie('login_identify');
                Cache.removeCookie('login_token');
                Cache.removeSession('bier_username');
                Cache.removeSession('bier_token');
                Cache.removeSession('bier_userid');
                Cache.removeSession('bier_userid');
                Cache.removeSession('bier_inviteCode');
                Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
            },
            // avatar
            inputFile(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    this.$nextTick(function () {
                        this.edit = true
                    })
                }
                if (!newFile && oldFile) {
                    this.edit = false
                }
            },
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                        this.$toast('Your choice is not a picture')
                        return prevent()
                    }
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.url = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.url = URL.createObjectURL(newFile.file)
                    }
                }
            },
            editSave() {
                this.edit = false
                let oldFile = this.files[0]
                let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
                let arr = new Uint8Array(binStr.length)
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                let file = new File([arr], oldFile.name, { type: oldFile.type });

                var formData = new FormData();
                formData.append("file", file);
                axios({
                    url: this.uploadImg,
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: this.token,
                    }
                }).then(res => {
                    this.selectImg(res.data.data);
                }).catch(console.error)
            },
            selectImg(url) {
				Request({
					url: 'QueryAccountSettings',
					data: {
						id: this.accountId,
						headUrl: url,
					},
					type: 'post',
					flag: true
				}).then(res => {
                    this.$store.commit('setHeardUrl', url);
                    Cache.setSession('bier_heardUrl', url);
                    this.$toast('修改成功');
				})
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
        &_popupVisible {
            padding: pxTorem(5px);
            &_title {
                font-size: 16px;
                text-align: center;
                margin-bottom: pxTorem(5px);
            }
            &_buttonbox {
                display: flex;
                justify-content: center;
                margin-top: pxTorem(5px);
                &_button {
                    width: pxTorem(60px);
                    height: pxTorem(30px);
                    background: rgba(0, 158, 194, 1);
                    border-radius: 4px;
                    color: #ffffff;
                    font-size: 14px;
                }
            }
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
                    &_codebox {
                        @include remCalc(padding, 0, 10px);
                        text-align: right;
                        &_code {
                            color: #009ec2;
                            font-size: 12px;
                            margin-bottom: pxTorem(20px);
                            background: transparent;
                        }
                    }
                    .gray {
                        color: rgba(174, 174, 174, 1);
                    }
                }
            }
            .passwordBox {
                height: pxTorem(328px);
            }
        }
    }
    .avatar-edit {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        .avatar-edit-image {
            margin-top: pxTorem(100px);
            max-width: 100%;
            max-height: 60%;
            img {
                max-width: 80%;
                max-height: 50%;
            }
        }
        .avatar-edit-btn {
            margin-top: pxTorem(30px);
            text-align: center;
            button {
                @extend %custom-btn;
                &.btn-secondary {
                    background: #999;
                    margin-right: 30px;
                }
            }
        }
    }
</style>