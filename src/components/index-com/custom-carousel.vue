<template>
    <div class="custom-carousel" v-if="swiperImgs.length>0">
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="img in swiperImgs" :key="img.id">
                <a :href="img.advertUrl" target="_blank">
                    <img class="gallery-top-img" :src="img.banner">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        name: 'CustomCarousel',
        props: ['swiperImgs'],
        data() {
            return {
                swiperOptionTop: {
                    autoplay: {
                        disableOnInteraction: false,
                    },
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/global.scss';
    .custom-carousel {
        width: 100%;
        height: auto;
        position: relative;
    }

    .gallery-top {
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        &-img {
            width: 100vw;
            height: pxTorem(165px);
            object-fit:cover;
        }
    }
</style>