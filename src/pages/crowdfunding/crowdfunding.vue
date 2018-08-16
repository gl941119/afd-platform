<template>
    <div class="crowd">
        <div class="crowd-header">
            <div class="crowd-input">
                <input v-model="inputValue" class="crowd-input-item" type="text">
                <i class="crowd-input-icon custom-mint-icon-sousuo"></i>
            </div>
        </div>
        <div class="crowd-content">
            <div class="temp-crowd" v-for="item in 5" :key="item">
                	<div>
                		<img src="../../assets/imgs/img/index_corwd.png"/>
                	</div>
                </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                inputValue: '',
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .crowd {
        width: 100%;
        background: #FAFAFA;
        padding-bottom: 50px;
        &-header {
            height: 44px;
            @include content-flex(center);
        }
        &-input {
            position: relative;
            width: pxTorem(312px);
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
    }
    .temp-crowd {
        width: 100%;
        background: #D3DCE6;
        height: 240px;
        padding-top: 20px;
        &>div{
            @include content-flex(center);
        	width: 100%;
        	height: 240px;
        	background: white;
        	& img{
        		width: 200px;
        	}
        }
    }
</style>