<template>
    <div class="project" ref="projectWrapper" :style="{ height: wrapperHeight + 'px' }">
        <div class="project-header">
            <div class="project-input">
                <input @focus="inputFocus" v-model="inputValue" class="project-input-item" type="text">
                <i class="project-input-icon custom-mint-icon-sousuo"></i>
            </div>
        </div>
        <div v-if="noData" class="project-result">
            <div class="project-result_box">
                <img src="../../assets/imgs/img/search.png">
            </div>
            <div>搜索不到相关信息</div>
        </div>
        <mt-loadmore :bottom-method="learnMoreItem" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="projectLoadmore">
            <advert-item v-for="(advert, _i) in totalAdvertItemDatas" :key="advert.id" :advert-datas="advert" :item-index="_i" :concept-id="conceptId" @update-data="init"></advert-item>
            <div v-show="!noData" slot="bottom" class="project-bottom">
                <span v-show="bottomStatus !== 'loading'&&!allLoaded" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                    <mt-spinner type="snake"></mt-spinner>
                </span>
                <span v-show="allLoaded">没有更多数据了</span>
            </div>
        </mt-loadmore>
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
                inputValue: this.$route.query.value,
                pageTotal: 0,
                noData: false,
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: 0
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                if (this.conceptId) {
                    this.getAdvertInfo(this.conceptId).then(() => {
                        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.projectWrapper.getBoundingClientRect().top;
                    })
                } else {
                    this.getAdvertInfoInit().then(() => {
                        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.projectWrapper.getBoundingClientRect().top;
                    })
                }
            },
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
                            this.allLoaded = true;
                            resolve();
                        } else {
                            this.totalAdvertItemDatas.push(...this.advertItemDatas);
                            resolve();
                        }
                    })
                });
            },
            // 通过ID 筛选
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
                        if (res.data && res.data.length === 0) {
                            this.page === 1 && (this.noData = true);
                            this.allLoaded = true;
                            resolve();
                        } else {
                            this.totalAdvertItemDatas.push(...this.advertDatas);
                            resolve();
                        }
                        this.pageTotal = res.total;
                    })
                });
            },
            inputFocus() {
                this.$router.push({ name: 'search' })
            },
            learnMoreItem() {
                this.page++;
                if (this.conceptId) {
                    this.getAdvertInfo(this.conceptId, this.page).then(() => {
                        this.$refs.projectLoadmore.onBottomLoaded();
                    })
                } else {
                    this.getAdvertInfoInit(this.page).then(() => {
                        this.$refs.projectLoadmore.onBottomLoaded();
                    })
                }
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .project {
        width: 100%;
        background: #FAFAFA;
        padding-bottom: 50px;
        overflow: auto;
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
        &-result {
            height: calc(100vh - 50px - 44px);
            @include content-flex(center);
            flex-direction: column;
            &_box {
                margin-bottom: 10px;
                text-align: center;
                img {
                    width: 88px;
                    height: 59px;
                }
            }
        }
        &-bottom {
            @extend %load-more;
        }
    }
</style>