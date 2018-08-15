<template>
    <div class="project">
        <div class="project-header">
            <div class="project-input">
                <input class="project-input-item" type="text">
                <i class="project-input-icon custom-mint-icon-sousuo"></i>
            </div>
        </div>
        <advert-item v-for="(advert, _i) in totalAdvertItemDatas" :key="advert.id" :advert-datas="advert" :item-index="_i"></advert-item>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Config from '../../utils/config.js';
    export default {
        name: 'Project',
        data() {
            return {
                page: Config.pageStart,
                pageSize: Config.pageSize,
                advertItemDatas: [],
                totalAdvertItemDatas: [],
                conceptId: this.$route.query.id,
            }
        },
        mounted() {
            if (this.conceptId) {
                this.getAdvertInfo(this.conceptId)
            } else {
                this.getAdvertInfoInit();
            }
        },
        methods: {
            getAdvertInfoInit(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAdvertInfo',
                        data: {
                            page,
                            pageSize,
                        },
                        type: 'get'
                    }).then(res => {
                        // console.log('QueryAdvertInfo_>', res);
                        this.advertItemDatas = res.data;
                        if (this.advertItemDatas && this.advertItemDatas.length === 0) {
                            this.$toast('没有数据了')
                            resolve();
                        } else {
                            this.totalAdvertItemDatas.push(...this.advertItemDatas);
                            resolve();
                        }
                    })
                });
            },
            getAdvertInfo(conceptId = 0, page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAdvertInfoForPage',
                        data: {
                            page,
                            pageSize,
                            conceptId,
                        },
                        type: 'get'
                    }).then(res => {
                        // console.log('QueryAdvertInfoForPage>', res);
                        this.advertDatas = res.data;
                        this.pageTotal = res.total;
                        resolve();
                    })
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .project {
        width: 100%;
        &-header {
            height: 44px;
            @include content-flex(center);
        }
        &-input {
            position: relative;
            width: pxTorem(312px);
            &-item {
                width: 100%;
                @extend %custom-input;
                padding-left: 36px;
            }
            &-icon {
                position: absolute;
                top: 4px;
                left: 8px;
                color: #8E8E93;
            }
        }
    }
</style>