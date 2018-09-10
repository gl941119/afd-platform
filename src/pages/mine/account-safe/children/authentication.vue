<template>
    <div class="input">
        <header-nav linkName="information" title="实名认证" isBlue=true class="auth_header"></header-nav>
        <div class="input-info">
            <div class="input-info-item">
                <input :disableClear=true @blur="ralname()" placeholder="姓名" v-model="name" />
                <div class="error" v-if="realNameShow">只能输入英文字母或汉字</div>
            </div>
            <div class="input-info-item">
                <input :disableClear=true disabled placeholder="证件类型" v-model="idType" />
                <div class="input-info-font">
                    <i class="custom-vant-icon-xialaanniu1" @click="types = true"></i>
                </div>
                <ul class="input-info-inputBox-select" v-if='types'>
                    <li class="input-info-inputBox-select-option" @click="click(item.value)" v-for="(item, index) in idTypeData" :key="index" :value="item.value">{{item.value}}
                    </li>
                </ul>
            </div>
            <div class="input-info-item">
                <input :disableClear=true @blur="text()" placeholder="身份证号" v-model="idNum" />
                <div class="error" v-if="numType">请先选择证件类型</div>
                <div class="error" v-if="idCard">请输入正确的身份证/护照格式</div>
            </div>
            <div class="input-info-item">
                <div class="input-info-inputBox" :class="{'langer':countryKind}">
                    <div class="input-info-font">
                        <i class="custom-vant-icon-xialaanniu1" @click="countryKind = true"></i>
                    </div>
                    <input :disableClear=true @keyup="fuzzySearch" @click="countryKind = true" placeholder="国家地区" v-model="country" />
                    <div @click="countryKind = false" v-show="countryKind" class="input-info-inputBox-modal"></div>
                    <ul class="input-info-inputBox-select country" v-if='countryKind'>
                        <li class="input-info-inputBox-select-option" @click="clickCountry(item.value)" v-for="(item, index) in filterRes" :key="index" :value="item.value">{{item.value}}
                        </li>
                        <li class="input-info-inputBox-select-option text-center" v-show="filterRes.length===0">暂无数据...</li>
                    </ul>
                </div>
            </div>
            <div class="input-confirm">
                <button @click="next()" class="input-confirm-button" :disabled="!style" :class="{'active':style}">下一步</button>
            </div>
        </div>
    </div>
</template>
<script>
    import Cache from '../../../../utils/cache.js';
    import CountryZh from '../../../../i18n/country/countrys-zh.js';
    export default {
        data() {
            return {
                name: '',
                idType: '',
                idNum: '',
                country: '',
                countrys: CountryZh.country,
                filterRes: CountryZh.country,
                idTypeData: [
                    {
                        value: '身份证',
                        label: '身份证',
                    }, {
                        value: '护照',
                        label: '护照',
                    },
                ],
                realNameShow: false, // 姓名
                numType: false, // 请先选择身份类型
                idCard: false, // 身份证不符合规范
                types: false,
                countryKind: false,
            };
        },
        computed: {
            style() {
                if (this.name && this.idType && this.idNum && this.country) {
                    return true;
                }
                return false;
            },
        },
        methods: {
            fuzzySearch() { // 模糊搜索
                this.filterRes = this.country ? this.countrys.filter(item => item.value.indexOf(this.country) > -1) : this.countrys;
            },
            click(value) {
                this.idType = value;
                this.types = false;
            },
            clickCountry(value) {
                this.country = value;
                this.countryKind = false;
            },
            ralname() {
                var value = /^([\u4E00-\u9FA5]+|[a-zA-Z]+)$/.test(this.name);
                if (!value) {
                    this.realNameShow = true;
                } else {
                    this.realNameShow = false;
                }
            },
            text() {
                if (!this.idType) {
                    this.numType = true; // 请先选择身份证件类型
                } else {
                    this.numType = false;
                    if (this.idType === '身份证' || this.idType === 'ID card') {
                        var value = /^\d{15}|\d{17}(\d{1}|X|x)$/.test(this.idNum);
                        if (!value) {
                            this.idCard = true;
                        } else {
                            this.idCard = false;
                        }
                    } else if (this.idType === '护照' || this.idType === 'Passport') {
                        var values = /^[A-Za-z0-9]+$/.test(this.idNum);
                        if (!values) {
                            this.idCard = true;
                        } else {
                            this.idCard = false;
                        }
                    }
                }
            },
            next() {
                this.text();
                this.ralname();
                this.types = false;
                this.countryKind = false;
                if (this.numType === true || this.idType === true) {
                    return;
                } else {
                    this.$store.commit('setAuthName', this.name);
                    this.$store.commit('setAuthIdType', this.idType);
                    this.$store.commit('setAuthIdNum', this.idNum);
                    this.$store.commit('setAuthCountry', this.country);
                    Cache.setSession('auth-name', this.name);
                    Cache.setSession('auth-idType', this.idType);
                    Cache.setSession('auth-idNum', this.idNum);
                    Cache.setSession('auth-country', this.country);
                    this.$router.push({
                        name: 'authImg',
                    });
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../../../assets/css/global.scss';
    @import '../../../../assets/css/input.scss';

    .input {
        .langer {
            height: pxTorem(215px);
        }
        &-info {
            position: relative;
            .error {
                color: rgba(255,149,0,1);
                padding-left: 10px;
                margin-bottom: 14px;
            }
            &-font {
                position: absolute;
                top: 5px;
                right: 16px;
                color: #d8d8d8;
                i {
                    font-size: 12px;
                }
            }
            &-inputBox {
                position: relative;
                &-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    z-index: 1;
                }
                &-select {
                    border: 1px solid #979797;
                    width: pxTorem(300px);
                    margin: 0 10px;
                    margin-bottom: 0.4rem;
                    color: #888;
                    font-size: 16px;
                    background: #ffffff;
                    z-index: 999;
                    position: absolute;
                    top: pxTorem(38px);
                    right: pxTorem(-12px);
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    border: 1px solid #e4e7ed;
                    border-radius: 4px;

                    &-option {
                        height: pxTorem(34px);
                        line-height: pxTorem(34px);
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
                    max-height: pxTorem(170px);
                    overflow: hidden;
                    overflow-y: scroll;
                }
            }
        }

    }
</style>