<template>
    <div class="advert-item">
            <div class="advert-item-left">
                <img class="advert-item-left-logo" :src="advertDatas.logo">
                <a class="advert-item-left-link" :href="advertDatas.whitePaper" target="_self">白皮书</a>
            </div>
            <div class="advert-item-right">
                <div class="advert-item-right-top">
                    <div class="advert-item-right-top-title" :class="{'is-visited': isVisited}">
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
            <div class="advert-item-trade" v-if="success">
                <div class="advert-item-trade-relative">
                    <i @click="closeTradeSuc" class="advert-item-trade-relative-icon custom-vant-icon-close"></i>
                    <img src="../../assets/imgs/img/mining.png">
                    <span>获得{{tradeNum}}个AFDT</span>
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
                path: this.$route.name,
                utils: new Utils(),
                isVisited: false,
                success: false,
                tradeNum: 0,
            };
        },
        computed: {
            tradeAdId() {
                const _tradeGroup = this.$store.state.tradeAdId;
                return _tradeGroup && JSON.parse(_tradeGroup) || [];
            },
            tradeObj() {
                const _tradeSuc = this.$store.state.tradeSuc;
                return _tradeSuc && JSON.parse(_tradeSuc) || {};
            },
        },
        mounted() {
            // console.log('trade adId->', this.tradeAdId, this.advertDatas.id);
            this.isVisited = this.tradeAdId.some(item => item.id === this.advertDatas.id);
            // trade success
            this.tradeSucHandle();
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
                    // set session
                    const adId = this.pushAdId(this.tradeAdId, this.advertDatas.id);
                    this.$store.commit('setTradeAdId', adId);
                    Cache.setSession('trade_group', adId);
                    // modal
                    // console.log(res);
                    if (res.data) {
                        let _trade = {
                            id: this.advertDatas.id,
                            tradeNum: res.data,
                        };
                        _trade = JSON.stringify(_trade);
                        this.$store.commit('setTradeSuc', _trade);
                        Cache.setSession('trade_suc', _trade);
                    }
                }).catch(msg => {
                    this.$emit('update-data');
                });
                this.tradeVisible = false;
            },
            tradeSucHandle() {
                const { id, tradeNum } = this.tradeObj;
                if (this.advertDatas.id === id) {
                    this.success = true;
                    this.tradeNum = tradeNum;
                }
            },
            closeTradeSuc() {
                this.success = false;
                Cache.removeSession('trade_suc');
                this.$store.commit('setTradeSuc', null);
            },
            goTrade() {
                if (!(this.$store.state.token || Cache.getSession('bier_token'))) {
                    this.$dialog.confirm({
                        title: '请先登录，再去交易',
                    }).then(() => {
                        this.$router.push({ name: 'login', query: { redirect: this.path }});
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
                        this.$router.push({ name: 'login', query: { redirect: this.path }});
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
            pushAdId(adId, id) {
                const index = adId.findIndex(item => item.id === id);
                if (index === -1) {
                    adId.push({ id });
                }
                return JSON.stringify(adId);
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
                    &.is-visited {
                        color: #999;
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
        &-trade {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            background: rgba(0, 0, 0, .5);
            @include content-flex;
            &-relative {
                position: relative;
                &-icon {
                    position: absolute;
                    top: 0;
                    right: pxTorem(40px);
                    color: #C8C8C8;
                    background: #fff;
                    border-radius: 50%;
                    line-height: pxTorem(44px);
                    font-size: pxTorem(44px);
                }
                img {
                    width: 100%;
                }
                span {
                    position: absolute;
                    bottom: pxTorem(118px);
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: pxTorem(18px);
                    color: #ffe800;
                }
            }
        }
    }
</style>
