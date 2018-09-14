<template>
    <div class="revenue">
        <div class="revenue-notic" v-if="totalInviteDatas.length===0">
            <CleanCom :type='1'></CleanCom>
        </div>
        <div class="data" v-else>
            <div class="revenue-titleBox" ref="revenueWrapper">
                <div class="revenue-titleBox-title">
                    <div class="revenue-titleBox-title-info">注册时间</div>
                    <div class="revenue-titleBox-title-info">获得AFDT</div>
                </div>
            </div>
            <div class="infoBox">
                <van-list class="data" v-model="loading" :finished="finished" @load="loadMore">
                    <div class="revenue-titleBox-title" v-for="(item, index) in totalInviteDatas" :key="index">
                        <div class="revenue-titleBox-title-info">
                            {{item.createTime}}
                        </div>
                        <div class="revenue-titleBox-title-info">
                            {{item.money}}
                        </div>
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
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                id: this.$store.state.incomeId || Cache.getSession('bire_incomeId'),
                inviteDatas: [],
                totalInviteDatas: [],
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
                            dataType: 3,
                            incomeId: this.id,
                            page,
                            pageSize,
                        },
                        type: 'get',
                    }).then(res => {
                        this.inviteDatas = res.data;
                        if (this.inviteDatas && this.inviteDatas.length === 0) {
                            this.finished = true;
                        } else {
                            this.totalInviteDatas.push(...this.inviteDatas);
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