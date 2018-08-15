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
                <div class="revenue_title" v-for="(item, index) in flowDatas" :key="index">
                    <div class="revenue_title_info">
                        {{item.createTime}}
                    </div>
                    <div class="revenue_title_info">{{item.desc}}</div>
                    <div class="revenue_title_info">{{item.status}}</div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="revenue_title" v-for="(item, index) in flowDatas" :key="index">
                    <div class="revenue_title_info">
                        {{item.createTime}}
                    </div>
                    <div class="revenue_title_info">{{item.money}} AFDT</div>
                    <div class="revenue_title_info">{{item.status}}</div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="revenue_buttoneBox">
            <mt-button class="revenue_buttoneBox_button" type="primary" size="large">提现</mt-button>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require';
    export default {
        data() {
            return {
                selected: '1',
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                flowDatas: [],
            }
        },
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
        },
        mounted() {
            this.BasicInformation();
        },
        watch: {
            selected() {
                this.revenueDatas();
            }
        },
        methods: {
            BasicInformation() {
                Request({
                    url: 'QueryRevenueBasicInformation',
                    data: { accountId: this.accountId },
                    type: 'get'
                }).then(res => {
                    this.id = res.data.id;
                    this.revenueDatas();
                })
            },
            revenueDatas() {
                Request({
                    url: 'QueryRevenueAccountFlow',
                    data: {
                        incomeId: this.id,
                        page: 1,
                        pageSize: 30,
                        flowType: this.selected,
                    },
                    type: 'get'
                }).then(res => {
                    this.flowDatas = res.data;
                    // this.totals = res.total;
                })
            },
        }
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
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #D8D8D8;
            background: #ffffff;
            text-align: center;
            &_one {
                border-right: 1px solid #D8D8D8;
                box-sizing: border-box;
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
        &_title {
            height: pxTorem(40px);
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #D8D8D8;
            background: #ffffff;
            text-align: center;
            &_info {
                width: 100%;
                text-align: center;
            }
        }
    }
</style>