<template>
    <div class="revenue">
        <header-nav linkName="mine" title="广告收益"></header-nav>
        <div class="revenue_tabbarBox">
            <mt-navbar class="revenue_tabbarBox_tabbar" v-model="selected">
                <mt-tab-item id="1" class="revenue_tabbarBox_tabbar_one">提现记录</mt-tab-item>
                <mt-tab-item id="2">收益记录</mt-tab-item>
            </mt-navbar>
        </div>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="revenue_notic" v-if="oneTotalFlowDatas.length===0">
                        <div>暂无数据</div>
                    </div>
                    <div class="revenue_titleBox" ref="revenueWrapper">
                        <mt-loadmore :bottom-method="learnMoreItem" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="revenueLoadmore">
                            <div class="revenue_titleBox_title" v-for="(item, index) in oneTotalFlowDatas" :key="index">
                                <div class="revenue_titleBox_title_info">
                                    {{item.createTime}}
                                </div>
                                <div class="revenue_titleBox_title_info">{{item.desc}}</div>
                                <div class="revenue_titleBox_title_info">{{item.status}}</div>
                            </div>
                            <div slot="bottom" class="revenue-bottom" v-show="hide">
                                <span v-show="bottomStatus !== 'loading'&&!allLoaded" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                                <span v-show="bottomStatus === 'loading'">
                                    <mt-spinner type="snake"></mt-spinner>
                                </span>
                                <span v-show="allLoaded">没有更多数据了</span>
                            </div>
                        </mt-loadmore>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="revenue_notic" v-if="totalFlowDatas.length===0">
                        <div>暂无数据</div>
                    </div>
                    <div class="revenue_titleBox" ref="revenueWrappers">
                        <mt-loadmore :bottom-method="learnMoreItem" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="revenueLoadmore">
                            <div class="revenue_titleBox_title" v-for="(item, index) in totalFlowDatas" :key="index">
                                <div class="revenue_titleBox_title_info">
                                    {{item.createTime}}
                                </div>
                                <div class="revenue_titleBox_title_info">{{item.money}} AFDT</div>
                                <div class="revenue_titleBox_title_info">
                                    <span v-if="item.status==1">转账成功</span>
                                    <span v-if="item.status==2">待转账（审核通过）</span>
                                    <span v-if="item.status==3">待审核</span>
                                    <span v-if="item.status==4">审核不通过</span>
                                </div>
                            </div>
                            <div slot="bottom" class="revenue-bottom" v-show="hide">
                                <span v-show="bottomStatus !== 'loading'&&!allLoaded" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                                <span v-show="bottomStatus === 'loading'">
                                    <mt-spinner type="snake"></mt-spinner>
                                </span>
                                <span v-show="allLoaded">没有更多数据了</span>
                            </div>
                        </mt-loadmore>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        <div class="revenue_buttoneBox">
            <mt-button class="revenue_buttoneBox_button" type="primary" size="large">提现</mt-button>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require';
    import Config from '../../../utils/config.js';
    export default {
        data() {
            return {
                selected: '1',
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                flowDatas: [],
                totalFlowDatas: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                allLoaded: false,
                bottomStatus: '',
                hide: true,
                oneFlowDatas: [],
                oneTotalFlowDatas: [],
                wrapperHeight: 0,
                wrappersHeight: 0,
            }
        },
        mounted() {
            Promise.all([this.BasicInformation(), this.revenueDatas()]).then(() => {

            });
        },
        watch: {
            selected() {
                this.page = 1;
                this.totalFlowDatas = [];
                this.oneTotalFlowDatas = [];
                this.revenueDatas();
            }
        },
        methods: {
            BasicInformation() {
                Request({
                    url: 'QueryRevenueBasicInformation',
                    data: { accountId: this.accountId },
                    type: 'get'
                }).then(res => {
                    this.id = res.data.id;
                })
            },
            learnMoreItem() {
                this.page++;
                this.revenueDatas(this.page).then(() => {
                    this.$refs.revenueLoadmore.onBottomLoaded();
                })
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            revenueDatas(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryRevenueAccountFlow',
                        data: {
                            incomeId: this.id,
                            page,
                            pageSize,
                            flowType: this.selected,
                        },
                        type: 'get'
                    }).then(res => {
                        if (this.selected == '1') {
                            this.oneFlowDatas = res.data;
                        } else {
                            this.flowDatas = res.data;
                        }
                        if (res.data && res.data.length === 0) {
                            this.allLoaded = true;
                            // 不显示上拉
                            if (this.page === 2) {
                                this.hide = false;
                            }
                            resolve();
                        } else {
                            if (this.selected == '1') this.oneTotalFlowDatas.push(...this.oneFlowDatas);
                            if (this.selected == '2') this.totalFlowDatas.push(...this.flowDatas);
                            resolve();
                        }
                    })
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .revenue {
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &_notic {
            height: calc(100vh - 50px - 40px - 50px);
            @include content-flex(center);
        }
        &_tabbarBox{
            margin-top: pxTorem(55px);
            &_tabbar {
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #D8D8D8;
                background: #ffffff;
                text-align: center;
                &_one {
                    border-right: 1px solid #D8D8D8;
                    box-sizing: border-box;
                }
            }
        }
        &_buttoneBox {
            @include remCalc(padding, 0, 73px);
            width: 100%;
            height: pxTorem(50px);
            // background: #ffffff;
            display: flex;
            align-items: center;
            box-shadow: 1px 0px 4px 0px rgba(195, 195, 195, 0.5);
            position: fixed;
            bottom: 0;
            &_button {
                background: rgba(0, 158, 194, 1);
                height: pxTorem(35px);
                width: 100%;
                font-size: 14px;
            }
        }
            &-bottom {
                @extend %load-more;
            }
        &_titleBox {
            overflow: hidden;
            overflow-y: scroll;
            width: 100%; // margin-bottom: 51px;
            height: pxTorem(515px);
            &_title {
                height: pxTorem(40px);
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #D8D8D8;
                background: #ffffff;
                text-align: center;
                &_info {
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
</style>