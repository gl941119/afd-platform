<template>
    <div class="freshman">
        <header-nav title="新人专区" :is-blue="true"></header-nav>
        <div class="freshman-top">
            <img src="../../assets/imgs/img/freshman-top.png">
        </div>
        <div class="freshman-problem">
            <freshman-title>
                <span>领好礼</span>
            </freshman-title>
            <div class="freshman-problem-gift">
                <div class="freshman-problem-gift-get">
                    <img src="../../assets/imgs/img/freshman-gift.png" >
                    <span>填写邀请码注册获取66个AFDT见面礼</span>
                    <van-button class="freshman-problem-gift-get-btn" size="mini" type="warning">一键领取</van-button>
                </div>
                <div class="freshman-problem-gift-get">
                    <img src="../../assets/imgs/img/freshman-msg.png" >
                    <span>每次邀请好友注册成功就送33个AFDT</span>
                    <van-button class="freshman-problem-gift-get-btn" size="mini" type="warning">去邀请</van-button>
                </div>
            </div>
            <freshman-title class="freshman-problem-read">
                <span>新人必读</span>
            </freshman-title>
            <div class="freshman-problem-readme">
                <a @click="$router.push({name: 'workflow'})" href="javascript:;">挖矿流程</a>
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
        margin: pxTorem(45px) auto 0;
        img {
            width: 100%;
        }
    }
    &-problem {
        width: 100%;
        padding: 17px 0 38px;
        background: #F2E5BB;
        &-gift {
            &-get {
                @include content-flex(center);
                @include remCalc(margin, 12, 0, 10);
                img {
                    width: pxTorem(16px);
                    margin-right: pxTorem(6px);
                }
                span {
                    color: #666666;
                    font-size: 14px;
                    margin-right: pxTorem(18px);
                }
                &-btn {
                    width: pxTorem(54px);
                    border-radius: 10px;
                }
            }
        }
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
