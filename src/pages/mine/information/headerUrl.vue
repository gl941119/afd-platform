<template>
    <div class="headerUrl">
        <header-nav linkName="information" isBlue=true title="头像设置" class="headerUrl_header"></header-nav>
        <div class="imgbox">
            <img class="img" :src="heardUrl">
        </div>
        <div class="avatar">
            <van-uploader class="btn_text" :after-read="onRead">
                点击上传
            </van-uploader>
            <div class="avatar-edit" v-show="files.length && edit">
                <div class="avatar-edit-image" v-if="files.length">
                    <img ref="editImage" :src="files[0].content" />
                </div>
                <div class="avatar-edit-btn">
                    <button type="button" class="btn btn-secondary" @click.prevent="cancle">取消</button>
                    <button type="submit" class="btn btn-primary" @click.prevent="editSave">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    import Config from '../../../utils/config';
    import Cropper from 'cropperjs';
    import axios from 'axios';
    export default {
        data() {
            return {
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                token: this.$store.state.token,
                // avatar
                uploadImg: Config.UploadImg,
                files: [],
                edit: false,
                cropper: false,
            };
        },
        computed: {
            heardUrl: {
                get() {
                    return this.$store.state.heardUrl || 'https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png';
                },
                set() {

                },
            },
        },
        watch: {
            edit(value) {
                // console.log('edit->', value);
                if (value) {
                    this.$nextTick(function() {
                        if (!this.$refs.editImage) {
                            return;
                        }

                        const cropper = new Cropper(this.$refs.editImage, {
                            aspectRatio: 1 / 1,
                            viewMode: 1,
                        });
                        this.cropper = cropper;
                    });
                } else {
                    if (this.cropper) {
                        this.cropper.destroy();
                        this.cropper = false;
                    }
                }
            },
        },
        methods: {
            // avatar
            onRead(file) {
                this.files.push(file);
                this.edit = true;
                // console.log(this.files);
            },
            cancle() {
                this.edit = false;
                this.files = [];
            },
            editSave() {
                const oldFile = this.files[0].file;
                const binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1]);
                const arr = new Uint8Array(binStr.length);
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                const file = new File([arr], oldFile.name, { type: oldFile.type });

                var formData = new FormData();
                formData.append('file', file);
                axios({
                    url: this.uploadImg,
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: this.token,
                    },
                }).then(res => {
                    this.selectImg(res.data.data);
                    this.cancle();
                }).catch(console.error);
            },
            selectImg(url) {
                Request({
                    url: 'QueryAccountSettings',
                    data: {
                        id: this.accountId,
                        headUrl: url,
                    },
                    type: 'post',
                    flag: true,
                }).then(res => {
                    this.$store.commit('setHeardUrl', url);
                    Cache.setSession('bier_heardUrl', url);
                    this.$toast('修改成功');
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .headerUrl {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        &_header {
            border-bottom: 1px solid #D8D8D8;
        }
        .imgbox {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 150px;
                height: 150px;
            }
        }
        .avatar {
            margin-top: 20px; // background: #ffffff;
            .btn_text {
                padding: 10px 45px;
                border: 1px solid #979797;
                border-radius: 4px;
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
        }
    }
</style>