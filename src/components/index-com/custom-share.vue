<template>
    <div class="share" @click="close" v-if="dialogVisible">
        <div id="thisDiv" class="show-share">
            <p class="show-share-title">
                被割了吗？来阿凡达，我养你啊！送上熊市屯币攻略，邀你注册瓜分99999个AFDT，邀请人得33AFDT 被邀请人得66AFDT，每日挖币，再享分红！
                <br/>http://www.afdchain.com
            </p>
            <input class="show-share-title" id="show-share-title" :value="copyValue" style="opacity: 0;" />
            <div class="show-share-btn">
                <mt-button class="show-share-btn-text" data-clipboard-target="#show-share-title" size="small" type="primary" @click="clickCopy()">点我复制</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Cache from '../../utils/cache';
    import Clipboard from 'clipboard';
    export default {
        data() {
            return {
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                token: this.$store.state.token || Cache.getSession("bier_token"),
                copyValue: '',
                language: ' 被割了吗？来阿凡达，我养你啊！送上熊市屯币攻略，邀你注册瓜分99999个AFDT，填邀请码注册就送66AFDT ，每邀请一位再送33AFDT，每日挖币，再享分红！',
            }
        },
        computed: {
            dialogVisible: {
                get() {
                    return this.$store.state.dialogVisible;
                },
                set() {
                    this.$store.commit('setDialogVisible', false);
                }
            },
            inviteCode: {
                get() {
                    let code = this.$store.state.inviteCode || Cache.getSession("bier_inviteCode");
                    return code;
                },
                set() {

                }
            },

        },
        mounted() {
            this.copyValue = this.language + 'http://www.afdchain.com/#/index?type=register&inviteCode=' + this.inviteCode;
        },
        watch:{
            inviteCode(val){
                this.copyValue = this.language + 'http://www.afdchain.com/#/index?type=register&inviteCode=' + val;
            }
        },
        methods: {
            close() {
                this.$store.commit('setDialogVisible', false);
            },
            clickCopy() {
                let clipboard = new Clipboard('.show-share-btn-text');
                clipboard.on('success', e => {
                    console.log('clipboard success->', e);

                    this.$toast({
                        message: '复制成功',
                        position: 'top',
                        duration: 5000
                    });
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    console.log('clipboard error->', e);
                    // 不支持复制
                    this.$toast({ message: '该浏览器不支持点我复制', position: 'top', duration: 5000 });
                    // 释放内存
                    clipboard.destroy()
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .share {
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .show-share {
        width: pxTorem(320px);
        max-height: pxTorem(400px);
        background: #ffffff;
        margin: 0 auto 36px;
        position: relative;
        padding: 35px 10px;
        @include remCalc(padding, 35px, 10px);
        &-title {
            color: #FF9500;
            font-size: 20px;
            line-height: 30px;
            text-align: center;
        }
        &-btn {
            @include remCalc(padding, 10px, 20px);
            /*background: #fff;*/
            &-text {
                display: block;
                margin: 0 auto;
                width: pxTorem(116px);
                background: #FF9500;
                border: none;
                color: #fff;
                box-shadow: 0px 2px 4px 0px #955700;
                &:hover,
                &:active,
                &:focus {
                    background: #FF9500;
                    color: #fff;
                }
                &:active {
                    background: #FCA529;
                }
            }
        }
    }
</style>