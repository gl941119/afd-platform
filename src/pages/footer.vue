<template>
    <div class="footer">
        <ul class="footer_item">
            <router-link tag="li" :to="{ name: 'index'}" class="footer_item_li">
                <i class="custom-mint-icon-shouye"></i>
                首页
            </router-link>
            <router-link tag="li" :to="{ name: 'project'}" class="footer_item_li">
                <i class="custom-mint-icon-c-project-copy"></i>
                项目
            </router-link>
            <router-link tag="li" :to="{ name: 'crowdfunding'}" class="footer_item_li">
                <i class="custom-mint-icon-zhongchou"></i>
                众筹
            </router-link>
            <router-link tag="li" :to="{ name: 'mine'}" class="footer_item_li">
                <i class="custom-mint-icon-wodedangxuan"></i>
                我的
            </router-link>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .footer {
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
                    color: #009EC2;
                }
            }
        }
    }
</style>