<template>
    <div class="freshman">
        <div class="freshman-top">
            <img src="../../assets/imgs/img/freshman-top.png">
        </div>
        <div class="freshman-problem">
            <freshman-title>
                <span>领好礼</span>
            </freshman-title>
            <div class="freshman-problem-gift"></div>
            <freshman-title class="freshman-problem-read">
                <span>新人必读</span>
            </freshman-title>
            <div class="freshman-problem-readme">
                <a href="javascript:;">挖矿流程</a>
            </div>
            <freshman-title class="freshman-problem-content"></freshman-title>
            <freshman-content></freshman-content>
        </div>
    </div>
</template>
<script>
import FreshmanTitle from './components/freshman-title';
import FreshmanContent from './components/freshman-content';
export default {
    data() {
        return {};
    },
    components: {
        FreshmanTitle,
        FreshmanContent,
    },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/global.scss';
.freshman {
    &-top {
        img {
            width: 100%;
        }
    }
    &-problem {
        width: 100%;
        padding: 17px 0 38px;
        background: #F2E5BB;
        &-read {
            margin-top: pxTorem(31px);
        }
        &-readme {
            @include remCalc(margin, 12, 0, 34);
            a {
                margin-left: pxTorem(48px);
                color: #939393;
                font-size: 14px;
            }
        }
        &-content {
            margin-bottom: pxTorem(12px);
        }
    }
}
</style>
