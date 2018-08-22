<template>
    <div class="auth">
        <header-nav linkName="information"
                    title="实名认证"
                    class="auth_header"></header-nav>
        <div class="auth_boundary"></div>
        <div class="auth_info">
            <input :disableClear=true
                   class="auth_info_input"
                   @blur="ralname()"
                   placeholder="姓名"
                   v-model="name" />
            <div class="error"
                 v-if="realNameShow">只能输入英文字母或汉字</div>
            <div class="auth_info_inputBox">
                <input :disableClear=true
                       class="auth_info_input"
                       placeholder="证件类型"
                       v-model="idType" />
                <div class="auth_info_font">
                    <i class="custom-mint-icon-xialaanniu1"
                       @click="types = true"></i>
                </div>
                <ul class="auth_info_inputBox_select"
                    v-if='types'>
                    <li class="auth_info_inputBox_select_option"
                        @click="click(item.value)"
                        v-for="(item, index) in idTypeData"
                        :key="index"
                        :value="item.value">{{item.value}}
                    </li>
                </ul>
            </div>
            <div class="error"
                 v-if="cardTypeShow">请选择证件类型</div>
            <input :disableClear=true
                   class="auth_info_input"
                   @blur="text()"
                   placeholder="身份证号"
                   v-model="idNum" />
            <div class="error"
                 v-if="numType">请先选择证件类型</div>
            <div class="error"
                 v-if="idCard">请输入正确的身份证/护照格式</div>
            <div class="auth_info_inputBox"
                 :class="{'langer':countryKind}">
                <div class="auth_info_font">
                    <i class="custom-mint-icon-xialaanniu1"></i>
                </div>
                <input :disableClear=true
                       @keyup="fuzzySearch"
                       @click="countryKind = true"
                       class="auth_info_input"
                       placeholder="国家地区"
                       v-model="country" />
                <div @click="countryKind = false"
                     v-show="countryKind"
                     class="auth_info_inputBox_modal"></div>
                <ul class="auth_info_inputBox_select country"
                    v-if='countryKind'>
                    <li class="auth_info_inputBox_select_option"
                        @click="clickCountry(item.value)"
                        v-for="(item, index) in filterRes"
                        :key="index"
                        :value="item.value">{{item.value}}
                    </li>
                    <li class="auth_info_inputBox_select_option text-center"
                        v-show="filterRes.length===0">暂无数据...</li>
                </ul>
            </div>
            <!-- <select class="auth_info_select" v-model="country">
                <option v-for="(item, index) in countrys" :key="index" :value="item.value">{{item.value}}</option>
            </select> -->
            <div class="error"
                 v-if="countryShow">请选择国家</div>
        </div>
        <div class="auth_next">
            <mt-button @click.native="next()"
                       class="auth_next_button"
                       type="primary"
                       popup_box_nickname_input
                       size="large">下一步</mt-button>
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
                filterRes: CountryZh.country,
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
                types: false,
                countryKind: false,
            }
        },

        methods: {
            fuzzySearch() { //模糊搜索
                this.filterRes = this.country ? this.countrys.filter(item => item.value.indexOf(this.country) > -1) : this.countrys;
            },
            click(value) {
                this.idType = value;
                this.types = false;
                this.cardType();
            },
            clickCountry(value) {
                this.country = value;
                this.countryKind = false;
                this.countrySelect();
            },
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
                this.types = false;
                this.countryKind = false;
                if (this.cardTypeShow == true || this.cardTypeShow == true || this.numType == true || this.idType == true || this.countryShow == true) {
                    return;
                } else {
                    this.$store.commit('setAuthName', this.name);
                    this.$store.commit('setAuthIdType', this.idType);
                    this.$store.commit('setAuthIdNum', this.idNum);
                    this.$store.commit('setAuthCountry', this.country);
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
    .langer {
        height: 215px;
    }
    &_info {
        @include remCalc(padding, 0, 50px);
        margin-top: pxTorem(50px);
        overflow: hidden;
        position: relative;
        &_input {
            border: 1px solid #979797;
            width: 100%;
            height: 0.88rem;
            padding-left: 0.26667rem;
            margin-bottom: 0.4rem;
        }
        .error {
            color: #f66;
            padding-left: 10px;
            margin-bottom: 14px;
        }
        &_font {
            position: absolute;
            top: 5px;
            right: 16px;
            color: #d8d8d8;
            i {
                font-size: 12px;
            }
        }
        &_inputBox {
            position: relative;
            &_modal {
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: 1;
            }
            &_select {
                border: 1px solid #979797;
                width: pxTorem(278px);
                margin: 0 10px;
                margin-bottom: 0.4rem;
                color: #888;
                font-size: 16px;
                background: #ffffff;
                z-index: 999;
                position: absolute;
                top: 38px;
                right: -12px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                border: 1px solid #e4e7ed;
                border-radius: 4px;
                &_option {
                    height: 34px;
                    line-height: 34px;
                    padding-left: 10px;
                    cursor: pointer;
                    border: 0;
                    &.text-center {
                        text-align: center;
                    }
                    &:nth-child(odd) {
                        background: #fafafa;
                    }
                }
            }
            .country {
                max-height: 170px;
                overflow: hidden;
                overflow-y: scroll;
            }
        }
    }
    &_boundary {
        width: 100%;
        height: pxTorem(10px);
        background: rgba(250, 250, 250, 1);
        margin-top: pxTorem(45px);
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