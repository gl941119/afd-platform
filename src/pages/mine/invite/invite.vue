<template>
    <div class="invite">
        <mt-header title="邀请用户" class="invite_header">
            <router-link to="/mine" slot="left">
                <mt-button icon="back" class="invite_header_button"></mt-button>
            </router-link>
        </mt-header>
        <div class="invite_title">
            <div class="invite_title_info">受邀用户</div>
            <div class="invite_title_info">加入时间</div>
            <div class="invite_title_info">获取AFDT</div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    export default {
        data() {
            return {
                selected: '1',
                earnings: [],
                withdrawals: [],
            }
        },
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .invite {
        background: #fafafa;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        &_header {
            background: #ffffff;
            color: #333333;
            font-size: 16px;
            margin-bottom: pxTorem(10px);
            &_button {
                color: #F3F3F3;
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
            }
        }
    }
</style>