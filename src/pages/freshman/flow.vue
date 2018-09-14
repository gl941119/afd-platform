<template>
    <div class="flow">
        <header-nav title="挖矿流程" :is-blue="true"></header-nav>
        <img src="../../assets/imgs/img/flow-img.png" alt="" srcset="">
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/global.scss';
.flow {
    img {
        margin: pxTorem(45px) auto 0;
        width: 100vw;
    }
}
</style>
