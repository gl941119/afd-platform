<template>
    <div class="footer" v-if="isShow==='1'">
        <ul class="footer_item">
            <router-link tag="li" :to="{ name: 'index'}" class="footer_item_li">
                <span class="footer-img footer_item_li_home"></span>
                首页
            </router-link>
            <router-link tag="li" :to="{ name: 'project'}" class="footer_item_li">
                <span class="footer-img footer_item_li_project"></span>
                项目
            </router-link>
            <router-link tag="li" :to="{ name: 'crowdfunding'}" class="footer_item_li">
                <span class="footer-img footer_item_li_crowdfunding"></span>
                众筹
            </router-link>
            <li @click="goToMine" class="footer_item_li" :class="{'mine-active': mineActive}">
                <span class="footer-img footer_item_li_mine"></span>
                我的
            </li>
        </ul>
    </div>
</template>
<script>
    import Cache from '../utils/cache.js';
    export default {
        data() {
            return {};
        },
        computed: {
            isShow() {
                return this.$store.state.showFooter;
            },
            mineActive() {
                return this.$route.name === 'mine';
            },
        },
        methods: {
            goToMine() {
                if (!(this.$store.state.token || Cache.getSession('bier_token'))) {
                    this.$dialog.confirm({
                        title: '请先登录，再去查看',
                    }).then(() => {
                        this.$router.push({ name: 'login', query: { redirect: 'mine' }});
                    }, () => {});
                    return;
                }
                this.$router.push({ name: 'mine' });
            },
        },
    };
</script>
<style lang="scss" scoped>
    .footer {
        background: #fff;
        position: fixed;
        width: 100vw;
        bottom: 0;
        left: 0;
        height: 50px;
        box-shadow: 1px 0px 4px 0px rgba(195, 195, 195, 0.5);
        &_item {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &_li {
                width: 25%;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-size: 10px;
                color: #ACACAC;
                &.router-link-active {
                    color: #3B98FC;
                    .footer_item_li_home {
                        background-position: 0 -30px;
                    }
                    .footer_item_li_project {
                        background-position: -30px -30px;
                    }
                    .footer_item_li_crowdfunding {
                        background-position: -60px -30px;
                    }
                }
                &.mine-active {
                    color: #3B98FC;
                    .footer_item_li_mine {
                        background-position: -90px -30px;
                    }
                }
                .footer-img {
                    padding: 14px;
                    background: url('../assets/imgs/img/mobile-icon.png') no-repeat 0 0;
                }
                .footer-img.footer_item_li_mine {
                    padding: 14px 11px;
                }
                &_home.footer-img {
                    background-position: 0 0;
                }
                &_project.footer-img {
                    background-position: -30px 0;
                }
                &_crowdfunding.footer-img {
                    background-position: -60px 0;
                }
                &_mine.footer-img {
                    background-position: -90px 0;
                }
            }
        }
    }
</style>