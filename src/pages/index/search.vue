<template>
    <div class="search-page">
        <div class="search-page-header">
            <div class="search-page-input">
                <input v-model="inputSearch" placeholder="请选择概念进行搜索" disabled class="search-page-input-item" type="text">
                <i class="search-page-input-icon custom-vant-icon-fangdajing"></i>
            </div>
            <a class="search-page-link" @click="goBack">取消</a>
        </div>
        <div class="search-page-concept">
            <p v-if="this.searchHistory.length>0" class="history">
                <span>历史搜索</span>
                <i @click="clearHistory" class="custom-vant-icon-delete"></i>
            </p>
            <div class="search-page-content">
                <van-button @click="searchProject(concept)" class="search-page-concept-item" v-for="concept in searchHistory" :key="concept.id" size="mini">{{concept.name}}</van-button>
            </div>
        </div>
        <div class="search-page-concept">
            <p>项目概念</p>
            <div class="search-page-content">
                <van-button @click="searchProject(concept)" class="search-page-concept-item" v-for="concept in conceptOptions" :key="concept.id" size="mini">{{concept.name}}</van-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Request from '../../utils/require.js';
    import Cache from '../../utils/cache.js';
    export default {
        name: 'IndexSearch',
        data() {
            return {
                from: this.$route.query.redirect,
                inputSearch: '',
                conceptOptions: [],
                searchHistory: (Cache.getLocal('searchHistory') && JSON.parse(Cache.getLocal('searchHistory'))) || [],
            };
        },
        mounted() {
            this.getAllConcept();
        },
        methods: {
            getAllConcept() {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAllConcept',
                        type: 'get',
                    }).then(res => {
                        res.data.unshift({ id: 0, name: this.$t('crowdFunding.allConcept') });
                        this.conceptOptions = res.data;
                        // console.log('res-->', res.data);
                        resolve();
                    });
                });
            },
            clearHistory() {
                this.$dialog.confirm({
                    title: '确认删除全部的历史记录？',
                }).then(() => {
                    this.searchHistory = [];
                    Cache.removeLocal('searchHistory');
                }).catch(() => {});
            },
            searchProject(concept) {
                this.inputSearch = concept.name;
                this.handleHistory(concept);
                this.$router.push({ name: 'project', query: { id: concept.id, value: concept.id === 0 ? '' : concept.name }});
            },
            handleHistory(concept) {
                const index = this.searchHistory.findIndex(item => item.id === concept.id);
                if (index > -1) {
                    this.searchHistory.splice(index, 1);
                }
                if (this.searchHistory.length > 5) {
                    this.searchHistory.pop();
                }
                this.searchHistory.unshift(concept);
                Cache.setLocal('searchHistory', this.searchHistory);
            },
            goBack() {
                this.$router.push({ name: this.from });
            },
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';

    .search-page {
        width: 100%;
        padding-bottom: 50px;

        &-header {
            height: 50px;
            background: #0C3C6E;
            @include content-flex();
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

        &-link {
            font-size: pxTorem(16px);
            padding: pxTorem(13px);
            color: #fff;
        }

        &-content {
            padding: 0 15px;
        }

        &-concept {
            color: #666;
            margin-top: 10px;

            & P {
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 8px;
                padding: 0 20px;
                line-height: 20px;
                border-bottom: 1px solid #F5F5F5;
                &.history {
                    @include content-flex(space-between);
                }
            }

            &-item {
                margin-bottom: pxTorem(10px);
                margin-right: pxTorem(35px);
                margin-left: 0;
                width: pxTorem(90px);
                background: #F5F5F5;
                border: none;
                color: #666;
                &:nth-child(3n) {
                    margin-right: 0;
                }
            }
        }
    }

</style>