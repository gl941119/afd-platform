<template>
    <div class="advert-item">
            <div class="advert-item-left">
                <img class="advert-item-left-logo" :src="advertDatas.logo">
                <a class="advert-item-left-link" :href="advertDatas.whitePaper" target="_self">白皮书</a>
            </div>
            <div class="advert-item-right">
                <div class="advert-item-right-top">
                    <div class="advert-item-right-top-title">
                        <div class="advert-item-right-top-title-text">{{advertDatas.shotEnName}}
                            <span>/{{advertDatas.shotCnName}}</span>
                            <span>{{advertDatas.fullEnName}}</span>
                        </div>
                        <div class="advert-item-right-top-title-team">
                            <span>{{$t('team.coreMember')}}:</span>
                            <span v-for="member in advertDatas.advertTeamMemberResults" :key="member.id">{{member.name}}, </span>
                            <span v-for="member in advertDatas.advertTeamConsultantsResults" :key="member.id">{{member.name}}, </span>
                        </div>
                    </div>
                    <van-button @click="goTrade" size="small" class="advert-item-right-top-btn" type="warning">去交易</van-button>
                </div>
                <div class="advert-item-right-middle">
                    {{advertDatas.proDesc}}
                </div>
                <div class="advert-item-right-bottom">
                    <a @click="goShare" class="advert-item-right-bottom-link" href="javascript:;">
                        <i class="custom-vant-icon-fenxiang2"></i>
                        <span>分享</span>
                    </a>
                    <a @click="goTelegram" class="advert-item-right-bottom-link" href="javascript:;">
                        <i class="custom-vant-icon-telegram"></i>
                        <span>电报</span>
                    </a>
                </div>
            </div>
            <van-popup v-model="tradeVisible" position="bottom">
                <van-picker
                    show-toolbar
                    title="请选择交易所"
                    :columns="handleOptions()"
                    @confirm="selTrade"
                    @cancel="tradeVisible = false"
                />
            </van-popup>
    </div>
</template>
<script>
    import Cache from '../../utils/cache.js';
    import Utils from '../../utils/util.js';
    import Request from '../../utils/require.js';
    export default {
        name: 'AdvertItem',
        props: [
            'advertDatas', 'conceptId',
        ],
        data() {
            return {
                popupVisible: false,
                tradeVisible: false,
                utils: new Utils(),
            };
        },
        methods: {
            handleOptions() {
                this.advertDatas.websiteResultList.forEach(item => {
                    item.text = item.websiteName;
                });
                return this.advertDatas.websiteResultList;
            },
            selTrade(item) {
                // console.log('sel->', item);
                Request({
                    url: 'ClickAdvertToProfit',
                    data: {
                        advertId: this.advertDatas.id,
                        conceptId: this.conceptId || 0,
                        advertWebsiteId: item.id,
                    },
                    type: 'get',
                }).then(res => {
                    // skip
                    this.utils.newWin(item.websiteAddress);
                }).catch(msg => {
                    this.$emit('update-data');
                });
                this.tradeVisible = false;
            },
            goTrade() {
                if (!(this.$store.state.token || Cache.getSession('bier_token'))) {
                    this.$dialog.confirm({
                        title: '请先登录，再去交易',
                    }).then(() => {
                        this.$router.push({ name: 'login', query: { redirect: 'index' }});
                    }, () => {});
                    return;
                }
                this.tradeVisible = true;
            },
            goShare() {
                if (!(this.$store.state.token || Cache.getSession('bier_token'))) {
                    this.$dialog.confirm({
                        title: '请先登录，才能分享',
                    }).then(() => {
                        this.$router.push({ name: 'login', query: { redirect: 'index' }});
                    }, () => {});
                    return;
                }
                this.$store.commit('setDialogVisible', true);
            },
            goTelegram() {
                this.$dialog.alert({ title: '电报群需翻墙' }).then(() => {
                    console.log('alert_>', this.advertDatas.telegrameUrl);
                    this.utils.newWin(this.advertDatas.telegrameUrl);
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .advert-item {
        width: calc(100vw - 4px);
        margin: 5px auto;
        @include remCalc(padding, 19, 13, 6, 9);
        font-size: 12px;
        background: #fff;
        color: #333;
        @include content-flex(flex-start, flex-start);
        &-left {
            @include content-flex;
            flex-direction: column;
            &-logo {
                width: pxTorem(53px);
                height: pxTorem(53px);
                border-radius: 50%;
            }
            &-link {
                margin-top: pxTorem(22px);
                color: #429DF8;
                font-size: 16px;
                text-decoration: underline;
                font-weight: 700;
            }
        }

        &-right {
            margin-left: pxTorem(7px);
            &-top {
                @include content-flex(flex-start, flex-start);
                &-title {
                    width: pxTorem(220px);
                    &-text {
                        font-size: 14px;
                        line-height: 20px;
                        font-weight: 700;
                    }
                    &-team {
                        @include text-ellipsis;
                        margin-top: 4px;
                        line-height: 17px;
                    }
                }
            }
            &-middle {
                margin: 10px 0 16px;
                height: 85px;
                line-height: 17px;
                @include multi-line-hide(5);
                color: #999999;
            }
            &-bottom {
                &-link {
                    display: inline-flex;
                    align-items: center;
                    color: #108EE9;
                    font-size: 14px;
                    & span {
                        margin-left: 6px;
                    }
                    &:last-child {
                        margin-left: 16px;
                    }
                }
            }
        }
    }
</style>