<template>
    <div class="footer" v-if="isShow==='1'">
        <ul class="footer_item">
            <router-link tag="li" :to="{ name: 'index'}" class="footer_item_li">
                <i class="custom-vant-icon-home"></i>
                <span>首页</span>
            </router-link>
            <router-link tag="li" :to="{ name: 'project'}" class="footer_item_li">
                <i class="custom-vant-icon-project"></i>
                <span>项目</span>
            </router-link>
            <router-link tag="li" :to="{ name: 'crowdfunding'}" class="footer_item_li">
                <i class="custom-vant-icon-ico"></i>
                <span>众筹</span>
            </router-link>
            <li @click="goToMine" class="footer_item_li" :class="{'mine-active': mineActive}">
                <i class="custom-vant-icon-mine"></i>
                <span>我的</span>
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
    @import '../assets/css/global.scss';
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
                font-size: 12px;
                color: #ACACAC;
                i {
                    font-size: pxTorem(27px);
                }
                span {
                    line-height: pxTorem(17px);
                }
                &.router-link-active {
                    color: #3B98FC;
                }
                &.mine-active {
                    color: #3B98FC;
                }
            }
        }
    }
</style>