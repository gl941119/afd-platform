<template>
    <div class="share" v-if="dialogVisible">
        <div class="share-modal" @click="close"></div>
        <!--<div class="show-share">
             <p v-if="showLink" class="show-share-title">
                被割了吗？来阿凡达，我养你啊！送上熊市屯币攻略，邀你注册瓜分99999个AFDT，邀请人得33AFDT 被邀请人得66AFDT，每日挖币，再享分红！
                <br />http://www.afdchain.com
            </p>
            <P v-else class="show-share-title show-link">{{copyValue}}</P>
            <div v-if="showLink" class="show-share-btn">
                <button class="show-share-btn-text" @click="clickCopy">点我复制</button>
            </div>
            <div v-else class="show-share-tip">
                <img src="../../assets/imgs/img/point.png">
                <p>选中上方链接，复制邀请</p>
            </div>
        </div>-->
        <div class="share-content">
            <i @click="close" class="share-content-icon custom-vant-icon-close"></i>
            <img src="../../assets/imgs/img/invite.png">
            <van-button @click="clickCopy" class="share-content-btn copy-link">复制链接</van-button>
        </div>
    </div>
</template>
<script>
    import Cache from '../../utils/cache';
    import Request from '../../utils/require.js';
    import ClipboardJS from 'clipboard';
    export default {
        data() {
            return {
                token: this.$store.state.token,
                copyValue: '',
                language: '被割了吗？来阿凡达，我养你啊！送上熊市屯币攻略，邀你注册瓜分99999个AFDT，填邀请码注册就送66AFDT ，每邀请一位再送33AFDT，每日挖币，再享分红！',
                showLink: true,
            };
        },
        computed: {
            dialogVisible: {
                get() {
                    return this.$store.state.dialogVisible;
                },
                set(v) {
                    this.$store.commit('setDialogVisible', v);
                },
            },
            inviteCode: {
                get() {
                    const code = this.$store.state.inviteCode;
                    return code;
                },
                set() {},
            },
            accountId() {
                return this.$store.state.id;
            },
        },
        mounted() {
            this.copyValue = this.language + 'http://www.afdchain.com/#/index?type=register&inviteCode=' + this.inviteCode;
        },
        watch: {
            accountId(val) {
                val &&
                    this.getInviteCode(val);
            },
            inviteCode(val) {
                this.copyValue = this.language + 'http://www.afdchain.com/#/index?type=register&inviteCode=' + val;
            },
        },
        methods: {
            getInviteCode(value) {
                Request({
                    url: 'QueryInviteCode',
                    data: {
                        accountId: value,
                    },
                    type: 'get',
                }).then(res => {
                    this.$store.commit('setInviteCode', res.data.inviteCode);
                    Cache.setSession('bier_inviteCode', res.data.inviteCode);
                });
            },
            close() {
                this.$store.commit('setDialogVisible', false);
            },
            clickCopy($event) {
                console.log('copy');
                const _self = this;
                var clipboard = new ClipboardJS('.copy-link', {
                    text: function() {
                        return _self.copyValue;
                    },
                });
                clipboard.on('success', function(e) {
                    console.log('copy Text:', e.text);
                    _self.dialogVisible = false;
                    _self.showLink = true;
                    e.clearSelection();

                    _self.$toast('复制成功');
                });
                clipboard.on('error', function(e) {
                    _self.$toast('该浏览器暂不支持复制功能');
                    console.error('Action:', e);
                    console.error('Trigger:', e.trigger);
                    _self.dialogVisible = true;
                    // show tip
                    _self.showLink = false;
                    e.clearSelection();
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .share {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2226;
        @include content-flex;

        &-modal {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        // add
        &-content {
            position: relative;
            &-icon {
                position: absolute;
                color: #C8C8C8;
                background: #fff;
                border-radius: 50%;
                line-height: 24px;
                font-size: 24px;
                top: -22px;
                right: pxTorem(40px);
            }
            img {
                width: pxTorem(321px);
                margin-left: pxTorem(54px);
            }
            &-btn {
                position: absolute;
                padding: 0 pxTorem(30px);
                height: pxTorem(35px);
                line-height: pxTorem(35px);
                border-radius: pxTorem(35px);
                font-size: 18px;
                color: #FF3A00;
                left: pxTorem(116px);
                bottom: pxTorem(24px);
            }
        }
    }

    .show-share {
        width: pxTorem(320px);
        max-height: pxTorem(400px);
        position: relative;
        background: #ffffff;
        margin: 0 auto 36px;
        @include remCalc(padding, 35px, 10px);

        &-title {
            color: #ff9500;
            font-size: 20px;
            line-height: 30px;
            text-align: center;

            &.show-link {
                font-size: 15px;
                line-height: 22px;
            }
        }

        &-btn {
            @include remCalc(padding, 10px, 20px);

            /*background: #fff;*/
            &-text {
                display: block;
                margin: 0 auto;
                width: pxTorem(116px);
                background: #ff9500;
                border: none;
                color: #fff;
                box-shadow: 0px 2px 4px 0px #955700;
                border-radius: 4px;
                height: 41px;
                font-size: 15px;

                &:hover,
                &:active,
                &:focus {
                    background: #ff9500;
                    color: #fff;
                }

                &:active {
                    background: #fca529;
                }
            }
        }

        &-tip {
            margin-top: 15px;
            text-align: center;

            p {
                color: #51a7c3;
                font-size: 14px;
            }

            img {
                height: 45px;
            }
        }
    }
</style>