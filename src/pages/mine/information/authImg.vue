<template>
    <div class="authImg">
        <header-nav linkName="authentication" title="实名认证" class="authImg_header"></header-nav>
        <div class="authImg_box">
            <div class="authImg_box_upload">
                <file-upload class="authImg_box_upload_file" ref="upload" :headers="requestToken" v-model="files" :post-action="uploadImg" :multiple="false" @input-file="getImg">
                    <div class="authImg_box_upload_file_box">
                        <div>
                            <i class="custom-mint-icon-sousuo"></i>
                        </div>
                        <div class="authImg_box_upload_file_box_text">身份证正面</div>
                    </div>
                </file-upload>
            </div>
            <div class="authImg_box_upload">
                <file-upload class="authImg_box_upload_file" ref="upload" v-model="files" :post-action="uploadImg" :multiple="false" @input-file="inputFile" @input-filter="inputFilter">
                    <div class="authImg_box_upload_file_box">
                        <div>
                            <i class="custom-mint-icon-sousuo"></i>
                        </div>
                        <div class="authImg_box_upload_file_box_text">身份证反面</div>
                    </div>
                </file-upload>
            </div>
            <div class="authImg_box_upload">
                <file-upload class="authImg_box_upload_file" ref="upload" v-model="files" :post-action="uploadImg" :multiple="false" @input-file="inputFile" @input-filter="inputFilter">
                    <div class="authImg_box_upload_file_box">
                        <div>
                            <i class="custom-mint-icon-sousuo"></i>
                        </div>
                        <div class="authImg_box_upload_file_box_text">手持证件照</div>
                    </div>
                </file-upload>
            </div>
        </div>
    </div>
</template>
<script>
    import Request from '../../../utils/require.js';
    import Cache from '../../../utils/cache';
    import Config from '../../../utils/config.js';
    export default {
        data() {
            return {
                name: this.$store.state.authName,
                idType: this.$store.state.authIdType,
                idNum: this.$store.state.authIdNum,
                country: this.$store.state.authCountry,
                files: [],
                uploadImg: Config.UploadAuthImg,
                requestToken: {
                    token: this.$store.state.token ||
                        Cache.getSession('bier_token')
                },
            }
        },
        methods: {
            getImg(newfile, oldfile) {
                console.log(newfile.file)
                var formData = new FormData();
                formData.append("file", newfile.file);
                Request({
                    url: 'UploadImg',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(res => {
                    console.log(res);
                })

            },
            inputFile(newfile, oldfile) {
                // console.log(newfile.file);
            },
            inputFilter() {

            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .authImg {
        &_header {
            border-bottom: 1px solid #D8D8D8;
        }
        &_box {
            @include remCalc(padding, 0, 38px);
            &_upload {
                border: 1px solid rgba(151, 151, 151, 1);
                margin-top: pxTorem(30px);
                height: pxTorem(136px);
                &_file {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &_box {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        margin: 0 auto;
                        &_text {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>