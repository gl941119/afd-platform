<template>
    <div class="header">
        <div class="header-item">
            <i class="custom-mint-icon-custom-activity"></i>
            <span>精彩活动</span>
        </div>
        <div @click="advertIncome" class="header-item">
            <i class="custom-mint-icon-guanggao"></i>
            <span>广告收益</span>
        </div>
        <div @click="inviteIncome" class="header-item">
            <i class="custom-mint-icon-yaoqing"></i>
            <span>邀请收益</span>
        </div>
        <div class="header-item">
            <i class="custom-mint-icon-gonglve"></i>
            <span>挖矿攻略</span>
        </div>
    </div>
</template>
<script>
import Cache from '../../utils/cache.js';
    export default {
        name: 'HeaderNav',
        data() {
            return {}
        },
        methods: {
            advertIncome() {
                if (!(this.$store.state.token || Cache.getSession("bier_token"))) {
                    this.$messagebox.confirm(
                        '请先登录，再查看收益'
                    ).then(() => {
                        this.$router.push({ name: 'login' })
                    }, () => {});
                    return;
                }
                this.$router.push({name:'revenue'})
            },
            inviteIncome() {
                if (!(this.$store.state.token || Cache.getSession("bier_token"))) {
                    this.$messagebox.confirm(
                        '请先登录，才能邀请好友'
                    ).then(() => {
                        this.$router.push({ name: 'login' })
                    }, () => {});
                    return;
                }
                this.$router.push({name:'invite'})
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .header {
        width: 100vw;
        height: pxTorem(94px);
        @include content-flex(space-around);
        &-item {
            @include content-flex();
            flex-direction: column;
            i {
                padding: 6px;
                background: #B656CA;
                color: #fff;
                font-size: pxTorem(28px);
                border-radius: 5px;
                &[class$="-guanggao"] {
                    background: #519CF3;
                }
                &[class$="-yaoqing"] {
                    background: #4EDEBE;
                }
                &[class$="-gonglve"] {
                    background: #9243EE;
                }
            }
            span {
                margin-top: 6px;
                color: #333;
                font-size: pxTorem(13px);
            }
        }
    }
</style>