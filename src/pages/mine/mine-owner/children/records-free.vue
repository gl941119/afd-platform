<template>
    <div class="revenue">
        <div class="revenue-notic" v-if="totalFreeDatas.length===0">
            <CleanCom :type='1'></CleanCom>
        </div>
        <div class="data" v-else>
            <div class="revenue-titleBox" ref="revenueWrapper">
                <div class="revenue-titleBox-title">
                    <div class="revenue-titleBox-title-info">挖矿截止时间</div>
                    <div class="revenue-titleBox-title-info">获得AFDT</div>
                </div>
            </div>
            <div class="infoBox">
                <van-list v-model="loading" :finished="finished" @load="loadMore">
                    <div class="revenue-titleBox-title" v-for="(item, index) in totalFreeDatas" :key="index">
                        <div class="revenue-titleBox-title-info">
                            {{item.createTime}}
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
                freeDatas: [],
                totalFreeDatas: [],
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
                        url: 'QueryRevenue',
                        data: {
                            dataType: 2,
                            incomeId: this.id,
                            page,
                            pageSize,
                        },
                        type: 'get',
                    }).then(res => {
                        this.freeDatas = res.data;
                        if (this.freeDatas && this.freeDatas.length === 0) {
                            this.finished = true;
                        } else {
                            this.totalFreeDatas.push(...this.freeDatas);
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
            height: calc(100vh - 200px);
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