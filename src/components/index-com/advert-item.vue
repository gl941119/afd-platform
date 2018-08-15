<template>
    <div @click="popupVisible=true" class="advert-item">
        <div class="advert-item-top">
            <img class="advert-item-top-logo" :src="advertDatas.logo">
            <div class="advert-item-top-right">
                <div class="advert-item-top-right-title">
                    <div class="advert-item-top-right-title-text">{{advertDatas.shotEnName}}
                        <span>/{{advertDatas.shotCnName}}</span>
                    </div>
                    <div class="advert-item-top-right-title-symbol">{{advertDatas.fullEnName}}</div>
                    <a @click.stop="stop" class="advert-item-top-right-title-link" :href="advertDatas.whitePaper" target="_self">白皮书</a>
                </div>
                <div class="advert-item-top-right-divide"></div>
                <div class="advert-item-top-right-member">
                    <span>{{$t('team.coreMember')}}:</span>
                    <span v-for="member in advertDatas.advertTeamMemberResults" :key="member.id">{{member.name}}, </span>
                    <span v-for="member in advertDatas.advertTeamConsultantsResults" :key="member.id">{{member.name}}, </span>
                </div>
            </div>
        </div>
        <div class="advert-item-bottom">
            {{advertDatas.proDesc}}
        </div>
        <mt-popup @click.native="closeModal" ref="popupModal" v-model="popupVisible" position="right" class="advert-item-popup" :modal="false">
            <div class="advert-item-popup-container" @click.stop="stop">
                <div class="advert-item-top">
                    <img class="advert-item-top-logo" :src="advertDatas.logo">
                    <div class="advert-item-top-right">
                        <div class="advert-item-top-right-title">
                            <div class="advert-item-top-right-title-text">{{advertDatas.shotEnName}}
                                <span>/{{advertDatas.shotCnName}}</span>
                            </div>
                            <div class="advert-item-top-right-title-symbol">{{advertDatas.fullEnName}}</div>
                            <a class="advert-item-top-right-title-link" :href="advertDatas.whitePaper" target="_self">白皮书</a>
                        </div>
                        <div class="advert-item-top-right-member">
                            <span>{{$t('team.coreMember')}}:</span>
                            <span v-for="member in advertDatas.advertTeamMemberResults" :key="member.id">{{member.name}}, </span>
                            <span v-for="member in advertDatas.advertTeamConsultantsResults" :key="member.id">{{member.name}}, </span>
                        </div>
                    </div>
                </div>
                <div class="advert-item-textarea">
                    {{advertDatas.proDesc}}
                </div>
            </div>
            <div class="advert-item-popup-btn">
                <div>
                    <mt-button class="advert-item-popup-btn-top" @click.native.stop="goTrade" size="small">去交易</mt-button>
                </div>
                <div class="advert-item-popup-btn-footer">
                    <mt-button class="advert-item-popup-btn-footer-top" @click.native.stop="goShare" size="small">分享</mt-button>
                    <mt-button class="advert-item-popup-btn-footer-top" @click.native.stop="goTelegram" size="small">电报</mt-button>
                </div>
            </div>
        </mt-popup>
        <mt-actionsheet :actions="actionsOptions" v-model="tradeSheetVisible" cancel-text=""></mt-actionsheet>
    </div>
</template>
<script>
    import Cache from '../../utils/cache.js';
    import Utils from '../../utils/util.js';
    export default {
        name: 'AdvertItem',
        props: ['advertDatas'],
        data() {
            return {
                popupVisible: false,
                actionsOptions: [],
                tradeSheetVisible: false,
                utils: new Utils(),
            }
        },
        mounted() {
            this.handleActions();
        },
        methods: {
            handleActions() {
                let _self = this;
                this.advertDatas.websiteResultList.forEach(item => {
                    item.name = item.websiteName;
                    item.method = function () {
                        // console.log('method_>', item.websiteAddress);
                        _self.utils.newWin(item.websiteAddress);
                    }
                });
                this.actionsOptions = this.advertDatas.websiteResultList;
            },
            goTrade() {
                if (!(this.$store.state.token || Cache.getSession("bier_token"))) {
                    this.$messagebox.confirm(
                        '请先登录，再去交易'
                    ).then(() => {
                        this.$router.push({ name: 'login' })
                    }, () => {});
                    return;
                }
                this.tradeSheetVisible = true;
            },
            goShare() {
                console.log('share');
                if (!(this.$store.state.token || Cache.getSession("bier_token"))) {
                    this.$messagebox.confirm(
                        '请先登录，才能分享'
                    ).then(() => {
                        this.$router.push({ name: 'login' })
                    }, () => {});
                    return;
                }
                this.$store.commit('setDialogVisible', true);
            },
            goTelegram() {
                this.$messagebox.alert('电报群需翻墙').then(action => {
                    console.log('alert_>', this.advertDatas.telegrameUrl);
                    this.utils.newWin(this.advertDatas.telegrameUrl);
                });
            },
            closeModal() {
                this.$refs.popupModal && (this.$refs.popupModal.currentValue = false);
            },
            stop() {},
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    @mixin item-title($flag: true) {
        @if $flag {
            font-weight: bold;
        }
        font-size: pxTorem(13px);
        color: #333;
    }

    .advert-item {
        width: 100vw;
        height: pxTorem(104px);
        padding: 10px;
        margin: 10px 0;
        font-size: pxTorem(11px);
        background: #fff;
        color: #666;
        &-top {
            @include content-flex();
            height: pxTorem(45px);
            &-logo {
                width: pxTorem(34px);
                height: pxTorem(34px);
                border-radius: 50%;
                margin-right: pxTorem(12px);
            }
            &-right {
                width: pxTorem(308px);
                &-title {
                    @include content-flex();
                    &-text {
                        @include item-title();
                        flex: none;
                    }
                    &-symbol {
                        margin-left: 22px;
                        flex: auto;
                        @include item-title(false);
                        @include text-ellipsis;
                    }
                    &-link {
                        color: #3C599F;
                    }
                }
                &-divide {
                    height: 1px;
                    background: #EAEAEA;
                    margin: 5px 0;
                }
                &-member {
                    @include text-ellipsis;
                }
            }
        }
        &-bottom {
            margin-top: pxTorem(10px);
            @include multi-line-hide();
            height: pxTorem(31px);
        }
        &-popup {
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            @include content-flex(center);
            flex-direction: column;
            &-container {
                width: calc(100vw - 20px);
                background: #fff;
                @include remCalc(padding, 24, 16);
                border-radius: 5px;
            }
            &-btn {
                margin-top: 20px;
                &-top {
                    width: pxTorem(160px);
                    height: pxTorem(30px);
                    font-size: pxTorem(13px);
                    color: #fff;
                    background: #009EC2;
                }
                &-footer {
                    margin-top: 20px;
                    &-top {
                        width: pxTorem(70px);
                        height: pxTorem(30px);
                        font-size: pxTorem(13px);
                        color: #fff;
                        background: #F6BC00;
                        &:last-child {
                            margin-left: pxTorem(20px);
                        }
                    }
                }
            }
            .advert-item-textarea {
                margin-top: pxTorem(10px);
            }
            .advert-item-top-right-member {
                margin-top: 6px;
            }
        }
    }
</style>