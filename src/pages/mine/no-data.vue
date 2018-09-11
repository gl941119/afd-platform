<template>
    <div class="cleanly">
        <div class="cleanly-img">
            <img src="../../assets/imgs/img/clean.png"/>
        </div>
        <div class="cleanly-title">您暂无收益哦</div>
        <div class="cleanly-make">去{{kinds}}，立马赚收益</div>
        <div class="cleanly-button">
            <button @click="goInfo()">{{button}}</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['type'],
    data() {
        return {
            kinds: '',
            button: '',
        };
    },
    mounted() {
        if (this.type === 1) {
            this.kinds = '邀请';
            this.button = '邀请用户';
        } else {
            this.kinds = '挖矿';
            this.button = '马上挖矿';
        }
    },
    methods: {
        goInfo() {
            this.$router.push({
                name: 'project',
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/global.scss';
.cleanly{
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
    padding-top: pxTorem(45px);
    &-img{

        padding-top: pxTorem(18px);
        img{
            height: 100px;
        }
    }
    &-title{
        height:pxTorem(21px);
        font-size:17px;
        color:rgba(51,51,51,1);
        line-height:pxTorem(21px);
        margin-bottom: pxTorem(9px);
    }
    &-make{
        height:pxTorem(17px);
        font-size:15px;
        color:rgba(136,136,136,1);
        line-height:pxTorem(17px);
        margin-bottom: pxTorem(68px);
    }
    &-button{
        text-align: center;
        button{
            width:345px;
            height:44px;
            background:rgba(255,149,0,1);
            border-radius:5px;
            font-size:18px;
            color:rgba(255,255,255,1);
        }
    }
}
</style>
