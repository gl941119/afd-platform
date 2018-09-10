<template>
    <div class="revenue">
        <header-nav linkName="mine" isBlue=true title="交易记录"></header-nav>
        <div>
            <ul class="revenue-item">
                <router-link class="revenue-item-li" tag="li" to='/transaction/flow'>账号总流水</router-link>
                <router-link class="revenue-item-li" tag="li" to='/transaction/withdraw'>提现记录</router-link>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        methods: {

        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .revenue {
        background: #fafafa;
        height: 100%;
        &-item {
            margin-top: pxTorem(44px);
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