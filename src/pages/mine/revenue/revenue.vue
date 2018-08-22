<template>
    <div class="revenue">
        <header-nav linkName="mine" title="广告收益"></header-nav>
        <div>
            <ul class="revenue_tabbarBox">
                <router-link class="revenue_tabbarBox_tabbar one" tag="li" to="/revenue/recordsOne">提现记录</router-link>
                <router-link class="revenue_tabbarBox_tabbar" tag="li" to="/revenue/records">收益记录</router-link>
            </ul>
            <router-view></router-view>
        </div>
        <div class="revenue_buttoneBox">
            <mt-button class="revenue_buttoneBox_button" type="primary" size="large">提现</mt-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .revenue {
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &_tabbarBox {
            margin-top: pxTorem(55px);
            height: pxTorem(40px);
            line-height: pxTorem(40px);
            background: #ffffff;
            display: flex;
            justify-content: center;
            text-align: center;
            overflow: hidden;
            &_tabbar {
                width: 100%;
                height: pxTorem(40px);
                overflow: hidden;
                border-bottom: 1px solid #D8D8D8;
                &.router-link-active {
                    color: #009EC2;
                }
            }
            .one {
                border-right: 1px solid #D8D8D8;
                box-sizing: border-box;
            }
        }
        &_buttoneBox {
            @include remCalc(padding, 0, 73px);
            width: 100%;
            height: pxTorem(50px); // background: #ffffff;
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
    }
</style>