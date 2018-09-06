<template>
    <div class="trade">
        <header-nav linkName="mine" isBlue=true class="trade-header" title="设置支付密码"></header-nav>
        <div class="trade-info">
            <div class="trade-info-item">
                <input type="password" v-model="oldTradePassword" v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/}" name="oldTradePassword" placeholder="原交易密码"/>
                <span class="is-danger" v-show="errors.has('oldTradePassword')">{{errors.first('oldTradePassword')}}</span>
            </div>
            <div class="trade-info-item">
                <input type="password" v-model="tradePassword" v-validate="{required: true, regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!+-^%*#?&]{8,16}$/}" name="tradePassword" placeholder="新交易密码"/>
            <span class="is-danger" v-show="errors.has('tradePassword')">{{errors.first('tradePassword')}}</span>
            </div>
            <div class="trade-info-item">
                <input type="password" v-model="onceNewTradePassword" v-validate="'required|confirmed:tradePassword'" name="onceNewTradePassword" placeholder="确认新交易密码">
                <span class="is-danger" v-show="errors.has('onceNewTradePassword')">{{errors.first('onceNewTradePassword')}}</span>
            </div>
        </div>
        <div class="trade-forget">
            忘记交易密码
        </div>
        <div class="trade-confirm">
            <button class="trade-confirm-button" @click="confirm()" :class="{'active':style}">确定</button>
        </div>
    </div>
</template>
<script>
// import Request from '../../../../utils/require';
// import validateFun from '../../../../utils/validate.js';
export default {
    data() {
        return {
            oldTradePassword: '',
            tradePassword: '',
            onceNewTradePassword: '',
        };
    },
    computed: {
        style() {
            if (this.oldTradePassword && this.tradePassword && this.onceNewTradePassword) {
                return true;
            }
            return false;
        },
    },
    methods: {
        confirm() {
            console.log('1');
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/tradePassword.scss';
</style>
