<template>
    <div class="mining">
        <header-nav linkName="mine" class="mining-header" title="挖矿收益明细"></header-nav>
        <div class="mining-totalRenvue">
            <div class="mining-totalRenvue-money">999999</div>
            <div class="mining-totalRenvue-text">挖矿总收益（AFDT）</div>
        </div>
        <div class="mining-titleBox">
            <div class="mining-titleBox-title">
                <div class="mining-titleBox-title-info">时间</div>
                <div class="mining-titleBox-title-info">描述</div>
                <div class="mining-titleBox-title-info">AFDT</div>
            </div>
        </div>
        <div class="mining-notic" v-if="totalInviteData.length===0">
            <div>暂无数据</div>
        </div>
        <div class="infoBox" >
                <div class="mining-titleBox-title" v-for="(item, index) in totalInviteData" :key="index">
                    <div class="mining-titleBox-title-info">
                        <span v-if="item.nickname">{{item.nickname}}</span>
                        <span v-else>{{item.email | emails}}</span>
                    </div>
                    <div class="mining-titleBox-title-info">{{item.createTime}}</div>
                    <div class="mining-titleBox-title-info">{{item.earnings}}</div>
                </div>
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
                inviteCode: this.$store.state.inviteCode || Cache.getSession('bier_inviteCode'),
                totalInviteData: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
            };
        },
        filters: {
            emails: function(value) {
                var reg = /(.{3}).+(@.+)/g;
                if (value) return value.replace(reg, '$1****$2');
            },
        },
        mounted() {
            this.queryInviteData();
        },
        methods: {
            queryInviteData(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryInviteData',
                        data: { page, pageSize, inviteCode: this.inviteCode },
                        type: 'get',
                    }).then(res => {
                        this.totalInviteData = res.data;
                    });
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .mining {
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &-header{
            background: #ffffff;
            color: #333333;
            a{
                color: #333 !important;
            }
        }
        &-totalRenvue{
            margin-top: pxTorem(45px);
            background:rgba(12,60,110,1);
            color: #ffffff;
            font-size: 12px;
            text-align: center;
            &-money{
                font-size: 36px;
                height: pxTorem(50px);
                line-height: pxTorem(50px);
                padding-top: pxTorem(6px);
            }
            &-text{
                height: pxTorem(44px);
            }
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
                }
            }
        }
        .infoBox {
            overflow: hidden;
            overflow-y: scroll;
        }
        &-notic {
            height: calc(100vh - 50px - 40px);
            @include content-flex(center);
        }
        &-bottom {
            padding-top: 10px;
            @extend %load-more;
        }
    }
</style>