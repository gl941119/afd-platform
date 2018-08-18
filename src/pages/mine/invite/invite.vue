<template>
    <div class="invite">
        <header-nav linkName="mine" title="邀请用户"></header-nav>
        <div class="invite_title">
            <div class="invite_title_info">受邀用户</div>
            <div class="invite_title_info">加入时间</div>
            <div class="invite_title_info">获取AFDT</div>
        </div>
        <div class="invite_notic" v-if="totalInviteData.length===0">
            <div>暂无数据</div>
        </div>
        <mt-loadmore :bottom-method="learnMoreItem" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="inviteLoadmore">
            <div class="invite_title" v-for="(item, index) in totalInviteData" :key="index">
                <div class="invite_title_info">
                    <span v-if="item.nickname">{{item.nickname}}</span>
                    <span v-else>{{item.email | emails}}</span>
                </div>
                <div class="invite_title_info">{{item.createTime}}</div>
                <div class="invite_title_info">{{item.earnings}}</div>
            </div>
            <div slot="bottom" class="invite-bottom" v-show="hide">
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
    import Cache from '../../../utils/cache.js';
    import Request from '../../../utils/require';
    import Config from '../../../utils/config.js';
    export default {
        data() {
            return {
                accountId: this.$store.state.id || Cache.getSession('bier_userid'),
                inviteCode: this.$store.state.inviteCode || Cache.getSession('bier_inviteCode'),
                inviteData: [],
                totalInviteData: [],
                page: Config.pageStart,
                pageSize: Config.pageSize,
                allLoaded: false,
                bottomStatus: '',
                hide: true,
            }
        },
        filters: {
            emails: function (value) {
                var reg = /(.{3}).+(@.+)/g;
                if (value) return value.replace(reg, "$1****$2");
            }
        },
        mounted() {
            Promise.all([this.queryInviteData()]).then(() => {});
        },
        methods: {
            learnMoreItem() {
                this.page++;
                this.queryInviteData(this.page).then(() => {
                    this.$refs.inviteLoadmore.onBottomLoaded();
                })
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            queryInviteData(page = this.page, pageSize = this.pageSize) {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryInviteData',
                        data: { page, pageSize, inviteCode: this.inviteCode, },
                        type: 'get'
                    }).then(res => {
                        this.inviteData = res.data;
                        if (this.inviteData && this.inviteData.length === 0) {
                            this.allLoaded = true;
                            // 不显示上拉
                            if(this.page === 2){
                                this.hide = false;
                            }
                            resolve();
                        } else {
                            this.totalInviteData.push(...this.inviteData);
                            resolve();
                        }
                    })
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/global.scss';
    .invite {
        background: #fafafa;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: auto;
        &_notic {
            height: calc(100vh - 50px - 40px);
            @include content-flex(center);
        }
        &_title {
            height: pxTorem(40px);
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #D8D8D8;
            background: #ffffff;
            text-align: center;
            &_info {
                width: 100%;
            }
        }
        &-bottom {
            padding-top: 10px;
            @extend %load-more;
        }
    }
</style>