<template>
    <div class="headerUrl">
        <header-nav linkName="information" title="头像设置" class="headerUrl_header"></header-nav>
        <div class="imgbox">
            <img class="img" :src="headUrl">
        </div>
        <div class="avatar">
            <file-upload extensions="gif,jpg,jpeg,png,webp" accept="image/*" v-model="files" name="avatar" class="btn btn-primary" :drop="!edit" @input-filter="inputFilter" @input-file="inputFile" ref="upload">
                <div class="btn_text">点击上传</div>
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
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                token: this.$store.state.token,
                // avatar
                uploadImg: Config.UploadImg,
                files: [],
                edit: false,
                cropper: false,
            }
        },
        computed: {
            heardUrl() {
                return this.$store.state.heardUrl ||  'https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png';
            },
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
                let oldFile = this.files[0];
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