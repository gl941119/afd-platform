<template>
    <div class="revenue">
        <div class="revenue_notic" v-if="totalFlowDatas.length===0">
            <div>暂无数据</div>
        </div>
        <div class="revenue_titleBox" ref="revenueWrapper">
            <mt-loadmore :bottom-method="learnMoreItem" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="revenueLoadmore">
                <div class="revenue_titleBox_title" v-for="(item, index) in totalFlowDatas" :key="index">
                    <div class="revenue_titleBox_title_info">
                        {{item.createTime}}
                    </div>
                    <div class="revenue_titleBox_title_info">{{item.desc}}</div>
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
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require';
    import Config from '../../../utils/config.js';
    export default {
        data() {
            return {
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                id: this.$store.state.incomeId || Cache.getSession('bire_incomeId'),
                flowDatas: [],
                totalFlowDatas: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                allLoaded: false,
                bottomStatus: '',
                hide: true,
                wrapperHeight: 0,
            }
        },
        mounted() {
            Promise.all([ this.revenueDatas()]).then(() => {

            });
        },
        methods: {
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
                            flowType: 1,
                        },
                        type: 'get'
                    }).then(res => {
                        this.flowDatas = res.data;
                        if (this.flowDatas && this.flowDatas.length === 0) {
                            this.allLoaded = true;
                            // 不显示上拉
                            if (this.page === 2) {
                                this.hide = false;
                            }
                            resolve();
                        } else {
                            this.totalFlowDatas.push(...this.flowDatas);
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