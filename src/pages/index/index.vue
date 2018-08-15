<template>
    <div class="index">
        <index-search></index-search>
        <custom-carousel :swiper-imgs="swiperImgs"></custom-carousel>
        <header-nav></header-nav>
        <advert-item v-for="(advert, _i) in totalAdvertItemDatas" :key="advert.id" :advert-datas="advert" :item-index="_i"></advert-item>
    </div>
</template>
<script>
    import CustomCarousel from '@/components/index-com/custom-carousel';
    import IndexSearch from '@/components/header/search';
    import HeaderNav from '@/components/index-com/header-nav';
    import Request from '../../utils/require.js';
    import Config from '../../utils/config.js';
    export default {
        name: 'Index',
        data() {
            return {
                swiperImgs: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                advertItemDatas: [],
                totalAdvertItemDatas: [],
            }
        },
        mounted() {
            this.findAdvertisement();
            this.getAdvertInfo();
        },
        methods: {
            getAdvertInfo(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAdvertInfo',
                        data: {
                            page,
                            pageSize,
                        },
                        type: 'get'
                    }).then(res => {
                        console.log('QueryAdvertInfo_>', res);
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
            // carousel image from server
            findAdvertisement() {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'FindAdvertisement',
                        data: { advertType: '1' },
                        type: 'get',
                    }).then(res => {
                        this.swiperImgs = this.handleCarouselData(res.data);
                        // console.log('this.swiperImgs->', this.swiperImgs);
                        resolve();
                    })
                })
            },
            handleCarouselData(data) {
                return data.filter(item => item.advertPosition === 1).sort((a, b) => a.advertSort - b.advertSort)
            }
        },
        components: {
            CustomCarousel,
            HeaderNav,
            IndexSearch,
        }
    }
</script>
<style lang="scss" scoped>
    .index {
        background: #FAFAFA;
        padding-bottom: 50px;
    }
</style>