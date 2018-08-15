<template>
    <div class="information">
        <mt-cell title="头像" is-link>
        </mt-cell>
        <mt-cell title="昵称" is-link>
        </mt-cell>
        <mt-cell title="登录密码" is-link>
        </mt-cell>
        <mt-cell title="交易密码" is-link>
        </mt-cell>
        <mt-cell title="绑定Telegram" is-link>
        </mt-cell>
        <mt-cell title="实名认证" is-link>
        </mt-cell>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss" scoped>
    .information {
        background: #fafafa;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        &_info {
            height: 106px;
            line-height: 106px;
            margin-left: 10px;
            /*no*/
            &_img {
                background: #d8d8d8;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 13px;
                /*no*/
                vertical-align: middle;
            }
            &_nickname {
                font-size: 12px;
                /*no*/
                color: #333333;
            }
        }
        &_top {
            height: 106px;
            margin-bottom: 10px;
            /*no*/
        }
    }
</style>