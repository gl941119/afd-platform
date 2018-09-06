<template>
    <div class="revenue">
        <div class="revenue-notic" v-if="inviteDatas.length===0">
            <div>暂无数据</div>
        </div>
        <div class="revenue-titleBox" ref="revenueWrapper">
            <div class="revenue-titleBox-title">
                <div class="revenue-titleBox-title-info">挖矿截止时间</div>
                <div class="revenue-titleBox-title-info">获得AFDT</div>
            </div>
            <div class="revenue-titleBox-title" v-for="(item, index) in inviteDatas" :key="index">
                <div class="revenue-titleBox-title-info">
                    {{item.createTime}}
                </div>
                <div class="revenue-titleBox-title-info">{{item.desc}}</div>
                <div class="revenue-titleBox-title-info">
                    <span v-if="item.status==1">转账成功</span>
                    <span v-if="item.status==2">待转账（审核通过）</span>
                    <span v-if="item.status==3">待审核</span>
                    <span v-if="item.status==4">审核不通过</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../../utils/cache.js';
    import Request from '../../../../utils/require';
    import Config from '../../../../utils/config.js';
    export default {
        data() {
            return {
                id: this.$store.state.incomeId || Cache.getSession('bire_incomeId'),
                inviteDatas: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
            };
        },
        mounted() {
            this.revenueDatas();
        },
        methods: {
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
                        this.inviteDatas = res.data;
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

        &-notic {
            height: calc(100vh - 50px - 40px - 50px);
            @include content-flex(center);
        }

        &-bottom {
            @extend %load-more;
        }

        &-titleBox {
            overflow: hidden;
            overflow-y: scroll;
            width: 100%; // margin-bottom: 51px;
            height: pxTorem(515px);

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
    }
</style>