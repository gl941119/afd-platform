<template>
    <div class="invite">
        <mt-header title="邀请用户" class="invite_header">
            <router-link to="/mine" slot="left">
                <mt-button icon="back" class="invite_header_button"></mt-button>
            </router-link>
        </mt-header>
        <div class="invite_title">
            <div>受邀用户</div>
            <div>加入时间</div>
            <div>获取AFDT</div>
        </div>
        <div></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: '1',
                earnings: [],
                withdrawals: [],
            }
        }
    }
</script>
<style lang="scss" scoped>
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
            margin-bottom: 10px;
            &_button {
                color: #F3F3F3;
            }
        }
        &_title {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #D8D8D8;
            background: #ffffff;
            height: 40px;
            text-align: center;
        }
    }
</style>