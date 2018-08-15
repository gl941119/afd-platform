<template>
    <div>
        <custom-carousel :swiper-imgs="swiperImgs"></custom-carousel>
    </div>
</template>
<script>
    import customCarouselCom from '@/components/index-com/custom-carousel';
    import Request from '../../utils/require.js';
    export default {
        data() {
            return {
                swiperImgs: [],
            }
        },
        mounted() {
            this.findAdvertisement()
        },
        methods: {
            // carousel image from server
            findAdvertisement() {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'FindAdvertisement',
                        data: { advertType: '1' },
                        type: 'get',
                    }).then(res => {
                        this.swiperImgs = this.handleCarouselData(res.data);
                        console.log('this.swiperImgs->', this.swiperImgs);
                        resolve();
                    })
                })
            },
            handleCarouselData(data) {
                return data.filter(item => item.advertPosition === 1).sort((a, b) => a.advertSort - b.advertSort)
            }
        },
        components: {
            'custom-carousel': customCarouselCom,
        }
    }
</script>