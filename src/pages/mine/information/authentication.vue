<template>
    <div class="auth">
        <header-nav linkName="information" title="实名认证" class="auth_header"></header-nav>
        <div class="auth_boundary"></div>
        <div class="auth_info">
            <mt-field :disableClear=true class="auth_info_input" placeholder="姓名" v-model="name"></mt-field>
            <div class="error" v-if="realNameShow">只能输入英文字母或汉字</div>
            <select class="auth_info_select" v-model="idType">
                <option class="auth_info_select_option" v-for="(item, index) in idTypeData" :key="index" :value="item.value">{{item.value}}</option>
            </select>
            <div class="error" v-if="cardTypeShow">请选择证件类型</div>
            <mt-field :disableClear=true class="auth_info_input" placeholder="身份证号" v-model="idNum"></mt-field>
            <div class="error" v-if="numType">请先选择证件类型</div>
            <div class="error" v-if="idCard">请输入正确的身份证/护照格式</div>
            <select class="auth_info_select" v-model="country">
                <option v-for="(item, index) in countrys" :key="index" :value="item.value">{{item.value}}</option>
            </select>
            <div class="error" v-if="countryShow">请选择国家</div>
        </div>
        <div class="auth_next">
            <mt-button @click.native="next()" class="auth_next_button" type="primary" popup_box_nickname_input size="large">下一步</mt-button>
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
                countrys: CountryZh.country,
                idTypeData: [{
                    value: '身份证',
                    label: '身份证'
                }, {
                    value: '护照',
                    label: '护照'
                }],
                realNameShow: false, //姓名
                cardTypeShow: false, //身份证件为空
                numType: false, //请先选择身份类型
                idCard: false, //身份证不符合规范
                countryShow: false, //国家为空
            }
        },
        methods: {
            ralname() {
                var value = /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/.test(this.name);
                if (!value) {
                    this.realNameShow = true;
                } else {
                    this.realNameShow = false;
                }
            },
            cardType() {
                if (!this.idType) {
                    this.cardTypeShow = true;
                } else {
                    this.cardTypeShow = false;
                }
            },
            countrySelect() {
                if (!this.country) {
                    this.countryShow = true;
                } else {
                    this.countryShow = false;
                }
            },
            text() {
                if (!this.idType) {
                    this.numType = true; //请先选择身份证件类型
                } else {
                    this.numType = false;
                    if (this.idType == '身份证' || this.idType == 'ID card') {
                        var value = /^\d{15}|\d{17}(\d{1}|X|x)$/.test(this.idNum);
                        if (!value) {
                            this.idCard = true;
                        } else {
                            this.idCard = false;
                        }
                    } else if (this.idType == '护照' || this.idType == 'Passport') {
                        var value = /^[A-Za-z0-9]+$/.test(this.idNum);
                        if (!value) {
                            this.idCard = true;
                        } else {
                            this.idCard = false;
                        }
                    }
                }
            },
            next() {
                this.cardType();
                this.text();
                this.countrySelect();
                this.ralname();
                if (this.cardTypeShow == true || this.cardTypeShow == true || this.numType == true || this.idType == true || this.countryShow == true) {
                    return;
                } else {
                    this.$store.commit('setAuthName',this.name);
                    this.$store.commit('setAuthIdType',this.idType);
                    this.$store.commit('setAuthIdNum',this.idNum);
                    this.$store.commit('setAuthCountry',this.country);
                    this.$router.push({
                        name: 'authImg',
                    })
                }
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
            overflow: hidden;
            .error {
                color: #f66;
                padding-left: 10px;
                margin-bottom: 14px;
            }
            &_select {
                border: 1px solid #979797;
                width: pxTorem(280px);
                height: 0.88rem;
                padding-left: 0.26667rem;
                margin: 0 10px;
                margin-bottom: 0.4rem;
                color: #888;
                font-size: 16px;
                padding-left: 5px;
                &_option{
                    border: 0;
                    border-color: transparent;
                    border-image: none;
                }
            }
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