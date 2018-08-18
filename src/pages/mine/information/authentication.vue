<template>
    <div class="auth">
        <header-nav linkName="information" title="实名认证" class="auth_header"></header-nav>
        <div class="auth_boundary"></div>
        <div class="auth_info">
            <mt-field :disableClear=true class="auth_info_input" placeholder="姓名" v-model="name"></mt-field>
            <mt-field :disableClear=true class="auth_info_input" placeholder="证件类型" v-model="idType"></mt-field>
            <mt-field :disableClear=true class="auth_info_input" placeholder="身份证号" v-model="idNum"></mt-field>
            <mt-field :disableClear=true class="auth_info_input" placeholder="国家或地区" v-model="country"></mt-field>
            <select>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </div>
        <div class="auth_next">
            <mt-button class="auth_next_button" type="primary" popup_box_nickname_input size="large">下一步</mt-button>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../utils/cache.js'
    import CountryZh from '../../../i18n/country/countrys-zh.js'
    export default {
        data() {
            return {
                name: '',
                idType: '',
                idNum: '',
                country: '',
                slots: CountryZh.country,
            }
        },
        created() {
            Cache.setSession('show_footer', '0');
            this.$store.commit('setShowFooter', '0');
        },
        methods: {
            onValuesChange() {

            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .auth {
        &_header {
            margin: 0;
        }
        &_info {
            @include remCalc(padding, 0, 38px);
            margin-top: pxTorem(50px);
        }
        &_boundary {
            width: 100%;
            height: pxTorem(10px);
            background: rgba(250, 250, 250, 1);
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