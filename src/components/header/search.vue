<template>
    <div>
        <div class="search">
            <a class="search-title" @click="popupVisible=true" href="javascript:;">{{title}} <i class="custom-mint-icon-xialaanniu"></i></a>
            <div class="search-input">
                <input class="search-input-item" type="text">
                <i class="search-input-icon custom-mint-icon-sousuo"></i>
            </div>
            <a class="search-share" href="javascript:;">
                <i class="custom-mint-icon-fenxiang"></i>
            </a>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="search-popup" position="bottom">
            <mt-radio v-model="value" :options="options">
            </mt-radio>
        </mt-popup>
    </div>
</template>
<script>
    export default {
        name: 'IndexSearch',
        data() {
            return {
                popupVisible: false,
                value: 'EN',
                title: 'English',
                options: [
                    { label: 'English', value: 'EN' },
                    { label: '简体中文', value: 'zh' }
                ]
            }
        },
        watch: {
            value(val){
                this.popupVisible = false;
                this.title = this.selTitle(val);
            }
        },
        methods: {
            selTitle(lang){
                return this.options.find(item => item.value === lang).label;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .search {
        padding: 8px;
        height: 44px;
        @include content-flex(space-between);
        &-title {
            line-height: 44px;
            color: #000;
            margin-left: -8px;
            transform: scale(0.8);
            font-size: 12px;
            & i {
                font-size: pxTorem(6px);
            }
        }
        &-input {
            position: relative;
            margin-left: 8px;
            &-item {
                @extend %custom-input;
                padding-left: 36px;
                width: pxTorem(252px);
            }
            &-icon {
                position: absolute;
                top: 4px;
                left: 8px;
                color: #8E8E93;
            }
        }
        &-share {
            line-height: 44px;
            padding: 0 8px;
            & i {
                color: #969696;
            }
        }
        &-popup {
            width: 100%;
        }
    }
</style>