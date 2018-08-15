<template>
    <div class="auth">
        <div class="auth_info">
            <mt-field class="auth_info_input" placeholder="姓名" v-model="name"></mt-field>
            <mt-field class="auth_info_input" placeholder="证件类型" v-model="idType"></mt-field>
            <mt-field class="auth_info_input" placeholder="身份证号" v-model="idNum"></mt-field>
            <mt-field class="auth_info_input" placeholder="国家或地区" v-model="country"></mt-field>
        </div>
        <div class="auth_next">
            <mt-button class="auth_next_button" type="primary" popup_box_nickname_input size="large">下一步</mt-button>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    export default {
        data() {
            return {
                name: '',
                idType: '',
                idNum: '',
                country: '',
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
    .auth {
        &_info {
            @include remCalc(padding, 0, 38px);
            margin-top: pxTorem(50px);
        }
        &_next {
            @include remCalc(padding, 0, 38px);
            @include remCalc(margin, 25px, 35px, 0);
            &_button {
                background: rgba(0, 158, 194, 1);
                font-size: 14px;
            }
        }
    }
</style>