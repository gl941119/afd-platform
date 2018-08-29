<template>
    <div class="authImg">
        <header-nav linkName="authentication" title="实名认证" class="authImg_header"></header-nav>
        <div class="authImg_box">
            <div class="authImg_box_upload">
                <file-upload class="authImg_box_upload_file" ref="upload" name="1" extensions="gif,jpg,jpeg,png,webp" accept="image/*" :multiple="false" @input-file="getImg">
                    <div v-if="imageBack" class="authImg_box_upload_file_img">
                        <img :src="imageBack" />
                    </div>
                    <div v-else class="authImg_box_upload_file_box">
                        <div>
                            <i class="custom-mint-icon-sousuo"></i>
                        </div>
                        <div class="authImg_box_upload_file_box_text">身份证正面</div>
                    </div>
                </file-upload>
            </div>
            <div class="authImg_box_upload">
                <file-upload class="authImg_box_upload_file" ref="upload" name="2" extensions="gif,jpg,jpeg,png,webp" accept="image/*" :multiple="false" @input-file="getImgTwo">
                    <div v-if="imagePositive" class="authImg_box_upload_file_img">
                        <img :src="imagePositive" />
                    </div>
                    <div v-else class="authImg_box_upload_file_box">
                        <div>
                            <i class="custom-mint-icon-sousuo"></i>
                        </div>
                        <div class="authImg_box_upload_file_box_text">身份证反面</div>
                    </div>
                </file-upload>
            </div>
            <div class="authImg_box_upload">
                <file-upload class="authImg_box_upload_file" ref="upload" name="3" extensions="gif,jpg,jpeg,png,webp" accept="image/*" :multiple="false" @input-file="getImgThree">
                    <div v-if="imageHandheld" class="authImg_box_upload_file_img">
                        <img :src="imageHandheld" />
                    </div>
                    <div v-else class="authImg_box_upload_file_box">
                        <div>
                            <i class="custom-mint-icon-sousuo"></i>
                        </div>
                        <div class="authImg_box_upload_file_box_text">手持证件照</div>
                    </div>
                </file-upload>
            </div>
            <div class="authImg_box_next">
                <mt-button @click.native="authentication()" :class="{'blue':isBlue}" :disabled="!isBlue" class="authImg_box_next_button" type="primary" size="large">下一步</mt-button>
            </div>
            <div class="authImg_box_popup" v-if="authStatusShow">
                <div class="authImg_box_popup_box" @click.stop>
                    <div v-if="authStatus == 1">身份认证提交资料已成功通过审核</div>
                    <div v-if="authStatus == 2">已提交认证，请等待审核结果</div>
                    <div v-if="authStatus == 3">认证失败，请重新认证</div>
                    <div class="authImg_box_popup_box_buttonbox">
                        <mt-button v-if="authStatus == 2 || authStatus == 1" class="authImg_box_popup_box_buttonbox_button" type="primary" size="large" @click.native="confirm">确认</mt-button>
                        <mt-button v-if="authStatus == 3" class="authImg_box_popup_box_buttonbox_button" type="primary" size="large" @click.native="recertification">重新认证</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Request from '../../../utils/require.js';
    import Cache from '../../../utils/cache';
    import Config from '../../../utils/config.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                name: this.$store.state.authName,
                idType: this.$store.state.authIdType,
                idNum: this.$store.state.authIdNum,
                country: this.$store.state.authCountry,
                uploadImg: Config.UploadAuthImg,
                requestToken: {
                    token: this.$store.state.token ||
                        Cache.getSession('bier_token'),
                },
                imageBack: '',
                imagePositive: '',
                imageHandheld: '',
                authStatusShow: false,
                authStatus: '',
            };
        },
        mounted() {
            this.info();
        },
        computed: {
            isBlue() {
                if (this.imageBack && this.imagePositive && this.imageHandheld) {
                    var value = true;
                }
                return value;
            },
        },
        methods: {
            confirm() {
                this.$router.push({
                    name: 'information',
                });
            },
            recertification() {
                Request({
                    url: 'ChangeAuthStatus',
                    data: {
                        id: this.accountId,
                        status: 0,
                    },
                    type: 'post',
                }).then(res => {
                    this.$router.push({
                        name: 'authentication',
                    });
                });
            },
            authentication() {
                const img = this.imageBack + ',' + this.imagePositive + ',' + this.imageHandheld;
                Request({
                    url: 'QueryAuthentication',
                    data: {
                        id: this.accountId,
                        country: this.country,
                        idType: this.idType,
                        idNum: this.idNum,
                        realname: this.name,
                        idImg: img,
                    },
                    type: 'post',
                    flag: true,
                }).then(res => {
                    this.info();
                });
            },
            info() {
                Request({
                    url: 'QuerySettings',
                    type: 'get',
                }).then(res => {
                    this.authStatus = res.data.authStatus;
                    if (res.data.authStatus !== '0') {
                        this.authStatusShow = true;
                    }
                    // this.noPassReason = res.data.noPassReason;
                });
            },
            uploadImgs(newfile, oldfile, value) {
                var file;
                if (newfile && !oldfile) {
                    file = newfile.file;
                }
                if (newfile && oldfile) {
                    file = newfile.file;
                }
                var formData = new FormData();
                formData.append('file', file);
                axios({
                    url: this.uploadImg,
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(res => {
                    if (value === '1') {
                        this.imageBack = res.data.data;
                    } else if (value === '2') {
                        this.imagePositive = res.data.data;
                    } else {
                        this.imageHandheld = res.data.data;
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            getImg(newfile, oldfile) {
                const value = '1';
                this.uploadImgs(newfile, oldfile, value);
            },
            getImgTwo(newfile, oldfile) {
                const value = '2';
                this.uploadImgs(newfile, oldfile, value);
            },
            getImgThree(newfile, oldfile) {
                const value = '3';
                this.uploadImgs(newfile, oldfile, value);
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .authImg {
        &_header {
            border-bottom: 1px solid #D8D8D8;
        }
        &_box {
            @include remCalc(padding, 0, 38px);
            padding-top: pxTorem(55px);
            &_upload {
                border: 1px solid rgba(151, 151, 151, 1);
                clear: both;
                margin-top: pxTorem(30px);
                height: pxTorem(136px);
                &_file {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &_img {
                        width: 100%;
                        height: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                        }
                    }
                    &_box {
                        &_text {
                            text-align: center;
                        }
                    }
                }
            }
            &_next {
                @include remCalc(margin, 35px, 35px, 0);
                &_button {
                    font-size: 14px;
                    background: rgba(243, 243, 243, 1);
                    color: rgba(51, 51, 51, 1);
                }
                .blue {
                    background: rgba(0, 158, 194, 1);
                    color: rgba(255, 255, 255, 1);
                }
            }
            &_popup {
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
                &_box{
                    background: #ffffff;
                    width: pxTorem(298px);
                    @include remCalc(padding, 40px, 20px, 0);
                    font-size:14px;
                    color:rgba(51,51,51,1);
                    text-align: center;
                    &_buttonbox{
                        @include remCalc(padding, 0, 65px);
                        &_button{
                            @include remCalc(margin, 30px, 0, 25px);
                            background:rgba(0,158,194,1);
                            font-size:14px;
                            height: pxTorem(30px);
                            color:rgba(255,255,255,1);
                        }
                    }
                }
            }
        }
    }
</style>