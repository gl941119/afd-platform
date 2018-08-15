<template>
    <div class="advert-item">
        <div class="advert-item-top">
            <img class="advert-item-top-logo" :src="advertDatas.logo">
            <div class="advert-item-top-right">
                <div class="advert-item-top-right-title">
                    <div class="advert-item-top-right-title-text">{{advertDatas.shotEnName}}
                        <span>/{{advertDatas.shotCnName}}</span>
                    </div>
                    <div class="advert-item-top-right-title-symbol">{{advertDatas.fullEnName}}</div>
                    <a class="advert-item-top-right-title-link" :href="advertDatas.whitePaper" target="_self">白皮书</a>
                </div>
                <div class="advert-item-top-right-divide"></div>
                <div class="advert-item-top-right-member">
                    <span>{{$t('team.coreMember')}}:</span>
                    <span v-for="member in advertDatas.advertTeamMemberResults" :key="member.id">{{member.name}}, </span>
                    <span v-for="member in advertDatas.advertTeamConsultantsResults" :key="member.id">{{member.name}}, </span>
                </div>
            </div>
        </div>
        <div class="advert-item-bottom">
            {{advertDatas.proDesc}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AdvertItem',
        props: ['advertDatas'],
        data() {
            return {}
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    @mixin item-title($flag: true) {
        @if $flag {
            font-weight: bold;
        }
        font-size: pxTorem(13px);;
        color: #333;
    }

    .advert-item {
        width: 100vw;
        height: pxTorem(104px);
        padding: 10px;
        margin: 10px 0;
        font-size: pxTorem(11px);
        background: #fff;
        &-top {
            @include content-flex();
            height: pxTorem(45px);
            &-logo {
                width: pxTorem(34px);
                height: pxTorem(34px);
                border-radius: 50%;
                margin-right: pxTorem(12px);
            }
            &-right {
                width: pxTorem(308px);
                &-title {
                    @include content-flex();
                    &-text {
                        @include item-title();
                        flex: none;
                    }
                    &-symbol {
                        margin-left: 22px;
                        flex: auto;
                        @include item-title(false);
                        @include text-ellipsis;
                    }
                    &-link {
                        color: #3C599F;
                    }
                }
                &-divide {
                    height: 1px;
                    background: #EAEAEA;
                    margin: 5px 0;
                }
                &-member {
                    @include text-ellipsis;
                }
            }
        }
        &-bottom {
            margin-top: pxTorem(10px);
            @include multi-line-hide();
            height: pxTorem(31px);
        }
    }
</style>