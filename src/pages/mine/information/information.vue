<template>
    <div class="information">
        <mt-cell class="information_kind" @click.native="active" title="头像" is-link>
        </mt-cell>
        <mt-cell class="information_kind" @click.native="nickname" title="昵称" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="登录密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="交易密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="绑定Telegram" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="实名认证" is-link>
        </mt-cell>
        <mt-actionsheet :actions="actions" :closeOnClickModal="false" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                actions: [{ name: '从相册中选择', method: this.album }],
                sheetVisible: false,
            }
        },
        methods: {
            active() {
                this.sheetVisible = !this.sheetVisible;
            },
            album() {
                console.log('打开相册');
            },
            nickname() {
                this.$messagebox({
                    $type: 'prompt',
                    title: '',
                    message: '新的昵称',
                    closeOnClickModal: false, //点击model背景层不关闭MessageBox showCancelButton:false, //不显示取消按钮 inputValidator:function(v){return /^[a-zA-Z0-9]{6}$/.test(v);}, //function可以用来写更复杂的判断条件，返回布尔值
                    inputErrorMessage: '请输入正确的验证码',
                    showInput: true,
                    confirmButtonClass: 'confirm'
                }).then(({ value, action }) => { /* value 为填写的值，进行下一步操作 */ console.log(value); });

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
    }

    .confirm {
        width: 50px;
        background: #f66;
    }
</style>