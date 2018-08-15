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
                <mt-cell v-for="n in 10" :key="n" :title="'餐厅 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :key="n" :title="'餐厅 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: '1',
                earnings: [],
                withdrawals: [],
            }
        }
    }
</script>
<style lang="scss" scoped>
    .revenue {
        background: #fafafa;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        &_header {
            background: #ffffff;
            color: #333333;
            font-size: 16px;
            margin-bottom: 10px;
            &_button {
                color: #F3F3F3;
            }
        }
        &_tabbar {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #D8D8D8;
            background: #ffffff;
            height: 40px;
            text-align: center;
            &_one {
                border-right: 1px solid #D8D8D8;
            }
        }
    }
</style>