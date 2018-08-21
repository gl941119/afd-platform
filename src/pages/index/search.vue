<template>
    <div class="search-page">
        <div class="search-page-header">
            <div class="search-page-input">
                <input v-model="inputSearch" placeholder="请选择概念进行搜索" disabled class="search-page-input-item" type="text">
                <i class="search-page-input-icon custom-mint-icon-sousuo"></i>
            </div>
            <a class="search-page-link" @click="$router.go(-1)" >取消</a>
        </div>
        <div class="search-page-concept">
            <p>项目概念</p>
            <div>
                <mt-badge @click.native="searchProject(concept)" class="search-page-concept-item" v-for="concept in conceptOptions" :key="concept.id" size="normal" color="#EEEEEE">{{concept.name}}</mt-badge>
            </div>
        </div>
        <div class="search-page-concept">
            <p>历史搜索</p>
            <div class="search-history">
                <ul class="search-history-ul">
                    <li @click="searchProject(concept)" v-for="concept in searchHistory" :key="concept.id" class="search-history-ul-li">{{concept.name}}</li>
                </ul>
            </div>
            <mt-button :disabled="this.searchHistory.length===0"
            :class="{'btn-color': this.searchHistory.length>0}"
            class="search-page-concept-btn" @click.native="clearHistory" size="small">清空搜索历史</mt-button>
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
                inputSearch: '',
                conceptOptions: [],
                searchHistory: (Cache.getLocal('searchHistory') && JSON.parse(Cache.getLocal('searchHistory'))) || [],
            }
        },
        mounted() {
            this.getAllConcept()
        },
        methods: {
            getAllConcept() {
                return new Promise((resolve, reject) => {
                    Request({
                        url: 'QueryAllConcept',
                        type: 'get'
                    }).then(res => {
                        this.conceptOptions = res.data;
                        // console.log('res-->', res.data);
                        resolve();
                    })
                });
            },
            clearHistory(){
                this.searchHistory = [];
                Cache.removeLocal('searchHistory');
            },
            searchProject(concept) {
                this.inputSearch = concept.name;
                this.handleHistory(concept);
                this.$router.push({ name: 'project', query: { id: concept.id, value: concept.name } })
            },
            handleHistory(concept) {
                let index = this.searchHistory.findIndex(item => item.id === concept.id);
                if(index > -1){
                    this.searchHistory.splice(index, 1)
                }
                if (this.searchHistory.length > 2) {
                    this.searchHistory.pop();
                }
                this.searchHistory.unshift(concept)
                Cache.setLocal('searchHistory', this.searchHistory)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .search-page {
        width: 100%;
        padding-bottom: 50px;
        &-header {
            height: 44px;
            @include content-flex(space-around);
        }
        &-input {
            position: relative;
            width: pxTorem(310px);
            &-item {
                width: 100%;
                @extend %custom-input;
                padding-left: 36px;
            }
            &-icon {
                position: absolute;
                top: 4px;
                left: 8px;
                color: #8E8E93;
            }
        }
        &-link {
            padding: 6px;
            color: #333;
            font-size: 12px;
        }
        &-concept {
            color: #333;
            margin-top: 20px;
            padding: 0 10px;
            & P {
                font-weight: bold;
                font-size: pxTorem(13px);
                margin-bottom: 8px;
            }
            &-item {
                margin-bottom: 8px;
                margin-right: 15px;
            }
            &-btn {
                width: pxTorem(282px);
                height: pxTorem(35px);
                display: block;
                margin: 22px auto;
                &.btn-color {
                    background: #009EC2;
                    color: #fff;
                }
            }
        }
    }

    .search-history {
        &-ul {
            &-li {
                height: pxTorem(34px);
                border-bottom: 1px solid #E0E0E0;
                line-height: pxTorem(34px);
                color: #8C8C8C;
            }
        }
    }
</style>