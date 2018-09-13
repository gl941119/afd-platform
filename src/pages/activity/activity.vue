<template>
    <div class="activity">
        <div class="activity-notic">
            <div class="activity-notic-item">每天登录阿凡达平台，即可免费获取1次翻牌机会</div>
            <div class="activity-notic-item">每天点击项目去交易，即可免费获取2次翻牌机会</div>
            <div class="activity-notic-item">今日剩余翻牌机会：{{num}} 次</div>
        </div>
        <div class="activity-update">
            <button>开始洗牌</button>
        </div>
        <div class="activity-rule">
            翻牌规则>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            num: 8,
        };
    },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/global.scss';
.activity{
    width: 100%;
    height: 100%;
    background: url('../../assets/imgs/img/surprise.png');
    background-size:100% 100%;
    background-attachment: fixed;
    position: relative;
    &-notic{
        position: absolute;
        top: 32%;
        width: 100%;
        font-size: 10px;
        color:rgba(153,153,153,1);
        margin: 0 auto;
        &-item{
            margin-bottom: 5px;
            text-align: center;
        }
    }
    &-update{
        position: absolute;
        bottom: 10%;
        text-align: center;
        width: 100%;
        button{
            width:168px;
            height:44px;
            background:linear-gradient(-60deg,rgba(212,68,168,1),rgba(168,73,182,0.8),rgba(128,78,197,1),rgba(71,85,216,1));
            color:rgba(255,255,255,1);
            font-size: 18px;
        }
    }
    &-rule{
        position: absolute;
        bottom: 6%;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color:rgba(102,102,102,1);
    }
}
</style>
