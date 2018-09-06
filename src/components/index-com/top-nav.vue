<template>
    <div class="header">
        <a href="javascript:;">
            <img src="../../assets/imgs/img/freshman.png">
        </a>
        <a href="javascript:;">
            <img src="../../assets/imgs/img/activity.png">
        </a>
    </div>
</template>
<script>
// import Cache from '../../utils/cache.js';
export default {
    name: 'TopNav',
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
    @import '../../assets/css/global.scss';
    .header {
        margin: 4px 0;
        background: #fff;
        @include remCalc(padding, 10, 29, 16);
        @include content-flex(space-between);
    }
</style>