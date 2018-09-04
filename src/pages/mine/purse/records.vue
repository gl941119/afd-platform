<template>
    <div class="revenue">
        <header-nav linkName="mine" title="交易记录"></header-nav>
        <div>
            <ul class="revenue-item topLanger">
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
                        value: '账号总流水',
                        style: true,
                    }, {
                        value: '提现记录',
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
        background: #fafafa;
        height: 100%;
        &-item {
            height: pxTorem(55px);
            font-size:14px;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: pxTorem(4px);
            &.topLanger{
                margin-top: pxTorem(45px);
            }
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