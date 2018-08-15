<template>
    <div class="revenue">
        <mt-header title="广告收益" class="revenue_header">
            <router-link to="/mine" slot="left">
                <mt-button icon="back" class="revenue_header_button"></mt-button>
            </router-link>
        </mt-header>
        <mt-navbar class="revenue_tabbar" v-model="selected">
            <mt-tab-item id="1" class="revenue_tabbar_one">收益记录</mt-tab-item>
            <mt-tab-item id="2">体现记录</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 20" :key="n" :title="'餐厅 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :key="n" :title="'餐厅 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="revenue_buttoneBox">
            <mt-button class="revenue_buttoneBox_button" type="primary" size="large">提现</mt-button>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    export default {
        data() {
            return {
                selected: '1',
                earnings: [],
                withdrawals: [],
            }
        },
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .revenue {
        background: #fafafa;
        &_header {
            background: #ffffff;
            color: #333333;
            font-size: 16px;
            margin-bottom: pxTorem(10px);
            &_button {
                color: #F3F3F3;
            }
        }
        &_tabbar {
            height: pxTorem(40px);
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #D8D8D8;
            background: #ffffff;
            height: pxTorem(40px);
            text-align: center;
            &_one {
                border-right: 1px solid #D8D8D8;
            }
        }
        &_buttoneBox {
            @include remCalc(padding, 0, 73px);
            width: 100%;
            height: pxTorem(50px);
            background: #ffffff;
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