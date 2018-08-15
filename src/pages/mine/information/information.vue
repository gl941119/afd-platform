<template>
    <div class="information">
        <mt-cell class="information_kind" title="头像" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="昵称" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="登录密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="交易密码" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="绑定Telegram" is-link>
        </mt-cell>
        <mt-cell class="information_kind" title="实名认证" is-link>
        </mt-cell>
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                actions: [],
                sheetVisible: false,
            }
        }

    }
</script>
<style lang="scss" scoped>
    .information {
        background: #fafafa;
        overflow-y: scroll;
        &_kind {
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #e6e6e6;
            /*no*/
        }
    }
</style>