<template>
    <div class="project">
        <div class="project-header">
            <div class="project-input">
                <input @focus="goToSearch" v-model="inputValue" class="project-input-item" type="text">
                <i class="project-input-icon custom-vant-icon-fangdajing"></i>
            </div>
            <a v-if="conceptId" @click="goToSearch" href="javascript:;" class="project-header-text">取消</a>
        </div>
        <div v-if="noData" class="project-result">
            <div class="project-result_box">
                <img src="../../assets/imgs/img/search.png">
            </div>
            <div>没有找到你想要的结果</div>
            <div>请换个关键词试试</div>
        </div>
        <van-list v-model="loading" :finished="finished" @load="loadMore">
            <advert-item v-for="advert in totalAdvertItemDatas" :key="advert.id" :advert-datas="advert" :concept-id="conceptId" @update-data="updateData" ></advert-item>
        </van-list>
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
                loading: false,
                finished: false,
                noData: false,
                count: 0,
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                if (this.conceptId) {
                    this.getAdvertInfo(this.conceptId);
                } else {
                    this.getAdvertInfoInit();
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
                        type: 'get',
                    }).then(res => {
                        // console.log('QueryAdvertInfo_>', res);
                        this.advertItemDatas = res.data;
                        if (this.advertItemDatas && this.advertItemDatas.length === 0) {
                            this.finished = true;
                            resolve();
                        } else {
                            this.totalAdvertItemDatas.push(...this.advertItemDatas);
                            resolve();
                        }
                        this.loading = false;
                    });
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
                        type: 'get',
                    }).then(res => {
                        // console.log('QueryAdvertInfoForPage>', res);
                        this.count++; // 异步的用语判断首次是否有数据
                        this.advertDatas = res.data;
                        // console.log('count->', this.count, res.data);
                        if (res.data && res.data.length === 0) {
                            this.count === 1 && (this.noData = true);
                            this.finished = true;
                            resolve();
                        } else {
                            this.count === 2 && (this.noData = false); // count = 2 有数据
                            this.totalAdvertItemDatas.push(...this.advertDatas);
                            resolve();
                        }
                        this.pageTotal = res.total;
                        this.loading = false;
                    });
                });
            },
            goToSearch() {
                this.$router.push({ name: 'search', query: { redirect: 'project' }});
            },
            loadMore() {
                this.page++;
                if (this.conceptId) {
                    this.getAdvertInfo(this.conceptId, this.page);
                } else {
                    this.getAdvertInfoInit(this.page);
                }
            },
            updateData() {
                this.totalAdvertItemDatas = [];
                this.init();
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .project {
        width: 100%;
        background: #FAFAFA;
        padding-bottom: 50px;
        margin-top: 50px;
        overflow: auto;
        &-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: #0C3C6E;
            @include content-flex();
            &-text {
                font-size: pxTorem(16px);
                padding: pxTorem(13px);
                color: #fff;
            }
        }
        &-input {
            position: relative;
            width: pxTorem(298px);
            margin-left: 15px;
            &-item {
                width: 100%;
                @extend %custom-input;
                padding-left: 54px;
            }
            &-icon {
                position: absolute;
                top: 0px;
                left: 18px;
                font-size: 24px;
                color: #D8D8D8;
            }
        }
        &-result {
            height: calc(100vh - 100px);
            @include content-flex();
            flex-direction: column;
            color: #333;
            background: #fff;
            font-size: pxTorem(18px);
            &_box {
                margin-top: pxTorem(46px);
                margin-bottom: 10px;
                text-align: center;
                img {
                    width: pxTorem(161px);
                }
            }
        }
    }
</style>