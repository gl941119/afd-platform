<template>
    <div>
        <div class="search">
            <a class="search-title" @click="popupVisible=true" href="javascript:;">{{title}}
                <i class="custom-vant-icon-xiasanjiao"></i>
            </a>
            <div class="search-input">
                <input @focus="inputFocus" class="search-input-item" type="text">
                <i class="search-input-icon custom-vant-icon-fangdajing"></i>
            </div>
            <a class="search-share" @click="showShare" href="javascript:;">
                <i class="custom-vant-icon-fenxiang1"></i>
            </a>
        </div>
        <van-popup v-model="popupVisible" position="bottom">
            <van-picker
                show-toolbar
                title="请选择语言"
                :columns="options"
                @confirm="selLang"
                @cancel="popupVisible = false"
            />
        </van-popup>
    </div>
</template>
<script>
    import Cache from '../../utils/cache';
    export default {
        name: 'IndexSearch',
        data() {
            return {
                popupVisible: false,
                value: this.$store.state.slangChange,
                title: '简体中文',
                options: [
                    {
                        values: [
                            { text: '简体中文', label: 'zh' },
                            { text: 'English', label: 'EN' },
                        ],
                        defaultIndex: this.$store.state.slangChange === 'EN' ? 1 : 0,
                    },
                ],
            };
        },
        mounted() {
            const lang = this.$store.state.slangChange;
            this.title = this.selTitle(lang);
        },
        methods: {
            selTitle(lang) {
                if (!lang) {
                    return '简体中文';
                }
                return this.options[0].values.find(item => item.label === lang).text;
            },
            inputFocus() {
                this.$router.push({ name: 'search', query: { redirect: 'index' }});
            },
            showShare() {
                if (!(this.$store.state.token || Cache.getSession('bier_token'))) {
                    this.$dialog.confirm({
                        title: '请先登录，才能分享',
                    }).then(() => {
                        this.$router.push({ name: 'login', query: { redirect: 'index' }});
                    }, () => {});
                    return;
                }
                this.$store.commit('setDialogVisible', true);
            },
            selLang(val) {
                // console.log('value->', val);
                this.popupVisible = false;
                this.title = val[0].text;
                this.$store.commit('setLanguage', val[0].label);
                Cache.setLocal('bier_langChange', val[0].label);
                this.$validator.localize(val[0].label);
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .search {
        padding: 0 pxTorem(12px);
        margin: 10px 0;
        height: 30px;
        @include content-flex(space-between);
        &-title {
            line-height: 30px;
            font-size: pxTorem(16px);
            & i {
                margin-left: pxTorem(4px);
                font-size: pxTorem(12px);
            }
        }
        &-input {
            position: relative;
            margin-left: pxTorem(6px);
            &-item {
                @extend %custom-input;
                padding-left: 42px;
                width: pxTorem(224px);
            }
            &-icon {
                position: absolute;
                top: 2px;
                left: 12px;
                color: #d8d8d8;
            }
        }
        &-share {
            height: 100%;
            @include content-flex;
            i {
                font-size: pxTorem(26px);
            }
        }
        &-popup {
            width: 100%;
        }
    }
</style>