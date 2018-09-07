<template>
    <div class="authImg">
        <header-nav linkName="authentication" isBlue=true title="实名认证" class="authImg-header"></header-nav>
        <div class="authImg-info">
            <div class="authImg-info-item">
                <van-uploader class="authImg-info-item-uploader" :after-read="getBack">
                    <img v-if="!imageBack" src="http://imgs.afdchain.com/web-upload/picture/ba09b1708ff94c528da7bbaf7d09eec4.jpg"/>
                    <img v-else :src="imageBack"/>
                </van-uploader>
                <van-uploader class="authImg-info-item-uploader" :after-read="getPositive">
                    <img v-if="!imagePositive" src='http://imgs.afdchain.com/web-upload/picture/c4abe2f1abf741a786a5b9758e5782c5.jpg'/>
                    <img v-else :src="imagePositive"/>
                </van-uploader>
            </div>
            <div class="authImg-info-item">
                <van-uploader :after-read="getHandheld">
                    <img v-if="!imageHandheld" src="http://imgs.afdchain.com/web-upload/picture/d9c5275b29c842dd974e1a31ee1bf41b.png"/>
                    <img v-else :src="imageHandheld"/>
                </van-uploader>
            </div>
        </div>
        <div class="authImg-notic">
            <div class="authImg-notic-title">注意事项</div>
            <div class="authImg-notic-info">1.请确保照片的格式是：jpeg (.jpg .jpeg .jpe .jfif以及.jif )和 png</div>
            <div class="authImg-notic-info">2.照片不能太模糊，需要清晰、完整、无遮挡</div>
            <div class="authImg-notic-info">3.照片不能修图过多，不能修改证件信息</div>
            <div class="authImg-notic-info">4.不能上传复印件或黑白照片</div>
            <div class="authImg-notic-info">5.确保证件是有效的证件ID</div>
            <div class="authImg-notic-info">6.确保照片中只有您自己一个人，并且脸部无遮挡</div>
            <div class="authImg-notic-info">7.请您确认签字页的内容是：“AFDchain”与当前日期</div>
        </div>
        <div class="authImg-submit">
            <button @click="authentication()" :disabled="!style" :class="{'style':style}">提交认证</button>
        </div>
    </div>
</template>
<script>
    import Request from '../../../../utils/require.js';
    import Cache from '../../../../utils/cache';
    import Config from '../../../../utils/config.js';
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
                authStatus: 0,
            };
        },
        mounted() {
            this.info();
        },
        computed: {
            style() {
                if (this.imageBack && this.imagePositive && this.imageHandheld) {
                    return true;
                }
                return false;
            },
        },
        methods: {
            confirm() {
                this.$router.push({
                    name: 'account',
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
                console.log(1);
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
                    if (res.data.authStatus !== 0) {
                        this.authStatusShow = true;
                    }
                });
            },
            uploadImgs(file, value) {
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
                    this.info();
                }).catch(err => {
                    console.log(err);
                });
            },
            getBack(file) {
                const value = '1';
                this.uploadImgs(file.file, value);
            },
            getPositive(file) {
                const value = '2';
                this.uploadImgs(file.file, value);
            },
            getHandheld(file) {
                const value = '3';
                this.uploadImgs(file.file, value);
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../../assets/css/global.scss';
    .authImg {
        &-header {
            border-bottom: 1px solid #D8D8D8;
        }
        &-info {
            @include remCalc(padding, 0, 7px);
            padding-top: pxTorem(69px);
            display: flex;
            &-item{
                &-uploader{
                    width:175px;
                    height:110px;
                    float: left;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    img{
                        height: 100%;
                    }
                }
            }
        }
        &-notic{
            @include remCalc(padding, 0, 15px);
            font-size:12px;
            color:rgba(174,174,174,1);
            line-height:18px;
            &-title{
                font-size:14px;
                color:rgba(96,98,102,1);
                line-height:20px;
                margin-bottom: 10px;
            }
        }
        &-submit {
            text-align: center;
            margin-top: 32px;
            button {
                width:278px;
                height:44px;
                background:rgba(255,149,0,1);
                border-radius:4px;
                opacity:0.5;
                font-size:18px;
                color:rgba(255,255,255,1);
            }
            .style {
                opacity:1;
            }
        }
    }
</style>