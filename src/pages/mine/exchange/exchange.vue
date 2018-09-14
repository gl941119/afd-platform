<template>
    <div class="exchange">
        <header-nav linkName="mine" class="exchange-header" title="兑换"></header-nav>

        <div class="exchange-tabs">
            <div class="exchange-tabs-flex">
                <button class="exchange-tabs-flex-btn" v-bind:class="{btnStyle:btnStyle}" @click="contentShow= 1">兑换列表
                </button>
                <button class="exchange-tabs-flex-btn" v-bind:class="{btnStyle:notbtnStyle}" @click="contentShow= 2">
                    兑换记录
                </button>
            </div>
        </div>
        <div class="exchange-content1" v-if="contentShow === 1">
            <com-list v-for="(item,index) in 4" :key="index"></com-list>
        </div>
        <div class="exchange-content2" v-else>
            内容2
        </div>

    </div>
</template>
<script>
    import ComList from './com/com-list'

    export default {
        name: 'exchange',
        components: {ComList},
        data() {
            return {
                active: undefined,
                contentShow: 1,

            }
        },
        computed: {
            btnStyle: function () {
                return this.contentShow === 1 ? true : false
            },
            notbtnStyle: function () {
                return this.contentShow === 2 ? true : false
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';

    .exchange {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #F5F5F5;
        &-tabs {
            margin-top: pxTorem(50px);
            background: #ffffff;
            &-flex {
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin: pxTorem(12px) 0;
                &-btn {
                    width: pxTorem(180px);
                    height: pxTorem(31px);
                    color: rgba(24, 29, 57, 1);
                    border: 1px solid rgba(12, 60, 110, 1);
                    background: #ffffff;
                    line-height: 31px;
                    display: block;
                }
                &-btn:first-child {
                    border-right: 0;
                    border-radius: 4px 0 0 4px;
                }

                &-btn:last-child {
                    border-left: 0;
                    border-radius: 0 4px 4px 0;
                }
                .btnStyle {
                    color: #ffffff;
                    background: rgba(12, 60, 110, 1);
                }
            }

        }
        &-content1 {

        }
        &-content2 {

        }

    }
</style>
