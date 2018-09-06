<template>
    <div class="index">
        <div class="index-nav">
            <index-search></index-search>
            <custom-carousel :swiper-imgs="swiperImgs"></custom-carousel>
        </div>
        <top-nav></top-nav>
        <before-earn></before-earn>
        <van-list v-model="loading" :finished="finished" @load="loadMore">
            <advert-item v-for="(advert, _i) in totalAdvertItemDatas" :key="advert.id" :advert-datas="advert" :item-index="_i" @update-data="updateData"></advert-item>
        </van-list>
    </div>
</template>
<script>
    import CustomCarousel from '@/components/index-com/custom-carousel';
    import IndexSearch from '@/components/header/search';
    import TopNav from '@/components/index-com/top-nav';
    import BeforeEarn from '@/components/index-com/before-earn';
    import Request from '../../utils/require.js';
    import Config from '../../utils/config.js';
    import Cache from '../../utils/cache';
    export default {
        name: 'Index',
        data() {
            return {
                swiperImgs: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                advertItemDatas: [],
                totalAdvertItemDatas: [],
                id: this.$store.state.id,
                loading: false,
                finished: false,
            };
        },
        mounted() {
            this.setInviteCode();
            Promise.all([
                this.findAdvertisement(), this.getAdvertInfo(),
            ]).then(() => {
                var token = Cache.getSession('bier_token');
                var id = Cache.getSession('bier_userid');
                !token && !id && this.getUserInfo();
            });
        },
        methods: {
            setInviteCode() {
                const arr = window.location.hash;
                const code = arr.split('=')[2];
                if (code) {
                    this.$store.commit('setRegisterCode', code);
                    Cache.setSession('bier_register_code', code);
                    this.$router.push({ name: 'register' });
                }
            },
            queryCode(value) {
                Request({
                    url: 'QueryInviteCode',
                    data: { accountId: value },
                    type: 'get',
                }).then(res => {
                    this.$store.commit('setInviteCode', res.data.inviteCode);
                    Cache.setSession('bier_inviteCode', res.data.inviteCode);
                });
            },
            handleLoginSucc(data) {
                const { id, email, nickname, token, heardUrl } = data;
                this.$store.commit('setUserId', id);
                this.$store.commit('setUserName', email);
                this.$store.commit('setUserNickName', nickname); // cookie 中不保存 token
                token && this.$store.commit('setToken', token);
                this.$store.commit('setHeardUrl', heardUrl);
                var exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 10); // 这里表示保存10分钟
                document.cookie = 'login_identify=' + id + ';expires=' + exp.toGMTString();
                token && (document.cookie = 'login_token=' + token + ';expires=' + exp.toGMTString());
                Cache.setSession('bier_userid', id);
                Cache.setSession('bier_username', email);
                nickname && Cache.setSession('bier_usernickname', nickname);
                token && Cache.setSession('bier_token', token);
                heardUrl && Cache.setSession('bier_heardUrl', heardUrl);
                this.$router.push({ name: 'index' });
            },
            getUserInfo() {
                var id = Cache.getCookie('login_identify');
                var token = Cache.getCookie('login_token');
                token && id && Request({
                    url: 'GetUserInfoById',
                    type: 'get',
                    data: { id },
                }).then(res => {
                    console.log('GetUserInfoById_>', res);
                    this.handleLoginSucc(res.data);
                    this.$store.commit('setToken', token);
                    Cache.setSession('bier_token', token);
                    this.queryCode(id);
                }).catch(console.error);
            },
            getAdvertInfo(page = this.page, pageSize = this.pageSize) {
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
            loadMore() {
                this.page++;
                this.getAdvertInfo(this.page);
            },
            updateData() {
                this.totalAdvertItemDatas = [];
                this.getAdvertInfo();
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
                    });
                });
            },
            handleCarouselData(data) {
                return data.filter(item => item.advertPosition === 1).sort((a, b) => a.advertSort - b.advertSort);
            },
        },
        components: {
            CustomCarousel,
            TopNav,
            IndexSearch,
            BeforeEarn,
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .index {
        background: #FAFAFA;
        padding-bottom: 50px;
        overflow: auto;

        &-bottom {
            @extend %load-more;
        }
    }
</style>