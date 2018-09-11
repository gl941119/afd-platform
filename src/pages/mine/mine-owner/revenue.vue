<template>
    <div class="revenue">
        <header-nav linkName="account" class="revenue-header" title="矿主收益明细"></header-nav>
        <div class="revenue-totalRenvue">
            <div class="revenue-totalRenvue-money">{{balance}}</div>
            <div class="revenue-totalRenvue-text">挖矿总收益（AFDT）</div>
        </div>
        <div>
            <ul class="revenue-item">
                <router-link class="revenue-item-li" tag="li" to="/revenue/recordsOne">邀请注册收益</router-link>
                <router-link class="revenue-item-li" tag="li" to="/revenue/records">邀请挖矿收益</router-link>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Request from '../../../utils/require';
export default {
    data() {
        return {
            balance: 0,
        };
    },
    mounted() {
        this.queryRevenueBalance();
    },
    methods: {
        queryRevenueBalance() {
            Request({
                url: 'QueryRevenueBalance',
                data: {
                    dataType: 1,
                },
                type: 'get',
            }).then(res => {
                this.balance = res.data.balance;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .revenue {
        height: 100%;
        background: #fafafa;
        &-totalRenvue{
            margin-top: pxTorem(44px);
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
        &-item {
            height: pxTorem(55px);
            font-size:14px;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: pxTorem(4px);
            &-li {
                width:180px;
                height: pxTorem(31px);
                float: left;
                color:rgba(24,29,57,1);
                border:1px solid rgba(12,60,110,1);
                background: #ffffff;
                text-align: center;
                line-height: 31px;
                &.router-link-active {
                    color: #ffffff;
                    background:rgba(12,60,110,1);
                }
            }
            &-li:first-child {
                border-right: 0;
                border-radius: 4px 0 0 4px;
            }

            &-li:last-child {
                border-left: 0;
                border-radius: 0 4px 4px 0;
            }
        }
    }
</style>