<template>
    <div class="information">
        <header-nav linkName="account" isBlue=true title="个人资料"></header-nav>
        <div class="information-item">
            <van-cell title="头像" class="information-item-kind headerUrl" to="/headerUrl" is-link>
                <van-icon slot="right-icon">
                    <img class="information-item-kind-img" :src="heardUrl" />
                    <div class="information-item-kind-fontBox">
                        <i class="custom-vant-icon-right lineHeight"></i>
                    </div>
                </van-icon>
            </van-cell>
        </div>
        <div class="information-item topMini">
            <van-cell title="用户名" class="information-item-kind userName" @click="changeUserName()" is-link>
                <van-icon slot="right-icon">
                    <span class="information-item-kind-text">{{nickname}}</span>
                    <div class="information-item-kind-fontBox">
                        <i class="custom-vant-icon-right"></i>
                    </div>
                </van-icon>
            </van-cell>
        </div>
        <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeClose"
            >
            <div class="information-input">
                <div class="information-input-title">修改昵称</div>
                <input v-model="nicknames" class="information-input-change"/>
            </div>
        </van-dialog>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require.js';
    import Utils from '../../../utils/util';
    export default {
        data() {
            return {
                utils: new Utils(),
                accountId: this.$store.state.id,
                nickname: this.$store.state.usernickname,
                nicknames: '',
                show: false,
            };
        },
        mounted() {
            this.info();
        },
        computed: {
            heardUrl() {
                return this.$store.state.heardUrl || 'https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png';
            },
        },
        methods: {
            info() {
                Request({
                    url: 'QuerySettings',
                    type: 'get',
                }).then(res => {
                    this.authStatus = res.data.authStatus;
                    this.existTradePassword = res.data.existTradePassword;
                    this.nickname = res.data.nickname;
                    if (res.data.heardUrl) {
                        this.heardUrl = res.data.heardUrl;
                    }
                });
            },
            changeUserName() {
                this.nicknames = '';
                this.show = true;
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    this.changeNickName();
                    setTimeout(done, 1000);
                } else {
                    done();
                }
            },
            changeNickName() { // 修改昵称
                if (this.nicknames.length <= 8) {
                    Request({
                        url: 'QueryAccountSettings',
                        data: { id: this.accountId, nickname: this.nicknames },
                        type: 'post',
                        flag: true,
                    }).then(res => {
                        this.$store.commit('setUserNickName', this.nicknames);
                        Cache.setSession('bier_usernickname', this.nicknames);
                        this.$toast.success('修改成功');
                        this.info();
                        this.show = false;
                    }).catch(e => {
                        console.error('changenickname error_ > ', e);
                    });
                } else {
                    this.$toast.success('请输入8位以内昵称');
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';

    .information {
        height: 100%;
        background: #fafafa;
        &-item {
            margin-top: pxTorem(44px);
            &-kind {
                font-size: 17px;
                border-bottom: 1px solid #e5e5e5;

                &-fontBox {
                    display: inline-block;

                    i {
                        color: #999;
                        font-size: 16px;
                    }
                    .lineHeight{
                        line-height: pxTorem(36px);
                    }
                }
                &.headerUrl{
                    @include remCalc(padding, 5px, 15px);
                    line-height: pxTorem(36px);
                }
                &-img {
                    height: pxTorem(36px);
                    border-radius: 50%;
                }

                &.userName {
                    border-top: 1px solid #e5e5e5;
                }

                &-text {
                    font-size: 16px;
                }
            }

            &.topMini {
                margin-top: pxTorem(10px);
            }
        }
        &-input{
            text-align: center;
            &-title{
                font-size:18px;
                @include remCalc(padding, 21px, 0, 12px, 0);
            }
            &-change{
                width:pxTorem(228px);
                height:pxTorem(36px);
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(221,221,221,1);
                margin-bottom: pxTorem(15px);
                @include remCalc(padding, 0, 10px);
            }
        }
    }
</style>