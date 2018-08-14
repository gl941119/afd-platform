<template>
    <div class="mine">
        <mt-cell is-link class="mine_top">
            <div class="mine_info" slot="title">
                <div class="mine_info_img"></div>
                <span class="mine_info_nickname">昵称：</span>
            </div>
        </mt-cell>
        <mt-cell class="mine_kind" title="钱包" to="//github.com" is-link>
        </mt-cell>
        <mt-cell class="mine_kind" title="广告收益" to="//github.com" is-link>
        </mt-cell>
        <mt-cell class="mine_kind" title="邀请用户" to="//github.com" is-link>
        </mt-cell>
        <mt-cell class="mine_last" title="我的众筹" to="//github.com" is-link>
        </mt-cell>
        <div class="mine_buttonBox">
            <mt-button class="mine_buttonBox_button" type="primary" size="large">退出登录</mt-button>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss" scoped>
    .mine {
        background: #FAFAFA;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        &_info {
            height: 106px;
            line-height: 106px;
            margin-left: 10px;
            &_img {
                background: #D8D8D8;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 13px;
                vertical-align: middle;
            }
            &_nickname {
                font-size: 12px;
                color: #333333;
            }
        }
        &_top {
            height: 106px;
            margin-bottom: 10px;
        }
        &_kind {
            font-size: 12px !important;
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #E6E6E6;
        }
        &_kind:last-child {
            border: 0;
        }
        &_last {
            margin: 10px 0;
        }
        &_buttonBox {
            background: #ffffff;
            padding: 20px 30px 0px;
            flex: 1;
            &_button {
                background: #F3F3F3;
                margin: 0 auto;
                color: #333333;
                font-size: 12px;
            }
        }
    }
</style>