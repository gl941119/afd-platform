<template>
    <div class="purse">
        <mt-header title="钱包" class="purse_header">
            <router-link to="/mine" slot="left">
                <mt-button icon="back" class="purse_header_button"></mt-button>
            </router-link>
        </mt-header>
        <div class="purse_balance">
            <div class="purse_balance_box"></div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            handleClose() {}
        }
    }
</script>
<style lang="scss" scoped>
    .purse {
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
        &_balance {
            background: #ffffff;
            padding: 10px 18px 0;
            &_box {}
        }
    }
</style>