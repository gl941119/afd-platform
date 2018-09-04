<template>
    <div class="revenue">
        <header-nav linkName="mine" class="revenue-header" title="矿主收益明细"></header-nav>
        <div class="revenue-totalRenvue">
            <div class="revenue-totalRenvue-money">999999</div>
            <div class="revenue-totalRenvue-text">挖矿总收益（AFDT）</div>
        </div>
        <div>
            <ul class="revenue-item">
                <li class="revenue-item-li" v-for="(item, index) in liData" :key="index" @click="clickLi(index)" :class="{'active':item.style}">{{item.value}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                liData: [
                    {
                        value: '邀请注册收益',
                        style: true,
                    }, {
                        value: '邀请交易收益',
                        style: false,
                    },
                ],
            };
        },
        methods: {
            clickLi(index) {
                this.liData.forEach((item, index) => {
                    item.style = false;
                });
                this.liData[index].style = true;
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .revenue {
        height: 100%;
        background: #fafafa;
        &-header{
            background: #ffffff;
            color: #333333;
            a{
                color: #333 !important;
            }
        }
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
                &.active {
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