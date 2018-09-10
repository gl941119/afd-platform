<template>
    <div class="revenue">
        <div class="revenue-notic" v-if="totalWithdrawDatasDatas.length === 0">
            暂无数据
        </div>
        <div class="data" v-else>
            <div class="revenue-titleBox" ref="revenueWrapper">
                <div class="revenue-titleBox-title">
                    <div class="revenue-titleBox-title-info">时间</div>
                    <div class="revenue-titleBox-title-info">状态</div>
                    <div class="revenue-titleBox-title-info">AFDT</div>
                </div>
            </div>
            <div class="infoBox">
                <van-list v-model="loading" :finished="finished" @load="loadMore">
                    <div class="revenue-titleBox-title" v-for="(item, index) in totalWithdrawDatasDatas" :key="index">
                        <div class="revenue-titleBox-title-info">
                            {{item.createTime}}
                        </div>
                        <div class="revenue-titleBox-title-info">
                            <span v-if="item.status==1">转账成功</span>
                            <span v-if="item.status==2">待转账（审核通过）</span>
                            <span v-if="item.status==3">待审核</span>
                            <span v-if="item.status==4">审核不通过</span>
                            <span v-if="item.status==5">转账失败</span>
                            <span v-if="item.status==6">转账中</span>
                        </div>
                        <div class="revenue-titleBox-title-info">{{item.money}}</div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../../utils/cache.js';
    import Request from '../../../../utils/require';
    import Config from '../../../../utils/config.js';
    import CleanCom from '../../no-data.vue';
    export default {
        data() {
            return {
                id: this.$store.state.incomeId || Cache.getSession('bire_incomeId'),
                withdrawDatas: [],
                totalWithdrawDatasDatas: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                finished: false,
                loading: false,
            };
        },
        mounted() {
            this.revenueDatas();
        },
        components: {
            CleanCom,
        },
        methods: {
            loadMore() {
                this.page++;
                this.revenueDatas(this.page);
            },
            revenueDatas(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryWithdraw',
                        data: {
                            incomeId: this.id,
                            page,
                            pageSize,
                        },
                        type: 'get',
                    }).then(res => {
                        this.withdrawDatas = res.data;
                        if (this.withdrawDatas && this.withdrawDatas.length === 0) {
                            this.finished = true;
                        } else {
                            this.totalWithdrawDatasDatas.push(...this.withdrawDatas);
                        }
                        this.loading = false;
                    });
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../../assets/css/global.scss';

    .revenue {
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // .data {
        //     display: flex;
        //     flex-direction: column;
        // }
        &-notic {
            height: calc(100vh - 50px - 40px - 50px);
            @include content-flex(center);
        }
        &-titleBox {
            &-title {
                height: pxTorem(40px);
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #D8D8D8;
                background: #ffffff;
                text-align: center;

                &-info {
                    width: 100%;
                    text-align: center;
                }
            }
        }
        // .infoBox {
        //     overflow: hidden;
        //     overflow-y: scroll;
        //     flex: 1;
        // }
    }
</style>